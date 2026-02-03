import { PrismaClient } from '@prisma/client'
import { siteConfig } from '../app/config/site'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // 1. Seed SiteConfig
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

    // 2. Seed Services
    for (const service of siteConfig.services.items) {
        // Note: We need to map icon names manually or store them stringified if we want true dynamic icons
        // For now, we will store the icon name if possible, or just a placeholder
        // Assuming simple mapping for this seed is tricky without complex logic, will insert basic data
        await prisma.service.create({
            data: {
                title: service.title,
                description: service.description,
                iconName: "Code" // Default placeholder, will need manual update or smarter mapping later
            }
        })
    }
    console.log('Services seeded')

    // 3. Seed Portfolio
    for (const project of siteConfig.portfolio.items) {
        await prisma.project.create({
            data: {
                title: project.title,
                category: project.category,
                description: project.description,
                imageUrl: project.image,
                tags: project.tags.join(', '),
                link: project.link,
            }
        })
    }
    console.log('Portfolio seeded')
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
