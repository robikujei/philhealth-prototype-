import { Disclosure } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const routes = ['home', 'about', 'benefits', 'members', 'partners', 'services', 'downloads', 'contact', 'privacy', 'accessibility'];
const navItems = [
  ['about', 'About Us'], ['benefits', 'Benefits'], ['members', 'Members'], ['partners', 'Partners'], ['services', 'Online Services'], ['downloads', 'Downloads'],
];

function pageFromHash() {
  const route = window.location.hash.replace('#/', '') || 'home';
  return routes.includes(route) ? route : 'home';
}

function Link({ route, children, className = '', current, ...props }) {
  return <a className={className} aria-current={current ? 'page' : undefined} href={`#/${route}`} {...props}>{children}</a>;
}

function Card({ title, text, route = 'about', action = 'Learn more' }) {
  return <article className="card"><h3>{title}</h3><p>{text}</p><Link route={route}>{action}</Link></article>;
}

function Home() {
  return <>
    <section className="hero portal-hero"><div className="container hero-layout"><div className="hero-content"><span className="eyebrow">PhilHealth redesign prototype</span><p className="hero-kicker">Public advisory</p><h1>Making health benefits easier to understand.</h1><p>Get clear information about PhilHealth benefits, member services, and support options in one place.</p><div className="hero-actions"><Link route="benefits" className="button">Explore benefits</Link><Link route="contact" className="button button-secondary">Contact support</Link></div></div><aside className="hero-panel" aria-label="Featured updates"><p className="panel-label">Featured updates</p><ul><li><strong>PhilHealth at 31</strong><span>Learn about the corporation’s public-health commitment.</span></li><li><strong>New and updated benefits</strong><span>Find current package information and eligibility guidance.</span></li><li><strong>Protect yourself from scams</strong><span>Use official support channels for member concerns.</span></li></ul><Link route="downloads">View circulars and advisories</Link></aside></div></section>
    <section className="quick-services"><div className="container"><h2>What can we help you do?</h2><div className="service-grid"><Card title="Check your benefits" text="Find benefit packages and coverage guidance." route="benefits" action="View benefit guide" /><Card title="Use online services" text="Access member-facing services through clearly labelled entry points." route="services" action="Open service directory" /><Card title="Find support" text="Locate contact channels and PhilHealth offices." route="contact" action="Get contact options" /><Card title="Download forms" text="Browse accessible forms, publications, and public documents." route="downloads" action="Browse downloads" /></div></div></section>
    <section className="section"><div className="container two-col information-section"><div><p className="section-kicker">Helpful tools</p><h2>Know your benefit package before you need it.</h2><p>Searchable, plain-language benefit information gives members a clearer starting point for understanding covered services.</p><Link route="benefits" className="button">Search benefit information</Link></div><div className="tool-card"><span aria-hidden="true" className="tool-icon">⌕</span><div><h3>Benefit and case-rate guide</h3><p>A quick route to benefit-package information, explained in terms people can scan and understand.</p></div></div></div></section>
    <section className="news-section"><div className="container"><div className="section-heading"><div><p className="section-kicker">Latest information</p><h2>News, advisories, and public notices</h2></div><Link route="downloads">View all updates</Link></div><div className="grid news-grid"><Card title="Circulars" text="Official circulars and implementation guidance." route="downloads" action="Browse circulars" /><Card title="Advisories" text="Public advisories and service notices." route="downloads" action="Read advisories" /><Card title="News" text="Current PhilHealth announcements and updates." route="downloads" action="Read news" /></div></div></section>
  </>;
}

function About() {
  return <>
    <section className="page-intro"><div className="container"><span className="eyebrow">About PhilHealth</span><h1>One clear place to understand PhilHealth.</h1><p>The original About Us content is reorganized into a readable, responsive experience while keeping important institutional information easy to reach.</p></div></section>
    <section className="service-strip"><div className="container two-col"><div><h2>Our role in public health</h2><p>PhilHealth helps members understand and use national health insurance benefits. This prototype groups its mandate, leadership, reports, and references around the questions citizens commonly ask.</p><Link route="benefits" className="button">Explore benefits</Link></div><aside className="notice"><strong>Need help now?</strong><p>Contact details are presented as clear, accessible actions in the full production design. This prototype does not collect personal information.</p></aside></div></section>
    <section className="section"><div className="container"><h2>Explore About Us</h2><div className="grid"><Card title="Profile and history" text="Learn the agency history, mandate, vision, mission, and core values." action="View profile" /><Card title="Leadership and organization" text="Find the board, executive officers, and organizational structure." action="View leadership" /><Card title="Reports and references" text="Access annual reports, laws, studies, statistics, and public documents." action="View reports" /></div></div></section>
    <section className="section"><div className="container two-col"><div><h2>Information designed for everyone</h2><ul className="feature-list"><li>Logical headings and landmark regions for screen-reader navigation.</li><li>Visible keyboard focus and a skip link.</li><li>Large text, high contrast, and no information conveyed by color alone.</li><li>Cards replace long, undifferentiated lists of links.</li></ul></div><div className="card highlight"><h3>Accessible by default</h3><p>Content is written in plain language and arranged for phones, desktops, keyboard users, and visitors using assistive technology.</p><Link route="accessibility">Read the accessibility notes</Link></div></div></section>
  </>;
}

function SimplePage({ route }) {
  const copy = { benefits:'Benefit information is organized by member goal, with readable summaries and clearly labelled next steps.', members:'A simplified member-information page for common questions, contribution guidance, and account-service entry points.', partners:'Information for health-care providers and institutional partners, presented with consistent navigation.', services:'Service links would open clearly labelled destinations. This prototype contains no login, collection, or transaction flow.', downloads:'Forms and publications would include format, language, file size, and accessible HTML alternatives where available.', contact:'A contact directory would provide clear channels, operating hours, and accessible help options.', privacy:'This is an academic prototype. It stores no information and does not represent an official government service.', accessibility:'The prototype uses semantic regions, keyboard-accessible controls, focus indicators, readable type, responsive layouts, contrast-conscious colors, and descriptive navigation labels.' };
  const title = route === 'privacy' ? 'Privacy notice' : route === 'accessibility' ? 'Accessibility notes' : route[0].toUpperCase() + route.slice(1);
  return <section className="page-intro"><div className="container"><span className="eyebrow">Prototype page</span><h1>{title}</h1><p>{copy[route]}</p><Link route="about" className="button">Return to About Us</Link></div></section>;
}

function App() {
  const [route, setRoute] = useState(pageFromHash());
  useEffect(() => { const sync = () => setRoute(pageFromHash()); window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync); }, []);
  useEffect(() => { document.title = `${route === 'home' ? 'Home' : route[0].toUpperCase() + route.slice(1)} | PhilHealth Redesign Prototype`; document.getElementById('main-content')?.focus(); }, [route]);
  const content = route === 'home' ? <Home /> : route === 'about' ? <About /> : <SimplePage route={route} />;
  return <><a className="skip-link" href="#main-content">Skip to main content</a><header className="site-header"><div className="utility-bar"><div className="container utility-inner"><span>PhilHealth redesign prototype</span><Link route="contact">Contact us</Link><Link route="privacy">Privacy notice</Link></div></div><Disclosure as="div" className="container brand-row">{({ open, close }) => <><Link route="home" className="brand"><span className="brand-mark" aria-hidden="true">✚</span><span><strong>PhilHealth</strong><small>Your Partner in Health</small></span></Link><Disclosure.Button className="menu-button">{open ? 'Close menu' : 'Menu'}</Disclosure.Button><Disclosure.Panel as="nav" className="main-nav" aria-label="Primary navigation">{navItems.map(([path,label]) => <Link key={path} route={path} current={route === path} onClick={close}>{label}</Link>)}</Disclosure.Panel></>}</Disclosure></header><main id="main-content" tabIndex="-1">{content}</main><footer className="site-footer"><div className="container footer-grid"><section><Link route="home" className="brand footer-brand"><span className="brand-mark" aria-hidden="true">✚</span><strong>PhilHealth</strong></Link><p>Accessible redesign prototype for academic evaluation. It is not an official PhilHealth service.</p></section><section><h2>Quick links</h2><Link route="about">About Us</Link><Link route="services">Online Services</Link><Link route="contact">Contact Us</Link></section><section><h2>Accessibility</h2><p>Designed for keyboard use, clear structure, responsive reading, and strong color contrast.</p></section></div></footer></>;
}

createRoot(document.getElementById('root')).render(<App />);
