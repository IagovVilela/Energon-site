import {
    Code2,
    Cpu,
    LineChart,
    Globe,
    Database,
    LayoutDashboard,
    Settings2,
    Smartphone,
    Monitor,
    MessageSquare,
    FileText,
    Rocket,
    Zap,
    ShieldCheck,
    Scale,
    Award
} from "lucide-react";

export const siteConfig = {
    // Informações Pessoais / Negócio
    personal: {
        name: "Energon Tecnologia",
        role: "Desenvolvedor Full Stack ",
        email: "iagovventura@gmail.com",
        phone: "(12) 99637-3335",
        whatsapp: "5512996373335", // Apenas números para links
        location: "São Paulo, SP - Remoto Global",
        social: {
            github: "https://github.com/seuusuario",
            linkedin: "https://www.linkedin.com/in/iago-vilela-2a9584272?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            instagram: "https://instagram.com/seuusuario"
        }
    },

    // Conteúdo da Hero Section (Topo)
    hero: {
        badge: "Desenvolvimento de Software Sob Medida",
        title: {
            prefix: "Transforme Ideias em",
            highlight: "Software de Alto Nível",
            suffix: ""
        },
        description: "Sistemas web personalizados, otimizados para performance e conversão. A tecnologia certa para impulsionar o seu negócio.",
        cta: "Solicitar Orçamento",
        secondaryCta: "Ver Projetos"
    },

    // Conteúdo Sobre Mim
    about: {
        title: {
            prefix: "Mais que código,",
            highlight: "Soluções Estratégicas"
        },
        description: [
            "Minha forma de trabalhar une design moderno e sofisticado com engenharia de software sólida e escalável. Cada projeto é pensado para ser funcional, performático e visualmente marcante, sempre alinhado aos objetivos reais do cliente.",
            "Seja um sistema de gestão personalizado, um painel administrativo, ou um site institucional altamente conversivo, o compromisso é o mesmo em todos os projetos: excelência técnica, experiência do usuário de alto nível e soluções que fazem sentido na prática."
        ],
        features: [
            {
                icon: Code2,
                title: "Desenvolvimento Personalizado",
                description: "Cada linha de código é pensada para resolver o seu problema específico, sem gambiarras."
            },
            {
                icon: Cpu,
                title: "Tecnologia de Ponta",
                description: "Utilizo as ferramentas mais modernas do mercado (Next.js, React, Node) para garantir longevidade."
            },
            {
                icon: LineChart,
                title: "Foco em Resultados",
                description: "Sistemas bonitos são ótimos, mas sistemas que convertem e funcionam são essenciais."
            }
        ]
    },

    // Serviços
    services: {
        title: {
            prefix: "Soluções que",
            highlight: "Impulsionam"
        },
        items: [
            {
                icon: Globe,
                title: "Sistemas Web Personalizados",
                description: "Plataformas completas acessíveis pelo navegador, feitas sob medida para sua regra de negócio."
            },
            {
                icon: Database,
                title: "Sistemas de Gestão (ERP)",
                description: "Controle de estoque, financeiro, clientes e processos em um único lugar seguro."
            },
            {
                icon: LayoutDashboard,
                title: "Dashboards Interativos",
                description: "Painéis administrativos com gráficos em tempo real para tomada de decisões estratégicas."
            },
            {
                icon: Settings2,
                title: "Automação de Processos",
                description: "Elimine planilhas e trabalho manual com robôs e scripts inteligentes."
            },
            {
                icon: Smartphone,
                title: "Web Apps Responsivos",
                description: "Aplicações que funcionam perfeitamente em qualquer dispositivo: Celular, Tablet ou Desktop."
            },
            {
                icon: Monitor,
                title: "Landing Pages de Alta Conversão",
                description: "Páginas focadas em venda, com design persuasivo e velocidade extrema."
            }
        ]
    },

    // Portfólio
    portfolio: {
        title: {
            prefix: "Sistemas",
            highlight: "Prontos"
        },
        items: [
            {
                title: "Review WEB",
                category: "Sistema de Avaliação Empresarial",
                description: "Sistema completo de avaliação empresarial.",
                image: "/api/placeholder/600/400",
                tags: ["React", "Node.js", "Dashboard"],
                link: "#"
            },
            {
                title: "MediConnect",
                category: "Agendamento Online",
                description: "Plataforma de telemedicina e agendamento de consultas com integração de vídeo e pagamentos.",
                image: "/api/placeholder/600/400",
                tags: ["Next.js", "Stripe", "WebRTC"],
                link: "#"
            },
            {
                title: "InvestFlow",
                category: "Fintech Dashboard",
                description: "Dashboard financeiro para tracking de investimentos em tempo real com gráficos avançados.",
                image: "/api/placeholder/600/400",
                tags: ["TypeScript", "Recharts", "Real-time"],
                link: "#"
            }
        ]
    },

    // Processo
    process: {
        items: [
            {
                icon: MessageSquare,
                title: "1. Briefing e Entendimento",
                description: "Reunião inicial para entender sua dor, objetivos e requisitos do projeto. Aqui definimos o escopo."
            },
            {
                icon: FileText,
                title: "2. Proposta e Design",
                description: "Apresentação da solução técnica, orçamento e mockups visuais. Aprovação do plano de ação."
            },
            {
                icon: Code2,
                title: "3. Desenvolvimento Ágil",
                description: "Codificação do sistema com entregas parciais para você acompanhar o progresso em tempo real."
            },
            {
                icon: Rocket,
                title: "4. Entrega e Suporte",
                description: "Testes finais, deploy em produção e treinamento. Garantia e suporte contínuo após a entrega."
            }
        ]
    },

    // Diferenciais
    differentiators: {
        checklist: [
            { value: "100%", label: "Satisfação" },
            { value: "+50", label: "Projetos" }
        ],
        items: [
            {
                icon: Zap,
                color: "text-yellow-500",
                title: "Performance Extrema",
                description: "Sites otimizados para carregar em milissegundos. O Google (e seu cliente) adora."
            },
            {
                icon: ShieldCheck,
                color: "text-green-500",
                title: "Segurança Garantida",
                description: "Proteção contra ataques comuns e boas práticas de segurança de dados."
            },
            {
                icon: Scale,
                color: "text-blue-500",
                title: "Escalabilidade",
                description: "Seu sistema cresce com sua empresa. Código preparado para o futuro."
            },
            {
                icon: Award,
                color: "text-purple-500",
                title: "Qualidade Premium",
                description: "Design refinado e atenção aos detalhes que fazem a diferença."
            }
        ]
    }
};
