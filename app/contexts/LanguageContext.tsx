"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    pt: {
        // Hero Section
        'hero.badge': 'Desenvolvimento de Software Sob Medida',
        'hero.title.part1': 'Transforme Ideias em',
        'hero.title.part2': 'Software',
        'hero.title.part3': 'de Alto Nível',
        'hero.subtitle': 'Sistemas web personalizados, otimizados para performance e conversão.',
        'hero.cta': 'Solicitar Orçamento',
        'hero.viewProjects': 'Ver Projetos',

        // About Section
        'about.header.title': 'Por que empresas escolhem',
        'about.header.highlight': 'trabalhar comigo?',
        'about.header.subtitle': 'Não sou apenas mais um desenvolvedor. Sou um parceiro estratégico que entende seu negócio e transforma ideias em sistemas que realmente funcionam.',
        'about.benefit1.title': 'Desenvolvimento Rápido',
        'about.benefit1.description': 'Seu sistema pronto em semanas, não meses. Economize tempo e comece a lucrar mais rápido.',
        'about.benefit1.highlight': '3x mais rápido',
        'about.benefit2.title': 'Melhor Custo-Benefício',
        'about.benefit2.description': 'Sistemas sob medida sem custo de agência. Pague apenas pelo que você realmente precisa.',
        'about.benefit2.highlight': 'Até 60% mais barato',
        'about.benefit3.title': 'Suporte Garantido',
        'about.benefit3.description': 'Nunca fique na mão. Suporte direto comigo, sem intermediários ou filas de atendimento.',
        'about.benefit3.highlight': 'Resposta em 24h',
        'about.results.clients': 'Clientes Satisfeitos',
        'about.results.projects': 'Projetos Entregues',
        'about.results.support': 'Suporte Disponível',
        'about.whatYouGet.title': 'O que você ganha trabalhando comigo',
        'about.whatYouGet.subtitle': 'Muito mais que linhas de código',
        'about.whatYouGet.item1': 'Sistema 100% personalizado para seu negócio',
        'about.whatYouGet.item2': 'Design moderno e profissional que impressiona clientes',
        'about.whatYouGet.item3': 'Rápido, seguro e fácil de usar',
        'about.whatYouGet.item4': 'Funciona perfeitamente em celular, tablet e computador',
        'about.whatYouGet.item5': 'Suporte e ajustes inclusos por 3 meses',
        'about.whatYouGet.item6': 'Código 100% seu - sem dependência de terceiros',
        'about.cta.title': 'Pronto para transformar sua ideia em realidade?',
        'about.cta.subtitle': 'Vamos conversar sobre seu projeto sem compromisso',
        'about.cta.button': 'Solicitar Orçamento Gratuito',

        // Services Section
        'services.title.prefix': 'Soluções Digitais',
        'services.title.highlight': 'Sob Medida',
        'services.subtitle': 'Do básico ao complexo, desenvolvo a ferramenta exata que sua empresa precisa para escalar.',
        'services.item1.title': 'Sistemas de Gestão (ERP/CRM)',
        'services.item1.desc': 'Centralize seus processos, automatize tarefas e tenha controle total do seu negócio em um só lugar.',
        'services.item2.title': 'Plataformas Web & SaaS',
        'services.item2.desc': 'Crie seu próprio produto digital escalável com as tecnologias mais modernas do mercado.',
        'services.item3.title': 'Automação de Processos',
        'services.item3.desc': 'Elimine trabalhos repetitivos e erros humanos com fluxos inteligentes de dados.',
        'services.item4.title': 'Dashboards Inteligentes',
        'services.item4.desc': 'Visualize seus dados em tempo real e tome decisões baseadas em números reais.',
        'services.item5.title': 'APIs e Integrações',
        'services.item5.desc': 'Conecte seus sistemas preferidos e faça-os conversar de forma fluida e segura.',
        'services.item6.title': 'Sites de Alta Performance',
        'services.item6.desc': 'Sua presença online com velocidade extrema e foco total em conversão de clientes.',

        // Process Section
        'process.title.prefix': 'Como',
        'process.title.highlight': 'Trabalhamos',
        'process.subtitle': 'Transparência total do início ao fim.',
        'process.step1.title': '1. Briefing e Entendimento',
        'process.step1.desc': 'Reunião inicial para entender sua dor, objetivos e requisitos do projeto. Aqui definimos o escopo.',
        'process.step2.title': '2. Proposta e Design',
        'process.step2.desc': 'Apresentação da solução técnica, orçamento e mockups visuais. Aprovação do plano de ação.',
        'process.step3.title': '3. Desenvolvimento Ágil',
        'process.step3.desc': 'Codificação do sistema com entregas parciais para você acompanhar o progresso em tempo real.',
        'process.step4.title': '4. Entrega e Suporte',
        'process.step4.desc': 'Testes finais, deploy em produção e treinamento. Garantia e suporte contínuo após a entrega.',

        // Differentiators Section
        'diff.title': 'Por que escolher meus',
        'diff.highlight': 'Serviços?',
        'diff.subtitle': 'Não sou apenas mais um desenvolvedor. Sou um parceiro estratégico que entende de negócios. Foco na qualidade técnica para que você possa focar no seu crescimento.',
        'diff.item1.title': 'Performance Extrema',
        'diff.item1.desc': 'Sites otimizados para carregar em milisegundos. O Google (e seu cliente) adora.',
        'diff.item2.title': 'Segurança Garantida',
        'diff.item2.desc': 'Proteção contra ataques comuns e boas práticas de segurança de dados.',
        'diff.item3.title': 'Escalabilidade',
        'diff.item3.desc': 'Seu sistema cresce com sua empresa. Código preparado para o futuro.',
        'diff.item4.title': 'Qualidade Premium',
        'diff.item4.desc': 'Design refinado e atenção aos detalhes que fazem a diferença.',

        // Portfolio Section
        'portfolio.title.prefix': 'Sistemas',
        'portfolio.title.highlight': 'Prontos',
        'portfolio.subtitle': 'Modelos de alta performance que podem ser adaptados exclusivamente para o seu negócio. Economize tempo partindo de uma base sólida.',
        'portfolio.viewAll': 'Ver todos os projetos',
        'portfolio.viewDetails': 'Ver Detalhes',
        'portfolio.madeWith': 'Como foi feito',
        'portfolio.noImages': 'Nenhuma imagem do processo anexada ainda.',

        // CTA Section (Final)
        'cta.main.title': 'Pronto para transformar seu negócio?',
        'cta.main.subtitle': 'Vamos tirar sua ideia do papel e criar algo extraordinário juntos.',
        'cta.main.button': 'Começar Agora',

        // Contact Section
        'contact.title': 'Vamos conversar?',
        'contact.subtitle': 'Preencha o formulário e entrarei em contato o mais breve possível para discutirmos seu projeto.',
        'contact.email': 'Email',
        'contact.phone': 'WhatsApp',
        'contact.location': 'Localização',
        'contact.form.name': 'Nome',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Assunto',
        'contact.form.message': 'Mensagem',
        'contact.form.namePlaceholder': 'Seu nome',
        'contact.form.emailPlaceholder': 'seu@email.com',
        'contact.form.subjectPlaceholder': 'Desenvolvimento de Sistema...',
        'contact.form.messagePlaceholder': 'Descreva brevemente sua ideia...',
        'contact.form.submit': 'Enviar Mensagem',
        'contact.form.sending': 'Enviando...',
        'contact.form.success': 'Mensagem enviada com sucesso! Responderei em breve.',
        'contact.form.error': 'Erro ao enviar mensagem',
    },
    en: {
        // Hero Section
        'hero.badge': 'Custom Software Development',
        'hero.title.part1': 'Transform Ideas into',
        'hero.title.part2': 'High-Level',
        'hero.title.part3': 'Software',
        'hero.subtitle': 'Custom web systems, optimized for performance and conversion.',
        'hero.cta': 'Request Quote',
        'hero.viewProjects': 'View Projects',

        // About Section
        'about.header.title': 'Why companies choose to',
        'about.header.highlight': 'work with me?',
        'about.header.subtitle': "I'm not just another developer. I'm a strategic partner who understands your business and transforms ideas into systems that really work.",
        'about.benefit1.title': 'Fast Development',
        'about.benefit1.description': 'Your system ready in weeks, not months. Save time and start profiting faster.',
        'about.benefit1.highlight': '3x faster',
        'about.benefit2.title': 'Best Value',
        'about.benefit2.description': 'Custom systems without agency overhead. Pay only for what you really need.',
        'about.benefit2.highlight': 'Up to 60% cheaper',
        'about.benefit3.title': 'Guaranteed Support',
        'about.benefit3.description': 'Never be stranded. Direct support from me, no middlemen or ticket queues.',
        'about.benefit3.highlight': '24h response',
        'about.results.clients': 'Satisfied Clients',
        'about.results.projects': 'Projects Delivered',
        'about.results.support': 'Support Available',
        'about.whatYouGet.title': 'What you get working with me',
        'about.whatYouGet.subtitle': 'Much more than lines of code',
        'about.whatYouGet.item1': '100% custom system for your business',
        'about.whatYouGet.item2': 'Modern professional design that impresses clients',
        'about.whatYouGet.item3': 'Fast, secure and easy to use',
        'about.whatYouGet.item4': 'Works perfectly on mobile, tablet and desktop',
        'about.whatYouGet.item5': 'Support and maintenance included for 3 months',
        'about.whatYouGet.item6': '100% your code - no third-party lock-in',
        'about.cta.title': 'Ready to turn your idea into reality?',
        'about.cta.subtitle': "Let's talk about your project without commitment",
        'about.cta.button': 'Request Free Quote',

        // Services Section
        'services.title.prefix': 'Custom Digital',
        'services.title.highlight': 'Solutions',
        'services.subtitle': 'From basic to complex, I build the exact tool your company needs to scale.',
        'services.item1.title': 'Management Systems (ERP/CRM)',
        'services.item1.desc': 'Centralize your processes, automate tasks and have total control of your business in one place.',
        'services.item2.title': 'Web Platforms & SaaS',
        'services.item2.desc': 'Create your own scalable digital product with the most modern technologies on the market.',
        'services.item3.title': 'Process Automation',
        'services.item3.desc': 'Eliminate repetitive tasks and human errors with intelligent data flows.',
        'services.item4.title': 'Smart Dashboards',
        'services.item4.desc': 'Visualize your data in real-time and make decisions based on actual numbers.',
        'services.item5.title': 'APIs and Integrations',
        'services.item5.desc': 'Connect your favorite systems and make them communicate fluidly and securely.',
        'services.item6.title': 'High Performance Sites',
        'services.item6.desc': 'Your online presence with extreme speed and total focus on client conversion.',

        // Process Section
        'process.title.prefix': 'How We',
        'process.title.highlight': 'Work',
        'process.subtitle': 'Full transparency from start to finish.',
        'process.step1.title': '1. Briefing and Discovery',
        'process.step1.desc': 'Initial meeting to understand your pain points, goals and project requirements. Scope defined here.',
        'process.step2.title': '2. Proposal and Design',
        'process.step2.desc': 'Technical solution presentation, quote and visual mockups. Action plan approval.',
        'process.step3.title': '3. Agile Development',
        'process.step3.desc': 'System coding with partial deliveries so you can follow progress in real-time.',
        'process.step4.title': '4. Delivery and Support',
        'process.step4.desc': 'Final tests, production deployment and training. Warranty and ongoing support after delivery.',

        // Differentiators Section
        'diff.title': 'Why Choose My',
        'diff.highlight': 'Services?',
        'diff.subtitle': "I'm not just another developer. I'm a strategic partner who understands business. Focus on technical quality so you can focus on growth.",
        'diff.item1.title': 'Extreme Performance',
        'diff.item1.desc': 'Sites optimized to load in milliseconds. Google (and your customers) love it.',
        'diff.item2.title': 'Guaranteed Security',
        'diff.item2.desc': 'Protection against common attacks and data security best practices.',
        'diff.item3.title': 'Scalability',
        'diff.item3.desc': 'Your system grows with your company. Future-proof code.',
        'diff.item4.title': 'Premium Quality',
        'diff.item4.desc': 'Refined design and attention to detail that make the difference.',

        // Portfolio Section
        'portfolio.title.prefix': 'Ready-Made',
        'portfolio.title.highlight': 'Systems',
        'portfolio.subtitle': 'High-performance templates that can be exclusively adapted to your business. Save time starting from a solid foundation.',
        'portfolio.viewAll': 'View all projects',
        'portfolio.viewDetails': 'View Details',
        'portfolio.madeWith': 'How it was made',
        'portfolio.noImages': 'No process images attached yet.',

        // CTA Section (Final)
        'cta.main.title': 'Ready to transform your business?',
        'cta.main.subtitle': "Let's take your idea off the paper and create something extraordinary together.",
        'cta.main.button': 'Get Started Now',

        // Contact Section
        'contact.title': "Let's talk?",
        'contact.subtitle': 'Fill out the form and I will contact you as soon as possible to discuss your project.',
        'contact.email': 'Email',
        'contact.phone': 'WhatsApp',
        'contact.location': 'Location',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.namePlaceholder': 'Your name',
        'contact.form.emailPlaceholder': 'your@email.com',
        'contact.form.subjectPlaceholder': 'System Development...',
        'contact.form.messagePlaceholder': 'Briefly describe your idea...',
        'contact.form.submit': 'Send Message',
        'contact.form.sending': 'Sending...',
        'contact.form.success': 'Message sent successfully! I will reply soon.',
        'contact.form.error': 'Error sending message',
    },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('pt');

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.pt] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}
