"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Bubbles */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-40 right-10 w-72 h-72 bg-brand-mint/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute -bottom-8 left-40 w-72 h-72 bg-brand-lavender/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/60 text-brand-blue font-medium text-sm mb-6 shadow-sm">
              <Sparkles size={16} />
              <span>Профессиональный клининг в вашем городе</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight text-balance">
              Идеальная чистота <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-lavender">
                без лишних забот
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 text-balance">
              Доверьте уборку профессионалам. Эко-средства, фиксированная цена и гарантия качества на все виды услуг.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-brand-blue hover:bg-sky-500 rounded-2xl shadow-lg shadow-brand-blue/30 transition-all hover:-translate-y-1"
              >
                Оставить заявку
                <ArrowRight size={20} />
              </Link>
              <Link
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-700 bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm transition-all hover:-translate-y-1"
              >
                Наши услуги
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square lg:aspect-auto lg:h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-8 border-white/40 backdrop-blur-sm">
              <Image
                src="/foto1.jpg"
                alt="Профессиональная уборка"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-8 -left-8 sm:left-8 bg-white/80 backdrop-blur-xl border border-white/50 p-4 rounded-2xl shadow-xl flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-brand-mint/20 rounded-full flex items-center justify-center text-brand-mint">
                  <Sparkles size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Рейтинг клиентов</p>
                  <p className="text-xl font-bold text-slate-900">4.9 / 5.0</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}