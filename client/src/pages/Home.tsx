import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, FileText, Clock, Shield, BarChart3, Users, MessageSquare, Phone, Mail, MapPin, Menu, X, Moon, Sun, Scale, Gavel, FileCheck, AlertTriangle, UserCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "17996091291";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

const formatWhatsAppMessage = (data: any) => {
  const message = `*Novo Contato - Advocacia Carina Leme*\n\n*Nome:* ${data.name}\n*WhatsApp:* ${data.whatsapp}\n*Email:* ${data.email || "Não informado"}\n*Cidade/UF:* ${data.city || "Não informado"}\n*Situação:* ${data.situation || "Não informado"}\n*Mensagem:* ${data.message || "Sem mensagem"}\n\nAutorização de dados: Sim`;
  return encodeURIComponent(message);
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    city: "",
    situation: "",
    message: "",
    authorized: false,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.authorized) {
      toast.error("Por favor, autorize o uso de seus dados");
      return;
    }
    
    const message = formatWhatsAppMessage(formData);
    window.open(`${WHATSAPP_LINK}?text=${message}`, "_blank");
    
    toast.success("Redirecionando para WhatsApp...");
    setFormData({
      name: "",
      whatsapp: "",
      email: "",
      city: "",
      situation: "",
      message: "",
      authorized: false,
    });
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Header/Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-dark py-2' : 'bg-transparent py-4'}`}>
        <div className="container flex items-center justify-between">
          <motion.a 
            href="#inicio" 
            className="flex items-center gap-2 hover-glow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img
              src="/logo-menu.png"
              alt="Advocacia Carina Alves Leme"
              className="h-12 w-auto"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {["Início", "Serviços", "Como Funciona", "Diferenciais", "FAQ", "Contato"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                className="text-sm font-medium hover:text-accent transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Theme Toggle & CTA */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full glass hover:bg-accent/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "dark" ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-accent" />}
            </motion.button>

            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden md:block">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground skeu-button font-bold">
                Falar no WhatsApp
              </Button>
            </a>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-dark mt-2 p-4 flex flex-col gap-4 overflow-hidden"
            >
              {["Início", "Serviços", "Como Funciona", "Diferenciais", "FAQ", "Contato"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                  className="text-sm font-medium hover:text-accent transition-colors text-left py-2"
                >
                  {item}
                </button>
              ))}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground skeu-button">
                  Falar no WhatsApp
                </Button>
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,134,11,0.1),transparent_50%)]"></div>
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block">Soluções jurídicas para a</span>
                <span className="gradient-text">nulidade de infrações</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Defesa de multas, regularização de CNH, análise de infrações e revisão de cobranças de seguros e juros. Protegemos seus direitos com suporte especializado.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-lg h-14 px-8 skeu-button font-bold">
                    Avaliar Meu Caso
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-lg h-14 px-8 border-accent/50 hover:bg-accent/10 hover-lift"
                  onClick={() => scrollToSection("servicos")}
                >
                  Conhecer Serviços
                </Button>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass p-4 rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                <img
                  src="/foto-inicio.jpeg"
                  alt="Advocacia"
                  className="rounded-xl w-full h-auto shadow-inner"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass p-6 rounded-xl hidden md:block animate-bounce" style={{ animationDuration: '3s' }}>
                <Scale className="text-accent w-10 h-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-accent/5 border-y border-accent/10">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              { title: "Multa injusta?", desc: "Analisamos vícios formais e materiais para anular ou reduzir penalidades.", icon: AlertTriangle },
              { title: "Pontos somando?", desc: "Estratégias legais para evitar suspensão e proteger seu direito de dirigir.", icon: BarChart3 },
              { title: "Prazo correndo?", desc: "Protocolos dentro dos prazos do DETRAN/CONTRAN, com prioridade total.", icon: Clock },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="glass p-8 rounded-2xl text-center hover-glow hover-lift">
                <stat.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{stat.title}</h3>
                <p className="text-muted-foreground">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 md:py-32">
        <div className="container">
          <motion.div 
            className="text-center mb-20"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">Nossos Serviços</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Atuação especializada em todas as áreas do Direito de Trânsito com foco em resultados.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              { title: "Recurso de Multas", icon: Gavel },
              { title: "Suspensão da CNH", icon: Shield },
              { title: "Cassação da CNH", icon: Scale },
              { title: "Defesa Prévia", icon: FileCheck },
              { title: "Crimes de Trânsito", icon: AlertTriangle },
              { title: "Transferência de Pontos", icon: Users },
            ].map((service, i) => (
              <motion.div key={i} variants={fadeInUp} className="glass p-8 rounded-2xl group hover:bg-accent/10 transition-all duration-500">
                <service.icon className="w-14 h-14 text-accent mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button variant="link" className="text-accent p-0 h-auto font-bold hover:translate-x-2 transition-transform">
                    Fale comigo! →
                  </Button>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 bg-card/50 relative overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass p-4 rounded-2xl -rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/foto-sobre.jpeg"
                  alt="Dra. Carina Leme"
                  className="rounded-xl w-full h-auto"
                />
              </div>
              <div className="absolute -top-8 -right-8 glass p-6 rounded-full animate-pulse">
                <UserCheck className="text-accent w-12 h-12" />
              </div>
            </motion.div>
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold gradient-text">Dra. Carina Leme</h2>
              <p className="text-2xl font-semibold text-accent">OAB/SP 472.156</p>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>Graduada em Direito com especialização em Direito de Trânsito, com centenas de casos solucionados com sucesso.</p>
                <ul className="space-y-4">
                  {[
                    "Especialista em Recursos de Multas",
                    "Defesa em Suspensão e Cassação de CNH",
                    "Atuação em Crimes de Trânsito",
                    "Atendimento Digital e Presencial"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8 skeu-button font-bold">
                  Falar com Advogada
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 md:py-32">
        <div className="container max-w-4xl">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">Dúvidas Frequentes</h2>
            <p className="text-xl text-muted-foreground">Esclarecemos as principais questões sobre seus direitos no trânsito.</p>
          </motion.div>

          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "Perdi o prazo, ainda dá tempo?", a: "Depende da fase do processo. Analiso o caso e verifico alternativas cabíveis para reverter a situação." },
                { q: "A recusa ao bafômetro sempre gera multa?", a: "A autuação existe, mas cada caso exige análise minuciosa dos procedimentos adotados pelo agente." },
                { q: "Quanto tempo leva um recurso?", a: "Varia conforme o órgão e a etapa. Informo prazos estimados logo após o diagnóstico inicial." },
                { q: "Preciso ir ao escritório?", a: "Não necessariamente. Nosso atendimento é 100% digital para sua maior comodidade." },
                { q: "Quanto custa?", a: "Os honorários são definidos após a avaliação da complexidade do seu caso específico." },
                { q: "Quais documentos enviar?", a: "Auto de infração, CNH e um breve relato do ocorrido são suficientes para começar." },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass px-6 rounded-xl border-none">
                  <AccordionTrigger className="text-lg font-bold hover:text-accent transition-colors py-6">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 md:py-32 bg-accent/5">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div 
              className="space-y-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">Entre em Contato</h2>
                <p className="text-xl text-muted-foreground">Receba sua avaliação jurídica gratuita em até 1h comercial.</p>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 glass rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                    <Phone className="text-accent group-hover:text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <p className="text-xl font-bold">(17) 99609-1291</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 glass rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                    <Mail className="text-accent group-hover:text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="text-xl font-bold">carinaleme.adv@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 glass rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                    <MapPin className="text-accent group-hover:text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Endereço</p>
                    <p className="text-xl font-bold">AV DOS BANDEIRANTES, 2170, OUROESTE - SP</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="glass p-8 md:p-12 rounded-3xl shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleFormChange} required className="bg-white/5 border-white/10 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp *</Label>
                    <Input id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleFormChange} required className="bg-white/5 border-white/10 h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleFormChange} className="bg-white/5 border-white/10 h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="situation">Situação</Label>
                  <Select value={formData.situation} onValueChange={(v) => setFormData(p => ({ ...p, situation: v }))}>
                    <SelectTrigger className="bg-white/5 border-white/10 h-12">
                      <SelectValue placeholder="Selecione sua situação" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Multa", "Pontos", "Suspensão", "Cassação", "Outro"].map(s => (
                        <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleFormChange} className="bg-white/5 border-white/10 min-h-[120px]" />
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="authorized" checked={formData.authorized} onCheckedChange={(c) => setFormData(p => ({ ...p, authorized: c as boolean }))} />
                  <Label htmlFor="authorized" className="text-sm cursor-pointer text-muted-foreground">Autorizo o uso dos meus dados para contato e avaliação *</Label>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-14 text-lg skeu-button font-bold">
                  Enviar e Falar no WhatsApp
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-white/10 py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <img src="/logo-rodape.png" alt="Logo" className="h-16 w-auto" />
              <p className="text-muted-foreground">Advocacia especializada em Direito de Trânsito com atendimento digital e presencial em todo o Brasil.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-accent">Navegação</h3>
              <ul className="space-y-4 text-muted-foreground">
                {["Início", "Serviços", "Como Funciona", "FAQ"].map(item => (
                  <li key={item}><button onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))} className="hover:text-accent transition-colors">{item}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-accent">Contato</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li>(17) 99609-1291</li>
                <li>carinaleme.adv@gmail.com</li>
                <li>Ouroeste/SP</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-accent">Especialidades</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li>Recursos de Multas</li>
                <li>Suspensão de CNH</li>
                <li>Cassação de CNH</li>
                <li>Crimes de Trânsito</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024-2026 CARINA LEME ADVOCACIA. Todos os direitos reservados.</p>
            <p>Desenvolvido por Apezato Marketing</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 pulse-ring"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl skeu-button">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.259-1.02 1.02-1.756 2.117-2.259 3.355-.606 1.605-.949 3.362-.949 5.209 0 .891.057 1.789.169 2.674l-1.195 4.374c-.713 2.636.26 4.123 1.884 4.123.779 0 1.496-.19 2.23-.558l4.332-1.352c.955.201 1.93.3 2.945.3 5.048 0 9.14-4.092 9.14-9.14 0-2.437-.944-4.73-2.665-6.452-1.72-1.72-4.015-2.665-6.452-2.665" />
          </svg>
        </div>
      </motion.a>
    </div>
  );
}
