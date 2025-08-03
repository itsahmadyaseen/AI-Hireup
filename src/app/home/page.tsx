'use client'

import React from 'react'
// import { useRouter } from 'next/navigation'

export default function HomePage() {
  // const router = useRouter()

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header & Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-indigo-600">AI Interviewer</a>
          <nav className="hidden md:flex space-x-6 font-medium">
            <a href="#about" className="hover:text-indigo-600">About</a>
            <a href="#how" className="hover:text-indigo-600">How It Works</a>
            <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
            <a href="#blog" className="hover:text-indigo-600">Blog</a>
            <a href="#contact" className="hover:text-indigo-600">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            {/* <a href="/login" className="text-gray-600 hover:text-indigo-600">Login</a> */}
            {/* <a href="/signup" className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700">Sign Up</a> */}
            <button className="text-gray-600 hover:text-indigo-600">Login</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Streamline Hiring with AI‑Powered Interviews</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Conduct fair, data‑driven interviews in minutes and discover the best talent with
            behavioral insights and automated scoring.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            {/* <a href="/signup" className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100">Get Started</a> */}
            <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100">Get Started</button>
            <a href="#how" className="px-8 py-3 border border-white rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition">Watch Demo</a>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'AI‑Driven Insights',
              desc: 'Facial expression, tone, and language analysis provide deep candidate understanding.',
            },
            {
              title: 'Job‑Specific Questions',
              desc: 'Instantly generate tailored interview questions from your job description.',
            },
            {
              title: 'Fair & Transparent',
              desc: 'Explainable AI scores with actionable feedback ensure unbiased hiring.',
            },
          ].map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="mb-6">
              At AI Interviewer, we believe great teams start with great conversations. Our mission is to
              empower organizations with cutting‑edge AI to make hiring faster, fairer, and more human.
            </p>
            <h3 className="text-2xl font-semibold mb-2">Why Our AI?</h3>
            <p>
              Built on the latest speech, vision, and language models, our platform detects subtle cues
              missed in traditional interviews, providing holistic candidate profiles.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
            alt="Team collaborating"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {['Create Job', 'Invite Candidates', 'AI‑Led Interview', 'Review Insights'].map((step, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
              <div className="text-4xl font-black text-indigo-600 mb-2">{i + 1}</div>
              <h4 className="font-semibold mb-2">{step}</h4>
              <p>
                {[
                  'Import or write a job description and let AI craft tailored questions.',
                  'Send interview links directly or sync from your ATS.',
                  'Real‑time video interview with an AI avatar and live analytics.',
                  'Access detailed scores, transcripts, and recommendations instantly.',
                ][i]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$0/mo', features: ['Up to 3 interviews/month', 'Basic AI insights', 'Email support'] },
              {
                name: 'Growth',
                price: '$49/mo',
                features: ['Unlimited interviews', 'Advanced analytics', 'ATS integration', 'Priority support'],
                highlighted: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                features: ['Dedicated success manager', 'Custom integrations', 'SLA & compliance', '24/7 premium support'],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl shadow p-8 flex flex-col ${
                  plan.highlighted ? 'border-4 border-indigo-600 transform scale-105 shadow-lg' : ''
                }`}
              >
                <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6">{plan.price}</p>
                <ul className="text-left space-y-2 flex-1">
                  {plan.features.map((f, i2) => (
                    <li key={i2}>{f}</li>
                  ))}
                </ul>
                {/* <a href="/signup" className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Get Started</a> */}
                <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog & Contact would follow the same logic (no routing), feel free to add more as needed */}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 AI Interviewer. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
