import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface Props {
  url: string;
  enableRotation?: boolean;
}

export default function Item3D({ url, enableRotation = false }: Props) {
  const { scrollYProgress } = useScroll();
  // Zoom sutil con mayor velocidad
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 2.5]);
  // Rotación condicional: si enableRotation es false, permanece en 0
  const rotate = enableRotation
    ? useTransform(scrollYProgress, [0, 0.5], [0, 360])
    : 0;
  // Traslación en X cuando hay rotación
  const translateX = enableRotation
    ? useTransform(scrollYProgress, [0, 0.5], [0, 200]) 
    : 0;

  return (
    <section className="flex justify-center items-center size-28 relative">
      <motion.div
        style={{ scale, rotate, x: translateX }}
        transition={{ ease: "easeInOut", duration: 0.1 }}
        className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
      >
        <Image
          src={url}
          alt="Stethoscope"
          width={300}
          height={300}
          className="w-full h-full object-contain"
        />
      </motion.div>
    </section>
  );
}
