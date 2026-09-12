import { Experience } from "./experience";

const chapters = [
  {
    number: "01",
    eyebrow: "Attunement",
    title: "Move softly. It notices everything.",
    body: "A quiet intelligence lives between the pixels. Move your pointer and the guardian follows—not to watch, but to understand.",
    aside: "POINTER / GAZE",
  },
  {
    number: "02",
    eyebrow: "Drift",
    title: "Depth arrives one layer at a time.",
    body: "Scroll becomes a camera. Light, spores and atmosphere separate at different speeds, turning a flat viewport into a place with distance.",
    aside: "SCROLL / PARALLAX",
    align: "right",
  },
  {
    number: "03",
    eyebrow: "Resonance",
    title: "The interface breathes with you.",
    body: "Motion is never decoration here. Every orbit, pause and response gives the world a pulse—and gives you a reason to stay curious.",
    aside: "MOTION / RESPONSE",
  },
];

export default function Home() {
  return (
    <main id="top">
      <Experience />

      <header className="site-header">
        <a className="wordmark magnetic" href="#top" aria-label="Mossbyte, back to top">
          MOSSBYTE<span>°</span>
        </a>
        <nav aria-label="Primary navigation">
          <a className="nav-link magnetic" href="#field-notes">FIELD NOTES</a>
          <a className="nav-link magnetic" href="#resonance">PROCESS</a>
          <a className="enter-link magnetic" href="#field-notes">
            ENTER <span aria-hidden="true">↘</span>
          </a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-kicker"><span /> AN INTERACTIVE FIELD STUDY</div>
        <h1 id="hero-title">
          WALK INTO
          <span>THE SIGNAL.</span>
        </h1>
        <div className="hero-copy">
          <p>A living WebGL ecosystem shaped by attention, movement and time.</p>
          <a className="round-link magnetic" href="#field-notes" aria-label="Begin the experience">
            <span>BEGIN</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-coordinates" aria-hidden="true">
          <span>19° 04&apos; N</span>
          <span>SPECIMEN / IX</span>
          <span>ALT. 1,440M</span>
        </div>
      </section>

      <div id="field-notes" className="chapters">
        {chapters.map((chapter, index) => (
          <section
            id={index === 2 ? "resonance" : undefined}
            className={`chapter ${chapter.align === "right" ? "chapter-right" : ""}`}
            key={chapter.number}
          >
            <div className="chapter-card">
              <div className="chapter-index">
                <span>{chapter.number}</span>
                <span>{chapter.eyebrow}</span>
              </div>
              <h2>{chapter.title}</h2>
              <p>{chapter.body}</p>
              <div className="chapter-aside">
                <span className="pulse-dot" /> {chapter.aside}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="closing" aria-labelledby="closing-title">
        <div className="closing-topline">
          <span>MOSSBYTE / FIELD LOG 001</span>
          <span>THE WORLD RESPONDS WHEN YOU DO</span>
        </div>
        <div className="closing-main">
          <p className="closing-kicker">END OF TRAIL</p>
          <h2 id="closing-title">LEAVE LIGHTER<br />THAN YOU ARRIVED.</h2>
          <button className="restart magnetic" type="button">
            RESTART THE TRAIL <span aria-hidden="true">↑</span>
          </button>
        </div>
        <div className="closing-foot">
          <span>WEBGL / THREE.JS</span>
          <span>REACT / MOTION</span>
          <span>DESIGNED IN THE WILD</span>
        </div>
      </section>
    </main>
  );
}
