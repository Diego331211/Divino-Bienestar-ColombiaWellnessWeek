 "use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTranslations } from "next-intl";

const partners = [
    "/images/adidas.png",
    "/images/bbva.png",
    "/images/bodytech.png",
    "/images/colsubsidio.png",
    "/images/cristal.png"
];

export default function PartnersCarousel() {
    const t = useTranslations("common");
    const controls = useAnimation();
    const containerRef = useRef(null);

    useEffect(() => {
        const animate = async () => {
            while (true) {
                await controls.start({
                    x: "-50%",
                    transition: { duration: 15, ease: "linear" }
                });
                controls.set({ x: "0%" });
            }
        };
        animate();
    }, [controls]);

    return (
        <section className="py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t("ourSponsors")}</h2>
            <div className="overflow-hidden w-full relative flex items-center justify-center">
                <motion.div
                    className="flex space-x-8 w-max"
                    animate={controls}
                    ref={containerRef}
                >
                    {[...partners, ...partners].map((partner, index) => (
                        <img key={index} src={partner} alt="Partner Logo" className="h-16 sm:h-24 w-auto" />
                    ))}
                </motion.div>
            </div>
            <div className="mt-8">
                <button className="bg-blue-400 hover:bg-blue-200 hover:text-black text-white font-semibold px-6 py-3 rounded-full border border-black shadow-lg shadow-gray-500">
                    {t("BecomeSponsor")}
                </button>
            </div>
        </section>
    );
}
