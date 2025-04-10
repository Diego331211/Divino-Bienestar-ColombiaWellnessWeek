"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import MyButton from "./MyButton";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from 'next/navigation';

export default function SponsorshipTiers() {
  const { locale } = useParams();
  const t = useTranslations("tiers");
  const tiers = [
    {
      name: t.raw("silver.name"),
      price: "$25,000 USD",
      benefits: t.raw("silver.benefits"),
      color: "bg-slate-200",
    },
    {
      name: t.raw("experiential.name"),
      price: "$15,000 USD",
      benefits: t.raw("experiential.benefits"),
      color: "bg-amber-100",
    },
    {
      name: t.raw("full.name"),
      price: "$8,000 USD",
      benefits: t.raw("full.benefits"),
      color: "bg-orange-100",
    },
    {
      name: t.raw("platinum.name"),
      price: "$5,000 USD",
      benefits: t.raw("platinum.benefits"),
      featured: true,
      color: "bg-gradient-to-b from-orange-200 to-amber-100",
    },
    {
      name: t.raw("community.name"),
      price: "$2,000 USD",
      benefits: t.raw("community.benefits"),
      featured: true,
      color: "bg-gradient-to-b from-orange-200 to-amber-100",
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 text-center">
          NIVELES DE PATROCINIO
        </h2>
        <div className="w-20 h-1 bg-orange-400 mx-auto my-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              className={`flex flex-col rounded-xl overflow-hidden shadow-lg flex flex-col h-full ${
              tier.featured ? "ring-2 ring-orange-500" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={`p-6 ${tier.color}`}>
              <h3 className="text-xl font-bold text-center">{tier.name}</h3>
              <div className="text-2xl font-bold text-center mt-2">
                {tier.price}
              </div>
              </div>
              <div className="p-6 bg-white flex flex-col flex-grow flex-grow flex flex-col">
              <ul className="space-y-3 mb-4 flex-grow">
                {tier.benefits.map((benefit: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
                ))}
              </ul>
              <MyButton
                href={`/${locale}/sponsors`}
                className={`w-full text-white mt-auto ${
                tier.featured
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-slate-800 hover:bg-slate-900"
                }`}
              >
                Más información
              </MyButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
