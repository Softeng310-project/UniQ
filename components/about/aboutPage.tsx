"use client";
import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">About Us</h1>
      <div className="text-lg text-gray-700 leading-relaxed space-y-4">
        <p>
          Welcome to UniQ – a student-driven initiative designed to make campus life easier.
        </p>
        <p>
          When UBIQ, the University of Auckland’s central hub for coursebooks and stationery, announced its closure, students faced the challenge of losing quick access to essential academic supplies. Our team saw this as an opportunity to step in and build a solution tailored for students, by students.
        </p>
        <p>
          At UniQ, our mission is simple: to bring back the convenience of having all your university essentials in one place – now made even easier through a modern, user-friendly website. From textbooks and refill pads to pens, binders, and graph paper, we provide everything you need, delivered right to your door.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-800">Our Vision</h2>
        <p>
          We believe students deserve more time to focus on their studies, not running errands. UniQ combines the practicality of a central campus store with the flexibility of e-commerce – searchable by course, product category, or keyword – ensuring you can always find what you need, quickly and reliably.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-800">Our Team</h2>
        <p>
          We are LuQy No.8, a group of Software Engineering students passionate about technology, collaboration, and solving real-world problems. Together, we aim to create not just a replacement for UBIQ, but an improved digital experience that prioritises:
        </p>
        <ul className="list-disc ml-6">
          <li><strong>Reliability</strong> – Always accessible and dependable</li>
          <li><strong>Usability</strong> – Simple, intuitive design for students</li>
          <li><strong>Convenience</strong> – Save time, order online, and focus on what matters most</li>
        </ul>
        <p>
          Through UniQ, we hope to support every student’s academic journey with the tools they need to succeed.
        </p>
        <hr className="my-8" />
        <p>
          <strong>Contact:</strong> softeng310project@gmail.com
        </p>
      </div>
    </div>
  );
}
