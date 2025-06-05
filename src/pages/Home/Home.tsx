import { Link } from 'react-router-dom';
import NavbarTop from '../../components/NavbarTop';
import './Home.scss';
import NavbarBottom from '../../components/NavbarBottom';

const questions = [
  {
    id: 'gender-gap',
    title: 'Why women fight?',
    topic: 'Gender',
    status: '✅ Visualized',
    link: '/gender-gap',
  },
  {
    id: 'canadian-federalism',
    title: "What does 'a united Canada' really mean?",
    topic: 'New to Canada',
    status: '🧪 under construction',
    link: '/canadian-federalism',
  },
];

const specials = [
  {
    id: 'documentaries',
    title: 'Hot Docs Festival 2025',
    topic: 'Documentary',
    status: '🧪 under construction',
    link: '/documentaries',
  },
];

export default function Home() {
  return (
    <>
    <NavbarTop />
      {/* Row 1: Van Gogh Header*/}
      <div className="row justify-content-end van-gogh-background">
        <div className="col-md-8 mt-2 ms-2 me-3">
          <p className=" van-gogh">
            <em>
              Inspired by Van Gogh's bold spirit, Canvas of Numbers is more than just a data
              visualization tool — it's a journey to uncover the deeper truths hidden behind the
              data. Just as Van Gogh painted the emotions and essence of the world beyond the
              surface, this platform helps you explore{' '}
              <strong className="feel">— and feel —</strong> the invisible patterns and forces
              shaping our world through reliable numbers.
            </em>
          </p>
        </div>
      </div>
      <div className="content-container">
        {/* Row 2: Title */}
        <div className="row justify-content-center text-center mt-3">
          <div className="col-10 title">
            <p>Canvas of Numbers: Where Data Meets Insight</p>
          </div>
        </div>
        {/* Row 3: Intro */}
        <div className="row text-center">
          <div className="col-11 intro">
            <p>
              A data exploration wiki where I (and eventually, others) turn curiosity into clarity
              through visual questions and answers. Each question follows a transparent journey:
              from asking, to gathering data, to visualization.
            </p>
          </div>
        </div>
        <h2>Welcome to the Gallery of Questions</h2>
        {/* Row 4: display */}
        <div className="row text-center">
          <div className="col-md-4 col-sm-12">
            <div className='map-container'>
            <div className="map">
              <p>📌 Analytical Roadmap</p>
              <ul>
                <li>Start with a question →</li>
                <li>Seek reliable data →</li>
                <li>Tidy and visualize →</li>
                <li>Feel the pattern →</li>
                <li>Separate facts from emotions →</li>
                <li>Reflect and revise →</li>
                <li>More questions...</li>
              </ul>
            </div>
            </div>
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="gallery">
              {questions.map((q) => (
                <div key={q.id} className="frame">
                  <div className="in-frame">
                    <Link to={q.link}>
                      <p className="in-frame-question mt-5">🔍 {q.title}</p>
                    </Link>
                    <span>Topic: {q.topic}</span>
                    <p>Progress: {q.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <h2>Special Exhibitions</h2>
        <div className="gallery">
          {specials.map((q) => (
            <div key={q.id} className="frame">
              <div className="in-frame">
                <Link to={q.link}>
                  <p className="in-frame-question mt-5">📽️ {q.title}</p>
                </Link>
                <span>Topic: {q.topic}</span>
                <p>Progress: {q.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NavbarBottom />
    </>
  );
}
