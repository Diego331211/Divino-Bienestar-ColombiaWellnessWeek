"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MyButton from "./MyButton";
import { useTranslations } from "next-intl";

export default function EndSection() {
  const t = useTranslations("endSection");

  return (
    <footer className="py-20 bg-dark-background text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("title")}</h2>
          <p className="text-xl mb-8">{t("description")}</p>
          <MyButton
            href="/register"
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {t("register")} <ArrowRight className="ml-2 h-4 w-4" />
          </MyButton>
        </motion.div>
      </div>
    </footer>
  );
}
