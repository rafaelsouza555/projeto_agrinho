/* ============================================================
   AgroInteligente – clima-eventos.js
   Pop-up de Alertas de Eventos Climáticos Globais
   Integra ao visual do AgroInteligente sem dependências externas.
   
   COMO USAR:
     1. Importe este arquivo APÓS app.js e clima.js no HTML:
        <script src="Projeto-Agrinho/assets/js/clima-eventos.js"></script>
     2. Importe o CSS correspondente no <head>:
        <link rel="stylesheet" href="Projeto-Agrinho/assets/css/clima-eventos.css">
============================================================ */

/* ============================================================
   1. DADOS DOS EVENTOS CLIMÁTICOS
   Cada evento possui: id, ícone, título, badge de severidade,
   descrição geral, impactos por cultura e CSS de cor.
============================================================ */
const EVENTOS_CLIMATICOS = [
  {
    id: "el_nino",
    icone: "🌊",
    titulo: "El Niño Moderado Ativo",
    badge: "⚡ ATIVO 2025–26",
    descricao:
      "O fenômeno El Niño está ativo sobre o Pacífico Equatorial desde meados de 2025. " +
      "Para o Sul do Brasil, o padrão histórico indica chuvas acima da média nos meses de " +
      "inverno e primavera, com temperaturas mais amenas no verão. Monitoramento semanal é essencial.",
    impactos: [
      "Soja: risco elevado de ferrugem asiática com maior umidade foliar",
      "Trigo e Aveia: favorece brusone e giberela no espigamento",
      "Fruticultura (Maçã/Pêssego): primavera mais chuvosa aumenta pressão de sarna e monilínia",
      "Milho: janela de plantio pode ser antecipada com solo úmido em agosto/setembro",
      "Canola: risco elevado de Sclerotinia com umidade persistente",
    ],
    severidade: "cuidado",
    /* Variáveis CSS que definem o esquema de cor do evento */
    css: {
      "--evento-cor":         "linear-gradient(90deg, #4e9bca, #2a6fa0)",
      "--evento-bg-icon":     "rgba(78, 155, 202, 0.12)",
      "--evento-borda-icon":  "rgba(78, 155, 202, 0.28)",
      "--evento-glow":        "rgba(78, 155, 202, 0.3)",
      "--evento-acento":      "#88c8f5",
      "--evento-badge-bg":    "rgba(78, 155, 202, 0.15)",
      "--evento-badge-cor":   "#a8d8f8",
      "--evento-badge-borda": "rgba(78, 155, 202, 0.35)",
    },
  },
  {
    id: "frentes_frias",
    icone: "❄️",
    titulo: "Frentes Frias Intensas",
    badge: "⚠️ ATENÇÃO JUNHO–AGO",
    descricao:
      "O inverno 2026 apresenta passagem de frentes frias com maior frequência sobre o Sul. " +
      "Rajadas de vento acima de 60 km/h e geadas abaixo de -4°C são esperadas em áreas " +
      "de altitude acima de 800m no RS e SC. Adote medidas preventivas nas lavouras de inverno.",
    impactos: [
      "Trigo e Aveia: geadas no espigamento causam perda direta na produção",
      "Fruticultura: flores de pessegueiro e pereira sensíveis a -2°C",
      "Horticultura: proteger alface, brócolis e tomate com manta agrícola",
      "Erva-mate: folhas novas podem ser queimadas por geadas tardias de agosto",
      "Pastagem: crescimento paralisado. Reforce reservas de forragem",
    ],
    severidade: "critico",
    css: {
      "--evento-cor":         "linear-gradient(90deg, #a8c8ff, #6090d0)",
      "--evento-bg-icon":     "rgba(130, 180, 255, 0.1)",
      "--evento-borda-icon":  "rgba(130, 180, 255, 0.25)",
      "--evento-glow":        "rgba(130, 180, 255, 0.25)",
      "--evento-acento":      "#b8d8ff",
      "--evento-badge-bg":    "rgba(180, 64, 64, 0.18)",
      "--evento-badge-cor":   "#ff9999",
      "--evento-badge-borda": "rgba(224, 64, 64, 0.35)",
    },
  },
  {
    id: "deficit_hidrico",
    icone: "🏜️",
    titulo: "Déficit Hídrico no Verão",
    badge: "🟡 MONITORAR",
    descricao:
      "Projeções apontam para Janeiro–Fevereiro de 2026 com precipitação 15–30% abaixo " +
      "da média histórica em partes do Paraná e Rio Grande do Sul. Veranicos de até 18 dias " +
      "são possíveis. Planeje a irrigação e utilize cobertura de solo para reduzir a evaporação.",
    impactos: [
      "Soja: déficit hídrico no florescimento (R1–R3) pode reduzir produção em 20–40%",
      "Milho: estresse no pendoamento compromete a polinização e enchimento de grãos",
      "Pastagem: paralisação de crescimento — forme reservas de silagem agora",
      "Fruticultura: aumente a frequência de irrigação em pêssego e maçã",
      "Feijão das águas: monitorar campo diariamente na fase de enchimento de vagens",
    ],
    severidade: "cuidado",
    css: {
      "--evento-cor":         "linear-gradient(90deg, #f5c842, #e88030)",
      "--evento-bg-icon":     "rgba(245, 200, 66, 0.1)",
      "--evento-borda-icon":  "rgba(245, 200, 66, 0.25)",
      "--evento-glow":        "rgba(245, 200, 66, 0.28)",
      "--evento-acento":      "#f5dc7a",
      "--evento-badge-bg":    "rgba(245, 200, 66, 0.15)",
      "--evento-badge-cor":   "#f5e07a",
      "--evento-badge-borda": "rgba(245, 200, 66, 0.3)",
    },
  },
  {
    id: "granizo",
    icone: "🧊",
    titulo: "Temporada de Granizo",
    badge: "🔴 ALTO RISCO",
    descricao:
      "O período de outubro a março concentra 80% das ocorrências de granizo no Sul do Brasil. " +
      "A Serra Gaúcha, Planalto Catarinense e Norte do Paraná são as regiões mais afetadas. " +
      "Sistemas convectivos intensos podem gerar pedras de até 5 cm de diâmetro.",
    impactos: [
      "Fruticultura: instale telas antigranizo em pomares de maçã, pêssego e uva",
      "Soja e Milho: granizo no florescimento pode destruir 100% da lavoura",
      "Verifique e renove o seguro agrícola antes de outubro",
      "Instale estação meteorológica ou assine alertas do INMET/Climatempo",
      "Construa ou reforce galpões para proteger máquinas e equipamentos",
    ],
    severidade: "critico",
    css: {
      "--evento-cor":         "linear-gradient(90deg, #e04040, #b02020)",
      "--evento-bg-icon":     "rgba(224, 64, 64, 0.1)",
      "--evento-borda-icon":  "rgba(224, 64, 64, 0.25)",
      "--evento-glow":        "rgba(224, 64, 64, 0.28)",
      "--evento-acento":      "#ff9999",
      "--evento-badge-bg":    "rgba(224, 64, 64, 0.18)",
      "--evento-badge-cor":   "#ff9999",
      "--evento-badge-borda": "rgba(224, 64, 64, 0.35)",
    },
  },
  {
    id: "dipolo_atlantico",
    icone: "🌀",
    titulo: "Dipolo do Atlântico Sul",
    badge: "ℹ️ EM OBSERVAÇÃO",
    descricao:
      "O Dipolo do Atlântico Sul apresenta anomalia positiva de temperatura, " +
      "padrão associado a bloqueios atmosféricos sobre o Sul do Brasil. " +
      "Isso pode significar períodos mais longos sem chuva intercalados com eventos " +
      "de chuva intensa e concentrada. Acompanhe as previsões estendidas do CPTEC/INPE.",
    impactos: [
      "Planejamento de safra: maior variabilidade climática — amplie o seguro",
      "Irrigação: implante tensionômetros para irrigar com precisão",
      "Culturas de ciclo longo (cana, mandioca) são menos afetadas que anuais",
      "Considere cultivares de ciclo curto para reduzir exposição ao risco climático",
      "Registre no app AgroInteligente todas as ocorrências para histórico da propriedade",
    ],
    severidade: "leve",
    css: {
      "--evento-cor":         "linear-gradient(90deg, #84b898, #3a5445)",
      "--evento-bg-icon":     "rgba(132, 184, 152, 0.1)",
      "--evento-borda-icon":  "rgba(132, 184, 152, 0.25)",
      "--evento-glow":        "rgba(132, 184, 152, 0.25)",
      "--evento-acento":      "#a8f0bc",
      "--evento-badge-bg":    "rgba(120, 152, 184, 0.15)",
      "--evento-badge-cor":   "#a8c8e8",
      "--evento-badge-borda": "rgba(120, 152, 184, 0.3)",
    },
  },
];


/* ============================================================
   2. ESTADO DO POP-UP
============================================================ */
let ceEventoAtual  = 0;     // índice do evento visível
let ceAberto       = false; // controla se o overlay está visível
const CE_DELAY_MS  = 2800;  // tempo até aparecer automaticamente


/* ============================================================
   3. FUNÇÕES AUXILIARES
============================================================ */

/** Aplica as variáveis CSS do evento ao card. */
function ceAplicarCores(css) {
  const card = document.getElementById("climaEventoCard");
  if (!card) return;
  Object.entries(css).forEach(([prop, val]) => card.style.setProperty(prop, val));
}

/** Atualiza o conteúdo do card com o evento na posição `idx`. */
function ceRenderEvento(idx) {
  const ev = EVENTOS_CLIMATICOS[idx];
  if (!ev) return;

  // Textos
  document.getElementById("ce-icone").textContent    = ev.icone;
  document.getElementById("ce-titulo").textContent   = ev.titulo;
  document.getElementById("ce-badge").textContent    = ev.badge;
  document.getElementById("ce-descricao").textContent = ev.descricao;

  // Lista de impactos
  const lista = document.getElementById("ce-impacto-lista");
  lista.innerHTML = ev.impactos
    .map(imp => `<li>${imp}</li>`)
    .join("");

  // Cores e estilo
  ceAplicarCores(ev.css);

  // Indicadores (dots)
  document.querySelectorAll(".ce-dot").forEach((dot, i) => {
    dot.classList.toggle("ativo", i === idx);
  });

  // Trigger badge
  const triggerBadge = document.getElementById("ce-trigger-badge-txt");
  if (triggerBadge) triggerBadge.textContent = ev.badge.replace(/[^\w\s–]/g, "").trim();
}

/** Navega para o evento anterior/próximo. */
function ceNavegar(direcao) {
  const total = EVENTOS_CLIMATICOS.length;
  ceEventoAtual = (ceEventoAtual + direcao + total) % total;
  ceRenderEvento(ceEventoAtual);
}


/* ============================================================
   4. CONTROLES DO POP-UP
============================================================ */

/** Abre o overlay e exibe o card. */
function ceAbrir(eventoIdx = ceEventoAtual) {
  const overlay = document.getElementById("climaEventoOverlay");
  const card    = document.getElementById("climaEventoCard");
  const trigger = document.getElementById("climaEventoTrigger");
  if (!overlay || !card) return;

  ceEventoAtual = eventoIdx;
  ceRenderEvento(ceEventoAtual);

  overlay.style.display = "flex";
  // Aguarda um frame para a transição funcionar
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add("aberto");
      card.classList.add("visivel");
    });
  });

  // Esconde o trigger flutuante
  if (trigger) trigger.classList.remove("visivel");
  ceAberto = true;
}

/** Fecha o pop-up e exibe o mini trigger. */
function ceFechar() {
  const overlay = document.getElementById("climaEventoOverlay");
  const card    = document.getElementById("climaEventoCard");
  if (!overlay || !card) return;

  overlay.classList.remove("aberto");
  card.classList.remove("visivel");
  ceAberto = false;

  // Esconde o overlay depois da animação
  setTimeout(() => {
    overlay.style.display = "none";
    // Mostra o trigger flutuante
    const trigger = document.getElementById("climaEventoTrigger");
    if (trigger) trigger.classList.add("visivel");
  }, 450);
}

/** Dispensa para esta sessão. */
function ceDispensar() {
  ceFechar();
  // Oculta o trigger por 10 minutos (reativa em visitas futuras)
  sessionStorage.setItem("ce_dispensado", Date.now().toString());
}


/* ============================================================
   5. CRIAÇÃO DO HTML DO POP-UP (injetado dinamicamente)
   Evita poluir o index.html com muita marcação.
============================================================ */

function ceCriarHTML() {
  // Gera os dots de navegação
  const dots = EVENTOS_CLIMATICOS.map((_, i) =>
    `<button class="ce-dot${i === 0 ? " ativo" : ""}" data-idx="${i}" aria-label="Evento ${i + 1}"></button>`
  ).join("");

  const html = `
    <!-- Overlay principal -->
    <div id="climaEventoOverlay" role="dialog" aria-modal="true"
         aria-labelledby="ce-titulo" style="display:none">
      <div id="climaEventoCard">

        <!-- Header -->
        <div class="ce-header">
          <div class="ce-header-left">
            <div class="ce-icone-wrap" id="ce-icone" aria-hidden="true">🌊</div>
            <div class="ce-header-texto">
              <span class="ce-rotulo">⚡ Alerta Climático · Sul do Brasil</span>
              <h2 class="ce-titulo" id="ce-titulo">Carregando…</h2>
            </div>
          </div>
          <span class="ce-badge" id="ce-badge">—</span>
          <button class="ce-btn-fechar" id="ce-btn-fechar" aria-label="Fechar alerta">✕</button>
        </div>

        <!-- Corpo -->
        <div class="ce-corpo">
          <p class="ce-descricao" id="ce-descricao"></p>
          <div class="ce-impactos">
            <span class="ce-impactos-titulo">🌾 Impactos na sua lavoura</span>
            <ul class="ce-impacto-lista" id="ce-impacto-lista"></ul>
          </div>
        </div>

        <!-- Footer com navegação -->
        <div class="ce-footer">
          <div class="ce-nav">
            <button class="ce-btn-nav" id="ce-btn-prev" aria-label="Evento anterior">‹</button>
            <div class="ce-indicadores">${dots}</div>
            <button class="ce-btn-nav" id="ce-btn-next" aria-label="Próximo evento">›</button>
          </div>
          <button class="ce-btn-dispensar" id="ce-btn-dispensar">
            Não mostrar novamente
          </button>
        </div>

      </div>
    </div>

    <!-- Mini trigger flutuante (aparece ao fechar) -->
    <button id="climaEventoTrigger" aria-label="Ver alertas climáticos">
      <span class="ce-trigger-icone">⚡</span>
      <span class="ce-trigger-texto">Alertas Climáticos</span>
      <span class="ce-trigger-badge" id="ce-trigger-badge-txt">ATIVO</span>
    </button>
  `;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);
}


/* ============================================================
   6. EVENTS LISTENERS
============================================================ */

function ceBindEventos() {
  // Fechar pelo ✕
  document.getElementById("ce-btn-fechar")
    ?.addEventListener("click", ceFechar);

  // Fechar ao clicar fora do card (no overlay escuro)
  document.getElementById("climaEventoOverlay")
    ?.addEventListener("click", e => {
      if (e.target.id === "climaEventoOverlay") ceFechar();
    });

  // Fechar com Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && ceAberto) ceFechar();
  });

  // Navegar entre eventos
  document.getElementById("ce-btn-prev")
    ?.addEventListener("click", () => ceNavegar(-1));
  document.getElementById("ce-btn-next")
    ?.addEventListener("click", () => ceNavegar(1));

  // Dots de navegação direta
  document.querySelectorAll(".ce-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      ceEventoAtual = parseInt(dot.dataset.idx);
      ceRenderEvento(ceEventoAtual);
    });
  });

  // Dispensar para a sessão
  document.getElementById("ce-btn-dispensar")
    ?.addEventListener("click", ceDispensar);

  // Mini trigger: reabre o pop-up
  document.getElementById("climaEventoTrigger")
    ?.addEventListener("click", () => ceAbrir());
}


/* ============================================================
   7. INICIALIZAÇÃO
============================================================ */

function initClimaEventos() {
  // Verifica se foi dispensado na sessão atual
  const dispensado = sessionStorage.getItem("ce_dispensado");
  if (dispensado) {
    // Se dispensado há mais de 10 min, reexibe; caso contrário pula
    const elapsed = Date.now() - parseInt(dispensado);
    if (elapsed < 10 * 60 * 1000) return;
    sessionStorage.removeItem("ce_dispensado");
  }

  // Injeta o HTML no DOM
  ceCriarHTML();

  // Liga os listeners
  ceBindEventos();

  // Exibe automaticamente após o delay configurado
  setTimeout(() => {
    // Não abre se o usuário já estiver interagindo com algo importante
    if (!ceAberto) ceAbrir(0);
  }, CE_DELAY_MS);
}

document.addEventListener("DOMContentLoaded", initClimaEventos);