'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import '../styles/testimonials.css'

export default function Testimonials() {

  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    fetchTestimonials()
  }, [])

  async function fetchTestimonials() {

    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

    setTestimonials(data || [])
  }

  return (
    <section className="testimonials-section">

      <div className="testimonials-header">

        <h2>Testimonials</h2>

        <p>
          Hear what clients and partners have to say.
        </p>

      </div>

      <div className="testimonials-grid">

        {testimonials.map((item) => (

          <article
            className="testimonial-card"
            key={item.id}
          >

            <div className="quote-mark">
              "
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

      <div className="testimonials-footer">

        <Link
          href="/testimonials"
          className="view-testimonials-btn"
        >
          View All Testimonials
        </Link>

      </div>

    </section>
  )
}