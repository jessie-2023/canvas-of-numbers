import React from "react";
import { Link } from "react-router-dom";

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Canvas of Numbers</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">🧭 What This Is</h2>
        <p className="text-gray-700">
          A data exploration wiki where I (and eventually, others) turn
          curiosity into clarity through visual questions and answers. Each
          question follows a transparent journey: from asking, to gathering
          data, to visualization.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">🔍 Questions I'm Exploring</h2>
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
