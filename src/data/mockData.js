// Mock Data for Tableaux Décoratifs Admin Dashboard
// Currency: DNT (Tunisian Dinar / د.ت)

export const INITIAL_AD_SPEND = {
  facebook: 1200,
  instagram: 700,
  tiktok: 500,
  google: 0,
  cogsPercentage: 35 // Estimated cost of goods sold %
};

export const TUNISIAN_GOVERNORATES = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Bizerte", 
  "Zaghouan", "Sousse", "Monastir", "Mahdia", "Sfax", "Béja", 
  "Jendouba", "Le Kef", "Siliana", "Kairouan", "Kasserine", 
  "Sidi Bouzid", "Gabès", "Médenine", "Tataouine", "Gafsa", 
  "Tozeur", "Kébili"
];

export const CATEGORIES_TREE = [
  {
    id: "cat-1",
    name: "Nos Tableaux",
    nameEn: "Our Artworks",
    slug: "nos-tableaux",
    icon: "Frame",
    subcategories: [
      { id: "sub-1-1", name: "Music", slug: "music" },
      { id: "sub-1-2", name: "Films & Séries", slug: "films-series" },
      { id: "sub-1-3", name: "Automobile", slug: "automobile" },
      { id: "sub-1-4", name: "Art & Design", slug: "art-design" },
      { id: "sub-1-5", name: "Motivation", slug: "motivation" },
      { 
        id: "sub-1-6", 
        name: "Sports", 
        slug: "sports",
        nestedSports: ["Football", "Basketball", "MMA", "Boxing", "Motorsport"]
      }
    ]
  },
  {
    id: "cat-2",
    name: "Packs (Pack en 3)",
    nameEn: "Triptych & Bundles",
    slug: "packs",
    icon: "Grid",
    subcategories: [
      { id: "sub-2-1", name: "Pack en 3", slug: "pack-en-3" },
      { id: "sub-2-2", name: "Gallerie Murale", slug: "gallerie-murale" },
      { id: "sub-2-3", name: "Duo Harmonieux", slug: "duo-harmonieux" }
    ]
  },
  {
    id: "cat-3",
    name: "Best Sellers",
    nameEn: "Best Sellers",
    slug: "best-sellers",
    icon: "Sparkles",
    subcategories: [
      { id: "sub-3-1", name: "Top Tendances", slug: "top-tendances" },
      { id: "sub-3-2", name: "Édition Limitée", slug: "edition-limitee" },
      { id: "sub-3-3", name: "Coups de Cœur", slug: "coups-de-coeur" }
    ]
  }
];

export const SAMPLE_DEMO_PRODUCTS = [
  {
    id: "PRD-101",
    title: "Tableau Premium Lionel Messi World Cup Gold Edition",
    description: "Impression numérique haute définition sur toile canvas tendue sur châssis bois noble. Finition vernis brillant protecteur anti-UV disponible en cadre aluminium noir mat brossé ou panneau simple flottant.",
    category: "Nos Tableaux",
    subcategory: "Sports",
    nestedSport: "Football",
    discipline: "Football",
    status: "Active",
    basePrice: 55,
    pricingMatrixCadre: { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 },
    pricingMatrixSimple: { A4: 35, A3: 55, A2: 85, A1: 130, A0: 190 },
    pricingMatrix: { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&h=1600&q=85",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&h=1600&q=85",
      "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-paint-brush-dipping-in-paint-41559-large.mp4",
    stock: 42,
    salesCount: 128
  },
  {
    id: "PRD-102",
    title: "Pack en 3 Panneaux Abstraits Gold & Marble Luxury",
    description: "Triptyque d'exception en verre acrylique ultra-brillant avec reflets dorés et marbre royal noir. Harmonie parfaite pour salon ou suite présidentielle.",
    category: "Packs (Pack en 3)",
    subcategory: "Pack en 3",
    nestedSport: null,
    discipline: null,
    status: "Active",
    basePrice: 145,
    pricingMatrixCadre: { A4: 130, A3: 195, A2: 280, A1: 410, A0: 590 },
    pricingMatrixSimple: { A4: 95, A3: 145, A2: 210, A1: 310, A0: 460 },
    pricingMatrix: { A4: 130, A3: 195, A2: 280, A1: 410, A0: 590 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&h=1600&q=85",
      "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 18,
    salesCount: 89
  },
  {
    id: "PRD-103",
    title: "Tableau Porsche 911 GT3 RS Neon Cyberpunk",
    description: "Affiche automobile iconique réinventée sous éclairage néon cyan & magenta. Impression thermique résistante aux UV avec finitions mates ou brillantes.",
    category: "Nos Tableaux",
    subcategory: "Automobile",
    nestedSport: null,
    discipline: null,
    status: "Active",
    basePrice: 60,
    pricingMatrixCadre: { A4: 55, A3: 85, A2: 125, A1: 185, A0: 270 },
    pricingMatrixSimple: { A4: 40, A3: 60, A2: 95, A1: 145, A0: 215 },
    pricingMatrix: { A4: 55, A3: 85, A2: 125, A1: 185, A0: 270 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&h=1600&q=85",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 25,
    salesCount: 94
  },
  {
    id: "PRD-104",
    title: "Tableau Michael Jordan 'The Last Dance' Legend",
    description: "Édition hommage au numéro 23 des Chicago Bulls. Rendu spectaculaire sur toile fine avec texture grainée et relief visuel saisissant.",
    category: "Nos Tableaux",
    subcategory: "Sports",
    nestedSport: "Basketball",
    discipline: "Basketball",
    status: "Active",
    basePrice: 65,
    pricingMatrixCadre: { A4: 60, A3: 90, A2: 135, A1: 195, A0: 290 },
    pricingMatrixSimple: { A4: 45, A3: 65, A2: 100, A1: 150, A0: 225 },
    pricingMatrix: { A4: 60, A3: 90, A2: 135, A1: 195, A0: 290 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 19,
    salesCount: 77
  },
  {
    id: "PRD-105",
    title: "Tableau Motivation 'Mindset is Everything' Or & Noir",
    description: "Typographie élégante en dorure à chaud avec contrastes intenses sur noir profond. Conçu pour inspirer leaders, créateurs et entrepreneurs.",
    category: "Nos Tableaux",
    subcategory: "Motivation",
    nestedSport: null,
    discipline: null,
    status: "Active",
    basePrice: 48,
    pricingMatrixCadre: { A4: 45, A3: 65, A2: 95, A1: 145, A0: 220 },
    pricingMatrixSimple: { A4: 32, A3: 48, A2: 75, A1: 115, A0: 175 },
    pricingMatrix: { A4: 45, A3: 65, A2: 95, A1: 145, A0: 220 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 50,
    salesCount: 156
  },
  {
    id: "PRD-106",
    title: "Tableau Pop Art Hip-Hop Tupac Shakur & Biggie",
    description: "Portrait iconique rap US remixé en street-art vibrant. Pigments ultra-résistants et verre acrylique antireflet.",
    category: "Nos Tableaux",
    subcategory: "Music",
    nestedSport: null,
    discipline: null,
    status: "Active",
    basePrice: 50,
    pricingMatrixCadre: { A4: 45, A3: 70, A2: 105, A1: 155, A0: 230 },
    pricingMatrixSimple: { A4: 35, A3: 50, A2: 80, A1: 120, A0: 180 },
    pricingMatrix: { A4: 45, A3: 70, A2: 105, A1: 155, A0: 230 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 31,
    salesCount: 112
  },
  {
    id: "PRD-107",
    title: "Pack en 3 Panneaux Nature & Golden Tropical Leaves",
    description: "Set triptyque de feuilles exotiques scandinaves ornées de dorures fines. Ambiance chaleureuse et apaisante pour intérieurs contemporains.",
    category: "Packs (Pack en 3)",
    subcategory: "Pack en 3",
    nestedSport: null,
    discipline: null,
    status: "Active",
    basePrice: 135,
    pricingMatrixCadre: { A4: 120, A3: 180, A2: 260, A1: 390, A0: 560 },
    pricingMatrixSimple: { A4: 90, A3: 135, A2: 195, A1: 295, A0: 440 },
    pricingMatrix: { A4: 120, A3: 180, A2: 260, A1: 390, A0: 560 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 22,
    salesCount: 78
  },
  {
    id: "PRD-108",
    title: "Tableau Film Cult 'Scarface The World Is Yours' Noir & Or",
    description: "Chef d'œuvre cinématographique imprimé en haute définition avec passe-partout blanc cassé et moulure noir mat texturée.",
    category: "Nos Tableaux",
    subcategory: "Films & Séries",
    nestedSport: null,
    discipline: null,
    status: "Active",
    basePrice: 55,
    pricingMatrixCadre: { A4: 50, A3: 75, A2: 110, A1: 165, A0: 245 },
    pricingMatrixSimple: { A4: 38, A3: 55, A2: 85, A1: 130, A0: 195 },
    pricingMatrix: { A4: 50, A3: 75, A2: 110, A1: 165, A0: 245 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 14,
    salesCount: 88
  },
  {
    id: "PRD-109",
    title: "Tableau MMA Khabib Nurmagomedov 29-0 Champion",
    description: "Édition collector UFC célébrant le règne invaincu du champion. Textures carbone et calligraphie dorée haute précision.",
    category: "Nos Tableaux",
    subcategory: "Sports",
    nestedSport: "MMA",
    discipline: "MMA",
    status: "Active",
    basePrice: 50,
    pricingMatrixCadre: { A4: 45, A3: 70, A2: 105, A1: 155, A0: 230 },
    pricingMatrixSimple: { A4: 35, A3: 50, A2: 80, A1: 120, A0: 180 },
    pricingMatrix: { A4: 45, A3: 70, A2: 105, A1: 155, A0: 230 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 20,
    salesCount: 63
  },
  {
    id: "PRD-110",
    title: "Tableau Muhammad Ali 'Impossible Is Nothing' Vintage",
    description: "L'icône absolue de la boxe mondiale immortalisée en noir et blanc argentique avec citation légendaire en lettres dorées.",
    category: "Nos Tableaux",
    subcategory: "Sports",
    nestedSport: "Boxing",
    discipline: "Boxing",
    status: "Active",
    basePrice: 65,
    pricingMatrixCadre: { A4: 65, A3: 95, A2: 140, A1: 205, A0: 310 },
    pricingMatrixSimple: { A4: 45, A3: 65, A2: 100, A1: 155, A0: 235 },
    pricingMatrix: { A4: 65, A3: 95, A2: 140, A1: 205, A0: 310 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 16,
    salesCount: 54
  },
  {
    id: "PRD-111",
    title: "Tableau Cristiano Ronaldo 'SIUUU' Real Madrid Era",
    description: "Hommage au quintuple Ballon d'Or avec détails dorés scintillants et dynamisme athlétique exceptionnel.",
    category: "Best Sellers",
    subcategory: "Sports",
    nestedSport: "Football",
    discipline: "Football",
    status: "Active",
    basePrice: 55,
    pricingMatrixCadre: { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 },
    pricingMatrixSimple: { A4: 35, A3: 55, A2: 85, A1: 130, A0: 190 },
    pricingMatrix: { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 38,
    salesCount: 145
  },
  {
    id: "PRD-112",
    title: "Tableau Art Abstrait Geometric Gold Lines & Deep Navy",
    description: "Élégance minimale associant bleu nuit profond, or métallique et textures géométriques d'inspiration Bauhaus.",
    category: "Nos Tableaux",
    subcategory: "Art & Design",
    nestedSport: null,
    discipline: null,
    status: "Active",
    basePrice: 50,
    pricingMatrixCadre: { A4: 45, A3: 70, A2: 105, A1: 155, A0: 230 },
    pricingMatrixSimple: { A4: 32, A3: 50, A2: 78, A1: 118, A0: 178 },
    pricingMatrix: { A4: 45, A3: 70, A2: 105, A1: 155, A0: 230 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 29,
    salesCount: 92
  },
  {
    id: "PRD-113",
    title: "Tableau Formule 1 Ayrton Senna Monaco Grand Prix",
    description: "Tirage d'art hommage au roi de Monaco au volant de la mythique McLaren rouge et blanche sous la pluie.",
    category: "Nos Tableaux",
    subcategory: "Sports",
    nestedSport: "Motorsport",
    discipline: "Motorsport",
    status: "Active",
    basePrice: 60,
    pricingMatrixCadre: { A4: 55, A3: 85, A2: 125, A1: 185, A0: 275 },
    pricingMatrixSimple: { A4: 40, A3: 60, A2: 95, A1: 145, A0: 215 },
    pricingMatrix: { A4: 55, A3: 85, A2: 125, A1: 185, A0: 275 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 17,
    salesCount: 71
  },
  {
    id: "PRD-114",
    title: "Pack en 3 Panneaux Modern Skyline & Architecture",
    description: "Triptyque urbain haut de gamme présentant les plus beaux skylines new-yorkais et tokyoïtes à la tombée de la nuit.",
    category: "Packs (Pack en 3)",
    subcategory: "Pack en 3",
    nestedSport: null,
    discipline: null,
    status: "Active",
    basePrice: 150,
    pricingMatrixCadre: { A4: 140, A3: 210, A2: 300, A1: 440, A0: 640 },
    pricingMatrixSimple: { A4: 100, A3: 150, A2: 220, A1: 330, A0: 480 },
    pricingMatrix: { A4: 140, A3: 210, A2: 300, A1: 440, A0: 640 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 15,
    salesCount: 38
  },
  {
    id: "PRD-115",
    title: "Tableau Daft Punk 'Random Access Memories' Gold & Chrome",
    description: "Hommage au duo casqué légendaire de la French Touch. Finition métallisée avec reflets argentés et dorés.",
    category: "Best Sellers",
    subcategory: "Music",
    nestedSport: null,
    discipline: null,
    status: "Active",
    basePrice: 52,
    pricingMatrixCadre: { A4: 48, A3: 72, A2: 108, A1: 160, A0: 235 },
    pricingMatrixSimple: { A4: 34, A3: 52, A2: 82, A1: 124, A0: 184 },
    pricingMatrix: { A4: 48, A3: 72, A2: 108, A1: 160, A0: 235 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 24,
    salesCount: 103
  },
  {
    id: "PRD-116",
    title: "Tableau Peaky Blinders 'Thomas Shelby' Birmingham 1919",
    description: "Portrait ténébreux de Thomas Shelby cigarette aux lèvres. Ambiance industrielle brumeuse et noirceur cinématographique vintage.",
    category: "Nos Tableaux",
    subcategory: "Films & Séries",
    nestedSport: null,
    discipline: null,
    status: "Active",
    basePrice: 55,
    pricingMatrixCadre: { A4: 50, A3: 75, A2: 110, A1: 165, A0: 245 },
    pricingMatrixSimple: { A4: 38, A3: 55, A2: 85, A1: 130, A0: 195 },
    pricingMatrix: { A4: 50, A3: 75, A2: 110, A1: 165, A0: 245 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 28,
    salesCount: 89
  },
  {
    id: "PRD-117",
    title: "Tableau Ferrari F40 Vintage Rosso Corsa Racing",
    description: "L'icône absolue des supercars des années 80. Lignes acérées de Maranello immortalisées en qualité musée.",
    category: "Best Sellers",
    subcategory: "Automobile",
    nestedSport: null,
    discipline: null,
    status: "Active",
    basePrice: 62,
    pricingMatrixCadre: { A4: 55, A3: 85, A2: 125, A1: 185, A0: 275 },
    pricingMatrixSimple: { A4: 42, A3: 62, A2: 98, A1: 148, A0: 220 },
    pricingMatrix: { A4: 55, A3: 85, A2: 125, A1: 185, A0: 275 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 20,
    salesCount: 114
  },
  {
    id: "PRD-118",
    title: "Tableau Minimaliste 'The Thinker' Sculpture Rodin Gold",
    description: "Revisite dorée et contemporaine de la célèbre statue du Penseur. Idéal pour bibliothèques et cabinets feutrés.",
    category: "Nos Tableaux",
    subcategory: "Art & Design",
    nestedSport: null,
    discipline: null,
    status: "Draft",
    basePrice: 48,
    pricingMatrixCadre: { A4: 45, A3: 65, A2: 95, A1: 145, A0: 215 },
    pricingMatrixSimple: { A4: 32, A3: 48, A2: 75, A1: 115, A0: 170 },
    pricingMatrix: { A4: 45, A3: 65, A2: 95, A1: 145, A0: 215 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 12,
    salesCount: 16
  },
  {
    id: "PRD-119",
    title: "Tableau Mike Tyson 'Baddest Man on the Planet' KO",
    description: "L'énergie féroce d'Iron Mike dans le ring au sommet de sa gloire. Graphisme percutant à haut contraste noir & or.",
    category: "Nos Tableaux",
    subcategory: "Sports",
    nestedSport: "Boxing",
    discipline: "Boxing",
    status: "Active",
    basePrice: 55,
    pricingMatrixCadre: { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 },
    pricingMatrixSimple: { A4: 38, A3: 55, A2: 85, A1: 130, A0: 190 },
    pricingMatrix: { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 22,
    salesCount: 65
  },
  {
    id: "PRD-120",
    title: "Tableau Kobe Bryant 'Mamba Mentality' Purple & Gold",
    description: "Célébration du Black Mamba et de son éthique de travail légendaire. Nuances violettes et dorées avec typographie inspirante.",
    category: "Best Sellers",
    subcategory: "Sports",
    nestedSport: "Basketball",
    discipline: "Basketball",
    status: "Active",
    basePrice: 58,
    pricingMatrixCadre: { A4: 55, A3: 80, A2: 120, A1: 175, A0: 260 },
    pricingMatrixSimple: { A4: 40, A3: 58, A2: 90, A1: 140, A0: 205 },
    pricingMatrix: { A4: 55, A3: 80, A2: 120, A1: 175, A0: 260 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 35,
    salesCount: 139
  },
  {
    id: "PRD-121",
    title: "Pack en 3 Panneaux Black & Gold Japanese Wave Triptych",
    description: "La Grande Vague de Kanagawa réinterprétée dans un style luxe noir ébène et filigranes d'or 24 carats.",
    category: "Packs (Pack en 3)",
    subcategory: "Pack en 3",
    nestedSport: null,
    discipline: null,
    status: "Active",
    basePrice: 155,
    pricingMatrixCadre: { A4: 145, A3: 215, A2: 310, A1: 450, A0: 660 },
    pricingMatrixSimple: { A4: 105, A3: 155, A2: 230, A1: 340, A0: 500 },
    pricingMatrix: { A4: 145, A3: 215, A2: 310, A1: 450, A0: 660 },
    imagesCadre: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    imagesPanneau: [
      "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    images: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&h=1600&q=85"
    ],
    videoUrl: "",
    stock: 14,
    salesCount: 52
  }
];

export const INITIAL_PRODUCTS = SAMPLE_DEMO_PRODUCTS;

export const SAMPLE_DEMO_ORDERS = [
  {
    id: "CMD-2026-9001",
    customerName: "Mohamed Ben Ammar",
    phone: "+216 98 421 809",
    address: "14 Rue du Lac Huron, Les Berges du Lac 1",
    governorate: "Tunis",
    postalCode: "1053",
    status: "Pending",
    paymentMethod: "Cash on Delivery",
    isPaid: false,
    shippingFee: 7,
    createdAt: "2026-10-01T11:30:00Z",
    items: [
      {
        productId: "PRD-101",
        title: "Tableau Premium Lionel Messi World Cup Gold Edition",
        category: "Nos Tableaux",
        finish: "Avec Cadre",
        selected_type: "Avec Cadre",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 75,
        quantity: 2,
        subtotal: 150,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80"
      },
      {
        productId: "PRD-105",
        title: "Tableau Motivation 'Mindset is Everything' Or & Noir",
        category: "Nos Tableaux",
        finish: "Panneau Simple",
        selected_type: "Panneau Simple",
        dimension: "A2",
        dimensionDetails: "42 x 60 cm",
        unitPrice: 75,
        quantity: 1,
        subtotal: 75,
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 232, // 150 + 75 + 7
    totalPanels: 3,
    customAssetUrl: null,
    notes: "Appeler avant la livraison SVP."
  },
  {
    id: "CMD-2026-9002",
    customerName: "Syrine Trabelsi",
    phone: "+216 22 890 145",
    address: "Avenue Hedi Nouira, Ennasr 2",
    governorate: "Ariana",
    postalCode: "2037",
    status: "Confirmed",
    paymentMethod: "Cash on Delivery",
    isPaid: false,
    shippingFee: 7,
    createdAt: "2026-10-01T09:15:00Z",
    items: [
      {
        productId: "PRD-102",
        title: "Pack en 3 Panneaux Abstraits Gold & Marble Luxury",
        category: "Packs (Pack en 3)",
        finish: "Avec Cadre",
        selected_type: "Avec Cadre",
        dimension: "A3",
        dimensionDetails: "3x (30 x 42 cm)",
        unitPrice: 195,
        quantity: 1,
        subtotal: 195,
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 202,
    totalPanels: 3,
    customAssetUrl: null,
    notes: "Livraison de préférence le matin."
  },
  {
    id: "CMD-2026-9003",
    customerName: "Youssef Gharbi",
    phone: "+216 55 124 990",
    address: "Route de Teniour Km 3.5, Sfax",
    governorate: "Sfax",
    postalCode: "3000",
    status: "In Production",
    paymentMethod: "Paiement en ligne (Carte Bancaire)",
    isPaid: true,
    shippingFee: 7,
    createdAt: "2026-09-30T18:40:00Z",
    items: [
      {
        productId: "PRD-CUSTOM-01",
        title: "Tableau Custom Studio Portrait Personnalisé Haute Définition",
        category: "Personnalisé",
        finish: "Avec Cadre",
        selected_type: "Avec Cadre",
        dimension: "A1",
        dimensionDetails: "60 x 84 cm",
        unitPrice: 175,
        quantity: 1,
        subtotal: 175,
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
        assetUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80",
        assetFileName: "Portrait_Famille_Gharbi_HighRes_300dpi.png"
      }
    ],
    totalAmount: 182,
    totalPanels: 1,
    customAssetUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80",
    notes: "Fichier source 300 DPI fourni par le client. Vérifier la fidélité des couleurs."
  },
  {
    id: "CMD-2026-9004",
    customerName: "Olfa Karray",
    phone: "+216 97 654 321",
    address: "Boulevard 14 Janvier, Kantaoui",
    governorate: "Sousse",
    postalCode: "4089",
    status: "Shipped",
    paymentMethod: "Cash on Delivery",
    isPaid: false,
    shippingFee: 7,
    createdAt: "2026-09-30T14:20:00Z",
    items: [
      {
        productId: "PRD-103",
        title: "Tableau Porsche 911 GT3 RS Neon Cyberpunk",
        category: "Nos Tableaux",
        finish: "Avec Cadre",
        selected_type: "Avec Cadre",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 85,
        quantity: 1,
        subtotal: 85,
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80"
      },
      {
        productId: "PRD-113",
        title: "Tableau Formule 1 Ayrton Senna Monaco Grand Prix",
        category: "Nos Tableaux",
        finish: "Panneau Simple",
        selected_type: "Panneau Simple",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 60,
        quantity: 1,
        subtotal: 60,
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 152,
    totalPanels: 2,
    customAssetUrl: null,
    notes: ""
  },
  {
    id: "CMD-2026-9005",
    customerName: "Karem Jaziri",
    phone: "+216 20 445 778",
    address: "Résidence Hammamet Sud Block B",
    governorate: "Nabeul",
    postalCode: "8050",
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    isPaid: true,
    shippingFee: 7,
    createdAt: "2026-09-29T16:10:00Z",
    items: [
      {
        productId: "PRD-104",
        title: "Tableau Michael Jordan 'The Last Dance' Legend",
        category: "Nos Tableaux",
        finish: "Panneau Simple",
        selected_type: "Panneau Simple",
        dimension: "A2",
        dimensionDetails: "42 x 60 cm",
        unitPrice: 100,
        quantity: 1,
        subtotal: 100,
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 107,
    totalPanels: 1,
    customAssetUrl: null,
    notes: "Livré avec succès."
  },
  {
    id: "CMD-2026-9006",
    customerName: "Aymen Bouazizi",
    phone: "+216 52 334 112",
    address: "Cité El Corniche, Bizerte",
    governorate: "Bizerte",
    postalCode: "7000",
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    isPaid: true,
    shippingFee: 7,
    createdAt: "2026-09-28T10:05:00Z",
    items: [
      {
        productId: "PRD-106",
        title: "Tableau Pop Art Hip-Hop Tupac Shakur & Biggie",
        category: "Nos Tableaux",
        finish: "Avec Cadre",
        selected_type: "Avec Cadre",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 70,
        quantity: 2,
        subtotal: 140,
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 147,
    totalPanels: 2,
    customAssetUrl: null,
    notes: ""
  },
  {
    id: "CMD-2026-9007",
    customerName: "Amira Chaabane",
    phone: "+216 93 887 665",
    address: "Avenue Habib Bourguiba, Monastir",
    governorate: "Monastir",
    postalCode: "5000",
    status: "Cancelled",
    paymentMethod: "Cash on Delivery",
    isPaid: false,
    shippingFee: 7,
    createdAt: "2026-09-28T08:45:00Z",
    items: [
      {
        productId: "PRD-107",
        title: "Pack en 3 Panneaux Nature & Golden Tropical Leaves",
        category: "Packs (Pack en 3)",
        finish: "Panneau Simple",
        selected_type: "Panneau Simple",
        dimension: "A3",
        dimensionDetails: "3x (30 x 42 cm)",
        unitPrice: 135,
        quantity: 1,
        subtotal: 135,
        image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 142,
    totalPanels: 3,
    customAssetUrl: null,
    notes: "Annulation par le client - Changement d'avis."
  },
  {
    id: "CMD-2026-9008",
    customerName: "Tarek Mansour",
    phone: "+216 29 111 222",
    address: "Route de Mahdia Km 1, Mahdia",
    governorate: "Mahdia",
    postalCode: "5100",
    status: "Pending",
    paymentMethod: "Cash on Delivery",
    isPaid: false,
    shippingFee: 7,
    createdAt: "2026-10-01T12:05:00Z",
    items: [
      {
        productId: "PRD-108",
        title: "Tableau Film Cult 'Scarface The World Is Yours' Noir & Or",
        category: "Nos Tableaux",
        finish: "Avec Cadre",
        selected_type: "Avec Cadre",
        dimension: "A2",
        dimensionDetails: "42 x 60 cm",
        unitPrice: 110,
        quantity: 1,
        subtotal: 110,
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 117,
    totalPanels: 1,
    customAssetUrl: null,
    notes: "Confirmer la disponibilité du cadre noir brossé."
  },
  {
    id: "CMD-2026-9009",
    customerName: "Fatma Sellami",
    phone: "+216 95 333 444",
    address: "Cité Mansoura, Kairouan",
    governorate: "Kairouan",
    postalCode: "3100",
    status: "Confirmed",
    paymentMethod: "Paiement en ligne (Carte Bancaire)",
    isPaid: true,
    shippingFee: 7,
    createdAt: "2026-09-30T21:15:00Z",
    items: [
      {
        productId: "PRD-112",
        title: "Tableau Art Abstrait Geometric Gold Lines & Deep Navy",
        category: "Nos Tableaux",
        finish: "Avec Cadre",
        selected_type: "Avec Cadre",
        dimension: "A1",
        dimensionDetails: "60 x 84 cm",
        unitPrice: 155,
        quantity: 1,
        subtotal: 155,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 162,
    totalPanels: 1,
    customAssetUrl: null,
    notes: ""
  },
  {
    id: "CMD-2026-9010",
    customerName: "Hamza Dridi",
    phone: "+216 23 777 888",
    address: "Zone Touristique, Djerba Midoun",
    governorate: "Médenine",
    postalCode: "4116",
    status: "In Production",
    paymentMethod: "Cash on Delivery",
    isPaid: false,
    shippingFee: 7,
    createdAt: "2026-09-30T16:50:00Z",
    items: [
      {
        productId: "PRD-109",
        title: "Tableau MMA Khabib Nurmagomedov 29-0 Champion",
        category: "Nos Tableaux",
        finish: "Panneau Simple",
        selected_type: "Panneau Simple",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 50,
        quantity: 1,
        subtotal: 50,
        image: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=400&q=80"
      },
      {
        productId: "PRD-110",
        title: "Tableau Muhammad Ali 'Impossible Is Nothing' Vintage",
        category: "Nos Tableaux",
        finish: "Avec Cadre",
        selected_type: "Avec Cadre",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 95,
        quantity: 1,
        subtotal: 95,
        image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 152,
    totalPanels: 2,
    customAssetUrl: null,
    notes: "Expédition express Djerba via transporteur."
  },
  {
    id: "CMD-2026-9011",
    customerName: "Nadia Belhaj",
    phone: "+216 99 221 009",
    address: "Rue Habib Thameur, Béja",
    governorate: "Béja",
    postalCode: "9000",
    status: "Shipped",
    paymentMethod: "Cash on Delivery",
    isPaid: false,
    shippingFee: 7,
    createdAt: "2026-09-29T11:40:00Z",
    items: [
      {
        productId: "PRD-111",
        title: "Tableau Cristiano Ronaldo 'SIUUU' Real Madrid Era",
        category: "Best Sellers",
        finish: "Avec Cadre",
        selected_type: "Avec Cadre",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 75,
        quantity: 1,
        subtotal: 75,
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 82,
    totalPanels: 1,
    customAssetUrl: null,
    notes: ""
  },
  {
    id: "CMD-2026-9012",
    customerName: "Riadh Mahmoudi",
    phone: "+216 50 665 443",
    address: "Avenue de l'Indépendance, Gabès",
    governorate: "Gabès",
    postalCode: "6000",
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    isPaid: true,
    shippingFee: 7,
    createdAt: "2026-09-27T15:20:00Z",
    items: [
      {
        productId: "PRD-101",
        title: "Tableau Premium Lionel Messi World Cup Gold Edition",
        category: "Nos Tableaux",
        finish: "Avec Cadre",
        selected_type: "Avec Cadre",
        dimension: "A0",
        dimensionDetails: "84 x 118 cm (Grand Format)",
        unitPrice: 240,
        quantity: 1,
        subtotal: 240,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 247,
    totalPanels: 1,
    customAssetUrl: null,
    notes: "Grand format A0 renforcé avec suspension lourde."
  },
  {
    id: "CMD-2026-9013",
    customerName: "Ines Ghorbel",
    phone: "+216 94 001 992",
    address: "Cité les Palmeraies, Tozeur",
    governorate: "Tozeur",
    postalCode: "2200",
    status: "Pending",
    paymentMethod: "Paiement en ligne (Carte Bancaire)",
    isPaid: true,
    shippingFee: 7,
    createdAt: "2026-10-01T13:00:00Z",
    items: [
      {
        productId: "PRD-CUSTOM-02",
        title: "Tableau Sur Mesure Tozeur Desert Golden Hour",
        category: "Personnalisé",
        finish: "Panneau Simple",
        selected_type: "Panneau Simple",
        dimension: "A2",
        dimensionDetails: "42 x 60 cm",
        unitPrice: 90,
        quantity: 2,
        subtotal: 180,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
        assetUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=80",
        assetFileName: "Photo_Souvenir_Tozeur_Custom_300dpi.jpg"
      }
    ],
    totalAmount: 187,
    totalPanels: 2,
    customAssetUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=80",
    notes: "2 Panneaux simples identiques pour hôtel de charme."
  },
  {
    id: "CMD-2026-9014",
    customerName: "Bilel Ben Salah",
    phone: "+216 28 554 332",
    address: "Route de Tunis, Zaghouan",
    governorate: "Zaghouan",
    postalCode: "1100",
    status: "Confirmed",
    paymentMethod: "Cash on Delivery",
    isPaid: false,
    shippingFee: 7,
    createdAt: "2026-10-01T07:50:00Z",
    items: [
      {
        productId: "PRD-105",
        title: "Tableau Motivation 'Mindset is Everything' Or & Noir",
        category: "Nos Tableaux",
        finish: "Avec Cadre",
        selected_type: "Avec Cadre",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 65,
        quantity: 3,
        subtotal: 195,
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 202,
    totalPanels: 3,
    customAssetUrl: null,
    notes: "Commande pour aménagement d'un espace coworking."
  },
  {
    id: "CMD-2026-9015",
    customerName: "Sonia Rebai",
    phone: "+216 92 114 667",
    address: "Avenue de l'Environnement, Jendouba",
    governorate: "Jendouba",
    postalCode: "8100",
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    isPaid: true,
    shippingFee: 7,
    createdAt: "2026-09-26T14:30:00Z",
    items: [
      {
        productId: "PRD-102",
        title: "Pack en 3 Panneaux Abstraits Gold & Marble Luxury",
        category: "Packs (Pack en 3)",
        finish: "Panneau Simple",
        selected_type: "Panneau Simple",
        dimension: "A2",
        dimensionDetails: "3x (42 x 60 cm)",
        unitPrice: 210,
        quantity: 1,
        subtotal: 210,
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 217,
    totalPanels: 3,
    customAssetUrl: null,
    notes: "Très satisfaite de la finition acrylique."
  },
  {
    id: "CMD-2026-9016",
    customerName: "Anis Marzouki",
    phone: "+216 26 880 911",
    address: "Rue de la République, Ben Arous",
    governorate: "Ben Arous",
    postalCode: "2013",
    status: "Pending",
    paymentMethod: "Cash on Delivery",
    isPaid: false,
    shippingFee: 7,
    createdAt: "2026-10-02T10:15:00Z",
    items: [
      {
        productId: "PRD-120",
        title: "Tableau Kobe Bryant 'Mamba Mentality' Purple & Gold",
        category: "Best Sellers",
        finish: "Avec Cadre",
        selected_type: "Avec Cadre",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 80,
        quantity: 1,
        subtotal: 80,
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80"
      },
      {
        productId: "PRD-115",
        title: "Tableau Daft Punk 'Random Access Memories' Gold & Chrome",
        category: "Best Sellers",
        finish: "Avec Cadre",
        selected_type: "Avec Cadre",
        dimension: "A4",
        dimensionDetails: "21 x 29.7 cm",
        unitPrice: 48,
        quantity: 1,
        subtotal: 48,
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80"
      }
    ],
    totalAmount: 135,
    totalPanels: 2,
    customAssetUrl: null,
    notes: "Emballage cadeau soigné si possible."
  }
];

export const INITIAL_ORDERS = SAMPLE_DEMO_ORDERS;

export const REVENUE_TIMESERIES_DATA = {
  Jour: [
    { period: "08:00", revenue: 140, orders: 1, panels: 1 },
    { period: "10:00", revenue: 280, orders: 2, panels: 3 },
    { period: "12:00", revenue: 420, orders: 3, panels: 4 },
    { period: "14:00", revenue: 310, orders: 2, panels: 2 },
    { period: "16:00", revenue: 580, orders: 3, panels: 5 },
    { period: "18:00", revenue: 640, orders: 4, panels: 6 },
    { period: "20:00", revenue: 490, orders: 3, panels: 4 },
    { period: "22:00", revenue: 210, orders: 1, panels: 2 }
  ],
  Semaine: [
    { period: "Lun", revenue: 420, orders: 3, panels: 4 },
    { period: "Mar", revenue: 580, orders: 4, panels: 5 },
    { period: "Mer", revenue: 390, orders: 2, panels: 3 },
    { period: "Jeu", revenue: 710, orders: 5, panels: 7 },
    { period: "Ven", revenue: 890, orders: 6, panels: 9 },
    { period: "Sam", revenue: 1120, orders: 8, panels: 11 },
    { period: "Dim", revenue: 950, orders: 7, panels: 10 }
  ],
  Mois: [
    { period: "Sem 1", revenue: 2450, orders: 18, panels: 26 },
    { period: "Sem 2", revenue: 3120, orders: 22, panels: 31 },
    { period: "Sem 3", revenue: 3890, orders: 27, panels: 40 },
    { period: "Sem 4", revenue: 4620, orders: 32, panels: 48 }
  ]
};

export const INITIAL_CMS_CONFIG = {
  heroMode: "video", // 'video' | 'carousel'
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-art-gallery-exhibition-41562-large.mp4",
  carouselImages: [
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80"
  ],
  headline: "L'Élégance des Tableaux & Panneaux Décoratifs",
  headlineEn: "Elegance in Decorative Panels & Framed Art",
  subtitle: "Collection exclusive faite à la main en Tunisie. Impression ultra-HD sur châssis bois noble & verre acrylique.",
  subtitleEn: "Exclusive handcrafted collection in Tunisia. Ultra-HD print on noble wooden frames & acrylic glass.",
  ctaText: "Découvrir la Galerie",
  ctaTargetUrl: "/catalog",
  badgeText: "NOUVELLE COLLECTION 2026",
  announcementText: "✨ Livraison offerte sur toute la Tunisie à partir de 150 DNT d'achat! 🇹🇳",
  announcementActive: true
};

export const INITIAL_VENDOR_PAYMENTS = [
  {
    id: "PAY-LOTFI-001",
    vendor: "Lotfi",
    vendorRole: "Menuiserie, Châssis MDF & Cadres",
    amount: 150.0,
    date: "2026-10-05",
    paymentMethod: "Espèces",
    notes: "Acompte chantiers semaine 40"
  },
  {
    id: "PAY-IMP-001",
    vendor: "L'Imprimerie",
    vendorRole: "Tirages Vinyle & Plastification",
    amount: 60.0,
    date: "2026-10-06",
    paymentMethod: "Virement Bancaire",
    notes: "Règlement lot vinyle A3/A2"
  }
];

export const INITIAL_OPERATIONAL_EXPENSES = [
  {
    id: "EXP-001",
    title: "Achat rouleaux papier bulle & ruban adhésif renforcé",
    category: "Packaging & Emballage",
    amount: 45.0,
    date: "2026-10-02",
    notes: "Fournitures d'emballage pour 50 colis"
  },
  {
    id: "EXP-002",
    title: "Carburant tournée livraisons express Tunis & Grand Tunis",
    category: "Transport & Logistique",
    amount: 35.0,
    date: "2026-10-04",
    notes: "Tournée livraison urgente"
  },
  {
    id: "EXP-003",
    title: "Abonnement suite créative & retouche HD",
    category: "Outils & Abonnements",
    amount: 30.0,
    date: "2026-10-01",
    notes: "Licence mensuelle studio"
  }
];
