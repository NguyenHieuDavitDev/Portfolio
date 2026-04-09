import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PROJECTS } from "../data/portfolioData";
import { getProjectMedia } from "../data/projectGallery";
import { Reveal } from "./Reveal";

function DetailListBlock({ title, iconClass, items, color }) {
  if (!items?.length) return null;
  return (
    <section className="card border-secondary border-opacity-25 bg-dark bg-opacity-40 h-100">
      <div className="card-body p-4 p-lg-5">
        <h2 className="h5 fw-semibold text-dark mb-3 d-flex align-items-center gap-2">
          <i className={iconClass} style={{ color: "#f59e0b" }} aria-hidden />
          {title}
        </h2>
        <ul className="list-unstyled mb-0">
          {items.map((item) => (
            <li key={item} className="d-flex gap-3 mb-3 text-secondary">
              <i className="fa-solid fa-angle-right mt-1 flex-shrink-0" style={{ color }} aria-hidden />
              <span className="lh-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = useMemo(
    () => PROJECTS.find((p) => p.slug === slug),
    [slug]
  );

  if (!project) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-dark text-light px-3">
        <p className="text-secondary mb-4">Không tìm thấy dự án.</p>
        <Link to="/" className="btn btn-primary">
          Về trang chủ
        </Link>
      </div>
    );
  }

  const { detail } = project;
  const periodLabel = detail.period ?? project.period ?? project.year;
  const githubUrl = detail.github ?? (project.link?.startsWith("http") ? project.link : null);
  const media = getProjectMedia(project.slug);
  const gallery = media?.gallery ?? [];
  const allStockShots = gallery.length > 0 && gallery.every((g) => g.stock);
  const allScreenshots = gallery.length > 0 && gallery.every((g) => !g.stock);
  const overviewParts =
    detail.overviewParagraphs ??
    (detail.overview ? [detail.overview] : []);

  return (
    <div
      className="d-flex flex-column min-vh-100 portfolio-project-page overflow-x-hidden"
      style={{
        fontFamily: "var(--sans)",
        background:
          "radial-gradient(1200px 700px at 15% 10%, rgba(251,146,60,0.26), transparent 55%), radial-gradient(900px 600px at 85% 20%, rgba(245,158,11,0.22), transparent 60%), radial-gradient(1000px 700px at 50% 95%, rgba(236,72,153,0.10), transparent 55%), linear-gradient(180deg, #fff7ed 0%, #fffbeb 55%, #fff7ed 100%)",
        minHeight: "100dvh",
      }}
    >
      <div
        className="position-fixed top-0 start-0 end-0 bottom-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(99,179,237,0.08), transparent)",
          zIndex: 0,
          pointerEvents: "none",
        }}
        aria-hidden
      />

      <style>{`
        .portfolio-project-page { color: #111827; }
        .portfolio-project-page .text-secondary { color: rgba(75,85,99,0.95) !important; }
        .portfolio-project-page .text-light { color: #111827 !important; }
        .portfolio-project-page .text-dark { color: #111827 !important; }
        .portfolio-project-page .navbar .btn-link { color: rgba(75,85,99,0.95) !important; }
        .portfolio-project-page .navbar .btn-link:hover { color: #f59e0b !important; }
        .portfolio-project-page .bg-dark { background-color: rgba(255,255,255,0.55) !important; }
        .portfolio-project-page .bg-dark.bg-opacity-40 { background-color: rgba(255,255,255,0.62) !important; }
        .portfolio-project-page .bg-dark.bg-opacity-50 { background-color: rgba(255,255,255,0.70) !important; }
        .portfolio-project-page .border-secondary { border-color: rgba(17,24,39,0.16) !important; }
        .portfolio-project-page .border-secondary.border-opacity-25 { border-color: rgba(17,24,39,0.14) !important; }
      `}</style>

      <nav
        className="navbar navbar-light border-bottom border-secondary border-opacity-25 sticky-top px-3 px-lg-5 py-3 position-relative"
        style={{
          background: "rgba(255, 247, 237, 0.78)",
          backdropFilter: "blur(16px)",
          zIndex: 10,
        }}
      >
        <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="d-flex flex-wrap align-items-center gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm border-opacity-50 d-inline-flex align-items-center gap-2"
              onClick={() => navigate(-1)}
              aria-label="Quay lại trang trước"
            >
              <i className="fa-solid fa-arrow-left" aria-hidden />
              Quay lại
            </button>
            <Link
              to="/#Projects"
              className="btn btn-sm btn-outline-secondary border-opacity-50 d-inline-flex align-items-center gap-2"
            >
              <i className="fa-solid fa-layer-group" aria-hidden />
              Dự án
            </Link>
          </div>
          <Link
            to="/"
            className="btn btn-sm btn-link text-decoration-none d-inline-flex align-items-center gap-2"
          >
            <i className="fa-solid fa-house" aria-hidden />
            Portfolio
          </Link>
        </div>
      </nav>

      <main className="flex-grow-1 position-relative d-flex flex-column" style={{ zIndex: 2 }}>
        <header className="w-100 px-3 px-lg-5 pt-4 pt-lg-5 pb-3 border-bottom border-secondary border-opacity-25">
          <div className="container-fluid px-lg-4" style={{ maxWidth: 1200 }}>
            <Reveal delay={0} rootMargin="0px 0px 0px 0px" threshold={0.05}>
              <div className="d-flex flex-column flex-lg-row align-items-lg-start gap-4">
                <div
                  className="rounded-4 d-flex align-items-center justify-content-center flex-shrink-0 mx-auto mx-lg-0"
                  style={{
                    width: 88,
                    height: 88,
                    background: `${project.color}28`,
                    color: project.color,
                    fontSize: "2.25rem",
                    boxShadow: `0 0 40px ${project.color}22`,
                  }}
                >
                  <i className={project.faIcon} aria-hidden />
                </div>
                <div className="flex-grow-1 text-center text-lg-start">
                  <p className="small text-uppercase mb-2 opacity-75" style={{ color: "#f59e0b", letterSpacing: "0.12em" }}>
                    <i className="fa-solid fa-rocket me-2" aria-hidden />
                    Project
                  </p>
                  <h1
                    className="display-5 fw-bold mb-2 lh-sm"
                    style={{ fontFamily: "var(--heading)" }}
                  >
                    {project.title}
                  </h1>
                  {project.titleEn ? (
                    <p className="fs-5 text-secondary mb-0" style={{ fontFamily: "var(--heading)" }}>
                      {project.titleEn}
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>

            {media?.cover ? (
              <Reveal delay={100} variant="fade" rootMargin="0px 0px 0px 0px" threshold={0.05}>
                <div className="mt-4 mt-lg-4 rounded-4 overflow-hidden border border-secondary border-opacity-25">
                  <div className="ratio ratio-21x9 bg-dark d-none d-md-block">
                    <img
                      src={media.cover}
                      alt={`Ảnh đại diện — ${project.title}`}
                      className="w-100 h-100 object-fit-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className="ratio ratio-16x9 bg-dark d-md-none">
                    <img
                      src={media.cover}
                      alt={`Ảnh đại diện — ${project.title}`}
                      className="w-100 h-100 object-fit-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={media?.cover ? 180 : 100}>
            <div className="row g-3 g-lg-4 mt-3 mt-lg-4">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-secondary border-opacity-25 bg-dark bg-opacity-50">
                  <div className="card-body">
                    <div className="small text-secondary text-uppercase mb-1 d-flex align-items-center gap-2">
                      <i className="fa-solid fa-calendar-days" aria-hidden />
                      Thời gian
                    </div>
                    <div className="fw-semibold text-light">{periodLabel}</div>
                  </div>
                </div>
              </div>
              {detail.role ? (
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 border-secondary border-opacity-25 bg-dark bg-opacity-50">
                    <div className="card-body">
                      <div className="small text-secondary text-uppercase mb-1 d-flex align-items-center gap-2">
                        <i className="fa-solid fa-bullseye" aria-hidden />
                        Vị trí
                      </div>
                      <div className="fw-semibold text-light">{detail.role}</div>
                    </div>
                  </div>
                </div>
              ) : null}
              {githubUrl ? (
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 border-secondary border-opacity-25 bg-dark bg-opacity-50">
                    <div className="card-body">
                      <div className="small text-secondary text-uppercase mb-1 d-flex align-items-center gap-2">
                        <i className="fa-solid fa-link" aria-hidden />
                        Mã nguồn
                      </div>
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fw-semibold text-break d-inline-flex align-items-center gap-2"
                        style={{ color: "#f59e0b" }}
                      >
                        <i className="fa-brands fa-github" aria-hidden />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            </Reveal>
          </div>
        </header>

        <div className="flex-grow-1 px-3 px-lg-5 py-4 py-lg-5">
          <div className="container-fluid px-lg-4 pb-5" style={{ maxWidth: 1200 }}>
            <div className="row g-4">
              <div className="col-lg-7">
                <Reveal delay={0}>
                <section className="card border-secondary border-opacity-25 bg-dark bg-opacity-40 h-100">
                  <div className="card-body p-4 p-lg-5">
                    <h2 className="h5 fw-semibold text-dark mb-3 d-flex align-items-center gap-2">
                      <i className="fa-solid fa-file-lines" style={{ color: "#f59e0b" }} aria-hidden />
                      Mô tả
                    </h2>
                    {overviewParts.map((para, idx) => (
                      <p
                        key={idx}
                        className={`text-secondary lh-lg ${
                          idx === overviewParts.length - 1 && !detail.scopeHighlights?.length ? "mb-0" : "mb-3"
                        }`}
                      >
                        {para}
                      </p>
                    ))}
                    {detail.scopeHighlights?.length ? (
                      <>
                        <h3 className="h6 fw-semibold text-dark mt-4 mb-3">Phạm vi &amp; giá trị</h3>
                        <ul className="list-unstyled mb-0">
                          {detail.scopeHighlights.map((item) => (
                            <li key={item} className="d-flex gap-2 mb-2 text-secondary small">
                              <i className="fa-solid fa-check mt-1 flex-shrink-0" style={{ color: project.color }} aria-hidden />
                              <span className="lh-lg">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </div>
                </section>
                </Reveal>
              </div>
              <div className="col-lg-5">
                <Reveal delay={100} variant="slide-left">
                <section className="card border-secondary border-opacity-25 bg-dark bg-opacity-40 h-100">
                  <div className="card-body p-4 p-lg-5">
                    <h2 className="h5 fw-semibold text-dark mb-3 d-flex align-items-center gap-2">
                      <i className="fa-solid fa-screwdriver-wrench" style={{ color: "#f59e0b" }} aria-hidden />
                      Công nghệ sử dụng
                    </h2>
                    <div className="d-flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Link
                          key={tag}
                          to="/#Skills"
                          className="badge px-3 py-2 rounded-pill text-decoration-none"
                          style={{
                            background: `${project.color}20`,
                            color: project.color,
                            border: `1px solid ${project.color}44`,
                            fontWeight: 500,
                            fontSize: "0.85rem",
                            transition: "filter 0.15s ease, transform 0.15s ease",
                          }}
                          title="Xem mục kỹ năng trên trang chủ"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
                </Reveal>
              </div>
            </div>

            {media?.gallery?.length ? (
              <section className="mt-4 mt-lg-5 pt-lg-2">
                <Reveal delay={0}>
                  <h2 className="h5 fw-semibold text-dark mb-3 mb-lg-4 d-flex align-items-center gap-2">
                    <i className="fa-solid fa-images" style={{ color: "#f59e0b" }} aria-hidden />
                    Hình ảnh dự án
                  </h2>
                </Reveal>
                <div className="row g-3 g-lg-4">
                  {media.gallery.map((item, idx) => (
                    <div key={`${item.src}-${idx}`} className="col-12 col-md-6 col-lg-4">
                      <Reveal delay={80 + idx * 95} variant="zoom">
                      <figure className="mb-0 h-100 card border-secondary border-opacity-25 bg-dark bg-opacity-40 overflow-hidden">
                        <div className="ratio ratio-16x9 bg-black">
                          <img
                            src={item.src}
                            alt={item.alt}
                            className="w-100 h-100 object-fit-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        {item.caption ? (
                          <figcaption className="card-body py-2 px-3 small text-secondary mb-0 lh-sm">
                            {item.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                      </Reveal>
                    </div>
                  ))}
                </div>
                {allStockShots ? (
                  <p className="small text-secondary mt-3 mb-0 opacity-75">
                    <i className="fa-solid fa-circle-info me-1" aria-hidden />
                    Ảnh minh họa chủ đề dự án từ{" "}
                    <a
                      href="https://unsplash.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-dark link-underline-opacity-50"
                    >
                      Unsplash
                    </a>{" "}
                    (giấy phép Unsplash).
                  </p>
                ) : allScreenshots ? (
                  <p className="small text-secondary mt-3 mb-0 opacity-75">
                    <i className="fa-solid fa-circle-info me-1" aria-hidden />
                    Ảnh chụp màn hình từ giao diện hệ thống thật.
                  </p>
                ) : null}
              </section>
            ) : null}

            <div className="row g-4 mt-1">
              {detail.highlights?.length ? (
                <div className="col-lg-6">
                  <Reveal delay={0}>
                  <section className="card border-secondary border-opacity-25 bg-dark bg-opacity-40 h-100">
                    <div className="card-body p-4 p-lg-5">
                      <h2 className="h5 fw-semibold text-dark mb-3 d-flex align-items-center gap-2">
                      <i className="fa-solid fa-star" style={{ color: "#f59e0b" }} aria-hidden />
                        Điểm nổi bật
                      </h2>
                      <ul className="list-unstyled mb-0">
                        {detail.highlights.map((item) => (
                          <li key={item} className="d-flex gap-3 mb-3 text-secondary">
                            <i
                              className="fa-solid fa-check mt-1 flex-shrink-0"
                              style={{ color: project.color }}
                              aria-hidden
                            />
                            <span className="lh-lg">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                  </Reveal>
                </div>
              ) : null}
              {detail.architecture?.length ? (
                <div className="col-lg-6">
                  <Reveal delay={110}>
                  <section className="card border-secondary border-opacity-25 bg-dark bg-opacity-40 h-100">
                    <div className="card-body p-4 p-lg-5">
                      <h2 className="h5 fw-semibold text-dark mb-3 d-flex align-items-center gap-2">
                        <i className="fa-solid fa-building" style={{ color: "#f59e0b" }} aria-hidden />
                        Thiết kế &amp; kiến trúc
                      </h2>
                      <ul className="list-unstyled mb-0">
                        {detail.architecture.map((item) => (
                          <li key={item} className="d-flex gap-3 mb-3 text-secondary">
                            <i
                              className="fa-solid fa-diagram-project mt-1 flex-shrink-0"
                              style={{ color: project.color }}
                              aria-hidden
                            />
                            <span className="lh-lg">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                  </Reveal>
                </div>
              ) : null}
            </div>

            {detail.security?.length || detail.mainFeatures?.length ? (
              <div className="row g-4 mt-1">
                {detail.security?.length ? (
                  <div className="col-lg-6">
                    <Reveal delay={0}>
                    <DetailListBlock
                      title="Bảo mật"
                      iconClass="fa-solid fa-shield-halved"
                      items={detail.security}
                      color={project.color}
                    />
                    </Reveal>
                  </div>
                ) : null}
                {detail.mainFeatures?.length ? (
                  <div className="col-lg-6">
                    <Reveal delay={100}>
                    <DetailListBlock
                      title="Chức năng chính"
                      iconClass="fa-solid fa-list-check"
                      items={detail.mainFeatures}
                      color={project.color}
                    />
                    </Reveal>
                  </div>
                ) : null}
              </div>
            ) : null}

            {detail.outcomes?.length || detail.database?.length ? (
              <div className="row g-4 mt-1">
                {detail.outcomes?.length ? (
                  <div className="col-lg-6">
                    <Reveal delay={0}>
                    <DetailListBlock
                      title="Kết quả đạt được"
                      iconClass="fa-solid fa-chart-line"
                      items={detail.outcomes}
                      color={project.color}
                    />
                    </Reveal>
                  </div>
                ) : null}
                {detail.database?.length ? (
                  <div className="col-lg-6">
                    <Reveal delay={100}>
                    <DetailListBlock
                      title="Database"
                      iconClass="fa-solid fa-database"
                      items={detail.database}
                      color={project.color}
                    />
                    </Reveal>
                  </div>
                ) : null}
              </div>
            ) : null}

            {detail.skillsGained?.length ? (
              <div className="row g-4 mt-1">
                <div className="col-12">
                  <Reveal delay={0}>
                  <DetailListBlock
                    title="Kỹ năng đạt được"
                    iconClass="fa-solid fa-graduation-cap"
                    items={detail.skillsGained}
                    color={project.color}
                  />
                  </Reveal>
                </div>
              </div>
            ) : null}

            <Reveal delay={80}>
            <div className="d-flex flex-wrap gap-3 mt-5 pt-2">
              <button
                type="button"
                className="btn btn-lg text-white border-0 d-inline-flex align-items-center gap-2 px-4"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #fb923c)",
                }}
                onClick={() => navigate(-1)}
              >
                <i className="fa-solid fa-arrow-left" aria-hidden />
                Quay về trang trước
              </button>
              <Link to="/" className="btn btn-lg btn-outline-secondary">
                Về portfolio
              </Link>
              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg btn-outline-secondary d-inline-flex align-items-center gap-2"
                >
                  <i className="fa-brands fa-github" aria-hidden />
                  Xem repo
                </a>
              ) : null}
            </div>
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}
