import { useState, useEffect, useRef } from 'react';
import {
  Scissors,
  Clock,
  Users,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Calendar,
  CheckCircle,
  MessageCircle,
  ChevronDown,
  Star,
  Menu,
  X
} from 'lucide-react';

// ==================== DATA ====================

const services = [
  { name: 'Corte Tradicional', price: 'R$ 50,00', priceNum: 50 },
  { name: 'Corte Degrade / Americano / Low Fade', price: 'R$ 50,00', priceNum: 50 },
  { name: 'Cabelo e Barba', price: 'R$ 90,00', priceNum: 90 },
  { name: 'Cabelo, Barba e Sobrancelha', price: 'R$ 100,00', priceNum: 100 },
  { name: 'Cabelo e Bigode/Cavanhaque', price: 'R$ 65,00', priceNum: 65 },
  { name: 'Cabelo, Bigode/Cavanhaque e Sobrancelha', price: 'R$ 75,00', priceNum: 75 },
  { name: 'Corte + Pigmentação Básico', price: 'R$ 70,00', priceNum: 70 },
  { name: 'Corte + Pigmentação Completo', price: 'R$ 80,00', priceNum: 80 },
  { name: 'Luzes ou Reflexo + Corte', price: 'R$ 170,00', priceNum: 170 },
  { name: 'Platinado ou Coloração + Corte', price: 'R$ 250,00', priceNum: 250 },
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
];

const WHATSAPP_NUMBER = '5500000000000'; // Substituir pelo número real

// ==================== COMPONENTS ====================

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ==================== HEADER ====================

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-gold" />
            <span className="font-serif text-white font-bold text-lg hidden sm:block">Adriano do Corte</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-white/80 hover:text-gold transition-colors text-sm font-medium">Início</a>
            <a href="#servicos" className="text-white/80 hover:text-gold transition-colors text-sm font-medium">Serviços</a>
            <a href="#agendamento" className="text-white/80 hover:text-gold transition-colors text-sm font-medium">Agendamento</a>
            <a href="#diferenciais" className="text-white/80 hover:text-gold transition-colors text-sm font-medium">Diferenciais</a>
            <a href="#contato" className="text-white/80 hover:text-gold transition-colors text-sm font-medium">Contato</a>
          </nav>

          {/* CTA Button */}
          <a
            href="#agendamento"
            className="hidden md:inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-black font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 text-sm"
          >
            <Calendar className="w-4 h-4" />
            Agendar
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10 animate-slide-down">
          <nav className="flex flex-col px-4 py-4 gap-3">
            <a href="#home" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-gold transition-colors py-2">Início</a>
            <a href="#servicos" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-gold transition-colors py-2">Serviços</a>
            <a href="#agendamento" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-gold transition-colors py-2">Agendamento</a>
            <a href="#diferenciais" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-gold transition-colors py-2">Diferenciais</a>
            <a href="#contato" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-gold transition-colors py-2">Contato</a>
            <a
              href="#agendamento"
              onClick={() => setMenuOpen(false)}
              className="bg-gold text-black font-semibold px-5 py-3 rounded-full text-center mt-2"
            >
              Agendar Horário
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ==================== HERO SECTION ====================

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background with logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80%] max-w-2xl opacity-[0.06]">
          <img
            src="https://image.qwenlm.ai/generated-images/e5116ef6-89e5-4e04-b9df-f5b287990161/_result.png"
            alt="Logo Barbearia Adriano do Corte"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Logo Icon */}
        <div className="animate-fade-in-up mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gold/50 mb-4">
            <Scissors className="w-10 h-10 sm:w-12 sm:h-12 text-gold" />
          </div>
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up delay-100 font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          Barbearia<br />
          <span className="text-gold">Adriano do Corte</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-200 text-white/70 text-lg sm:text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto font-serif italic">
          Estilo, precisão e tradição em cada corte
        </p>

        {/* Decorative line */}
        <div className="animate-fade-in-up delay-300 flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-gold/50" />
          <Star className="w-4 h-4 text-gold" />
          <div className="h-px w-16 bg-gold/50" />
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in-up delay-400">
          <a
            href="#agendamento"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-dark text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-lg shadow-lg shadow-gold/20"
          >
            <Calendar className="w-5 h-5" />
            Agendar Horário
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>

        {/* Info badges */}
        <div className="animate-fade-in-up delay-500 flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-12 text-white/60 text-sm">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold" />
            Seg a Sáb: 09h - 19h
          </span>
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gold" />
            WhatsApp
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gold/50" />
      </div>
    </section>
  );
}

// ==================== SERVICES SECTION ====================

function ServicesSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="servicos" className="relative py-20 sm:py-28 bg-white">
      <div className="watermark-bg" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-gold font-medium text-sm uppercase tracking-widest">Nossos Serviços</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-3 mb-4">
            Tabela de Preços
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold" />
            <Scissors className="w-5 h-5 text-gold" />
            <div className="h-px w-12 bg-gold" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: { name: string; price: string }; index: number }) {
  const { ref, isVisible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`group relative bg-dark hover:bg-black border border-white/10 rounded-xl p-5 sm:p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-gold/10 hover:border-gold/30 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />
      
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Scissors className="w-4 h-4 text-gold flex-shrink-0" />
            <h3 className="text-white font-medium text-sm sm:text-base leading-tight">
              {service.name}
            </h3>
          </div>
        </div>
        <span className="text-gold font-bold text-lg sm:text-xl whitespace-nowrap">
          {service.price}
        </span>
      </div>
    </div>
  );
}

// ==================== BOOKING SECTION ====================

function BookingSection() {
  const { ref, isVisible } = useInView();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits.length ? `(${digits}` : '';
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone válido é obrigatório';
    }
    if (!formData.service) newErrors.service = 'Selecione um serviço';
    if (!formData.date) newErrors.date = 'Selecione uma data';
    if (!formData.time) newErrors.time = 'Selecione um horário';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      `🏷️ *Agendamento - Barbearia Adriano do Corte*\n\n` +
      `👤 *Nome:* ${formData.name}\n` +
      `📱 *Telefone:* ${formData.phone}\n` +
      `✂️ *Serviço:* ${formData.service}\n` +
      `📅 *Data:* ${formData.date}\n` +
      `🕐 *Horário:* ${formData.time}\n` +
      (formData.notes ? `📝 *Observações:* ${formData.notes}\n` : '') +
      `\n_Gostaria de confirmar este agendamento._`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (submitted) {
    return (
      <section id="agendamento" className="relative py-20 sm:py-28 bg-dark">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Agendamento Registrado!
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Seu pedido foi registrado com sucesso. Para confirmar, envie os dados pelo WhatsApp.
            </p>

            {/* Summary */}
            <div className="bg-black/50 border border-white/10 rounded-xl p-6 mb-8 text-left">
              <h3 className="text-gold font-semibold mb-4 text-lg">Resumo do Agendamento:</h3>
              <div className="space-y-3 text-white/80">
                <p><span className="text-white/50">Nome:</span> {formData.name}</p>
                <p><span className="text-white/50">Telefone:</span> {formData.phone}</p>
                <p><span className="text-white/50">Serviço:</span> {formData.service}</p>
                <p><span className="text-white/50">Data:</span> {formData.date}</p>
                <p><span className="text-white/50">Horário:</span> {formData.time}</p>
                {formData.notes && <p><span className="text-white/50">Observações:</span> {formData.notes}</p>}
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Enviar pelo WhatsApp
            </a>

            {/* New booking button */}
            <div className="mt-6">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', service: '', date: '', time: '', notes: '' });
                }}
                className="text-gold hover:text-gold-dark underline transition-colors"
              >
                Fazer novo agendamento
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="agendamento" className="relative py-20 sm:py-28 bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-gold font-medium text-sm uppercase tracking-widest">Agendamento</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Agende seu Horário
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold" />
            <Calendar className="w-5 h-5 text-gold" />
            <div className="h-px w-12 bg-gold" />
          </div>
          <p className="text-white/60 mt-4 max-w-lg mx-auto">
            Preencha o formulário abaixo e confirme seu agendamento via WhatsApp.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-black/40 border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="block text-white/80 text-sm font-medium mb-2">
                Nome completo <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Seu nome completo"
                className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Telefone / WhatsApp <span className="text-gold">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="(00) 00000-0000"
                maxLength={15}
                className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors`}
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Service */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Serviço desejado <span className="text-gold">*</span>
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className={`w-full bg-white/5 border ${errors.service ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors appearance-none`}
              >
                <option value="" className="bg-dark">Selecione um serviço</option>
                {services.map((s, i) => (
                  <option key={i} value={s.name} className="bg-dark">
                    {s.name} - {s.price}
                  </option>
                ))}
              </select>
              {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
            </div>

            {/* Date */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Data preferencial <span className="text-gold">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={getMinDate()}
                className={`w-full bg-white/5 border ${errors.date ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors`}
              />
              {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
            </div>

            {/* Time */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Horário preferencial <span className="text-gold">*</span>
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={`w-full bg-white/5 border ${errors.time ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors appearance-none`}
              >
                <option value="" className="bg-dark">Selecione um horário</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time} className="bg-dark">{time}</option>
                ))}
              </select>
              {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-white/80 text-sm font-medium mb-2">
                Observações <span className="text-white/40">(opcional)</span>
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Alguma preferência ou observação?"
                rows={3}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="inline-flex items-center gap-3 bg-gold hover:bg-gold-dark text-black font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 text-lg shadow-lg shadow-gold/20"
            >
              <CheckCircle className="w-5 h-5" />
              Confirmar Agendamento
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

// ==================== DIFFERENTIALS SECTION ====================

function DifferentialsSection() {
  const { ref, isVisible } = useInView();

  const differentials = [
    {
      icon: <Scissors className="w-8 h-8" />,
      title: 'Profissionais Experientes',
      description: 'Nossa equipe conta com barbeiros qualificados e com anos de experiência no mercado.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Pontualidade e Respeito',
      description: 'Respeitamos seu tempo. Agendamentos pontuais e atendimento sem demora.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Ambiente Acolhedor',
      description: 'Espaço moderno e confortável para você relaxar enquanto cuida do visual.'
    }
  ];

  return (
    <section id="diferenciais" className="relative py-20 sm:py-28 bg-white">
      <div className="watermark-bg" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-gold font-medium text-sm uppercase tracking-widest">Por que nos escolher</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-3 mb-4">
            Nossos Diferenciais
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold" />
            <Star className="w-5 h-5 text-gold" />
            <div className="h-px w-12 bg-gold" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {differentials.map((item, index) => (
            <DifferentialCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferentialCard({ item, index }: { item: { icon: React.ReactNode; title: string; description: string }; index: number }) {
  const { ref, isVisible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`group text-center bg-dark rounded-2xl p-8 border border-white/10 transition-all duration-500 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-6 group-hover:bg-gold/20 transition-colors duration-300">
        {item.icon}
      </div>
      <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
      <p className="text-white/60 leading-relaxed">{item.description}</p>
    </div>
  );
}

// ==================== CONTACT SECTION ====================

function ContactSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="contato" className="relative py-20 sm:py-28 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-gold font-medium text-sm uppercase tracking-widest">Contato</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Onde Estamos
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold" />
            <MapPin className="w-5 h-5 text-gold" />
            <div className="h-px w-12 bg-gold" />
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Address */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 text-center hover:border-gold/30 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 text-gold mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold mb-2">Endereço</h3>
            <p className="text-white/60 text-sm">
              Rua Exemplo, 123<br />
              Bairro - Cidade/UF<br />
              CEP: 00000-000
            </p>
          </div>

          {/* Phone */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 text-center hover:border-gold/30 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 text-gold mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold mb-2">Telefone</h3>
            <p className="text-white/60 text-sm">
              WhatsApp:<br />
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-gold hover:underline">(00) 00000-0000</a>
            </p>
          </div>

          {/* Hours */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 text-center hover:border-gold/30 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 text-gold mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold mb-2">Horário</h3>
            <p className="text-white/60 text-sm">
              Segunda a Sexta: 09h - 19h<br />
              Sábado: 09h - 19h<br />
              Domingo: Fechado
            </p>
          </div>

          {/* Social */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 text-center hover:border-gold/30 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 text-gold mb-4">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold mb-2">Redes Sociais</h3>
            <div className="flex items-center justify-center gap-4 mt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold hover:text-black transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold hover:text-black transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== FOOTER ====================

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-gold" />
            <span className="font-serif text-white font-bold text-sm">Adriano do Corte</span>
          </div>

          {/* Copyright */}
          <p className="text-white/40 text-sm text-center">
            © 2026 Barbearia Adriano do Corte. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ==================== FLOATING WHATSAPP BUTTON ====================

function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110"
      title="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}

// ==================== APP ====================

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ServicesSection />
      <BookingSection />
      <DifferentialsSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
