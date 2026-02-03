const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Caminho absoluto para o banco SQLite (o maior arquivo encontrado)
const dbPath = path.join(__dirname, 'dev.db');
console.log('📂 Tentando ler banco de:', dbPath);

// Configurar cliente manualmente para o arquivo específico
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: `file:${dbPath}`
        }
    }
});

async function exportData() {
    console.log('📊 Exportando SEUS dados do SQLite local...\n');

    try {
        // Buscar todos os dados
        const users = await prisma.user.findMany();
        const projects = await prisma.project.findMany({
            include: { images: true }
        });
        const services = await prisma.service.findMany();
        const siteConfig = await prisma.siteConfig.findFirst();

        console.log('✅ Dados encontrados:');
        console.log(`   - Usuários: ${users.length}`);
        console.log(`   - Projetos: ${projects.length}`);
        console.log(`   - Serviços: ${services.length}`);
        console.log(`   - Config: ${siteConfig ? 'Sim' : 'Não'}\n`);

        // Gerar código JavaScript para o seed
        const seedCode = `const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Migrando SEUS dados REAIS para PostgreSQL...\\n');

  // 1. Usuários
  console.log('Criando usuários...');
  ${users.map(user => `
  await prisma.user.upsert({
    where: { email: '${user.email}' },
    update: {},
    create: {
      id: '${user.id}',
      email: '${user.email}',
      password: '${user.password}',
      name: ${user.name ? `'${user.name}'` : 'null'},
      createdAt: new Date('${user.createdAt.toISOString()}'),
      updatedAt: new Date('${user.updatedAt.toISOString()}')
    }
  });`).join('\n')}
  console.log('✅ ${users.length} usuário(s) criado(s)\\n');

  // 2. Configurações do Site
  ${siteConfig ? `
  console.log('Criando configurações do site...');
  await prisma.siteConfig.upsert({
    where: { id: 'config' },
    update: {},
    create: {
      id: '${siteConfig.id}',
      heroTitle: \`${siteConfig.heroTitle.replace(/`/g, '\\`')}\`,
      heroHighlight: \`${siteConfig.heroHighlight.replace(/`/g, '\\`')}\`,
      heroDescription: \`${siteConfig.heroDescription.replace(/`/g, '\\`')}\`,
      aboutTitle: \`${siteConfig.aboutTitle.replace(/`/g, '\\`')}\`,
      aboutDescription: \`${siteConfig.aboutDescription.replace(/`/g, '\\`')}\`,
      email: '${siteConfig.email}',
      phone: '${siteConfig.phone}',
      location: '${siteConfig.location}',
      githubUrl: ${siteConfig.githubUrl ? `'${siteConfig.githubUrl}'` : 'null'},
      linkedinUrl: ${siteConfig.linkedinUrl ? `'${siteConfig.linkedinUrl}'` : 'null'},
      instagramUrl: ${siteConfig.instagramUrl ? `'${siteConfig.instagramUrl}'` : 'null'},
      updatedAt: new Date('${siteConfig.updatedAt.toISOString()}')
    }
  });
  console.log('✅ Configurações criadas\\n');
  ` : '// Sem configurações no banco local'}

  // 3. Projetos
  console.log('Criando projetos...');
  ${projects.map(project => {
            const escapedTitle = project.title.replace(/'/g, "\\'").replace(/\n/g, "\\n");
            const escapedDescription = project.description.replace(/'/g, "\\'").replace(/\n/g, "\\n");
            return `
  const project_${project.id.replace(/-/g, '_')} = await prisma.project.upsert({
    where: { id: '${project.id}' },
    update: {},
    create: {
      id: '${project.id}',
      title: '${escapedTitle}',
      category: '${project.category}',
      description: '${escapedDescription}',
      imageUrl: ${project.imageUrl ? `'${project.imageUrl}'` : 'null'},
      videoUrl: ${project.videoUrl ? `'${project.videoUrl}'` : 'null'},
      tags: '${project.tags}',
      link: ${project.link ? `'${project.link}'` : 'null'},
      featured: ${project.featured},
      createdAt: new Date('${project.createdAt.toISOString()}'),
      updatedAt: new Date('${project.updatedAt.toISOString()}')
    }
  });
  ${project.images && project.images.length > 0 ? `
  // Imagens do projeto
  ${project.images.map(img => `
  await prisma.projectImage.create({
    data: {
      id: '${img.id}',
      url: '${img.url}',
      projectId: project_${project.id.replace(/-/g, '_')}.id,
      createdAt: new Date('${img.createdAt.toISOString()}')
    }
  });`).join('\n')}
  ` : ''}`;
        }).join('\n')}
  console.log('✅ ${projects.length} projeto(s) criado(s)\\n');

  // 4. Serviços
  ${services.length > 0 ? `
  console.log('Criando serviços...');
  ${services.map(service => {
            const escapedTitle = service.title.replace(/'/g, "\\'").replace(/\n/g, "\\n");
            const escapedDescription = service.description.replace(/'/g, "\\'").replace(/\n/g, "\\n");
            return `
  await prisma.service.upsert({
    where: { id: '${service.id}' },
    update: {},
    create: {
      id: '${service.id}',
      title: '${escapedTitle}',
      description: '${escapedDescription}',
      iconName: '${service.iconName}',
      createdAt: new Date('${service.createdAt.toISOString()}'),
      updatedAt: new Date('${service.updatedAt.toISOString()}')
    }
  });`;
        }).join('\n')}
  console.log('✅ ${services.length} serviço(s) criado(s)\\n');
  ` : '// Sem serviços no banco local'}

  console.log('🎉 Migração completa!');
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;

        // Salvar o seed gerado
        const seedPath = path.join(__dirname, 'seed-migrated.js');
        fs.writeFileSync(seedPath, seedCode);

        console.log('✅ SEED GERADO COM SUCESSO!');
        console.log(`📁 Arquivo: prisma/seed-migrated.js\n`);

    } catch (error) {
        console.error('❌ Erro:', error.message);
        if (error.code === 'P2025') console.error('  (Registro não encontrado)');
    } finally {
        await prisma.$disconnect();
    }
}

exportData();
