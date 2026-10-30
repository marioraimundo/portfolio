import type { Locale } from "./i18n";

export type TagKey =
  | "motion"
  | "broadcast"
  | "character"
  | "threeD"
  | "product"
  | "brand"
  | "education";

export const tagLabels: Record<TagKey, Record<Locale, string>> = {
  motion: { en: "Motion", pt: "Motion" },
  broadcast: { en: "Broadcast", pt: "Transmissão" },
  character: { en: "Character", pt: "Personagem" },
  threeD: { en: "3D", pt: "3D" },
  product: { en: "Product", pt: "Produto" },
  brand: { en: "Brand", pt: "Marca" },
  education: { en: "Education", pt: "Ensino" },
};

const CDN = "https://cdn.myportfolio.com/2865daea-55e6-4ba3-9d96-723f37356474";

export type ProjectBreakdown = {
  role: Record<Locale, string>;
  pipeline: string[];
  highlights: Record<Locale, string[]>;
};

export type ProjectCaseStudy = {
  context: string;
  role: string;
  process: string;
  tools: string;
};

export type Project = {
  slug: string;
  client: string;
  title: string;
  year: string;
  tags: TagKey[];
  discipline?: Record<Locale, string>;
  caseStudy?: Record<Locale, ProjectCaseStudy>;
  poster: string;
  videoId?: string;
  videoSrc?: string;
  featured: boolean;
  brief: Record<Locale, string>;
  breakdown?: ProjectBreakdown;
};

export const projects: Project[] = [
  {
    slug: "volkswagen-maxi-performance",
    client: "Volkswagen",
    title: "Maxi Performance",
    year: "2021",
    tags: ["threeD", "motion"],
    discipline: {
      en: "Illustration, Rigging, 2D Character Animation and Motion",
      pt: "Ilustração, Rigging, Animação de Personagens 2D e Motion",
    },
    caseStudy: {
      en: {
        context:
          "A campaign piece for Volkswagen's Maxi Performance line, where the product had to read as engineering rather than decoration: mechanical parts in frame, cut by graphic transitions.",
        role: "3D asset modeling, shading and lighting, plus the motion design that holds the shots together.",
        process:
          "I modeled and textured the mechanical components, built a high-contrast studio light setup to give the parts volume, and cut them against kinetic typography kept inside broadcast-safe areas.",
        tools: "Blender, Substance Painter and After Effects.",
      },
      pt: {
        context:
          "Peça de campanha para a linha Maxi Performance da Volkswagen, em que o produto precisava ser lido como engenharia, não como decoração: peças mecânicas em quadro, cortadas por transições gráficas.",
        role: "Modelagem, shading e iluminação 3D, além do motion design que amarra os planos.",
        process:
          "Modelei e texturizei os componentes mecânicos, montei uma luz de estúdio de alto contraste para dar volume às peças e cortei tudo com tipografia cinética dentro das áreas seguras de transmissão.",
        tools: "Blender, Substance Painter e After Effects.",
      },
    },
    poster: "/work/volkswagen-maxi-performance.jpg",
    videoSrc: "/work/volkswagen-maxi-performance.mp4",
    featured: true,
    brief: {
      en: "Campaign piece for the Volkswagen Maxi Performance line: 3D vehicle work cut against graphic transitions.",
      pt: "Peça de campanha para a linha Maxi Performance da Volkswagen: 3D de veículo cortado com transições gráficas.",
    },
    breakdown: {
      role: {
        en: "3D Asset Modeling, Shading, Lighting & Motion Design",
        pt: "Modelagem de Assets 3D, Shading, Iluminação e Motion Design",
      },
      pipeline: ["Blender", "After Effects", "Substance Painter"],
      highlights: {
        en: [
          "Full 3D modeling and texturing of mechanical vehicle components",
          "High-contrast studio lighting setup to emphasize product volume",
          "Dynamic kinetic typography integrated into broadcast safe areas",
        ],
        pt: [
          "Modelagem 3D e texturização de componentes mecânicos automotivos",
          "Iluminação de estúdio de alto contraste para destacar os volumes do produto",
          "Tipografia cinética integrada nas áreas seguras de transmissão",
        ],
      },
    },
  },
  {
    slug: "flamengo-libertadores-2019",
    client: "Flamengo",
    title: "Libertadores 2019",
    year: "2019",
    tags: ["broadcast", "motion"],
    discipline: {
      en: "3D modeling, Compositing and Motion",
      pt: "Modelagem 3D, Composição e Motion",
    },
    poster: "/work/flamengo-libertadores-2019.jpg",
    videoSrc: "/work/flamengo-libertadores-2019.mp4",
    featured: true,
    brief: {
      en: "Broadcast graphics package for Flamengo's 2019 Libertadores campaign: opener, transitions and endtag engineered to run inside live match broadcasts on Brazilian national television. High-impact motion design built for real-time sports television.",
      pt: "Pacote de transmissão para a campanha do Flamengo na Libertadores: abertura, transições e endtag para rodar em jogo ao vivo.",
    },
    breakdown: {
      role: {
        en: "Broadcast Package Direction, Opening Titles & Live Match Graphics",
        pt: "Direção do Pacote Gráfico, Abertura e Vinhetas de Transmissão",
      },
      pipeline: ["After Effects", "Cinema 4D", "Photoshop"],
      highlights: {
        en: [
          "Complete broadcast identity package designed for live-match switching",
          "Custom alpha-channel transitions for instant camera cutaways",
          "High-impact typographic pacing tuned for live sports television",
        ],
        pt: [
          "Pacote gráfico completo de identidade visual para exibição ao vivo",
          "Transições com canal alpha para cortes instantâneos durante o jogo",
          "Ritmo tipográfico de alto impacto afinado com transmissões esportivas",
        ],
      },
    },
    caseStudy: {
      en: {
        context:
          "Flamengo's 2019 Libertadores campaign required a broadcast graphics package that could survive the intensity of live match television. The opener, transitions and endtag had to trigger at any moment during the match — with zero delay, no broken links and no visible seam breaks between camera and graphics.",
        role:
          "Broadcast package direction, opening titles and live match graphics. I designed the full visual system and animated every element from first boards to final delivery.",
        process:
          "The package was built around alpha-channel transitions, so a cut from camera to graphics happens without a visible seam. Typography carries the impact — heavy, fast, timed to the crowd — while 3D elements give the opener weight. Everything else stays flat enough to read in a two-second cut during live switching.",
        tools: "Cinema 4D, After Effects and Photoshop.",
      },
      pt: {
        context:
          "A campanha do Flamengo na Libertadores de 2019 exigiu um pacote gráfico de transmissão que pudesse sobreviver à intensidade da TV ao vivo. A abertura, as transições e o endtag precisavam disparar a qualquer momento durante o jogo — sem atraso, sem links quebrados e sem emendas visíveis entre a câmera e o gráfico.",
        role:
          "Direção do pacote gráfico, abertura e gráficos de jogo ao vivo. Projetei todo o sistema visual e animei cada elemento, dos primeiros boards à entrega final.",
        process:
          "O pacote foi construído em torno de transições com canal alpha, para que um corte da câmera para o gráfico aconteça sem emenda visível. A tipografia carrega o impacto — pesada, rápida, no tempo da torcida — enquanto elementos 3D dão peso à abertura. Tudo o mais fica plano o suficiente para ser lido em um corte de dois segundos durante a transmissão ao vivo.",
        tools: "Cinema 4D, After Effects e Photoshop.",
      },
    },
  },
  {
    slug: "cbf-fairplay",
    client: "CBF",
    title: "Fairplay",
    year: "2022",
    tags: ["broadcast", "character"],
    discipline: {
      en: "Illustration, 2D Motion",
      pt: "Ilustração, Motion 2D",
    },
    caseStudy: {
      en: {
        context:
          "An explainer for CBF's Financial Fair Play program, aimed at clubs: planning, management and financial sustainability, presented as fairness beyond the pitch.",
        role: "Character design, 2D rigging and explainer animation.",
        process:
          "Stylised characters carry the argument. They were rigged for fluid performance so the explanation reads as storytelling instead of a slide deck, and the assets were built modular to be reused across broadcast and social cuts.",
        tools: "Illustrator and After Effects.",
      },
      pt: {
        context:
          "Explicativo do programa Fair Play Financeiro da CBF, voltado aos clubes: planejamento, gestão e sustentabilidade financeira, apresentados como fair play além do gramado.",
        role: "Design de personagens, rigging 2D e animação do explicativo.",
        process:
          "Os personagens estilizados conduzem o argumento. Foram rigados para uma atuação fluida, para que a explicação soe como narrativa e não como slide, e os assets foram construídos de forma modular para reaproveitamento em TV e redes.",
        tools: "Illustrator e After Effects.",
      },
    },
    poster: `${CDN}/f87b9768-47ac-41ff-b19c-33ae8c0d0e17_carw_16x9x1920.png?h=ff869edcd8a26a950499a06fe440ae3b`,
    videoSrc: "/work/cbf-fairplay.mp4",
    featured: false,
    brief: {
      en: "Explainer for CBF's Financial Fair Play program, encouraging clubs to bring planning, management and financial sustainability to the game — fairness beyond the pitch.",
      pt: "Explicativo do programa Fair Play Financeiro da CBF, incentivando os clubes a trazer planejamento, gestão e sustentabilidade financeira para o futebol — fair play além do gramado.",
    },
    breakdown: {
      role: {
        en: "Character Design, 2D Rigging & Explainer Animation",
        pt: "Design de Personagens, Rigging 2D e Animação de Explicativo",
      },
      pipeline: ["Toon Boom Harmony", "After Effects", "Illustrator"],
      highlights: {
        en: [
          "Stylized character design developed for institutional education",
          "Fluid 2D character rigging emphasizing storytelling clarity",
          "Modular assets prepared for broadcast television and social feeds",
        ],
        pt: [
          "Design de personagens estilizados desenvolvido para comunicação institucional",
          "Rigging 2D e animação fluida com foco em clareza didática",
          "Assets modulares prontos para exibição em TV aberta e redes sociais",
        ],
      },
    },
  },
  {
    slug: "shell-craque-da-troca",
    client: "Shell",
    title: "Craque da Troca",
    year: "2024",
    tags: ["broadcast", "motion"],
    discipline: {
      en: "Illustration, Rigging, 2D Character Animation and Motion",
      pt: "Ilustração, Rigging, Animação de Personagens 2D e Motion",
    },
    caseStudy: {
      en: {
        context:
          "A training film for Shell's Craque da Troca loyalty program, explaining to oil-change specialists how points, levels and rewards actually work.",
        role: "Motion graphics, interface simulation and gamified training.",
        process:
          "The explanation leans on screen simulation: real interface behaviour rebuilt in motion so the viewer recognises each step before doing it. Score and tier progression are animated with a game-like cadence to keep a training piece watchable to the end.",
        tools: "After Effects, Illustrator and Premiere Pro.",
      },
      pt: {
        context:
          "Filme de treinamento do programa Craque da Troca, da Shell, explicando a trocadores de óleo como pontos, níveis e prêmios funcionam na prática.",
        role: "Motion graphics, simulação de interface e treinamento gamificado.",
        process:
          "A explicação se apoia na simulação de tela: o comportamento real da interface é reconstruído em movimento para o espectador reconhecer cada etapa antes de executá-la. A pontuação e a progressão de níveis são animadas com cadência de jogo, para manter uma peça de treinamento assistível até o fim.",
        tools: "After Effects, Illustrator e Premiere Pro.",
      },
    },
    poster: `${CDN}/13e5478f-41ab-4a20-a5c4-0bd566cda2d9_carw_16x9x1920.png?h=a9b4b5ac62f7091b0205992801e1a2a5`,
    videoSrc: "/work/shell-craque-da-troca.mp4",
    featured: true,
    brief: {
      en: "Training film for Shell's Craque da Troca loyalty program, walking oil-change specialists through points, levels and rewards.",
      pt: "Filme de treinamento do programa Craque da Troca, da Shell, explicando a trocadores de óleo como acumular pontos, subir de nível e resgatar prêmios.",
    },
    breakdown: {
      role: {
        en: "Motion Graphics, UI Simulation & Gamified Training",
        pt: "Motion Graphics, Simulação de UI e Treinamento Gamificado",
      },
      pipeline: ["After Effects", "Illustrator", "Premiere Pro"],
      highlights: {
        en: [
          "Gamified score and tier progression animations",
          "Dynamic screen simulations explaining loyalty point redemption",
        ],
        pt: [
          "Animação de pontuações e progressão de níveis com estética gamificada",
          "Simulações de tela dinâmicas explicando o resgate de pontos",
        ],
      },
    },
  },
  {
    slug: "motion-design-school-blender-and-after-effects-course",
    client: "Motion Design School",
    title: "Blender & After Effects course",
    year: "2024",
    tags: ["education", "threeD"],
    discipline: {
      en: "3D modeling, 2D Motion and Compositing",
      pt: "Modelagem 3D, Motion 2D e Composição",
    },
    poster: "/work/motion-design-school-blender-1s.jpg",
    videoSrc: "/work/motion-design-school-blender.mp4",
    featured: true,
    brief: {
      en: "Promo for Motion Design School's Blender and After Effects course.",
      pt: "Divulgação do curso de Blender e After Effects da Motion Design School.",
    },
  },
  {
    slug: "amil-dental",
    client: "Amil",
    title: "Dental",
    year: "2020",
    tags: ["brand", "motion"],
    discipline: {
      en: "Illustration, Rigging, 2D Character Animation and Motion",
      pt: "Ilustração, Rigging, Animação de Personagens 2D e Motion",
    },
    caseStudy: {
      en: {
        context:
          "An explainer for Amil Dental covering the partner network, 24-hour emergency care, covered treatments and how to start using the plan.",
        role: "Illustration, character rigging, 2D character animation and motion.",
        process:
          "Health plan rules are dense, so the film breaks them into short beats, each carried by an illustrated character performing the step being explained — network, emergency, coverage, activation. The tone stays light so the information lands without feeling like a contract.",
        tools: "Illustrator and After Effects.",
      },
      pt: {
        context:
          "Explicativo da Amil Dental sobre a rede credenciada, pronto atendimento 24h, tratamentos cobertos e como começar a usar o plano.",
        role: "Ilustração, rigging de personagem, animação 2D e motion.",
        process:
          "As regras de plano de saúde são densas, então o filme as quebra em blocos curtos, cada um conduzido por um personagem ilustrado executando a etapa explicada — rede, emergência, cobertura, ativação. O tom se mantém leve para a informação entrar sem parecer contrato.",
        tools: "Illustrator e After Effects.",
      },
    },
    poster: `${CDN}/d5229b9d-5cee-4738-b40e-b91f06bafac0_carw_16x9x1920.png?h=41f745367d8549d7677cdb4962b81832`,
    videoSrc: "/work/amil-dental.mp4",
    featured: false,
    brief: {
      en: "Explainer for Amil Dental covering the partner network, 24-hour emergency care, covered treatments and how to start using the plan.",
      pt: "Explicativo da Amil Dental sobre a rede credenciada, pronto atendimento 24h, tratamentos cobertos e como começar a usar o plano.",
    },
  },
  {
    slug: "um-club-credit-card",
    client: "Um Club",
    title: "Credit card",
    year: "2022",
    tags: ["product", "threeD"],
    discipline: {
      en: "Illustration, Rigging, 2D Character Animation and Motion",
      pt: "Ilustração, Rigging, Animação de Personagens 2D e Motion",
    },
    poster: `${CDN}/2d304318-b93b-4daf-8502-480b5c806d22_carw_16x9x1920.png?h=b591332fe331eadea7730bdb7385e7dd`,
    videoSrc: "/work/um-club-credit-card.mp4",
    featured: false,
    brief: {
      en: "Product film for the Um Club card: everyday spending control, cash withdrawal, fraud protection and discounts close to home.",
      pt: "Filme de produto do cartão Um Club: controle dos gastos, saque em caixa eletrônico, proteção antifraude e descontos perto de casa.",
    },
  },
  {
    slug: "mds-octopus",
    client: "Motion Design School",
    title: "Octopus",
    year: "2025",
    tags: ["threeD", "character"],
    caseStudy: {
      en: {
        context:
          "A short 3D character piece for Motion Design School: an octopus drummer. The exercise is rigging and performance — eight limbs that have to keep time.",
        role: "Character rigging and complex 3D animation.",
        process:
          "A custom inverse-kinematics rig drives the eight tentacles independently, so each arm can hold its own beat while the others move. The animation is timed against the audio percussion, with the body carrying the weight of each hit.",
        tools: "Blender, with finishing in After Effects.",
      },
      pt: {
        context:
          "Peça curta de personagem 3D para a Motion Design School: um polvo baterista. O exercício é rigging e atuação — oito membros que precisam manter o tempo.",
        role: "Rigging de personagem e animação 3D complexa.",
        process:
          "Um rig customizado com cinemática inversa controla os oito tentáculos de forma independente, para que cada braço sustente sua própria batida enquanto os outros se movem. A animação é sincronizada com a percussão do áudio, e o corpo carrega o peso de cada golpe.",
        tools: "Blender, com finalização no After Effects.",
      },
    },
    poster: "/work/mds-octopus.jpg",
    videoSrc: "/work/mds-octopus.mp4",
    featured: true,
    brief: {
      en: "Short 3D character piece for Motion Design School: an octopus drummer, rigged and animated in Blender.",
      pt: "Peça curta de personagem 3D para a Motion Design School: um polvo baterista, rigado e animado no Blender.",
    },
    breakdown: {
      role: {
        en: "Character Rigging & Complex 3D Animation",
        pt: "Rigging de Personagem e Animação 3D Complexa",
      },
      pipeline: ["Blender", "After Effects"],
      highlights: {
        en: [
          "Custom Inverse Kinematics (IK) rig built for 8 independent tentacles",
          "Fine rhythmic synchronization between drumming motions and audio percussions",
        ],
        pt: [
          "Rig customizado com cinemática inversa (IK) para 8 tentáculos independentes",
          "Sincronização rítmica precisa entre os movimentos do baterista e o áudio",
        ],
      },
    },
  },
  {
    slug: "sbt-supergame",
    client: "Supermarket",
    title: "Super Game SIM ou Não",
    year: "2024",
    tags: ["threeD", "broadcast"],
    poster: "/work/sbt-supergame-4s.jpg",
    videoSrc: "/work/sbt-supergame.mp4",
    featured: true,
    brief: {
      en: "Ident for Super Game SIM ou Não: a 3D rocket, planet and game furniture built in Blender and finished in After Effects.",
      pt: "Vinheta do Super Game SIM ou Não: foguete 3D, planeta e elementos de game modelados no Blender e finalizados no After Effects.",
    },
    breakdown: {
      role: {
        en: "3D Asset Modeling, Texturing & Broadcast Motion",
        pt: "Modelagem de Assets 3D, Texturização e Motion para TV",
      },
      pipeline: ["Blender", "After Effects", "Photoshop"],
      highlights: {
        en: [
          "Stylized retro-futuristic 3D modeling and lighting",
          "Quick visual transitions designed for television station bumpers",
        ],
        pt: [
          "Modelagem e iluminação 3D com linguagem retrô-futurista estilizada",
          "Transições visuais ágeis projetadas para vinhetas de grade televisiva",
        ],
      },
    },
  },
  {
    slug: "reserva-verao-24",
    client: "Reserva",
    title: "Verão 24",
    year: "2024",
    tags: ["brand", "motion"],
    poster: "/work/reserva-verao-24-4s.jpg",
    videoSrc: "/work/reserva-verao-24.mp4",
    featured: true,
    brief: {
      en: "Summer campaign for Reserva, cutting runway and studio footage into a fast collage of textures.",
      pt: "Campanha de verão da Reserva, montando imagens de desfile e estúdio em uma colagem rápida de texturas.",
    },
  },
  {
    slug: "swayone-sabre-s2",
    client: "SwayOne",
    title: "Sabre S2",
    year: "2024",
    tags: ["motion", "brand"],
    poster: "/work/swayone-sabre-s2.jpg",
    videoSrc: "/work/swayone-sabre-s2.mp4",
    featured: false,
    brief: {
      en: "Presentation motion for SwayOne's Sabre S2: market data and research animated into a clean narrative deck.",
      pt: "Motion de apresentação para o Sabre S2, da SwayOne: dados de mercado e pesquisa animados em uma narrativa limpa.",
    },
  },
  {
    slug: "gorila-run",
    client: "Personal Project",
    title: "Gorilla Run",
    year: "2024",
    tags: ["threeD", "character"],
    poster: "/work/gorila-run.jpg",
    videoSrc: "/work/gorila-run.mp4",
    featured: false,
    brief: {
      en: "Character study: a gorilla run cycle animated in 3D, lit against a flat court yellow backdrop.",
      pt: "Estudo de personagem: um ciclo de corrida de gorila animado em 3D, iluminado sobre um fundo amarelo chapado.",
    },
  },
  {
    slug: "vale-tudo-impacto-cabeca",
    client: "Globo",
    title: "Vale Tudo — Impacto Cabeça",
    year: "2022",
    tags: ["broadcast", "motion"],
    poster: "/work/vale-tudo-impacto-cabeca.jpg",
    videoSrc: "/work/vale-tudo-impacto-cabeca.mp4",
    featured: false,
    brief: {
      en: "Vignette for TV Globo's Vale Tudo: comic-book impact, 3D objects and lettering timed to the broadcast.",
      pt: "Vinheta do Vale Tudo, da TV Globo: impacto de quadrinhos, objetos 3D e lettering sincronizados com a transmissão.",
    },
  },
  {
    slug: "japera-logo-animation",
    client: "Japerá",
    title: "Logo animation",
    year: "2022",
    tags: ["brand", "motion"],
    poster: "/work/japera-logo-animation.jpg",
    videoSrc: "/work/japera-logo-animation.mp4",
    featured: false,
    brief: {
      en: "Logo animation for Japerá — the bird mark drawn on and resolved in a single continuous move.",
      pt: "Animação de logo para a Japerá — a marca do pássaro desenhada e resolvida em um único movimento contínuo.",
    },
  },
  {
    slug: "desafio-vibra",
    client: "Vibra",
    title: "Desafio Podium",
    year: "2022",
    tags: ["motion", "education"],
    poster: "/work/desafio-vibra.jpg",
    videoSrc: "/work/desafio-vibra.mp4",
    featured: false,
    brief: {
      en: "Tutorial piece for Vibra's Desafio Podium, mixing screen capture with motion graphics and race footage.",
      pt: "Peça tutorial do Desafio Podium, da Vibra, misturando captura de tela com motion graphics e imagens de corrida.",
    },
  },
  {
    slug: "americas-paciente-internado",
    client: "Américas",
    title: "Paciente internado",
    year: "2022",
    tags: ["education", "motion"],
    poster: "/work/americas-paciente-internado.jpg",
    videoSrc: "/work/americas-paciente-internado.mp4",
    featured: false,
    brief: {
      en: "Explainer for the Américas health network walking through the inpatient journey with illustrated characters.",
      pt: "Explicativo para a rede de saúde Américas percorrendo a jornada do paciente internado com personagens ilustrados.",
    },
  },
  {
    slug: "lmp-7-tracos",
    client: "Aspen Pharma",
    title: "LMP — 7 Traços",
    year: "2020",
    tags: ["brand", "character"],
    poster: "/work/lmp-7-tracos.jpg",
    videoSrc: "/work/lmp-7-tracos.mp4",
    featured: false,
    brief: {
      en: "Aspen Pharma campaign \"Olhar com carinho\", animated in a seven-stroke line style.",
      pt: "Campanha \"Olhar com carinho\", da Aspen Pharma, animada em um estilo de linha em sete traços.",
    },
  },
  {
    slug: "calman-15s",
    client: "CALMAN",
    title: "15s film",
    year: "2020",
    tags: ["brand", "motion"],
    poster: "/work/calman-15s-11s.jpg",
    videoSrc: "/work/calman-15s.mp4",
    featured: false,
    brief: {
      en: "15-second brand film for CALMAN mattresses — soft light, blue palette and calm as the product promise.",
      pt: "Filme de marca de 15 segundos para os colchões CALMAN — luz suave, paleta azul e calma como promessa do produto.",
    },
  },
];

export const heroProject = projects[0];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

export type ClientMark = {
  name: string;
  src: string;
  ratio: number;
  height: number;
  slug?: string;
};

export const clientMarks: ClientMark[] = [
  {
    name: "Globo",
    src: "/clients/monocromaticos/globo.svg",
    ratio: 1,
    height: 45,
    slug: "vale-tudo-impacto-cabeca",
  },
  {
    name: "Premiere",
    src: "/clients/monocromaticos/premiere.svg",
    ratio: 6.309,
    height: 30,
  },
  {
    name: "GeTV",
    src: "/clients/monocromaticos/getv.svg",
    ratio: 1.068,
    height: 48,
  },
  {
    name: "Volkswagen",
    src: "/clients/monocromaticos/volkswagen.svg",
    ratio: 1,
    height: 45,
    slug: "volkswagen-maxi-performance",
  },
  {
    name: "Shell",
    src: "/clients/monocromaticos/shell.svg",
    ratio: 1.081,
    height: 48,
    slug: "shell-craque-da-troca",
  },
  {
    name: "Flamengo",
    src: "/clients/monocromaticos/flamengo.svg",
    ratio: 1.046,
    height: 48,
    slug: "flamengo-libertadores-2019",
  },
  {
    name: "CBF",
    src: "/clients/monocromaticos/cbf.svg",
    ratio: 0.703,
    height: 57,
    slug: "cbf-fairplay",
  },
  {
    name: "Amil",
    src: "/clients/monocromaticos/amil.svg",
    ratio: 2.808,
    height: 39,
    slug: "amil-dental",
  },
  { name: "Itaú", src: "/clients/monocromaticos/itau.svg", ratio: 0.999, height: 42 },
];

export const clients = clientMarks.map((mark) => mark.name);

export type RundownItem = {
  slug: string;
  client: string;
  title: string;
  year: string;
  disciplines: string;
  poster: string;
  videoSrc?: string;
};

export function toRundownItems(
  list: Project[],
  locale: Locale,
): RundownItem[] {
  return list.map((project) => ({
    slug: project.slug,
    client: project.client,
    title: project.title,
    year: project.year,
    poster: project.poster,
    videoSrc: projectPreviewSrc(project.videoSrc),
    disciplines:
      project.discipline?.[locale] ??
      project.tags.map((tag) => tagLabels[tag][locale]).join(", "),
  }));
}

export function projectPreviewSrc(videoSrc?: string) {
  if (!videoSrc) return undefined;
  return videoSrc.replace(/\.mp4$/, "-preview.mp4");
}
