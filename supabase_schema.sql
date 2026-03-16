-- Schema SQL para Supabase - Advocacia Carina Alves Leme

-- Tabela de Leads (Contatos do Formulário)
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    email TEXT,
    city TEXT,
    situation TEXT,
    message TEXT,
    authorized BOOLEAN DEFAULT FALSE NOT NULL
);

-- Tabela de Configurações do Site (Opcional para CMS futuro)
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de FAQs (Opcional para tornar dinâmico)
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso para Leads (Apenas inserção pública, leitura apenas para admin)
CREATE POLICY "Permitir inserção pública de leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Apenas admins podem ver leads" ON leads FOR SELECT USING (auth.role() = 'service_role');

-- Políticas de Acesso para FAQs (Leitura pública)
CREATE POLICY "Permitir leitura pública de faqs" ON faqs FOR SELECT USING (true);

-- Inserir FAQs iniciais
INSERT INTO faqs (question, answer, display_order) VALUES
('Perdi o prazo, ainda dá tempo?', 'Depende da fase do processo. Analiso o caso e verifico alternativas cabíveis para reverter a situação.', 1),
('A recusa ao bafômetro sempre gera multa?', 'A autuação existe, mas cada caso exige análise minuciosa dos procedimentos adotados pelo agente.', 2),
('Quanto tempo leva um recurso?', 'Varia conforme o órgão e a etapa. Informo prazos estimados logo após o diagnóstico inicial.', 3),
('Preciso ir ao escritório?', 'Não necessariamente. Nosso atendimento é 100% digital para sua maior comodidade.', 4),
('Quanto custa?', 'Os honorários são definidos após a avaliação da complexidade do seu caso específico.', 5),
('Quais documentos enviar?', 'Auto de infração, CNH e um breve relato do ocorrido são suficientes para começar.', 6);
