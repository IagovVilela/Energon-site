const { PrismaClient } = require('@prisma/client')
require('dotenv').config()
const bcrypt = require('bcryptjs')

// Hardcoded data to avoid importing TS file
const siteConfig = {
    personal: {
        name: "Energon Tecnologia",
        role: "Desenvolvedor Full Stack ",
        email: "iagovventura@gmail.com",
        phone: "(12) 99637-3335",
        location: "São Paulo, SP - Remoto Global",
        social: {
            github: "https://github.com/seuusuario",
            linkedin: "https://www.linkedin.com/in/iago-vilela-2a9584272",
            instagram: "https://instagram.com/seuusuario"
        }
    },
    hero: {
        title: { prefix: "Transforme Ideias em", highlight: "Software de Alto Nível" },
        description: "Sistemas web personalizados, otimizados para performance e conversão."
    },
    about: {
        title: { prefix: "Mais que código,", highlight: "Soluções Estratégicas" },
        description: [
            "Minha forma de trabalhar une design moderno e sofisticado com engenharia de software sólida.",
            "Seja um sistema de gestão personalizado ou site institucional."
        ]
    }
}

const prisma = new PrismaClient()

async function main() {
    console.log('DATABASE_URL detected:', process.env.DATABASE_URL ? 'YES (Starts with ' + process.env.DATABASE_URL.substring(0, 10) + '...)' : 'NO');
    console.log('Seeding database via JS...')

    try {
        // 1. Admin User
        const email = 'iagovventura@gmail.com';
        const password = await bcrypt.hash('admin', 10);

        const user = await prisma.user.upsert({
            where: { email },
            update: { password },
            create: {
                email,
                name: 'Iago Vilela',
                password
            }
        });
        console.log(`Admin user ready: ${user.email}`);

        // 2. Site Config
        const config = await prisma.siteConfig.upsert({
            where: { id: 'config' },
            update: {},
            create: {
                id: 'config',
                heroTitle: siteConfig.hero.title.prefix + ' ' + siteConfig.hero.title.highlight,
                heroHighlight: siteConfig.hero.title.highlight,
                heroDescription: siteConfig.hero.description,

                aboutTitle: siteConfig.about.title.prefix + ' ' + siteConfig.about.title.highlight,
                aboutDescription: siteConfig.about.description.join('\n\n'),

                email: siteConfig.personal.email,
                phone: siteConfig.personal.phone,
                location: siteConfig.personal.location,
                instagramUrl: siteConfig.personal.social.instagram,
                linkedinUrl: siteConfig.personal.social.linkedin,
                githubUrl: siteConfig.personal.social.github,
            },
        })
        console.log(`SiteConfig created: ${config.id}`)
    } catch (e) {
        console.error("Error seeding:", e)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
