"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "Какие средства вы используете?",
    answer: "Мы используем только сертифицированные профессиональные эко-средства, которые безопасны для детей, аллергиков и домашних животных. Они не имеют резкого запаха и полностью смываются водой.",
  },
  {
    id: 2,
    question: "Нужно ли мне присутствовать при уборке?",
    answer: "Нет, это не обязательно. Вы можете встретить клинера, передать ключи и уехать по своим делам, а вернуться уже в чистую квартиру. Мы несем полную материальную ответственность за сохранность ваших вещей.",
  },
  {
    id: 3,
    question: "Как рассчитывается стоимость?",
    answer: "Стоимость фиксируется до начала работ и зависит от площади помещения и выбранного тарифа. Никаких скрытых платежей или доплат на месте. Вы платите ровно ту сумму, которую согласовали при заказе.",
  },
  {
    id: 4,
    question: "Что делать, если мне не понравится результат?",
    answer: "Мы гарантируем качество. Если после уборки вы обнаружите недочеты, просто сообщите нам об этом в течение 24 часов. Мы приедем и бесплатно все исправим.",
  },
  {
    id: 5,
    question: "Как быстро вы можете приехать?",
    answer: "Обычно мы можем организовать выезд клинера уже на следующий день после заявки. В некоторых случаях возможен срочный выезд в день обращения, если есть свободные специалисты.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4"
          >
            Частые вопросы
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-600 text-balance"
          >
            Ответы на самые популярные вопросы о наших услугах.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-inset rounded-2xl"
                aria-expanded={openId === faq.id}
              >
                <span className="text-lg font-bold text-slate-900 pr-8">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    openId === faq.id ? "bg-brand-blue text-white rotate-180" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/50 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}