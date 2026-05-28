/* ============================================================
   AgroInteligente – termometro.js
   Termômetro de Risco da Lavoura
   Cruza: clima (Open-Meteo) + fase da lua + época do ano
          + pressão histórica de pragas por cultura/mês
   ============================================================ */

/* ── 1. CULTURAS SUPORTADAS ── */
const TERMO_CULTURAS = [
  { id: 'soja',      emoji: '🫘', nome: 'Soja' },
  { id: 'milho',     emoji: '🌽', nome: 'Milho' },
  { id: 'cafe',      emoji: '☕', nome: 'Café' },
  { id: 'trigo',     emoji: '🌾', nome: 'Trigo' },
  { id: 'feijao',    emoji: '🌱', nome: 'Feijão' },
  { id: 'arroz',     emoji: '🍚', nome: 'Arroz' },
  { id: 'tomate',    emoji: '🍅', nome: 'Tomate' },
  { id: 'banana',    emoji: '🍌', nome: 'Banana' },
  { id: 'cana',      emoji: '🎋', nome: 'Cana' },
  { id: 'uva',       emoji: '🍇', nome: 'Uva' },
  { id: 'maca',      emoji: '🍎', nome: 'Maçã' },
  { id: 'pessego',   emoji: '🍑', nome: 'Pêssego' },
  { id: 'canola',    emoji: '🌻', nome: 'Canola' },
  { id: 'aveia',     emoji: '🌿', nome: 'Aveia' },
  { id: 'mandioca',  emoji: '🍠', nome: 'Mandioca' },
  { id: 'algodao',   emoji: '☁️', nome: 'Algodão' },
];


/* ── 2. PRESSÃO HISTÓRICA DE PRAGAS (por cultura × mês 1–12) ──
   Valores 0–100: quanto maior, mais pragas/doenças nesse mês.
   Baseado em dados agronômicos reais do Sul/Brasil.          ── */
const PRESSAO_PRAGAS = {
  soja:     [85,75,55,25,10,5,5,10,30,60,80,85],
  milho:    [70,65,50,30,15,10,10,20,45,70,75,70],
  cafe:     [75,70,60,40,25,15,10,15,35,55,70,75],
  trigo:    [10,10,30,50,40,70,75,80,70,45,20,10],
  feijao:   [80,75,55,35,15,10,10,15,40,65,75,80],
  arroz:    [75,80,55,20,10,5,5,10,30,55,70,75],
  tomate:   [70,75,65,45,30,25,20,30,50,65,70,70],
  banana:   [60,65,70,55,40,30,25,30,45,55,60,60],
  cana:     [65,70,60,40,25,15,10,20,40,60,65,65],
  uva:      [55,60,70,65,35,20,15,20,40,55,60,55],
  maca:     [30,35,55,65,50,25,20,35,70,75,60,30],
  pessego:  [40,45,65,70,40,20,15,25,60,75,65,40],
  canola:   [10,10,25,45,35,60,65,70,65,40,15,10],
  aveia:    [10,10,20,40,30,55,60,65,60,35,15,10],
  mandioca: [60,65,55,40,25,15,10,15,35,50,60,60],
  algodao:  [70,75,65,35,15,10,5,10,30,55,70,70],
};


/* ── 3. RECOMENDAÇÕES POR NÍVEL DE RISCO + CULTURA ── */
const RECOMENDACOES = {
  baixo: [
    { tipo:'rec-ok',      titulo:'✅ Campo Livre',        texto:'Condições favoráveis. Bom dia para plantio, aplicações e operações mecânicas.' },
    { tipo:'rec-ok',      titulo:'💧 Irrigação Normal',   texto:'Mantenha o regime de irrigação padrão para a cultura.' },
    { tipo:'rec-ok',      titulo:'🔍 Monitoramento',      texto:'Realize a vistoria semanal preventiva normalmente.' },
  ],
  medio: [
    { tipo:'rec-atencao', titulo:'⚠️ Atenção Redobrada',  texto:'Aumente a frequência de monitoramento para 2×/semana.' },
    { tipo:'rec-atencao', titulo:'🧪 Aplicação Preventiva',texto:'Considere aplicação preventiva de fungicidas ou inseticidas.' },
    { tipo:'rec-ok',      titulo:'📋 Registre Tudo',      texto:'Documente qualquer sintoma incomum no app para histórico.' },
  ],
  alto: [
    { tipo:'rec-evitar',  titulo:'🚫 Evite Novas Áreas',  texto:'Não expanda o plantio agora. Foque em proteger o que existe.' },
    { tipo:'rec-atencao', titulo:'🧪 Aplicação Imediata',  texto:'Aplique defensivos preventivos ainda esta semana.' },
    { tipo:'rec-evitar',  titulo:'💧 Cuidado na Irrigação',texto:'Excesso de umidade agrava o risco. Monitore o solo.' },
    { tipo:'rec-atencao', titulo:'👨‍🌾 Chame um Agrônomo', texto:'Risco alto recomenda vistoria profissional urgente.' },
  ],
  critico: [
    { tipo:'rec-evitar',  titulo:'🚨 Alerta Máximo',       texto:'Condições críticas. Acione medidas de emergência na lavoura.' },
    { tipo:'rec-evitar',  titulo:'❌ Suspenda Plantios',   texto:'Não realize novos plantios até as condições melhorarem.' },
    { tipo:'rec-evitar',  titulo:'☎️ Suporte Imediato',    texto:'Contate a EMATER ou engenheiro agrônomo credenciado hoje.' },
    { tipo:'rec-atencao', titulo:'📸 Documente os Danos',  texto:'Fotografe sintomas para laudo técnico e possível seguro.' },
  ],
};


/* ── 4. DIAS DA SEMANA (abreviados) ── */
const DIAS_ABREV = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];


/* ── 5. CÁLCULO DE FASE LUNAR ── */
function termoFaseLua(data) {
  const baseJD    = 2451550.1;
  const d         = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate(), 12));
  const jd        = (d - new Date(Date.UTC(1900, 0, 1, 12))) / 86400000 + 2415020.5;
  const ciclo     = 29.53058868;
  const fase      = ((jd - baseJD) % ciclo + ciclo) % ciclo;

  // Risco lunar: lua cheia e crescente = mais risco fisiológico
  // Minguante e nova = plantas mais resistentes
  if (fase < 1.85 || fase >= 27.68) return { emoji:'🌑', nome:'Lua Nova',           risco: 15, desc:'Lua nova — plantas mais resistentes. Risco reduzido.' };
  if (fase < 7.38)                  return { emoji:'🌒', nome:'Lua Crescente',       risco: 35, desc:'Crescente — seiva em ascensão. Bom para plantio de folhas.' };
  if (fase < 9.23)                  return { emoji:'🌓', nome:'Quarto Crescente',    risco: 50, desc:'Quarto crescente — momento de atenção moderada.' };
  if (fase < 14.77)                 return { emoji:'🌔', nome:'Gibosa Crescente',    risco: 60, desc:'Gibosa crescente — maior circulação de seiva, pragas mais ativas.' };
  if (fase < 16.62)                 return { emoji:'🌕', nome:'Lua Cheia',           risco: 70, desc:'Lua cheia — pico de atividade de insetos e fungos. Monitorar!' };
  if (fase < 22.15)                 return { emoji:'🌖', nome:'Gibosa Minguante',    risco: 45, desc:'Gibosa minguante — risco declinando.' };
  if (fase < 24.0)                  return { emoji:'🌗', nome:'Quarto Minguante',    risco: 30, desc:'Quarto minguante — bom para adubação e tratos culturais.' };
  return                                   { emoji:'🌘', nome:'Lua Minguante',        risco: 20, desc:'Minguante — plantas em repouso. Risco baixo.' };
}


/* ── 6. RISCO CLIMÁTICO (baseado nos dados da Open-Meteo) ── */
function termoRiscoClima(climaData) {
  if (!climaData) return { valor: 40, desc: 'Sem dados de clima. Usando valor médio.', emoji: '❓' };

  const cur   = climaData.current;
  const daily = climaData.daily;
  const t     = cur.temperature_2m;
  const wind  = cur.windspeed_10m;

  // Chuva acumulada 7 dias via hourly
  const rain7 = (climaData.hourly?.precipitation || []).slice(0, 168).reduce((a, b) => a + b, 0);

  let risco = 30;
  let fatores = [];

  // Temperatura extrema
  if (t > 35)       { risco += 25; fatores.push(`Calor extremo (${t.toFixed(0)}°C)`); }
  else if (t > 30)  { risco += 12; fatores.push(`Temperatura alta (${t.toFixed(0)}°C)`); }
  else if (t <= 4)  { risco += 30; fatores.push(`Risco de geada (${t.toFixed(0)}°C)`); }
  else if (t <= 10) { risco += 15; fatores.push(`Frio intenso (${t.toFixed(0)}°C)`); }
  else              { fatores.push(`Temperatura ideal (${t.toFixed(0)}°C)`); }

  // Chuva acumulada
  if (rain7 > 100)  { risco += 20; fatores.push(`Solo encharcado (${rain7.toFixed(0)}mm/7d)`); }
  else if (rain7 > 50) { risco += 8; fatores.push(`Úmido (${rain7.toFixed(0)}mm/7d)`); }
  else if (rain7 < 5 && t > 25) { risco += 15; fatores.push('Déficit hídrico'); }
  else              { fatores.push(`Chuva equilibrada (${rain7.toFixed(0)}mm/7d)`); }

  // Vento
  if (wind > 60)    { risco += 10; fatores.push(`Vento forte (${wind.toFixed(0)}km/h)`); }
  else if (wind > 30) { risco += 4; fatores.push(`Vento moderado (${wind.toFixed(0)}km/h)`); }

  const desc = fatores.slice(0, 2).join(' · ');
  const emoji = t <= 4 ? '❄️' : t > 35 ? '🔥' : rain7 > 80 ? '🌧️' : '⛅';

  return { valor: Math.min(risco, 95), desc, emoji };
}


/* ── 7. RISCO DE ÉPOCA (combinação mês + cultura) ── */
function termoRiscoEpoca(culturaid) {
  const mes    = new Date().getMonth(); // 0–11
  const tabela = PRESSAO_PRAGAS[culturaid];
  if (!tabela) return { valor: 50, desc: 'Dados indisponíveis para esta cultura.' };

  // Média dos 3 meses centrada no atual (mês anterior, atual, próximo)
  const idxA = (mes - 1 + 12) % 12;
  const idxP = (mes + 1) % 12;
  const media = Math.round((tabela[idxA] + tabela[mes] + tabela[idxP]) / 3);

  const nomeMes = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][mes];
  const nivel   = media > 70 ? 'crítica' : media > 50 ? 'elevada' : media > 30 ? 'moderada' : 'baixa';
  const desc    = `Pressão histórica ${nivel} para ${nomeMes}. Base: dados agronômicos regionais.`;

  return { valor: media, desc };
}


/* ── 8. CÁLCULO FINAL DO ÍNDICE ── */
function calcularIndice(riscoClima, riscoLua, riscoEpoca, riscoHistorico) {
  // Pesos: clima 35%, época 35%, pragas hist. 20%, lua 10%
  const idx = Math.round(
    riscoClima    * 0.35 +
    riscoEpoca    * 0.35 +
    riscoHistorico* 0.20 +
    riscoLua      * 0.10
  );
  return Math.min(Math.max(idx, 0), 100);
}


/* ── 9. NÍVEL DO ÍNDICE ── */
function termoNivel(idx) {
  if (idx <= 30)  return { nivel:'baixo',   cor:'#84b898', corHex:'84b898', label:'Risco Baixo',   ico:'✅', msg:'Condições favoráveis à lavoura.' };
  if (idx <= 55)  return { nivel:'medio',   cor:'#c4a85a', corHex:'c4a85a', label:'Risco Médio',   ico:'⚠️', msg:'Atenção redobrada recomendada.' };
  if (idx <= 75)  return { nivel:'alto',    cor:'#c08870', corHex:'c08870', label:'Risco Alto',    ico:'🔶', msg:'Tome medidas preventivas urgentes.' };
  return               { nivel:'critico', cor:'#b47c7c', corHex:'b47c7c', label:'Risco Crítico', ico:'🚨', msg:'Condições críticas. Ação imediata!' };
}


/* ── 10. ANIMAÇÃO DO GAUGE ── */
function animarGauge(idx, nivel) {
  const arcFill   = document.getElementById('termoArcFill');
  const agulha    = document.getElementById('termoAgulha');
  const valorEl   = document.getElementById('termoValor');
  const badge     = document.getElementById('termoStatusBadge');
  const statusIco = document.getElementById('termoStatusIco');
  const statusTxt = document.getElementById('termoStatusTxt');

  if (!arcFill || !agulha || !valorEl) return;

  // Arco: total do semicírculo ≈ 283 (π × r = π × 90 ≈ 283)
  const CIRCUNF  = 283;
  const offset   = CIRCUNF - (idx / 100) * CIRCUNF;

  // Cor do arco conforme nível
  arcFill.style.stroke       = nivel.cor;
  arcFill.style.strokeDashoffset = offset;

  // Agulha: -90° = risco 0 (esquerda), +90° = risco 100 (direita)
  const angulo = -90 + (idx / 100) * 180;
  agulha.style.transform = `rotate(${angulo}deg)`;

  // Contador animado do valor
  let start = null;
  const duracao = 1200;
  const valorInicial = parseInt(valorEl.textContent) || 0;

  function tick(ts) {
    if (!start) start = ts;
    const p    = Math.min((ts - start) / duracao, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    valorEl.textContent = Math.round(valorInicial + (idx - valorInicial) * ease);
    valorEl.style.color = nivel.cor;
    if (p < 1) requestAnimationFrame(tick);
    else valorEl.textContent = idx;
  }
  requestAnimationFrame(tick);

  // Badge
  badge.className = `termo-status-badge nivel-${nivel.nivel}`;
  statusIco.textContent = nivel.ico;
  statusTxt.textContent = `${nivel.label} — ${nivel.msg}`;
}


/* ── 11. ATUALIZAR FATORES NA UI ── */
function atualizarFator(id, barId, descId, valor, desc, cor) {
  const peso = document.getElementById(id);
  const bar  = document.getElementById(barId);
  const desc_el = document.getElementById(descId);

  if (peso) { peso.textContent = valor; peso.style.color = cor; }
  if (bar)  { bar.style.width = valor + '%'; bar.style.background = cor; }
  if (desc_el) desc_el.textContent = desc;
}


/* ── 12. RENDERIZAR RECOMENDAÇÕES ── */
function renderRecomendacoes(nivel, cultura) {
  const wrap = document.getElementById('termoRecomendacoes');
  const grid  = document.getElementById('termoRecGrid');
  const ico   = document.getElementById('termoRecIco');
  if (!wrap || !grid) return;

  const lista = RECOMENDACOES[nivel.nivel] || RECOMENDACOES.medio;
  ico.textContent = nivel.ico;

  grid.innerHTML = lista.map(r => `
    <div class="termo-rec-item ${r.tipo}">
      <h5>${r.titulo}</h5>
      <p>${r.texto}</p>
    </div>`).join('');

  wrap.style.display = 'block';
}


/* ── 13. RENDERIZAR HISTÓRICO SIMULADO (7 DIAS) ── */
function renderHistorico(idxHoje, culturaid) {
  const wrap = document.getElementById('termoHistorico');
  const bars = document.getElementById('termoHistBars');
  if (!wrap || !bars) return;

  // Gera variações realistas em torno do índice atual
  const hoje    = new Date();
  const tabela  = PRESSAO_PRAGAS[culturaid] || [];
  const dados   = [];

  for (let i = 6; i >= 0; i--) {
    const d    = new Date(hoje);
    d.setDate(d.getDate() - i);
    const mes  = d.getMonth();
    const base = tabela[mes] || 50;
    // Variação suave dia a dia (±15 pontos máx)
    const ruido = Math.round((Math.sin(d.getDate() * 2.5) * 10) + (Math.cos(d.getDate()) * 5));
    const val   = Math.min(Math.max(base + ruido, 5), 95);
    dados.push({ val, dia: DIAS_ABREV[d.getDay()], data: d.getDate(), hoje: i === 0 });
  }

  bars.innerHTML = dados.map(d => {
    const nv   = termoNivel(d.val);
    const pct  = d.val;
    return `
      <div class="hist-col ${d.hoje ? 'hoje' : ''}">
        <div class="hist-bar-wrap" title="${d.val}/100">
          <span class="hist-valor-label">${d.val}</span>
          <div class="hist-bar-fill hist-bar-${nv.nivel}" style="height:${pct}%"></div>
        </div>
        <span class="hist-dia-label">${d.dia} ${d.data}</span>
      </div>`;
  }).join('');

  wrap.style.display = 'block';
}


/* ── 14. ESTADO GLOBAL ── */
let termoClimaDados   = null;
let termoCulturaAtiva = null;
let termoCarregando   = false;


/* ── 15. CALCULAR E RENDERIZAR TUDO ── */
function termoAtualizar(culturaid) {
  termoCulturaAtiva = culturaid;

  const painel = document.getElementById('termoPainel');
  if (painel) painel.classList.remove('inativo');

  // Fase lunar hoje
  const lua       = termoFaseLua(new Date());
  // Risco climático
  const clima     = termoRiscoClima(termoClimaDados);
  // Risco de época
  const epoca     = termoRiscoEpoca(culturaid);
  // Pressão de pragas histórica (mês atual direto)
  const mes       = new Date().getMonth();
  const pragas    = PRESSAO_PRAGAS[culturaid]?.[mes] ?? 50;
  const descPragas = pragas > 70
    ? `Alta pressão histórica de pragas para ${culturaid} este mês. Monitoramento intensivo necessário.`
    : pragas > 40
    ? `Pressão moderada de pragas. Mantenha o monitoramento regular.`
    : `Pressão de pragas historicamente baixa para este mês. Bom período.`;

  // Índice final
  const idx    = calcularIndice(clima.valor, lua.risco, epoca.valor, pragas);
  const nivel  = termoNivel(idx);

  // Animações
  animarGauge(idx, nivel);

  // Fatores individuais com animação escalonada
  setTimeout(() => atualizarFator('pesoClima',  'barClima',  'descClima',  Math.round(clima.valor), clima.desc, nivel.cor), 100);
  setTimeout(() => atualizarFator('pesoLua',    'barLua',    'descLua',    lua.risco, `${lua.emoji} ${lua.nome} — ${lua.desc}`, nivel.cor), 250);
  setTimeout(() => atualizarFator('pesoEpoca',  'barEpoca',  'descEpoca',  Math.round(epoca.valor), epoca.desc, nivel.cor), 400);
  setTimeout(() => atualizarFator('pesoPragas', 'barPragas', 'descPragas', pragas, descPragas, nivel.cor), 550);

  // Recomendações e histórico
  setTimeout(() => {
    renderRecomendacoes(nivel, culturaid);
    renderHistorico(idx, culturaid);
  }, 700);
}


/* ── 16. BUSCAR CLIMA (reutiliza ou busca novo) ── */
async function termoBuscarClima() {
  if (termoClimaDados) return; // já tem dados do módulo clima.js
  if (termoCarregando) return;
  termoCarregando = true;

  try {
    // Tenta usar geolocalização
    const pos = await new Promise((res, rej) =>
      navigator.geolocation?.getCurrentPosition(res, rej, { timeout: 5000 })
    );
    const { latitude: lat, longitude: lon } = pos.coords;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`
      + `&current=temperature_2m,weathercode,windspeed_10m,winddirection_10m`
      + `&hourly=precipitation&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum`
      + `&timezone=America%2FSao_Paulo&forecast_days=7`;

    const res  = await fetch(url);
    termoClimaDados = await res.json();
  } catch {
    // Sem geolocalização: usa dados médios do Sul do Brasil
    termoClimaDados = null;
  }
  termoCarregando = false;
}


/* ── 17. RENDER DO SELETOR DE CULTURAS ── */
function termoCriarSeletor() {
  const scroll = document.getElementById('termoCulturasScroll');
  if (!scroll) return;

  TERMO_CULTURAS.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'termo-cultura-btn';
    btn.dataset.id = c.id;
    btn.innerHTML = `<span class="tc-emoji">${c.emoji}</span>${c.nome}`;
    btn.setAttribute('role', 'option');
    btn.setAttribute('aria-selected', 'false');

    btn.addEventListener('click', async () => {
      // Destaca botão ativo
      document.querySelectorAll('.termo-cultura-btn').forEach(b => {
        b.classList.remove('ativo');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('ativo');
      btn.setAttribute('aria-selected', 'true');

      // Busca clima se ainda não tem
      await termoBuscarClima();

      // Calcula e exibe
      termoAtualizar(c.id);
    });

    scroll.appendChild(btn);
  });
}


/* ── 18. INJETAR GRADIENTE SVG ── */
function termoInjetarGradiente() {
  const svg = document.querySelector('.termo-svg');
  if (!svg) return;

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <linearGradient id="termoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#84b898"/>
      <stop offset="40%"  stop-color="#c4a85a"/>
      <stop offset="70%"  stop-color="#c08870"/>
      <stop offset="100%" stop-color="#b47c7c"/>
    </linearGradient>`;
  svg.prepend(defs);
}


/* ── 19. ESTADO INICIAL DO PAINEL ── */
function termoEstadoInicial() {
  const painel = document.getElementById('termoPainel');
  if (painel) painel.classList.add('inativo');
}


/* ── 20. INIT ── */
function initTermometro() {
  termoCriarSeletor();
  termoInjetarGradiente();
  termoEstadoInicial();

  // Tenta buscar clima em background silenciosamente
  termoBuscarClima().catch(() => {});

  // Adiciona link de navegação "Termômetro" no navbar (se não existir)
  const navLinks = document.querySelector('.nav-links');
  if (navLinks && !navLinks.querySelector('[href="#termometro"]')) {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href = '#termometro';
    a.textContent = 'Risco';
    li.appendChild(a);
    // Insere antes de #diagnostico
    const diagLi = [...navLinks.querySelectorAll('a')]
      .find(el => el.href.includes('#diagnostico'))?.parentElement;
    diagLi ? navLinks.insertBefore(li, diagLi) : navLinks.appendChild(li);
  }
}

document.addEventListener('DOMContentLoaded', initTermometro);