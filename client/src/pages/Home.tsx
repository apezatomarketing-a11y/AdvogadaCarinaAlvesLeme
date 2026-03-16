import { useAuth } from "@/_core/hooks/useAuth";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, FileText, Clock, Shield, BarChart3, Users, MessageSquare, Phone, Mail, MapPin, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "17996091291";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

const formatWhatsAppMessage = (data: any) => {
  const message = `*Novo Contato - Advocacia Carina Leme*\n\n*Nome:* ${data.name}\n*WhatsApp:* ${data.whatsapp}\n*Email:* ${data.email || "Não informado"}\n*Cidade/UF:* ${data.city || "Não informado"}\n*Situação:* ${data.situation || "Não informado"}\n*Mensagem:* ${data.message || "Sem mensagem"}\n\nAutorização de dados: Sim`;
  return encodeURIComponent(message);
};

export default function Home() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    city: "",
    situation: "",
    message: "",
    authorized: false,
  });

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
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 glass-dark backdrop-blur-xl border-b border-white/10">
        <div className="container flex items-center justify-between h-16">
          <a href="#inicio" className="flex items-center gap-2 hover-glow">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663442181488/ad75sJfkR7hdVvawt9JjLn/Logotipo Menu_a3902f06.png"
              alt="Advocacia Carina Alves Leme"
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-sm font-medium hover:text-accent transition-colors duration-300"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("servicos")}
              className="text-sm font-medium hover:text-accent transition-colors duration-300"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-sm font-medium hover:text-accent transition-colors duration-300"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection("diferenciais")}
              className="text-sm font-medium hover:text-accent transition-colors duration-300"
            >
              Diferenciais
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium hover:text-accent transition-colors duration-300"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-sm font-medium hover:text-accent transition-colors duration-300"
            >
              Contato
            </button>
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover-glow"
              title="Alternar tema"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-accent animate-spin" style={{ animationDuration: "3s" }} />
              ) : (
                <Moon size={20} className="text-accent animate-spin" style={{ animationDuration: "3s" }} />
              )}
            </button>

            {/* CTA Button */}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground skeu-button">
                Falar no WhatsApp
              </Button>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-white/10 bg-black/40 backdrop-blur-xl p-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-sm font-medium hover:text-accent transition-colors text-left"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("servicos")}
              className="text-sm font-medium hover:text-accent transition-colors text-left"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-sm font-medium hover:text-accent transition-colors text-left"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection("diferenciais")}
              className="text-sm font-medium hover:text-accent transition-colors text-left"
            >
              Diferenciais
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium hover:text-accent transition-colors text-left"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-sm font-medium hover:text-accent transition-colors text-left"
            >
              Contato
            </button>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground skeu-button">
                Falar no WhatsApp
              </Button>
            </a>
          </nav>
        )}
      </header>

      {/* Hero Section - Início */}
      <section id="inicio" className="py-20 md:py-32 bg-gradient-to-b from-background via-background to-card/50 overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 slide-in-left">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight gradient-text">
                Soluções jurídicas para a nulidade de infrações
              </h1>
              <p className="text-lg text-muted-foreground">
                Defesa de multas, regularização de CNH, análise de infrações e revisão de cobranças de seguros e juros, com suporte especializado para proteger seus direitos e garantir sua CNH e sua segurança!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-base h-12 skeu-button">
                    Avaliar Meu Caso
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-base h-12 hover-lift"
                  onClick={() => scrollToSection("servicos")}
                >
                  Conhecer Serviços
                </Button>
              </div>
            </div>
            <div className="relative slide-in-right">
              <div className="glass p-8 hover-lift">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663442181488/ad75sJfkR7hdVvawt9JjLn/foto inicio_347d4498.jpeg"
                  alt="Advocacia"
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Quick Stats Section */}
      <section className="py-12 bg-card/30 border-y border-white/10 backdrop-blur-sm">
        <div className="container">
          <div className="grid grid-cols-3 gap-6 md:gap-8">
            <div className="glass p-6 text-center hover-lift scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-3xl font-bold text-accent mb-2">Multa injusta?</div>
              <p className="text-sm text-muted-foreground">Analisamos vícios formais e materiais para anular ou reduzir penalidades.</p>
            </div>
            <div className="glass p-6 text-center hover-lift scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-3xl font-bold text-accent mb-2">Pontos somando?</div>
              <p className="text-sm text-muted-foreground">Estratégias legais para evitar suspensão e proteger seu direito de dirigir.</p>
            </div>
            <div className="glass p-6 text-center hover-lift scale-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-3xl font-bold text-accent mb-2">Prazo correndo?</div>
              <p className="text-sm text-muted-foreground">Protocolos dentro dos prazos do DETRAN/CONTRAN, com prioridade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Serviços */}
      <section id="servicos" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Serviços</h2>
            <p className="text-lg text-muted-foreground">Atuação especializada em todas as áreas do Direito de Trânsito</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: "Recurso de Multas", description: "Análise e recurso de infrações de trânsito" },
              { icon: Clock, title: "Suspensão da CNH", description: "Defesa contra suspensão do direito de dirigir" },
              { icon: Shield, title: "Cassação da CNH", description: "Recursos contra cassação da carteira" },
              { icon: BarChart3, title: "Defesa Prévia", description: "Defesa prévia em processos administrativos" },
              { icon: Users, title: "Crimes de Trânsito", description: "Defesa em crimes de trânsito" },
              { icon: MessageSquare, title: "Transferência de Pontos", description: "Análise de possibilidade de transferência" },
            ].map((service, idx) => (
              <Card key={idx} className="glass p-6 hover-lift bounce-in border-white/10" style={{ animationDelay: `${idx * 0.1}s` }}>
                <service.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-accent/20 hover:bg-accent/40 text-accent border border-accent/50 hover-glow">
                    Fale comigo!
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Como Funciona */}
      <section id="como-funciona" className="py-20 md:py-32 bg-card/30">
        <div className="container">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Como Funciona</h2>
            <p className="text-lg text-muted-foreground">Processo simples e transparente do início ao fim</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Diagnóstico Gratuito",
                description: "Analisamos seu caso sem compromisso e identificamos as melhores estratégias.",
              },
              {
                step: "02",
                title: "Estratégia Personalizada",
                description: "Desenvolvemos a defesa mais adequada para sua situação específica.",
              },
              {
                step: "03",
                title: "Acompanhamento Total",
                description: "Você fica informado de cada etapa do processo até a solução final.",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative slide-in-left" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/50 text-accent-foreground flex items-center justify-center text-2xl font-bold mb-4 skeu-button hover-lift">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                  <p className="text-muted-foreground text-center">{item.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-1 bg-gradient-to-r from-accent to-transparent"></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-base h-12 skeu-button">
                Iniciar Diagnóstico Gratuito
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section id="diferenciais" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Nossos Diferenciais</h2>
            <p className="text-lg text-muted-foreground">O que torna nosso atendimento único</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Foco em Direito de Trânsito", description: "Atuação dedicada e especializada no tema." },
              { title: "Atendimento Digital", description: "Agilidade e comodidade sem deslocamentos." },
              { title: "Linguagem Clara", description: "Orientação prática, sem juridiquês." },
            ].map((item, idx) => (
              <div key={idx} className="glass p-8 hover-lift scale-in border-white/10" style={{ animationDelay: `${idx * 0.1}s` }}>
                <h3 className="text-xl font-semibold mb-3 text-accent">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* About Section */}
      <section className="py-20 md:py-32 bg-card/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="slide-in-left">
              <div className="glass p-8 hover-lift">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663442181488/ad75sJfkR7hdVvawt9JjLn/foto sobre_6cbf6f1d.jpeg"
                  alt="Dra. Carina Leme"
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
            <div className="space-y-6 slide-in-right">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">Dra. Carina Leme</h2>
              <div className="space-y-4">
                <div className="glass p-4 border-l-4 border-accent">
                  <h3 className="font-semibold text-accent mb-2">OAB/SP 472.156</h3>
                  <p className="text-muted-foreground">Advogada inscrita na Ordem dos Advogados do Brasil</p>
                </div>
                <div className="glass p-4 border-l-4 border-accent">
                  <h3 className="font-semibold text-accent mb-2">Formação Acadêmica</h3>
                  <p className="text-muted-foreground">Graduada em Direito com especialização em Direito de Trânsito</p>
                </div>
                <div className="glass p-4 border-l-4 border-accent">
                  <h3 className="font-semibold text-accent mb-2">Experiência Profissional</h3>
                  <p className="text-muted-foreground">Atuação focada em Direito de Trânsito com centenas de casos solucionados</p>
                </div>
                <div className="glass p-4 border-l-4 border-accent">
                  <h3 className="font-semibold text-accent mb-2">Especialização</h3>
                  <p className="text-muted-foreground">Recursos de multas, suspensão e cassação de CNH, crimes de trânsito</p>
                </div>
              </div>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-base h-12 skeu-button">
                  Falar com Advogada
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Dúvidas Frequentes</h2>
            <p className="text-lg text-muted-foreground">Esclarecemos as principais dúvidas sobre direito de trânsito</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Perdi o prazo, ainda dá tempo?",
                a: "Depende da fase do processo. Analiso o caso e verifico alternativas cabíveis.",
              },
              {
                q: "A recusa ao bafômetro sempre gera multa?",
                a: "A autuação existe, mas cada caso exige análise dos procedimentos adotados.",
              },
              {
                q: "Quanto tempo leva um recurso?",
                a: "Varia conforme o órgão e a etapa. Informo prazos estimados após o diagnóstico.",
              },
              {
                q: "Preciso ir ao escritório?",
                a: "Não necessariamente. O atendimento pode ser 100% digital.",
              },
              {
                q: "Quanto custa?",
                a: "Honorários definidos após avaliação do caso e complexidade.",
              },
              {
                q: "Quais documentos enviar?",
                a: "Auto/notificação, CNH e informações do ocorrido já ajudam no início.",
              },
            ].map((faq, idx) => (
              <details key={idx} className="glass p-4 hover-lift border-white/10 group slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <summary className="font-semibold cursor-pointer flex items-center justify-between text-accent">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <p className="mt-4 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Contato */}
      <section id="contato" className="py-20 md:py-32 bg-card/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">Entre em Contato</h2>
              <p className="text-lg text-muted-foreground mb-8">Preencha o formulário e receba sua avaliação jurídica gratuita</p>
              <p className="text-sm text-accent mb-4">Receba sua avaliação em até 1h comercial</p>
              <p className="text-sm text-muted-foreground mb-8">Preencha e envio retorno pelo WhatsApp.</p>
              <div className="space-y-6">
                <div className="glass p-4 flex gap-4 hover-lift border-white/10">
                  <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      (17) 99609-1291
                    </a>
                  </div>
                </div>
                <div className="glass p-4 flex gap-4 hover-lift border-white/10">
                  <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">E-mail</h3>
                    <a href="mailto:carinaleme.adv@gmail.com" className="text-accent hover:underline">
                      carinaleme.adv@gmail.com
                    </a>
                  </div>
                </div>
                <div className="glass p-4 flex gap-4 hover-lift border-white/10">
                  <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Endereço</h3>
                    <p className="text-muted-foreground">AV DOS BANDEIRANTES, 2170<br />JARDIM SARINHA I, OUROESTE - SP</p>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4 slide-in-right">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="mt-1 bg-white/5 border-white/10 focus:border-accent"
                />
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp *</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleFormChange}
                  required
                  className="mt-1 bg-white/5 border-white/10 focus:border-accent"
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="mt-1 bg-white/5 border-white/10 focus:border-accent"
                />
              </div>
              <div>
                <Label htmlFor="city">Cidade/UF</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  className="mt-1 bg-white/5 border-white/10 focus:border-accent"
                  placeholder="Ouroeste/SP"
                />
              </div>
              <div>
                <Label htmlFor="situation">Situação</Label>
                <Select value={formData.situation} onValueChange={(value) => setFormData(prev => ({ ...prev, situation: value }))}>
                  <SelectTrigger className="mt-1 bg-white/5 border-white/10">
                    <SelectValue placeholder="Selecione sua situação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multa">Multa</SelectItem>
                    <SelectItem value="pontos">Pontos</SelectItem>
                    <SelectItem value="suspensao">Suspensão</SelectItem>
                    <SelectItem value="cassacao">Cassação</SelectItem>
                    <SelectItem value="recusa-bafometro">Recusa bafômetro</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Descreva seu caso..."
                  className="mt-1 min-h-24 bg-white/5 border-white/10 focus:border-accent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="authorized"
                  checked={formData.authorized}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, authorized: checked as boolean }))}
                />
                <Label htmlFor="authorized" className="text-sm cursor-pointer">
                  Autorizo o uso dos meus dados para contato e avaliação *
                </Label>
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base h-12 skeu-button">
                Enviar e Falar no WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </section>


      {/* Location Section */}
      <section className="py-20 md:py-32 bg-card/30">
        <div className="container">
          <div className="text-center mb-12 slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Localização</h2>
            <p className="text-lg text-muted-foreground">Visite nosso escritório ou agende uma consulta</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 hover-lift scale-in border-white/10" style={{ animationDelay: "0.1s" }}>
              <MapPin className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Endereço</h3>
              <p className="text-muted-foreground">AV DOS BANDEIRANTES, 2170<br />JARDIM SARINHA I<br />OUROESTE - SP</p>
            </div>
            <div className="glass p-8 hover-lift scale-in border-white/10" style={{ animationDelay: "0.2s" }}>
              <Clock className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Horário</h3>
              <p className="text-muted-foreground">Segunda a Sexta<br />8h às 18h</p>
            </div>
            <div className="glass p-8 hover-lift scale-in border-white/10" style={{ animationDelay: "0.3s" }}>
              <Phone className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Agendar</h3>
              <p className="text-muted-foreground">Entre em contato para agendar sua consulta</p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 pulse-ring"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center hover-lift skeu-button shadow-2xl">
          <svg className="w-8 h-8 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.259-1.02 1.02-1.756 2.117-2.259 3.355-.606 1.605-.949 3.362-.949 5.209 0 .891.057 1.789.169 2.674l-1.195 4.374c-.713 2.636.26 4.123 1.884 4.123.779 0 1.496-.19 2.23-.558l4.332-1.352c.955.201 1.93.3 2.945.3 5.048 0 9.14-4.092 9.14-9.14 0-2.437-.944-4.73-2.665-6.452-1.72-1.72-4.015-2.665-6.452-2.665" />
          </svg>
        </div>
      </a>

      {/* Footer */}
      <footer className="bg-card border-t border-white/10 py-12 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663442181488/ad75sJfkR7hdVvawt9JjLn/Logotipo Rodape_18c3040b.png"
                alt="Advocacia Carina Alves Leme"
                className="h-12 w-auto mb-4"
              />
              <p className="text-muted-foreground text-sm">
                Advocacia especializada em Direito de Trânsito com atendimento digital e presencial.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-accent">Navegação</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection("inicio")} className="text-muted-foreground hover:text-accent transition-colors">Início</button></li>
                <li><button onClick={() => scrollToSection("servicos")} className="text-muted-foreground hover:text-accent transition-colors">Serviços</button></li>
                <li><button onClick={() => scrollToSection("como-funciona")} className="text-muted-foreground hover:text-accent transition-colors">Como Funciona</button></li>
                <li><button onClick={() => scrollToSection("faq")} className="text-muted-foreground hover:text-accent transition-colors">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-accent">Contato</h3>
              <ul className="space-y-2 text-sm">
                <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">(17) 99609-1291</a></li>
                <li><a href="mailto:carinaleme.adv@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">carinaleme.adv@gmail.com</a></li>
                <li className="text-muted-foreground">Ouroeste/SP</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-accent">Especialista em</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Direito de Trânsito</li>
                <li>Recursos de Multas</li>
                <li>Suspensão de CNH</li>
                <li>Crimes de Trânsito</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024-2026 CARINA LEME ADVOCACIA. Todos os direitos reservados.
              </p>
              <p className="text-sm text-muted-foreground">
                Desenvolvido por Apezato Marketing
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
