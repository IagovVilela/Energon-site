const { PrismaClient } = require('@prisma/client');

async function main() {
    const prisma = new PrismaClient();
    try {
        const projects = await prisma.project.findMany({
            include: { images: true }
        });

        console.log('\n=== PROJETOS NO BANCO ===');
        console.log('Total:', projects.length);
        console.log(JSON.stringify(projects, null, 2));
    } catch (error) {
        console.error('ERRO:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
