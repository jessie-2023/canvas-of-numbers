import React from "react";
import { Link } from "react-router-dom";
import './Home.scss';
const questions = [
  {
    id: "gender-gap",
    title: "How have gender gaps evolved globally over time?",
    topic: "Gender",
    status: "✅ Visualized",
    link: "/gender-gap",
  },
  {
    id: "canadian-federalism",
    title: "Is the idea of a united Canada realistic given its provincial disparities?",
    topic: "Federalism",
    status: "🧪 Data collected",
    link: "/canadian-federalism",
  },
  // Add more as you go
];

export default function Home() {
  return (
    <div>
      {/* Row 1: Van Gogh Header*/}
      <div className="row justify-content-end van-gogh-background">
        <div className="col-md-8 mt-2 van-gogh">
          <p><em>
          Inspired by Van Gogh's bold spirit, Canvas of Numbers is more than just a data visualization tool — 
          it's a journey to uncover the deeper truths hidden behind the data. 
          Just as Van Gogh painted the emotions and essence of the world beyond the surface, 
          this platform helps you explore the invisible patterns and forces shaping the world, 
          one dataset at a time.
          </em></p>
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
          A data exploration wiki where I (and eventually, others) turn
          curiosity into clarity through visual questions and answers. Each
          question follows a transparent journey: from asking, to gathering
          data, to visualization.
          </p>
        </div>
      </div>

      <section className="questions">
        <p className="gallery">🔍 Questions in the gallery</p>
        <ul className="space-y-4">
          {questions.map((q) => (
            <li
              key={q.id}
              className="p-4 bg-white rounded-2xl shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <Link to={q.link}>
                  <h3 className="text-lg font-medium text-blue-600 hover:underline">
                    {q.title}
                  </h3>
                </Link>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                  {q.topic}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Progress: {q.status}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📌 Analytical Methodology</h2>
        <p className="text-gray-700">
          Start with a question → Seek reliable data → Tidy and visualize →
          Separate facts from assumptions → Reflect and revise.
        </p>
      </section>
      
    </div>
  );
}
