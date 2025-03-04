"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
export default function EventTimeline() {
  const t = useTranslations("events");
  const tSections = useTranslations("sections");

  const events = [
    {
      month: t("march"),
      event: "Wellness Summit Latam",
      location: "Bogotá",
    },
    {
      month: t("april"),
      event: "eMerge Americas",
      location: "Miami",
    },
    {
      month: t("june"),
      event: "Brazil Wellness Tour",
      location: "São Paulo, Río de Janeiro",
    },
    {
      month: t("july"),
      event: "Endeavor Experience",
      location: "Argentina",
    },
    {
      month: t("september"),
      event: "Press Conference",
      location: "México",
    },
    {
      month: t("november"),
      event: "Colombia Wellness Week",
      location: "Bogotá, Medellín, Cartagena, Cali",
      highlight: true,
    },
  ];

  return (
    <div className="relative px-4 sm:px-6">
      {/* Timeline line - hidden on small screens, visible from md up */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-200"></div>

      <div className="space-y-12">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Timeline dot - hidden on mobile, visible from md up */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-orange-500"></div>

            {/* Mobile timeline dot and month */}
            <div className="md:hidden flex items-center mb-2">
              <div className="w-4 h-4 rounded-full bg-orange-500 mr-3"></div>
              <div className="text-lg font-bold text-orange-500">
                {event.month}
              </div>
            </div>

            {/* Content for desktop - left side */}
            <div className="hidden md:block md:w-5/12 md:pr-8 md:text-right">
              <div className="text-lg font-bold text-orange-500">
                {event.month}
              </div>
            </div>

            {/* Content - shown on both mobile and desktop */}
            <div className="w-full md:w-5/12 md:pl-8">
              <div
                className={`p-4 rounded-lg ${
                  event.highlight ? "bg-orange-100" : "bg-slate-50"
                }`}
              >
                <div
                  className={`text-lg font-bold ${
                    event.highlight ? "text-orange-600" : "text-slate-800"
                  }`}
                >
                  {event.event}
                </div>
                <div className="text-slate-600">{event.location}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold mb-4 text-slate-800">
            {tSections("retreatsAndConferences.title")}
          </h3>
          <ul className="space-y-2 text-slate-700">
            {tSections
              .raw("retreatsAndConferences.items")
              .map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  <span>{item}</span>
                </li>
              ))}
          </ul>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-md my-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold mb-4 text-slate-800">
            {tSections("startupsAndBusiness.title")}
          </h3>
          <ul className="space-y-2 text-slate-700">
            {tSections
              .raw("startupsAndBusiness.items")
              .map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  <span>{item}</span>
                </li>
              ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
