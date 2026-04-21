"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const portfolioItems = [
  {
    id: 1,
    src: "/foto1.jpg",
    title: "Генеральная уборка квартиры",
    category: "Квартиры",
  },
  {
    id: 2,
    src: "/foto2.jpg",
    title: "Химчистка салона автомобиля",
    category: "Авто",
  },
  {
    id: 3,
    src: "/foto3.jpg",
    title: "Мойка мягкой мебели",
    category: "Мебель",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4"
          >
            Наши работы
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-600 text-balance"
          >
            Результаты нашей работы говорят сами за себя. Фотографии "До/После".
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-lg shadow-blue-900/5 cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="inline-block px-3 py-1 bg-brand-blue/90 backdrop-blur-sm text-white text-xs font-bold rounded-full mb-3 w-max">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}