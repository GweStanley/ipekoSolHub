'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import '../styles/highlights.css'

export default function Highlights() {

  const [highlights, setHighlights] = useState([])

  useEffect(() => {
    fetchHighlights()
  }, [])

  async function fetchHighlights() {

    const { data } = await supabase
      .from('highlights')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(4)

    setHighlights(data || [])
  }

  return (

    <section className="highlights-section">

      <div className="highlights-header">

        <span className="section-tag">
          Latest Updates
        </span>

        <h2>
          Highlights & Announcements
        </h2>

        <p>
          Stay updated with our latest projects,
          activities, achievements and important news.
        </p>

      </div>

      <div className="highlights-list">

        {highlights.map((item, index) => (

          <article
            className={`highlight-card ${
              index % 2 !== 0 ? 'reverse' : ''
            }`}
            key={item.id}
          >

            <div className="highlight-media">

              {item.media_type === 'image' ? (

                <img
                  src={item.media_url}
                  alt={item.title}
                />

              ) : (

                <video
                  controls
                  preload="metadata"
                >
                  <source src={item.media_url} />
                </video>

              )}

            </div>

            <div className="highlight-content">

              <div className="highlight-label">
                Featured Highlight
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>


            </div>

          </article>

        ))}

      </div>

      <div className="highlights-footer">

        <Link
          href="https://ipekosol.com"
          className="all-highlights-btn"
        >
         Back to iPekoSol.com
        </Link>

      </div>

    </section>

  )
}