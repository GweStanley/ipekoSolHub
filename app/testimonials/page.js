'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import '../styles/testimonials.css'

export default function TestimonialsPage() {

  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    fetchTestimonials()
  }, [])

  async function fetchTestimonials() {

    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', {
        ascending: false
      })

    setTestimonials(data || [])
  }

  return (

    <section className="testimonials-page">

      <div className="testimonials-hero">

        <span className="eyebrow">
          Client Feedback
        </span>

        <h1>
          Trusted by Clients
          Across Projects
        </h1>

        <p>
          Real experiences from clients,
          partners and organizations we've
          worked with.
        </p>

      </div>

      <div className="testimonial-stats">

        <div className="stat-card">
          <h2>{testimonials.length}+</h2>
          <span>Testimonials</span>
        </div>

        <div className="stat-card">
          <h2>100%</h2>
          <span>Client Focused</span>
        </div>

        <div className="stat-card">
          <h2>∞</h2>
          <span>Commitment</span>
        </div>

      </div>

      <div className="testimonials-grid">

        {testimonials.map((item) => (

          <article
            className="testimonial-card"
            key={item.id}
          >

            <div className="quote-mark">
              “
            </div>

            <p className="testimonial-message">
              {item.message}
            </p>

            <div className="testimonial-author">
              {item.client_name}
            </div>

          </article>

        ))}

      </div>

    </section>

  )
}