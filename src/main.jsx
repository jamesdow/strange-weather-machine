import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const stages = [
  ['Intake', 'Green', 'Strategic question and constraints are clear.'],
  ['Research Sweep', 'Green', 'Evidence includes behavioural and cultural signals.'],
  ['Island Mapping', 'Green', '16 raw islands mapped, 9 shortlisted, 5 selected.'],
  ['Final 5', 'Green', 'All territories have thesis, human truth, gift and permission.'],
  ['Permission Briefing', 'Amber', 'Briefs are usable; proof plans need sharpening.'],
  ['Client Choice', 'Idle', 'Client chooses 3 from 5 fully briefed routes.'],
  ['Creative Handoff', 'Idle', 'James and Lucas make the work.'],
  ['Return Loop', 'Idle', 'Read live and System1-style results against hypotheses.'],
];

const evidence = [
  ['E001', 'Primark value is powerful when framed as pride and skill, not apology.', 'High'],
  ['E002', 'Adaptive fashion is moving from niche accessibility to mainstream expectation.', 'Medium'],
  ['E003', 'Homeware value shoppers use small upgrades as emotional regulation.', 'Medium'],
  ['E004', 'Performance basics can be credible as everyday endurance, not elite sport.', 'Medium'],
  ['E005', 'AI work risks caricature if low-cost fashion codes are lazy.', 'High'],
  ['E006', 'Limited online commerce means testing should not rely on direct purchase.', 'High'],
];

const islands = [
  ['Taste Without Apology', 'Final 5', 88, 84, 91, 'Turn budget creativity into pride.'],
  ['Adaptive Everyday', 'Final 5', 84, 76, 88, 'Make adaptive design ordinary, visible and desirable.'],
  ['Home As Soft Status', 'Final 5', 81, 79, 78, 'Make tiny domestic upgrades emotionally significant.'],
  ['Proof Of The Find', 'Final 5', 77, 82, 70, 'Give shoppers a language for the intelligence of the find.'],
  ['Everyday Endurance Kit', 'Final 5', 72, 66, 77, 'Honour everyday stamina without pretending it is sport.'],
  ['School-Run Style Codes', 'Shortlist', 66, 61, 72, 'Make pragmatic dressing feel seen.'],
  ['Teen Bedroom Worlds', 'Shortlist', 64, 58, 75, 'Show self-expression without requiring spend.'],
  ['Occasion Hacks', 'Shortlist', 63, 70, 58, 'Make showing up well less financially brutal.'],
  ['Holiday Heat Without The Bill', 'Shortlist', 61, 63, 63, 'Give fantasy without financial shame.'],
  ['Beauty First Tries', 'Hold', 56, 54, 64, 'Lower the cost of experimentation.'],
  ['Unofficial Work Uniforms', 'Hold', 54, 59, 52, 'Make invisible practical dressing visible.'],
  ['Dupe Culture Honesty', 'Kill', 49, 48, 65, 'Legal/IP and brand-safety risk.'],
  ['Micro Luxury', 'Kill', 47, 39, 72, 'Weak permission; too many brands can say it.'],
  ['Festival-Proof Fits', 'Kill', 44, 57, 39, 'Seasonal, cliche-heavy, low strategic stretch.'],
  ['Return-To-Office Armour', 'Hold', 52, 51, 57, 'Make uncertainty easier to dress for.'],
  ['Baby Budget Truths', 'Hold', 55, 64, 49, 'Practical care needs emotional respect.'],
];

const briefs = [
  {
    name: 'Taste Without Apology', status: 'Recommended', score: 88,
    role: 'Amplifier, not rescuer',
    truth: 'They do not want to be told cheap can look expensive. They want the intelligence of making it work to be recognised.',
    task: 'Create work that makes value shoppers feel culturally sharp, with Primark amplifying their taste intelligence, not teaching them how to dress.',
    proof: 'Look for comments that add outfit stories, saves/shares around specific looks, and language that repeats pride rather than bargain shame.'
  },
  {
    name: 'Adaptive Everyday', status: 'Recommended', score: 84,
    role: 'Normaliser, not saviour',
    truth: 'People do not want inspirational treatment for needing clothes that work. They want normality, dignity and choice.',
    task: 'Create work that makes adaptive design feel like a normal part of getting dressed.',
    proof: 'Prioritise validator response and whether disabled audiences describe the work as normalising rather than inspirational.'
  },
  {
    name: 'Home As Soft Status', status: 'Recommended', score: 81,
    role: 'Stage-builder, not taste judge',
    truth: 'A room does not need to be impressive to make someone feel held together.',
    task: 'Create work that makes small domestic changes feel emotionally powerful.',
    proof: 'Look for saves, room-specific comments, recognition and high completion on transformation assets.'
  },
  {
    name: 'Proof Of The Find', status: 'Client Choice', score: 77,
    role: 'Witness, not hype machine',
    truth: 'The win is not that it was cheap. The win is that nobody believes it was cheap.',
    task: 'Create work that dramatizes the moment someone proves their taste through a surprising find.',
    proof: 'Watch for tags, share behaviour and comments where people describe their own best finds.'
  },
  {
    name: 'Everyday Endurance Kit', status: 'Wild Card', score: 72,
    role: 'Equip, not motivate',
    truth: 'Some days are not workouts. They are still physical.',
    task: 'Create work that makes ordinary endurance visible, with Primark as equipment for real days.',
    proof: 'Look for worker, parent and student recognition plus credible practical comments.'
  },
];

function Badge({ children }) { return <span className={`badge ${children.toString().toLowerCase().replaceAll(' ', '-')}`}>{children}</span>; }

function App() {
  const [tab, setTab] = useState('control');
  const [brief, setBrief] = useState(briefs[0]);
  const [stage, setStage] = useState(4);

  return (
    <main className="app">
      <section className="hero">
        <p className="kicker">Strange Weather Machine</p>
        <h1>Run Control</h1>
        <p className="lede">Map 12-20 cultural islands, brief the strongest 5, let the client choose 3, then hand those to James and Lucas for the human creative phase.</p>
        <div className="meta"><span>Primark demo run</span><Badge>Amber</Badge><span>Current stage: Permission Briefing</span></div>
      </section>

      <nav className="tabs">{['control','islands','briefs','evidence','client'].map(t => <button key={t} onClick={() => setTab(t)} className={tab === t ? 'active' : ''}>{t}</button>)}</nav>

      <section className="shell">
        <aside className="rail">
          <h2>Stage Gates</h2>
          {stages.map(([name, status, gate], i) => <button key={name} className={stage === i ? 'stage active' : 'stage'} onClick={() => setStage(i)}><b>{i}</b><span>{name}<small>{gate}</small></span><Badge>{status}</Badge></button>)}
        </aside>

        <div className="content">
          {tab === 'control' && <div className="grid"><Card title="Current Gate" value={stages[stage][0]} text={stages[stage][2]} /><Card title="Raw Islands" value="16" text="Broad opportunity landscape mapped before selection." /><Card title="Final Briefs" value="5" text="Client sees fully briefed possibilities, not idea names." /><Card title="Creative Boundary" value="Human" text="James and Lucas create the work after client choice." /></div>}
          {tab === 'islands' && <IslandView />}
          {tab === 'briefs' && <BriefView brief={brief} setBrief={setBrief} />}
          {tab === 'evidence' && <EvidenceView />}
          {tab === 'client' && <ClientView />}
        </div>
      </section>
    </main>
  );
}

function Card({ title, value, text }) { return <article className="card"><p className="kicker">{title}</p><h3>{value}</h3><p>{text}</p></article>; }

function IslandView() { return <div className="panel"><p className="kicker">Island Map</p><h2>16 raw islands to 5 briefed territories</h2><div className="island-table">{islands.map(([name,status,score,permission,opportunity,gift]) => <div className="island" key={name}><strong>{name}</strong><Badge>{status}</Badge><span>{score}</span><small>Permission {permission} / Opportunity {opportunity}</small><p>{gift}</p></div>)}</div></div>; }

function BriefView({ brief, setBrief }) { return <div className="brief-layout"><div className="brief-list">{briefs.map(b => <button key={b.name} onClick={() => setBrief(b)} className={brief.name === b.name ? 'active' : ''}><strong>{b.name}</strong><small>{b.status} / {b.score}</small></button>)}</div><article className="panel"><p className="kicker">Permission Brief</p><h2>{brief.name}</h2><Badge>{brief.status}</Badge><dl><dt>Human Truth</dt><dd>{brief.truth}</dd><dt>Brand Role</dt><dd>{brief.role}</dd><dt>Creative Task</dt><dd>{brief.task}</dd><dt>Proof Plan</dt><dd>{brief.proof}</dd></dl></article></div>; }

function EvidenceView() { return <div className="panel"><p className="kicker">Evidence Ledger</p><h2>Claims, confidence, usage</h2>{evidence.map(([id,claim,confidence]) => <div className="evidence" key={id}><strong>{id}</strong><p>{claim}</p><Badge>{confidence}</Badge></div>)}</div>; }

function ClientView() { return <div className="grid"><Card title="Client sees" value="5" text="Five fully briefed territories from a wider mapped landscape." /><Card title="We recommend" value="3" text="Taste Without Apology, Adaptive Everyday, Home As Soft Status." /><Card title="Client chooses" value="3" text="Their selection starts the creative phase." /><Card title="Machine stops" value="Here" text="Then James and Lucas make the work. Return loop only after testing." /></div>; }

createRoot(document.getElementById('root')).render(<App />);
