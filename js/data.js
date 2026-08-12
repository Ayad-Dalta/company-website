/**
 * ApexBridge Engineering & Structural Materials Data Store
 */

const APEX_DATA = {
  company: {
    name: "ApexBridge Heavy Civil & Structural Engineering",
    shortName: "ApexBridge",
    tagline: "Building Tomorrow's Infrastructure with Certified Precision",
    phone: "+1 (800) 555-APEX-BRDG",
    email: "contact@apexbridge-eng.com",
    address: "750 Structural Steel Parkway, Suite 1200, Pittsburgh, PA 15222",
    certifications: [
      "AISC Certified Fabricator & Advanced Steel Erection",
      "AASHTO Material Testing & Compliance Standard",
      "ISO 9001:2015 Structural Quality Management",
      "AWS D1.5 Bridge Welding Code Certified",
      "Eurocode EN 1993 Steel Bridge Construction Qualified"
    ],
    stats: {
      bridgesCompleted: "480+",
      tonsSteelDelivered: "1.45M",
      safetyRecordYears: "34",
      consultingProjects: "1,200+"
    }
  },

  services: [
    {
      id: "structural-analysis",
      icon: "fa-project-diagram",
      title: "Advanced Structural Analysis & Finite Element Modeling",
      shortDesc: "Comprehensive dynamic stress analysis, wind tunnel CFD, and 3D FEA simulation for complex bridge spans.",
      fullDesc: "Our senior structural engineers utilize state-of-the-art non-linear dynamic FEA algorithms to model structural responses to seismic activity, hurricane-force wind loads, thermal expansion, and fatigue failure limits over 100+ year lifespans.",
      deliverables: ["Full 3D Structural FEA Report", "Dynamic Wind & Wave Resonance Study", "AASHTO LRFD Load Rating Certificate"]
    },
    {
      id: "geotechnical-site",
      icon: "fa-mountain",
      title: "Geotechnical Engineering & Deep Foundation Design",
      shortDesc: "Soil mechanics, rock socketed pier design, seismic liquefaction risk assessment, and abutment stability analysis.",
      fullDesc: "Subsurface exploration and deep borehole testing to design high-capacity driven steel H-piles, drilled shafts, and caissons for riverbeds, marine straits, and high-seismic zones.",
      deliverables: ["Geotechnical Soil & Bedrock Profile", "Deep Pier Capacity Calculations", "Liquefaction Risk Mitigation Plan"]
    },
    {
      id: "cable-stayed-design",
      icon: "fa-draw-polygon",
      title: "Cable-Stayed & Suspension Bridge Specialization",
      shortDesc: "Turnkey engineering for long-span cable stay towers, stay tension tuning, and main cable wire bundle engineering.",
      fullDesc: "End-to-end design of cable-stayed and suspension superstructures. We calculate damper requirements, vibration mitigation, and real-time cable tension sensor networks.",
      deliverables: ["Tower Geometry & Cable Anchorage Blueprints", "Stay Tensioning Schedule & Damping Specs", "Erection Sequence Analysis"]
    },
    {
      id: "rehabilitation-lifespan",
      icon: "fa-tools",
      title: "Bridge Rehabilitation & Lifespan Extension",
      shortDesc: "Structural retrofitting, deck replacement, expansion joint overhaul, and cathodic corrosion protection.",
      fullDesc: "Extend aging bridge service life by 50+ years. We provide non-destructive testing (NDT), ultrasonic flaw detection, carbon fiber reinforced polymer (CFRP) wrapping, and girder strengthening.",
      deliverables: ["NDT Structural Health Audit", "CFRP & Steel Plate Retrofit Plan", "Corrosion Prevention Protocol"]
    },
    {
      id: "bim-digital-twin",
      icon: "fa-cubes",
      title: "BIM 3D Digital Twin & Construction Supervision",
      shortDesc: "LOD 500 Building Information Modeling, drone structural inspections, and on-site quality assurance.",
      fullDesc: "Construct high-fidelity digital twins of your bridge infrastructure. Integrated IoT sensor mapping enables real-time stress monitoring and predictive maintenance alerts.",
      deliverables: ["LOD 500 BIM Model (Revit/Tekla)", "Drone Photogrammetry Mesh", "On-site QA Inspection Logs"]
    },
    {
      id: "custom-fabrication-qc",
      icon: "fa-industry",
      title: "Custom Steel Girder Fabrication & QC Inspection",
      shortDesc: "Certified shop drawing development, automated submerged arc welding inspection, and mill test reporting.",
      fullDesc: "Direct oversight of structural steel fabrication at AISC-certified mills. Every plate girder, box beam, and truss member undergoes 100% magnetic particle and ultrasonic testing.",
      deliverables: ["Mill Test Reports (MTRs)", "Welding Procedure Specifications (WPS)", "Ultrasonic & Magnetic NDT Reports"]
    }
  ],

  products: [
    {
      id: "mat-001",
      name: "ASTM A709 Grade 50W Weathering Steel Plate Girder",
      category: "steel-girders",
      materialGrade: "ASTM A709 Grade 50W / HPS 70W",
      pricePerUnit: 2450.00,
      unit: "Metric Ton",
      minOrder: 5,
      loadCapacity: 180, // tons tensile yield
      rating: 4.9,
      reviewsCount: 38,
      inStock: 450,
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80",
      description: "High-strength, low-alloy atmospheric corrosion-resistant structural steel for highway & railway bridge superstructures. Eliminates need for painting in unexposed environments.",
      specs: {
        yieldStrength: "50 ksi (345 MPa)",
        tensileStrength: "70 ksi (485 MPa)",
        charpyVNotch: "20 ft-lbs @ -10°F",
        standardLength: "12m to 36m continuous spans",
        coating: "Atmospheric Self-Passivating Oxide Coating"
      }
    },
    {
      id: "mat-002",
      name: "Galvanized High-Tensile Stay Cable Strand Bundle (15.7mm)",
      category: "cables-tendons",
      materialGrade: "ASTM A416 Grade 270 (1860 MPa)",
      pricePerUnit: 4.80,
      unit: "Meter",
      minOrder: 500,
      loadCapacity: 27.9, // tons breaking force per strand
      rating: 5.0,
      reviewsCount: 29,
      inStock: 25000,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      description: "7-wire prestressed concrete and cable-stayed bridge strand. Features hot-dip zinc coating with continuous HDPE outer sheath for 100-year corrosion immunity.",
      specs: {
        nominalDiameter: "0.6 inch (15.7 mm)",
        breakingLoad: "279 kN (62.7 kips)",
        zincCoatingWeight: "300 g/m²",
        relaxation: "Low relaxation < 2.5% @ 1000 hrs",
        sheathing: "UV-Stabilized High-Density Polyethylene"
      }
    },
    {
      id: "mat-003",
      name: "Elastomeric Expansion Bridge Bearing Pad (Laminated Steel)",
      category: "bearings-joints",
      materialGrade: "Neoprene Shore A 60 / AASHTO M251",
      pricePerUnit: 890.00,
      unit: "Piece",
      minOrder: 2,
      loadCapacity: 350, // tons vertical load
      rating: 4.8,
      reviewsCount: 42,
      inStock: 120,
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      description: "Steel-reinforced elastomeric bearing pads engineered for thermal expansion, girder rotation, and seismic shear absorption in heavy multi-span bridges.",
      specs: {
        dimensions: "600mm x 500mm x 120mm",
        maxVerticalLoad: "3,500 kN",
        maxShearDisplacement: "± 75 mm",
        operatingTemp: "-40°C to +70°C",
        certification: "AASHTO M251 Level 2 Tested"
      }
    },
    {
      id: "mat-004",
      name: "High-Performance Silica Fume Concrete Deck Additive",
      category: "concrete-additives",
      materialGrade: "ASTM C1240 Grade 1",
      pricePerUnit: 125.00,
      unit: "Bag (25kg)",
      minOrder: 20,
      loadCapacity: 120, // MPa compressive potential
      rating: 4.7,
      reviewsCount: 19,
      inStock: 1800,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      description: "Ultrafine pozzolanic concrete admixture for high-density bridge decks. Drastically lowers chloride permeability, preventing rebar corrosion from deicing salts.",
      specs: {
        SiO2Content: "> 92%",
        specificSurface: "15,000 m²/kg",
        chloridePermeability: "< 500 Coulombs (ASTM C1202)",
        compressiveGain: "+35% @ 28 Days",
        dosageRate: "5-10% by cement weight"
      }
    },
    {
      id: "mat-005",
      name: "Heavy Modular Finger Expansion Joint Assembly",
      category: "bearings-joints",
      materialGrade: "Structural Steel ASTM A572 Grade 50",
      pricePerUnit: 3200.00,
      unit: "Linear Meter",
      minOrder: 4,
      loadCapacity: 250, // tons axle load rating
      rating: 4.9,
      reviewsCount: 14,
      inStock: 60,
      image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80",
      description: "Waterproof finger expansion joint allowing up to 400mm longitudinal movement. Includes neoprene drainage trough and stainless steel clamping system.",
      specs: {
        movementCapacity: "Up to 400 mm (16 in)",
        wheelLoadRating: "AASHTO HL-93 Extreme Truck Loading",
        waterproofing: "Integrated EPDM Seal Membrane",
        surfaceFinish: "Hot-Dip Galvanized + Anti-Skid Epoxy Coating"
      }
    },
    {
      id: "mat-006",
      name: "Ultra-High Performance Concrete (UHPC) Premix Matrix",
      category: "concrete-additives",
      materialGrade: "UHPC-150 / FHWA Grade A",
      pricePerUnit: 1850.00,
      unit: "Metric Ton Bag",
      minOrder: 2,
      loadCapacity: 175, // MPa compressive strength
      rating: 5.0,
      reviewsCount: 56,
      inStock: 340,
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
      description: "Steel-fiber reinforced ultra-high performance concrete mix for bridge deck joints, shear keys, and precast beam closure pours with zero permeability.",
      specs: {
        compressiveStrength: "150-180 MPa (22,000+ psi)",
        flexuralStrength: "25-35 MPa",
        steelFiberVolume: "2.0% High-Tensile Micro-Fibers",
        settingTime: "Initial 6 hrs / Final 10 hrs",
        freezeThawDurability: "99% Durability Factor @ 600 Cycles"
      }
    },
    {
      id: "mat-007",
      name: "Marine-Grade Epoxy Corrosion Resistant Primer & Topcoat",
      category: "coatings-sealants",
      materialGrade: "ISO 12944 C5-M Very High Industrial/Marine",
      pricePerUnit: 420.00,
      unit: "Kit (20 Liters)",
      minOrder: 5,
      loadCapacity: 95, // % salt spray resistance rating
      rating: 4.8,
      reviewsCount: 23,
      inStock: 800,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      description: "Three-coat 100% solids zinc-rich epoxy, epoxy barrier, and aliphatic polyurethane system. Engineered for offshore ocean bridges and saltwater environments.",
      specs: {
        saltSprayHours: "10,000+ Hours (ASTM B117)",
        dryFilmThickness: "320 microns total system",
        VOCContent: "< 150 g/L Low VOC",
        recoatWindow: "2-24 Hours",
        UVResistance: "Excellent Gloss Retention"
      }
    },
    {
      id: "mat-008",
      name: "High-Yield ASTM A615 Grade 80 Deformed Steel Rebar",
      category: "steel-girders",
      materialGrade: "ASTM A615 Grade 80 (550 MPa)",
      pricePerUnit: 1280.00,
      unit: "Metric Ton",
      minOrder: 10,
      loadCapacity: 80, // ksi yield strength
      rating: 4.9,
      reviewsCount: 67,
      inStock: 1200,
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      description: "High-strength deformed reinforcement bars for heavy bridge abutments, piers, and deck slabs. Reduces congested rebar placement by 25%.",
      specs: {
        barSizes: "#4 (13mm) to #18 (57mm)",
        yieldStrength: "80,000 psi (550 MPa)",
        tensileStrength: "100,000 psi (690 MPa)",
        elongation: "12% Min in 8 inches",
        bentTest: "180 Degree Pin Diameter Compliant"
      }
    }
  ],

  portfolio: [
    {
      id: "proj-001",
      title: "The Great Northern Strait Cable-Stayed Bridge",
      location: "Puget Sound, Washington, USA",
      yearCompleted: 2024,
      spanLength: "1,240 meters",
      mainTowerHeight: "215 meters",
      bridgeType: "Cable-Stayed Twin Tower",
      budget: "$340 Million",
      image: "https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=1200&q=80",
      summary: "ApexBridge executed complete structural design, wind dynamic modeling, and supplied over 18,000 metric tons of ASTM A709 Grade 50W weathering steel and 15.7mm stay cables.",
      highlights: [
        "Sustained 165 mph wind load testing without aerodynamic flutter",
        "Seismic isolation dampers withstand Zone 4 earthquake events",
        "Integrated IoT stay-tension wireless monitoring system"
      ]
    },
    {
      id: "proj-002",
      title: "Allegheny River High-Speed Rail Viaduct",
      location: "Pittsburgh, Pennsylvania, USA",
      yearCompleted: 2023,
      spanLength: "860 meters",
      mainTowerHeight: "45 meters",
      bridgeType: "Continuous Welded Plate Girder Rail Viaduct",
      budget: "$185 Million",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      summary: "Full structural replacement of a century-old rail crossing. Features 3.2m deep custom fabricated plate girders and heavy elastomeric vibration absorption bearings.",
      highlights: [
        "100% ultrasonic weld inspection certified to AWS D1.5",
        "Designed for heavy 35-ton axle freight locomotive impact loads",
        "Zero disruption to river navigational channels during erection"
      ]
    },
    {
      id: "proj-003",
      title: "Golden Gorge Arch Bridge Rehabilitation",
      location: "Colorado Rockies, USA",
      yearCompleted: 2025,
      spanLength: "450 meters",
      mainTowerHeight: "120 meter canyon depth",
      bridgeType: "Steel Through-Arch Span",
      budget: "$95 Million",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
      summary: "Lifespan extension project replacing the suspended deck with UHPC lightweight concrete and installing high-durability epoxy anti-corrosion barrier coatings.",
      highlights: [
        "50+ year lifespan extension achieved with zero extra dead weight",
        "CFRP wrapping on steel arch pins boosted shear capacity by 40%",
        "Awarded AASHTO Infrastructure Excellence Award 2025"
      ]
    }
  ],

  testimonials: [
    {
      name: "Dr. Marcus Vance, PE, SE",
      role: "Chief Structural Engineer, TransState DOT",
      quote: "ApexBridge is our top-tier consultation partner for long-span structures. Their FEA dynamic analysis and certified weathering steel girders made the Puget Sound crossing seamless and on schedule.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Elena Rostova",
      role: "Project Director, Global Heavy Infra Corp",
      quote: "The quality of materials supplied by ApexBridge—from their UHPC premix to 1860 MPa cable stay strands—is unmatched. Full Mill Test Reports arrived before shipment.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Jameson Blake",
      role: "VP of Procurement, National Bridge Builders",
      quote: "Their online materials shop and instant load calculator streamlined our bidding phase immensely. We saved over $1.2M in material logistics alone.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    }
  ],

  faq: [
    {
      q: "How are your structural bridge materials certified?",
      a: "All materials shipped from ApexBridge come with comprehensive Certified Material Test Reports (CMTR/MTR) traceable to heat numbers, compliant with AASHTO, AISC, ASTM, and Eurocode EN 10204 Type 3.1 standards."
    },
    {
      q: "Can ApexBridge provide custom girder dimensions and pre-fab steel work?",
      a: "Yes. Our partner AISC Major Bridge certified fabrication facilities produce custom welded plate girders up to 4.5 meters deep and lengths up to 45 meters per section."
    },
    {
      q: "What is the turnaround time for an engineering consultation & RFQ?",
      a: "Our structural engineering team evaluates site assessments and RFQ requests within 24 to 48 hours, delivering initial FEA feasibility previews and preliminary material cost estimates."
    },
    {
      q: "Do you ship bridge construction materials internationally?",
      a: "Yes, we handle international break-bulk and containerized ocean shipping with full customs compliance and marine-grade corrosion-protective packaging."
    }
  ],

  // Preset configurations for the interactive Bridge Load & Stress Simulator
  simulatorPresets: [
    {
      id: "warren-truss",
      name: "Warren Truss Bridge (Heavy Duty)",
      spanWidth: 600,
      deckY: 280,
      nodes: [
        { id: 0, x: 50, y: 280, fixed: true },
        { id: 1, x: 150, y: 280, fixed: false },
        { id: 2, x: 250, y: 280, fixed: false },
        { id: 3, x: 350, y: 280, fixed: false },
        { id: 4, x: 450, y: 280, fixed: false },
        { id: 5, x: 550, y: 280, fixed: true },
        { id: 6, x: 100, y: 190, fixed: false },
        { id: 7, x: 200, y: 190, fixed: false },
        { id: 8, x: 300, y: 190, fixed: false },
        { id: 9, x: 400, y: 190, fixed: false },
        { id: 10, x: 500, y: 190, fixed: false }
      ],
      members: [
        // Deck
        { n1: 0, n2: 1 }, { n1: 1, n2: 2 }, { n1: 2, n2: 3 }, { n1: 3, n2: 4 }, { n1: 4, n2: 5 },
        // Top chord
        { n1: 6, n2: 7 }, { n1: 7, n2: 8 }, { n1: 8, n2: 9 }, { n1: 9, n2: 10 },
        // Diagonals
        { n1: 0, n2: 6 }, { n1: 6, n2: 1 }, { n1: 1, n2: 7 }, { n1: 7, n2: 2 },
        { n1: 2, n2: 8 }, { n1: 8, n2: 3 }, { n1: 3, n2: 9 }, { n1: 9, n2: 4 },
        { n1: 4, n2: 10 }, { n1: 10, n2: 5 }
      ]
    },
    {
      id: "pratt-truss",
      name: "Pratt Truss Highway Bridge",
      spanWidth: 600,
      deckY: 280,
      nodes: [
        { id: 0, x: 50, y: 280, fixed: true },
        { id: 1, x: 150, y: 280, fixed: false },
        { id: 2, x: 250, y: 280, fixed: false },
        { id: 3, x: 350, y: 280, fixed: false },
        { id: 4, x: 450, y: 280, fixed: false },
        { id: 5, x: 550, y: 280, fixed: true },
        { id: 6, x: 150, y: 190, fixed: false },
        { id: 7, x: 250, y: 190, fixed: false },
        { id: 8, x: 350, y: 190, fixed: false },
        { id: 9, x: 450, y: 190, fixed: false }
      ],
      members: [
        { n1: 0, n2: 1 }, { n1: 1, n2: 2 }, { n1: 2, n2: 3 }, { n1: 3, n2: 4 }, { n1: 4, n2: 5 },
        { n1: 6, n2: 7 }, { n1: 7, n2: 8 }, { n1: 8, n2: 9 },
        { n1: 0, n2: 6 }, { n1: 1, n2: 6 }, { n1: 2, n2: 6 },
        { n1: 2, n2: 7 }, { n1: 3, n2: 8 }, { n1: 4, n2: 9 },
        { n1: 5, n2: 9 }, { n1: 4, n2: 8 }
      ]
    },
    {
      id: "arch-bridge",
      name: "Through-Arch Bridge",
      spanWidth: 600,
      deckY: 280,
      nodes: [
        { id: 0, x: 50, y: 280, fixed: true },
        { id: 1, x: 150, y: 280, fixed: false },
        { id: 2, x: 250, y: 280, fixed: false },
        { id: 3, x: 350, y: 280, fixed: false },
        { id: 4, x: 450, y: 280, fixed: false },
        { id: 5, x: 550, y: 280, fixed: true },
        { id: 6, x: 150, y: 210, fixed: false },
        { id: 7, x: 230, y: 160, fixed: false },
        { id: 8, x: 300, y: 140, fixed: false },
        { id: 9, x: 370, y: 160, fixed: false },
        { id: 10, x: 450, y: 210, fixed: false }
      ],
      members: [
        { n1: 0, n2: 1 }, { n1: 1, n2: 2 }, { n1: 2, n2: 3 }, { n1: 3, n2: 4 }, { n1: 4, n2: 5 },
        { n1: 0, n2: 6 }, { n1: 6, n2: 7 }, { n1: 7, n2: 8 }, { n1: 8, n2: 9 }, { n1: 9, n2: 10 }, { n1: 10, n2: 5 },
        { n1: 1, n2: 6 }, { n1: 2, n2: 7 }, { n1: 3, n2: 8 }, { n1: 4, n2: 9 }
      ]
    }
  ]
};
