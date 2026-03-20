import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, Shield, BarChart3, Users, Phone, Mail, MapPin, Menu, X, Moon, Sun, Scale, Gavel, FileCheck, AlertTriangle, UserCheck, Instagram, Facebook, Baby, Activity, CalendarCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "17996091291";
const WHATSAPP_BASE_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const getWhatsAppLink = (message: string) => {
  return `${WHATSAPP_BASE_LINK}?text=${encodeURIComponent(message)}`;
};

const formatWhatsAppFormMessage = (data: any) => {
  const message = `*Novo Contato - Advocacia Carina Leme*\n\n*Nome:* ${data.name}\n*WhatsApp:* ${data.whatsapp}\n*Email:* ${data.email || "Não informado"}\n*Cidade/UF:* ${data.city || "Não informado"}\n*Situação:* ${data.situation || "Não informado"}\n*Mensagem:* ${data.message || "Sem mensagem"}\n\nAutorização de dados: Sim`;
  return encodeURIComponent(message);
};

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true }
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section for menu underline
      const sections = ["inicio", "servicos", "como-funciona", "diferenciais", "faq", "contato"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
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
    
    const message = formatWhatsAppFormMessage(formData);
    window.open(`${WHATSAPP_BASE_LINK}?text=${message}`, "_blank");
    
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

  const openLegalModal = (type: 'terms' | 'privacy' | 'cookies') => {
    const content = {
      terms: {
        title: "Termos de Uso",
        content: `Estes Termos de Uso regem o acesso e a utilização do site da Advocacia Carina Alves Leme. Ao acessar este site, você concorda com as seguintes condições:

1. Finalidade Informativa: O conteúdo deste site é meramente informativo e não constitui aconselhamento jurídico formal. A consulta a um advogado é indispensável para casos específicos.
2. Propriedade Intelectual: Todo o conteúdo, logotipos e design são de propriedade exclusiva da Advocacia Carina Alves Leme, sendo proibida a reprodução sem autorização prévia.
3. Responsabilidade: Não nos responsabilizamos por decisões tomadas com base exclusiva nas informações aqui contidas.
4. Alterações: Reservamo-nos o direito de atualizar estes termos a qualquer momento, sem aviso prévio.`
      },
      privacy: {
        title: "Política de Privacidade",
        content: `Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), informamos como tratamos seus dados:

1. Coleta de Dados: Coletamos dados fornecidos voluntariamente através de nossos formulários de contato (nome, WhatsApp, e-mail).
2. Finalidade: Os dados são utilizados exclusivamente para responder às suas solicitações e realizar avaliações jurídicas preliminares.
3. Armazenamento: Seus dados são armazenados em ambiente seguro e não são compartilhados com terceiros sem o seu consentimento expresso.
4. Seus Direitos: Você tem o direito de solicitar a correção, exclusão ou acesso aos seus dados a qualquer momento através de nossos canais de contato.`
      },
      cookies: {
        title: "Política de Cookies",
        content: `Este site utiliza cookies para melhorar sua experiência de navegação:

1. O que são cookies: Pequenos arquivos de texto armazenados no seu navegador para lembrar suas preferências.
2. Tipos de Cookies: Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para entender como os usuários interagem com nosso conteúdo.
3. Gerenciamento: Você pode desativar os cookies nas configurações do seu navegador, embora isso possa afetar algumas funcionalidades do site.
4. Consentimento: Ao continuar navegando, você concorda com o uso de cookies conforme descrito nesta política.`
      }
    };
    setModalContent(content[type]);
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${theme === 'dark' ? 'dark' : ''} selection:bg-accent selection:text-accent-foreground`}>
      {/* Header/Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-dark py-2' : 'bg-transparent py-6'}`}>
        <div className="container flex items-center justify-between">
          <motion.button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 hover-glow transition-all logo-float cursor-pointer"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/logo-menu.png"
              alt="Advocacia Carina Alves Leme"
              className="h-12 md:h-16 w-auto"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Início", id: "inicio" },
              { label: "Serviços", id: "servicos" },
              { label: "Como Funciona", id: "como-funciona" },
              { label: "Diferenciais", id: "diferenciais" },
              { label: "FAQ", id: "faq" },
              { label: "Contato", id: "contato" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-bold uppercase tracking-widest menu-link cursor-pointer ${activeSection === item.id ? 'active text-accent' : 'hover:text-accent'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Theme Toggle & CTA */}
          <div className="flex items-center gap-4 md:gap-6">
            <motion.button
              onClick={toggleTheme}
              className="p-2 md:p-3 rounded-full glass hover:bg-accent/20 transition-all duration-500 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Alternar tema"
            >
              {theme === "dark" ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-accent" />}
            </motion.button>

            <a 
              href={getWhatsAppLink("Olá Dra. Carina, vim através do site e gostaria de uma consultoria jurídica.")} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden md:block cursor-pointer"
            >
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground neon-button skeu-button font-black px-6 h-12 cursor-pointer">
                Falar no WhatsApp
              </Button>
            </a>

            <button className="md:hidden p-2 glass rounded-lg cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
              className="md:hidden glass-dark mt-2 p-6 flex flex-col gap-4 overflow-hidden rounded-2xl mx-4 shadow-2xl border border-white/10"
            >
              {[
                { label: "Início", id: "inicio" },
                { label: "Serviços", id: "servicos" },
                { label: "Como Funciona", id: "como-funciona" },
                { label: "Diferenciais", id: "diferenciais" },
                { label: "FAQ", id: "faq" },
                { label: "Contato", id: "contato" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-lg font-bold transition-colors text-left border-b border-white/5 pb-2 cursor-pointer ${activeSection === item.id ? 'text-accent' : 'hover:text-accent'}`}
                >
                  {item.label}
                </button>
              ))}
              <a href={getWhatsAppLink("Olá Dra. Carina, vim através do site e gostaria de uma consultoria jurídica.")} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground neon-button skeu-button font-black h-14 mt-2 cursor-pointer">
                  Falar no WhatsApp
                </Button>
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,179,88,0.1),transparent_70%)]"></div>
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div 
              className="space-y-8 md:space-y-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter">
                <span className="block">Soluções jurídicas para a</span>
                <span className="gradient-text">nulidade de infrações</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed font-medium">
                Defesa de multas, regularização de CNH e análise de infrações. Protegemos seus direitos com suporte jurídico de elite.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href={getWhatsAppLink("Olá Dra. Carina, gostaria de uma avaliação gratuita do meu caso de trânsito.")} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                  <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-lg md:text-xl h-16 px-10 neon-button skeu-button font-black cursor-pointer">
                    Avaliar Meu Caso
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-lg md:text-xl h-16 px-10 border-accent/50 hover:bg-accent/10 hover-lift font-bold transition-all neon-button cursor-pointer"
                  onClick={() => scrollToSection("servicos")}
                >
                  Conhecer Serviços
                </Button>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="glass p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-2xl">
                <img
                  src="/foto-inicio.jpeg"
                  alt="Dra. Carina Leme"
                  className="rounded-[1.5rem] md:rounded-[2.5rem] w-full h-auto shadow-inner"
                />
              </div>
              <motion.div 
                className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl hidden lg:block shadow-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Scale className="text-accent w-12 h-12" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="diferenciais" className="py-20 bg-accent/5 border-y border-accent/10">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
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
              <motion.div key={i} variants={fadeInUp} className="glass p-8 md:p-10 rounded-[2rem] text-center hover-glow hover-lift group transition-all">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:bg-accent transition-colors duration-500">
                  <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4">{stat.title}</h3>
                <p className="text-lg md:text-xl text-muted-foreground font-medium">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 md:py-32">
        <div className="container">
          <motion.div 
            className="text-center mb-16 md:mb-24"
            {...fadeInUp}
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 gradient-text">Nossos Serviços</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
              Atuação especializada em Direito de Trânsito e Previdenciário com foco em resultados de elite.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              { title: "Auxílio Maternidade", icon: Baby, btn: "Solicitar Benefício", msg: "Olá Dra. Carina, vim através do site e gostaria de saber mais sobre como solicitar o Auxílio Maternidade." },
              { title: "Aposentadoria por Incapacidade Temporária (Auxílio Doença)", icon: Activity, btn: "Dar Entrada no Benefício", msg: "Olá Dra. Carina, vim através do site e gostaria de saber mais sobre como dar entrada na Aposentadoria por Incapacidade Temporária (Auxílio Doença)." },
              { title: "Aposentadoria", icon: CalendarCheck, btn: "Planejar Aposentadoria", msg: "Olá Dra. Carina, vim através do site e gostaria de realizar um planejamento de aposentadoria." },
              { title: "Auxílio Acidente", icon: AlertTriangle, btn: "Solicitar Auxílio", msg: "Olá Dra. Carina, vim através do site e gostaria de saber mais sobre como solicitar o Auxílio Acidente." },
              { title: "Recurso de Multas", icon: Gavel, btn: "Recorrer Multa", msg: "Olá Dra. Carina, vim através do site e gostaria de saber mais sobre como funciona o processo de recurso de multas." },
              { title: "Suspensão da CNH", icon: Shield, btn: "Evitar Suspensão", msg: "Olá Dra. Carina, vim através do site e gostaria de saber mais sobre como funciona o processo de suspensão da CNH." },
              { title: "Cassação da CNH", icon: Scale, btn: "Reverter Cassação", msg: "Olá Dra. Carina, vim através do site e gostaria de saber mais sobre como funciona o processo de cassação da CNH." },
              { title: "Defesa Prévia", icon: FileCheck, btn: "Iniciar Defesa", msg: "Olá Dra. Carina, vim através do site e gostaria de saber mais sobre como a defesa prévia em processos administrativos." },
              { title: "Crimes de Trânsito", icon: AlertTriangle, btn: "Defesa Criminal", msg: "Olá Dra. Carina, vim através do site e gostaria de saber mais sobre a defesa jurídica em casos de crimes de trânsito." },
              { title: "Transferência de Pontos", icon: Users, btn: "Transferir Pontos", msg: "Olá Dra. Carina, vim através do site e gostaria de saber mais sobre a possibilidade de transferência de pontos na CNH." },
            ].map((service, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp} 
                className="glass p-8 md:p-10 rounded-[2rem] group hover:bg-accent/10 transition-all duration-700 relative overflow-hidden border border-white/5"
                whileHover={{ y: -10 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-accent/20 transition-all duration-700"></div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="inline-block"
                >
                  <service.icon className="w-12 h-12 md:w-16 md:h-16 text-accent mb-6 md:mb-8 transition-all duration-500" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-black mb-6">{service.title}</h3>
                <a href={getWhatsAppLink(service.msg)} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                  <Button className="bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground neon-button skeu-button font-black w-full h-14 text-lg transition-all cursor-pointer">
                    {service.btn}
                  </Button>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-24 md:py-32 bg-card/30">
        <div className="container">
          <motion.div className="text-center mb-16 md:mb-24" {...fadeInUp}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 gradient-text">Como Funciona</h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">Processo simples e transparente do início ao fim.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Diagnóstico Gratuito", desc: "Analisamos seu caso sem compromisso e identificamos as melhores estratégias jurídicas." },
              { step: "02", title: "Estratégia Personalizada", desc: "Desenvolvemos a defesa mais adequada para sua situação específica, focando na nulidade." },
              { step: "03", title: "Acompanhamento Total", desc: "Você fica informado de cada etapa do processo até a solução final, com suporte direto." }
            ].map((item, i) => (
              <motion.div key={i} {...fadeInUp} className="relative p-8 glass rounded-3xl border border-white/5 hover-lift transition-all">
                <span className="text-6xl font-black text-accent/20 absolute top-4 right-6">{item.step}</span>
                <h3 className="text-2xl font-black mb-4 relative z-10">{item.title}</h3>
                <p className="text-lg text-muted-foreground font-medium relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-2xl">
                <img
                  src="/foto-sobre.jpeg"
                  alt="Dra. Carina Leme"
                  className="rounded-[1.5rem] md:rounded-[2.5rem] w-full h-auto"
                />
              </div>
              <motion.div 
                className="absolute -top-8 -right-8 glass p-8 rounded-full shadow-2xl hidden md:block"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <UserCheck className="text-accent w-12 h-12" />
              </motion.div>
            </motion.div>
            <motion.div 
              className="space-y-8 md:space-y-10"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black gradient-text">Dra. Carina Leme</h2>
              <p className="text-2xl md:text-3xl font-black text-accent">OAB/SP 410.172</p>
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-medium">
                <p>Graduada em Direito com especialização em Direito de Trânsito, com centenas de casos solucionados com sucesso em todo o território nacional.</p>
                <ul className="space-y-4">
                  {[
                    "Especialista em Trânsito e Previdenciário",
                    "Defesa em Suspensão e Cassação de CNH",
                    "Atuação em Crimes de Trânsito",
                    "Atendimento Digital e Presencial"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-accent rounded-full shadow-[0_0_10px_rgba(197,179,88,0.8)]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a href={getWhatsAppLink("Olá Dra. Carina, gostaria de agendar uma consulta jurídica.")} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground h-16 px-10 neon-button skeu-button font-black text-xl transition-all cursor-pointer">
                  Falar com Advogada
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 md:py-32 bg-accent/5">
        <div className="container max-w-4xl">
          <motion.div className="text-center mb-16 md:mb-24" {...fadeInUp}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 gradient-text">Dúvidas Frequentes</h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">Esclarecemos as principais questões sobre seus direitos no trânsito.</p>
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
                <AccordionItem key={i} value={`item-${i}`} className="glass px-6 md:px-10 rounded-2xl border border-white/10 shadow-lg hover:border-accent/30 transition-all duration-500">
                  <AccordionTrigger className="text-xl md:text-2xl font-black hover:text-accent transition-colors py-6 text-left cursor-pointer">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg md:text-xl font-medium pb-6 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <motion.div 
              className="space-y-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 gradient-text">Entre em Contato</h2>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">Receba sua avaliação jurídica gratuita em até 1h comercial.</p>
              </div>
              
              <div className="space-y-8">
                {[
                  { icon: Phone, label: "WhatsApp", value: "(17) 99609-1291" },
                  { icon: Mail, label: "E-mail", value: "carinaleme.adv@hotmail.com" },
                  { icon: MapPin, label: "Endereço", value: "Rua Domingos Jorge Velho 1595, Centro, Ouroeste/SP" },
                  { icon: Clock, label: "Horário", value: "Segunda a Sexta, das 09:00 às 17:00" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-accent transition-all duration-500 shadow-xl border border-white/5">
                      <item.icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-all duration-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">{item.label}</p>
                      <p className="text-lg md:text-xl font-black">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="glass p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white/10"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-bold">Nome *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleFormChange} required className="bg-white/5 border-white/10 h-14 text-lg rounded-xl focus:ring-accent" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-base font-bold">WhatsApp *</Label>
                    <Input id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleFormChange} required className="bg-white/5 border-white/10 h-14 text-lg rounded-xl focus:ring-accent" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-bold">E-mail</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleFormChange} className="bg-white/5 border-white/10 h-14 text-lg rounded-xl focus:ring-accent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="situation" className="text-base font-bold">Situação</Label>
                  <Select value={formData.situation} onValueChange={(v) => setFormData(p => ({ ...p, situation: v }))}>
                    <SelectTrigger className="bg-white/5 border-white/10 h-14 text-lg rounded-xl cursor-pointer">
                      <SelectValue placeholder="Selecione sua situação" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Multa", "Pontos", "Suspensão", "Cassação", "Outro"].map(s => (
                        <SelectItem key={s} value={s.toLowerCase()} className="cursor-pointer">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base font-bold">Mensagem</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleFormChange} className="bg-white/5 border-white/10 min-h-[120px] text-lg rounded-xl focus:ring-accent" />
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="authorized" checked={formData.authorized} onCheckedChange={(c) => setFormData(p => ({ ...p, authorized: c as boolean }))} className="w-5 h-5 border-accent cursor-pointer" />
                  <Label htmlFor="authorized" className="text-sm cursor-pointer text-muted-foreground font-medium">Autorizo o uso dos meus dados para contato e avaliação *</Label>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-16 text-xl neon-button skeu-button font-black transition-all cursor-pointer">
                  Enviar e Falar no WhatsApp
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section with Google Maps */}
      <section id="localizacao" className="py-24 md:py-32 bg-accent/5">
        <div className="container">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 gradient-text">Localização</h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">Visite nosso escritório ou agende uma consulta presencial.</p>
          </motion.div>
          
          <motion.div 
            className="glass p-2 md:p-4 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl h-[400px] md:h-[500px] relative border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.5623636363636!2d-50.4398333!3d-20.0000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9497999999999999%3A0x9999999999999999!2sRua%20Domingos%20Jorge%20Velho%2C%201595%20-%20Centro%2C%20Ouroeste%20-%20SP%2C%2015685-000!5e0!3m2!1spt-BR!2sbr!4v1710547200000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '1.5rem md:2.5rem' }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-white/10 py-24 md:py-32">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-20 space-y-10">
            <motion.button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              viewport={{ once: true }}
              className="transition-transform logo-float cursor-pointer"
            >
              <img 
                src="/logo-rodape.png" 
                alt="Logo" 
                className="h-40 md:h-64 w-auto"
              />
            </motion.button>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium">Advocacia especializada em Direito de Trânsito e Previdenciário com atendimento digital e presencial em todo o Brasil.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-20 text-center md:text-left">
            <div>
              <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8 text-accent uppercase tracking-widest">Navegação</h3>
              <ul className="space-y-4 text-lg md:text-xl text-muted-foreground font-bold">
                {[
                  { label: "Início", id: "inicio" },
                  { label: "Serviços", id: "servicos" },
                  { label: "Como Funciona", id: "como-funciona" },
                  { label: "FAQ", id: "faq" }
                ].map(item => (
                  <li key={item.id}>
                    <button 
                      onClick={() => scrollToSection(item.id)} 
                      className="footer-nav-link cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8 text-accent uppercase tracking-widest">Contato</h3>
              <ul className="space-y-4 text-lg md:text-xl text-muted-foreground font-bold">
                <li className="footer-link cursor-pointer">(17) 99609-1291</li>
                <li className="footer-link cursor-pointer">carinaleme.adv@hotmail.com</li>
                <li className="footer-link cursor-pointer">Ouroeste/SP</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8 text-accent uppercase tracking-widest">Especialidades</h3>
              <ul className="space-y-4 text-lg md:text-xl text-muted-foreground font-bold">
                <li className="footer-link cursor-pointer">Recursos de Multas</li>
                <li className="footer-link cursor-pointer">Suspensão de CNH</li>
                <li className="footer-link cursor-pointer">Cassação de CNH</li>
                <li className="footer-link cursor-pointer">Direito Previdenciário</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8 text-accent uppercase tracking-widest">Redes Sociais</h3>
              <div className="flex justify-center md:justify-start gap-6">
                <a 
                  href="https://www.instagram.com/adv.carinaleme?igsh=ejR3dnRja3BiYzUy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon cursor-pointer"
                >
                  <Instagram />
                </a>
                <a 
                  href="https://www.facebook.com/share/1EQnA3viT3/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon cursor-pointer"
                >
                  <Facebook />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10 flex flex-col items-center gap-6 text-base md:text-lg text-muted-foreground font-bold text-center">
            <p>© 2024-2026 CARINA LEME ADVOCACIA. Todos os direitos reservados.</p>
            <div className="flex flex-col items-center gap-4">
              <p>
                Desenvolvido por{" "}
                <a href="https://apezatomarketing.com.br" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  Apezato Marketing
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Legal Modal */}
        <AnimatePresence>
          {modalContent && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalContent(null)}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl glass p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/10 overflow-y-auto max-h-[80vh]"
              >
                <button 
                  onClick={() => setModalContent(null)}
                  className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
                <h2 className="text-3xl md:text-4xl font-black mb-8 gradient-text">{modalContent.title}</h2>
                <div className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed whitespace-pre-wrap">
                  {modalContent.content}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
}
