"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "general",
    title: "Генеральная уборка",
    price: "от 3 500 ₽",
    description: "Глубокая очистка всех поверхностей, включая труднодоступные места.",
    features: [
      "Мытье окон и рам",
      "Обеспыливание стен и потолков",
      "Чистка радиаторов",
      "Мытье кухонного гарнитура",
      "Дезинфекция санузлов",
    ],
    popular: true,
  },
  {
    id: "maintenance",
    title: "Поддерживающая",
    price: "от 1 500 ₽",
    description: "Регулярная уборка для поддержания чистоты и порядка в доме.",
    features: [
      "Сухая и влажная уборка полов",
      "Протирка пыли с поверхностей",
      "Вынос мусора",
      "Мытье посуды",
      "Чистка сантехники",
    ],
    popular: false,
  },
  {
    id: "car-dry-cleaning",
    title: "Химчистка салона",
    price: "от 4 000 ₽",
    description: "Профессиональная химчистка салона автомобиля с удалением пятен.",
    features: [
      "Чистка сидений",
      "Очистка потолка и пола",
      "Обработка пластика",
      "Устранение запахов",
      "Сушка салона",
    ],
    popular: false,
  },
  {
    id: "furniture-washing",
    title: "Мойка мебели",
    price: "от 1 200 ₽",
    description: "Глубокая экстракторная чистка мягкой мебели и ковров.",
    features: [
      "Удаление сложных пятен",
      "Уничтожение пылевых клещей",
      "Чистка матрасов",
      "Мойка диванов и кресел",
      "Антибактериальная обработка",
    ],
    popular: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative bg-slate-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4"
          >
            Наши услуги
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-600 text-balance"
          >
            Выберите подходящий тариф или закажите индивидуальный расчет стоимости.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card relative flex flex-col h-full overflow-hidden ${
                service.popular ? "border-brand-blue/50 ring-1 ring-brand-blue/20" : ""
              }`}
            >
              {service.popular && (
                <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-brand-blue to-brand-lavender text-white text-xs font-bold uppercase tracking-wider py-1.5 text-center">
                  Хит продаж
                </div>
              )}
              
              <div className={`p-8 flex-grow flex flex-col ${service.popular ? "pt-12" : ""}`}>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <div className="text-3xl font-extrabold text-brand-blue mb-4">{service.price}</div>
                <p className="text-slate-600 mb-8 flex-grow">{service.description}</p>
                
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-mint shrink-0 mt-0.5" size={20} />
                      <span className="text-slate-700 text-sm leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="#contact"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    service.popular
                      ? "bg-brand-blue text-white hover:bg-sky-500 shadow-md shadow-brand-blue/20 hover:-translate-y-0.5"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Заказать
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}