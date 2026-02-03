const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Migrando SEUS dados REAIS para PostgreSQL...\n');

  // 1. Usuários
  console.log('Criando usuários...');
  
  await prisma.user.upsert({
    where: { email: 'iagovventura@gmail.com' },
    update: {},
    create: {
      id: 'cmkne7qe50000bsysm5vo68oe',
      email: 'iagovventura@gmail.com',
      password: '$2b$10$9QNOfkEjGhfe//OO/658Kut6NhR9qiUAhr3xTbSX7b/4KFOKTeY9q',
      name: 'Iago Vilela',
      createdAt: new Date('2026-01-21T02:17:34.301Z'),
      updatedAt: new Date('2026-02-03T00:19:09.794Z')
    }
  });
  console.log('✅ 1 usuário(s) criado(s)\n');

  // 2. Configurações do Site
  
  console.log('Criando configurações do site...');
  await prisma.siteConfig.upsert({
    where: { id: 'config' },
    update: {},
    create: {
      id: 'config',
      heroTitle: `Transforme Ideias em Software de Alto Nível`,
      heroHighlight: `Software de Alto Nível`,
      heroDescription: `Sistemas web personalizados, otimizados para performance e conversão.`,
      aboutTitle: `Mais que código, Soluções Estratégicas`,
      aboutDescription: `Minha forma de trabalhar une design moderno e sofisticado com engenharia de software sólida.

Seja um sistema de gestão personalizado ou site institucional.`,
      email: 'iagovventura@gmail.com',
      phone: '(12) 99637-3335',
      location: 'São Paulo, SP - Remoto Global',
      githubUrl: 'https://github.com/seuusuario',
      linkedinUrl: 'https://www.linkedin.com/in/iago-vilela-2a9584272',
      instagramUrl: 'https://instagram.com/seuusuario',
      updatedAt: new Date('2026-01-21T02:17:34.310Z')
    }
  });
  console.log('✅ Configurações criadas\n');
  

  // 3. Projetos
  console.log('Criando projetos...');
  
  const project_cmknfhuyb000ebs5cxrfpd1rm = await prisma.project.upsert({
    where: { id: 'cmknfhuyb000ebs5cxrfpd1rm' },
    update: {},
    create: {
      id: 'cmknfhuyb000ebs5cxrfpd1rm',
      title: 'Review WEB',
      category: 'Sistema de gerenciamento de avalições empresarial',
      description: 'A solução permite que empresas gerenciem sua reputação online de forma estratégica, coletando avaliações por meio de páginas públicas personalizadas e aplicando fluxos inteligentes conforme a nota recebida:\n⭐ 4–5 estrelas: redirecionamento automático para o Google Maps\n ⭐ 1–3 estrelas: coleta de feedback privado para tratamento interno',
      imageUrl: '/uploads/1768964006383-imagem_2026-01-20_234704440.png',
      videoUrl: null,
      tags: 'Tailwind CSS, React, Laravel',
      link: null,
      featured: false,
      createdAt: new Date('2026-01-21T02:53:26.387Z'),
      updatedAt: new Date('2026-01-21T02:53:26.387Z')
    }
  });
  
  // Imagens do projeto
  
  await prisma.projectImage.create({
    data: {
      id: 'cmknfhuyk000gbs5crkcxm17l',
      url: '/uploads/1768964006394-imagem_2026-01-20_234411821.png',
      projectId: project_cmknfhuyb000ebs5cxrfpd1rm.id,
      createdAt: new Date('2026-01-21T02:53:26.396Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmknfhuyw000ibs5ch6o7engw',
      url: '/uploads/1768964006405-imagem_2026-01-20_234436409.png',
      projectId: project_cmknfhuyb000ebs5cxrfpd1rm.id,
      createdAt: new Date('2026-01-21T02:53:26.408Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmknfhuz4000kbs5cz78a50st',
      url: '/uploads/1768964006414-imagem_2026-01-20_234457431.png',
      projectId: project_cmknfhuyb000ebs5cxrfpd1rm.id,
      createdAt: new Date('2026-01-21T02:53:26.416Z')
    }
  });
  

  const project_cmknggs8g0000bswso09c8an8 = await prisma.project.upsert({
    where: { id: 'cmknggs8g0000bswso09c8an8' },
    update: {},
    create: {
      id: 'cmknggs8g0000bswso09c8an8',
      title: 'Gestor de Gastos',
      category: 'Sistema de Gestão Financeira Pessoal ',
      description: 'Desenvolvi um sistema de gestão financeira pessoal com foco em controle, planejamento e decisões mais conscientes.\nFuncionalidades principais:\nGestão financeira\nControle de receitas e despesas com categorização\nMúltiplas contas bancárias e tipos de conta\nLançamentos futuros com atualização automática de saldo\nSuporte a despesas fixas, variáveis e recorrentes\nCartão de crédito\nGestão de faturas com cálculo automático\nPagamento único ou combinado entre contas\nProjeção de faturas futuras\nHistórico de faturas pagas\nPoupanças e metas\nContas poupança com acompanhamento de evolução\nMetas financeiras com indicadores de progresso\nDiagnóstico de poupanças atreladas\nGráficos de evolução',
      imageUrl: '/uploads/1768965635820-imagem_2026-01-21_001800514.png',
      videoUrl: null,
      tags: 'Next.js, Tailwind CSS,Prisma ORM',
      link: null,
      featured: false,
      createdAt: new Date('2026-01-21T03:20:35.824Z'),
      updatedAt: new Date('2026-01-21T03:20:35.824Z')
    }
  });
  
  // Imagens do projeto
  
  await prisma.projectImage.create({
    data: {
      id: 'cmknggs9i0002bswsai8tryhf',
      url: '/uploads/1768965635859-imagem_2026-01-21_001823996.png',
      projectId: project_cmknggs8g0000bswso09c8an8.id,
      createdAt: new Date('2026-01-21T03:20:35.862Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmknggs9q0004bswsyxik9mnt',
      url: '/uploads/1768965635869-imagem_2026-01-21_001911452.png',
      projectId: project_cmknggs8g0000bswso09c8an8.id,
      createdAt: new Date('2026-01-21T03:20:35.871Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmknggs9y0006bswsoyqfwm66',
      url: '/uploads/1768965635877-imagem_2026-01-21_001929425.png',
      projectId: project_cmknggs8g0000bswso09c8an8.id,
      createdAt: new Date('2026-01-21T03:20:35.879Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmknggsa50008bswsqepipfd2',
      url: '/uploads/1768965635884-imagem_2026-01-21_001944661.png',
      projectId: project_cmknggs8g0000bswso09c8an8.id,
      createdAt: new Date('2026-01-21T03:20:35.886Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmknggsad000abswstixnbb0i',
      url: '/uploads/1768965635891-imagem_2026-01-21_002002404.png',
      projectId: project_cmknggs8g0000bswso09c8an8.id,
      createdAt: new Date('2026-01-21T03:20:35.893Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmknggsak000cbswsbgga577a',
      url: '/uploads/1768965635898-imagem_2026-01-21_002031705.png',
      projectId: project_cmknggs8g0000bswso09c8an8.id,
      createdAt: new Date('2026-01-21T03:20:35.900Z')
    }
  });
  

  const project_cmkngnssp000dbswswioez64a = await prisma.project.upsert({
    where: { id: 'cmkngnssp000dbswswioez64a' },
    update: {},
    create: {
      id: 'cmkngnssp000dbswswioez64a',
      title: 'Transformando a experiência de treino e nutrição com tecnologia!',
      category: 'Acompanhamento de Usuario',
      description: '### 💪 **O Problema que Resolvi:**\n\nPersonal trainers precisam de uma ferramenta que:\n- Organize treinos de múltiplos alunos\n- Acompanhe evolução física de forma visual\n- Gerencie planos nutricionais complexos\n- Se comunique facilmente com seus alunos\n\nAlunos precisam de:\n- Acesso fácil aos seus treinos\n- Orientação visual na execução dos exercícios\n- Acompanhamento de sua evolução\n- Lembretes inteligentes\n\n### 🚀 **A Solução:**\n\nDesenvolvi uma plataforma completa que oferece:\n\n**Para Personal Trainers:**\n- 📋 Criação de treinos personalizados em minutos\n- 📊 Dashboards com análise de performance dos alunos\n- 🥗 Sistema nutricional completo com cálculo automático de macros\n- 💬 Comunicação em tempo real com alunos\n- 📈 Acompanhamento visual da evolução física\n\n**Para Alunos:**\n- 🎯 Treinos guiados com GIFs animados dos exercícios\n- 📱 Interface intuitiva e moderna\n- 🔔 Notificações automáticas inteligentes\n- 📸 Registro de evolução física com fotos\n- 📊 Gráficos interativos de progresso',
      imageUrl: '/uploads/1768965963143-imagem_2026-01-21_002245114.png',
      videoUrl: null,
      tags: 'Next.js, Tailwind CSS,Prisma ORM',
      link: null,
      featured: false,
      createdAt: new Date('2026-01-21T03:26:03.146Z'),
      updatedAt: new Date('2026-01-21T03:26:03.146Z')
    }
  });
  
  // Imagens do projeto
  
  await prisma.projectImage.create({
    data: {
      id: 'cmkngnssw000fbswsur12uuux',
      url: '/uploads/1768965963151-imagem_2026-01-21_002305186.png',
      projectId: project_cmkngnssp000dbswswioez64a.id,
      createdAt: new Date('2026-01-21T03:26:03.153Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmkngnstj000hbsws028saenf',
      url: '/uploads/1768965963173-imagem_2026-01-21_002328455.png',
      projectId: project_cmkngnssp000dbswswioez64a.id,
      createdAt: new Date('2026-01-21T03:26:03.175Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmkngnstq000jbswsdyzm8cii',
      url: '/uploads/1768965963180-imagem_2026-01-21_002409785.png',
      projectId: project_cmkngnssp000dbswswioez64a.id,
      createdAt: new Date('2026-01-21T03:26:03.182Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmkngnstw000lbswspac454bq',
      url: '/uploads/1768965963187-imagem_2026-01-21_002429151.png',
      projectId: project_cmkngnssp000dbswswioez64a.id,
      createdAt: new Date('2026-01-21T03:26:03.188Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmkngnsu2000nbswsi47qvxq4',
      url: '/uploads/1768965963193-imagem_2026-01-21_002455191.png',
      projectId: project_cmkngnssp000dbswswioez64a.id,
      createdAt: new Date('2026-01-21T03:26:03.195Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmkngnsua000pbswsqca5u1y3',
      url: '/uploads/1768965963200-imagem_2026-01-21_002519293.png',
      projectId: project_cmkngnssp000dbswswioez64a.id,
      createdAt: new Date('2026-01-21T03:26:03.202Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmkngnsug000rbswssoq7cii3',
      url: '/uploads/1768965963207-imagem_2026-01-21_002535949.png',
      projectId: project_cmkngnssp000dbswswioez64a.id,
      createdAt: new Date('2026-01-21T03:26:03.209Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmkngnsun000tbswsxhsf8f5s',
      url: '/uploads/1768965963214-imagem_2026-01-21_002558649.png',
      projectId: project_cmkngnssp000dbswswioez64a.id,
      createdAt: new Date('2026-01-21T03:26:03.216Z')
    }
  });
  

  const project_cmkngtwyi000ubswsdd7sqqkc = await prisma.project.upsert({
    where: { id: 'cmkngtwyi000ubswsdd7sqqkc' },
    update: {},
    create: {
      id: 'cmkngtwyi000ubswsdd7sqqkc',
      title: 'Gestor Consulta',
      category: '🏥 Sistema de Gerenciamento de Consultas Médicas',
      description: '## ✨ Funcionalidades Principais\n\n### 📊 Dashboard Inteligente\n- Métricas em tempo real (consultas do dia, atendimentos do mês, taxa de ocupação)\n- Gráficos interativos com Recharts\n- Visualização por status com cores dinâmicas\n\n### 📅 Sistema de Agenda Completo\n- Calendário semanal com visualização intuitiva\n- Validação automática de conflitos de horário\n- Suporte a consultas por convênio\n- Sistema de arquivamento para organização\n\n### 👥 Gestão de Pacientes\n- Cadastro completo com validação de dados\n- Histórico completo de consultas\n- Busca avançada e filtros\n- Médico preferencial por paciente\n\n### 📋 Prontuário Eletrônico\n- Registro completo de consultas\n- Evoluções e prescrições\n- Anexo de documentos e arquivos\n- Histórico completo do paciente\n\n### 🏥 Multi-tenancy\n- Suporte a múltiplas clínicas\n- Isolamento completo de dados por clínica\n- Personalização por clínica (logo, cores)\n- Gestão de profissionais e secretárias por clínica\n\n### 📈 Relatórios e Exportação\n- Relatórios financeiros e de atendimentos\n- Exportação para CSV e PDF\n- Análises por profissional e período\n- Gráficos de distribuição de status',
      imageUrl: '/uploads/1768966248471-imagem_2026-01-21_002951417.png',
      videoUrl: null,
      tags: 'Tailwind CSS, React, Next.js',
      link: null,
      featured: false,
      createdAt: new Date('2026-01-21T03:30:48.474Z'),
      updatedAt: new Date('2026-01-21T03:30:48.474Z')
    }
  });
  
  // Imagens do projeto
  
  await prisma.projectImage.create({
    data: {
      id: 'cmkngtwyp000wbswsxtpd4gqy',
      url: '/uploads/1768966248479-imagem_2026-01-21_003002966.png',
      projectId: project_cmkngtwyi000ubswsdd7sqqkc.id,
      createdAt: new Date('2026-01-21T03:30:48.481Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmkngtwyw000ybswsiv0kbleg',
      url: '/uploads/1768966248486-imagem_2026-01-21_003018110.png',
      projectId: project_cmkngtwyi000ubswsdd7sqqkc.id,
      createdAt: new Date('2026-01-21T03:30:48.488Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmkngtwz30010bsws0bmvwuom',
      url: '/uploads/1768966248493-imagem_2026-01-21_003029266.png',
      projectId: project_cmkngtwyi000ubswsdd7sqqkc.id,
      createdAt: new Date('2026-01-21T03:30:48.495Z')
    }
  });
  

  const project_cmkngzm970011bswsoscd9e1y = await prisma.project.upsert({
    where: { id: 'cmkngzm970011bswsoscd9e1y' },
    update: {},
    create: {
      id: 'cmkngzm970011bswsoscd9e1y',
      title: 'Portifolio Pessoal',
      category: 'Apresentação Pessoal',
      description: 'Projeto de Portfólio Pessoal Profissional, desenvolvido com foco em apresentar de forma clara, moderna e estratégica as habilidades técnicas e a experiência profissional do usuário. O portfólio organiza informações como competências, projetos realizados, histórico profissional e formas de contato, valorizando a identidade visual e a usabilidade. A proposta do projeto é servir como um modelo personalizável, permitindo que outras pessoas adaptem facilmente o layout e o conteúdo para divulgar seu próprio perfil profissional, fortalecer sua marca pessoal e aumentar oportunidades no mercado de trabalho.',
      imageUrl: '/uploads/1768966514537-imagem_2026-01-21_003415497.png',
      videoUrl: null,
      tags: 'React, JavaScript',
      link: null,
      featured: false,
      createdAt: new Date('2026-01-21T03:35:14.540Z'),
      updatedAt: new Date('2026-01-21T03:35:14.540Z')
    }
  });
  
  // Imagens do projeto
  
  await prisma.projectImage.create({
    data: {
      id: 'cmkngzm9e0013bswsgl9al9pv',
      url: '/uploads/1768966514545-imagem_2026-01-21_003431196.png',
      projectId: project_cmkngzm970011bswsoscd9e1y.id,
      createdAt: new Date('2026-01-21T03:35:14.547Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmkngzm9k0015bswsvf9pf8wq',
      url: '/uploads/1768966514551-imagem_2026-01-21_003439786.png',
      projectId: project_cmkngzm970011bswsoscd9e1y.id,
      createdAt: new Date('2026-01-21T03:35:14.553Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmkngzm9r0017bswsk5rg9yby',
      url: '/uploads/1768966514557-imagem_2026-01-21_003453130.png',
      projectId: project_cmkngzm970011bswsoscd9e1y.id,
      createdAt: new Date('2026-01-21T03:35:14.559Z')
    }
  });

  await prisma.projectImage.create({
    data: {
      id: 'cmkngzm9z0019bswstttpi4rk',
      url: '/uploads/1768966514564-imagem_2026-01-21_003510536.png',
      projectId: project_cmkngzm970011bswsoscd9e1y.id,
      createdAt: new Date('2026-01-21T03:35:14.567Z')
    }
  });
  
  console.log('✅ 5 projeto(s) criado(s)\n');

  // 4. Serviços
  
  console.log('Criando serviços...');
  
  await prisma.service.upsert({
    where: { id: 'cml5uq0kx0000bs2crcmpce0c' },
    update: {},
    create: {
      id: 'cml5uq0kx0000bs2crcmpce0c',
      title: 'Sistemas Web Personalizados',
      description: 'Plataformas completas acessíveis pelo navegador, feitas sob medida para sua regra de negócio.',
      iconName: 'Code',
      createdAt: new Date('2026-02-03T00:19:32.338Z'),
      updatedAt: new Date('2026-02-03T00:19:32.338Z')
    }
  });

  await prisma.service.upsert({
    where: { id: 'cml5uq0l40001bs2cjg6syehd' },
    update: {},
    create: {
      id: 'cml5uq0l40001bs2cjg6syehd',
      title: 'Sistemas de Gestão (ERP)',
      description: 'Controle de estoque, financeiro, clientes e processos em um único lugar seguro.',
      iconName: 'Code',
      createdAt: new Date('2026-02-03T00:19:32.345Z'),
      updatedAt: new Date('2026-02-03T00:19:32.345Z')
    }
  });

  await prisma.service.upsert({
    where: { id: 'cml5uq0la0002bs2crvv4d2x9' },
    update: {},
    create: {
      id: 'cml5uq0la0002bs2crvv4d2x9',
      title: 'Dashboards Interativos',
      description: 'Painéis administrativos com gráficos em tempo real para tomada de decisões estratégicas.',
      iconName: 'Code',
      createdAt: new Date('2026-02-03T00:19:32.350Z'),
      updatedAt: new Date('2026-02-03T00:19:32.350Z')
    }
  });

  await prisma.service.upsert({
    where: { id: 'cml5uq0lg0003bs2c038x5whq' },
    update: {},
    create: {
      id: 'cml5uq0lg0003bs2c038x5whq',
      title: 'Automação de Processos',
      description: 'Elimine planilhas e trabalho manual com robôs e scripts inteligentes.',
      iconName: 'Code',
      createdAt: new Date('2026-02-03T00:19:32.356Z'),
      updatedAt: new Date('2026-02-03T00:19:32.356Z')
    }
  });

  await prisma.service.upsert({
    where: { id: 'cml5uq0lm0004bs2c4gxmp6vv' },
    update: {},
    create: {
      id: 'cml5uq0lm0004bs2c4gxmp6vv',
      title: 'Web Apps Responsivos',
      description: 'Aplicações que funcionam perfeitamente em qualquer dispositivo: Celular, Tablet ou Desktop.',
      iconName: 'Code',
      createdAt: new Date('2026-02-03T00:19:32.362Z'),
      updatedAt: new Date('2026-02-03T00:19:32.362Z')
    }
  });

  await prisma.service.upsert({
    where: { id: 'cml5uq0ls0005bs2c45oz1aoz' },
    update: {},
    create: {
      id: 'cml5uq0ls0005bs2c45oz1aoz',
      title: 'Landing Pages de Alta Conversão',
      description: 'Páginas focadas em venda, com design persuasivo e velocidade extrema.',
      iconName: 'Code',
      createdAt: new Date('2026-02-03T00:19:32.369Z'),
      updatedAt: new Date('2026-02-03T00:19:32.369Z')
    }
  });
  console.log('✅ 6 serviço(s) criado(s)\n');
  

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
