/* ============================================================
   AgroInteligente – app.js
   Diagnóstico por IA, Catálogo e Interatividade
   Estrutura:
     1. DADOS         – culturas e catálogo
     2. ESTADO        – variáveis globais do app
     3. DIAGNÓSTICO   – renderização e lógica dos passos
     4. CATÁLOGO      – grid, filtros e modal
     5. UI            – navbar, reveal, contadores, "mostrar mais"
     6. INIT          – inicialização geral
============================================================ */


/* ============================================================
   1. DADOS
   Arrays que alimentam o diagnóstico e o catálogo.
   Cada cultura tem: id, emoji, nome, tipo, fotoRef,
   sintomas[] e diagnosticos{}.
============================================================ */

const culturas = [
  {
    id: "algodao", emoji: "☁️", nome: "Algodão", tipo: "fibra",
    descricao: "Cultura de alto valor tecnológico. Principal praga: Bicudo-do-algodoeiro.",
    fotoRef: "https://s2.glbimg.com/xpvhkC5uyFvA2cwLZmWwOYBlGhY=/e.glbimg.com/og/ed/f/original/2022/09/29/img_0142.jpg",
    sintomas: [
      "Furos nos botões florais com queda","Manchas angulares nas folhas",
      "Folhas com pó branco ou teia fina","Lagartas devorando folhas",
      "Manchas marrons circulares nas folhas","Plantas murchas com raízes podres"
    ],
    diagnosticos: {
      "Furos nos botões florais com queda": {
        nome:"Bicudo-do-Algodoeiro", emoji:"🪲", gravidade:"grave",
        causes:"Anthonomus grandis. O adulto perfura botões e a larva destrói o interior.",
        tratamentos:["Monitoramento com armadilhas","Inseticidas específicos em janela de aplicação","Destruir restos culturais"]
      },
      "Manchas angulares nas folhas,Manchas marrons circulares nas folhas": {
        nome:"Mancha Angular / Ramulária", emoji:"🍂", gravidade:"grave",
        causes:"Bactéria Xanthomonas ou fungo Ramularia areola.",
        tratamentos:["Fungicidas/bactericidas preventivos","Variedades resistentes","Boa circulação de ar"]
      },
      "Folhas com pó branco ou teia fina": {
        nome:"Ácaro-Rajado", emoji:"🕷️", gravidade:"moderado",
        causes:"Tetranychus urticae – favorecido por clima seco e quente.",
        tratamentos:["Acaricidas seletivos","Predadores naturais","Irrigação por aspersão"]
      },
      default: {
        nome:"Lagarta-do-Cartucho", emoji:"🐛", gravidade:"grave",
        causes:"Spodoptera frugiperda.",
        tratamentos:["Inseticidas Bt","Controle biológico","Monitoramento de ovos"]
      }
    }
  },
  {
    id: "arroz", emoji: "🌾", nome: "Arroz", tipo: "alimentar",
    descricao: "Principal cereal do Brasil. Brusone é a doença mais temida.",
    fotoRef: "https://blog.mfrural.com.br/wp-content/uploads/2023/07/plantacao-arroz-capa-1024x620.jpg.webp",
    sintomas: [
      "Manchas necróticas com halo amarelo nas folhas","Lesões nas panículas (espigas vazias)",
      "Manchas pardas ovais nas folhas","Folhas com escaldadura (queimadas)",
      "Perfurações no colmo","Plantas murchas"
    ],
    diagnosticos: {
      "Manchas necróticas com halo amarelo nas folhas,Lesões nas panículas (espigas vazias)": {
        nome:"Brusone", emoji:"🍄", gravidade:"grave",
        causes:"Fungo Magnaporthe oryzae.",
        tratamentos:["Fungicidas triazóis na fase reprodutiva","Cultivares resistentes","Manejo de nitrogênio"]
      },
      "Manchas pardas ovais nas folhas": {
        nome:"Mancha Parda", emoji:"🟫", gravidade:"moderado",
        causes:"Bipolaris oryzae.",
        tratamentos:["Fungicidas preventivos","Equilíbrio nutricional","Rotação de culturas"]
      },
      default: {
        nome:"Percevejo-do-Colmo", emoji:"🐞", gravidade:"moderado",
        causes:"Tibraca limbativentris.",
        tratamentos:["Inseticidas na fase de perfilhamento","Preservação de inimigos naturais"]
      }
    }
  },
  {
    id: "feijao", emoji: "🌱", nome: "Feijão", tipo: "alimentar",
    descricao: "Cultura de alto risco fitossanitário, especialmente viroses.",
    fotoRef: "https://www.floralondrina.com.br/img/products/muda-de-inga-feijao-inga-marginata_1_1200.jpg",
    sintomas: [
      "Folhas com mosaico dourado","Manchas angulares nas folhas",
      "Lesões encharcadas nos caules e vagens","Plantas murchas com raízes podres",
      "Pó branco nas folhas","Vagens deformadas"
    ],
    diagnosticos: {
      "Folhas com mosaico dourado": {
        nome:"Mosaico Dourado", emoji:"🟨", gravidade:"grave",
        causes:"Bean Golden Mosaic Virus (transmitido por mosca-branca).",
        tratamentos:["Controle rigoroso da mosca-branca","Eliminação de plantas doentes","Variedades resistentes"]
      },
      "Manchas angulares nas folhas": {
        nome:"Mancha Angular", emoji:"🔶", gravidade:"moderado",
        causes:"Pseudocercospora griseola.",
        tratamentos:["Fungicidas preventivos","Rotação de culturas","Evitar molhar folhas"]
      },
      "Plantas murchas com raízes podres": {
        nome:"Mofo Branco / Podridão Radicular", emoji:"☠️", gravidade:"grave",
        causes:"Sclerotinia ou Fusarium.",
        tratamentos:["Solarização","Tratamento de sementes","Melhor drenagem"]
      },
      default: {
        nome:"Ferrugem do Feijoeiro", emoji:"🟠", gravidade:"moderado",
        causes:"Uromyces appendiculatus.",
        tratamentos:["Fungicidas à base de triazol","Cultivares resistentes"]
      }
    }
  },
  {
    id: "uva", emoji: "🍇", nome: "Uva", tipo: "fruta",
    descricao: "Exige manejo fitossanitário intenso, especialmente em regiões úmidas.",
    fotoRef: "https://stacatarina.mx/consejos/wp-content/uploads/2025/09/1757503172_Italia-Regina-Red-Globe-Victoria-%C2%BFQue-variedad-de-uvas-elegir.jpg",
    sintomas: [
      "Manchas oleosas na face inferior das folhas","Pó branco nas folhas e cachos",
      "Lesões escuras tipo 'olho de passarinho'","Podridão cinzenta nos cachos",
      "Folhas amarelecidas com nervuras verdes","Cachos murchos"
    ],
    diagnosticos: {
      "Manchas oleosas na face inferior das folhas": {
        nome:"Míldio da Videira", emoji:"🌧️", gravidade:"grave",
        causes:"Plasmopara viticola.",
        tratamentos:["Fungicidas cúpricos + sistêmicos","Poda verde","Boa aeração do dossel"]
      },
      "Pó branco nas folhas e cachos": {
        nome:"Oídio", emoji:"⬜", gravidade:"grave",
        causes:"Uncinula necator.",
        tratamentos:["Enxofre ou fungicidas específicos","Evitar excesso de vigor"]
      },
      default: {
        nome:"Antracnose (Olho de Passarinho)", emoji:"⚫", gravidade:"moderado",
        causes:"Elsinoe ampelina.",
        tratamentos:["Fungicidas preventivos","Remoção de restos culturais"]
      }
    }
  },
  {
    id: "laranja", emoji: "🍊", nome: "Laranja", tipo: "fruta",
    descricao: "Pilar da citricultura brasileira; o controle do Greening é o maior desafio atual.",
    fotoRef: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=600&q=80",
    sintomas: [
      "Folhas com manchas amareladas assimétricas","Frutos pequenos e deformados",
      "Queda prematura de frutos","Lesões em relevo (casca grossa) nas folhas",
      "Presença de insetos pretos nos brotos","Folhas enroladas com fuligem preta"
    ],
    diagnosticos: {
      "Folhas com manchas amareladas assimétricas,Frutos pequenos e deformados": {
        nome:"Greening (HLB)", emoji:"🦠", gravidade:"grave",
        causes:"Bactéria Candidatus Liberibacter, transmitida pelo inseto Psilídeo.",
        tratamentos:["Erradicação da planta doente (obrigatório)","Controle rigoroso do Psilídeo com inseticidas","Uso de mudas sadias de viveiros telados"]
      },
      "Folhas enroladas com fuligem preta,Presença de insetos pretos nos brotos": {
        nome:"Pulgão-preto e Fumagina", emoji:"🪲", gravidade:"moderado",
        causes:"Pulgões sugam a seiva e excretam substância doce que atrai fungo (fumagina).",
        tratamentos:["Aplicação de óleo mineral","Inseticidas sistêmicos","Preservação de joaninhas (predadores naturais)"]
      },
      default: {
        nome:"Cancro Cítrico", emoji:"🍂", gravidade:"grave",
        causes:"Bactéria Xanthomonas citri; entra por ferimentos e é espalhada por chuva e vento.",
        tratamentos:["Pulverizações preventivas com cobre","Quebra-ventos na lavoura","Desinfecção de caixas e tesouras de poda"]
      }
    }
  },
  {
    id: "cana", emoji: "🎋", nome: "Cana-de-Açúcar", tipo: "alimentar",
    descricao: "Base da nossa bioenergia e açúcar. Sofre com brocas e pragas de solo.",
    fotoRef: "https://images.unsplash.com/photo-1590005085374-2976be0d5884?w=600&q=80",
    sintomas: [
      "Orifícios no colmo com serragem","Morte do broto apical (coração morto)",
      "Pústulas alaranjadas na folha","Estrutura preta parecida com chicote no topo",
      "Amarelecimento e secamento","Raízes danificadas"
    ],
    diagnosticos: {
      "Morte do broto apical (coração morto),Orifícios no colmo com serragem": {
        nome:"Broca-da-Cana (Diatraea saccharalis)", emoji:"🐛", gravidade:"grave",
        causes:"Lagarta perfura o colmo, permitindo entrada de fungos que reduzem açúcar.",
        tratamentos:["Controle biológico com vespinha (Cotesia flavipes)","Inseticidas fisiológicos","Variedades resistentes"]
      },
      "Estrutura preta parecida com chicote no topo,Pústulas alaranjadas na folha": {
        nome:"Carvão da Cana / Ferrugem", emoji:"🍄", gravidade:"moderado",
        causes:"Doenças fúngicas favorecidas por umidade, vento ou plantio de toletes doentes.",
        tratamentos:["Plantio de cultivares imunes ou resistentes","Tratamento térmico de toletes","Eliminação de touceiras doentes (roguing)"]
      },
      default: {
        nome:"Sphenophorus levis (Bicudo-da-cana)", emoji:"🪲", gravidade:"grave",
        causes:"Besouro cuja larva destrói a base dos colmos (rizoma).",
        tratamentos:["Destruição mecânica da soqueira","Iscas tóxicas","Inseticidas de solo na época úmida"]
      }
    }
  },
  {
    id: "mandioca", emoji: "🍠", nome: "Mandioca / Macaxeira", tipo: "alimentar",
    descricao: "Raiz rústica e 100% brasileira, mas muito sensível a apodrecimentos radiculares.",
    fotoRef: "https://images.unsplash.com/photo-1627914092120-00eab868f029?w=600&q=80",
    sintomas: [
      "Folhas devoradas rapidamente","Raízes moles e com mau cheiro",
      "Manchas necróticas pardas nas folhas","Murcha repentina",
      "Folhas menores e com mosaico amarelo","Queda de folhas"
    ],
    diagnosticos: {
      "Folhas devoradas rapidamente,Queda de folhas": {
        nome:"Mandarová-da-Mandioca", emoji:"🐛", gravidade:"grave",
        causes:"Lagarta com alto poder destrutivo; pode desfolhar a planta inteira em dias.",
        tratamentos:["Baculovírus erinnyis (controle biológico altamente eficaz)","Armadilhas luminosas para mariposas","Inseticidas fisiológicos"]
      },
      "Murcha repentina,Raízes moles e com mau cheiro": {
        nome:"Podridão Radicular", emoji:"💧", gravidade:"grave",
        causes:"Fungos de solo (Phytophthora / Fusarium), agravado por solo encharcado.",
        tratamentos:["Plantio em camalhões para melhorar drenagem","Rotação de culturas","Evitar áreas de baixada"]
      },
      default: {
        nome:"Mosaico das Nervuras / Bacteriose", emoji:"🦠", gravidade:"moderado",
        causes:"Virose transmitida por mosca-branca ou bactéria propagada por manivas infectadas.",
        tratamentos:["Seleção rigorosa de manivas sadias","Controle do vetor (mosca-branca)","Variedades tolerantes"]
      }
    }
  },
  {
    id: "cafe", emoji: "☕", nome: "Café", tipo: "alimentar",
    descricao: "Uma das principais culturas do Brasil, sensível a fungos e variações climáticas.",
    fotoRef: "https://images.unsplash.com/photo-1629157241274-9f8bc3704283?w=600&q=80",
    sintomas: [
      "Manchas alaranjadas nas folhas","Queda prematura de folhas",
      "Frutos murchos","Lesões escuras no caule",
      "Folhas amareladas","Broto morto no topo"
    ],
    diagnosticos: {
      "Manchas alaranjadas nas folhas,Queda prematura de folhas": {
        nome:"Ferrugem do Cafeeiro", emoji:"🍂", gravidade:"grave",
        causes:"Fungo Hemileia vastatrix, favorecido por umidade alta e temperaturas entre 20–25 °C.",
        tratamentos:["Fungicidas à base de triazol ou estrobilurina","Poda de galhos afetados","Adubação potássica para fortalecer a planta"]
      },
      "Lesões escuras no caule,Broto morto no topo": {
        nome:"Antracnose", emoji:"🖤", gravidade:"moderado",
        causes:"Fungo Colletotrichum sp., ataca ramos enfraquecidos e ferimentos.",
        tratamentos:["Remoção e queima de ramos doentes","Fungicidas cúpricos preventivos","Melhora na drenagem do solo"]
      },
      default: {
        nome:"Estresse Hídrico / Deficiência Nutricional", emoji:"💧", gravidade:"leve",
        causes:"Irrigação irregular ou solo com baixo teor de macro e micronutrientes.",
        tratamentos:["Análise de solo","Irrigação controlada","Adubação foliar com quelatos"]
      }
    }
  },
  {
    id: "soja", emoji: "🫘", nome: "Soja", tipo: "alimentar",
    descricao: "Cultura de maior volume exportado pelo Brasil; suscetível a diversas doenças fúngicas.",
    fotoRef: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=600&q=80",
    sintomas: [
      "Pústulas marrons nas folhas","Amarelecimento generalizado",
      "Raízes apodrecidas","Vagens vazias",
      "Manchas cinzas no caule","Desfolha precoce"
    ],
    diagnosticos: {
      "Pústulas marrons nas folhas,Desfolha precoce": {
        nome:"Ferrugem Asiática da Soja", emoji:"🟠", gravidade:"grave",
        causes:"Fungo Phakopsora pachyrhizi; epidemias rápidas em clima úmido.",
        tratamentos:["Fungicidas triazóis + estrobilurinas","Monitoramento semanal","Cultivares resistentes"]
      },
      "Raízes apodrecidas,Amarelecimento generalizado": {
        nome:"Podridão Radicular (Phytophthora)", emoji:"🌱", gravidade:"grave",
        causes:"Excesso de água no solo, sementes sem tratamento fungicida.",
        tratamentos:["Tratamento de sementes com metalaxil","Drenagem do solo","Rotação de culturas"]
      },
      default: {
        nome:"Deficiência de Manganês / Nitrogênio", emoji:"🟡", gravidade:"leve",
        causes:"Solo com pH elevado ou baixa matéria orgânica.",
        tratamentos:["Calagem e gessagem adequadas","Adubação nitrogenada de cobertura","Análise foliar"]
      }
    }
  },
  {
    id: "milho", emoji: "🌽", nome: "Milho", tipo: "alimentar",
    descricao: "Base da alimentação humana e animal; atacado por pragas e doenças foliares.",
    fotoRef: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80",
    sintomas: [
      "Fileiras de ovos nas folhas","Folhas com listras brancas",
      "Espigas sem grãos","Furos no colmo",
      "Manchas necróticas","Pó roxo nas folhas"
    ],
    diagnosticos: {
      "Fileiras de ovos nas folhas,Furos no colmo": {
        nome:"Lagarta-do-cartucho (Spodoptera frugiperda)", emoji:"🐛", gravidade:"grave",
        causes:"Mariposa noturna; larvas destroem folhas novas e perfuram o colmo.",
        tratamentos:["Inseticidas Bt (biológico)","Monitoramento pré-emergência","Inimigos naturais (Trichogramma)"]
      },
      "Pó roxo nas folhas,Manchas necróticas": {
        nome:"Helmintosporiose", emoji:"🍃", gravidade:"moderado",
        causes:"Fungo Exserohilum turcicum; favorecido por clima úmido e temperatura amena.",
        tratamentos:["Fungicidas preventivos na fase vegetativa","Cultivares tolerantes","Adubação equilibrada"]
      },
      default: {
        nome:"Deficiência de Zinco", emoji:"🟤", gravidade:"leve",
        causes:"Solos arenosos ou com pH acima de 6,5 limitam absorção de zinco.",
        tratamentos:["Sulfato de zinco via foliar","Correção de pH","Adubação orgânica"]
      }
    }
  },
  {
    id: "tomate", emoji: "🍅", nome: "Tomate", tipo: "horta",
    descricao: "Hortaliça de alto valor; extremamente sensível a viroses e fungos do solo.",
    fotoRef: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=80",
    sintomas: [
      "Folhas com mosaico amarelo","Frutos com manchas escuras",
      "Murcha repentina","Podridão apical nos frutos",
      "Folhas enroladas","Raízes com galhas"
    ],
    diagnosticos: {
      "Folhas com mosaico amarelo,Folhas enroladas": {
        nome:"Vírus do Mosaico do Tomateiro (ToMV)", emoji:"🦠", gravidade:"grave",
        causes:"Transmitido mecanicamente e por pulgões; sem cura química.",
        tratamentos:["Eliminação de plantas doentes","Controle de pulgões vetores","Sementes certificadas e livre de vírus"]
      },
      "Raízes com galhas,Murcha repentina": {
        nome:"Nematoide-das-Galhas (Meloidogyne spp.)", emoji:"🪱", gravidade:"grave",
        causes:"Solo infestado com nematoides que bloqueiam absorção de água e nutrientes.",
        tratamentos:["Solarização do solo","Nematicidas biológicos (Purpureocillium)","Rotação com crotalária"]
      },
      default: {
        nome:"Podridão Apical (Blossom-End Rot)", emoji:"⚫", gravidade:"moderado",
        causes:"Deficiência de cálcio, geralmente por irrigação irregular.",
        tratamentos:["Irrigação uniforme e constante","Aplicação foliar de cálcio","Mulching para retenção de umidade"]
      }
    }
  },
  {
    id: "banana", emoji: "🍌", nome: "Banana", tipo: "fruta",
    descricao: "Fruta tropical amplamente cultivada; vulnerável ao mal-do-Panamá e sigatoka.",
    fotoRef: "https://images.unsplash.com/photo-1566393028639-d108a42c46a7?w=600&q=80",
    sintomas: [
      "Folhas com listras amarelas","Pseudocaule com manchas escuras",
      "Frutos com podridão","Planta tombada",
      "Folhas necróticas nas bordas","Cachos pequenos"
    ],
    diagnosticos: {
      "Folhas com listras amarelas,Folhas necróticas nas bordas": {
        nome:"Sigatoka-Negra", emoji:"🖤", gravidade:"grave",
        causes:"Fungo Mycosphaerella fijiensis; afeta fotossíntese e reduz produção em até 50%.",
        tratamentos:["Fungicidas sistêmicos em rotação","Remoção de folhas afetadas","Cultivares resistentes (BRS Vitória)"]
      },
      "Pseudocaule com manchas escuras,Planta tombada": {
        nome:"Mal-do-Panamá (Fusarium oxysporum)", emoji:"☠️", gravidade:"grave",
        causes:"Fungo de solo sem controle químico eficaz; persiste por décadas.",
        tratamentos:["Eliminação e quarentena das plantas","Uso de mudas certificadas","Replantio com cultivares resistentes"]
      },
      default: {
        nome:"Broca da Bananeira (Cosmopolites sordidus)", emoji:"🐞", gravidade:"moderado",
        causes:"Besouro que perfura o rizoma, reduzindo vigor da planta.",
        tratamentos:["Iscas com pedaços de pseudocaule","Inseticidas biológicos","Eliminação de restos culturais"]
      }
    }
  },
  {
    id: "trigo", emoji: "🌾", nome: "Trigo", tipo: "alimentar",
    descricao: "Cereal de inverno estratégico cultivado no Sul do Brasil. Suscetível a brusone e giberela.",
    fotoRef: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80",
    sintomas: [
      "Manchas necróticas cinza-esverdeadas nas espigas","Grãos chochos com coloração rosada",
      "Manchas amarelas com pústulas laranja nas folhas","Folhas com lesões ovais esbranquiçadas",
      "Espiga toda branca antes da maturação","Plantas acamadas (tombadas)"
    ],
    diagnosticos: {
      "Manchas necróticas cinza-esverdeadas nas espigas,Espiga toda branca antes da maturação": {
        nome:"Brusone do Trigo", emoji:"🍄", gravidade:"grave",
        causes:"Fungo Magnaporthe oryzae triticum. Explosivo em clima úmido durante o florescimento.",
        tratamentos:["Fungicidas triazóis + estrobilurinas no florescimento","Cultivares resistentes como TBIO Astro","Evitar plantio tardio em regiões de risco"]
      },
      "Grãos chochos com coloração rosada,Manchas amarelas com pústulas laranja nas folhas": {
        nome:"Giberela / Ferrugem-da-folha", emoji:"🟠", gravidade:"grave",
        causes:"Fusarium graminearum (giberela) + Puccinia triticina (ferrugem).",
        tratamentos:["Fungicidas preventivos no espigamento","Rotação com soja ou milho","Tratamento de sementes com tebuconazol"]
      },
      default: {
        nome:"Oídio do Trigo", emoji:"⬜", gravidade:"moderado",
        causes:"Blumeria graminis – pó branco nas folhas, favorecido por dias nublados e úmidos.",
        tratamentos:["Fungicidas à base de triazol","Cultivares resistentes","Evitar excesso de nitrogênio"]
      }
    }
  },
  {
    id: "aveia", emoji: "🌿", nome: "Aveia", tipo: "alimentar",
    descricao: "Cereal de inverno muito cultivado no Sul. Usado também para pastagem e cobertura de solo.",
    fotoRef: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
    sintomas: [
      "Pústulas cor de ferrugem (laranja) nas folhas","Pústulas escuras (negras) nas folhas e caules",
      "Manchas pardas ovaladas nas folhas","Grãos com aspecto esbranquiçado",
      "Plantas com crescimento reduzido e amareladas","Folhas com listra amarela longitudinal"
    ],
    diagnosticos: {
      "Pústulas cor de ferrugem (laranja) nas folhas": {
        nome:"Ferrugem-da-Coroa da Aveia", emoji:"🟠", gravidade:"grave",
        causes:"Puccinia coronata. A doença mais destrutiva da aveia no Sul do Brasil.",
        tratamentos:["Fungicidas triazóis preventivos","Cultivares resistentes: URS Taura, Brisasul","Monitoramento semanal a partir do afilhamento"]
      },
      "Pústulas escuras (negras) nas folhas e caules": {
        nome:"Ferrugem-do-Colmo", emoji:"⬛", gravidade:"grave",
        causes:"Puccinia graminis – mais severa em anos quentes durante o enchimento de grãos.",
        tratamentos:["Fungicidas sistêmicos no florescimento","Eliminação de plantas voluntárias (tigueras)","Cultivares menos suscetíveis"]
      },
      default: {
        nome:"Helmintosporiose da Aveia", emoji:"🍂", gravidade:"moderado",
        causes:"Drechslera avenae – manchas pardas com halo clorótico em condições de alta umidade.",
        tratamentos:["Tratamento de sementes","Rotação de culturas","Fungicidas foliares preventivos"]
      }
    }
  },
  {
    id: "canola", emoji: "🌻", nome: "Canola", tipo: "alimentar",
    descricao: "Oleaginosa de inverno em forte expansão no Sul. Excelente na rotação com soja.",
    fotoRef: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    sintomas: [
      "Manchas necróticas nas folhas com halo amarelo","Hastes com lesões escuras e tombamento",
      "Pétalas caídas e vagens podres cinza","Folhas com aspecto gorduroso e podridão mole",
      "Raízes com galhas (bolinhas)","Plantas amareladas com crescimento irregular"
    ],
    diagnosticos: {
      "Pétalas caídas e vagens podres cinza,Hastes com lesões escuras e tombamento": {
        nome:"Canela-preta / Esclerotinia", emoji:"🖤", gravidade:"grave",
        causes:"Leptosphaeria maculans e Sclerotinia sclerotiorum. Entram pelas pétalas caídas em clima úmido.",
        tratamentos:["Fungicidas no florescimento pleno (BBCH 65)","Rotação de culturas (4 anos mínimo)","Cultivares com tolerância como Hyola 575CL"]
      },
      "Raízes com galhas (bolinhas),Plantas amareladas com crescimento irregular": {
        nome:"Hérnia-das-crucíferas", emoji:"⚫", gravidade:"grave",
        causes:"Plasmodiophora brassicae – persiste no solo por mais de 20 anos.",
        tratamentos:["Calagem para pH acima de 6,5","Rotação longa (5+ anos) sem crucíferas","Mudas sadias, evitar solo infectado"]
      },
      default: {
        nome:"Alternária da Canola", emoji:"🍂", gravidade:"moderado",
        causes:"Alternaria brassicae. Manchas nas folhas e vagens, causa perdas de até 30%.",
        tratamentos:["Fungicidas preventivos nas flores","Sementes tratadas com iprodione","Eliminar restos culturais"]
      }
    }
  },
  {
    id: "maca", emoji: "🍎", nome: "Maçã", tipo: "fruta",
    descricao: "Principal fruta de clima temperado do Brasil, cultivada em SC e RS.",
    fotoRef: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=600&q=80",
    sintomas: [
      "Manchas escuras com halo claro nas folhas","Frutos com manchas escuras e deprimidas",
      "Galhos com cancros e rachadura da casca","Brotação fraca e morte de ramos finos",
      "Frutos com podridão parda na câmara fria","Folhas com pó branco (farinha)"
    ],
    diagnosticos: {
      "Manchas escuras com halo claro nas folhas,Frutos com manchas escuras e deprimidas": {
        nome:"Sarna da Macieira (Venturia inaequalis)", emoji:"🍂", gravidade:"grave",
        causes:"Doença mais importante da maçã no Sul. Esporos se dispersam com chuva após o inóculo de inverno.",
        tratamentos:["Fungicidas preventivos pós-chuva (IBE, estrobilurinas)","Remoção de folhas caídas no inverno","Variedades resistentes: Daiane, Lisgala"]
      },
      "Galhos com cancros e rachadura da casca,Brotação fraca e morte de ramos finos": {
        nome:"Podridão-de-Collar / Cancro Europeu", emoji:"🔴", gravidade:"grave",
        causes:"Neonectria ditissima. Entra por ferimentos de poda, geadas ou granizo.",
        tratamentos:["Poda de ramos infectados com +30cm de margem saudável","Proteção de cortes com pasta cúprica","Evitar podas em dias chuvosos"]
      },
      default: {
        nome:"Oídio da Macieira", emoji:"⬜", gravidade:"moderado",
        causes:"Podosphaera leucotricha. Ataca brotos e folhas novas deixando-as com pó branco.",
        tratamentos:["Enxofre ou fungicidas IQ (quinoxifeno)","Eliminação de ramos infectados na poda de inverno","Boa aeração da copa"]
      }
    }
  },
  {
    id: "pera", emoji: "🍐", nome: "Pera / Pereira", tipo: "fruta",
    descricao: "Cultivada na Serra Gaúcha e SC. Variedades europeias exigem muito frio hibernal.",
    fotoRef: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=600&q=80",
    sintomas: [
      "Brotações com aspecto de queimado","Frutos e flores negros e murchos",
      "Manchas alaranjadas nas folhas (ferrugem)","Galhos com exsudato cor de mel",
      "Frutos com podridão interna","Folhas com manchas marrons bordadas de amarelo"
    ],
    diagnosticos: {
      "Brotações com aspecto de queimado,Galhos com exsudato cor de mel": {
        nome:"Fogo Bacteriano (Erwinia amylovora)", emoji:"🔥", gravidade:"grave",
        causes:"Bactéria altamente destrutiva que se espalha por insetos polinizadores e chuva durante a floração.",
        tratamentos:["Poda imediata de ramos infectados (+50cm margem)","Desinfecção de tesouras com hipoclorito","Bactericidas cúpricos preventivos na floração"]
      },
      "Manchas alaranjadas nas folhas (ferrugem)": {
        nome:"Ferrugem da Pereira", emoji:"🟠", gravidade:"moderado",
        causes:"Gymnosporangium fuscum. Hospedeiro alternativo são as Sabinas/Juniperáceas plantadas próximas.",
        tratamentos:["Remoção de juniperáceas nas proximidades","Fungicidas triazóis no início da floração","Variedades menos suscetíveis"]
      },
      default: {
        nome:"Sarna da Pereira", emoji:"🍂", gravidade:"moderado",
        causes:"Venturia pirina. Favorecida por primaveras chuvosas.",
        tratamentos:["Fungicidas preventivos pós-chuva","Remoção de folhas caídas","Monitoramento de esporos (Mills)"]
      }
    }
  },
  {
    id: "pessego", emoji: "🍑", nome: "Pêssego / Nectarina", tipo: "fruta",
    descricao: "Frutas de caroço amplamente cultivadas no RS e SC. Exigem manejo intenso em clima úmido.",
    fotoRef: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=600&q=80",
    sintomas: [
      "Bolhas vermelhas nas folhas","Frutos com podridão marrom e mofo cinza",
      "Gomose (goma nos ramos e tronco)","Flores murchas presas no galho",
      "Frutos deformados com anel prateado","Folhas mosaico com deformação"
    ],
    diagnosticos: {
      "Bolhas vermelhas nas folhas": {
        nome:"Crespeira do Pessegueiro", emoji:"🔴", gravidade:"grave",
        causes:"Taphrina deformans. Infecta brotos e folhas novas durante brotação, em clima frio e úmido.",
        tratamentos:["Fungicida cúprico na queda das folhas (outono) e antes da brotação","Operação única mais eficaz que múltiplas aplicações tardias","Remoção de folhas infectadas"]
      },
      "Frutos com podridão marrom e mofo cinza,Flores murchas presas no galho": {
        nome:"Monilínia (Podridão-parda)", emoji:"🟫", gravidade:"grave",
        causes:"Monilinia fructicola. A doença mais importante na pré e pós-colheita.",
        tratamentos:["Fungicidas nas flores (início, pleno e fim da floração)","Colheita no ponto certo e refrigeração imediata","Poda para aeração da copa"]
      },
      default: {
        nome:"Gomose / Bacteriose", emoji:"🟡", gravidade:"moderado",
        causes:"Pseudomonas syringae ou estresse (frio, seca). Exsudação de goma por ferimentos.",
        tratamentos:["Cobre preventivo no outono","Proteção contra geadas tardias","Poda em dias secos com proteção dos cortes"]
      }
    }
  },
  {
    id: "alho", emoji: "🧄", nome: "Alho", tipo: "horta",
    descricao: "Cultivo de inverno importante no Sul. PR e SC são grandes produtores.",
    fotoRef: "https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?w=600&q=80",
    sintomas: [
      "Folhas com manchas brancas circulares","Folhas amareladas com apodrecimento na base",
      "Bulbos com podridão e cheiro ruim","Plantas com crescimento paralisado",
      "Pó violeta nos bulbos na colheita","Folhas com listras brancas e deformação viral"
    ],
    diagnosticos: {
      "Folhas com manchas brancas circulares": {
        nome:"Mancha-púrpura / Alternária", emoji:"🟣", gravidade:"moderado",
        causes:"Alternaria porri. Manchas circulares com centro violáceo.",
        tratamentos:["Fungicidas preventivos a partir do 4º par de folhas","Rotação de culturas 3+ anos","Sementes sadias e tratadas"]
      },
      "Bulbos com podridão e cheiro ruim,Folhas amareladas com apodrecimento na base": {
        nome:"Podridão-Branca (Sclerotium cepivorum)", emoji:"☠️", gravidade:"grave",
        causes:"Fungo de solo que persiste por décadas. Sem controle curativo eficaz.",
        tratamentos:["Nunca plantar alho/cebola em área infectada","Solarização do solo","Tratamento de sementes com iprodione"]
      },
      default: {
        nome:"Vírus do Alho (Vírus do Amarelão)", emoji:"🦠", gravidade:"moderado",
        causes:"Garlic virus transmitido por pulgões e material de plantio infectado.",
        tratamentos:["Uso de sementes certificadas e livres de vírus","Controle de pulgões vetores","Eliminação de plantas doentes"]
      }
    }
  },
  {
    id: "cebola", emoji: "🧅", nome: "Cebola", tipo: "horta",
    descricao: "Santa Catarina é o maior produtor nacional. Ciclo de inverno a primavera no Sul.",
    fotoRef: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=600&q=80",
    sintomas: [
      "Folhas com manchas ovais acinzentadas","Pó roxo-escuro nas folhas",
      "Folhas com podridão mole a partir do topo","Pescoço mole na colheita",
      "Bulbos com manchas amarelas e podridão","Plantas raquíticas com raízes escassas"
    ],
    diagnosticos: {
      "Folhas com manchas ovais acinzentadas,Pó roxo-escuro nas folhas": {
        nome:"Míldio + Alternária da Cebola", emoji:"🌧️", gravidade:"grave",
        causes:"Peronospora destructor (míldio) e Alternária porri.",
        tratamentos:["Fungicidas sistêmicos preventivos (mancozeb + metalaxil)","Espaçamento adequado para ventilação","Evitar irrigação excessiva próxima à colheita"]
      },
      "Pescoço mole na colheita,Bulbos com manchas amarelas e podridão": {
        nome:"Podridão-do-Pescoço (Botrytis allii)", emoji:"🟡", gravidade:"grave",
        causes:"Fungo que infecta nas últimas semanas antes da colheita. Perdas graves na pós-colheita.",
        tratamentos:["Colheita quando 50-70% das plantas tombaram","Cura adequada (7-10 dias ao sol ou galpão arejado)","Fungicidas preventivos nas últimas aplicações"]
      },
      default: {
        nome:"Tripes da Cebola", emoji:"🦗", gravidade:"moderado",
        causes:"Thrips tabaci – inseto minúsculo que causa prateamento e deformação das folhas.",
        tratamentos:["Inseticidas seletivos (spinosade, abamectina)","Armadilhas adesivas azuis para monitoramento","Evitar períodos secos prolongados sem irrigação"]
      }
    }
  },
  {
    id: "batata", emoji: "🥔", nome: "Batata-Inglesa", tipo: "alimentar",
    descricao: "Cultivada no inverno no Sul, especialmente em SC e PR serrano.",
    fotoRef: "https://images.unsplash.com/photo-1518977676405-d90b2e4f3a60?w=600&q=80",
    sintomas: [
      "Folhas com manchas marrons com halo clorótico","Pecíolos e ramos com lesões escuras",
      "Tubérculos com manchas cinza na casca","Mosaico amarelo nas folhas",
      "Tubérculos com sarna (crostas)","Plantas amarelando e murchando precocemente"
    ],
    diagnosticos: {
      "Folhas com manchas marrons com halo clorótico,Pecíolos e ramos com lesões escuras": {
        nome:"Requeima da Batata (Phytophthora infestans)", emoji:"💀", gravidade:"grave",
        causes:"O patógeno mais destrutivo da batata. Em condições favoráveis, pode destruir a lavoura em menos de 10 dias.",
        tratamentos:["Fungicidas preventivos rigorosos (a cada 5-7 dias em clima úmido)","Variedades resistentes: Vivaldi, Melody","Eliminar plantas com sintomas imediatamente"]
      },
      "Tubérculos com manchas cinza na casca,Mosaico amarelo nas folhas": {
        nome:"Murcha-bacteriana / Pinta-preta", emoji:"⚫", gravidade:"grave",
        causes:"Ralstonia solanacearum (murcha) ou Alternária solani (pinta-preta).",
        tratamentos:["Rotação de culturas por 3+ anos","Tubérculos-semente certificados","Fungicidas preventivos para alternária"]
      },
      default: {
        nome:"Sarna-comum (Streptomyces scabies)", emoji:"🟤", gravidade:"leve",
        causes:"Bactéria do solo que causa crostas nos tubérculos. Não prejudica o interior.",
        tratamentos:["Irrigação regular para manter solo úmido","pH entre 5,0–5,5 (desfavorece a sarna)","Rotação com gramíneas"]
      }
    }
  },
  {
    id: "erva_mate", emoji: "🌿", nome: "Erva-Mate", tipo: "alimentar",
    descricao: "Cultura nativa e símbolo do Sul. Cultivada em PR, SC e RS.",
    fotoRef: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
    sintomas: [
      "Folhas com manchas necróticas circulares","Queimado das bordas das folhas",
      "Galhos secos e morte de brotos","Folhas com manchas amarelas difusas",
      "Lagartas desfolhando os ramos","Presença de cochonilhas nos ramos"
    ],
    diagnosticos: {
      "Galhos secos e morte de brotos,Presença de cochonilhas nos ramos": {
        nome:"Cochonilha da Erva-Mate", emoji:"🪲", gravidade:"moderado",
        causes:"Hemiberlesia rapax e Coccus viridis. Sugam a seiva e enfraquecem progressivamente a planta.",
        tratamentos:["Óleo mineral ou neem no controle biológico","Poda de limpeza dos ramos mais infestados","Preservar predadores naturais (joaninhas)"]
      },
      "Lagartas desfolhando os ramos,Folhas com manchas amarelas difusas": {
        nome:"Lagarta-da-Erva-Mate / Deficiência Nutricional", emoji:"🐛", gravidade:"moderado",
        causes:"Thelosia camina desfolha os ervais. Deficiência de zinco ou boro causa amarelecimento.",
        tratamentos:["Controle biológico com Bt ou Beauveria bassiana","Análise foliar e adubação corretiva","Calagem e adubação equilibrada"]
      },
      default: {
        nome:"Mancha-foliar / Estresse Hídrico", emoji:"🍂", gravidade:"leve",
        causes:"Cercospora sp. ou estresse por seca. Bordas necróticas indicam deficiência de potássio.",
        tratamentos:["Manutenção de cobertura do solo com sombra parcial","Adubação com potássio e micronutrientes","Fungicidas preventivos somente em casos graves"]
      }
    }
  }
];


/* --- Catálogo completo (enciclopédia de culturas e pragas) --- */
const catalogoCompleto = [
  { emoji:"☕", nome:"Café", tipo:"alimentar", desc:"A bebida do Brasil. Requer clima ameno e solo bem drenado.",
    pragas:[
      {nome:"Ferrugem", controle:"Fungicidas cúpricos e sistêmicos em rotação, poda de ramos afetados, adubação potássica para fortalecer a planta e quebra-ventos para reduzir umidade foliar."},
      {nome:"Broca-do-café", controle:"Monitoramento com armadilhas, controle biológico com Beauveria bassiana, colheita bem feita para não deixar frutos no chão e inseticidas específicos no período crítico."},
      {nome:"Bicho-mineiro", controle:"Inseticidas seletivos, preservação de inimigos naturais como vespas parasitoides, e adubação equilibrada para manter planta vigorosa."}
    ]
  },
  { emoji:"🫘", nome:"Soja", tipo:"alimentar", desc:"Oleaginosa mais exportada do mundo; ciclo de 90–150 dias.",
    pragas:[
      {nome:"Ferrugem Asiática", controle:"Fungicidas triazóis + estrobilurinas em rotação de modos de ação, monitoramento semanal a partir do fechamento das linhas e uso de cultivares com genes de resistência."},
      {nome:"Lagarta-da-soja", controle:"Inseticidas biológicos (Bt), controle biológico com Trichogramma, monitoramento de ovos e lagartas pequenas, e preservação de inimigos naturais."},
      {nome:"Percevejo", controle:"Inseticidas específicos na fase reprodutiva (R5-R6), monitoramento com pano de batida, e controle antes do enchimento de grãos para evitar danos."}
    ]
  },
  { emoji:"🌽", nome:"Milho", tipo:"alimentar", desc:"Cultura estratégica para alimentação humana e ração animal.",
    pragas:[
      {nome:"Lagarta-do-cartucho", controle:"Tecnologia Bt, inseticidas fisiológicos (teflubenzuron), monitoramento de posturas, e liberação de Trichogramma para parasitismo de ovos."},
      {nome:"Cigarrinha", controle:"Inseticidas neonicotinoides no tratamento de sementes, eliminação de plantas voluntárias (tigueras), e rotação de culturas para quebrar o ciclo."},
      {nome:"Helmintosporiose", controle:"Fungicidas preventivos na fase vegetativa (V8-V10), cultivares tolerantes, adubação nitrogenada equilibrada e eliminação de restos culturais."}
    ]
  },
  { emoji:"🌾", nome:"Arroz", tipo:"alimentar", desc:"Cultivado em várzeas e terras altas; base alimentar do brasileiro.",
    pragas:[
      {nome:"Brusone", controle:"Fungicidas triazóis na fase reprodutiva, cultivares resistentes, manejo adequado de nitrogênio e tratamento de sementes."},
      {nome:"Percevejo-do-colmo", controle:"Inseticidas na fase de perfilhamento, monitoramento semanal, e preservação de áreas naturais para inimigos naturais."},
      {nome:"Mancha-parda", controle:"Fungicidas preventivos, equilíbrio nutricional (especialmente potássio e silício), rotação de culturas e tratamento de sementes."}
    ]
  },
  { emoji:"🌱", nome:"Feijão", tipo:"alimentar", desc:"Leguminosa rica em proteína, cultivada em todo o território.",
    pragas:[
      {nome:"Mosca-branca", controle:"Inseticidas específicos (neonicotinoides), óleo mineral para asfixia, controle biológico com Encarsia formosa, e eliminação de plantas daninhas hospedeiras."},
      {nome:"Antracnose", controle:"Fungicidas cúpricos preventivos, sementes certificadas e tratadas, rotação de culturas por 2-3 anos, e eliminação de restos culturais."},
      {nome:"Mancha-angular", controle:"Fungicidas preventivos (mancozeb, clorotalonil), evitar irrigação por aspersão, espaçamento adequado para ventilação, e cultivares resistentes."}
    ]
  },
  { emoji:"🍌", nome:"Banana", tipo:"fruta", desc:"Fruta tropical de alto consumo; exige temperatura acima de 18 °C.",
    pragas:[
      {nome:"Sigatoka-negra", controle:"Fungicidas sistêmicos (triazóis) em rotação, eliminação semanal de folhas doentes, adubação potássica, e uso de cultivares resistentes como BRS Vitória."},
      {nome:"Mal-do-Panamá", controle:"Não há controle químico eficaz; usar mudas certificadas de viveiro, eliminar plantas doentes com quarentena, solarização do solo, e replantio com cultivares resistentes."},
      {nome:"Broca", controle:"Iscas com pedaços de pseudocaule, inseticidas biológicos (Beauveria), eliminação de restos culturais, e monitoramento de adultos."}
    ]
  },
  { emoji:"🍊", nome:"Laranja", tipo:"fruta", desc:"Principal fruta cítrica do Brasil; sensível ao greening.",
    pragas:[
      {nome:"Greening (HLB)", controle:"Erradicação imediata de plantas doentes (obrigatório por lei), controle rigoroso do psilídeo com inseticidas, uso exclusivo de mudas certificadas de viveiro telado."},
      {nome:"Mosca-da-fruta", controle:"Coleta e destruição de frutos caídos, iscas tóxicas proteicas, ensacamento de frutos, e liberação de parasitoides como Diachasmimorpha longicaudata."},
      {nome:"Pulgão-preto", controle:"Óleo mineral para asfixia, inseticidas sistêmicos, preservação de joaninhas e sirfídeos (predadores naturais), e controle de formigas que protegem os pulgões."}
    ]
  },
  { emoji:"🍇", nome:"Uva", tipo:"fruta", desc:"Cultivada no Sul do Brasil; demanda manejo fitossanitário intenso.",
    pragas:[
      {nome:"Míldio", controle:"Fungicidas cúpricos preventivos + sistêmicos (fosfitos, metalaxil), poda verde para aeração, manejo do dossel, e evitar irrigação por aspersão."},
      {nome:"Oídio", controle:"Enxofre em pó ou molhável, fungicidas específicos (tebuconazol, myclobutanil), evitar excesso de nitrogênio, e poda para ventilação."},
      {nome:"Podridão-cinzenta", controle:"Fungicidas específicos (boscalid, fenhexamid), poda de cachos para aeração, evitar ferimentos nos frutos, e colheita no ponto certo."}
    ]
  },
  { emoji:"🍓", nome:"Morango", tipo:"fruta", desc:"Fruta de ciclo curto de alto valor agregado e demanda constante.",
    pragas:[
      {nome:"Ácaro-rajado", controle:"Acaricidas seletivos, controle biológico com Phytoseiulus persimilis, aumento de umidade relativa, e monitoramento constante."},
      {nome:"Antracnose", controle:"Fungicidas preventivos, mudas sadias certificadas, evitar molhar folhas e frutos, e remoção de frutos doentes."},
      {nome:"Oídio", controle:"Enxofre, fungicidas específicos, boa ventilação em estufas, e evitar excesso de adubação nitrogenada."}
    ]
  },
  { emoji:"🥦", nome:"Brócolis", tipo:"horta", desc:"Hortaliça crucífera rica em nutrientes; ciclo de 70–90 dias.",
    pragas:[
      {nome:"Traça-das-crucíferas", controle:"Bacillus thuringiensis (Bt), inseticidas fisiológicos, monitoramento de lagartas, e rotação de culturas."},
      {nome:"Pulgão-verde", controle:"Óleo de neem, sabão potássico, preservação de joaninhas e sirfídeos, e controle de formigas."},
      {nome:"Alternária", controle:"Fungicidas cúpricos preventivos, evitar molhar folhas, espaçamento adequado, e rotação com não-crucíferas."}
    ]
  },
  { emoji:"🍅", nome:"Tomate", tipo:"horta", desc:"Hortaliça de maior renda bruta; manejo fitossanitário intensivo.",
    pragas:[
      {nome:"Traça-do-tomateiro", controle:"Baculovírus spodoptera, feromônios para monitoramento, Bt, e eliminação de frutos e folhas atacadas."},
      {nome:"Requeima", controle:"Fungicidas preventivos (mancozeb, cúpricos), evitar molhar folhas, tutoramento adequado, e cultivares resistentes."},
      {nome:"Nematoide", controle:"Solarização do solo, rotação com crotalária ou mucuna, nematicidas biológicos (Purpureocillium), e uso de porta-enxertos resistentes."}
    ]
  },
  { emoji:"🥕", nome:"Cenoura", tipo:"horta", desc:"Raiz tuberosa cultivada em solos arenosos e férteis.",
    pragas:[
      {nome:"Queima-das-folhas", controle:"Fungicidas preventivos, rotação de culturas, evitar excesso de umidade foliar, e adubação equilibrada."},
      {nome:"Alternária", controle:"Fungicidas específicos, sementes tratadas, espaçamento adequado para ventilação, e eliminação de restos culturais."},
      {nome:"Mosca-da-cenoura", controle:"Rotação de culturas, cobertura morta, armadilhas adesivas amarelas, e colheita no ponto certo."}
    ]
  },
  { emoji:"🎋", nome:"Cana-de-Açúcar", tipo:"alimentar", desc:"Principal cultura sucroenergética do país.",
    pragas:[
      {nome:"Broca-da-cana", controle:"Controle biológico com vespinha Cotesia flavipes, parasitoides de ovos (Trichogramma), variedades resistentes, e monitoramento de posturas."},
      {nome:"Cigarrinha-das-raízes", controle:"Inseticidas de solo na época chuvosa, destruição mecânica da soqueira, rotação com amendoim ou crotalária, e variedades resistentes."},
      {nome:"Bicudo (Sphenophorus)", controle:"Destruição da soqueira, iscas tóxicas com pedaços de colmo, inseticidas granulados no sulco de plantio, e monitoramento de adultos."}
    ]
  },
  { emoji:"🍠", nome:"Mandioca", tipo:"alimentar", desc:"Cultura rústica e essencial para a segurança alimentar.",
    pragas:[
      {nome:"Mandarová", controle:"Baculovírus erinnyis (altamente eficaz), controle biológico natural, armadilhas luminosas para mariposas, e inseticidas fisiológicos apenas em infestações severas."},
      {nome:"Mosca-branca", controle:"Inseticidas seletivos, óleo mineral, controle biológico com Encarsia, e eliminação de plantas daninhas hospedeiras."},
      {nome:"Ácaro-verde", controle:"Acaricidas seletivos, aumento de umidade, controle biológico com ácaros predadores, e variedades resistentes."}
    ]
  },
  { emoji:"☁️", nome:"Algodão", tipo:"fibra", desc:"A pluma de ouro do cerrado. Alta tecnologia e janela de plantio restrita.",
    pragas:[
      {nome:"Bicudo-do-algodoeiro", controle:"Monitoramento rigoroso com armadilhas de feromônio, destruição de restos culturais (obrigatório), janela de aplicação de inseticidas, e variedades transgênicas."},
      {nome:"Lagarta-das-maçãs", controle:"Tecnologia Bt, inseticidas reguladores de crescimento, monitoramento de botões florais, e controle biológico com Trichogramma."},
      {nome:"Pulgão", controle:"Inseticidas seletivos (evitar piretróides), preservação de inimigos naturais (joaninhas, sirfídeos), controle de formigas, e monitoramento semanal."}
    ]
  },
  { emoji:"🍉", nome:"Melancia", tipo:"fruta", desc:"Cultivada em clima quente. Rasteira, demanda muita água no envase do fruto.",
    pragas:[
      {nome:"Mosca-minadora", controle:"Inseticidas sistêmicos, armadilhas adesivas amarelas, controle biológico com parasitoides, e eliminação de folhas atacadas."},
      {nome:"Broca-dos-frutos", controle:"Ensacamento dos frutos, coleta e destruição de frutos atacados, inseticidas específicos, e monitoramento de adultos."},
      {nome:"Oídio", controle:"Enxofre, fungicidas específicos, boa ventilação, e evitar excesso de nitrogênio."}
    ]
  },
  { emoji:"🥬", nome:"Alface", tipo:"horta", desc:"A hortaliça folhosa mais consumida. Produção em campo e hidroponia.",
    pragas:[
      {nome:"Tripes", controle:"Inseticidas seletivos, armadilhas adesivas azuis, controle biológico com Orius, e aumento de umidade relativa."},
      {nome:"Pulgão", controle:"Óleo de neem, sabão potássico, joaninhas, e controle de formigas."},
      {nome:"Míldio", controle:"Fungicidas cúpricos preventivos, evitar molhar folhas, boa ventilação, e irrigação controlada."}
    ]
  },
  { emoji:"🫑", nome:"Pimentão", tipo:"horta", desc:"Sensível a oscilações térmicas, muito comum o cultivo em estufas.",
    pragas:[
      {nome:"Ácaro-branco", controle:"Acaricidas específicos, aumento de umidade, controle biológico com ácaros predadores, e monitoramento constante."},
      {nome:"Mosca-branca", controle:"Inseticidas seletivos, armadilhas adesivas amarelas, controle biológico com Encarsia, e telas antinseto em estufas."},
      {nome:"Vira-cabeça (Tospovírus)", controle:"Não há cura; controle rigoroso do tripes vetor, eliminação imediata de plantas doentes, mudas sadias, e variedades resistentes."}
    ]
  },
  { emoji:"🌿", nome:"Erva-Mate", tipo:"alimentar", desc:"Planta nativa do Sul. Produto típico gaúcho, catarinense e paranaense.",
    pragas:[
      {nome:"Cochonilha", controle:"Óleo mineral ou neem em pulverizações preventivas, poda de limpeza de ramos infestados, preservação de joaninhas e outros predadores naturais."},
      {nome:"Lagarta-da-erva-mate", controle:"Controle biológico com Bacillus thuringiensis (Bt) ou Beauveria bassiana; monitoramento do nível de desfolha; inseticidas fisiológicos em surtos severos."},
      {nome:"Minador-das-folhas", controle:"Inseticidas sistêmicos (abamectina), remoção de folhas atacadas, controle de formigas que protegem os insetos minadores."}
    ]
  },
  { emoji:"🍎", nome:"Maçã", tipo:"fruta", desc:"Principal fruta de clima temperado do Brasil.",
    pragas:[
      {nome:"Sarna (Venturia)", controle:"Fungicidas preventivos logo após a chuva (IBE, QoI), sistema de alerta (Modelo de Mills), remoção de folhas caídas no inverno, variedades resistentes."},
      {nome:"Oídio", controle:"Enxofre molhável ou pó, fungicidas inibidores do ergosterol, poda de ramos com sintomas no inverno, boa aeração da copa."},
      {nome:"Mosca-das-frutas", controle:"Armadilhas com proteína hidrolisada, ensacamento de frutos, iscas tóxicas proteicas (Spinosad), colheita no ponto certo sem deixar frutos caídos."}
    ]
  },
  { emoji:"🍑", nome:"Pêssego", tipo:"fruta", desc:"Cultivado intensamente no RS e SC. Alta demanda por proteção fitossanitária.",
    pragas:[
      {nome:"Crespeira (Taphrina)", controle:"Fungicida cúprico único: aplicar na queda das folhas no outono E antes da brotação (janela de 2 aplicações). Após a brotação não tem eficácia."},
      {nome:"Monilínia (Podridão-parda)", controle:"Fungicidas nas flores (início, pleno e pós-floração), colheita adequada sem machucar os frutos, refrigeração imediata, poda para aeração."},
      {nome:"Grafolita (Mariposa-oriental)", controle:"Confusão sexual com feromônio (técnica mais eficaz), inseticidas biológicos (Bt, Spinosad), destruição de restos culturais."}
    ]
  },
  { emoji:"🍐", nome:"Pera / Pereira", tipo:"fruta", desc:"Serra Gaúcha e serras catarinenses. Variedades japonesas e europeias.",
    pragas:[
      {nome:"Fogo bacteriano", controle:"Poda imediata de ramos infectados (+50cm de margem), desinfecção de ferramentas com hipoclorito 10%, bactericidas cúpricos preventivos na floração."},
      {nome:"Ferrugem-europeia", controle:"Remoção de Sabinas (Juniperus) no entorno da lavoura (hospedeiro alternativo obrigatório), fungicidas triazóis preventivos na floração."},
      {nome:"Psila-da-pereira", controle:"Óleos hortigranjeiros na dormência, inseticidas seletivos em brotos, preservar inimigos naturais (sirfídeos, crisopídeos)."}
    ]
  },
  { emoji:"🌻", nome:"Canola", tipo:"alimentar", desc:"Oleaginosa de inverno em expansão no Sul. Excelente rotação com soja e trigo.",
    pragas:[
      {nome:"Canela-preta (Leptosphaeria)", controle:"Fungicidas nas pétalas caídas (BBCH 65), rotação de culturas rigorosa (mínimo 4 anos), cultivares tolerantes como Hyola 575CL."},
      {nome:"Esclerotinia", controle:"Fungicidas no florescimento pleno, solo com boa drenagem, monitoramento de restos culturais."},
      {nome:"Afídeos (pulgões)", controle:"Inseticidas seletivos, preservação de inimigos naturais (vespinhas, joaninhas), monitoramento semanal especialmente em brotação."}
    ]
  },
  { emoji:"🌿", nome:"Aveia", tipo:"alimentar", desc:"Cereal de inverno para grão e pastagem. Essencial no sistema plantio direto do Sul.",
    pragas:[
      {nome:"Ferrugem-da-coroa", controle:"Fungicidas triazóis preventivos (tebuconazol, ciproconazol), cultivares resistentes como URS Taura e Brisasul, semeadura na época certa."},
      {nome:"Helmintosporiose", controle:"Tratamento de sementes com fungicidas, rotação de culturas, espaçamento adequado para ventilação."},
      {nome:"Septoriose", controle:"Fungicidas preventivos nas fases de afilhamento e emborrachamento, cultivares tolerantes, evitar excesso de nitrogênio."}
    ]
  },
  { emoji:"🧄", nome:"Alho", tipo:"horta", desc:"Curitibanos (SC) é capital nacional. Plantio no outono-inverno no Sul.",
    pragas:[
      {nome:"Mancha-púrpura (Alternária)", controle:"Fungicidas preventivos a partir do 4º par de folhas, rotação de culturas por 3 anos mínimo, material de plantio sadio e tratado."},
      {nome:"Podridão-branca", controle:"Solarização do solo (altamente eficaz), nunca replantar em áreas infectadas, tratamento de sementes com iprodione ou tebuconazol."},
      {nome:"Pulgão-do-alho", controle:"Inseticidas sistêmicos preventivos (neonicotinoides no plantio), controle de formigas, preservação de joaninhas e crisopídeos."}
    ]
  },
  { emoji:"🧅", nome:"Cebola", tipo:"horta", desc:"SC é maior produtor nacional (Ituporanga). Safra de inverno no Sul.",
    pragas:[
      {nome:"Míldio (Peronospora)", controle:"Fungicidas sistêmicos preventivos (metalaxil + mancozeb), espaçamento para boa ventilação, evitar irrigação excessiva próxima à colheita."},
      {nome:"Tripes (Thrips tabaci)", controle:"Inseticidas seletivos (spinosade, abamectina), armadilhas adesivas azuis para monitoramento, controle de vetor de viroses."},
      {nome:"Podridão-do-pescoço", controle:"Cura adequada após colheita (7-10 dias ao sol ou galpão ventilado), fungicidas preventivos nas últimas aplicações, colheita no ponto certo."}
    ]
  },
  { emoji:"🥔", nome:"Batata-Inglesa", tipo:"alimentar", desc:"Paraná e SC serrano produzem batata de qualidade. Alta rentabilidade e custo.",
    pragas:[
      {nome:"Requeima (Phytophthora infestans)", controle:"Fungicidas preventivos rigorosos (a cada 5-7 dias em clima úmido), variedades resistentes, monitoramento com sistema de alerta (BLITECAST)."},
      {nome:"Pinta-preta (Alternária)", controle:"Fungicidas preventivos a partir do início do florescimento, adubação nitrogenada equilibrada, eliminação de restos culturais."},
      {nome:"Traça-da-batata", controle:"Feromônio para monitoramento de adultos, Bt para lagartas, armazenamento em câmara fria, cobertura de tubérculos no campo."}
    ]
  },
  { emoji:"🫐", nome:"Mirtilo (Blueberry)", tipo:"fruta", desc:"Fruta nova no Sul, alta rentabilidade. RS e SC são os maiores produtores.",
    pragas:[
      {nome:"Múmia do mirtilo (Monilinia)", controle:"Fungicidas na floração, poda de ramos com múmias, boa drenagem do solo, colheita rigorosa sem deixar frutos na planta."},
      {nome:"Drosophila suzukii", controle:"Armadilhas com vinagre de maçã para monitoramento, ensacamento em variedades precoces, colheita frequente evitando frutos maduros na planta."},
      {nome:"Podridão-radicular (Phytophthora)", controle:"Solo ácido e bem drenado (pH 4,5–5,5), plantio em camalhões, fungicidas de solo preventivos com metalaxil."}
    ]
  },
  { emoji:"🫒", nome:"Oliveira", tipo:"fruta", desc:"Cultura emergente no RS (Serra Gaúcha/Campanha). Brasil produz azeite premiado.",
    pragas:[
      {nome:"Antracnose da Oliveira (Colletotrichum)", controle:"Fungicidas cúpricos preventivos antes das chuvas de outono, colheita precoce (azeitona verde), variedades tolerantes como Arbequina."},
      {nome:"Mosca-da-azeitona (Bactrocera oleae)", controle:"Iscas proteicas com Spinosad, armadilhas de feromônio para monitoramento, colheita antecipada em variedades sensíveis."},
      {nome:"Verticiliose (Verticillium)", controle:"Não plantar em solos com histórico da doença, variedades resistentes, boa drenagem, evitar ferimentos nas raízes."}
    ]
  }
];


/* ============================================================
   2. ESTADO GLOBAL
   Guarda qual cultura está selecionada e os sintomas
   marcados pelo usuário durante o diagnóstico.
============================================================ */

let culturaSelecionada  = null;   // Objeto da cultura ativa
let sintomasSelecionados = [];    // Array com os sintomas escolhidos


/* ============================================================
   3. DIAGNÓSTICO
   Funções responsáveis pelos 3 passos da ferramenta:
   Passo 1 → Escolha da cultura
   Passo 2 → Seleção de sintomas + comparação visual
   Passo 3 → Resultado e recomendações
============================================================ */

/* Limites para exibição inicial (botão "mostrar mais" expande) */
const CULTURAS_LIMITE  = 8;
const CATALOGO_LIMITE  = 8;

/**
 * Renderiza o grid de culturas no Passo 1.
 * Itens além de CULTURAS_LIMITE ficam ocultos até o usuário expandir.
 */
function renderCulturas() {
  const grid = document.getElementById("culturaGrid");
  if (!grid) return;
  grid.innerHTML = "";

  culturas.forEach((c, i) => {
    const div = document.createElement("div");
    div.className = "cultura-item" + (i >= CULTURAS_LIMITE ? " oculto" : "");
    div.dataset.id = c.id;
    div.innerHTML = `<span class="ci-emoji">${c.emoji}</span><span class="ci-nome">${c.nome}</span>`;
    div.addEventListener("click", () => selecionarCultura(c.id));
    grid.appendChild(div);
  });

  // Cria o botão "Mostrar mais plantas" se necessário
  criarBotaoMostrarMais(grid, culturas.length, CULTURAS_LIMITE, "Mostrar mais plantas", "Mostrar menos");
}

/**
 * Ativa a cultura clicada, preenche a foto de referência,
 * renderiza os sintomas e avança para o Passo 2.
 */
function selecionarCultura(id) {
  culturaSelecionada    = culturas.find(c => c.id === id);
  sintomasSelecionados  = [];

  // Destaca o card selecionado
  document.querySelectorAll(".cultura-item")
    .forEach(el => el.classList.toggle("selected", el.dataset.id === id));

  // Atualiza a foto da planta saudável (referência visual)
  const foto = document.getElementById("fotoReferencia");
  if (foto) foto.src = culturaSelecionada.fotoRef;

  // Limpa sintomas visuais anteriores
  const visuais = document.getElementById("sintomas-visuais");
  if (visuais) visuais.innerHTML = "";

  renderSintomas();
  showStep(2);
}

/**
 * Preenche a lista de sintomas clicáveis da cultura selecionada.
 */
function renderSintomas() {
  const grid = document.getElementById("sintomasGrid");
  if (!grid || !culturaSelecionada) return;
  grid.innerHTML = "";

  culturaSelecionada.sintomas.forEach(s => {
    const btn = document.createElement("button");
    btn.className = "sintoma-toggle";
    btn.textContent = s;
    btn.addEventListener("click", () => toggleSintoma(s, btn));
    grid.appendChild(btn);
  });
}

/**
 * Marca/desmarca um sintoma. Atualiza as tags visuais
 * e habilita/desabilita o botão de diagnóstico.
 */
function toggleSintoma(sintoma, btn) {
  const idx = sintomasSelecionados.indexOf(sintoma);
  if (idx === -1) {
    sintomasSelecionados.push(sintoma);
    btn.classList.add("selected");
  } else {
    sintomasSelecionados.splice(idx, 1);
    btn.classList.remove("selected");
  }

  // Atualiza badges visuais no lado "sua planta"
  const visuais = document.getElementById("sintomas-visuais");
  if (visuais) {
    visuais.innerHTML = sintomasSelecionados
      .map(s => `<span class="sintoma-badge-visual">${s}</span>`)
      .join("");
  }

  // Só libera o botão se houver ao menos 1 sintoma marcado
  const btnDiag = document.getElementById("btnDiagnosticar");
  if (btnDiag) {
    btnDiag.disabled = sintomasSelecionados.length === 0;
    btnDiag.setAttribute("aria-disabled", String(sintomasSelecionados.length === 0));
  }
}

/**
 * Algoritmo de diagnóstico:
 * 1. Tenta combinação exata (ordenada) dos 2 primeiros sintomas.
 * 2. Busca qualquer chave que contenha ao menos 1 sintoma selecionado.
 * 3. Usa o "default" como fallback.
 */
function realizarDiagnostico() {
  if (!culturaSelecionada) return;

  // Tentativa 1: combinação exata dos dois primeiros sintomas
  let diag = culturaSelecionada.diagnosticos[
    sintomasSelecionados.slice(0, 2).sort().join(",")
  ];

  // Tentativa 2: qualquer chave que bata com ao menos 1 sintoma
  if (!diag) {
    const chave = Object.keys(culturaSelecionada.diagnosticos)
      .find(k => sintomasSelecionados.some(s => k.includes(s)));
    if (chave) diag = culturaSelecionada.diagnosticos[chave];
  }

  // Fallback: diagnóstico padrão da cultura
  if (!diag) diag = culturaSelecionada.diagnosticos["default"];

  const cont = document.getElementById("resultadoContent");
  if (!cont) return;

  // Mapa de rótulos de gravidade
  const gravLabels = {
    grave:    "🔴 Grave",
    moderado: "🟠 Moderado",
    leve:     "🟡 Leve",
    saudavel: "✅ Saudável"
  };

  // Injeta o resultado no DOM
  cont.innerHTML = `
    <div class="resultado-card ${diag.gravidade}">
      <div class="res-header">
        <span class="res-emoji">${diag.emoji}</span>
        <span class="res-nome">${diag.nome}</span>
        <span class="res-gravidade">${gravLabels[diag.gravidade] || diag.gravidade}</span>
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
          <ul>${diag.tratamentos.map(t => `<li>${t}</li>`).join("")}</ul>
        </div>
      </div>
    </div>

    <div class="resultado-card saudavel" style="margin-top:16px">
      <div class="res-header">
        <span class="res-emoji">👨‍🌾</span>
        <span class="res-nome">Próximos Passos</span>
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
      </div>
      <button class="btn-outline" id="btnNovaAnalise"
        style="margin-top:15px;width:100%;border-color:var(--primary);color:#fff;
               padding:10px;cursor:pointer;border-radius:25px;background:transparent;">
        🔄 Nova Análise
      </button>
    </div>
  `;

  // Botão de resetar todo o diagnóstico
  document.getElementById("btnNovaAnalise")?.addEventListener("click", resetarDiagnostico);

  showStep(3);
}

/**
 * Reseta o estado do diagnóstico e volta ao Passo 1.
 */
function resetarDiagnostico() {
  culturaSelecionada   = null;
  sintomasSelecionados = [];
  document.querySelectorAll(".cultura-item").forEach(el => el.classList.remove("selected"));
  showStep(1);
}

/**
 * Exibe apenas o passo indicado (1, 2 ou 3), ocultando os demais.
 */
function showStep(num) {
  document.querySelectorAll(".diag-step").forEach(el => el.classList.remove("active"));
  document.getElementById("step" + num)?.classList.add("active");
}


/* ============================================================
   4. CATÁLOGO
   Grid de culturas com filtros de categoria e modal de detalhe.
============================================================ */

/**
 * Renderiza o catálogo de culturas filtrando por tipo.
 * Itens além de CATALOGO_LIMITE ficam ocultos.
 */
function renderCatalogo(filtro = "todos") {
  const grid = document.getElementById("catalogoGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const lista = filtro === "todos"
    ? catalogoCompleto
    : catalogoCompleto.filter(c => c.tipo === filtro);

  lista.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "cat-card" + (i >= CATALOGO_LIMITE ? " oculto" : "");
    card.innerHTML = `
      <div class="cat-img">${item.emoji}</div>
      <div class="cat-body">
        <h4>${item.nome}</h4>
        <span class="cat-tipo">${item.tipo}</span>
        <p>${item.desc}</p>
        <div class="cat-pragas">
          ${item.pragas.map(p => `<span class="cat-praga-tag">${p.nome || p}</span>`).join("")}
        </div>
      </div>
    `;
    card.addEventListener("click", () => abrirModal(item));
    grid.appendChild(card);
  });

  // Recria o botão "Mostrar mais" abaixo do grid
  document.getElementById("btnMostrarMaisCatalogo")?.remove();
  criarBotaoMostrarMais(grid, lista.length, CATALOGO_LIMITE, "Mostrar mais culturas", "Mostrar menos", "btnMostrarMaisCatalogo");
}

/**
 * Abre o modal com detalhes da cultura: descrição,
 * pragas e controles integrados.
 */
function abrirModal(item) {
  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("modalContent");
  if (!overlay || !content) return;

  content.innerHTML = `
    <span class="modal-emoji">${item.emoji}</span>
    <h2 class="modal-titulo">${item.nome}</h2>
    <p class="modal-tipo">${item.tipo}</p>
    <p class="modal-desc">${item.desc}</p>

    <div class="modal-section">
      <h5>Principais Ameaças</h5>
      <div class="modal-pragas-lista">
        ${item.pragas.map(p => {
          const nome     = p.nome     || p;
          const controle = p.controle || "Combine manejo cultural, controle biológico e químico conforme necessidade.";
          return `
          <div class="modal-praga-item">
            <h6>⚠️ ${nome}</h6>
            <p>Praga/doença de ocorrência frequente. Monitoramento contínuo é essencial.</p>
            <div class="modal-praga-sol">
              <strong>💡 Controle Integrado:</strong>
              <span>${controle}</span>
            </div>
          </div>`;
        }).join("")}
      </div>
    </div>

    <div class="modal-section">
      <h5>Boas Práticas</h5>
      <ul>
        <li>Monitorar lavoura semanalmente</li>
        <li>Realizar análise de solo anualmente</li>
        <li>Usar sementes certificadas e tratadas</li>
        <li>Registrar todas as atividades no aplicativo</li>
      </ul>
    </div>
  `;
      
  overlay.removeAttribute("hidden");  
  overlay.classList.add("open");
  // Move o foco para o botão de fechar (acessibilidade)
  document.getElementById("modalClose")?.focus();
}

/** Fecha o modal. */
function fecharModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay?.classList.remove("open");
  overlay?.setAttribute("hidden", ""); 
}


/* ============================================================
   5. UI – COMPONENTES DE INTERFACE
   Navbar, animações de scroll, contadores e "mostrar mais".
============================================================ */

/**
 * Navbar: muda opacidade ao rolar e exibe o botão "voltar ao topo".
 * No mobile, gerencia a abertura/fechamento do menu hambúrguer.
 */
function initNavbar() {
  const nav   = document.getElementById("navbar");
  const ham   = document.getElementById("hamburger");
  const links = document.querySelector(".nav-links");
  const top   = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    // Aumenta opacidade da barra após 40px de rolagem
    if (nav) nav.style.background = window.scrollY > 40
      ? "rgba(10,26,14,0.97)"
      : "rgba(10,26,14,0.85)";

    // Exibe/oculta botão "↑" após 400px
    top?.classList.toggle("show-btn", window.scrollY > 400);
  });

  // Hambúrguer: abre/fecha menu mobile
  if (ham && links) {
    ham.addEventListener("click", () => {
      const aberto = links.classList.toggle("open");
      ham.setAttribute("aria-expanded", String(aberto));
    });
    // Fecha o menu ao clicar em qualquer link
    links.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        ham.setAttribute("aria-expanded", "false");
      })
    );
  }
}

/**
 * Animações de entrada (reveal) usando IntersectionObserver.
 * Elementos com classe .reveal ou .reveal-right aparecem
 * suavemente ao entrar na viewport.
 */
function initReveal() {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal, .reveal-right").forEach(el => obs.observe(el));
}

/**
 * Contadores animados para os cards de estatísticas.
 * Ativados ao entrar na viewport via IntersectionObserver.
 */
function initCounters() {
  const cards = document.querySelectorAll(".stat-card");
  if (!cards.length) return;

  // Extrai valor numérico bruto do texto do h3
  const parseNum = text => parseFloat(text.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;

  // Reformata o número final no mesmo padrão do original
  const formatNum = (original, val) => {
    if (original.startsWith("-"))  return `-${Math.round(val)}%`;
    if (original.startsWith("+"))  return `+${Math.round(val)}%`;
    if (original.includes("R$"))   return `R$ ${(val / 1000).toFixed(1)}M`;
    if (original.includes("."))    return Math.round(val).toLocaleString("pt-BR");
    return String(Math.round(val));
  };

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const h3 = entry.target.querySelector("h3");
      if (!h3 || h3.dataset.animated) return;
      h3.dataset.animated = "true";

      const original = h3.textContent.trim();
      const target   = parseNum(original);
      const start    = performance.now();
      const DURATION = 1800;

      const tick = now => {
        const p    = Math.min((now - start) / DURATION, 1);
        const ease = 1 - Math.pow(1 - p, 3);        // ease-out cúbico
        h3.textContent = formatNum(original, ease * target);
        p < 1 ? requestAnimationFrame(tick) : (h3.textContent = original);
      };
      requestAnimationFrame(tick);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  cards.forEach(c => obs.observe(c));
}

/**
 * Cria um botão "Mostrar mais / Mostrar menos" genérico.
 * Reaproveita a mesma lógica para o catálogo e para as culturas.
 *
 * @param {HTMLElement} grid       - O container dos itens
 * @param {number}      total      - Total de itens no grid
 * @param {number}      limite     - Quantos ficam visíveis inicialmente
 * @param {string}      textoMais  - Rótulo ao recolher
 * @param {string}      textoMenos - Rótulo ao expandir
 * @param {string}      [btnId]    - ID opcional para o botão
 */
function criarBotaoMostrarMais(grid, total, limite, textoMais, textoMenos, btnId) {
  if (total <= limite) return;

  const btn = document.createElement("button");
  if (btnId) btn.id = btnId;
  btn.className = "btn-mostrar-mais";
  btn.innerHTML = `<span>${textoMais}</span><span class="btn-chevron">↓</span>`;

  let expandido = false;
  btn.addEventListener("click", () => {
    expandido = !expandido;
    // Alterna visibilidade dos itens além do limite
    grid.querySelectorAll("[class*='oculto'], .cat-card, .cultura-item")
      .forEach((el, i) => el.classList.toggle("oculto", !expandido && i >= limite));
    btn.classList.toggle("expandido", expandido);
    btn.querySelector("span:first-child").textContent = expandido ? textoMenos : textoMais;
  });

  grid.parentElement.appendChild(btn);
}

/**
 * Inicializa os listeners dos botões de filtro do catálogo.
 * Atualiza aria-pressed para acessibilidade.
 */
function initFiltros() {
  document.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filtro-btn").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      renderCatalogo(btn.dataset.filtro);
    });
  });
}

/**
 * Configura os botões da ferramenta de diagnóstico:
 * - Botão "Realizar Diagnóstico"
 * - Botão "Voltar" (Passo 3 → Passo 2)
 * - Botão injetado "Voltar e Escolher Outra Planta" (Passo 2 → Passo 1)
 */
function initDiagnostico() {
  // Disparar diagnóstico
  document.getElementById("btnDiagnosticar")
    ?.addEventListener("click", realizarDiagnostico);

  // Voltar do resultado para sintomas
  document.getElementById("btnVoltar")
    ?.addEventListener("click", () => showStep(2));

  // Injeta botão para voltar ao Passo 1 sem poluir o HTML estático
  const step2 = document.getElementById("step2");
  if (!step2 || document.getElementById("btnVoltarPasso1")) return;

  const btnVoltar1 = document.createElement("button");
  btnVoltar1.id = "btnVoltarPasso1";
  btnVoltar1.innerHTML = "← Escolher Outra Planta";
  btnVoltar1.style.cssText = [
    "margin-bottom:20px", "background:rgba(255,255,255,0.05)",
    "border:1px solid rgba(255,255,255,0.15)", "color:#fff",
    "padding:10px 16px", "border-radius:25px", "cursor:pointer",
    "font-weight:500", "display:block", "transition:background 0.2s"
  ].join(";");

  btnVoltar1.addEventListener("mouseenter", () => btnVoltar1.style.background = "rgba(255,255,255,0.1)");
  btnVoltar1.addEventListener("mouseleave", () => btnVoltar1.style.background = "rgba(255,255,255,0.05)");
  btnVoltar1.addEventListener("click", resetarDiagnostico);

  step2.insertBefore(btnVoltar1, step2.firstChild);
}

/**
 * Inicializa o modal: fecha ao clicar no "✕" ou
 * ao clicar fora da caixa (no overlay escuro).
 */
function initModal() {
  document.getElementById("modalClose")
    ?.addEventListener("click", fecharModal);

  document.getElementById("modalOverlay")
    ?.addEventListener("click", e => {
      if (e.target.id === "modalOverlay") fecharModal();
    });

  // Fecha com tecla Escape (acessibilidade)
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") fecharModal();
  });
}


/* ============================================================
   6. INIT – INICIALIZAÇÃO GERAL
   Chamado quando o DOM está pronto. Executa todas as funções
   de setup em ordem lógica.
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  renderCulturas();      // Passo 1: popula grid de culturas
  renderCatalogo();      // Catálogo: popula enciclopédia
  initReveal();          // Animações de scroll
  initNavbar();          // Navbar responsiva
  initFiltros();         // Filtros do catálogo
  initDiagnostico();     // Botões da ferramenta de diagnóstico
  initModal();           // Modal de detalhe
  initCounters();        // Contadores animados dos stats
});