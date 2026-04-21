import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white">
                <Image
                  src="/logo.png"
                  alt="ClearSpace Logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                ClearSpace
              </span>
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Профессиональный клининг для вашего дома и офиса. Мы делаем жизнь чище и комфортнее, освобождая ваше время для важных дел.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white transition-colors" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Услуги</h4>
            <ul className="space-y-3">
              <li><Link href="#services" className="text-sm hover:text-brand-blue transition-colors">Генеральная уборка</Link></li>
              <li><Link href="#services" className="text-sm hover:text-brand-blue transition-colors">Поддерживающая уборка</Link></li>
              <li><Link href="#services" className="text-sm hover:text-brand-blue transition-colors">Уборка после ремонта</Link></li>
              <li><Link href="#services" className="text-sm hover:text-brand-blue transition-colors">Химчистка мебели</Link></li>
              <li><Link href="#services" className="text-sm hover:text-brand-blue transition-colors">Мойка окон</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Компания</h4>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-sm hover:text-brand-blue transition-colors">О нас</Link></li>
              <li><Link href="#portfolio" className="text-sm hover:text-brand-blue transition-colors">Наши работы</Link></li>
              <li><Link href="#testimonials" className="text-sm hover:text-brand-blue transition-colors">Отзывы</Link></li>
              <li><Link href="#faq" className="text-sm hover:text-brand-blue transition-colors">Вопросы и ответы</Link></li>
              <li><Link href="#contact" className="text-sm hover:text-brand-blue transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Связаться с нами</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+78000000000" className="text-sm hover:text-brand-blue transition-colors block mb-1">+7 (800) 000-00-00</a>
                  <span className="text-xs text-slate-500 block">Ежедневно с 9:00 до 21:00</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-brand-blue shrink-0 mt-0.5" />
                <a href="mailto:hello@clearspace.ru" className="text-sm hover:text-brand-blue transition-colors">hello@clearspace.ru</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-blue shrink-0 mt-0.5" />
                <span className="text-sm">г. Москва, ул. Примерная, д. 123, офис 45</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} ClearSpace. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Политика конфиденциальности</Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}