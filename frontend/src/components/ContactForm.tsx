"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus("error");
      setErrorMessage("Пожалуйста, заполните обязательные поля (Имя и Телефон).");
      return;
    }

    // Phone validation (simple regex for Russian numbers)
    const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      setStatus("error");
      setErrorMessage("Пожалуйста, введите корректный номер телефона.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // API call to backend
      const response = await fetch("http://127.0.0.1:8000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service: "Лендинг", // Default service
          message: formData.message || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке заявки");
      }

      setStatus("success");
      setFormData({ name: "", phone: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("error");
      setErrorMessage("Произошла ошибка при отправке. Пожалуйста, попробуйте позже или позвоните нам.");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-blue-50/50" />
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-brand-blue/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-brand-mint/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/3 translate-y-1/4" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="glass-card overflow-hidden shadow-2xl shadow-blue-900/10 border-white/60">
          <div className="grid md:grid-cols-5 h-full">
            {/* Left side - Info */}
            <div className="md:col-span-2 bg-gradient-to-br from-brand-blue to-brand-lavender p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 text-white">Оставьте заявку</h3>
                <p className="text-blue-100 leading-relaxed mb-8">
                  Заполните форму, и наш менеджер свяжется с вами в течение 15 минут для уточнения деталей и расчета точной стоимости.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <CheckCircle2 className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Бесплатный расчет</h4>
                      <p className="text-blue-100 text-sm">Без скрытых платежей</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <CheckCircle2 className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Скидка 10%</h4>
                      <p className="text-blue-100 text-sm">На первый заказ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="md:col-span-3 p-10 lg:p-12 bg-white/50 backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Ваше имя <span className="text-brand-blue">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Иван Иванов"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                    disabled={status === "loading" || status === "success"}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Телефон <span className="text-brand-blue">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                    disabled={status === "loading" || status === "success"}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Пожелания или комментарий
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Например: нужна генеральная уборка 3-комнатной квартиры..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all resize-none"
                    disabled={status === "loading" || status === "success"}
                  />
                </div>

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-600"
                  >
                    <AlertCircle size={20} className="shrink-0 mt-0.5" />
                    <p className="text-sm">{errorMessage}</p>
                  </motion.div>
                )}

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3 text-emerald-600"
                  >
                    <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.</p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-brand-blue hover:bg-sky-500 rounded-xl shadow-lg shadow-brand-blue/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === "loading" ? (
                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : status === "success" ? (
                    <>Отправлено <CheckCircle2 size={20} /></>
                  ) : (
                    <>Отправить заявку <Send size={20} /></>
                  )}
                </button>
                
                <p className="text-xs text-center text-slate-500 mt-4">
                  Нажимая кнопку, вы соглашаетесь с <a href="#" className="underline hover:text-brand-blue">политикой конфиденциальности</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}