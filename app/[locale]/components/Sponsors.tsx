"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTranslations } from "next-intl";

const partners = [
  "/images/adidas.png",
  "/images/bbva.png",
  "/images/bodytech.png",
  "/images/colsubsidio.png",
  "/images/cristal.png",
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
          transition: { duration: 15, ease: "linear" },
        });
        controls.set({ x: "0%" });
      }
    };
    animate();
  }, [controls]);

  return (
    <section className="py-16 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        {t("ourSponsors")}
      </h2>
      {/* Contenedor que oculta el desbordamiento del carrusel */}
      <div className="relative overflow-hidden w-full">
        <motion.div
          className="flex space-x-8 w-max"
          animate={controls}
          ref={containerRef}
          // Aquí aplicamos la máscara con un gradiente lineal
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
            WebkitMaskSize: "100% 100%",
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
            maskSize: "100% 100%",
          }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <img
              key={index}
              src={partner}
              alt="Partner Logo"
              className="h-16 sm:h-24 w-auto"
            />
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
