import { useEffect, useRef, useState } from 'react';
import { portfolioData } from './data/portfolio';

const sections = [
  ['top', '首页'],
  ['works', '精选作品'],
  ['process', '设计过程'],
  ['about', '关于我'],
  ['skills', '工具技能'],
  ['contact', '联系方式'],
];

function SectionHeading({ eyebrow, title, copy }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function ProjectPanel({ project, onClose }) {
  return <PanelShell title={project.title} eyebrow={`PROJECT / ${project.id.toUpperCase()}`} onClose={onClose}><p className="panel-lede">{project.note}</p><div className="panel-placeholder"><span>{project.status}</span><strong>项目内容正在整理</strong><small>真实案例、过程记录和视觉成果将在准备完成后补充。</small></div></PanelShell>;
}

function InfoPanel({ type, onClose }) {
  if (type === 'contact') return <PanelShell title="保持联系" eyebrow="CONTACT / 06" onClose={onClose}><p className="panel-lede">如果你想交流设计、作品集或合作想法，可以通过邮箱找到我。</p><a className="panel-email" href={portfolioData.contact.href}>{portfolioData.contact.email}<span>↗</span></a></PanelShell>;
  if (type === 'process') return <PanelShell title="设计过程" eyebrow="PROCESS / 03" onClose={onClose}><p className="panel-lede">未来每个项目都会记录从问题、草图到最终界面的过程。</p><div className="panel-steps">{['观察问题', '整理信息', '画出结构', '细化视觉', '复盘与更新'].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div></PanelShell>;
  return <PanelShell title="关于我" eyebrow="ABOUT / 04" onClose={onClose}><p className="panel-lede">{portfolioData.profile.summary}</p><div className="panel-columns"><div><span className="eyebrow">EDUCATION</span><strong>{portfolioData.profile.school} · 本科</strong></div><div><span className="eyebrow">EXPERIENCE</span>{portfolioData.experience.map((item) => <strong key={item}>{item}</strong>)}</div></div></PanelShell>;
}

function PanelShell({ eyebrow, title, onClose, children }) {
  const panelRef = useRef(null);
  useEffect(() => {
    panelRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
      if (event.key !== 'Tab') return;
      const nodes = panelRef.current?.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!nodes?.length) return;
      const first = nodes[0]; const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);
  return <div className="panel-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="content-panel" role="dialog" aria-modal="true" aria-labelledby="panel-title" tabIndex="-1" ref={panelRef}><button className="panel-close" type="button" onClick={onClose} aria-label="关闭面板">×</button><span className="eyebrow">{eyebrow}</span><h2 id="panel-title">{title}</h2>{children}</section></div>;
}

function BrowserPreview({ onOpen }) {
  return <div className="browser-window" aria-label="个人作品档案浏览器预览"><div className="browser-toolbar"><div className="traffic-lights"><i /><i /><i /></div><div className="browser-tabs"><span className="active-tab">My Design Archive</span><span>+ New tab</span></div><div className="browser-address">mydesigndesk.local / archive</div><span className="browser-search">⌕</span></div><div className="browser-body"><aside className="browser-sidebar"><strong>MY DESK</strong><span>Archive</span><span>Process</span><span>About</span><span>Tools</span><small>2026 / STUDENT</small></aside><div className="browser-main"><div className="browser-intro"><span className="eyebrow">MY DESIGN ARCHIVE</span><h2>Recent explorations</h2><p>A small collection of interfaces, visual systems and experiments.</p></div><div className="browser-projects">{portfolioData.projects.map((project, index) => <button className={`browser-project browser-project-${index + 1}`} type="button" key={project.id} onClick={() => onOpen(project)}><span>0{index + 1} / {project.status}</span><strong>{project.title}</strong><small>{project.note}</small><i>↗</i></button>)}</div></div></div></div>;
}

export default function App() {
  const [panel, setPanel] = useState(null);
  const triggerRef = useRef(null);
  const openPanel = (value) => { triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; setPanel(value); };
  const closePanel = () => { setPanel(null); requestAnimationFrame(() => triggerRef.current?.focus()); };
  return <main className="site-shell" id="top"><aside className="side-nav" aria-label="章节导航">{sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</aside><header className="topbar"><a className="brand" href="#top">{portfolioData.siteTitleZh}</a><span className="topbar-note">UI / WEB / VISUAL DESIGN · 2026</span><button className="top-contact" type="button" onClick={() => openPanel('contact')}>联系我 <span>↗</span></button></header><nav className="mobile-nav" aria-label="移动端章节导航">{sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav><section className="hero-section" id="home"><div className="cloud cloud-one" /><div className="cloud cloud-two" /><div className="cloud cloud-three" /><div className="hero-content"><span className="hero-kicker">MY DESIGN DESK</span><h1>Designing ideas<br /><em>into interfaces.</em></h1><p>{portfolioData.profile.summary}</p><div className="hero-actions"><a className="primary-button" href="#works">查看作品 <span>↗</span></a><button className="quiet-button" type="button" onClick={() => openPanel('contact')}>联系我</button></div></div><div className="hero-stamp">STUDENT<br />ARCHIVE<br /><b>2026</b></div><BrowserPreview onOpen={(project) => openPanel(project)} /></section><section className="intro-section content-section" id="about"><div className="section-index">01</div><SectionHeading eyebrow="ABOUT THIS DESK ↗" title="A student designer building a visual language." copy="我是一名正在学习 UI、网页设计和视觉设计的学生。" /><p className="intro-copy">我关注界面结构、信息层级、视觉系统与数字体验，也在真实项目和持续练习中逐渐建立自己的设计方法。</p></section><section className="works-section content-section" id="works"><div className="section-index">02</div><SectionHeading eyebrow="SELECTED WORKS" title="Projects in progress." copy="A small archive of interfaces, visual systems and experiments." /><div className="works-grid">{portfolioData.projects.map((project, index) => <button className={`work-card work-card-${index + 1}`} type="button" key={project.id} onClick={() => openPanel(project)}><span className="work-number">0{index + 1}</span><div className="work-visual"><i /><i /><i /></div><strong>{project.title}</strong><small>{project.note}</small><em>{project.status} ↗</em></button>)}</div></section><section className="process-section content-section" id="process"><div className="section-index">03</div><SectionHeading eyebrow="DESIGN PROCESS" title="From question to interface." copy="每个项目都会从观察、整理和反复迭代开始。" /><div className="process-track">{['观察问题', '整理信息', '画出结构', '细化视觉', '复盘与更新'].map((item, index) => <button type="button" key={item} onClick={() => openPanel('process')}><span>0{index + 1}</span><strong>{item}</strong></button>)}</div></section><section className="about-section content-section" id="about-me"><div className="section-index">04</div><SectionHeading eyebrow="ABOUT ME" title="A work in progress." /><div className="about-layout"><div><span className="eyebrow">EDUCATION</span><h3>{portfolioData.profile.school} · 本科</h3></div><div><span className="eyebrow">EXPERIENCE</span>{portfolioData.experience.map((item) => <h3 key={item}>{item}</h3>)}</div><button className="outline-button" type="button" onClick={() => openPanel('about')}>查看完整介绍 ↗</button></div></section><section className="skills-section content-section" id="skills"><div className="section-index">05</div><SectionHeading eyebrow="TOOLS I USE" title="A flexible toolkit." /><div className="skills-layout"><div className="tool-strip"><span>Figma</span><span>Photoshop</span><span>Illustrator</span><span>CorelDRAW</span><span>Blender</span></div><div className="workflow-strip"><span>Codex</span><span>ChatGPT</span><span>WorkBuddy</span></div></div></section><section className="contact-section content-section" id="contact"><div className="contact-orbit">✦</div><SectionHeading eyebrow="LET'S TALK" title="Have an idea in mind?" copy="如果你想交流设计、作品集或合作想法，可以通过邮箱找到我。" /><a className="contact-email" href={portfolioData.contact.href}>{portfolioData.contact.email}<span>↗</span></a></section><footer className="site-footer"><span>我的设计工作桌 / My Design Desk</span><span>Built as a living archive</span></footer>{panel && (panel.id ? <ProjectPanel project={panel} onClose={closePanel} /> : <InfoPanel type={panel} onClose={closePanel} />)}</main>;
}
