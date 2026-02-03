const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Populando banco PostgreSQL...');

    // 1. Criar usuário admin
    const password = await bcrypt.hash('admin123', 10);
    const user = await prisma.user.upsert({
        where: { email: 'iagovventura@gmail.com' },
        update: {},
        create: {
            email: 'iagovventura@gmail.com',
            name: 'Iago Vilela',
            password
        }
    });
    console.log('✅ Usuário admin criado:', user.email);

    // 2. Configurações do site
    const config = await prisma.siteConfig.upsert({
        where: { id: 'config' },
        update: {},
        create: {
            id: 'config',
            heroTitle: 'Transforme Ideias em Software de Alto Nível',
            heroHighlight: 'Software de Alto Nível',
            heroDescription: 'Sistemas web personalizados, otimizados para performance e conversão.',
            aboutTitle: 'Mais que código, Soluções Estratégicas',
            aboutDescription: 'Desenvolvimento de sistemas web personalizados com foco em resultados.',
            email: 'iagovventura@gmail.com',
            phone: '(12) 99637-3335',
            location: 'São Paulo, SP - Remoto Global',
            linkedinUrl: 'https://www.linkedin.com/in/iago-vilela-2a9584272',
            githubUrl: 'https://github.com/IagovVilela',
            instagramUrl: null
        }
    });
    console.log('✅ Configurações criadas');

    // 3. Projetos exemplo
    const projects = [
        {
            title: 'Sistema de Gestão Empresarial',
            category: 'Web App',
            description: 'Sistema completo de gestão com dashboard interativo, relatórios em tempo real e integração com APIs',
            tags: 'React,Node.js,PostgreSQL,TypeScript',
            featured: true
        },
        {
            title: 'E-commerce Premium',
            category: 'E-commerce',
            description: 'Plataforma de vendas online com carrinho, pagamentos integrados e painel administrativo',
            tags: 'Next.js,Stripe,Prisma,TailwindCSS',
            featured: true
        },
        {
            title: 'Landing Page Conversão',
            category: 'Website',
            description: 'Landing page otimizada para SEO e conversão com animações premium',
            tags: 'Next.js,Framer Motion,Analytics',
            featured: false
        }
    ];

    for (const project of projects) {
        await prisma.project.upsert({
            where: { title: project.title },
            update: {},
            create: project
        });
    }
    console.log(`✅ ${projects.length} projetos criados`);

    console.log('\n🎉 Banco populado com sucesso!');
    console.log('\n📝 Login admin:');
    console.log('   Email: iagovventura@gmail.com');
    console.log('   Senha: admin123');
}

main()
    .catch((e) => {
        console.error('❌ Erro:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
