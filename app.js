/* ========================================================
   AgroInteligente – app.js (VERSÃO ATUALIZADA)
   Mano, não mexe em nada que tá funcionando, pfvr! 🙏
   ======================================================== */

/* ── ainda funciona */

const culturas = [
  {
    id: "algodao",
    emoji: "☁️",
    nome: "Algodão",
    tipo: "fibra",
    descricao: "Cultura de alto valor tecnológico. Principal praga: Bicudo-do-algodoeiro.",
    fotoRef: "https://images.unsplash.com/photo-1585336268764-0c4c4e9c5e0f?w=600&q=80",
    sintomas: [
      "Furos nos botões florais com queda",
      "Manchas angulares nas folhas",
      "Folhas com pó branco ou teia fina",
      "Lagartas devorando folhas",
      "Manchas marrons circulares nas folhas",
      "Plantas murchas com raízes podres"
    ],
    diagnosticos: {
      "Furos nos botões florais com queda": {
        nome: "Bicudo-do-Algodoeiro",
        emoji: "🪲",
        gravidade: "grave",
        causes: "Anthonomus grandis. O adulto perfura botões e a larva destrói o interior.",
        tratamentos: ["Monitoramento com armadilhas", "Inseticidas específicos em janela de aplicação", "Destruir restos culturais"]
      },
      "Manchas angulares nas folhas,Manchas marrons circulares nas folhas": {
        nome: "Mancha Angular / Ramulária",
        emoji: "🍂",
        gravidade: "grave",
        causes: "Bactéria Xanthomonas ou fungo Ramularia areola.",
        tratamentos: ["Fungicidas/bactericidas preventivos", "Variedades resistentes", "Boa circulação de ar"]
      },
      "Folhas com pó branco ou teia fina": {
        nome: "Ácaro-Rajado",
        emoji: "🕷️",
        gravidade: "moderado",
        causes: "Tetranychus urticae – favorecido por clima seco e quente.",
        tratamentos: ["Acaricidas seletivos", "Predadores naturais", "Irrigação por aspersão"]
      },
      default: {
        nome: "Lagarta-do-Cartucho",
        emoji: "🐛",
        gravidade: "grave",
        causes: "Spodoptera frugiperda.",
        tratamentos: ["Inseticidas Bt", "Controle biológico", "Monitoramento de ovos"]
      }
    }
  },

  {
    id: "arroz",
    emoji: "🌾",
    nome: "Arroz",
    tipo: "alimentar",
    descricao: "Principal cereal do Brasil. Brusone é a doença mais temida.",
    fotoRef: "https://images.unsplash.com/photo-1593001873049-2f5d3b2e7f4d?w=600&q=80",
    sintomas: [
      "Manchas necróticas com halo amarelo nas folhas",
      "Lesões nas panículas (espigas vazias)",
      "Manchas pardas ovais nas folhas",
      "Folhas com escaldadura (queimadas)",
      "Perfurações no colmo",
      "Plantas murchas"
    ],
    diagnosticos: {
      "Manchas necróticas com halo amarelo nas folhas,Lesões nas panículas (espigas vazias)": {
        nome: "Brusone",
        emoji: "🍄",
        gravidade: "grave",
        causes: "Fungo Magnaporthe oryzae.",
        tratamentos: ["Fungicidas triazóis na fase reprodutiva", "Cultivares resistentes", "Manejo de nitrogênio"]
      },
      "Manchas pardas ovais nas folhas": {
        nome: "Mancha Parda",
        emoji: "🟫",
        gravidade: "moderado",
        causes: "Bipolaris oryzae.",
        tratamentos: ["Fungicidas preventivos", "Equilíbrio nutricional", "Rotação de culturas"]
      },
      default: {
        nome: "Percevejo-do-Colmo",
        emoji: "🐞",
        gravidade: "moderado",
        causes: "Tibraca limbativentris.",
        tratamentos: ["Inseticidas na fase de perfilhamento", "Preservação de inimigos naturais"]
      }
    }
  },

  {
    id: "feijao",
    emoji: "🌱",
    nome: "Feijão",
    tipo: "alimentar",
    descricao: "Cultura de alto risco fitossanitário, especialmente viroses.",
    fotoRef: "https://images.unsplash.com/photo-1596733434982-0a5c4c8f4b0f?w=600&q=80",
    sintomas: [
      "Folhas com mosaico dourado",
      "Manchas angulares nas folhas",
      "Lesões encharcadas nos caules e vagens",
      "Plantas murchas com raízes podres",
      "Pó branco nas folhas",
      "Vagens deformadas"
    ],
    diagnosticos: {
      "Folhas com mosaico dourado": {
        nome: "Mosaico Dourado",
        emoji: "🟨",
        gravidade: "grave",
        causes: "Bean Golden Mosaic Virus (transmitido por mosca-branca).",
        tratamentos: ["Controle rigoroso da mosca-branca", "Eliminação de plantas doentes", "Variedades resistentes"]
      },
      "Manchas angulares nas folhas": {
        nome: "Mancha Angular",
        emoji: "🔶",
        gravidade: "moderado",
        causes: "Pseudocercospora griseola.",
        tratamentos: ["Fungicidas preventivos", "Rotação de culturas", "Evitar molhar folhas"]
      },
      "Plantas murchas com raízes podres": {
        nome: "Mofo Branco / Podridão Radicular",
        emoji: "☠️",
        gravidade: "grave",
        causes: "Sclerotinia ou Fusarium.",
        tratamentos: ["Solarização", "Tratamento de sementes", "Melhor drenagem"]
      },
      default: {
        nome: "Ferrugem do Feijoeiro",
        emoji: "🟠",
        gravidade: "moderado",
        causes: "Uromyces appendiculatus.",
        tratamentos: ["Fungicidas à base de triazol", "Cultivares resistentes"]
      }
    }
  },

  {
    id: "uva",
    emoji: "🍇",
    nome: "Uva",
    tipo: "fruta",
    descricao: "Exige manejo fitossanitário intenso, especialmente em regiões úmidas.",
    fotoRef: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80",
    sintomas: [
      "Manchas oleosas na face inferior das folhas",
      "Pó branco nas folhas e cachos",
      "Lesões escuras tipo 'olho de passarinho'",
      "Podridão cinzenta nos cachos",
      "Folhas amarelecidas com nervuras verdes",
      "Cachos murchos"
    ],
    diagnosticos: {
      "Manchas oleosas na face inferior das folhas": {
        nome: "Míldio da Videira",
        emoji: "🌧️",
        gravidade: "grave",
        causes: "Plasmopara viticola.",
        tratamentos: ["Fungicidas cúpricos + sistêmicos", "Poda verde", "Boa aeração do dossel"]
      },
      "Pó branco nas folhas e cachos": {
        nome: "Oídio",
        emoji: "⬜",
        gravidade: "grave",
        causes: "Uncinula necator.",
        tratamentos: ["Enxofre ou fungicidas específicos", "Evitar excesso de vigor"]
      },
      default: {
        nome: "Antracnose (Olho de Passarinho)",
        emoji: "⚫",
        gravidade: "moderado",
        causes: "Elsinoe ampelina.",
        tratamentos: ["Fungicidas preventivos", "Remoção de restos culturais"]
      }
    }
  },
  {
    id: "laranja",
    emoji: "🍊",
    nome: "Laranja",
    tipo: "fruta",
    descricao: "Pilar da citricultura brasileira; o controle do Greening é o maior desafio atual.",
    fotoRef: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=600&q=80",
    sintomas: [
      "Folhas com manchas amareladas assimétricas",
      "Frutos pequenos e deformados",
      "Queda prematura de frutos",
      "Lesões em relevo (casca grossa) nas folhas",
      "Presença de insetos pretos nos brotos",
      "Folhas enroladas com fuligem preta"
    ],
    diagnosticos: {
      "Folhas com manchas amareladas assimétricas,Frutos pequenos e deformados": {
        nome: "Greening (HLB)",
        emoji: "🦠",
        gravidade: "grave",
        causes: "Bactéria Candidatus Liberibacter, transmitida pelo inseto Psilídeo.",
        tratamentos: ["Erradicação da planta doente (obrigatório)", "Controle rigoroso do Psilídeo com inseticidas", "Uso de mudas sadias de viveiros telados"],
      },
      "Folhas enroladas com fuligem preta,Presença de insetos pretos nos brotos": {
        nome: "Pulgão-preto e Fumagina",
        emoji: "🪲",
        gravidade: "moderado",
        causes: "Pulgões sugam a seiva e excretam substância doce que atrai fungo (fumagina).",
        tratamentos: ["Aplicação de óleo mineral", "Inseticidas sistêmicos", "Preservação de joaninhas (predadores naturais)"],
      },
      default: {
        nome: "Cancro Cítrico",
        emoji: "🍂",
        gravidade: "grave",
        causes: "Bactéria Xanthomonas citri; entra por ferimentos e é espalhada por chuva e vento.",
        tratamentos: ["Pulverizações preventivas com cobre", "Quebra-ventos na lavoura", "Desinfecção de caixas e tesouras de poda"],
      },
    },
  },
  {
    id: "cana",
    emoji: "🎋",
    nome: "Cana-de-Açúcar",
    tipo: "alimentar",
    descricao: "Base da nossa bioenergia e açúcar. Sofre com brocas e pragas de solo.",
    fotoRef: "https://images.unsplash.com/photo-1590005085374-2976be0d5884?w=600&q=80",
    sintomas: [
      "Orifícios no colmo com serragem",
      "Morte do broto apical (coração morto)",
      "Pústulas alaranjadas na folha",
      "Estrutura preta parecida com chicote no topo",
      "Amarelecimento e secamento",
      "Raízes danificadas"
    ],
    diagnosticos: {
      "Morte do broto apical (coração morto),Orifícios no colmo com serragem": {
        nome: "Broca-da-Cana (Diatraea saccharalis)",
        emoji: "🐛",
        gravidade: "grave",
        causes: "Lagarta perfura o colmo, permitindo entrada de fungos que reduzem açúcar.",
        tratamentos: ["Controle biológico com vespinha (Cotesia flavipes)", "Inseticidas fisiológicos", "Variedades resistentes"],
      },
      "Estrutura preta parecida com chicote no topo,Pústulas alaranjadas na folha": {
        nome: "Carvão da Cana / Ferrugem",
        emoji: "🍄",
        gravidade: "moderado",
        causes: "Doenças fúngicas favorecidas por umidade, vento ou plantio de toletes doentes.",
        tratamentos: ["Plantio de cultivares imunes ou resistentes", "Tratamento térmico de toletes", "Eliminação de touceiras doentes (roguing)"],
      },
      default: {
        nome: "Sphenophorus levis (Bicudo-da-cana)",
        emoji: "🪲",
        gravidade: "grave",
        causes: "Besouro cuja larva destrói a base dos colmos (rizoma).",
        tratamentos: ["Destruição mecânica da soqueira", "Iscas tóxicas", "Inseticidas de solo na época úmida"],
      },
    },
  },
  {
    id: "mandioca",
    emoji: "🍠",
    nome: "Mandioca / Macaxeira",
    tipo: "alimentar",
    descricao: "Raiz rústica e 100% brasileira, mas muito sensível a apodrecimentos radiculares.",
    fotoRef: "https://images.unsplash.com/photo-1627914092120-00eab868f029?w=600&q=80",
    sintomas: [
      "Folhas devoradas rapidamente",
      "Raízes moles e com mau cheiro",
      "Manchas necróticas pardas nas folhas",
      "Murcha repentina",
      "Folhas menores e com mosaico amarelo",
      "Queda de folhas"
    ],
    diagnosticos: {
      "Folhas devoradas rapidamente,Queda de folhas": {
        nome: "Mandarová-da-Mandioca",
        emoji: "🐛",
        gravidade: "grave",
        causes: "Lagarta com alto poder destrutivo; pode desfolhar a planta inteira em dias.",
        tratamentos: ["Baculovírus erinnyis (controle biológico altamente eficaz)", "Armadilhas luminosas para mariposas", "Inseticidas fisiológicos"],
      },
      "Murcha repentina,Raízes moles e com mau cheiro": {
        nome: "Podridão Radicular",
        emoji: "💧",
        gravidade: "grave",
        causes: "Fungos de solo (Phytophthora / Fusarium), agravado por solo encharcado.",
        tratamentos: ["Plantio em camalhões para melhorar drenagem", "Rotação de culturas", "Evitar áreas de baixada"],
      },
      default: {
        nome: "Mosaico das Nervuras / Bacteriose",
        emoji: "🦠",
        gravidade: "moderado",
        causes: "Virose transmitida por mosca-branca ou bactéria propagada por manivas infectadas.",
        tratamentos: ["Seleção rigorosa de manivas sadias", "Controle do vetor (mosca-branca)", "Variedades tolerantes"],
      },
    },
  },
  {
    id: "cafe", 
    emoji: "☕",
    nome: "Café",
    tipo: "alimentar",
    descricao: "Uma das principais culturas do Brasil, sensível a fungos e variações climáticas.",
    fotoRef: "https://images.unsplash.com/photo-1629157241274-9f8bc3704283?w=600&q=80",
    sintomas: [
      "Manchas alaranjadas nas folhas",
      "Queda prematura de folhas",
      "Frutos murchos",
      "Lesões escuras no caule",
      "Folhas amareladas",
      "Broto morto no topo",
    ],
    diagnosticos: {
      "Manchas alaranjadas nas folhas,Queda prematura de folhas": {
        nome: "Ferrugem do Cafeeiro",
        emoji: "🍂",
        gravidade: "grave",
        causes: "Fungo Hemileia vastatrix, favorecido por umidade alta e temperaturas entre 20–25 °C.",
        tratamentos: ["Fungicidas à base de triazol ou estrobilurina", "Poda de galhos afetados", "Adubação potássica para fortalecer a planta"],
      },
      "Lesões escuras no caule,Broto morto no topo": {
        nome: "Antracnose",
        emoji: "🖤",
        gravidade: "moderado",
        causes: "Fungo Colletotrichum sp., ataca ramos enfraquecidos e ferimentos.",
        tratamentos: ["Remoção e queima de ramos doentes", "Fungicidas cúpricos preventivos", "Melhora na drenagem do solo"],
      },
      default: {
        nome: "Estresse Hídrico / Deficiência Nutricional",
        emoji: "💧",
        gravidade: "leve",
        causes: "Irrigação irregular ou solo com baixo teor de macro e micronutrientes.",
        tratamentos: ["Análise de solo", "Irrigação controlada", "Adubação foliar com quelatos"],
      },
    },
  },
  {
    id: "soja",
    emoji: "🫘",
    nome: "Soja",
    tipo: "alimentar",
    descricao: "Cultura de maior volume exportado pelo Brasil; suscetível a diversas doenças fúngicas.",
    fotoRef: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=600&q=80",
    sintomas: [
      "Pústulas marrons nas folhas",
      "Amarelecimento generalizado",
      "Raízes apodrecidas",
      "Vagens vazias",
      "Manchas cinzas no caule",
      "Desfolha precoce",
    ],
    diagnosticos: {
      "Pústulas marrons nas folhas,Desfolha precoce": {
        nome: "Ferrugem Asiática da Soja",
        emoji: "🟠",
        gravidade: "grave",
        causes: "Fungo Phakopsora pachyrhizi; epidemias rápidas em clima úmido.",
        tratamentos: ["Fungicidas triazóis + estrobilurinas", "Monitoramento semanal", "Cultivares resistentes"],
      },
      "Raízes apodrecidas,Amarelecimento generalizado": {
        nome: "Podridão Radicular (Phytophthora)",
        emoji: "🌱",
        gravidade: "grave",
        causes: "Excesso de água no solo, sementes sem tratamento fungicida.",
        tratamentos: ["Tratamento de sementes com metalaxil", "Drenagem do solo", "Rotação de culturas"],
      },
      default: {
        nome: "Deficiência de Manganês / Nitrogênio",
        emoji: "🟡",
        gravidade: "leve",
        causes: "Solo com pH elevado ou baixa matéria orgânica.",
        tratamentos: ["Calagem e gessagem adequadas", "Adubação nitrogenada de cobertura", "Análise foliar"],
      },
    },
  },
  {
    id: "milho",
    emoji: "🌽",
    nome: "Milho",
    tipo: "alimentar",
    descricao: "Base da alimentação humana e animal; atacado por pragas e doenças foliares.",
    fotoRef: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80",
    sintomas: [
      "Fileiras de ovos nas folhas",
      "Folhas com listras brancas",
      "Espigas sem grãos",
      "Furos no colmo",
      "Manchas necróticas",
      "Pó roxo nas folhas",
    ],
    diagnosticos: {
      "Fileiras de ovos nas folhas,Furos no colmo": {
        nome: "Lagarta-do-cartucho (Spodoptera frugiperda)",
        emoji: "🐛",
        gravidade: "grave",
        causes: "Mariposa noturna; larvas destroem folhas novas e perfuram o colmo.",
        tratamentos: ["Inseticidas Bt (biológico)", "Monitoramento pré-emergência", "Inimigos naturais (Trichogramma)"],
      },
      "Pó roxo nas folhas,Manchas necróticas": {
        nome: "Helmintosporiose",
        emoji: "🍃",
        gravidade: "moderado",
        causes: "Fungo Exserohilum turcicum; favorecido por clima úmido e temperatura amena.",
        tratamentos: ["Fungicidas preventivos na fase vegetativa", "Cultivares tolerantes", "Adubação equilibrada"],
      },
      default: {
        nome: "Deficiência de Zinco",
        emoji: "🟤",
        gravidade: "leve",
        causes: "Solos arenosos ou com pH acima de 6,5 limitam absorção de zinco.",
        tratamentos: ["Sulfato de zinco via foliar", "Correção de pH", "Adubação orgânica"],
      },
    },
  },
  {
    id: "tomate",
    emoji: "🍅",
    nome: "Tomate",
    tipo: "horta",
    descricao: "Hortaliça de alto valor; extremamente sensível a viroses e fungos do solo.",
    fotoRef: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=80",
    sintomas: [
      "Folhas com mosaico amarelo",
      "Frutos com manchas escuras",
      "Murcha repentina",
      "Podridão apical nos frutos",
      "Folhas enroladas",
      "Raízes com galhas",
    ],
    diagnosticos: {
      "Folhas com mosaico amarelo,Folhas enroladas": {
        nome: "Vírus do Mosaico do Tomateiro (ToMV)",
        emoji: "🦠",
        gravidade: "grave",
        causes: "Transmitido mecanicamente e por pulgões; sem cura química.",
        tratamentos: ["Eliminação de plantas doentes", "Controle de pulgões vetores", "Sementes certificadas e livre de vírus"],
      },
      "Raízes com galhas,Murcha repentina": {
        nome: "Nematoide-das-Galhas (Meloidogyne spp.)",
        emoji: "🪱",
        gravidade: "grave",
        causes: "Solo infestado com nematoides que bloqueiam absorção de água e nutrientes.",
        tratamentos: ["Solarização do solo", "Nematicidas biológicos (Purpureocillium)", "Rotação com crotalária"],
      },
      default: {
        nome: "Podridão Apical (Blossom-End Rot)",
        emoji: "⚫",
        gravidade: "moderado",
        causes: "Deficiência de cálcio, geralmente por irrigação irregular.",
        tratamentos: ["Irrigação uniforme e constante", "Aplicação foliar de cálcio", "Mulching para retenção de umidade"],
      },
    },
  },
  {
    id: "banana",
    emoji: "🍌",
    nome: "Banana",
    tipo: "fruta",
    descricao: "Fruta tropical amplamente cultivada; vulnerável ao mal-do-Panamá e sigatoka.",
    fotoRef: "https://images.unsplash.com/photo-1566393028639-d108a42c46a7?w=600&q=80",
    sintomas: [
      "Folhas com listras amarelas",
      "Pseudocaule com manchas escuras",
      "Frutos com podridão",
      "Planta tombada",
      "Folhas necróticas nas bordas",
      "Cachos pequenos",
    ],
    diagnosticos: {
      "Folhas com listras amarelas,Folhas necróticas nas bordas": {
        nome: "Sigatoka-Negra",
        emoji: "🖤",
        gravidade: "grave",
        causes: "Fungo Mycosphaerella fijiensis; afeta fotossíntese e reduz produção em até 50%.",
        tratamentos: ["Fungicidas sistêmicos em rotação", "Remoção de folhas afetadas", "Cultivares resistentes (BRS Vitória)"],
      },
      "Pseudocaule com manchas escuras,Planta tombada": {
        nome: "Mal-do-Panamá (Fusarium oxysporum)",
        emoji: "☠️",
        gravidade: "grave",
        causes: "Fungo de solo sem controle químico eficaz; persiste por décadas.",
        tratamentos: ["Eliminação e quarentena das plantas", "Uso de mudas certificadas", "Replantio com cultivares resistentes (Prata-Anã resistente)"],
      },
      default: {
        nome: "Broca da Bananeira (Cosmopolites sordidus)",
        emoji: "🐞",
        gravidade: "moderado",
        causes: "Besouro que perfura o rizoma, reduzindo vigor da planta.",
        tratamentos: ["Iscas com pedaços de pseudocaule", "Inseticidas biológicos", "Eliminação de restos culturais"],
      },
    },
  },
];

const catalogoCompleto = [
  {
    emoji: "☕", nome: "Café", tipo: "alimentar",
    desc: "A bebida do Brasil. Requer clima ameno e solo bem drenado.",
    pragas: [
      {nome: "Ferrugem", controle: "Fungicidas cúpricos e sistêmicos em rotação, poda de ramos afetados, adubação potássica para fortalecer a planta e quebra-ventos para reduzir umidade foliar."},
      {nome: "Broca-do-café", controle: "Monitoramento com armadilhas, controle biológico com Beauveria bassiana, colheita bem feita para não deixar frutos no chão e inseticidas específicos no período crítico."},
      {nome: "Bicho-mineiro", controle: "Inseticidas seletivos, preservação de inimigos naturais como vespas parasitoides, e adubação equilibrada para manter planta vigorosa."}
    ],
  },
  {
    emoji: "🫘", nome: "Soja", tipo: "alimentar",
    desc: "Oleaginosa mais exportada do mundo; ciclo de 90–150 dias.",
    pragas: [
      {nome: "Ferrugem Asiática", controle: "Fungicidas triazóis + estrobilurinas em rotação de modos de ação, monitoramento semanal a partir do fechamento das linhas e uso de cultivares com genes de resistência."},
      {nome: "Lagarta-da-soja", controle: "Inseticidas biológicos (Bt), controle biológico com Trichogramma, monitoramento de ovos e lagartas pequenas, e preservação de inimigos naturais."},
      {nome: "Percevejo", controle: "Inseticidas específicos na fase reprodutiva (R5-R6), monitoramento com pano de batida, e controle antes do enchimento de grãos para evitar danos."}
    ],
  },
  {
    emoji: "🌽", nome: "Milho", tipo: "alimentar",
    desc: "Cultura estratégica para alimentação humana e ração animal.",
    pragas: [
      {nome: "Lagarta-do-cartucho", controle: "Tecnologia Bt (milho geneticamente modificado), inseticidas fisiológicos (teflubenzuron), monitoramento de posturas, e liberação de Trichogramma para parasitismo de ovos."},
      {nome: "Cigarrinha", controle: "Inseticidas neonicotinoides no tratamento de sementes, eliminação de plantas voluntárias (tigueras), e rotação de culturas para quebrar o ciclo."},
      {nome: "Helmintosporiose", controle: "Fungicidas preventivos na fase vegetativa (V8-V10), cultivares tolerantes, adubação nitrogenada equilibrada e eliminação de restos culturais."}
    ],
  },
  {
    emoji: "🌾", nome: "Arroz", tipo: "alimentar",
    desc: "Cultivado em várzeas e terras altas; base alimentar do brasileiro.",
    pragas: [
      {nome: "Brusone", controle: "Fungicidas triazóis na fase reprodutiva (início de panícula), cultivares resistentes, manejo adequado de nitrogênio (evitar excesso), e tratamento de sementes."},
      {nome: "Percevejo-do-colmo", controle: "Inseticidas na fase de perfilhamento, monitoramento semanal, e preservação de áreas naturais para inimigos naturais."},
      {nome: "Mancha-parda", controle: "Fungicidas preventivos, equilíbrio nutricional (especialmente potássio e silício), rotação de culturas e tratamento de sementes."}
    ],
  },
  {
    emoji: "🌱", nome: "Feijão", tipo: "alimentar",
    desc: "Leguminosa rica em proteína, cultivada em todo o território.",
    pragas: [
      {nome: "Mosca-branca", controle: "Inseticidas específicos (neonicotinoides), óleo mineral para asfixia, controle biológico com Encarsia formosa, e eliminação de plantas daninhas hospedeiras."},
      {nome: "Antracnose", controle: "Fungicidas cúpricos preventivos, sementes certificadas e tratadas, rotação de culturas por 2-3 anos, e eliminação de restos culturais."},
      {nome: "Mancha-angular", controle: "Fungicidas preventivos (mancozeb, clorotalonil), evitar irrigação por aspersão, espaçamento adequado para ventilação, e cultivares resistentes."}
    ],
  },
  {
    emoji: "🍌", nome: "Banana", tipo: "fruta",
    desc: "Fruta tropical de alto consumo; exige temperatura acima de 18 °C.",
    pragas: [
      {nome: "Sigatoka-negra", controle: "Fungicidas sistêmicos (triazóis) em rotação, eliminação semanal de folhas doentes, adubação potássica, e uso de cultivares resistentes como BRS Vitória."},
      {nome: "Mal-do-Panamá", controle: "Não há controle químico eficaz; usar mudas certificadas de viveiro, eliminar plantas doentes com quarentena, solarização do solo, e replantio com cultivares resistentes."},
      {nome: "Broca", controle: "Iscas com pedaços de pseudocaule, inseticidas biológicos (Beauveria), eliminação de restos culturais, e monitoramento de adultos."}
    ],
  },
  {
    emoji: "🍊", nome: "Laranja", tipo: "fruta",
    desc: "Principal fruta cítrica do Brasil; sensível ao greening.",
    pragas: [
      {nome: "Greening (HLB)", controle: "Erradicação imediata de plantas doentes (obrigatório por lei), controle rigoroso do psilídeo com inseticidas, uso exclusivo de mudas certificadas de viveiro telado, e eliminação de plantas de citrus abandonadas."},
      {nome: "Mosca-da-fruta", controle: "Coleta e destruição de frutos caídos, iscas tóxicas proteicas, ensacamento de frutos, e liberação de parasitoides como Diachasmimorpha longicaudata."},
      {nome: "Pulgão-preto", controle: "Óleo mineral para asfixia, inseticidas sistêmicos, preservação de joaninhas e sirfídeos (predadores naturais), e controle de formigas que protegem os pulgões."}
    ],
  },
  {
    emoji: "🍇", nome: "Uva", tipo: "fruta",
    desc: "Cultivada no Sul do Brasil; demanda manejo fitossanitário intenso.",
    pragas: [
      {nome: "Míldio", controle: "Fungicidas cúpricos preventivos + sistêmicos (fosfitos, metalaxil), poda verde para aeração, manejo do dossel, e evitar irrigação por aspersão."},
      {nome: "Oídio", controle: "Enxofre em pó ou molhável, fungicidas específicos (tebuconazol, myclobutanil), evitar excesso de nitrogênio, e poda para ventilação."},
      {nome: "Podridão-cinzenta", controle: "Fungicidas específicos (boscalid, fenhexamid), poda de cachos para aeração, evitar ferimentos nos frutos, e colheita no ponto certo."}
    ],
  },
  {
    emoji: "🍓", nome: "Morango", tipo: "fruta",
    desc: "Fruta de ciclo curto de alto valor agregado e demanda constante.",
    pragas: [
      {nome: "Ácaro-rajado", controle: "Acaricidas seletivos, controle biológico com Phytoseiulus persimilis, aumento de umidade relativa, e monitoramento constante."},
      {nome: "Antracnose", controle: "Fungicidas preventivos, mudas sadias certificadas, evitar molhar folhas e frutos, e remoção de frutos doentes."},
      {nome: "Oídio", controle: "Enxofre, fungicidas específicos, boa ventilação em estufas, e evitar excesso de adubação nitrogenada."}
    ],
  },
  {
    emoji: "🥦", nome: "Brócolis", tipo: "horta",
    desc: "Hortaliça crucífera rica em nutrientes; ciclo de 70–90 dias.",
    pragas: [
      {nome: "Traça-das-crucíferas", controle: "Bacillus thuringiensis (Bt), inseticidas fisiológicos, monitoramento de lagartas, e rotação de culturas."},
      {nome: "Pulgão-verde", controle: "Óleo de neem, sabão potássico, preservação de joaninhas e sirfídeos, e controle de formigas."},
      {nome: "Alternária", controle: "Fungicidas cúpricos preventivos, evitar molhar folhas, espaçamento adequado, e rotação com não-crucíferas."}
    ],
  },
  {
    emoji: "🍅", nome: "Tomate", tipo: "horta",
    desc: "Hortaliça de maior renda bruta; manejo fitossanitário intensivo.",
    pragas: [
      {nome: "Traça-do-tomateiro", controle: "Baculovírus spodoptera, feromônios para monitoramento, Bt, e eliminação de frutos e folhas atacadas."},
      {nome: "Requeima", controle: "Fungicidas preventivos (mancozeb, cúpricos), evitar molhar folhas, tutoramento adequado, e cultivares resistentes."},
      {nome: "Nematoide", controle: "Solarização do solo, rotação com crotalária ou mucuna, nematicidas biológicos (Purpureocillium), e uso de porta-enxertos resistentes."}
    ],
  },
  {
    emoji: "🥕", nome: "Cenoura", tipo: "horta",
    desc: "Raiz tuberosa cultivada em solos arenosos e férteis.",
    pragas: [
      {nome: "Queima-das-folhas", controle: "Fungicidas preventivos, rotação de culturas, evitar excesso de umidade foliar, e adubação equilibrada."},
      {nome: "Alternária", controle: "Fungicidas específicos, sementes tratadas, espaçamento adequado para ventilação, e eliminação de restos culturais."},
      {nome: "Mosca-da-cenoura", controle: "Rotação de culturas, cobertura morta, armadilhas adesivas amarelas, e colheita no ponto certo."}
    ],
  },
  {
    emoji: "🎋", nome: "Cana-de-Açúcar", tipo: "alimentar",
    desc: "Principal cultura sucroenergética do país. Exige solos férteis e maquinário pesado.",
    pragas: [
      {nome: "Broca-da-cana", controle: "Controle biológico com vespinha Cotesia flavipes (liberação em campo), parasitoides de ovos (Trichogramma), variedades resistentes, e monitoramento de posturas."},
      {nome: "Cigarrinha-das-raízes", controle: "Inseticidas de solo na época chuvosa, destruição mecânica da soqueira, rotação com amendoim ou crotalária, e variedades resistentes."},
      {nome: "Bicudo (Sphenophorus)", controle: "Destruição da soqueira, iscas tóxicas com pedaços de colmo, inseticidas granulados no sulco de plantio, e monitoramento de adultos."}
    ],
  },
  {
    emoji: "🍠", nome: "Mandioca", tipo: "alimentar",
    desc: "Cultura rústica e essencial para a segurança alimentar, de fácil manejo.",
    pragas: [
      {nome: "Mandarová", controle: "Baculovírus erinnyis (altamente eficaz), controle biológico natural, armadilhas luminosas para mariposas, e inseticidas fisiológicos apenas em infestações severas."},
      {nome: "Mosca-branca", controle: "Inseticidas seletivos, óleo mineral, controle biológico com Encarsia, e eliminação de plantas daninhas hospedeiras."},
      {nome: "Ácaro-verde", controle: "Acaricidas seletivos, aumento de umidade, controle biológico com ácaros predadores, e variedades resistentes."}
    ],
  },
  {
    emoji: "☁️", nome: "Algodão", tipo: "fibra",
    desc: "A pluma de ouro do cerrado. Alta tecnologia e janela de plantio restrita.",
    pragas: [
      {nome: "Bicudo-do-algodoeiro", controle: "Monitoramento rigoroso com armadilhas de feromônio, destruição de restos culturais (obrigatório), janela de aplicação de inseticidas, e variedades transgênicas."},
      {nome: "Lagarta-das-maçãs", controle: "Tecnologia Bt (algodão geneticamente modificado), inseticidas reguladores de crescimento, monitoramento de botões florais, e controle biológico com Trichogramma."},
      {nome: "Pulgão", controle: "Inseticidas seletivos (evitar piretróides), preservação de inimigos naturais (joaninhas, sirfídeos), controle de formigas, e monitoramento semanal."}
    ],
  },
  {
    emoji: "🌾", nome: "Trigo", tipo: "alimentar",
    desc: "Cereal de inverno estratégico, cultivado principalmente na região Sul.",
    pragas: [
      {nome: "Brusone", controle: "Fungicidas triazóis + estrobilurinas no início do florescimento, cultivares resistentes, tratamento de sementes, e evitar excesso de nitrogênio."},
      {nome: "Giberela", controle: "Fungicidas preventivos no início do florescimento, cultivares tolerantes, rotação de culturas, e evitar plantio após milho."},
      {nome: "Ferrugem-da-folha", controle: "Fungicidas triazóis, cultivares resistentes, tratamento de sementes, e monitoramento constante."}
    ],
  },
  {
    emoji: "🍉", nome: "Melancia", tipo: "fruta",
    desc: "Cultivada em clima quente. Rasteira, demanda muita água no envase do fruto.",
    pragas: [
      {nome: "Mosca-minadora", controle: "Inseticidas sistêmicos, armadilhas adesivas amarelas, controle biológico com parasitoides, e eliminação de folhas atacadas."},
      {nome: "Broca-dos-frutos", controle: "Ensacamento dos frutos, coleta e destruição de frutos atacados, inseticidas específicos, e monitoramento de adultos."},
      {nome: "Oídio", controle: "Enxofre, fungicidas específicos, boa ventilação, e evitar excesso de nitrogênio."}
    ],
  },
  {
    emoji: "🥬", nome: "Alface", tipo: "horta",
    desc: "A hortaliça folhosa mais consumida. Produção em campo e hidroponia.",
    pragas: [
      {nome: "Tripes", controle: "Inseticidas seletivos, armadilhas adesivas azuis, controle biológico com Orius, e aumento de umidade relativa."},
      {nome: "Pulgão", controle: "Óleo de neem, sabão potássico, joaninhas, e controle de formigas."},
      {nome: "Míldio", controle: "Fungicidas cúpricos preventivos, evitar molhar folhas, boa ventilação, e irrigação controlada."}
    ],
  },
  {
    emoji: "🫑", nome: "Pimentão", tipo: "horta",
    desc: "Sensível a oscilações térmicas, muito comum o cultivo em estufas (plasticultura).",
    pragas: [
      {nome: "Ácaro-branco", controle: "Acaricidas específicos, aumento de umidade, controle biológico com ácaros predadores, e monitoramento constante."},
      {nome: "Mosca-branca", controle: "Inseticidas seletivos, armadilhas adesivas amarelas, controle biológico com Encarsia, e telas antinseto em estufas."},
      {nome: "Vira-cabeça (Tospovírus)", controle: "Não há cura; controle rigoroso do tripes vetor, eliminação imediata de plantas doentes, mudas sadias, e variedades resistentes."}
    ],
  }
];

/* ── MEMÓRIA RAM DO APP (ESTADO GLOBAL DO BABADO) 🧠 ─ */
let culturaSelecionada = null;
let sintomasSelecionados = [];

/* ── RENDERIZANDO AS PLANTINHAS NA TELA 🌿 ── */
function renderCulturas() {
  const grid = document.getElementById("culturaGrid");
  if (!grid) return;
  grid.innerHTML = "";
  culturas.forEach((c) => {
    const div = document.createElement("div");
    div.className = "cultura-item";
    div.dataset.id = c.id;
    div.innerHTML = `<span class="ci-emoji">${c.emoji}</span><span class="ci-nome">${c.nome}</span>`;
    div.addEventListener("click", () => selecionarCultura(c.id));
    grid.appendChild(div);
  });
}

function selecionarCultura(id) {
  culturaSelecionada = culturas.find((c) => c.id === id);
  sintomasSelecionados = [];

  // Deixando o card clicado com a borda brilhando pq ele merece o glow up ✨
  document.querySelectorAll(".cultura-item").forEach((el) => {
    el.classList.toggle("selected", el.dataset.id === id);
  });

  // Atualiza a fotinho estética pro fazendeiro ver qual planta tá cuidando 📸
  const foto = document.getElementById("fotoReferencia");
  if (foto) foto.src = culturaSelecionada.fotoRef;

  // Limpa as tags antigas caso mude de cultura no meio do caminho
  const visuais = document.getElementById("sintomas-visuais");
  if (visuais) visuais.innerHTML = "";

  // Mostra a lista de desespero (sintomas) da planta selecionada
  renderSintomas();

  // Partiu step 2 pq o agro não para! 🚀
  showStep(2);
}

function renderSintomas() {
  const grid = document.getElementById("sintomasGrid");
  if (!grid || !culturaSelecionada) return;
  grid.innerHTML = "";
  culturaSelecionada.sintomas.forEach((s) => {
    const btn = document.createElement("button");
    btn.className = "sintoma-toggle";
    btn.textContent = s;
    btn.addEventListener("click", () => toggleSintoma(s, btn));
    grid.appendChild(btn);
  });
}

function toggleSintoma(sintoma, btn) {
  const idx = sintomasSelecionados.indexOf(sintoma);
  if (idx === -1) {
    sintomasSelecionados.push(sintoma);
    btn.classList.add("selected");
  } else {
    sintomasSelecionados.splice(idx, 1);
    btn.classList.remove("selected");
  }

  // Tags bonitinhas piscando embaixo da foto pro usuário ver o que já marcou 👀
  const visuais = document.getElementById("sintomas-visuais");
  if (visuais) {
    visuais.innerHTML = sintomasSelecionados
      .map((s) => `<span class="sintoma-badge-visual">${s}</span>`)
      .join("");
  }

  // Desbloqueia o botão de diagnosticar, mas só se tiver pelo menos 1 b.o. marcado mds 🙄
  const btnDiag = document.getElementById("btnDiagnosticar");
  if (btnDiag) btnDiag.disabled = sintomasSelecionados.length === 0;
}

/* ── A HORA DA VERDADE: O ALGORITMO MÁGICO 🔮 ── */
function realizarDiagnostico() {
  if (!culturaSelecionada) return;

  let diag = null;

  // 1. Tenta achar por combinação exata ordenada das duas primeiras escolhas
  const chaveExata = sintomasSelecionados.slice(0, 2).sort().join(",");
  if (culturaSelecionada.diagnosticos[chaveExata]) {
    diag = culturaSelecionada.diagnosticos[chaveExata];
  }

  // 2. CORREÇÃO DO BUG: Se escolheu apenas 1 sintoma, caça qual doença engloba essa característica
  if (!diag && sintomasSelecionados.length > 0) {
    const chavesDiagnostico = Object.keys(culturaSelecionada.diagnosticos);
    const chaveEncontrada = chavesDiagnostico.find((k) => 
      sintomasSelecionados.some((s) => k.includes(s))
    );
    if (chaveEncontrada) {
      diag = culturaSelecionada.diagnosticos[chaveEncontrada];
    }
  }

  // 3. Fallback pro default caso seja um sintoma aleatório não mapeado
  if (!diag) {
    diag = culturaSelecionada.diagnosticos["default"];
  }

  const cont = document.getElementById("resultadoContent");
  if (!cont) return;

  const gravLabel = { grave: "🔴 Grave (Socorro!)", moderado: "🟠 Moderado", leve: "🟡 Leve (Suave)", saudavel: "✅ Saudável (Zero Defeitos)" };

  // Injetando o veredito final com puro HTML na tela do coitado do user
  cont.innerHTML = `
    <div class="resultado-card ${diag.gravidade}">
      <div class="res-header">
        <span class="res-emoji">${diag.emoji}</span>
        <span class="res-nome">${diag.nome}</span>
        <span class="res-gravidade">${gravLabel[diag.gravidade] || diag.gravidade}</span>
      </div>
      <div class="res-info">
        <div class="res-bloco">
          <h5>Cultura Afetada</h5>
          <p>${culturaSelecionada.emoji} ${culturaSelecionada.nome}</p>
        </div>
        <div class="res-bloco">
          <h5>Sintomas Observados</h5>
          <p>${sintomasSelecionados.join(", ")}</p>
        </div>
        <div class="res-bloco">
          <h5>Causas Prováveis</h5>
          <p>${diag.causes}</p>
        </div>
        <div class="res-bloco">
          <h5>Tratamentos Recomendados</h5>
          <ul>${diag.tratamentos.map((t) => `<li>${t}</li>`).join("")}</ul>
        </div>
      </div>
    </div>
    <div class="resultado-card saudavel" style="margin-top:16px">
      <div class="res-header">
        <span class="res-emoji">👨‍🌾</span>
        <span class="res-nome">Próximos Passos (Sem moscá hein!)</span>
      </div>
      <div class="res-info">
        <div class="res-bloco">
          <h5>Monitoramento</h5>
          <p>Retorne em 7 dias para verificar a evolução após o tratamento.</p>
        </div>
        <div class="res-bloco">
          <h5>Profissional</h5>
          <p>Para casos graves, consulte um Engenheiro Agrônomo credenciado no CREA.</p>
        </div>
        <button class="btn-outline" id="btnNovaAnalise" style="margin-top: 15px; width: 100%; border-color: var(--primary); color: #fff; padding: 10px; cursor: pointer; border-radius: 25px; background: transparent;">🔄 Realizar Nova Análise (Mudar Planta)</button>
      </div>
    </div>
  `;

  // Listener do botão de reset total no passo 3
  document.getElementById("btnNovaAnalise")?.addEventListener("click", () => {
    culturaSelecionada = null;
    sintomasSelecionados = [];
    document.querySelectorAll(".cultura-item").forEach((el) => el.classList.remove("selected"));
    showStep(1);
  });

  // Avança pro Step 3 e mostra o veredito final!
  showStep(3);
}

function showStep(num) {
  // Esconde todos os passos e foca só no que a gente quer, bem clean 😌
  document.querySelectorAll(".diag-step").forEach((el) => el.classList.remove("active"));
  const step = document.getElementById("step" + num);
  if (step) step.classList.add("active");
}

/* ── FILTRANDO OS PRODUTOS DO CATÁLOGO PRA NÃO FICAR FLOPADO 🛒 ─ */
function renderCatalogo(filtro = "todos") {
  const grid = document.getElementById("catalogoGrid");
  if (!grid) return;
  grid.innerHTML = "";
  const lista = filtro === "todos" ? catalogoCompleto : catalogoCompleto.filter((c) => c.tipo === filtro);

  lista.forEach((item) => {
    const card = document.createElement("div");
    card.className = "cat-card";
    card.innerHTML = `
      <div class="cat-img">${item.emoji}</div>
      <div class="cat-body">
        <h4>${item.nome}</h4>
        <span class="cat-tipo">${item.tipo}</span>
        <p>${item.desc}</p>
        <div class="cat-pragas">
          ${item.pragas.map((p) => `<span class="cat-praga-tag">${p.nome || p}</span>`).join("")}
        </div>
      </div>
    `;
    card.addEventListener("click", () => abrirModal(item));
    grid.appendChild(card);
  });
}

function abrirModal(item) {
  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("modalContent");
  if (!overlay || !content) return;

  // Abre o pop-up estourando conteúdo foda na cara do user
  content.innerHTML = `
    <span class="modal-emoji">${item.emoji}</span>
    <h2 class="modal-titulo">${item.nome}</h2>
    <p class="modal-tipo">${item.tipo}</p>
    <p class="modal-desc">${item.desc}</p>
    <div class="modal-section">
      <h5>Principais Ameaças (Gatilho! 💀)</h5>
      <div class="modal-pragas-lista">
        ${item.pragas.map((p) => {
          const nomePraga = p.nome || p;
          const controle = p.controle || "Combine manejo cultural, controle biológico e químico conforme necessidade.";
          return `
          <div class="modal-praga-item">
            <h6>⚠️ ${nomePraga}</h6>
            <p>Praga/doença de ocorrência frequente nesta cultura. Monitoramento contínuo é essencial.</p>
            <div class="modal-praga-sol">
              <strong>💡 Controle Integrado:</strong>
              <span>${controle}</span>
            </div>
          </div>
        `}).join("")}
      </div>
    </div>
    <div class="modal-section">
      <h5>Boas Práticas (Custa nada fazer né!)</h5>
      <ul>
        <li>Monitorar lavoura semanalmente</li>
        <li>Realizar análise de solo anualmente</li>
        <li>Usar sementes certificadas e tratadas</li>
        <li>Registrar todas as atividades no aplicativo</li>
      </ul>
    </div>
  `;

  overlay.classList.add("open");
}

function fecharModal() {
  const overlay = document.getElementById("modalOverlay");
  if (overlay) overlay.classList.remove("open");
}

/* ── ANIMAÇÕES DE SCROLL (PRO SITE FICAR CHIQUE) 🌟 ─ */
function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("show"); }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal, .reveal-right").forEach((el) => obs.observe(el));
}

/* ── NAVBAR COM EFEITO DE VIDRO TRANSLÚCIDO 🧼 ── */
function initNavbar() {
  const nav = document.getElementById("navbar");
  const ham = document.getElementById("hamburger");
  const links = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    // Muda a opacidade da barra quando rola pra baixo, puro luxo
    if (nav) nav.style.background =
      window.scrollY > 40
        ? "rgba(10,26,14,0.97)"
        : "rgba(10,26,14,0.85)";

    // Botão de voltar pro topo aparece se o user descer demais
    const btn = document.getElementById("backToTop");
    if (btn) btn.classList.toggle("show-btn", window.scrollY > 400);
  });

  // Menu responsivo abrindo e fechando na força do ódio no mobile
  if (ham && links) {
    ham.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }
}

/* ── ESCUTADORES DE EVENTO DOS BOTÕES DE FILTRO 📣 ─ */
function initFiltros() {
  document.querySelectorAll(".filtro-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filtro-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCatalogo(btn.dataset.filtro);
    });
  });
}

function initDiagnosticarBtn() {
  const btn = document.getElementById("btnDiagnosticar");
  if (btn) btn.addEventListener("click", realizarDiagnostico);

  // Botão de voltar pro passo anterior (Passo 2) caso queira mudar sintomas
  const voltar = document.getElementById("btnVoltar");
  if (voltar) voltar.addEventListener("click", () => showStep(2));

  // INJEÇÃO DINÂMICA DO BOTÃO VOLTAR PARA PASSO 1 (Evita mexer no HTML estrutural)
  const step2 = document.getElementById("step2");
  if (step2) {
    const btnMudarCultura = document.createElement("button");
    btnMudarCultura.id = "btnVoltarPasso1";
    btnMudarCultura.innerHTML = "← Voltar e Escolher Outra Planta";
    btnMudarCultura.style.cssText = "margin-bottom: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 10px 16px; border-radius: 25px; cursor: pointer; font-weight: 500; display: block; transition: all 0.2s;";
    
    btnMudarCultura.addEventListener("mouseenter", () => btnMudarCultura.style.background = "rgba(255,255,255,0.1)");
    btnMudarCultura.addEventListener("mouseleave", () => btnMudarCultura.style.background = "rgba(255,255,255,0.05)");
    btnMudarCultura.addEventListener("click", () => {
      culturaSelecionada = null;
      sintomasSelecionados = [];
      document.querySelectorAll(".cultura-item").forEach((el) => el.classList.remove("selected"));
      showStep(1);
    });

    step2.insertBefore(btnMudarCultura, step2.firstChild);
  }
}

function initModal() {
  document.getElementById("modalClose")?.addEventListener("click", fecharModal);
  document.getElementById("modalOverlay")?.addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") fecharModal();
  });
}

/* ── STARTANDO TUDO JUNTO E MISTURADO 🎬 ── */
document.addEventListener("DOMContentLoaded", () => {
  renderCulturas();
  renderCatalogo();
  initReveal();
  initNavbar();
  initFiltros();
  initDiagnosticarBtn();
  initModal();
  // Literalmente sem bugar nada, amém! 🤍
});