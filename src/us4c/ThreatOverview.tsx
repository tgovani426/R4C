import { type ReactNode, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  BrainCircuit,
  Cloud,
  Eye,
  Gauge,
  GraduationCap,
  HandCoins,
  Layers,
  Lightbulb,
  Link2,
  Megaphone,
  ShieldAlert,
  Target,
  Users,
} from "lucide-react";
import { rajasthanDistricts, rajasthanViewBox } from "./rajasthanMap";
import {
  caseTrend,
  cityHotspots,
  crimeTypes,
  districtActivity,
  emergingTrends,
  focusAreas,
  hotspotLevel,
  keyFindings,
  riskRegister,
  threatSummary,
  topThreats,
  victimAges,
} from "./threatData";

// Categorical and ordinal steps validated against the dark panel surface (#131f31).
const series = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181"];
const levelFill = { High: "#86b6ef", Moderate: "#3987e5", Low: "#184f95" };
const trendIcons = [BrainCircuit, Link2, Layers, Cloud];
const findingIcons = [HandCoins, GraduationCap, Users];
const focusIcons = [Target, HandCoins, Megaphone];
const mapLabels = ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Alwar", "Ajmer"];

const axisTick = { fill: "#a7b6cc", fontSize: 11 };
const tooltipProps = {
  contentStyle: {
    background: "#0e192a",
    border: "1px solid #374961",
    borderRadius: 6,
    fontSize: 12,
    color: "#eaf0fa",
  },
  itemStyle: { color: "#eaf0fa" },
  labelStyle: { color: "#a7b6cc" },
  cursor: { fill: "rgba(105, 202, 235, 0.08)", stroke: "#4a5d78" },
};
const fmt = (n: number) => n.toLocaleString("en-IN");

function Panel({
  title,
  eyebrow,
  className = "",
  children,
}: {
  title: string;
  eyebrow?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`threat-panel ${className}`}>
      <header>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h3>{title}</h3>
      </header>
      {children}
    </section>
  );
}

function Donut({
  data,
  nameKey,
  label,
}: {
  data: { share: number; [key: string]: string | number }[];
  nameKey: string;
  label: string;
}) {
  return (
    <div className="threat-donut">
      <div className="threat-donut-chart" role="img" aria-label={label}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="share"
              nameKey={nameKey}
              innerRadius="62%"
              outerRadius="96%"
              paddingAngle={2}
              stroke="#131f31"
              strokeWidth={2}
              isAnimationActive={false}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={series[i]} />
              ))}
            </Pie>
            <Tooltip {...tooltipProps} formatter={(v: number) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="threat-legend">
        {data.map((d, i) => (
          <li key={String(d[nameKey])}>
            <i style={{ background: series[i] }} />
            <span>{d[nameKey]}</span>
            <strong>{d.share}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DistrictMap() {
  const [active, setActive] = useState<string | null>(null);
  const count = active ? districtActivity[active] ?? 0 : 0;
  return (
    <div className="district-map">
      <svg
        viewBox={rajasthanViewBox}
        role="group"
        aria-label="Rajasthan districts by cybercrime activity level"
      >
        {rajasthanDistricts.map((d) => {
          const level = hotspotLevel(districtActivity[d.name] ?? 0);
          return (
            <path
              key={d.name}
              d={d.d}
              fill={levelFill[level]}
              className={active === d.name ? "active" : ""}
              tabIndex={0}
              aria-label={`${d.name}: ${level} activity, ${fmt(districtActivity[d.name] ?? 0)} complaints`}
              onMouseEnter={() => setActive(d.name)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(d.name)}
              onBlur={() => setActive(null)}
            />
          );
        })}
        {rajasthanDistricts
          .filter((d) => mapLabels.includes(d.name))
          .map((d) => (
            <text key={d.name} x={d.cx} y={d.cy} aria-hidden="true">
              {d.name}
            </text>
          ))}
      </svg>
      <div className="district-readout" aria-live="polite">
        {active ? (
          <>
            <strong>{active}</strong>
            <span>
              {hotspotLevel(count)} activity · {fmt(count)} complaints
            </span>
          </>
        ) : (
          <span>Hover or focus a district for details</span>
        )}
      </div>
      <ul className="threat-legend inline">
        {(["High", "Moderate", "Low"] as const).map((l) => (
          <li key={l}>
            <i style={{ background: levelFill[l] }} />
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ThreatOverview() {
  return (
    <section className="threat-overview" aria-labelledby="threat-overview-title">
      <header className="threat-overview-head">
        <div>
          <span className="eyebrow">THREAT LANDSCAPE / RAJASTHAN</span>
          <h2 id="threat-overview-title">Threat & cybercrime trends</h2>
        </div>
        <span className="illustrative-badge">
          <AlertTriangle size={14} />
          Illustrative data · {threatSummary.period}
        </span>
      </header>

      <div className="threat-grid top">
        <Panel title="Executive summary" eyebrow="OVERVIEW">
          <dl className="threat-summary">
            <div>
              <Gauge size={20} />
              <dt>Overall threat level</dt>
              <dd className="moderate">{threatSummary.level}</dd>
            </div>
            <div>
              <ShieldAlert size={20} />
              <dt>Top priority</dt>
              <dd>{threatSummary.priority}</dd>
            </div>
            <div>
              <Eye size={20} />
              <dt>Recommended action</dt>
              <dd>{threatSummary.action}</dd>
            </div>
          </dl>
        </Panel>
        <Panel title="Top cyber threats" eyebrow="SEVERITY SCORE / 100">
          <ol className="threat-ranking">
            {topThreats.map((t, i) => (
              <li key={t.name}>
                <span className="rank">{i + 1}</span>
                <span className="name">{t.name}</span>
                <i>
                  <b style={{ width: `${t.score}%` }} />
                </i>
                <strong>{t.score}</strong>
              </li>
            ))}
          </ol>
        </Panel>
        <Panel title="Emerging threat trends" eyebrow="WATCHLIST">
          <ul className="threat-list">
            {emergingTrends.map((t, i) => {
              const Icon = trendIcons[i];
              return (
                <li key={t}>
                  <Icon size={17} />
                  {t}
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>

      <div className="threat-grid analytics">
        <Panel title="District activity" eyebrow="HOTSPOT MAP" className="map-panel">
          <DistrictMap />
        </Panel>
        <Panel title="City hotspots" eyebrow="COMPLAINTS PER LAKH POPULATION">
          <div
            className="threat-chart"
            role="img"
            aria-label={`City hotspots: ${cityHotspots.map((c) => `${c.city} ${c.rate}`).join(", ")} complaints per lakh`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityHotspots} layout="vertical" margin={{ left: 0, right: 34, top: 4, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="#22324a" />
                <XAxis type="number" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="city" tick={axisTick} axisLine={false} tickLine={false} width={64} />
                <Tooltip {...tooltipProps} formatter={(v: number) => [v, "Per lakh"]} />
                <Bar
                  dataKey="rate"
                  fill={series[0]}
                  radius={[0, 4, 4, 0]}
                  barSize={14}
                  isAnimationActive={false}
                  label={{ position: "right", fill: "#eaf0fa", fontSize: 11 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Most common cybercrime types" eyebrow="SHARE OF COMPLAINTS">
          <Donut
            data={crimeTypes}
            nameKey="type"
            label={`Cybercrime types: ${crimeTypes.map((c) => `${c.type} ${c.share}%`).join(", ")}`}
          />
        </Panel>
        <Panel title="Case trend" eyebrow="REGISTERED CASES PER YEAR">
          <div
            className="threat-chart"
            role="img"
            aria-label={`Case trend: ${caseTrend.map((c) => `${c.year} ${fmt(c.cases)}`).join(", ")}`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={caseTrend} margin={{ left: 0, right: 16, top: 18, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#22324a" />
                <XAxis dataKey="year" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis
                  tick={axisTick}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                  tickFormatter={(v: number) => `${v / 1000}k`}
                />
                <Tooltip {...tooltipProps} formatter={(v: number) => [fmt(v), "Cases"]} />
                <Line
                  dataKey="cases"
                  stroke={series[0]}
                  strokeWidth={2}
                  dot={{ r: 4, fill: series[0], stroke: "#131f31", strokeWidth: 2 }}
                  activeDot={{ r: 6, stroke: "#131f31", strokeWidth: 2 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Victims by age group" eyebrow="DEMOGRAPHIC DISTRIBUTION">
          <Donut
            data={victimAges}
            nameKey="group"
            label={`Victims by age: ${victimAges.map((a) => `${a.group} ${a.share}%`).join(", ")}`}
          />
        </Panel>
      </div>

      <div className="threat-grid bottom">
        <Panel title="Risk assessment & mitigation" eyebrow="RISK REGISTER">
          <div className="register-scroll">
            <table className="risk-table">
              <thead>
                <tr>
                  <th>Threat</th>
                  <th>Risk level</th>
                  <th>Recommended mitigation</th>
                </tr>
              </thead>
              <tbody>
                {riskRegister.map((r) => (
                  <tr key={r.threat}>
                    <td>{r.threat}</td>
                    <td>
                      <span className={`risk-chip ${r.risk.toLowerCase()}`}>
                        <i aria-hidden="true" />
                        {r.risk}
                      </span>
                    </td>
                    <td>{r.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="Key findings" eyebrow="ANALYSIS">
          <ul className="threat-notes">
            {keyFindings.map((f, i) => {
              const Icon = findingIcons[i] ?? Lightbulb;
              return (
                <li key={f.title}>
                  <Icon size={18} />
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.detail}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
        <Panel title="Focus areas" eyebrow="RECOMMENDATIONS">
          <ul className="threat-notes">
            {focusAreas.map((f, i) => {
              const Icon = focusIcons[i] ?? Target;
              return (
                <li key={f.title}>
                  <Icon size={18} />
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.detail}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>
    </section>
  );
}
