export const locales = ["en", "pt"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const en = {
  meta: {
    title: "Mario Raimundo — Motion designer",
    description:
      "Motion designer, character animator and 3D generalist. Broadcast packages, brand films and 3D for Volkswagen, Shell, Flamengo and CBF.",
  },
  role: "Motion designer / Character animator / 3D generalist",
  nav: {
    reel: "Reel",
    work: "Work",
    about: "About",
    quote: "Quote",
    contact: "Contact",
  },
  theme: {
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
  hero: {
    play: "Play reel",
    label: "Reel",
    format: "16:9 / 25 fps",
    fallback: "The reel opens on the original site.",
    positioning:
      "Motion designer / Video Editor / Character Animator / 3D Generalist",
  },
  statement:
    "I make graphics that have to survive a live match, a 6-second cut and a client review at 11pm. Broadcast packages, brand films, 3D and characters — usually all in the same week.",
  tickerLabel: "Clients",
  work: {
    title: "Work",
    selected: "Selected work",
    index: "Index",
    client: "Client",
    discipline: "Discipline",
    year: "Year",
    all: "All work",
    count: (n: number) => `${n} projects`,
  },
  project: {
    client: "Client",
    year: "Year",
    discipline: "Discipline",
    source: "Source",
    watch: "Open on Adobe Portfolio",
    play: "Play film",
    previous: "Previous project",
    next: "Next project",
    back: "All work",
    pipelineTitle: "Production & Pipeline",
    roleTitle: "My Role",
    highlightsTitle: "Production Notes",
    note: "No video attached yet. The link opens the original piece.",
    start: "Start a project",
    emailCta: "Send an email",
  },
  contact: {
    title: "Let's make something that moves.",
    titleLines: ["Let's make", "something", "that moves."],
    body: "Briefs, rates, availability. Tell me what it is, when it airs and what it has to do.",
    cta: "Send a message",
    quoteCta: "Get a quick estimate",
    reply: "Replies within two working days.",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      message: "Message",
      messagePlaceholder:
        "Tell me what you're working on, the deadline and the format.",
      submit: "Send email",
      subject: "New message from",
      note: "This opens your email app with the message ready to send.",
    },
  },
  about: {
    kicker: "About",
    title: "Motion designer, character animator and 3D generalist.",
    location: "Rio de Janeiro, Brazil",
    portraitAlt: "Mario Raimundo",
    bio: [
      "I'm Mario Raimundo, a motion designer, character animator and 3D generalist based in Rio de Janeiro. For the past decade I've built graphics for broadcast, advertising and brand campaigns, product films and character animation for education and entertainment.",
      "I started in illustration and 2D animation, learned rigging and character performance in After Effects, and later moved into 3D with Blender and Substance Painter. Today I work across the whole pipeline — concept, design, modeling, animation, lighting and compositing — which is why I'm usually the one carrying a board from the first sketch to final delivery.",
      "I currently work as a designer at Globo, after eight years at Pixel Produtora. I'm available for freelance projects.",
    ],
    career: "Career",
    toolkit: "Toolkit",
    clientsLabel: "Selected clients",
    cta: "Start a project",
    timeline: [
      {
        period: "2025 — present",
        role: "Designer I",
        company: "Globo",
        place: "Rio de Janeiro",
      },
      {
        period: "2017 — 2025",
        role: "Motion designer",
        company: "Pixel Produtora",
        place: "Rio de Janeiro",
      },
      {
        period: "2016 — 2017",
        role: "Character animator",
        company: "Animact Studio",
        place: "Rio de Janeiro",
      },
      {
        period: "2015 — 2016",
        role: "Illustrator",
        company: "Eleva Educação",
        place: "Rio de Janeiro",
      },
    ],
    tools: [
      "After Effects",
      "Premiere Pro",
      "Photoshop",
      "Illustrator",
      "Blender",
      "Substance Painter",
      "Nuke",
      "Maya",
      "Unreal Engine",
    ],
  },
  quote: {
    title: "Quick estimate",
    intro:
      "Pick the scope and send it straight to my WhatsApp. It takes 20 seconds.",
    format: "Format",
    formatOptions: [
      { id: "motion", label: "2D motion" },
      { id: "edit", label: "Editing" },
      { id: "3d", label: "3D animation" },
      { id: "character", label: "2D character animation" },
    ],
    complexity: "Complexity",
    complexityOptions: [
      { id: "simple", label: "Simple" },
      { id: "medium", label: "Medium" },
      { id: "high", label: "High" },
    ],
    duration: "Duration",
    minutes: "min",
    minutesHint: "0.25 = 15s · 0.5 = 30s · 1 = 60s",
    rateNote:
      "Per finished minute. Includes 2 revision rounds. Taxes, media and licensed music not included.",
    deadline: "Deadline",
    deadlineOptions: [
      { id: "standard", label: "10 working days" },
      { id: "fast", label: "5 working days (+25%)" },
      { id: "rush", label: "48h (+50%)" },
    ],
    deliverables: "Deliverables",
    deliveryOptions: [
      { id: "extraFormat", label: "Extra format (9:16 / 1:1)" },
      { id: "source", label: "Project files" },
    ],
    preProduction: "Pre-production",
    preOptions: [
      { id: "script", label: "Script" },
      { id: "storyboard", label: "Storyboard / animatic" },
      { id: "characterDesign", label: "Character design" },
      { id: "rigging", label: "Rigging" },
    ],
    audioText: "Audio & text",
    audioOptions: [
      { id: "sound", label: "Sound design" },
      { id: "subtitles", label: "Subtitles" },
    ],
    revisions: "Revisions",
    revisionsIncluded: "2 rounds included",
    revisionsExtra: "Extra round",
    estimate: "Estimate",
    disclaimer:
      "This is an estimate. The final quote will be agreed after a conversation with the client.",
    note: "Reference range only. 50% on approval; balance on delivery.",
    statusAvailable: "Available for new projects",
    cta: "Send on WhatsApp",
    emailCta: "Send via email",
    emailSubject: "Project Inquiry / Quote",
    whatsappIntro: "Hi Mario! I'd like a quote.",
    summary: {
      project: "Project",
      complexity: "Complexity",
      rate: "Rate",
      duration: "Duration",
      deadline: "Deadline",
      extras: "Extras",
      none: "None",
    },
  },
  footer: {
    rights: "All rights reserved",
    top: "Back to top",
    work: "Work",
    about: "About",
    quote: "Quote",
    contact: "Contact",
  },
};

export type Dictionary = typeof en;

const pt: Dictionary = {
  meta: {
    title: "Mario Raimundo — Motion designer",
    description:
      "Motion designer, animador de personagens e 3D generalista. Pacotes de transmissão, filmes de marca e 3D para Volkswagen, Shell, Flamengo e CBF.",
  },
  role: "Motion designer / Animador de personagens / 3D generalista",
  nav: {
    reel: "Reel",
    work: "Trabalhos",
    about: "Sobre",
    quote: "Orçamento",
    contact: "Contato",
  },
  theme: {
    toLight: "Ativar tema claro",
    toDark: "Ativar tema escuro",
  },
  hero: {
    play: "Assistir reel",
    label: "Reel",
    format: "16:9 / 25 fps",
    fallback: "O reel abre no site original.",
    positioning:
      "Motion designer / Editor de vídeo / Animador de personagens / Generalista 3D",
  },
  statement:
    "Faço gráficos que precisam sobreviver a um jogo ao vivo, a um corte de 6 segundos e a uma revisão de cliente às 23h. Pacotes de transmissão, filmes de marca, 3D e personagens — normalmente na mesma semana.",
  tickerLabel: "Clientes",
  work: {
    title: "Trabalhos",
    selected: "Selecionados",
    index: "Índice",
    client: "Cliente",
    discipline: "Disciplina",
    year: "Ano",
    all: "Todos os trabalhos",
    count: (n: number) => `${n} projetos`,
  },
  project: {
    client: "Cliente",
    year: "Ano",
    discipline: "Disciplina",
    source: "Origem",
    watch: "Abrir no Adobe Portfolio",
    play: "Assistir filme",
    previous: "Projeto anterior",
    next: "Próximo projeto",
    back: "Todos os trabalhos",
    pipelineTitle: "Produção & Pipeline",
    roleTitle: "Meu Papel",
    highlightsTitle: "Destaques Técnicos",
    note: "Sem vídeo anexado ainda. O link abre a peça original.",
    start: "Iniciar um projeto",
    emailCta: "Enviar e-mail",
  },
  contact: {
    title: "Vamos fazer algo que se mexa.",
    titleLines: ["Vamos fazer", "algo que", "se mexa."],
    body: "Briefing, valores, disponibilidade. Me conte o que é, quando vai ao ar e o que precisa fazer.",
    cta: "Enviar mensagem",
    quoteCta: "Pedir um orçamento rápido",
    reply: "Respondo em até dois dias úteis.",
    form: {
      name: "Nome",
      namePlaceholder: "Seu nome",
      message: "Mensagem",
      messagePlaceholder:
        "Me conte o que você está desenvolvendo, o prazo e o formato.",
      submit: "Enviar e-mail",
      subject: "Nova mensagem de",
      note: "Isso abre seu app de e-mail com a mensagem pronta para enviar.",
    },
  },
  about: {
    kicker: "Sobre",
    title: "Motion designer, animador de personagens e 3D generalista.",
    location: "Rio de Janeiro, Brasil",
    portraitAlt: "Mario Raimundo",
    bio: [
      "Sou Mario Raimundo, motion designer, animador de personagens e 3D generalista, baseado no Rio de Janeiro. Há uma década construo gráficos para transmissão, publicidade, campanhas de marca, filmes de produto e animação de personagens para educação e entretenimento.",
      "Comecei na ilustração e na animação 2D, passei por rigging e atuação de personagem no After Effects, e depois migrei para o 3D com Blender e Substance Painter. Hoje trabalho em todo o pipeline — conceito, design, modelagem, animação, luz e composição — e por isso costumo levar um board do primeiro esboço até a entrega final.",
      "Atualmente sou designer na Globo, depois de oito anos na Pixel Produtora. Estou disponível para projetos freelance.",
    ],
    career: "Trajetória",
    toolkit: "Ferramentas",
    clientsLabel: "Clientes selecionados",
    cta: "Começar um projeto",
    timeline: [
      {
        period: "2025 — atual",
        role: "Designer I",
        company: "Globo",
        place: "Rio de Janeiro",
      },
      {
        period: "2017 — 2025",
        role: "Motion designer",
        company: "Pixel Produtora",
        place: "Rio de Janeiro",
      },
      {
        period: "2016 — 2017",
        role: "Animador de personagem",
        company: "Animact Studio",
        place: "Rio de Janeiro",
      },
      {
        period: "2015 — 2016",
        role: "Ilustrador",
        company: "Eleva Educação",
        place: "Rio de Janeiro",
      },
    ],
    tools: [
      "After Effects",
      "Premiere Pro",
      "Photoshop",
      "Illustrator",
      "Blender",
      "Substance Painter",
      "Nuke",
      "Maya",
      "Unreal Engine",
    ],
  },
  quote: {
    title: "Orçamento rápido",
    intro:
      "Monte o escopo e envie direto no meu WhatsApp. Leva 20 segundos.",
    format: "Formato",
    formatOptions: [
      { id: "motion", label: "Motion 2D" },
      { id: "edit", label: "Edição" },
      { id: "3d", label: "Animação 3D" },
      { id: "character", label: "Animação 2D de personagem" },
    ],
    complexity: "Complexidade",
    complexityOptions: [
      { id: "simple", label: "Simples" },
      { id: "medium", label: "Média" },
      { id: "high", label: "Alta" },
    ],
    duration: "Duração",
    minutes: "min",
    minutesHint: "0,25 = 15s · 0,5 = 30s · 1 = 60s",
    rateNote:
      "Por minuto finalizado. Inclui 2 rodadas de revisão. Impostos, mídia e música licenciada não inclusos.",
    deadline: "Prazo",
    deadlineOptions: [
      { id: "standard", label: "10 dias úteis" },
      { id: "fast", label: "5 dias úteis (+25%)" },
      { id: "rush", label: "48h (+50%)" },
    ],
    deliverables: "Entregáveis",
    deliveryOptions: [
      { id: "extraFormat", label: "Formato extra (9:16 / 1:1)" },
      { id: "source", label: "Arquivos do projeto" },
    ],
    preProduction: "Pré-produção",
    preOptions: [
      { id: "script", label: "Roteiro" },
      { id: "storyboard", label: "Storyboard / animatic" },
      { id: "characterDesign", label: "Design de personagem" },
      { id: "rigging", label: "Rigging" },
    ],
    audioText: "Áudio & texto",
    audioOptions: [
      { id: "sound", label: "Sound design" },
      { id: "subtitles", label: "Legendas" },
    ],
    revisions: "Revisões",
    revisionsIncluded: "2 rodadas inclusas",
    revisionsExtra: "Rodada extra",
    estimate: "Estimativa",
    disclaimer:
      "Isto é uma estimativa. O orçamento final será previamente acordado após uma conversa com o cliente.",
    note: "Faixa de referência. 50% na aprovação; saldo na entrega.",
    statusAvailable: "Disponível para novos projetos",
    cta: "Enviar no WhatsApp",
    emailCta: "Enviar por e-mail",
    emailSubject: "Solicitação de Projeto / Orçamento",
    whatsappIntro: "Olá, Mario! Vim pelo site e quero um orçamento.",
    summary: {
      project: "Projeto",
      complexity: "Complexidade",
      rate: "Valor/min",
      duration: "Duração",
      deadline: "Prazo",
      extras: "Extras",
      none: "Nenhum",
    },
  },
  footer: {
    rights: "Todos os direitos reservados",
    top: "Voltar ao topo",
    work: "Trabalhos",
    about: "Sobre",
    quote: "Orçamento",
    contact: "Contato",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
