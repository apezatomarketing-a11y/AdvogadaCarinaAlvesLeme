import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, FileText, Clock, Shield, BarChart3, Users, MessageSquare, Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "17996091291";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

export default function Home() {
  const { user } = useAuth();
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
    toast.success("Formulário enviado! Retornaremos em breve.");
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <a href="#inicio" className="flex items-center gap-2">
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
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("servicos")}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Contato
            </button>
          </nav>

          {/* CTA Button */}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-card p-4 flex flex-col gap-4">
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
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Falar no WhatsApp
              </Button>
            </a>
          </nav>
        )}
      </header>

      {/* Hero Section - Início */}
      <section id="inicio" className="py-20 md:py-32 bg-gradient-to-b from-background to-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Soluções Jurídicas para Direito de Trânsito
              </h1>
              <p className="text-lg text-muted-foreground">
                Defesa de multas, regularização de CNH, análise de infrações e revisão de cobranças de seguros e juros, com suporte especializado para proteger seus direitos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-base h-12">
                    Avaliar Meu Caso
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-base h-12"
                  onClick={() => scrollToSection("servicos")}
                >
                  Conhecer Serviços
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div>
                  <div className="text-2xl font-bold text-accent">5+</div>
                  <p className="text-sm text-muted-foreground">Anos de experiência</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">100+</div>
                  <p className="text-sm text-muted-foreground">Casos resolvidos</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">98%</div>
                  <p className="text-sm text-muted-foreground">Taxa de sucesso</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663442181488/ad75sJfkR7hdVvawt9JjLn/foto inicio_347d4498.jpeg"
                alt="Advocacia"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">Multa injusta?</div>
              <p className="text-sm text-muted-foreground">Analisamos vícios formais e materiais para anular ou reduzir penalidades.</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">Pontos somando?</div>
              <p className="text-sm text-muted-foreground">Estratégias legais para evitar suspensão e proteger seu direito de dirigir.</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">Prazo correndo?</div>
              <p className="text-sm text-muted-foreground">Protocolos dentro dos prazos do DETRAN/CONTRAN, com prioridade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Serviços */}
      <section id="servicos" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Serviços</h2>
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
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow border border-border hover:border-accent">
                <service.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full text-accent border-accent hover:bg-accent hover:text-accent-foreground">
                    Fale comigo!
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Como Funciona */}
      <section id="como-funciona" className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
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
              <div key={idx} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                  <p className="text-muted-foreground text-center">{item.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-1 bg-accent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663442181488/ad75sJfkR7hdVvawt9JjLn/foto sobre_6cbf6f1d.jpeg"
                alt="Dra. Carina Leme"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Dra. Carina Leme</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-accent mb-2">OAB/SP 472.156</h3>
                  <p className="text-muted-foreground">Advogada inscrita na Ordem dos Advogados do Brasil</p>
                </div>
                <div>
                  <h3 className="font-semibold text-accent mb-2">Formação Acadêmica</h3>
                  <p className="text-muted-foreground">Graduada em Direito com especialização em Direito de Trânsito</p>
                </div>
                <div>
                  <h3 className="font-semibold text-accent mb-2">Experiência Profissional</h3>
                  <p className="text-muted-foreground">Atuação focada em Direito de Trânsito com centenas de casos solucionados</p>
                </div>
                <div>
                  <h3 className="font-semibold text-accent mb-2">Especialização</h3>
                  <p className="text-muted-foreground">Recursos de multas, suspensão e cassação de CNH, crimes de trânsito</p>
                </div>
              </div>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-base h-12">
                  Falar com Advogada
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dúvidas Frequentes</h2>
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
              <details key={idx} className="border border-border rounded-lg p-4 hover:border-accent transition-colors">
                <summary className="font-semibold cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <ChevronDown className="w-5 h-5" />
                </summary>
                <p className="mt-4 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Contato */}
      <section id="contato" className="py-20 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Entre em Contato</h2>
              <p className="text-lg text-muted-foreground mb-8">Preencha o formulário e receba sua avaliação jurídica gratuita</p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      {WHATSAPP_NUMBER}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">E-mail</h3>
                    <a href="mailto:carinaleme.adv@hotmail.com" className="text-accent hover:underline">
                      carinaleme.adv@hotmail.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Endereço</h3>
                    <p className="text-muted-foreground">Rua Domingos Jorge Velho, 1595<br />Centro, Ouroeste - SP<br />CEP 15.685-069</p>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="mt-1"
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
                  className="mt-1"
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
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="city">Cidade/UF</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="situation">Situação</Label>
                <Select value={formData.situation} onValueChange={(value) => setFormData(prev => ({ ...prev, situation: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione sua situação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multa">Multa</SelectItem>
                    <SelectItem value="pontos">Pontos</SelectItem>
                    <SelectItem value="suspensao">Suspensão</SelectItem>
                    <SelectItem value="cassacao">Cassação</SelectItem>
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
                  className="mt-1 min-h-24"
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
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base h-12">
                Enviar e Falar no WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663442181488/ad75sJfkR7hdVvawt9JjLn/Logotipo Rodape_18c3040b.png"
                alt="Advocacia Carina Alves Leme"
                className="h-12 w-auto mb-4"
              />
              <p className="text-sm text-muted-foreground">Especializada em Direito de Trânsito e Direito Previdenciário</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollToSection("inicio")} className="hover:text-accent transition-colors">Início</button></li>
                <li><button onClick={() => scrollToSection("servicos")} className="hover:text-accent transition-colors">Serviços</button></li>
                <li><button onClick={() => scrollToSection("como-funciona")} className="hover:text-accent transition-colors">Como Funciona</button></li>
                <li><button onClick={() => scrollToSection("faq")} className="hover:text-accent transition-colors">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">WhatsApp</a></li>
                <li><a href="mailto:carinaleme.adv@hotmail.com" className="hover:text-accent transition-colors">E-mail</a></li>
                <li><a href="https://www.instagram.com/adv.carinaleme" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Horários</h4>
              <p className="text-sm text-muted-foreground">Segunda a Sexta<br />09:00 às 17:00</p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Advocacia Carina Alves Leme. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-40"
        title="Fale conosco no WhatsApp"
      >
        <MessageSquare size={24} />
      </a>
    </div>
  );
}
