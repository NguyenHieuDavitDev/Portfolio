import { useState, useEffect, useRef, useCallback } from "react";
import { Collapse } from "bootstrap";
import { Link, useLocation } from "react-router-dom";
import { SECTIONS, SKILLS, PROJECTS, SOCIAL_LINKS, CONTACT_EMAIL } from "../data/portfolioData";
import { CERTIFICATES } from "../data/certificates";
import { getProjectMedia } from "../data/projectGallery";
import { Reveal } from "./Reveal";

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="position-fixed top-0 start-0"
      style={{ zIndex: 0, opacity: 0.7, pointerEvents: "none" }}
      aria-hidden
    />
  );
}

function Typewriter({ texts }) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const cur = texts[textIdx];
    if (!deleting && charIdx < cur.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 60);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === cur.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx((c) => c - 1), 35);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }
  }, [charIdx, deleting, textIdx, texts]);
  useEffect(() => {
    setDisplayed(texts[textIdx].slice(0, charIdx));
  }, [charIdx, textIdx, texts]);
  return (
    <span className="text-accent-portfolio">
      {displayed}
      <span
        className="d-inline-block ms-1 typewriter-caret"
        style={{
          width: 2,
          height: "1em",
          background: "#f59e0b",
          verticalAlign: "text-bottom",
        }}
      />
    </span>
  );
}

function SkillBar({ skill, animate }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(skill.level), 200);
      return () => clearTimeout(t);
    }
  }, [animate, skill.level]);
  return (
    <div
      className="rounded-3 p-3 border border-secondary border-opacity-25 portfolio-skill-bar"
      style={{
        background: "rgba(255,255,255,0.03)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = `0 8px 30px ${skill.color}22`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2 small">
        <span className="text-light fw-semibold d-flex align-items-center gap-2">
          <i className={skill.faClass} style={{ color: skill.color }} aria-hidden />
          {skill.name}
        </span>
        <span className="fw-bold" style={{ color: skill.color }}>
          {width}%
        </span>
      </div>
      <div
        className="rounded-pill overflow-hidden"
        style={{ height: 5, background: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-100 rounded-pill"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
            transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
            boxShadow: `0 0 10px ${skill.color}66`,
          }}
        />
      </div>
    </div>
  );
}

function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span
      className="d-inline-block position-relative"
      style={{
        animation: glitch ? "portfolio-glitch 0.15s steps(2) forwards" : "none",
      }}
    >
      {text}
    </span>
  );
}

function Section({ children, id, style = {} }) {
  return (
    <section
      id={id}
      className="portfolio-section min-vh-100 d-flex flex-column justify-content-center py-5"
      style={{
        position: "relative",
        ...style,
      }}
    >
      <div className="container position-relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}

const ABOUT_META = [
  { label: "Location", value: "Da Nang, Vietnam", fa: "fa-solid fa-location-dot" },
  { label: "Education", value: "Computer Science", fa: "fa-solid fa-graduation-cap" },
  { label: "Status", value: "Open to Work", fa: "fa-solid fa-briefcase" },
  { label: "Languages", value: "Vietnamese, English", fa: "fa-solid fa-language" },
];

const ABOUT_FEATURES = [
  {
    fa: "fa-solid fa-sitemap",
    title: "Architecture Design",
    desc: "Thiết kế hệ thống scalable với microservices và event-driven patterns",
  },
  {
    fa: "fa-solid fa-bolt",
    title: "Performance Optimization",
    desc: "Tối ưu query, caching strategies và server-side performance",
  },
  {
    fa: "fa-solid fa-shield-halved",
    title: "Security First",
    desc: "JWT auth, data encryption, SQL injection prevention",
  },
  {
    fa: "fa-solid fa-cloud",
    title: "Cloud & DevOps",
    desc: "AWS services, Docker containerization, CI/CD pipelines",
  },
];

export default function Portfolio() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("Home");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [hoverProject, setHoverProject] = useState(null);

  useEffect(() => {
    const handler = () => {
      SECTIONS.forEach((s) => {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) setActiveSection(s);
        }
      });
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!skillsRef.current) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setSkillsVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const el = document.getElementById("portfolioNavCollapse");
    if (el?.classList.contains("show")) {
      Collapse.getOrCreateInstance(el).hide();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const openContactMailto = useCallback(() => {
    const subject = encodeURIComponent(`Liên hệ portfolio — ${formData.name.trim() || "Khách"}`);
    const body = encodeURIComponent(
      `${formData.message.trim()}\n\n---\nEmail người gửi: ${formData.email.trim() || "(chưa nhập)"}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }, [formData]);

  return (
    <div
      className="portfolio-root min-vh-100 overflow-x-hidden position-relative"
      style={{
        fontFamily: "var(--sans)",
        background:
          "radial-gradient(1200px 700px at 15% 10%, rgba(251,146,60,0.26), transparent 55%), radial-gradient(900px 600px at 85% 20%, rgba(245,158,11,0.22), transparent 60%), radial-gradient(1000px 700px at 50% 95%, rgba(236,72,153,0.10), transparent 55%), linear-gradient(180deg, #fff7ed 0%, #fffbeb 55%, #fff7ed 100%)",
      }}
    >
      <style>{`
        .portfolio-root * { box-sizing: border-box; }
        .portfolio-root { color: #111827; }
        .portfolio-root .text-secondary { color: rgba(75,85,99,0.95) !important; }
        .portfolio-root .text-light { color: #111827 !important; }
        .portfolio-root .btn-outline-secondary { border-color: rgba(17,24,39,0.22) !important; }
        .portfolio-root .border-secondary { border-color: rgba(17,24,39,0.16) !important; }
        .portfolio-root .border-secondary.border-opacity-25 { border-color: rgba(17,24,39,0.14) !important; }
        .portfolio-root .bg-dark { background-color: rgba(255,255,255,0.55) !important; }
        .portfolio-root .bg-dark.bg-opacity-40 { background-color: rgba(255,255,255,0.62) !important; }
        .portfolio-root .bg-dark.bg-opacity-50 { background-color: rgba(255,255,255,0.70) !important; }
        .portfolio-root .navbar { border-color: rgba(17,24,39,0.12) !important; }
        .portfolio-root ::-webkit-scrollbar { width: 4px; }
        .portfolio-root ::-webkit-scrollbar-track { background: rgba(255,255,255,0.4); }
        .portfolio-root ::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 2px; }
        @keyframes portfolio-blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        .typewriter-caret { animation: portfolio-blink 1s step-end infinite; }
        @keyframes portfolio-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes portfolio-glitch {
          0% { clip-path: polygon(0 10%, 100% 10%, 100% 40%, 0 40%); transform: translate(-2px); }
          33% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translate(2px); }
          66% { clip-path: polygon(0 30%, 100% 30%, 100% 55%, 0 55%); transform: translate(-1px); }
          100% { clip-path: none; transform: translate(0); }
        }
        @keyframes portfolio-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes portfolio-fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .text-accent-portfolio { color: #f59e0b; }
        .portfolio-glass {
          background: rgba(255,255,255,0.62);
          border: 1px solid rgba(17,24,39,0.10);
          box-shadow: 0 18px 50px rgba(17,24,39,0.10);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .portfolio-glass-soft {
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(17,24,39,0.10);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .portfolio-nav .nav-btn-portfolio.active {
          background: rgba(245,158,11,0.15) !important;
          border-color: rgba(245,158,11,0.42) !important;
          color: #f59e0b !important;
        }
        .portfolio-nav .nav-btn-portfolio:hover { color: #f59e0b !important; }
        .portfolio-project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.35);
        }
        .portfolio-project-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .portfolio-project-card:focus-visible {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
        }
        .portfolio-project-tag {
          transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
        }
        .portfolio-project-tag:hover {
          transform: translateY(-1px);
          filter: brightness(1.08);
        }
        .portfolio-project-tag:focus-visible {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
        }
        .portfolio-project-more:focus-visible {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
          border-radius: 4px;
        }
        .portfolio-hero-title {
          background: linear-gradient(135deg, #f59e0b 0%, #fb923c 55%, #fbbf24 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: portfolio-shimmer 3s linear infinite;
        }
        .portfolio-brand-gradient {
          background: linear-gradient(135deg, #f59e0b, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .certificates-marquee-breakout {
          width: 100vw;
          max-width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
        }
        .certificates-marquee-viewport {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
        }
        @keyframes certificates-marquee-rtl {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .certificates-marquee-track {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          gap: 1.25rem;
          width: max-content;
          padding: 0.35rem 0 0.75rem;
          animation: certificates-marquee-rtl 50s linear infinite;
          will-change: transform;
        }
        .certificates-marquee-track:hover {
          animation-play-state: paused;
        }
        .certificates-marquee-item {
          width: min(300px, 82vw);
          flex-shrink: 0;
        }
        .cert-frame {
          min-height: 200px;
          background: rgba(255,255,255,0.96);
        }
        .cert-frame--microsoft {
          background: radial-gradient(120% 90% at 30% 15%, rgba(96,165,250,0.25), rgba(255,255,255,0.96) 55%);
        }
        .cert-frame--school {
          background: radial-gradient(140% 110% at 35% 20%, rgba(34,197,94,0.10), rgba(255,255,255,0.96) 55%);
        }
        .cert-frame--fpt {
          background: radial-gradient(120% 95% at 30% 15%, rgba(249,115,22,0.30), rgba(255,255,255,0.96) 55%);
        }
        @media (prefers-reduced-motion: reduce) {
          .certificates-marquee-viewport {
            overflow-x: auto;
            -webkit-mask-image: none;
            mask-image: none;
            padding-bottom: 0.5rem;
            scroll-snap-type: x mandatory;
          }
          .certificates-marquee-track {
            animation: none;
            width: max-content;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .certificates-marquee-item {
            scroll-snap-align: center;
          }
        }
      `}</style>

      <Particles />

      <div
        className="position-fixed"
        style={{
          top: "10%",
          left: "5%",
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
        aria-hidden
      />
      <div
        className="position-fixed"
        style={{
          bottom: "15%",
          right: "5%",
          width: 440,
          height: 440,
          background: "radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 72%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
        aria-hidden
      />

      <nav
        className="navbar navbar-expand-lg navbar-light portfolio-nav fixed-top border-bottom border-secondary border-opacity-25"
        style={{
          background: "rgba(255, 247, 237, 0.70)",
          backdropFilter: "blur(20px)",
          zIndex: 1000,
        }}
      >
        <div className="container-fluid px-4 px-lg-5">
          <Link
            to="/"
            className="navbar-brand fw-bold mb-0 text-decoration-none"
            style={{ fontFamily: "var(--mono)", fontSize: "1.05rem" }}
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                scrollTo("Home");
              }
            }}
          >
            <span className="portfolio-brand-gradient">&lt;MinhHieu /&gt;</span>
          </Link>
          <button
            className="navbar-toggler border-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#portfolioNavCollapse"
            aria-controls="portfolioNavCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="portfolioNavCollapse">
            <div className="navbar-nav ms-auto flex-wrap gap-1 py-2 py-lg-0">
              {SECTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`btn btn-sm nav-btn-portfolio border ${activeSection === s ? "active" : "border-transparent text-secondary"}`}
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    letterSpacing: "0.05em",
                  }}
                  onClick={() => scrollTo(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div
        className="position-relative portfolio-main-surface"
        style={{ paddingTop: "4.5rem", zIndex: 2 }}
      >
        <Section id="Home" style={{ minHeight: "100vh", justifyContent: "center" }}>
          <div className="row align-items-center">
            <div className="col-lg-8">
              <Reveal delay={90} rootMargin="0px 0px 0px 0px" threshold={0.05}>
                <h1 className="display-2 fw-bold lh-1 mb-3" style={{ fontFamily: "var(--heading)" }}>
                  <GlitchText text="Nguyen Ngoc" />
                  <br />
                  <span className="portfolio-hero-title">Minh Hieu</span>
                </h1>
              </Reveal>
              <Reveal delay={180} rootMargin="0px 0px 0px 0px" threshold={0.05}>
                <div className="fs-4 text-secondary mb-4 fw-normal" style={{ fontFamily: "var(--mono)" }}>
                  <Typewriter
                    texts={[
                      "Backend Developer",
                      "Node.js Engineer",
                      "API Architect",
                      "Database Designer",
                      "System Builder",
                    ]}
                  />
                </div>
              </Reveal>
              <Reveal delay={260} rootMargin="0px 0px 0px 0px" threshold={0.05}>
                <p className="text-secondary mb-4 lh-lg" style={{ maxWidth: 520 }}>
                  Xây dựng các hệ thống backend scalable, performant và secure. Đam mê kiến trúc phần mềm và tối ưu hiệu năng.
                </p>
              </Reveal>
              <Reveal delay={340} rootMargin="0px 0px 0px 0px" threshold={0.05}>
                <div className="d-flex flex-wrap gap-3 mb-5">
                  <button
                    type="button"
                    className="btn btn-lg text-white border-0 px-4"
                    style={{
                      background: "linear-gradient(135deg, #f59e0b, #fb923c)",
                      boxShadow: "0 4px 20px rgba(245,158,11,0.28)",
                      fontFamily: "var(--mono)",
                      letterSpacing: "0.05em",
                    }}
                    onClick={() => scrollTo("Projects")}
                  >
                    View Projects
                    <i className="fa-solid fa-arrow-right ms-2" aria-hidden />
                  </button>
                  <button
                    type="button"
                    className="btn btn-lg btn-outline-secondary border-opacity-50 text-accent-portfolio"
                    style={{ fontFamily: "var(--mono)", letterSpacing: "0.05em" }}
                    onClick={() => scrollTo("Contact")}
                  >
                    Contact Me
                  </button>
                </div>
              </Reveal>
              <Reveal delay={420} rootMargin="0px 0px 0px 0px" threshold={0.05}>
                <div className="d-flex flex-wrap gap-5">
                  {[
                    ["2+", "Years Exp"],
                    ["15+", "Projects"],
                    ["10+", "Technologies"],
                  ].map(([num, label]) => (
                    <div key={label}>
                      <div
                        className="fs-2 fw-bold portfolio-brand-gradient"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {num}
                      </div>
                      <div className="small text-secondary text-uppercase" style={{ letterSpacing: "0.1em" }}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="col-lg-4 d-none d-lg-block">
              <Reveal delay={200} variant="slide-left" rootMargin="0px 0px 0px 0px" threshold={0.05}>
                <pre
                  className="small text-opacity-25 border-0 mb-0 user-select-none"
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    color: "rgba(139,92,246,0.35)",
                    lineHeight: 2,
                    animation: "portfolio-float 4s ease-in-out infinite",
                  }}
                >
                  {`const dev = {
  name: "Minh Hieu",
  role: "Backend Dev",
  stack: ["Node", "PG", "Redis"],
  coffee: Infinity
}`}
                </pre>
              </Reveal>
            </div>
          </div>
        </Section>

        <Section id="About">
          <Reveal delay={80}>
            <h2 className="display-5 fw-bold mb-5" style={{ fontFamily: "var(--heading)" }}>
              About{" "}
              <span className="portfolio-brand-gradient">Me</span>
            </h2>
          </Reveal>
          <div className="row g-5">
            <div className="col-lg-6">
              <Reveal delay={120}>
                <p className="text-secondary lh-lg mb-4">
                  Tôi là <span className="text-accent-portfolio">Backend Developer</span> đam mê xây dựng các hệ thống hiệu năng cao. Với kinh nghiệm trong Node.js ecosystem, tôi chuyên thiết kế RESTful APIs, microservices architecture và database optimization.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-secondary lh-lg mb-4">
                  Luôn tìm kiếm các giải pháp sáng tạo cho các vấn đề phức tạp, từ{" "}
                  <span style={{ color: "#fbbf24" }}>real-time systems</span> đến{" "}
                  <span style={{ color: "#fb923c" }}>scalable cloud architectures</span>.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <ul className="list-unstyled d-flex flex-column gap-3 small">
                  {ABOUT_META.map(({ label, value, fa }) => (
                    <li key={label} className="d-flex gap-3 align-items-start">
                      <i className={`${fa} text-secondary mt-1`} style={{ width: 20 }} aria-hidden />
                      <span className="text-secondary" style={{ minWidth: 100 }}>
                        {label}:
                      </span>
                      <span className="text-light">{value}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="col-lg-6 d-flex flex-column gap-3">
              {ABOUT_FEATURES.map((item, i) => (
                <Reveal key={item.title} delay={100 + i * 90} variant="zoom">
                  <div
                    className="rounded-3 p-3 border border-secondary border-opacity-25 d-flex gap-3"
                    style={{ background: "rgba(255,255,255,0.02)", transition: "all 0.2s" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
                      e.currentTarget.style.background = "rgba(139,92,246,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    <i className={`${item.fa} fs-4 text-accent-portfolio flex-shrink-0`} aria-hidden />
                    <div>
                      <div className="fw-semibold text-light mb-1" style={{ fontFamily: "var(--heading)" }}>
                        {item.title}
                      </div>
                      <div className="small text-secondary lh-base">{item.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        <Section id="Skills">
          <div ref={skillsRef}>
            <Reveal delay={70}>
              <h2 className="display-5 fw-bold mb-5" style={{ fontFamily: "var(--heading)" }}>
                Tech <span className="portfolio-brand-gradient">Stack</span>
              </h2>
            </Reveal>
            <div className="row g-3">
              {SKILLS.map((skill, i) => (
                <div key={skill.name} className="col-12 col-xl-6">
                  <Reveal delay={80 + i * 55}>
                    <SkillBar skill={skill} animate={skillsVisible} />
                  </Reveal>
                </div>
              ))}
            </div>
            <Reveal delay={120}>
              <div className="d-flex flex-wrap gap-2 mt-5">
                {["Git", "Linux", "Nginx", "Jest", "Swagger", "Postman", "VS Code", "GitHub Actions"].map((tech) => (
                  <span
                    key={tech}
                    className="badge rounded-pill px-3 py-2 fw-normal border border-secondary border-opacity-50 text-secondary"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      fontFamily: "'Fira Code', monospace",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.classList.remove("text-secondary");
                      e.currentTarget.classList.add("text-accent-portfolio");
                      e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.classList.add("text-secondary");
                      e.currentTarget.classList.remove("text-accent-portfolio");
                      e.currentTarget.style.borderColor = "";
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        <Section id="Certificates" style={{ minHeight: "auto" }}>
          <Reveal delay={70}>
            <h2 className="display-5 fw-bold mb-3" style={{ fontFamily: "var(--heading)" }}>
              <span className="portfolio-brand-gradient">Chứng chỉ</span>
            </h2>
          </Reveal>
          <Reveal delay={200} variant="fade">
            <div className="certificates-marquee-breakout certificates-marquee-viewport" aria-label="Danh sách chứng chỉ trượt ngang">
            <div className="certificates-marquee-track">
              {[...CERTIFICATES, ...CERTIFICATES].map((c, i) => {
                const inferredKind = String(c.issuer || "").toLowerCase().includes("fpt")
                  ? "fpt"
                  : "microsoft";
                const kind = c.issuerKind ?? inferredKind;
                const frameClass =
                  kind === "school"
                    ? "cert-frame--school"
                    : kind === "fpt"
                      ? "cert-frame--fpt"
                      : "cert-frame--microsoft";
                return (
                <div key={`${c.id}-${i}`} className="certificates-marquee-item">
                  <figure className="card h-100 overflow-hidden mb-0 shadow-sm portfolio-glass-soft">
                    <div
                      className={`d-flex align-items-center justify-content-center p-2 p-sm-3 cert-frame ${frameClass}`}
                    >
                      <img
                        src={c.image}
                        alt={c.alt}
                        className="img-fluid object-fit-contain w-100 rounded-1"
                        style={{ maxHeight: 260 }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption className="card-body py-3">
                      <h3
                        className="h6 text-light fw-semibold mb-2 lh-sm"
                        style={{ fontFamily: "var(--heading)" }}
                      >
                        {c.title}
                      </h3>
                      <p className="small text-secondary mb-0 d-flex align-items-center gap-1 flex-wrap">
                        {c.issuerKind === "school" ? (
                          <i className="fa-solid fa-graduation-cap text-success" aria-hidden />
                        ) : (
                          <i className="fa-brands fa-microsoft text-info" aria-hidden />
                        )}
                        <span>
                          {c.issuer} · {c.date}
                        </span>
                      </p>
                    </figcaption>
                  </figure>
                </div>
                );
              })}
            </div>
            </div>
          </Reveal>
        </Section>

        <Section id="Projects">
          <Reveal delay={0}>
            <p className="small text-accent-portfolio text-uppercase mb-2" style={{ letterSpacing: "0.2em" }}>
              // projects.list
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-5 fw-bold mb-5" style={{ fontFamily: "var(--heading)" }}>
              Featured <span className="portfolio-brand-gradient">Projects</span>
            </h2>
          </Reveal>
          <div className="row row-cols-1 row-cols-lg-2 g-4">
            {PROJECTS.map((project, i) => {
              const cardMedia = getProjectMedia(project.slug);
              const projectPath = `/projects/${project.slug}`;
              return (
                <div key={project.slug} className="col">
                  <Reveal delay={100 + i * 110} variant="zoom">
                  <article
                    className={`card h-100 border portfolio-project-card overflow-hidden ${
                      hoverProject === i ? "" : "border-secondary border-opacity-25"
                    }`}
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      transition: "all 0.3s",
                      borderColor: hoverProject === i ? `${project.color}44` : undefined,
                      boxShadow: hoverProject === i ? `0 20px 60px ${project.color}15` : undefined,
                    }}
                    onMouseEnter={() => setHoverProject(i)}
                    onMouseLeave={() => setHoverProject(null)}
                  >
                    <Link
                      to={projectPath}
                      className="text-decoration-none text-reset d-block"
                    >
                      {cardMedia?.cover ? (
                        <div className="ratio ratio-16x9 border-bottom border-secondary border-opacity-25 bg-dark">
                          <img
                            src={cardMedia.cover}
                            alt=""
                            className="w-100 h-100 object-fit-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ) : null}
                      <div className="card-body pb-0">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <span
                            className="d-inline-flex align-items-center justify-content-center rounded-3"
                            style={{
                              width: 48,
                              height: 48,
                              background: `${project.color}22`,
                              color: project.color,
                              fontSize: "1.25rem",
                            }}
                          >
                            <i className={project.faIcon} aria-hidden />
                          </span>
                          <span
                            className="badge rounded-pill small"
                            style={{
                              color: project.color,
                              border: `1px solid ${project.color}44`,
                              background: "transparent",
                              fontFamily: "'Fira Code', monospace",
                            }}
                          >
                            {project.period ?? project.year}
                          </span>
                        </div>
                        <h3 className="h5 fw-bold text-light mb-2" style={{ fontFamily: "var(--heading)" }}>
                          {project.title}
                        </h3>
                        <p className="small text-secondary lh-lg mb-0" style={{ fontFamily: "'Fira Code', monospace" }}>
                          {project.desc}
                        </p>
                      </div>
                    </Link>
                    <div className="card-body pt-3 d-flex flex-wrap align-items-center gap-2 border-top border-secondary border-opacity-10">
                      {project.tags.map((tag) => (
                        <Link
                          key={tag}
                          to={projectPath}
                          className="badge rounded px-2 py-1 small text-decoration-none portfolio-project-tag"
                          style={{
                            fontFamily: "'Fira Code', monospace",
                            background: `${project.color}15`,
                            color: project.color,
                            border: `1px solid ${project.color}30`,
                          }}
                          title={`${project.title} — ${tag}`}
                        >
                          {tag}
                        </Link>
                      ))}
                      <Link
                        to={projectPath}
                        className="ms-auto small text-accent-portfolio d-inline-flex align-items-center gap-1 text-decoration-none portfolio-project-more"
                      >
                        Chi tiết
                        <i className="fa-solid fa-arrow-right-long" aria-hidden />
                      </Link>
                    </div>
                    <div
                      className="mt-auto"
                      style={{
                        height: 2,
                        background: `linear-gradient(90deg, ${project.color}00, ${project.color}, ${project.color}00)`,
                        opacity: hoverProject === i ? 1 : 0,
                        transition: "opacity 0.3s",
                      }}
                    />
                  </article>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </Section>

        <Section id="Contact">
          <Reveal delay={0}>
            <p className="small text-accent-portfolio text-uppercase mb-2" style={{ letterSpacing: "0.2em" }}>
              // contact.send()
            </p>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="display-5 fw-bold mb-3" style={{ fontFamily: "var(--heading)" }}>
              Get In <span className="portfolio-brand-gradient">Touch</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-secondary mb-4 lh-lg" style={{ maxWidth: 560 }}>
              Sẵn sàng cho các dự án mới và cơ hội hợp tác thú vị. Hãy liên hệ với tôi!
            </p>
          </Reveal>

          {formSent ? (
            <Reveal delay={0} variant="zoom">
              <div
                className="rounded-3 border p-4 p-md-5 text-center"
                style={{
                  borderColor: "rgba(104,211,145,0.3)",
                  background: "rgba(104,211,145,0.05)",
                }}
              >
                <i className="fa-solid fa-circle-check display-4 text-success mb-3 d-block" aria-hidden />
                <div className="fs-5 fw-bold text-success" style={{ fontFamily: "var(--heading)" }}>
                  Message Sent!
                </div>
                <p className="text-secondary small mb-0 mt-2">Tôi sẽ phản hồi trong thời gian sớm nhất.</p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={200}>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" style={{ maxWidth: 640 }}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="pf-name" className="form-label small text-secondary">
                    Name
                  </label>
                  <input
                    id="pf-name"
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="pf-email" className="form-label small text-secondary">
                    Email
                  </label>
                  <input
                    id="pf-email"
                    type="email"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pf-msg" className="form-label small text-secondary">
                  Message
                </label>
                <textarea
                  id="pf-msg"
                  className="form-control bg-dark text-light border-secondary"
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <div className="d-flex flex-wrap align-items-center gap-3">
                <button
                  type="submit"
                  className="btn btn-lg text-white border-0"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #fb923c)",
                    boxShadow: "0 4px 20px rgba(245,158,11,0.28)",
                    fontFamily: "'Fira Code', monospace",
                  }}
                >
                  Send Message
                  <i className="fa-solid fa-arrow-right ms-2" aria-hidden />
                </button>
                <button
                  type="button"
                  className="btn btn-lg btn-outline-secondary d-inline-flex align-items-center gap-2"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                  onClick={openContactMailto}
                >
                  <i className="fa-solid fa-envelope-open-text" aria-hidden />
                  Mở ứng dụng email
                </button>
              </div>
            </form>
            </Reveal>
          )}

          <Reveal delay={280}>
          <div className="d-flex flex-wrap gap-2 mt-5">
            {SOCIAL_LINKS.map(({ label, url, fa }) => (
              <a
                key={label}
                href={url}
                {...(url.startsWith("mailto:")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="btn btn-outline-secondary d-inline-flex align-items-center gap-2"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                <i className={fa} aria-hidden />
                {label}
              </a>
            ))}
          </div>
          </Reveal>
        </Section>

        <footer className="text-center py-4 border-top border-secondary border-opacity-25 small text-secondary">
          <div className="container">
            <Reveal delay={0} rootMargin="0px 0px 0px 0px" threshold={0}>
              <span>
                © 2024 Nguyen Minh Hieu · Built with <span className="text-accent-portfolio">React</span> ·{" "}
                <span style={{ color: "#fbbf24" }}>Da Nang, Vietnam</span>
              </span>
            </Reveal>
          </div>
        </footer>
      </div>
    </div>
  );
}
