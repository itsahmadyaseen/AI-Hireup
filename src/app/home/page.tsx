'use client'

import React from 'react'
import Image from 'next/image'
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
            <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#how" className="hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#blog" className="hover:text-indigo-600 transition-colors">Blog</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-indigo-600 transition-colors">Login</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-colors">Sign Up</button>
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
            <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition-colors">Get Started</button>
            <a href="#how" className="px-8 py-3 border border-white rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition-colors">Watch Demo</a>
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
            <div key={index} className="bg-white rounded-xl shadow p-6 text-center hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 items-center gap-10">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="mb-6 text-gray-600">
                At AI Interviewer, we believe great teams start with great conversations. Our mission is to
                empower organizations with cutting‑edge AI to make hiring faster, fairer, and more human.
              </p>
              <h3 className="text-2xl font-semibold mb-2">Why Our AI?</h3>
              <p className="text-gray-600">
                Built on the latest speech, vision, and language models, our platform detects subtle cues
                missed in traditional interviews, providing holistic candidate profiles.
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
                alt="Team collaborating"
                width={800}
                height={533}
                className="rounded-xl shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {['Create Job', 'Invite Candidates', 'AI‑Led Interview', 'Review Insights'].map((step, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="text-4xl font-black text-indigo-600 mb-2">{i + 1}</div>
              <h4 className="font-semibold mb-2">{step}</h4>
              <p className="text-gray-600 text-sm">
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
                className={`bg-white rounded-xl shadow p-8 flex flex-col transition-transform hover:scale-105 ${
                  plan.highlighted ? 'border-4 border-indigo-600 transform scale-105 shadow-lg' : ''
                }`}
              >
                <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6 text-indigo-600">{plan.price}</p>
                <ul className="text-left space-y-2 flex-1 mb-6">
                  {plan.features.map((feature, i2) => (
                    <li key={i2} className="flex items-center text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Latest Insights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'The Future of AI in Recruitment',
                excerpt: 'Discover how artificial intelligence is transforming the hiring landscape...',
                date: 'Jan 15, 2024'
              },
              {
                title: 'Building Bias-Free Interview Processes',
                excerpt: 'Learn strategies to eliminate unconscious bias in your hiring decisions...',
                date: 'Jan 10, 2024'
              },
              {
                title: 'Remote Hiring Best Practices',
                excerpt: 'Master the art of conducting effective remote interviews and assessments...',
                date: 'Jan 5, 2024'
              }
            ].map((post, index) => (
              <article key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium">Read More →</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hiring?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using AI Interviewer to find the best talent faster.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 rounded-lg text-gray-800 flex-1"
            />
            <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">AI Interviewer</h3>
              <p className="text-sm">
                Revolutionizing hiring with AI-powered interviews and data-driven insights.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#status" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 AI Interviewer. All rights reserved.</p>
            <div className="space-x-4 mt-4 md:mt-0">
              <a href="#privacy" className="hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
