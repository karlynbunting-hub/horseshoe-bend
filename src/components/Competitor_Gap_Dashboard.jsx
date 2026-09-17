import React, { useState, useRef, useEffect, useMemo } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);


const DATA = {"generated": "2026-06-09", "sites": [{"key": "target", "name": "horseshoebend.com", "label": "Your site", "color": "#E0A458", "traffic": 24994, "top10": 149, "totalKw": 763, "refDomains": 1045, "domainRank": 254, "perf": 98, "lcp": 1113, "cls": null, "inp": 16, "scope": "domain"}, {"key": "nps", "name": "nps.gov/\u2026/horseshoe-bend", "color": "#4FB0A5", "traffic": 109682, "top10": 158, "totalKw": 259, "refDomains": 616, "domainRank": 603, "perf": 62, "lcp": 3145, "cls": 0.307, "inp": 103, "scope": "page", "note": "Page-level traffic & keywords. Domain Rank 603 reflects the entire nps.gov domain, not this page."}, {"key": "co", "name": "horseshoebend.co", "color": "#9B8CFF", "traffic": 63318, "top10": 199, "totalKw": 443, "refDomains": 169, "domainRank": 200, "perf": 82, "lcp": 1701, "cls": 0.008, "inp": 30, "scope": "domain", "note": "Effectively a single-page site \u2014 its homepage is 63,290 of 63,318 total visits."}, {"key": "tours", "name": "horseshoebendtours.com", "color": "#F2785C", "traffic": 11357, "top10": 76, "totalKw": 515, "refDomains": 685, "domainRank": 216, "perf": 92, "lcp": 1369, "cls": 0.027, "inp": 196, "scope": "domain"}], "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], "trend": {"target": {"traffic": [25817, 25423, 21392, 28206, 24978, 24994], "top10": [133, 124, 123, 128, 147, 149]}, "co": {"traffic": [63212, 62952, 87761, 64420, 63283, 63318], "top10": [164, 180, 180, 182, 199, 199]}, "tours": {"traffic": [9888, 9833, 14910, 14194, 11375, 11357], "top10": [81, 76, 83, 82, 78, 76]}}, "topPages": {"target": [{"url": "/", "etv": 19648, "kw": [["arizona horseshoe bend", 165000, 4], ["horseshoe bend", 165000, 5], ["horseshoe bend tours", 2900, 2], ["horseshoe bend grand canyon", 3600, 7], ["horseshoe bend and grand canyon", 3600, 10]]}, {"url": "/antelope-canyon/", "etv": 2226, "kw": [["arizona antelope canyon", 246000, 30], ["antelope canyon", 246000, 24], ["lower antelope canyons", 27100, 33], ["antelope canyon location", 18100, 19], ["antelope canyon arizona location", 18100, 16]]}, {"url": "/parking-lot-reopens/", "etv": 1045, "kw": [["horseshoe bend overlook parking lot", 8100, 3], ["horseshoe bend entrance fee", 590, 2]]}], "nps": [{"url": "/glca/planyourvisit/horseshoe-bend.htm", "etv": 109682, "kw": [["arizona horseshoe bend", 165000, 1], ["horseshoe bend", 165000, 1], ["horseshoe trailhead", 6600, 3], ["horseshoe trail", 6600, 19], ["horseshoe dam", 4400, 29]]}], "co": [{"url": "/", "etv": 63290, "kw": [["arizona horseshoe bend", 165000, 2], ["horseshoe bend", 165000, 2], ["page city arizona", 33100, 15], ["horseshoe park", 9900, 9], ["page city az", 33100, 47]]}], "tours": [{"url": "/", "etv": 9407, "kw": [["arizona antelope canyon", 246000, 24], ["arizona horseshoe bend", 165000, 14], ["horseshoe bend", 165000, 12], ["antelope tour page", 74000, 17], ["antelope canyon tours az", 74000, 21]]}, {"url": "/slot-canyon-plus-overlook", "etv": 1539, "kw": [["antelope slot canyon tours", 74000, 14], ["secret canyon", 4400, 2], ["antelope slot canyons arizona", 1600, 15], ["22 s lake powell blvd page az 86040", 1300, 24], ["horseshoe bend ticket", 880, 25]]}, {"url": "/blog/page-az-the-place-to-visit", "etv": 229, "kw": [["page az", 40500, 36], ["page city az", 33100, 32], ["page usa arizona", 33100, 36], ["page national park arizona", 480, 28], ["page az to grand canyon", 880, 63]]}]}, "gaps": [{"kw": "canyon x tours", "vol": 12100, "kd": 2, "pos": 23, "gap": 77, "score": 465850.0, "intent": "informational", "src": ["tours"]}, {"kw": "antelope tour page", "vol": 74000, "kd": 46, "pos": 17, "gap": 83, "score": 133521.7, "intent": "navigational", "src": ["tours"]}, {"kw": "antelope slot canyon tours", "vol": 74000, "kd": 49, "pos": 14, "gap": 86, "score": 129877.6, "intent": "commercial", "src": ["tours"]}, {"kw": "antelope canyon tours az", "vol": 74000, "kd": 49, "pos": 21, "gap": 79, "score": 119306.1, "intent": "informational", "src": ["tours"]}, {"kw": "antelope canyon tours from page", "vol": 74000, "kd": 49, "pos": 23, "gap": 77, "score": 116285.7, "intent": "navigational", "src": ["tours"]}, {"kw": "horseshoe trailhead", "vol": 6600, "kd": 6, "pos": 3, "gap": 97, "score": 106700.0, "intent": "navigational", "src": ["co", "nps"]}, {"kw": "antelope canyon tours", "vol": 74000, "kd": 49, "pos": 35, "gap": 65, "score": 98163.3, "intent": "informational", "src": ["tours"]}, {"kw": "page city arizona", "vol": 33100, "kd": 32, "pos": 15, "gap": 85, "score": 87921.9, "intent": "navigational", "src": ["co"]}, {"kw": "horseshoe point", "vol": 880, "kd": 1, "pos": 6, "gap": 94, "score": 82720.0, "intent": "informational", "src": ["co", "nps"]}, {"kw": "page az", "vol": 40500, "kd": 32, "pos": 36, "gap": 64, "score": 81000.0, "intent": "navigational", "src": ["tours"]}, {"kw": "roam america horseshoe bend", "vol": 2900, "kd": 2, "pos": 49, "gap": 51, "score": 73950.0, "intent": "navigational", "src": ["co"]}, {"kw": "page city az", "vol": 33100, "kd": 32, "pos": 32, "gap": 68, "score": 70337.5, "intent": "navigational", "src": ["co", "tours"]}, {"kw": "horseshoe trail", "vol": 6600, "kd": 8, "pos": 19, "gap": 81, "score": 66825.0, "intent": "informational", "src": ["nps"]}, {"kw": "page usa arizona", "vol": 33100, "kd": 32, "pos": 36, "gap": 64, "score": 66200.0, "intent": "navigational", "src": ["tours"]}, {"kw": "antelope canyon tours by carolene ekis", "vol": 6600, "kd": 7, "pos": 39, "gap": 61, "score": 57514.3, "intent": "navigational", "src": ["tours"]}, {"kw": "antelope canyon navajo tours", "vol": 22200, "kd": 32, "pos": 27, "gap": 73, "score": 50643.8, "intent": "commercial", "src": ["tours"]}, {"kw": "22 s lake powell blvd page az 86040", "vol": 1300, "kd": 2, "pos": 24, "gap": 76, "score": 49400.0, "intent": "navigational", "src": ["tours"]}, {"kw": "dixie's lower antelope canyon tours", "vol": 18100, "kd": 19, "pos": 49, "gap": 51, "score": 48584.2, "intent": "informational", "src": ["tours"]}, {"kw": "tse bighanilini tours", "vol": 3600, "kd": 6, "pos": 31, "gap": 69, "score": 41400.0, "intent": "informational", "src": ["tours"]}, {"kw": "waterhole canyon experience llc", "vol": 1600, "kd": 3, "pos": 26, "gap": 74, "score": 39466.7, "intent": "navigational", "src": ["tours"]}, {"kw": "horseshoe utah", "vol": 6600, "kd": 17, "pos": 10, "gap": 90, "score": 34941.2, "intent": "informational", "src": ["co"]}, {"kw": "black streak canyon tours", "vol": 1600, "kd": 5, "pos": 27, "gap": 73, "score": 23360.0, "intent": "informational", "src": ["tours"]}, {"kw": "lower antelope canyon tours", "vol": 8100, "kd": 34, "pos": 15, "gap": 85, "score": 20250.0, "intent": "informational", "src": ["tours"]}, {"kw": "horseshoe canyon", "vol": 6600, "kd": 37, "pos": 6, "gap": 94, "score": 16767.6, "intent": "informational", "src": ["co"]}, {"kw": "antelope canyon dixie tours", "vol": 2400, "kd": 10, "pos": 35, "gap": 65, "score": 15600.0, "intent": "navigational", "src": ["tours"]}, {"kw": "vegas to antelope canyon", "vol": 1900, "kd": 7, "pos": 44, "gap": 56, "score": 15200.0, "intent": "informational", "src": ["tours"]}, {"kw": "horseshoe reservoir", "vol": 1000, "kd": 6, "pos": 21, "gap": 79, "score": 13166.7, "intent": "navigational", "src": ["co", "nps"]}, {"kw": "slot canyons arizona", "vol": 2900, "kd": 18, "pos": 24, "gap": 76, "score": 12244.4, "intent": "informational", "src": ["tours"]}, {"kw": "horseshoe bend park", "vol": 1300, "kd": 14, "pos": 4, "gap": 96, "score": 8914.3, "intent": "navigational", "src": ["co"]}, {"kw": "antelope canyon tickets", "vol": 5400, "kd": 52, "pos": 15, "gap": 85, "score": 8826.9, "intent": "transactional", "src": ["tours"]}, {"kw": "antelope canyon arizona to grand canyon", "vol": 1000, "kd": 10, "pos": 44, "gap": 56, "score": 5600.0, "intent": "informational", "src": ["tours"]}, {"kw": "best antelope canyon tour", "vol": 1000, "kd": 21, "pos": 17, "gap": 83, "score": 3952.4, "intent": "informational", "src": ["tours"]}, {"kw": "arizona visitor guide", "vol": 880, "kd": 20, "pos": 21, "gap": 79, "score": 3476.0, "intent": "informational", "src": ["co"]}, {"kw": "dixie antelope canyon", "vol": 880, "kd": 19, "pos": 38, "gap": 62, "score": 2871.6, "intent": "informational", "src": ["tours"]}, {"kw": "antelope slot canyon page arizona", "vol": 1600, "kd": 49, "pos": 15, "gap": 85, "score": 2775.5, "intent": "navigational", "src": ["tours"]}, {"kw": "page utah", "vol": 1300, "kd": 45, "pos": 17, "gap": 83, "score": 2397.8, "intent": "navigational", "src": ["co"]}, {"kw": "guided tour upper antelope canyon", "vol": 1000, "kd": 31, "pos": 29, "gap": 71, "score": 2290.3, "intent": "informational", "src": ["tours"]}, {"kw": "antelope canyon booking", "vol": 1000, "kd": 53, "pos": 20, "gap": 80, "score": 1509.4, "intent": "transactional", "src": ["tours"]}, {"kw": "navajo canyon tours", "vol": 880, "kd": 49, "pos": 24, "gap": 76, "score": 1364.9, "intent": "informational", "src": ["tours"]}, {"kw": "antelope canyon reservations", "vol": 1000, "kd": 52, "pos": 31, "gap": 69, "score": 1326.9, "intent": "transactional", "src": ["tours"]}]};

const fmt = (n) => (n == null ? "—" : n.toLocaleString("en-US"));
const byKey = (k) => DATA.sites.find((s) => s.key === k);
const SITE_ORDER = ["target", "nps", "co", "tours"];

// ---- heat gradient (higher is better; relative across the 4 sites) ----
function heat(metric) {
  const vals = DATA.sites.map((s) => s[metric]).filter((v) => v != null);
  const min = Math.min(...vals), max = Math.max(...vals);
  const span = max - min || 1; // guard divide-by-zero
  return (v) => {
    if (v == null) return { bg: "rgba(138,151,165,.10)", dot: "#8A97A5" };
    const r = (v - min) / span;
    if (r >= 0.66) return { bg: "rgba(95,184,122,.14)", dot: "#5FB87A" };
    if (r <= 0.33) return { bg: "rgba(217,105,74,.14)", dot: "#D9694A" };
    return { bg: "rgba(217,164,65,.14)", dot: "#D9A441" };
  };
}

const KPIS = [
  { metric: "traffic", label: "Est. organic traffic", sub: "visits / mo" },
  { metric: "top10", label: "Top-10 keywords", sub: "positions 1–10" },
  { metric: "refDomains", label: "Referring domains", sub: "to top page" },
  { metric: "domainRank", label: "Domain rank", sub: "DataForSEO 0–1000" },
];

function KpiCards() {
  const heats = useMemo(
    () => Object.fromEntries(KPIS.map((k) => [k.metric, heat(k.metric)])),
    []
  );
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: "minmax(150px,180px) repeat(4,1fr)" }}>
      <div />
      {SITE_ORDER.map((k) => {
        const s = byKey(k);
        return (
          <div key={k} className="flex items-center gap-2 px-1 pb-1">
            <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
            <span className="text-[12.5px] leading-tight font-medium text-slate-200 truncate">{s.name}</span>
            {s.scope === "page" && (
              <span className="text-[9px] uppercase tracking-wider px-1 py-[1px] rounded bg-slate-700/60 text-slate-300">page</span>
            )}
          </div>
        );
      })}

      {KPIS.map((kp) => (
        <React.Fragment key={kp.metric}>
          <div className="flex flex-col justify-center py-2">
            <div className="text-[13px] text-slate-200 font-medium">{kp.label}</div>
            <div className="text-[10.5px] text-slate-500">{kp.sub}</div>
          </div>
          {SITE_ORDER.map((k) => {
            const s = byKey(k);
            const h = heats[kp.metric](s[kp.metric]);
            return (
              <div key={k} className="rounded-lg px-3 py-2.5 border border-slate-700/40" style={{ background: h.bg }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: h.dot }} />
                  <span className="font-mono text-[18px] text-slate-50 tabular-nums">{fmt(s[kp.metric])}</span>
                </div>
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

function TrendChart() {
  const ref = useRef(null);
  useEffect(() => {
    const keys = ["target", "co", "tours"];
    const ds = [];
    keys.forEach((k) => {
      const s = byKey(k);
      ds.push({
        label: s.name + " · traffic", data: DATA.trend[k].traffic, borderColor: s.color,
        backgroundColor: s.color, yAxisID: "y", tension: 0.35, borderWidth: 2,
        pointRadius: 2, pointHoverRadius: 4,
      });
      ds.push({
        label: s.name + " · top-10", data: DATA.trend[k].top10, borderColor: s.color,
        backgroundColor: "transparent", yAxisID: "y1", tension: 0.35, borderWidth: 1.5,
        borderDash: [4, 3], pointRadius: 0,
      });
    });
    const grid = "rgba(148,163,184,.10)", tick = "#94A3B8";
    const c = new Chart(ref.current, {
      type: "line",
      data: { labels: DATA.months, datasets: ds },
      options: {
        responsive: true, maintainAspectRatio: false, interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: tick, boxWidth: 10, font: { size: 10 }, filter: (i) => i.text.includes("traffic") } },
          tooltip: { backgroundColor: "#0E1217", borderColor: "#263038", borderWidth: 1 },
        },
        scales: {
          x: { grid: { color: grid }, ticks: { color: tick } },
          y: { position: "left", grid: { color: grid }, ticks: { color: tick }, title: { display: true, text: "Traffic (visits/mo)", color: tick, font: { size: 10 } } },
          y1: { position: "right", grid: { drawOnChartArea: false }, ticks: { color: tick }, title: { display: true, text: "Top-10 keywords", color: tick, font: { size: 10 } } },
        },
      },
    });
    return () => c.destroy();
  }, []);
  return <div style={{height:300}}><canvas ref={ref} /></div>;
}

function RadarChart() {
  const ref = useRef(null);
  useEffect(() => {
    const axes = ["Domain rank", "Referring domains", "Core Web Vitals", "Content breadth"];
    const raw = {
      "Domain rank": (s) => s.domainRank, "Referring domains": (s) => s.refDomains,
      "Core Web Vitals": (s) => s.perf, "Content breadth": (s) => s.totalKw,
    };
    const max = Object.fromEntries(axes.map((a) => [a, Math.max(...DATA.sites.map((s) => raw[a](s))) || 1]));
    const ds = SITE_ORDER.map((k) => {
      const s = byKey(k);
      return {
        label: s.name, data: axes.map((a) => Math.round((raw[a](s) / max[a]) * 100)),
        borderColor: s.color, backgroundColor: s.color + "22", borderWidth: 2, pointRadius: 2,
      };
    });
    const c = new Chart(ref.current, {
      type: "radar", data: { labels: axes, datasets: ds },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "#94A3B8", boxWidth: 10, font: { size: 10 } } },
          tooltip: { callbacks: { label: (i) => `${i.dataset.label}: ${i.formattedValue} / 100 (indexed)` } } },
        scales: { r: {
          min: 0, max: 100, angleLines: { color: "rgba(148,163,184,.15)" }, grid: { color: "rgba(148,163,184,.15)" },
          pointLabels: { color: "#CBD5E1", font: { size: 11 } }, ticks: { display: false, stepSize: 25 },
        } },
      },
    });
    return () => c.destroy();
  }, []);
  return <div style={{height:300}}><canvas ref={ref} /></div>;
}

const INTENT_COLORS = {
  navigational: "#9B8CFF", informational: "#4FB0A5", commercial: "#E0A458", transactional: "#F2785C",
};

function GapTable() {
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const top15 = DATA.gaps.slice(0, 15);
  const rows = showAll ? DATA.gaps : top15;

  const csv = () => {
    const head = ["keyword", "search_volume", "keyword_difficulty", "best_competitor_pos", "position_gap", "opportunity_score", "intent", "ranking_competitors"];
    const lines = [head.join(",")].concat(
      DATA.gaps.map((g) => [
        `"${g.kw}"`, g.vol, g.kd, g.pos, g.gap, g.score, g.intent, `"${g.src.join("|")}"`,
      ].join(","))
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "competitor_gap_keywords.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const copy = async () => {
    const head = ["keyword", "volume", "KD", "pos", "gap", "score", "intent"];
    const tsv = [head.join("\t")].concat(
      DATA.gaps.map((g) => [g.kw, g.vol, g.kd, g.pos, g.gap, g.score, g.intent].join("\t"))
    ).join("\n");
    try { await navigator.clipboard.writeText(tsv); setCopied(true); setTimeout(() => setCopied(false), 1600); }
    catch (e) { setCopied(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className="text-[11px] text-slate-500">
          Showing <span className="text-slate-300">{rows.length}</span> of {DATA.gaps.length} scorable gaps · OpportunityScore = Volume × PositionGap ÷ KD
        </div>
        <div className="flex gap-2">
          <button onClick={copy} className="text-[11.5px] px-2.5 py-1 rounded border border-slate-600/60 text-slate-300 hover:bg-slate-700/40 transition">
            {copied ? "Copied ✓" : "Copy to clipboard"}
          </button>
          <button onClick={csv} className="text-[11.5px] px-2.5 py-1 rounded border border-slate-600/60 text-slate-300 hover:bg-slate-700/40 transition">
            Download CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-700/40">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-slate-400 text-left border-b border-slate-700/50 bg-slate-800/30">
              <th className="py-2 px-3 font-medium">#</th>
              <th className="py-2 px-3 font-medium">Keyword</th>
              <th className="py-2 px-3 font-medium text-right">Volume</th>
              <th className="py-2 px-3 font-medium text-right">KD</th>
              <th className="py-2 px-3 font-medium text-right">Best pos</th>
              <th className="py-2 px-3 font-medium text-right">Gap</th>
              <th className="py-2 px-3 font-medium text-right">Score</th>
              <th className="py-2 px-3 font-medium">Intent</th>
              <th className="py-2 px-3 font-medium">Ranks for it</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {rows.map((g, i) => (
              <tr key={g.kw} className="border-b border-slate-800/40 hover:bg-slate-800/20">
                <td className="py-1.5 px-3 text-slate-500">{i + 1}</td>
                <td className="py-1.5 px-3 text-slate-100 font-sans">{g.kw}</td>
                <td className="py-1.5 px-3 text-right text-slate-300 tabular-nums">{fmt(g.vol)}</td>
                <td className="py-1.5 px-3 text-right text-slate-400 tabular-nums">{g.kd}</td>
                <td className="py-1.5 px-3 text-right text-slate-400 tabular-nums">{g.pos}</td>
                <td className="py-1.5 px-3 text-right text-slate-400 tabular-nums">{g.gap}</td>
                <td className="py-1.5 px-3 text-right text-amber-300/90 tabular-nums">{fmt(Math.round(g.score))}</td>
                <td className="py-1.5 px-3 font-sans">
                  <span className="px-1.5 py-[1px] rounded text-[10px]" style={{ background: (INTENT_COLORS[g.intent] || "#888") + "22", color: INTENT_COLORS[g.intent] || "#aaa" }}>{g.intent}</span>
                </td>
                <td className="py-1.5 px-3 font-sans">
                  <div className="flex gap-1">
                    {g.src.map((sk) => { const s = byKey(sk); return s ? <span key={sk} className="w-2 h-2 rounded-sm" title={s.name} style={{ background: s.color }} /> : null; })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => setShowAll((v) => !v)} className="mt-2 text-[12px] text-amber-300/90 hover:text-amber-200 transition">
        {showAll ? "▲ Collapse to top 15" : `▼ Show all gaps (${DATA.gaps.length})`}
      </button>
    </div>
  );
}

function IntentGroups() {
  const top15 = DATA.gaps.slice(0, 15);
  const groups = {};
  top15.forEach((g) => { (groups[g.intent] ||= []).push(g); });
  const order = ["navigational", "informational", "commercial", "transactional"].filter((i) => groups[i]);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {order.map((intent) => (
        <div key={intent} className="rounded-lg border border-slate-700/40 p-3 bg-slate-800/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full" style={{ background: INTENT_COLORS[intent] }} />
            <span className="text-[12px] font-medium capitalize text-slate-200">{intent}</span>
            <span className="text-[10px] text-slate-500">({groups[intent].length})</span>
          </div>
          <ol className="space-y-1">
            {groups[intent].slice(0, 5).map((g) => (
              <li key={g.kw} className="text-[11.5px] text-slate-400 flex justify-between gap-2">
                <span className="truncate">{g.kw}</span>
                <span className="text-slate-500 tabular-nums font-mono shrink-0">{fmt(g.vol)}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

const WHY = [
  { key: "nps", title: "Authority over everything",
    body: "Its single Horseshoe Bend page ranks #1 for \u201chorseshoe bend\u201d and \u201carizona horseshoe bend\u201d (165K/mo each), pulling ~110K visits — despite the weakest Core Web Vitals here (LCP 3.1s, CLS 0.31). A 603 domain rank and exact brand match beat page speed." },
  { key: "co", title: "One page, ruthlessly optimized",
    body: "With just 169 referring domains it sits at #2 for both 165K head terms, turning a single landing page into ~63K visits/mo. This is efficiency, not breadth: only 443 ranked keywords in total." },
  { key: "tours", title: "Links + commercial pages",
    body: "685 referring domains and dedicated tour / slot-canyon pages get it ranking for the high-value antelope-canyon tour cluster — but mostly at positions 12–24. Strong links held back by a 4.4MB page (INP 196ms) and thin ranking depth." },
];

function WhyTheyWin() {
  return (
    <div className="grid md:grid-cols-3 gap-3">
      {WHY.map((w) => { const s = byKey(w.key); return (
        <div key={w.key} className="rounded-lg border border-slate-700/40 p-4 bg-slate-800/20">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
            <span className="text-[12.5px] font-medium text-slate-100">{s.name}</span>
          </div>
          <div className="text-[12px] font-semibold mb-1.5" style={{ color: s.color }}>{w.title}</div>
          <p className="text-[12px] leading-relaxed text-slate-400">{w.body}</p>
        </div>
      ); })}
    </div>
  );
}

const PLAN = [
  { bucket: "Quick wins", weeks: "1–2 weeks", color: "#5FB87A", tasks: [
    { task: "Retune homepage title/H1 to recapture the two 165K head terms (now #4–5, behind .co at #2)", role: "Writer", effort: "Quick", impact: "High", hook: "Avg position for \u201chorseshoe bend\u201d / \u201carizona horseshoe bend\u201d in GSC" },
    { task: "Optimize /antelope-canyon/ for \u201cantelope canyon location\u201d cluster (already #16–19) to break into top 10", role: "Writer", effort: "Quick", impact: "Med–High", hook: "Top-10 keyword count for that URL" },
    { task: "Add descriptive internal links from homepage & parking page into tour/antelope pages", role: "Dev", effort: "Quick", impact: "Med", hook: "Internal links per target page; crawl depth" },
  ]},
  { bucket: "Mid-term", weeks: "3–6 weeks", color: "#D9A441", tasks: [
    { task: "Build a commercial \u201cAntelope Canyon Tours from Page, AZ\u201d page for the 74K cluster you don't rank for", role: "Writer", effort: "Medium", impact: "High", hook: "Rankings + bookings for the antelope-tour cluster" },
    { task: "Create a \u201cPage, AZ\u201d travel hub for geo terms (page az 40.5K, page city arizona 33K)", role: "Writer", effort: "Medium", impact: "High", hook: "Top-10 count for page-az cluster" },
    { task: "Add a trail/directions page for \u201chorseshoe trailhead / trail / point\u201d (low KD 1–8)", role: "Writer", effort: "Medium", impact: "Med", hook: "Clicks for trail terms" },
    { task: "Outreach for 10–15 referring domains to the new tour pages (local tourism, Navajo partners, travel blogs)", role: "Outreach", effort: "Medium", impact: "Med", hook: "Referring domains to new pages" },
  ]},
  { bucket: "Strategic", weeks: "7–12 weeks", color: "#D9694A", tasks: [
    { task: "Build full Antelope Canyon topical cluster (upper/lower/secret, booking, photography) to out-content tours.com's links", role: "Writer + Dev", effort: "Strategic", impact: "High", hook: "Total ranking keywords + top-10 share in cluster" },
    { task: "Digital-PR campaign to grow referring domains toward parity on commercial terms", role: "Outreach", effort: "Strategic", impact: "High", hook: "Referring domains & domain rank growth" },
    { task: "Hold the CWV lead (perf 0.98) as content scales — lazy-load, image budgets", role: "Dev", effort: "Strategic", impact: "Med", hook: "LCP / CLS in Lighthouse & CrUX" },
  ]},
];

function ActionPlan() {
  return (
    <div className="space-y-4">
      {PLAN.map((b) => (
        <div key={b.bucket}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full" style={{ background: b.color }} />
            <span className="text-[13px] font-medium text-slate-100">{b.bucket}</span>
            <span className="text-[11px] text-slate-500">· {b.weeks}</span>
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-700/40">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-slate-400 text-left border-b border-slate-700/50 bg-slate-800/30">
                  <th className="py-2 px-3 font-medium w-[42%]">Task</th>
                  <th className="py-2 px-3 font-medium">Owner</th>
                  <th className="py-2 px-3 font-medium">Effort</th>
                  <th className="py-2 px-3 font-medium">Impact</th>
                  <th className="py-2 px-3 font-medium">Measurement hook</th>
                </tr>
              </thead>
              <tbody>
                {b.tasks.map((t, i) => (
                  <tr key={i} className="border-b border-slate-800/40 hover:bg-slate-800/20 align-top">
                    <td className="py-2 px-3 text-slate-200">{t.task}</td>
                    <td className="py-2 px-3 text-slate-400 whitespace-nowrap">{t.role}</td>
                    <td className="py-2 px-3 text-slate-400 whitespace-nowrap">{t.effort}</td>
                    <td className="py-2 px-3 whitespace-nowrap" style={{ color: b.color }}>{t.impact}</td>
                    <td className="py-2 px-3 text-slate-400">{t.hook}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function TopPages() {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {SITE_ORDER.map((k) => {
        const s = byKey(k);
        return (
          <div key={k} className="rounded-lg border border-slate-700/40 p-3 bg-slate-800/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
              <span className="text-[12.5px] font-medium text-slate-100">{s.name}</span>
            </div>
            {DATA.topPages[k].map((p) => (
              <div key={p.url} className="mb-2.5 last:mb-0">
                <div className="flex justify-between gap-2 text-[11.5px]">
                  <span className="font-mono text-slate-300 truncate">{p.url}</span>
                  <span className="text-slate-500 shrink-0">{fmt(p.etv)} v/mo</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {p.kw.map((kw) => (
                    <span key={kw[0]} className="text-[10.5px] px-1.5 py-[1px] rounded bg-slate-700/30 text-slate-400">
                      {kw[0]} <span className="text-slate-500">· {fmt(kw[1])} · #{kw[2]}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Section({ n, title, kicker, children }) {
  return (
    <section className="mb-9">
      <div className="flex items-baseline gap-3 mb-3 pb-2 border-b border-slate-700/40">
        <span className="font-mono text-[12px] text-amber-400/70">{n}</span>
        <h2 className="text-[15px] font-semibold text-slate-100 tracking-tight">{title}</h2>
        {kicker && <span className="text-[11px] text-slate-500 ml-auto">{kicker}</span>}
      </div>
      {children}
    </section>
  );
}

export default function CompetitorGapDashboard() {
  return (
    <div className="min-h-screen w-full" style={{ background: "#0E1217", fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
      <div className="mx-auto px-5 py-8" style={{maxWidth:1080}}>
        <header className="mb-8">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400/60 mb-1">SEO Gap Scout · {DATA.generated}</div>
          <h1 className="text-[26px] font-bold text-slate-50 tracking-tight">Competitor Gap Dashboard</h1>
          <p className="text-[12.5px] text-slate-400 mt-1">
            horseshoebend.com vs. three Page, AZ canyon-country rivals · data via DataForSEO Labs (organic estimates, US/desktop)
          </p>
        </header>

        <Section n="01" title="Site scorecard" kicker="green = leads · amber = mid · red = trails">
          <KpiCards />
        </Section>

        <Section n="02" title="Momentum · last 6 months" kicker="solid = traffic · dashed = top-10 keywords">
          <TrendChart />
        </Section>

        <Section n="03" title="Strength profile" kicker="each axis indexed to the leader = 100">
          <RadarChart />
        </Section>

        <Section n="04" title="Why they win">
          <WhyTheyWin />
        </Section>

        <Section n="05" title="Top pages & the keywords driving them">
          <TopPages />
        </Section>

        <Section n="06" title="Keyword gaps" kicker="competitors rank, you don't">
          <GapTable />
        </Section>

        <Section n="07" title="Top gaps by intent" kicker="top 5 of each, from the 15 best opportunities">
          <IntentGroups />
        </Section>

        <Section n="08" title="Action plan">
          <ActionPlan />
        </Section>

        <footer className="text-[10.5px] text-slate-500 leading-relaxed border-t border-slate-700/40 pt-4 space-y-1">
          <p><b className="text-slate-400">Sourcing.</b> Traffic, keyword counts and trends are DataForSEO modeled organic estimates (Google US, desktop), not first-party analytics. Referring domains & domain rank are read from SERP-embedded backlink fields (the dedicated Backlinks API was not enabled), measured at each site's top-ranking page. Core Web Vitals are a single point-in-time Lighthouse run, not 90-day field data.</p>
          <p><b className="text-slate-400">Caveats.</b> nps.gov is scored at page level for traffic/keywords; its 603 domain rank reflects the whole National Park Service domain, so treat its authority bars as a ceiling, not a like-for-like. 20 loosely-matched gap terms with no difficulty score were dropped from OpportunityScore. PositionGap uses a baseline of 100 where your site does not rank in the top 100. Trends are monthly (daily history wasn't available); nps is excluded from the trend lines as page-level history isn't available.</p>
        </footer>
      </div>
    </div>
  );
}
