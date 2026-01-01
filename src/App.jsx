import "./App.css";
import { cv } from "./cvData";

function SectionTitle({ children }) {
  return <div className="sectionTitle">{children}</div>;
}

function MiniHeading({ children }) {
  return <div className="miniHeading">{children}</div>;
}

function ContactItem({ item }) {
  return (
    <div className="contactItem">
      {item.href ? (
        <a
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
        >
          {item.value}
        </a>
      ) : (
        <span>{item.value}</span>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="page">
      <div className="noPrint topBar">
        <span className="printHint">
          For best PDF: Margins → None, Background graphics → ON
        </span>

        <button className="btn" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>

      <div className="paper">
        {/* TOP BANNER (like old PDF) */}
        <header className="banner">
          <div className="avatarWrap" aria-hidden="true">
            <img
              className="avatar"
              src={`${import.meta.env.BASE_URL}avatar.jpg`}
              alt="Avatar"
              onError={(e) => {
                // hide broken image; keep the circle
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="bannerText">
            <h1 className="name">{cv.name}</h1>
            <div className="contacts">
              {cv.contacts.map((c, i) => (
                <ContactItem key={i} item={c} />
              ))}
            </div>
          </div>
        </header>

        {/* BODY */}
        <div className="columns">
          {/* LEFT SIDEBAR */}
          <aside className="left">
            <SectionTitle>SKILLS</SectionTitle>
            <div className="block">
              {cv.skills.map((s, i) => (
                <div key={i} className="line">{s}</div>
              ))}
            </div>

            <SectionTitle>LANGUAGES</SectionTitle>
            <div className="block">
              {cv.languages.map((l) => (
                <div key={l} className="line">{l}</div>
              ))}
            </div>
          </aside>

          {/* RIGHT MAIN */}
          <main className="right">
            <SectionTitle>SUMMARY</SectionTitle>
            <div className="paragraph">{cv.summary}</div>

            <SectionTitle>EMPLOYMENT</SectionTitle>
            {cv.employment.map((job, idx) => (
              <div key={idx} className="job">
                <div className="jobHeader">
                  <div className="jobTitle">{job.title}</div>
                  <div className="jobDates">{job.dates}</div>
                </div>
                <div className="jobCompany">{job.company}</div>

                {job.blocks.map((b, i) => (
                  <div key={i} className="jobSection">
                    <MiniHeading>{b.h}</MiniHeading>
                    <div className="paragraph">{b.t}</div>
                  </div>
                ))}
              </div>
            ))}

            <SectionTitle>EDUCATION</SectionTitle>
            {cv.education.map((e, idx) => (
              <div key={idx} className="edu">
                <div className="jobHeader">
                  <div className="jobTitle">{e.degree}</div>
                  <div className="jobDates">{e.dates}</div>
                </div>
                <div className="paragraph">{e.school}</div>
                <div className="paragraph">{e.details}</div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
