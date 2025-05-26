import { Link } from 'react-router-dom';
import './Home.scss';

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
    title:
      'Why are both parties calling for a united Canada in response to political tensions under Trump?',
    topic: 'New to Canada',
    status: '🧪 under construction',
    link: '/canadian-federalism',
  },
  // Add more as you go
];

export default function Home() {
  return (
    <div>
      {/* Row 1: Van Gogh Header*/}
      <div className="row justify-content-end van-gogh-background">
        <div className="col-md-8 mt-2 van-gogh">
          <p>
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
      {/* Row 2: Title */}
      <div className="row justify-content-center text-center mt-3">
        <div className="col-10 title">
          <p>Canvas of Numbers: Where Data Meets Insight</p>
        </div>
      </div>
      {/* Row 3: Intro */}
      <div className="row text-center">
        <div className="col-12 intro">
          <p>
            A data exploration wiki where I (and eventually, others) turn curiosity into clarity
            through visual questions and answers. Each question follows a transparent journey: from
            asking, to gathering data, to visualization.
          </p>
        </div>
      </div>
      <h2>Welcome to the Gallery of Questions</h2>
      {/* Row 4: display */}
      <div className="row text-center">
        <div className="col-md-2 map">
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
        {questions.map((q) => (
          <div key={q.id} className="col-md-4 frame">
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
  );
}
