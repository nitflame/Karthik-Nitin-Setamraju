import SideRail from './components/SideRail';
import BackgroundPulse from './components/BackgroundPulse';
import MobileNav from './components/MobileNav';
import ScrollProgress from './components/ScrollProgress';
import ResumeButton from './components/ResumeButton';
import Hero from './components/Hero';
import WaveformDivider from './components/WaveformDivider';
import Reveal from './components/Reveal';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Dashboard from './components/Dashboard/Dashboard';
import Certifications from './components/Certifications';
import Resume from './components/Resume';
import Contact from './components/Contact';
import TerminalDrawer from './components/TerminalDrawer';

export default function App() {
  return (
    <div className="app-shell">
      <BackgroundPulse />
      <SideRail />
      <MobileNav />
      <ScrollProgress />
      <ResumeButton />
      <main className="main-column">
        <Hero />
        <WaveformDivider label="EXPERIENCE" />
        <Reveal><Experience /></Reveal>
        <WaveformDivider label="PROJECTS" />
        <Reveal><Projects /></Reveal>
        <WaveformDivider label="OBSERVABILITY" />
        <Reveal><Dashboard /></Reveal>
        <WaveformDivider label="CERTIFICATIONS" />
        <Reveal><Certifications /></Reveal>
        <WaveformDivider label="RESUME" />
        <Reveal><Resume /></Reveal>
        <WaveformDivider label="CONTACT" />
        <Reveal><Contact /></Reveal>
      </main>
      <TerminalDrawer />
    </div>
  );
}
