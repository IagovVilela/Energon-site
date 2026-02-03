const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: 'file:./prisma/dev.db'
        }
    }
});

async function exportData() {
    console.log('📊 Exportando dados do SQLite...');

    try {
        const users = await prisma.user.findMany();
        const projects = await prisma.project.findMany({
            include: { images: true }
        });
        const services = await prisma.service.findMany();
        const siteConfig = await prisma.siteConfig.findFirst();

        const data = {
            users,
            projects,
            services,
            siteConfig
        };

        fs.writeFileSync(
            'prisma/data-export.json',
            JSON.stringify(data, null, 2)
        );

        console.log('✅ Dados exportados para prisma/data-export.json');
        console.log(`   - Usuários: ${users.length}`);
        console.log(`   - Projetos: ${projects.length}`);
        console.log(`   - Serviços: ${services.length}`);
        console.log(`   - Config: ${siteConfig ? 'Sim' : 'Não'}`);

    } catch (error) {
        console.error('❌ Erro ao exportar:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

exportData();
