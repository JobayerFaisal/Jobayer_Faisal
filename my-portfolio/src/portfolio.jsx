import { useState, useEffect, useRef } from "react";

const data = {
  name: "Jobayer Faisal Fahim",
  role: "Computer Science & Engineering Graduate",
  tagline: "Building intelligent systems that solve real-world problems.",
  bio: "A motivated CSE graduate from East West University with a CGPA of 3.80, an IEEE-published paper, and a thesis on autonomous AI systems. I love building things that matter — from multi-agent flood response systems to smart IoT monitors.",
  email: "jobayerfaisal.fahim@gmail.com",
  phone: "+880 1862-552057",
  github: "https://github.com/JobayerFaisal",
  linkedin: "https://linkedin.com/in/jobayer-faisal-fahim",
  location: "Dhaka, Bangladesh",
  skills: [
    { category: "Languages", items: ["Python", "C", "C++", "Java", "JavaScript"] },
    { category: "Libraries", items: ["Pandas", "NumPy", "FastAPI", "Flask"] },
    { category: "Databases", items: ["Oracle", "MySQL", "MongoDB", "Redis"] },
    { category: "Tools", items: ["Git", "GitHub", "Postman", "Google Earth Engine", "Tuya IoT"] },
    { category: "Concepts", items: ["REST APIs", "Multi-Agent Systems", "Federated Learning", "IoT", "OOP"] },
  ],
  projects: [
    {
      title: "Autonomous Flood Response System",
      subtitle: "Final Year Thesis · 2026",
      desc: "A four-agent AI system that autonomously chains real-time flood detection, community distress identification, resource allocation, and safe route dispatch — without human coordination at handoff points.",
      tags: ["Python", "Redis Pub/Sub", "MongoDB", "NLP", "Google Earth Engine"],
      link: "https://github.com/JobayerFaisal/Emergency_Response_System",
      highlight: true,
    },
    {
      title: "Heart2Blood",
      subtitle: "Emergency Blood Donation Platform",
      desc: "A web platform on Oracle APEX connecting blood recipients with nearby donors via blood type and location-based search with real-time notifications.",
      tags: ["Oracle APEX", "SQL", "PL/SQL"],
      link: "https://github.com/JobayerFaisal/Blood_Donation_Apex_Oracle",
      highlight: false,
    },
    {
      title: "Smart Energy Monitor",
      subtitle: "IoT Data Analysis System",
      desc: "A modular Python system integrating Tuya smart power devices to collect real-time energy readings, analyze usage patterns, and estimate electricity billing.",
      tags: ["Python", "Tuya IoT API", "MongoDB", "Data Analysis"],
      link: "https://github.com/JobayerFaisal",
      highlight: false,
    },
    {
      title: "Chat Application",
      subtitle: "Java Networking",
      desc: "A Java-based chat application supporting individual client messaging with snippet features, built on socket programming principles.",
      tags: ["Java", "Sockets", "Networking"],
      link: "https://github.com/JobayerFaisal/ChatApplication_java",
      highlight: false,
    },
  ],
  publications: [
    {
      status: "Published",
      title: "Hybrid Deep Learning Model for Retinal Disease Detection with XAI",
      venue: "IEEE Conference Proceedings, 2025",
      link: "#",
    },
    {
      status: "In Proceeding",
      title: "Federated Learning for MRI Analysis: A Systematic Review of Methods, Privacy Mechanisms, and Clinical Translation",
      venue: "In Proceeding",
    },
    {
      status: "In Proceeding",
      title: "EH-DLF Cross-Attention Fusion of Spatial, Spectral, and Steganalytic Streams for Explainable Deepfake Detection",
      venue: "In Proceeding",
    },
    {
      status: "In Proceeding",
      title: "Text Analytics on YouTube Comments for Food Products",
      venue: "In Proceeding",
    },
  ],
  awards: [
    { title: "Merit Scholarship", org: "East West University", period: "Summer 2025 – 2026" },
    { title: "Dean's List Scholarship", org: "East West University", period: "Summer 2024 – 2025" },
    { title: "Medha Lalon Scholarship", org: "East West University", period: "Summer 2023 – 2024" },
  ],
};

const NAV = ["About", "Skills", "Projects", "Publications", "Awards", "Contact"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ id, children, style }) {
  const [ref, visible] = useInView();
  return (
    <section id={id} ref={ref} style={{
      padding: "5rem 0",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
      ...style,
    }}>{children}</section>
  );
}

function Tag({ label, accent }) {
  return (
    <span style={{
      fontSize: 12, fontWeight: 500, padding: "3px 10px",
      borderRadius: 20, letterSpacing: "0.02em",
      background: accent ? "#fff3e8" : "#f3f0ff",
      color: accent ? "#b85a00" : "#5a3dbf",
      border: `1px solid ${accent ? "#f5c08a" : "#c5b8f0"}`,
    }}>{label}</span>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV.map(n => document.getElementById(n));
      sections.forEach(sec => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 100) setActive(sec.id);
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const styles = {
    root: {
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#fdfaf6",
      color: "#1a1410",
      minHeight: "100vh",
      margin: 0,
    },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(253,250,246,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      borderBottom: scrolled ? "1px solid #e8dfd0" : "none",
      transition: "all 0.3s ease",
      padding: "0 2rem",
    },
    navInner: {
      maxWidth: 960, margin: "0 auto", display: "flex",
      alignItems: "center", justifyContent: "space-between", height: 60,
    },
    navLogo: {
      fontFamily: "'Georgia', serif", fontSize: 16, fontWeight: "bold",
      color: "#7c4a1e", letterSpacing: "0.04em", cursor: "pointer",
    },
    navLinks: { display: "flex", gap: "1.5rem", listStyle: "none", margin: 0, padding: 0 },
    navLink: (isActive) => ({
      fontSize: 14, fontFamily: "'Helvetica Neue', sans-serif",
      color: isActive ? "#7c4a1e" : "#5a4a3a",
      cursor: "pointer", letterSpacing: "0.04em",
      borderBottom: isActive ? "2px solid #c4813a" : "2px solid transparent",
      paddingBottom: 2, transition: "all 0.2s",
      background: "none", border: "none", borderBottom: isActive ? "2px solid #c4813a" : "2px solid transparent",
    }),
    container: { maxWidth: 960, margin: "0 auto", padding: "0 2rem" },
    hero: {
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: "linear-gradient(160deg, #fdf6ee 0%, #f5ebe0 60%, #ede0d0 100%)",
      position: "relative", overflow: "hidden",
    },
    heroAccent: {
      position: "absolute", top: -80, right: -80,
      width: 420, height: 420, borderRadius: "50%",
      background: "radial-gradient(circle, #f5d9b8 0%, transparent 70%)",
      opacity: 0.6,
    },
    heroAccent2: {
      position: "absolute", bottom: -60, left: -60,
      width: 300, height: 300, borderRadius: "50%",
      background: "radial-gradient(circle, #e8c9a0 0%, transparent 70%)",
      opacity: 0.4,
    },
    heroContent: { position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto", padding: "0 2rem" },
    heroEyebrow: {
      fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13,
      letterSpacing: "0.15em", color: "#9c6b38", textTransform: "uppercase",
      marginBottom: "1.2rem",
    },
    heroName: {
      fontFamily: "'Georgia', serif", fontSize: "clamp(2.4rem, 6vw, 4rem)",
      fontWeight: "bold", color: "#1a1410", lineHeight: 1.1,
      marginBottom: "0.6rem",
    },
    heroRole: {
      fontFamily: "'Georgia', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
      color: "#7c4a1e", marginBottom: "1.5rem", fontStyle: "italic",
    },
    heroBio: {
      fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16,
      lineHeight: 1.8, color: "#4a3828", maxWidth: 580, marginBottom: "2.5rem",
    },
    heroBtns: { display: "flex", gap: "1rem", flexWrap: "wrap" },
    btnPrimary: {
      padding: "12px 28px", background: "#7c4a1e", color: "#fff",
      border: "none", borderRadius: 4, cursor: "pointer",
      fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14,
      letterSpacing: "0.06em", transition: "background 0.2s",
    },
    btnOutline: {
      padding: "12px 28px", background: "transparent", color: "#7c4a1e",
      border: "1.5px solid #c4813a", borderRadius: 4, cursor: "pointer",
      fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14,
      letterSpacing: "0.06em", transition: "all 0.2s",
    },
    sectionLabel: {
      fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12,
      letterSpacing: "0.18em", textTransform: "uppercase", color: "#9c6b38",
      marginBottom: "0.5rem",
    },
    sectionTitle: {
      fontFamily: "'Georgia', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
      fontWeight: "bold", color: "#1a1410", marginBottom: "2.5rem",
      paddingBottom: "1rem",
      borderBottom: "2px solid #e8dfd0",
    },
    card: {
      background: "#fff", border: "1px solid #e8dfd0", borderRadius: 8,
      padding: "1.5rem", transition: "box-shadow 0.2s, transform 0.2s",
    },
  };

  return (
    <div style={styles.root}>
      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <span style={styles.navLogo} onClick={() => scrollTo("About")}>JFF</span>
          <ul style={styles.navLinks}>
            {NAV.map(n => (
              <li key={n}>
                <button onClick={() => scrollTo(n)} style={{
                  ...styles.navLink(active === n),
                  background: "none", padding: "4px 0",
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: 14, letterSpacing: "0.04em",
                  cursor: "pointer", color: active === n ? "#7c4a1e" : "#5a4a3a",
                  borderTop: "none", borderLeft: "none", borderRight: "none",
                  borderBottom: active === n ? "2px solid #c4813a" : "2px solid transparent",
                  transition: "all 0.2s",
                }}>{n}</button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <div id="About" style={styles.hero}>
        <div style={styles.heroAccent} />
        <div style={styles.heroAccent2} />
        <div style={styles.heroContent}>
          <p style={styles.heroEyebrow}>Portfolio · Software Engineer</p>
          <h1 style={styles.heroName}>{data.name}</h1>
          <p style={styles.heroRole}>{data.role}</p>
          <p style={styles.heroBio}>{data.bio}</p>
          <div style={styles.heroBtns}>
            <button style={styles.btnPrimary} onClick={() => scrollTo("Projects")}>View Projects</button>
            <button style={styles.btnOutline} onClick={() => scrollTo("Contact")}>Get in Touch</button>
          </div>
          <div style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "CGPA", value: "3.80 / 4.00" },
              { label: "Publications", value: "4 Papers" },
              { label: "Projects", value: "4+ Built" },
              { label: "Scholarships", value: "3 Awards" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'Georgia', serif", fontSize: 22, fontWeight: "bold", color: "#7c4a1e" }}>{s.value}</div>
                <div style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 11, letterSpacing: "0.1em", color: "#9c6b38", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <Section id="Skills" style={{ background: "#fdf8f3" }}>
        <div style={styles.container}>
          <p style={styles.sectionLabel}>Technical Expertise</p>
          <h2 style={styles.sectionTitle}>Skills & Technologies</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.2rem" }}>
            {data.skills.map(s => (
              <div key={s.category} style={{ ...styles.card, borderLeft: "3px solid #c4813a" }}>
                <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9c6b38", marginBottom: "0.8rem", fontWeight: 600 }}>{s.category}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {s.items.map(item => (
                    <span key={item} style={{ fontSize: 13, padding: "4px 10px", background: "#fdf0e0", color: "#7c4a1e", borderRadius: 3, fontFamily: "'Helvetica Neue', sans-serif" }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="Projects">
        <div style={styles.container}>
          <p style={styles.sectionLabel}>What I've Built</p>
          <h2 style={styles.sectionTitle}>Projects</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {data.projects.map((p, i) => (
              <div key={i} style={{
                ...styles.card,
                borderTop: p.highlight ? "3px solid #c4813a" : "1px solid #e8dfd0",
                display: "flex", flexDirection: "column", gap: "0.8rem",
                background: p.highlight ? "#fffaf5" : "#fff",
              }}>
                {p.highlight && (
                  <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c6b38", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600 }}>⭐ Featured</span>
                )}
                <div>
                  <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 17, color: "#1a1410", margin: 0, marginBottom: 4 }}>{p.title}</h3>
                  <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, color: "#9c6b38", margin: 0, letterSpacing: "0.04em" }}>{p.subtitle}</p>
                </div>
                <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, lineHeight: 1.7, color: "#4a3828", margin: 0, flex: 1 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {p.tags.map(t => <Tag key={t} label={t} />)}
                </div>
                <a href={p.link} target="_blank" rel="noreferrer" style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: "#7c4a1e", textDecoration: "none", letterSpacing: "0.04em", marginTop: "auto" }}>
                  View on GitHub →
                </a>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PUBLICATIONS */}
      <Section id="Publications" style={{ background: "#fdf8f3" }}>
        <div style={styles.container}>
          <p style={styles.sectionLabel}>Research Work</p>
          <h2 style={styles.sectionTitle}>Publications</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {data.publications.map((pub, i) => (
              <div key={i} style={{ ...styles.card, display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span style={{
                  minWidth: 90, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", padding: "4px 10px", borderRadius: 3, textAlign: "center",
                  fontFamily: "'Helvetica Neue', sans-serif",
                  background: pub.status === "Published" ? "#e6f4ea" : "#fdf0e0",
                  color: pub.status === "Published" ? "#2d6a4f" : "#9c6b38",
                }}>{pub.status}</span>
                <div>
                  <p style={{ fontFamily: "'Georgia', serif", fontSize: 15, color: "#1a1410", margin: 0, marginBottom: 4, lineHeight: 1.5 }}>
                    {pub.link ? <a href={pub.link} style={{ color: "#1a1410", textDecoration: "none" }}>{pub.title}</a> : pub.title}
                  </p>
                  <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: "#9c6b38", margin: 0, fontStyle: "italic" }}>{pub.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* AWARDS */}
      <Section id="Awards">
        <div style={styles.container}>
          <p style={styles.sectionLabel}>Recognition</p>
          <h2 style={styles.sectionTitle}>Scholarships & Awards</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.2rem" }}>
            {data.awards.map((a, i) => (
              <div key={i} style={{ ...styles.card, textAlign: "center", padding: "2rem 1.5rem" }}>
                <div style={{ fontSize: 28, marginBottom: "0.8rem" }}>🏆</div>
                <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 17, color: "#1a1410", margin: 0, marginBottom: 6 }}>{a.title}</h3>
                <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: "#7c4a1e", margin: 0, marginBottom: 4 }}>{a.org}</p>
                <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, color: "#9c6b38", margin: 0, fontStyle: "italic" }}>{a.period}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="Contact" style={{ background: "#1a1410" }}>
        <div style={{ ...styles.container, textAlign: "center" }}>
          <p style={{ ...styles.sectionLabel, color: "#c4813a" }}>Let's Connect</p>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#fdf8f3", marginBottom: "1rem", fontWeight: "bold" }}>Get in Touch</h2>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, color: "#c4a882", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 2.5rem" }}>
            I'm open to full-time opportunities, research collaborations, and interesting projects. Feel free to reach out!
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
            {[
              { icon: "✉", label: data.email, href: `mailto:${data.email}` },
              { icon: "📞", label: data.phone, href: `tel:${data.phone}` },
              { icon: "🐙", label: "GitHub", href: data.github },
              { icon: "💼", label: "LinkedIn", href: data.linkedin },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "10px 20px", border: "1px solid #4a3828", borderRadius: 4,
                color: "#e8d5b8", textDecoration: "none",
                fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14,
                transition: "all 0.2s", background: "transparent",
              }}>
                <span>{c.icon}</span> {c.label}
              </a>
            ))}
          </div>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: "#6b5040", letterSpacing: "0.04em" }}>
            📍 {data.location} · Bengali (Native) · English (Professional)
          </p>
        </div>
      </Section>

      {/* FOOTER */}
      <div style={{ background: "#0f0d0a", padding: "1.2rem 2rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: "#4a3828", margin: 0 }}>
          © 2026 Jobayer Faisal Fahim · Built with care ♟️
        </p>
      </div>
    </div>
  );
}
