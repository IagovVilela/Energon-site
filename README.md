# Site Institucional - Sistemas Web Personalizados

Site institucional moderno, animado e responsivo para apresentar serviços de desenvolvimento de sistemas web personalizados.

## 🚀 Tecnologias

- **Next.js 14+** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **shadcn/ui** - Componentes UI
- **React Hook Form + Zod** - Formulários e validação
- **Lucide React** - Ícones

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📝 Gerenciamento de Conteúdo

O site utiliza arquivos JSON para gerenciar o conteúdo de forma simples e editável. Todos os arquivos estão na pasta `data/`:

### Arquivos de Conteúdo

- **`data/services.json`** - Serviços oferecidos
- **`data/portfolio.json`** - Sistemas desenvolvidos (portfólio)
- **`data/certifications.json`** - Certificações e conquistas
- **`data/news.json`** - Notícias e novidades
- **`data/testimonials.json`** - Depoimentos de clientes
- **`data/process.json`** - Etapas do processo de trabalho
- **`data/differentiators.json`** - Diferenciais competitivos

### Como Adicionar Conteúdo

#### Adicionar um Novo Sistema ao Portfólio

Edite `data/portfolio.json`:

```json
{
  "id": "3",
  "name": "Nome do Sistema",
  "description": "Descrição do sistema",
  "features": [
    "Funcionalidade 1",
    "Funcionalidade 2",
    "Funcionalidade 3"
  ],
  "customizable": true,
  "tags": ["Tag1", "Tag2"]
}
```

#### Adicionar uma Certificação

Edite `data/certifications.json`:

```json
{
  "id": "2",
  "name": "Nome da Certificação",
  "issuer": "Emissor",
  "date": "2024-03-15",
  "url": "https://link-para-certificacao.com"
}
```

#### Adicionar uma Notícia

Edite `data/news.json`:

```json
{
  "id": "2",
  "title": "Título da Notícia",
  "description": "Descrição da notícia",
  "date": "2024-03-15",
  "isNew": true,
  "link": "https://link-opcional.com"
}
```

#### Adicionar um Depoimento

Edite `data/testimonials.json`:

```json
{
  "id": "2",
  "name": "Nome do Cliente",
  "company": "Empresa",
  "role": "Cargo",
  "content": "Depoimento do cliente",
  "rating": 5
}
```

### Ícones Disponíveis

Os ícones são do Lucide React. Consulte a [documentação](https://lucide.dev/icons/) para ver todos os ícones disponíveis.

Para usar um ícone, use o nome em PascalCase (ex: `Code`, `Briefcase`, `BarChart3`).

## 🎨 Personalização

### Cores e Tema

Edite `app/globals.css` para personalizar as cores do tema. As variáveis CSS estão definidas na seção `:root` e `.dark`.

### Animações

As animações estão definidas em `lib/animations.ts`. Você pode ajustar durações, delays e efeitos conforme necessário.

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large Desktop (1280px+)

## 🚀 Build para Produção

```bash
npm run build
npm start
```

## 📄 Licença

Este projeto é privado e proprietário.

