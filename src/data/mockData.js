// Initial Mock Data for Tableaux Décoratifs Admin Dashboard

export const INITIAL_AD_SPEND = {
  facebook: 0,
  instagram: 0,
  tiktok: 0,
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
    name: "Cadre",
    nameEn: "Framed Prints",
    slug: "cadre",
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
    name: "Panneaux",
    nameEn: "Decorative Panels",
    slug: "panneaux",
    icon: "Layers",
    subcategories: [
      { id: "sub-2-1", name: "Art & Design", slug: "art-design" },
      { id: "sub-2-2", name: "Motivation", slug: "motivation" },
      { id: "sub-2-3", name: "Music", slug: "music" },
      { 
        id: "sub-2-4", 
        name: "Sports", 
        slug: "sports",
        nestedSports: ["Football", "Basketball", "MMA", "Boxing", "Motorsport"]
      }
    ]
  },
  {
    id: "cat-3",
    name: "Packs",
    nameEn: "Triptych & Bundles",
    slug: "packs",
    icon: "Grid",
    subcategories: [
      { id: "sub-3-1", name: "Pack en 3", slug: "pack-en-3" },
      { id: "sub-3-2", name: "Gallerie Murale", slug: "gallerie-murale" }
    ]
  },
  {
    id: "cat-4",
    name: "Personnalisé",
    nameEn: "Custom Orders",
    slug: "personnalise",
    icon: "Sparkles",
    subcategories: [
      { id: "sub-4-1", name: "Portrait Personnalisé", slug: "portrait-personnalise" },
      { id: "sub-4-2", name: "Photo sur Mesure", slug: "photo-sur-mesure" }
    ]
  }
];

export const INITIAL_PRODUCTS = [];

export const SAMPLE_DEMO_PRODUCTS = [
  {
    id: "PRD-101",
    title: "Tableau Premium Lionel Messi World Cup Gold Edition",
    description: "Impression numérique haute définition sur toile canvas tendue sur châssis bois massif noble. Finition vernis brillant protecteur anti-UV.",
    category: "Cadre",
    subcategory: "Sports",
    nestedSport: "Football",
    status: "Active",
    basePrice: 75,
    pricingMatrix: { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 },
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-paint-brush-dipping-in-paint-41559-large.mp4",
    stock: 42,
    salesCount: 128
  },
  {
    id: "PRD-102",
    title: "Pack en 3 Panneaux Abstraits Gold & Marble Luxury",
    description: "Triptyque moderne en verre acrylique 5mm ultra-brillant avec reflets dorés et marbre noir royal. Livré avec kit de fixation invisible.",
    category: "Packs",
    subcategory: "Pack en 3",
    nestedSport: null,
    status: "Active",
    basePrice: 195,
    pricingMatrix: { A4: 130, A3: 195, A2: 280, A1: 410, A0: 590 },
    images: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 18,
    salesCount: 89
  },
  {
    id: "PRD-103",
    title: "Cadre Neon Cyberpunk Porsche 911 GT3 RS",
    description: "Affiche vintage réinventée sous éclairage néon cyan et magenta. Finition cadre aluminium noir brossé extra-slim.",
    category: "Cadre",
    subcategory: "Automobile",
    nestedSport: "Motorsport",
    status: "Active",
    basePrice: 85,
    pricingMatrix: { A4: 55, A3: 85, A2: 125, A1: 185, A0: 270 },
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 25,
    salesCount: 94
  },
  {
    id: "PRD-104",
    title: "Panneau Décoratif Michael Jordan 'The Last Dance'",
    description: "Panneau bois composite noir ébène découpé au laser avec plaque alu brossé argent. Icône légendaire du Basketball NBA.",
    category: "Panneaux",
    subcategory: "Sports",
    nestedSport: "Basketball",
    status: "Active",
    basePrice: 90,
    pricingMatrix: { A4: 60, A3: 90, A2: 135, A1: 195, A0: 290 },
    images: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 15,
    salesCount: 67
  },
  {
    id: "PRD-105",
    title: "Cadre Art Motivation 'Mindset is Everything' Gold",
    description: "Typographie de luxe en dorure à chaud dorée sur fond noir mat texturé 300g. Idéal pour bureau de dirigeant et espaces créatifs.",
    category: "Cadre",
    subcategory: "Motivation",
    nestedSport: null,
    status: "Active",
    basePrice: 65,
    pricingMatrix: { A4: 45, A3: 65, A2: 95, A1: 145, A0: 220 },
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 50,
    salesCount: 156
  },
  {
    id: "PRD-106",
    title: "Tableau Custom Photo Famille / Portrait Personnalisé",
    description: "Sublimez vos plus beaux souvenirs. Impression ultra-haute définition 4K sur toile d'art premium avec correction colorimétrique studio gratuite.",
    category: "Personnalisé",
    subcategory: "Portrait Personnalisé",
    nestedSport: null,
    status: "Active",
    basePrice: 80,
    pricingMatrix: { A4: 55, A3: 80, A2: 120, A1: 175, A0: 260 },
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 999,
    salesCount: 210
  },
  {
    id: "PRD-107",
    title: "Cadre Pop Art Vinyl Legend Tupac Shakur & Biggie",
    description: "Portrait iconique Hip-Hop avec effets néon et graffitis urbains. Verre acrylique incassable et anti-reflet.",
    category: "Cadre",
    subcategory: "Music",
    nestedSport: null,
    status: "Active",
    basePrice: 70,
    pricingMatrix: { A4: 45, A3: 70, A2: 105, A1: 155, A0: 230 },
    images: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 30,
    salesCount: 112
  },
  {
    id: "PRD-108",
    title: "Pack en 3 Panneaux Nature & Minimalist Golden Leaves",
    description: "Feuillages tropicaux scandinaves ornés de dorures fines. Set de 3 tableaux assortis pour salon moderne.",
    category: "Packs",
    subcategory: "Pack en 3",
    nestedSport: null,
    status: "Active",
    basePrice: 180,
    pricingMatrix: { A4: 120, A3: 180, A2: 260, A1: 390, A0: 560 },
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 22,
    salesCount: 78
  },
  {
    id: "PRD-109",
    title: "Cadre Film Cult 'Scarface The World Is Yours' Noir & Or",
    description: "Design cinématographique mythique en haute définition. Passe-partout blanc crème et moulure bois mat noble.",
    category: "Cadre",
    subcategory: "Films & Séries",
    nestedSport: null,
    status: "Active",
    basePrice: 75,
    pricingMatrix: { A4: 50, A3: 75, A2: 110, A1: 165, A0: 245 },
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 14,
    salesCount: 88
  },
  {
    id: "PRD-110",
    title: "Tableau MMA Khabib Nurmagomedov Champion Belt",
    description: "Affiche de collection célébrant l'invincibilité 29-0 en UFC. Inscription dorée en relief et fond texture Octogone.",
    category: "Cadre",
    subcategory: "Sports",
    nestedSport: "MMA",
    status: "Active",
    basePrice: 70,
    pricingMatrix: { A4: 45, A3: 70, A2: 105, A1: 155, A0: 230 },
    images: [
      "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 20,
    salesCount: 63
  },
  {
    id: "PRD-111",
    title: "Panneau Aluminium Mohamed Ali 'Impossible is Nothing'",
    description: "Impression directe sur plaque aluminium Dibond 3mm. Rendu métallique stupéfiant et résistant à l'humidité.",
    category: "Panneaux",
    subcategory: "Sports",
    nestedSport: "Boxing",
    status: "Active",
    basePrice: 95,
    pricingMatrix: { A4: 65, A3: 95, A2: 140, A1: 205, A0: 310 },
    images: [
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 11,
    salesCount: 54
  },
  {
    id: "PRD-112",
    title: "Tableau Cristiano Ronaldo 'SIUU' Real Madrid Era",
    description: "Édition légende du football européen avec détails Or 24K simulés et signature numérique imprimée.",
    category: "Cadre",
    subcategory: "Sports",
    nestedSport: "Football",
    status: "Active",
    basePrice: 75,
    pricingMatrix: { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 },
    images: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 38,
    salesCount: 145
  },
  {
    id: "PRD-113",
    title: "Cadre Art Abstrait Geometric Gold Lines & Deep Navy",
    description: "Composition géométrique élégante combinant bleu nuit et lignes dorées métalliques.",
    category: "Cadre",
    subcategory: "Art & Design",
    nestedSport: null,
    status: "Active",
    basePrice: 70,
    pricingMatrix: { A4: 45, A3: 70, A2: 105, A1: 155, A0: 230 },
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 29,
    salesCount: 92
  },
  {
    id: "PRD-114",
    title: "Panneau Formule 1 Ayrton Senna McLaren Legend",
    description: "Hommage au triple champion du monde de F1. Finition brillante haute définition sur support rigide.",
    category: "Panneaux",
    subcategory: "Sports",
    nestedSport: "Motorsport",
    status: "Active",
    basePrice: 85,
    pricingMatrix: { A4: 55, A3: 85, A2: 125, A1: 185, A0: 275 },
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 17,
    salesCount: 71
  },
  {
    id: "PRD-115",
    title: "Pack en 3 Gallerie Murale Architecture & Modern Skyline",
    description: "Ensemble captivant des plus belles métropoles mondiales au crépuscule. Encadrement épuré.",
    category: "Packs",
    subcategory: "Gallerie Murale",
    nestedSport: null,
    status: "Draft",
    basePrice: 210,
    pricingMatrix: { A4: 140, A3: 210, A2: 300, A1: 440, A0: 640 },
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "",
    stock: 10,
    salesCount: 15
  }
];

export const INITIAL_ORDERS = [];

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
        category: "Cadre",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 75,
        quantity: 2,
        subtotal: 150
      },
      {
        productId: "PRD-105",
        title: "Cadre Art Motivation 'Mindset is Everything' Gold",
        category: "Cadre",
        dimension: "A2",
        dimensionDetails: "42 x 60 cm",
        unitPrice: 95,
        quantity: 1,
        subtotal: 95
      }
    ],
    totalAmount: 252, // 150 + 95 + 7
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
        category: "Packs",
        dimension: "A3",
        dimensionDetails: "3x (30 x 42 cm)",
        unitPrice: 195,
        quantity: 1,
        subtotal: 195
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
    paymentMethod: "Paiement en ligne",
    isPaid: true,
    shippingFee: 7,
    createdAt: "2026-09-30T18:40:00Z",
    items: [
      {
        productId: "PRD-106",
        title: "Tableau Custom Photo Famille / Portrait Personnalisé",
        category: "Personnalisé",
        dimension: "A1",
        dimensionDetails: "60 x 84 cm",
        unitPrice: 175,
        quantity: 1,
        subtotal: 175,
        assetUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80",
        assetFileName: "Portrait_Famille_Gharbi_HighRes_300dpi.png"
      }
    ],
    totalAmount: 182,
    totalPanels: 1,
    customAssetUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80",
    notes: "Attention particulière à la brillance des couleurs de la photo."
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
        title: "Cadre Neon Cyberpunk Porsche 911 GT3 RS",
        category: "Cadre",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 85,
        quantity: 1,
        subtotal: 85
      },
      {
        productId: "PRD-114",
        title: "Panneau Formule 1 Ayrton Senna McLaren Legend",
        category: "Panneaux",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 85,
        quantity: 1,
        subtotal: 85
      }
    ],
    totalAmount: 177,
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
        title: "Panneau Décoratif Michael Jordan 'The Last Dance'",
        category: "Panneaux",
        dimension: "A2",
        dimensionDetails: "42 x 60 cm",
        unitPrice: 135,
        quantity: 1,
        subtotal: 135
      }
    ],
    totalAmount: 142,
    totalPanels: 1,
    customAssetUrl: null,
    notes: "Livré avec succès par Aramex."
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
        productId: "PRD-107",
        title: "Cadre Pop Art Vinyl Legend Tupac Shakur & Biggie",
        category: "Cadre",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 70,
        quantity: 2,
        subtotal: 140
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
        productId: "PRD-108",
        title: "Pack en 3 Panneaux Nature & Minimalist Golden Leaves",
        category: "Packs",
        dimension: "A3",
        dimensionDetails: "3x (30 x 42 cm)",
        unitPrice: 180,
        quantity: 1,
        subtotal: 180
      }
    ],
    totalAmount: 187,
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
        productId: "PRD-109",
        title: "Cadre Film Cult 'Scarface The World Is Yours' Noir & Or",
        category: "Cadre",
        dimension: "A2",
        dimensionDetails: "42 x 60 cm",
        unitPrice: 110,
        quantity: 1,
        subtotal: 110
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
    paymentMethod: "Paiement en ligne",
    isPaid: true,
    shippingFee: 7,
    createdAt: "2026-09-30T21:15:00Z",
    items: [
      {
        productId: "PRD-113",
        title: "Cadre Art Abstrait Geometric Gold Lines & Deep Navy",
        category: "Cadre",
        dimension: "A1",
        dimensionDetails: "60 x 84 cm",
        unitPrice: 155,
        quantity: 1,
        subtotal: 155
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
        productId: "PRD-110",
        title: "Tableau MMA Khabib Nurmagomedov Champion Belt",
        category: "Cadre",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 70,
        quantity: 1,
        subtotal: 70
      },
      {
        productId: "PRD-111",
        title: "Panneau Aluminium Mohamed Ali 'Impossible is Nothing'",
        category: "Panneaux",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 95,
        quantity: 1,
        subtotal: 95
      }
    ],
    totalAmount: 172,
    totalPanels: 2,
    customAssetUrl: null,
    notes: "Livraison à Djerba via société de transport express."
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
        productId: "PRD-112",
        title: "Tableau Cristiano Ronaldo 'SIUU' Real Madrid Era",
        category: "Cadre",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 75,
        quantity: 1,
        subtotal: 75
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
        category: "Cadre",
        dimension: "A0",
        dimensionDetails: "84 x 118 cm (Grand Format)",
        unitPrice: 240,
        quantity: 1,
        subtotal: 240
      }
    ],
    totalAmount: 247,
    totalPanels: 1,
    customAssetUrl: null,
    notes: "Grand format A0 renforcé."
  },
  {
    id: "CMD-2026-9013",
    customerName: "Ines Ghorbel",
    phone: "+216 94 001 992",
    address: "Cité les Palmeraies, Tozeur",
    governorate: "Tozeur",
    postalCode: "2200",
    status: "Pending",
    paymentMethod: "Paiement en ligne",
    isPaid: true,
    shippingFee: 7,
    createdAt: "2026-10-01T13:00:00Z",
    items: [
      {
        productId: "PRD-106",
        title: "Tableau Custom Photo Famille / Portrait Personnalisé",
        category: "Personnalisé",
        dimension: "A2",
        dimensionDetails: "42 x 60 cm",
        unitPrice: 120,
        quantity: 2,
        subtotal: 240,
        assetUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=80",
        assetFileName: "Photo_Souvenir_Tozeur_Custom.jpg"
      }
    ],
    totalAmount: 247,
    totalPanels: 2,
    customAssetUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=80",
    notes: "2 Toiles personnalisées identiques."
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
        title: "Cadre Art Motivation 'Mindset is Everything' Gold",
        category: "Cadre",
        dimension: "A3",
        dimensionDetails: "30 x 42 cm",
        unitPrice: 65,
        quantity: 3,
        subtotal: 195
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
        category: "Packs",
        dimension: "A2",
        dimensionDetails: "3x (42 x 60 cm)",
        unitPrice: 280,
        quantity: 1,
        subtotal: 280
      }
    ],
    totalAmount: 287,
    totalPanels: 3,
    customAssetUrl: null,
    notes: "Très satisfaite de la finition acrylique."
  }
];

export const REVENUE_TIMESERIES_DATA = {
  Jour: [
    { period: "08:00", revenue: 0, orders: 0, panels: 0 },
    { period: "10:00", revenue: 0, orders: 0, panels: 0 },
    { period: "12:00", revenue: 0, orders: 0, panels: 0 },
    { period: "14:00", revenue: 0, orders: 0, panels: 0 },
    { period: "16:00", revenue: 0, orders: 0, panels: 0 },
    { period: "18:00", revenue: 0, orders: 0, panels: 0 },
    { period: "20:00", revenue: 0, orders: 0, panels: 0 },
    { period: "22:00", revenue: 0, orders: 0, panels: 0 }
  ],
  Semaine: [
    { period: "Lun", revenue: 0, orders: 0, panels: 0 },
    { period: "Mar", revenue: 0, orders: 0, panels: 0 },
    { period: "Mer", revenue: 0, orders: 0, panels: 0 },
    { period: "Jeu", revenue: 0, orders: 0, panels: 0 },
    { period: "Ven", revenue: 0, orders: 0, panels: 0 },
    { period: "Sam", revenue: 0, orders: 0, panels: 0 },
    { period: "Dim", revenue: 0, orders: 0, panels: 0 }
  ],
  Mois: [
    { period: "Sem 1", revenue: 0, orders: 0, panels: 0 },
    { period: "Sem 2", revenue: 0, orders: 0, panels: 0 },
    { period: "Sem 3", revenue: 0, orders: 0, panels: 0 },
    { period: "Sem 4", revenue: 0, orders: 0, panels: 0 }
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
  ctaText: "Découvrir le Catalog",
  ctaTargetUrl: "/catalog",
  badgeText: "NOUVELLE COLLECTION 2026",
  announcementText: "✨ Livraison offerte sur toute la Tunisie à partir de 150 DNT d'achat! 🇹🇳",
  announcementActive: true
};
