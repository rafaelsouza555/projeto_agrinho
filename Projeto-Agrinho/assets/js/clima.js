  /* ========================================================
    AgroInteligente – clima.js
    Módulo de Clima + Recomendações Agrícolas para o Sul do BR
    Usa Open-Meteo API (gratuita, sem chave)
    ======================================================== */

  /* ── MAPEAMENTO DE CULTURAS POR ÉPOCA (SUL DO BRASIL) ── */
  const CULTURAS_POR_MES = {
    1:  { plantio: ["Milho 2ª safra","Feijão das águas","Girassol","Sorgo"],        colheita: ["Soja","Trigo de irrigação","Alho"] },
    2:  { plantio: ["Milho 2ª safra","Feijão","Girassol"],                          colheita: ["Soja","Milho 1ª safra","Uva Niágara"] },
    3:  { plantio: ["Trigo","Aveia","Cevada","Canola","Alho","Ervilha"],            colheita: ["Milho","Soja","Uva Fina","Pêssego"] },
    4:  { plantio: ["Trigo","Aveia","Cevada","Canola","Alho","Cebola","Ervilha"],   colheita: ["Milho","Feijão","Maçã","Pêra"] },
    5:  { plantio: ["Trigo","Aveia","Cevada","Canola","Alho","Cebola"],             colheita: ["Maçã","Cebola","Batata-doce","Mandioca"] },
    6:  { plantio: ["Trigo","Aveia","Cevada","Alho","Cebola"],                      colheita: ["Maçã","Pêra","Batata-inglesa","Cebola"] },
    7:  { plantio: ["Trigo (último plantio)","Cebola verão","Batata-inglesa"],      colheita: ["Aveia","Cebola","Batata-inglesa"] },
    8:  { plantio: ["Milho precoce","Feijão das secas","Batata-inglesa","Fumo"],    colheita: ["Trigo","Aveia","Cevada","Canola"] },
    9:  { plantio: ["Milho","Soja precoce","Fumo","Batata-inglesa","Feijão"],       colheita: ["Trigo","Cevada","Fumo","Aveia"] },
    10: { plantio: ["Soja","Milho","Feijão","Girassol","Sorgo","Fumo"],             colheita: ["Trigo","Cevada","Fumo","Erva-mate (poda)"] },
    11: { plantio: ["Soja","Milho","Feijão","Amendoim","Girassol"],                 colheita: ["Batata-inglesa","Feijão das secas","Maçã"] },
    12: { plantio: ["Soja 2ª época","Milho","Feijão","Amendoim"],                   colheita: ["Uva Niágara precoce","Pêssego precoce","Ameixa"] },
  };

  /* ── CÓDIGOS WMO → DESCRIÇÃO EM PORTUGUÊS ── */
  const WMO_CODES = {
    0:"☀️ Céu Limpo", 1:"🌤️ Poucas Nuvens", 2:"⛅ Parcialmente Nublado",
    3:"☁️ Nublado", 45:"🌫️ Névoa", 48:"🌫️ Névoa com Geada",
    51:"🌦️ Chuvisco Leve", 53:"🌦️ Chuvisco Mod.", 55:"🌧️ Chuvisco Intenso",
    61:"🌧️ Chuva Leve", 63:"🌧️ Chuva Moderada", 65:"🌧️ Chuva Forte",
    71:"❄️ Neve Leve", 73:"❄️ Neve Moderada", 75:"❄️ Neve Intensa",
    77:"🌨️ Granizo Fino", 80:"🌧️ Chuva de Pancadas", 81:"⛈️ Pancadas Mod.",
    82:"⛈️ Pancadas Fortes", 85:"❄️ Neve c/ Vento", 86:"❄️ Nevasca",
    95:"⛈️ Trovoada", 96:"⛈️ Trovoada c/ Granizo", 99:"⛈️ Trovoada Forte"
  };

  const DIAS_SEMANA = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
  const MESES = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

  /* ── AVALIAÇÃO AGRÍCOLA DAS CONDIÇÕES ── */
  function avaliarCondicoes(atual, prev7dias) {
    const t = atual.temperature_2m;
    const wind = atual.windspeed_10m;
    const rain7 = prev7dias.reduce((a,b) => a + b, 0);
    const recFrost = t <= 4;

    let alertas = [];
    let status = "bom"; // "bom" | "cuidado" | "critico"

    if (recFrost) { alertas.push({ tipo:"critico", msg:`🌡️ Risco de geada! Temperatura de ${t.toFixed(1)}°C. Proteja culturas sensíveis ao frio.` }); status = "critico"; }
    if (t > 36)   { alertas.push({ tipo:"cuidado", msg:`🔥 Calor extremo (${t.toFixed(1)}°C). Irrigar nas horas mais frescas. Evite aplicação de defensivos.` }); status = "cuidado"; }
    if (rain7 > 80) { alertas.push({ tipo:"cuidado", msg:`💦 Solo encharcado (${rain7.toFixed(0)}mm em 7 dias). Adie operações de solo. Risco de doenças fúngicas.` }); if(status==="bom") status="cuidado"; }
    if (rain7 < 5 && t > 28) { alertas.push({ tipo:"cuidado", msg:`🏜️ Déficit hídrico. Menos de 5mm em 7 dias + calor. Intensifique a irrigação.` }); if(status==="bom") status="cuidado"; }
    if (wind > 50) { alertas.push({ tipo:"cuidado", msg:`💨 Vento forte (${wind.toFixed(0)} km/h). Não realize pulverizações hoje.` }); if(status==="bom") status="cuidado"; }
    if (alertas.length === 0) alertas.push({ tipo:"bom", msg:`✅ Condições estáveis. Bom dia para atividades na lavoura.` });

    return { alertas, status };
  }

  /* ── RECOMENDAÇÃO CONTEXTUAL POR CULTURA ── */
  function recCultura(t, rain7) {
    const mes = new Date().getMonth() + 1;
    const dados = CULTURAS_POR_MES[mes];
    return dados || { plantio: [], colheita: [] };
  }

  /* ── RENDER DO CARD SEMANAL ── */
  function renderPrevisaoSemanal(daily) {
    const { time, temperature_2m_max, temperature_2m_min, precipitation_sum, weathercode, precipitation_probability_max } = daily;
    return time.map((dia, i) => {
      const d = new Date(dia + "T12:00:00");
      const diaSem = DIAS_SEMANA[d.getDay()];
      const diaMes = d.getDate();
      const mesStr = MESES[d.getMonth()];
      const cond = WMO_CODES[weathercode[i]] || "❓";
      const chuva = precipitation_sum[i] || 0;
      const prob = precipitation_probability_max[i] || 0;
      const tMax = temperature_2m_max[i].toFixed(0);
      const tMin = temperature_2m_min[i].toFixed(0);
      const agro = chuva > 20 ? "⚠️ Evite máquinas" : chuva > 5 ? "💧 Solo úmido" : tMin <= 4 ? "❄️ Risco geada" : "✅ Campo livre";
      return `
        <div class="prev-dia-card ${chuva > 20 ? 'prev-chuvoso' : tMin <= 4 ? 'prev-frio' : 'prev-ok'}">
          <div class="prev-dia-semana">${diaSem}</div>
          <div class="prev-dia-data">${diaMes}/${mesStr}</div>
          <div class="prev-icon-big">${cond.split(' ')[0]}</div>
          <div class="prev-cond-desc">${cond.replace(/^[^\s]+ /, '')}</div>
          <div class="prev-temps"><span class="tmax">↑${tMax}°</span><span class="tmin">↓${tMin}°</span></div>
          <div class="prev-chuva">🌧️ ${chuva.toFixed(1)}mm <span class="prob">${prob}%</span></div>
          <div class="prev-agro">${agro}</div>
        </div>`;
    }).join('');
  }

  /* ── RENDER DO PAINEL DE CLIMA COMPLETO ── */
  function renderClimaPanel(data, nome) {
    const cur = data.current;
    const daily = data.daily;
    const hourly = data.hourly;

    // Chuva acumulada últimos 7 dias (horário: pegar últimas 168h)
    const rain7 = (hourly.precipitation || []).slice(0, 168).reduce((a, b) => a + b, 0);
    const { alertas, status } = avaliarCondicoes(cur, (hourly.precipitation || []).slice(0, 168));
    const culturas = recCultura(cur.temperature_2m, rain7);
    const mes = new Date().getMonth() + 1;
    const estacao = mes >= 3 && mes <= 5 ? "🍂 Outono" : mes >= 6 && mes <= 8 ? "❄️ Inverno" : mes >= 9 && mes <= 11 ? "🌸 Primavera" : "☀️ Verão";

    const statusCor = { bom: "#4ecb6a", cuidado: "#f5c842", critico: "#e04040" }[status];
    const statusLabel = { bom: "✅ Favorável ao Campo", cuidado: "⚠️ Atenção Necessária", critico: "🚨 Condição Crítica" }[status];

    const panel = document.getElementById("climaPanel");
    if (!panel) return;

    panel.innerHTML = `
      <div class="clima-header">
        <div class="clima-local">
          <span class="clima-pin">📍</span>
          <div>
            <h3>${nome}</h3>
            <span class="clima-estacao">${estacao} · Sul do Brasil</span>
          </div>
        </div>
        <div class="clima-status-badge" style="border-color:${statusCor}; color:${statusCor}">${statusLabel}</div>
      </div>

      <div class="clima-atual-grid">
        <div class="clima-atual-main">
          <div class="clima-temp-big"><span class="clima-temp-valor">${cur.temperature_2m.toFixed(1)}</span><span>°C</span></div>
          <div class="clima-cond">${WMO_CODES[cur.weathercode] || "❓ Desconhecido"}</div>
          <div class="clima-detalhes-row">
            <span>💨 ${cur.windspeed_10m} km/h</span>
            <span>🧭 ${cur.winddirection_10m}°</span>
            <span>🌧️ ${rain7.toFixed(0)}mm /7d</span>
          </div>
        </div>
        <div class="clima-alertas">
          <h4>⚡ Alertas Agronômicos</h4>
          ${alertas.map(a => `<div class="alerta-item alerta-${a.tipo}">${a.msg}</div>`).join('')}
        </div>
      </div>

      <div class="clima-previsao-block">
        <h4 class="clima-sub">📅 Previsão dos Próximos 7 Dias</h4>
        <div class="prev-dias-grid">
          ${renderPrevisaoSemanal(daily)}
        </div>
      </div>

      <div class="clima-recom-block">
        <div class="recom-col">
          <h4>🌱 O que Plantar Agora (${MESES[mes - 1]})</h4>
          <div class="recom-tags">
            ${culturas.plantio.length > 0
              ? culturas.plantio.map(c => `<span class="recom-tag plantio">${c}</span>`).join('')
              : '<span class="recom-tag neutro">Mês de transição — aguarde o período ideal</span>'}
          </div>
        </div>
        <div class="recom-col">
          <h4>🌾 O que Colher Agora (${MESES[mes - 1]})</h4>
          <div class="recom-tags">
            ${culturas.colheita.length > 0
              ? culturas.colheita.map(c => `<span class="recom-tag colheita">${c}</span>`).join('')
              : '<span class="recom-tag neutro">Sem colheitas previstas este mês</span>'}
          </div>
        </div>
      </div>

      <div class="clima-tendencia-block">
        <h4 class="clima-sub">📊 Tendência do Mês</h4>
        ${renderBarrasChuva(daily)}
      </div>
    `;
  }

  function renderBarrasChuva(daily) {
    const max = Math.max(...daily.precipitation_sum, 1);
    return `<div class="barras-chuva">
      ${daily.time.map((d, i) => {
        const val = daily.precipitation_sum[i] || 0;
        const pct = Math.round((val / max) * 100);
        const dt = new Date(d + "T12:00:00");
        return `
          <div class="barra-col">
            <div class="barra-wrap" title="${val.toFixed(1)}mm">
              <div class="barra-fill ${val > 15 ? 'barra-alta' : val > 5 ? 'barra-media' : 'barra-baixa'}" style="height:${Math.max(pct, 4)}%"></div>
            </div>
            <span class="barra-label">${DIAS_SEMANA[dt.getDay()]}</span>
          </div>`;
      }).join('')}
    </div>`;
  }

  /* ── BUSCAR CLIMA PELA API OPEN-METEO ── */
  async function buscarClima(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`
      + `&current=temperature_2m,weathercode,windspeed_10m,winddirection_10m,precipitation`
      + `&hourly=precipitation&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max`
      + `&timezone=America%2FSao_Paulo&forecast_days=7`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro na API de clima");
    return res.json();
  }

  /* ── GEOCODE REVERSO (NOMINATIM / OSM) ── */
  async function buscarNomeLocal(lat, lon) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=pt`,
        { headers: { "Accept-Language": "pt-BR" } }
      );
      const data = await res.json();
      const a = data.address || {};
      const cidade = a.city || a.town || a.village || a.municipality || "Sua Localização";
      const estado = a.state || "";
      return `${cidade}${estado ? ", " + estado : ""}`;
    } catch {
      return "Sua Localização";
    }
  }

  /* ── MOSTRAR ESTADO DE CARREGAMENTO ── */
  function showClimaLoading(msg) {
    const panel = document.getElementById("climaPanel");
    if (!panel) return;
    panel.innerHTML = `
      <div class="clima-loading">
        <div class="clima-spinner"></div>
        <p>${msg}</p>
      </div>`;
  }

  /* ── INICIALIZAÇÃO DO MÓDULO DE CLIMA ── */
  function initClima() {
    const btn = document.getElementById("btnBuscarClima");
    if (!btn) return;

    btn.addEventListener("click", async () => {
      if (!navigator.geolocation) {
        document.getElementById("climaPanel").innerHTML =
          `<div class="clima-erro">❌ Seu navegador não suporta geolocalização.</div>`;
        return;
      }

      showClimaLoading("📍 Obtendo sua localização...");

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude: lat, longitude: lon } = pos.coords;
          showClimaLoading("🌐 Buscando dados climáticos...");
          try {
            const [data, nome] = await Promise.all([
              buscarClima(lat, lon),
              buscarNomeLocal(lat, lon)
            ]);
            renderClimaPanel(data, nome);
            btn.innerHTML = "🔄 Atualizar Clima";
          } catch (e) {
            document.getElementById("climaPanel").innerHTML =
              `<div class="clima-erro">❌ Não foi possível carregar os dados do clima. Verifique sua conexão e tente novamente.</div>`;
          }
        },
        (err) => {
          const msgs = {
            1: "Permissão de localização negada. Habilite a localização no seu navegador.",
            2: "Localização indisponível. Tente novamente.",
            3: "Tempo esgotado. Tente novamente."
          };
          document.getElementById("climaPanel").innerHTML =
            `<div class="clima-erro">📍 ${msgs[err.code] || "Erro desconhecido."}</div>`;
        },
        { timeout: 10000 }
      );
    });
  }

  /* ── QUANDO A PÁGINA CARREGAR, INICIA ── */
  document.addEventListener("DOMContentLoaded", initClima);