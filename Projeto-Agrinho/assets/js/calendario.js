/* ========================================================
   AgroInteligente – calendario.js
   Calendário de Plantio com Fases da Lua
   Sul do Brasil · Integra com app.js e clima.js
   ======================================================== */

/* ── DADOS MENSAIS (Sul do Brasil) ── */
const DADOS_CALENDARIO = {
  0: {
    plantio: [
      { n: 'Milho 2ª safra', ico: '🌽', plantio: 'Jan–Fev', colheita: 'Abr–Mai', faseLua: '🌒 Crescente', solo: 'Argiloso ou médio, bem drenado', obs: 'Risco de chuvas excessivas. Prefira cultivares de ciclo curto.' },
      { n: 'Feijão das águas', ico: '🌱', plantio: 'Nov–Jan', colheita: 'Mar–Abr', faseLua: '🌑 Nova', solo: 'Fértil, pH 6.0–6.8', obs: 'Monitorar mosca-branca e mosaico dourado.' },
      { n: 'Girassol', ico: '🌻', plantio: 'Jan–Fev', colheita: 'Abr–Mai', faseLua: '🌒 Crescente', solo: 'Profundo e drenado', obs: 'Resistente ao calor. Boa opção na safrinha.' },
      { n: 'Amendoim', ico: '🥜', plantio: 'Nov–Jan', colheita: 'Mar–Mai', faseLua: '🌑 Nova', solo: 'Arenoso ou média textura', obs: 'Colher com umidade do grão entre 40–45%.' }
    ],
    colheita: [
      { n: 'Soja 1ª safra', ico: '🫘', colheita: 'Jan–Mar', obs: 'Monitorar percevejo e ferrugem asiática.', faseLua: '🌕 Cheia' },
      { n: 'Pêssego precoce', ico: '🍑', colheita: 'Dez–Jan', obs: 'Colheita escalonada conforme maturação.', faseLua: '🌕 Cheia' },
      { n: 'Uva Niágara precoce', ico: '🍇', colheita: 'Dez–Jan', obs: 'Controle de botrytis nos cachos.', faseLua: '🌕 Cheia' }
    ],
    cuidados: [
      { n: 'Risco de granizo', ico: '🧊', obs: 'Janeiro é mês de pico de tempestades no Sul. Verificar seguros e telas antigranizo.' },
      { n: 'Déficit hídrico pontual', ico: '💧', obs: 'Apesar das chuvas, períodos de 5–7 dias sem chuva são comuns. Monitore a irrigação.' }
    ]
  },
  1: {
    plantio: [
      { n: 'Milho 2ª safra', ico: '🌽', plantio: 'Jan–Fev', colheita: 'Mai–Jun', faseLua: '🌒 Crescente', solo: 'Argiloso drenado', obs: 'Última janela de plantio com bom potencial de produtividade.' },
      { n: 'Feijão', ico: '🌱', plantio: 'Jan–Mar', colheita: 'Abr–Mai', faseLua: '🌑 Nova', solo: 'Fértil pH 6.0–6.8', obs: 'Iniciar tratamento fungicida preventivo para antracnose.' },
      { n: 'Girassol', ico: '🌻', plantio: 'Jan–Fev', colheita: 'Mai–Jun', faseLua: '🌒 Crescente', solo: 'Profundo e drenado', obs: 'Excelente rotação com soja.' }
    ],
    colheita: [
      { n: 'Soja 1ª safra', ico: '🫘', colheita: 'Jan–Mar', obs: 'Monitorar percevejo. Não colher com chuva.', faseLua: '🌕 Cheia' },
      { n: 'Milho 1ª safra', ico: '🌽', colheita: 'Fev–Mar', obs: 'Aguardar umidade abaixo de 24% para colheita.', faseLua: '🌕 Cheia' },
      { n: 'Uva fina', ico: '🍇', colheita: 'Fev–Mar', obs: 'Ponto de maturação: Brix acima de 17°.', faseLua: '🌕 Cheia' }
    ],
    cuidados: [
      { n: 'Brusone no arroz', ico: '🍄', obs: 'Clima quente e úmido favorece explosão de brusone. Aplicar fungicida no espigamento.' },
      { n: 'Calor extremo', ico: '🔥', obs: 'Irrigar nas horas mais frescas (6h–9h e após 17h). Evitar pulverizações ao meio-dia.' }
    ]
  },
  2: {
    plantio: [
      { n: 'Trigo', ico: '🌾', plantio: 'Mar–Mai', colheita: 'Jul–Out', faseLua: '🌑 Nova', solo: 'Argiloso, pH 5.8–6.5', obs: 'Início da janela de plantio. Cultivares precoces para colheita em julho.' },
      { n: 'Aveia branca', ico: '🌿', plantio: 'Mar–Mai', colheita: 'Ago–Set', faseLua: '🌒 Crescente', solo: 'Tolerante, prefere drenado', obs: 'Ótima para cobertura de solo e pastejo.' },
      { n: 'Canola', ico: '🌻', plantio: 'Mar–Abr', colheita: 'Jul–Ago', faseLua: '🌒 Crescente', solo: 'Bem drenado, pH >6.0', obs: 'Plantio precoce reduz risco de Sclerotinia.' },
      { n: 'Alho', ico: '🧄', plantio: 'Mar–Mai', colheita: 'Nov–Dez', faseLua: '🌑 Nova', solo: 'Areno-argiloso, pH 6.0', obs: 'Usar bulbilhos certificados. Tratar com fungicida antes do plantio.' },
      { n: 'Ervilha', ico: '🫛', plantio: 'Mar–Mai', colheita: 'Jun–Jul', faseLua: '🌒 Crescente', solo: 'Fértil bem drenado', obs: 'Ciclo curto de 60–80 dias.' }
    ],
    colheita: [
      { n: 'Milho', ico: '🌽', colheita: 'Mar–Abr', obs: 'Colheita mecânica com umidade abaixo de 24%.', faseLua: '🌕 Cheia' },
      { n: 'Soja tardia', ico: '🫘', colheita: 'Mar–Abr', obs: 'Aguardar cor das vagens em marrom.', faseLua: '🌕 Cheia' },
      { n: 'Uva fina', ico: '🍇', colheita: 'Mar–Abr', obs: 'Última colheita de variedades tardias.', faseLua: '🌕 Cheia' },
      { n: 'Pêssego tardio', ico: '🍑', colheita: 'Mar–Abr', obs: 'Ponto firme para melhor pós-colheita.', faseLua: '🌕 Cheia' }
    ],
    cuidados: [
      { n: 'Preparar solo inverno', ico: '🌱', obs: 'Realizar amostragem de solo. Fazer calagem e gessagem antes do plantio de inverno.' },
      { n: 'Crespeira do pêssego', ico: '🔴', obs: 'Aplicar fungicida cúprico na queda das folhas. Janela única de aplicação!' }
    ]
  },
  3: {
    plantio: [
      { n: 'Trigo', ico: '🌾', plantio: 'Abr–Mai', colheita: 'Ago–Set', faseLua: '🌑 Nova', solo: 'Argiloso pH 5.8–6.5', obs: 'Janela principal de plantio no PR e SC.' },
      { n: 'Aveia', ico: '🌿', plantio: 'Abr–Mai', colheita: 'Set–Out', faseLua: '🌒 Crescente', solo: 'Ampla adaptação', obs: 'Cultivares: URS Taura, Brisasul (resistência à ferrugem).' },
      { n: 'Cevada', ico: '🌾', plantio: 'Abr–Mai', colheita: 'Set–Out', faseLua: '🌑 Nova', solo: 'Argiloso, boa fertilidade', obs: 'Malt barley — contrato com cervejeiras recomendado.' },
      { n: 'Cebola', ico: '🧅', plantio: 'Abr–Jun', colheita: 'Out–Dez', faseLua: '🌑 Nova', solo: 'Fértil, pH 6.0–6.5', obs: 'Transplante de mudas com 3–4 folhas.' },
      { n: 'Canola', ico: '🌻', plantio: 'Abr–Mai', colheita: 'Ago–Set', faseLua: '🌒 Crescente', solo: 'Drenado pH >6.0', obs: 'Última janela com bom potencial.' }
    ],
    colheita: [
      { n: 'Milho', ico: '🌽', colheita: 'Abr–Mai', obs: 'Aguardar palhada seca para trilha.', faseLua: '🌕 Cheia' },
      { n: 'Feijão', ico: '🌱', colheita: 'Abr–Mai', obs: 'Arrancar manualmente ou colheita antecipada.', faseLua: '🌕 Cheia' },
      { n: 'Maçã', ico: '🍎', colheita: 'Abr–Jun', obs: 'Monitorar ponto de maturação (iodo + amido).', faseLua: '🌕 Cheia' },
      { n: 'Pêra europeia', ico: '🍐', colheita: 'Abr–Mai', obs: 'Colher firme para amadurecer em câmara.', faseLua: '🌕 Cheia' }
    ],
    cuidados: [
      { n: 'Risco de geada', ico: '❄️', obs: 'Abril já registra geadas no RS serrano e SC. Proteger culturas sensíveis.' },
      { n: 'Poda de inverno', ico: '✂️', obs: 'Iniciar poda de macieiras, pereiras e pessegueiros em dias secos.' }
    ]
  },
  4: {
    plantio: [
      { n: 'Trigo', ico: '🌾', plantio: 'Mai–Jun', colheita: 'Set–Out', faseLua: '🌑 Nova', solo: 'Argiloso pH 5.8–6.5', obs: 'Plantio mais tardio. Usar cultivares de ciclo mais longo.' },
      { n: 'Aveia', ico: '🌿', plantio: 'Mai–Jun', colheita: 'Out–Nov', faseLua: '🌒 Crescente', solo: 'Ampla adaptação', obs: 'Boa opção para cobertura de solo e pastagem.' },
      { n: 'Alho', ico: '🧄', plantio: 'Mai–Jun', colheita: 'Nov–Dez', faseLua: '🌑 Nova', solo: 'Areno-argiloso', obs: 'Usar variedades roxo e cateto para o Sul.' },
      { n: 'Cebola', ico: '🧅', plantio: 'Mai–Jun', colheita: 'Nov–Dez', faseLua: '🌑 Nova', solo: 'Fértil bem drenado', obs: 'Ituporanga (SC) — capital nacional da cebola.' }
    ],
    colheita: [
      { n: 'Maçã', ico: '🍎', colheita: 'Mai–Jun', obs: 'Armazenagem em câmara fria a 1–2°C.', faseLua: '🌕 Cheia' },
      { n: 'Cebola', ico: '🧅', colheita: 'Mai–Jun', obs: 'Curar 7–10 dias antes de armazenar.', faseLua: '🌕 Cheia' },
      { n: 'Batata-doce', ico: '🍠', colheita: 'Mai–Jun', obs: 'Colher antes das geadas de junho.', faseLua: '🌕 Cheia' },
      { n: 'Mandioca', ico: '🍠', colheita: 'Mai–Jul', obs: '18–24 meses após o plantio.', faseLua: '🌕 Cheia' }
    ],
    cuidados: [
      { n: 'Geada frequente', ico: '❄️', obs: 'Maio é o mês mais crítico para geadas no Sul. Instalar termômetros de mínima na lavoura.' },
      { n: 'Drenagem do solo', ico: '💧', obs: 'Preparar valetas de drenagem antes das chuvas de inverno.' }
    ]
  },
  5: {
    plantio: [
      { n: 'Trigo', ico: '🌾', plantio: 'Jun–Jul', colheita: 'Out–Nov', faseLua: '🌑 Nova', solo: 'Argiloso pH 5.8–6.5', obs: 'Último período de plantio com garantia de resultado.' },
      { n: 'Aveia', ico: '🌿', plantio: 'Jun–Jul', colheita: 'Nov–Dez', faseLua: '🌒 Crescente', solo: 'Ampla adaptação', obs: 'Cultivares: URS Taura (resistente à ferrugem da coroa).' },
      { n: 'Alho', ico: '🧄', plantio: 'Jun', colheita: 'Nov–Dez', faseLua: '🌑 Nova', solo: 'Fértil drenado', obs: 'Curitibanos (SC) é a capital nacional do alho.' },
      { n: 'Cebola verão', ico: '🧅', plantio: 'Jun–Jul', colheita: 'Dez–Jan', faseLua: '🌑 Nova', solo: 'Fértil pH 6.0–6.5', obs: 'Variedades de verão têm ciclo mais longo.' }
    ],
    colheita: [
      { n: 'Maçã', ico: '🍎', colheita: 'Jun–Jul', obs: 'Variedades tardias: Fuji, Gala. Armazenagem ATM.', faseLua: '🌕 Cheia' },
      { n: 'Pêra europeia', ico: '🍐', colheita: 'Jun–Jul', obs: 'Pera Williams — colher firme.', faseLua: '🌕 Cheia' },
      { n: 'Batata-inglesa', ico: '🥔', colheita: 'Jun–Jul', obs: 'Aguardar palhada morta para colheita mecânica.', faseLua: '🌕 Cheia' }
    ],
    cuidados: [
      { n: 'Geada severa', ico: '🥶', obs: 'Junho: temperatura pode chegar a -8°C no RS e SC serrano. Verificar câmaras de aquecimento em estufas.' },
      { n: 'Poda de inverno', ico: '✂️', obs: 'Momento ideal para poda severa de frutíferas. Aplicar pasta bordalesa nos cortes.' }
    ]
  },
  6: {
    plantio: [
      { n: 'Trigo (último plantio)', ico: '🌾', plantio: 'Jul', colheita: 'Nov–Dez', faseLua: '🌑 Nova', solo: 'Argiloso pH 5.8–6.5', obs: 'Após julho o potencial produtivo cai significativamente.' },
      { n: 'Batata-inglesa', ico: '🥔', plantio: 'Jul–Ago', colheita: 'Nov–Dez', faseLua: '🌑 Nova', solo: 'Solto e fértil', obs: 'Usar tubérculos-semente certificados para evitar requeima.' },
      { n: 'Fumo', ico: '🌿', plantio: 'Jul–Ago', colheita: 'Out–Nov', faseLua: '🌒 Crescente', solo: 'Arenoso fértil', obs: 'Cultivar mudas em bandeja antes do transplante.' }
    ],
    colheita: [
      { n: 'Aveia', ico: '🌿', colheita: 'Jul–Ago', obs: 'Trilha com umidade dos grãos abaixo de 13%.', faseLua: '🌕 Cheia' },
      { n: 'Cebola', ico: '🧅', colheita: 'Jul–Ago', obs: 'Curar ao sol por 7–10 dias.', faseLua: '🌕 Cheia' },
      { n: 'Batata-inglesa', ico: '🥔', colheita: 'Jul–Ago', obs: 'Variedades precoces plantadas em maio.', faseLua: '🌕 Cheia' }
    ],
    cuidados: [
      { n: 'Oídio do trigo', ico: '⬜', obs: 'Dias nublados de julho favorecem o oídio. Monitorar e aplicar fungicida (triazol).' },
      { n: 'Grafolita do pêssego', ico: '🐛', obs: 'Instalar armadilhas de feromônio para monitoramento da mariposa-oriental.' }
    ]
  },
  7: {
    plantio: [
      { n: 'Milho precoce', ico: '🌽', plantio: 'Ago–Set', colheita: 'Jan–Mar', faseLua: '🌒 Crescente', solo: 'Argiloso fértil', obs: 'Plantio precoce antecipa colheita e reduz risco de seca.' },
      { n: 'Feijão das secas', ico: '🌱', plantio: 'Ago–Set', colheita: 'Nov–Dez', faseLua: '🌑 Nova', solo: 'Fértil pH 6.0–6.8', obs: '3ª safra. Potencial médio mas alta rentabilidade.' },
      { n: 'Batata-inglesa', ico: '🥔', plantio: 'Ago', colheita: 'Dez–Jan', faseLua: '🌑 Nova', solo: 'Solto e fértil', obs: 'Segunda safra. Usar cultivares de ciclo médio.' },
      { n: 'Fumo', ico: '🌿', plantio: 'Ago–Set', colheita: 'Nov–Dez', faseLua: '🌒 Crescente', solo: 'Arenoso fértil', obs: 'Transplante quando mudas atingirem 10–12cm.' }
    ],
    colheita: [
      { n: 'Trigo', ico: '🌾', colheita: 'Ago–Out', obs: 'Monitorar brusone na fase de espigamento.', faseLua: '🌕 Cheia' },
      { n: 'Aveia', ico: '🌿', colheita: 'Ago–Set', obs: 'Colher cedo para evitar debulha natural.', faseLua: '🌕 Cheia' },
      { n: 'Cevada', ico: '🌾', colheita: 'Ago–Set', obs: 'Umidade ideal para colheita: abaixo de 14%.', faseLua: '🌕 Cheia' }
    ],
    cuidados: [
      { n: 'Brusone no trigo', ico: '🍄', obs: 'Agosto com chuva no espigamento é catastrófico. Aplicar triazol + estrobilurina no florescimento.' },
      { n: 'Última geada', ico: '❄️', obs: 'Geadas tardias de agosto podem queimar flores de frutíferas. Monitorar previsão de tempo.' }
    ]
  },
  8: {
    plantio: [
      { n: 'Soja precoce', ico: '🫘', plantio: 'Set–Out', colheita: 'Jan–Mar', faseLua: '🌒 Crescente', solo: 'Argiloso pH 6.0–6.5', obs: 'Plantio precoce antecipa colheita e reduz risco de ferrugem.' },
      { n: 'Milho 1ª safra', ico: '🌽', plantio: 'Set–Out', colheita: 'Fev–Abr', faseLua: '🌒 Crescente', solo: 'Argiloso fértil', obs: 'Tratamento de sementes com inseticida + fungicida.' },
      { n: 'Feijão', ico: '🌱', plantio: 'Set–Nov', colheita: 'Dez–Jan', faseLua: '🌑 Nova', solo: 'Fértil pH 6.0–6.8', obs: 'Monitorar mosca-branca vetora do mosaico dourado.' },
      { n: 'Batata-inglesa', ico: '🥔', plantio: 'Set–Out', colheita: 'Jan–Mar', faseLua: '🌑 Nova', solo: 'Solto e fértil', obs: 'Plantar com solo úmido e temperatura acima de 10°C.' },
      { n: 'Fumo', ico: '🌿', plantio: 'Set', colheita: 'Dez–Jan', faseLua: '🌒 Crescente', solo: 'Arenoso fértil', obs: 'Transplante final da safra.' }
    ],
    colheita: [
      { n: 'Trigo', ico: '🌾', colheita: 'Set–Out', obs: 'Monitorar brusone. Colheita em dias secos.', faseLua: '🌕 Cheia' },
      { n: 'Cevada', ico: '🌾', colheita: 'Set–Out', obs: 'Trilha e secagem imediata.', faseLua: '🌕 Cheia' },
      { n: 'Fumo', ico: '🌿', colheita: 'Set–Nov', obs: 'Colher folhas no ponto de maturação correto.', faseLua: '🌕 Cheia' }
    ],
    cuidados: [
      { n: 'Ferrugem da coroa (aveia)', ico: '🟠', obs: 'Primavera úmida favorece explosão de ferrugem. Monitorar semanalmente e aplicar triazol preventivo.' },
      { n: 'Sarna da macieira', ico: '🍂', obs: 'Esporos de sarna liberados nas chuvas de setembro. Fungicidas preventivos são essenciais.' }
    ]
  },
  9: {
    plantio: [
      { n: 'Soja', ico: '🫘', plantio: 'Out–Nov', colheita: 'Jan–Abr', faseLua: '🌒 Crescente', solo: 'Argiloso pH 6.0–6.5', obs: 'Janela principal de plantio. Inocular com Bradyrhizobium.' },
      { n: 'Milho', ico: '🌽', plantio: 'Out–Nov', colheita: 'Mar–Mai', faseLua: '🌒 Crescente', solo: 'Argiloso fértil', obs: 'Plantar após temperatura do solo acima de 12°C.' },
      { n: 'Girassol', ico: '🌻', plantio: 'Out–Nov', colheita: 'Jan–Mar', faseLua: '🌒 Crescente', solo: 'Profundo drenado', obs: 'Bom preço de mercado no verão.' },
      { n: 'Sorgo', ico: '🌾', plantio: 'Out–Nov', colheita: 'Mar–Abr', faseLua: '🌑 Nova', solo: 'Tolera solo seco', obs: 'Opção para solos de baixa fertilidade.' },
      { n: 'Feijão', ico: '🌱', plantio: 'Out–Nov', colheita: 'Jan–Fev', faseLua: '🌑 Nova', solo: 'Fértil pH 6.0–6.8', obs: '2ª safra. Alta demanda de mercado.' }
    ],
    colheita: [
      { n: 'Trigo tardio', ico: '🌾', colheita: 'Out–Nov', obs: 'Últimas variedades tardias. Controle de brusone.', faseLua: '🌕 Cheia' },
      { n: 'Erva-mate (poda)', ico: '🌿', colheita: 'Out–Nov', obs: 'Época da poda de produção dos ervais.', faseLua: '🌕 Cheia' },
      { n: 'Fumo', ico: '🌿', colheita: 'Out–Nov', obs: 'Final da safra de fumo.', faseLua: '🌕 Cheia' }
    ],
    cuidados: [
      { n: 'Ferrugem asiática (soja)', ico: '🟠', obs: 'Monitorar semanalmente a partir do fechamento de linhas. Fungicida preventivo é mais eficaz.' },
      { n: 'Lagarta-do-cartucho', ico: '🐛', obs: 'Outubro é o pico de ocorrência. Monitorar talhões de milho diariamente.' }
    ]
  },
  10: {
    plantio: [
      { n: 'Soja', ico: '🫘', plantio: 'Nov–Dez', colheita: 'Mar–Mai', faseLua: '🌒 Crescente', solo: 'Argiloso pH 6.0–6.5', obs: 'Última janela com alto potencial. Plantio após colheita do trigo.' },
      { n: 'Milho', ico: '🌽', plantio: 'Nov', colheita: 'Abr–Mai', faseLua: '🌒 Crescente', solo: 'Argiloso fértil', obs: 'Plantio tardio — reduzir espaçamento para compensar.' },
      { n: 'Feijão', ico: '🌱', plantio: 'Nov–Dez', colheita: 'Fev–Mar', faseLua: '🌑 Nova', solo: 'Fértil pH 6.0–6.8', obs: 'Variedades de ciclo curto para melhor resultado.' },
      { n: 'Amendoim', ico: '🥜', plantio: 'Nov–Dez', colheita: 'Mar–Abr', faseLua: '🌑 Nova', solo: 'Arenoso drenado', obs: 'Temperatura do solo acima de 20°C.' }
    ],
    colheita: [
      { n: 'Batata-inglesa 2ª safra', ico: '🥔', colheita: 'Nov–Dez', obs: 'Colher antes das chuvas de verão.', faseLua: '🌕 Cheia' },
      { n: 'Feijão das secas', ico: '🌱', colheita: 'Nov–Dez', obs: 'Arrancar com palhada amarela.', faseLua: '🌕 Cheia' },
      { n: 'Maçã precoce', ico: '🍎', colheita: 'Nov–Dez', obs: 'Variedades precoces: Eva, Gala.', faseLua: '🌕 Cheia' }
    ],
    cuidados: [
      { n: 'Ferrugem da soja', ico: '🟠', obs: 'Novembro é o mês crítico. Não atrasar a aplicação de fungicida.' },
      { n: 'Percevejo-marrom', ico: '🐞', obs: 'Início da safra da soja aumenta pressão de percevejo. Monitorar com pano de batida.' }
    ]
  },
  11: {
    plantio: [
      { n: 'Soja 2ª época', ico: '🫘', plantio: 'Dez', colheita: 'Abr–Mai', faseLua: '🌒 Crescente', solo: 'Argiloso pH 6.0–6.5', obs: 'Plantio após colheita de culturas de inverno. Potencial de 80% da 1ª época.' },
      { n: 'Milho 2ª safra', ico: '🌽', plantio: 'Dez–Jan', colheita: 'Mai–Jun', faseLua: '🌒 Crescente', solo: 'Argiloso fértil', obs: 'Safrinha do milho. Necessita irrigação em janeiro.' },
      { n: 'Feijão das águas', ico: '🌱', plantio: 'Nov–Jan', colheita: 'Mar–Abr', faseLua: '🌑 Nova', solo: 'Fértil pH 6.0–6.8', obs: 'Potencial máximo. Risco de chuvas na floração.' },
      { n: 'Amendoim', ico: '🥜', plantio: 'Nov–Dez', colheita: 'Abr–Mai', faseLua: '🌑 Nova', solo: 'Arenoso drenado', obs: 'Plantar com temperatura acima de 20°C.' }
    ],
    colheita: [
      { n: 'Uva Niágara precoce', ico: '🍇', colheita: 'Dez–Jan', obs: 'Monitorar Botrytis em dias chuvosos.', faseLua: '🌕 Cheia' },
      { n: 'Pêssego precoce', ico: '🍑', colheita: 'Dez–Jan', obs: 'Variedades Chimarrita, Precocinho.', faseLua: '🌕 Cheia' },
      { n: 'Ameixa', ico: '🍑', colheita: 'Dez–Jan', obs: 'Colher firme para melhor pós-colheita.', faseLua: '🌕 Cheia' }
    ],
    cuidados: [
      { n: 'Granizo', ico: '🧊', obs: 'Dezembro tem alta frequência de granizo no Sul. Verificar telas e seguro agrícola.' },
      { n: 'Chuva excessiva', ico: '🌧️', obs: 'Período chuvoso pode atrasar a colheita de soja. Monitorar previsão de tempo.' }
    ]
  }
};

/* ── CONSTANTES ── */
const CAL_MESES_NOMES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const CAL_MESES_ABREV = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const CAL_DIAS_SEM    = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const CAL_ESTACOES    = { 0:'☀️ Verão', 1:'☀️ Verão', 2:'🍂 Outono', 3:'🍂 Outono', 4:'🍂 Outono', 5:'❄️ Inverno', 6:'❄️ Inverno', 7:'❄️ Inverno', 8:'🌸 Primavera', 9:'🌸 Primavera', 10:'🌸 Primavera', 11:'☀️ Verão' };

/* ── ESTADO ── */
let calMesSel  = new Date().getMonth();
let calAnoSel  = new Date().getFullYear();
let calItemSel = null;

/* ── CÁLCULO DE FASE LUNAR (algoritmo astronômico) ── */
function calFaseLua(ano, mes, dia) {
  const d = new Date(Date.UTC(ano, mes, dia, 12));
  const baseJD = 2451550.1;
  const jd = (d - new Date(Date.UTC(1900, 0, 1, 12))) / 86400000 + 2415020.5;
  const ciclo = 29.53058868;
  const fase = ((jd - baseJD) % ciclo + ciclo) % ciclo;

  if (fase < 1.85 || fase >= 27.68) return { fase: '🌑', nome: 'Nova',              agro: 'Plantar raízes e tubérculos' };
  if (fase < 7.38)                  return { fase: '🌒', nome: 'Crescente',          agro: 'Plantar folhas e frutos' };
  if (fase < 9.23)                  return { fase: '🌓', nome: 'Quarto Crescente',   agro: 'Enxertia e transplante' };
  if (fase < 14.77)                 return { fase: '🌔', nome: 'Gibosa Crescente',   agro: 'Plantar frutos e cereais' };
  if (fase < 16.62)                 return { fase: '🌕', nome: 'Cheia',              agro: 'Colheita e poda drástica' };
  if (fase < 22.15)                 return { fase: '🌖', nome: 'Gibosa Minguante',   agro: 'Poda de formação' };
  if (fase < 24.0)                  return { fase: '🌗', nome: 'Quarto Minguante',   agro: 'Adubação e calagem' };
  return                                   { fase: '🌘', nome: 'Minguante',           agro: 'Tratos culturais e capina' };
}

/* Retorna as 4 fases principais do mês (Nova, QC, Cheia, QM) */
function calFasesChave(ano, mes) {
  const diasMes = new Date(ano, mes + 1, 0).getDate();
  const fases   = [];
  let faseAnt   = null;
  const principais = ['Nova', 'Quarto Crescente', 'Cheia', 'Quarto Minguante'];

  for (let d = 1; d <= diasMes; d++) {
    const { fase, nome, agro } = calFaseLua(ano, mes, d);
    if (fase !== faseAnt && principais.includes(nome)) {
      fases.push({ dia: d, fase, nome, agro });
    }
    faseAnt = fase;
  }
  return fases;
}

/* ── RENDER PRINCIPAL ── */
function calRender() {
  const hoje         = new Date();
  const diaHoje      = (hoje.getMonth() === calMesSel && hoje.getFullYear() === calAnoSel) ? hoje.getDate() : -1;
  const diasMes      = new Date(calAnoSel, calMesSel + 1, 0).getDate();
  const dados        = DADOS_CALENDARIO[calMesSel];

  /* Cabeçalho */
  document.getElementById('cal-mes-nome').textContent    = CAL_MESES_NOMES[calMesSel];
  document.getElementById('cal-estacao-nome').textContent = CAL_ESTACOES[calMesSel];

  /* Fases-chave do mês */
  const fasesChave = calFasesChave(calAnoSel, calMesSel);
  document.getElementById('cal-lua-cards').innerHTML = fasesChave.slice(0, 4).map(f => `
    <div class="cal-lua-card">
      <span class="cal-lua-card-fase">${f.fase}</span>
      <span class="cal-lua-card-dia">Dia ${f.dia}</span>
      <span class="cal-lua-card-nome">${f.nome}</span>
      <span class="cal-lua-card-agro">${f.agro}</span>
    </div>`).join('');

  /* Faixa diária de fases */
  const strip = document.getElementById('cal-lua-strip');
  strip.innerHTML = '';
  for (let d = 1; d <= diasMes; d++) {
    const { fase, nome } = calFaseLua(calAnoSel, calMesSel, d);
    const dt  = new Date(calAnoSel, calMesSel, d);
    const sem = CAL_DIAS_SEM[dt.getDay()];
    const li  = document.createElement('div');
    li.className  = 'cal-lua-dia' + (d === diaHoje ? ' cal-hoje' : '');
    li.title      = nome;
    li.innerHTML  = `<span class="cal-lua-n">${sem} ${d}</span><span class="cal-lua-icon">${fase}</span>`;
    strip.appendChild(li);
  }

  /* Tags de culturas */
  calRenderTags('cal-tags-plantio',  dados.plantio,  'plantio');
  calRenderTags('cal-tags-colheita', dados.colheita, 'colheita');
  calRenderTags('cal-tags-cuidados', dados.cuidados, 'cuidado');

  /* Fecha detalhe ao trocar mês */
  document.getElementById('cal-detalhe').style.display = 'none';
  calItemSel = null;
}

function calRenderTags(containerId, lista, tipo) {
  const cont = document.getElementById(containerId);
  if (!cont) return;
  cont.innerHTML = lista.map((item, i) => `
    <button class="cal-tag cal-tag-${tipo}" data-tipo="${tipo}" data-idx="${i}" aria-pressed="false">
      ${item.ico} ${item.n}
    </button>`).join('');

  cont.querySelectorAll('.cal-tag').forEach(btn => {
    btn.addEventListener('click', () => calMostrarDetalhe(btn, lista, tipo));
  });
}

function calMostrarDetalhe(el, lista, tipo) {
  const idx  = parseInt(el.dataset.idx);
  const item = lista[idx];
  const chave = tipo + '-' + idx;
  const det   = document.getElementById('cal-detalhe');

  if (calItemSel === chave) {
    det.style.display = 'none';
    calItemSel = null;
    el.setAttribute('aria-pressed', 'false');
    return;
  }

  document.querySelectorAll('.cal-tag').forEach(t => t.setAttribute('aria-pressed', 'false'));
  el.setAttribute('aria-pressed', 'true');
  calItemSel = chave;

  const linhas = [
    item.plantio  ? ['🗓️ Época de plantio',   item.plantio]  : null,
    item.colheita ? ['🗓️ Época de colheita',  item.colheita] : null,
    item.faseLua  ? ['🌙 Fase ideal da lua',   item.faseLua]  : null,
    item.solo     ? ['🪱 Solo indicado',       item.solo]     : null,
    item.obs      ? ['💡 Observações',         item.obs]      : null,
  ].filter(Boolean);

  document.getElementById('cal-det-nome').textContent = item.ico + ' ' + item.n;
  document.getElementById('cal-det-linhas').innerHTML = linhas.map(([l, v]) => `
    <div class="cal-det-linha">
      <span class="cal-det-label">${l}</span>
      <span class="cal-det-valor">${v}</span>
    </div>`).join('');

  det.style.display = 'block';
  det.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ── INICIALIZAÇÃO ── */
function initCalendario() {
  const btnPrev = document.getElementById('cal-btn-prev');
  const btnNext = document.getElementById('cal-btn-next');
  if (!btnPrev || !btnNext) return;

  btnPrev.addEventListener('click', () => {
    calMesSel = (calMesSel - 1 + 12) % 12;
    if (calMesSel === 11) calAnoSel--;
    calRender();
  });

  btnNext.addEventListener('click', () => {
    calMesSel = (calMesSel + 1) % 12;
    if (calMesSel === 0) calAnoSel++;
    calRender();
  });

  calRender();
}

document.addEventListener('DOMContentLoaded', initCalendario);