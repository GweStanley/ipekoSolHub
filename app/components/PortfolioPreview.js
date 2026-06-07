'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import '../styles/portfolio.css'

export default function PortfolioPreview() {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {

    const { data } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

    setProjects(data || [])
  }

  return (
    <section className="portfolio-page">

      <div className="portfolio-header">
        <h2>Featured Projects</h2>
        <p>
          Explore some of our recently completed work.
        </p>
      </div>

      <div className="portfolio-grid">

        {projects.map((project) => (

          <article
            className="portfolio-card"
            key={project.id}
          >

            {project.image_url && (
              <img
                src={project.image_url}
                alt={project.title}
              />
            )}

            <div className="portfolio-content">

              <h2>{project.title}</h2>

              <p>{project.description}</p>

              {project.technology && (
                <div className="tech-stack">
                  {project.technology}
                </div>
              )}

              {project.completion_date && (
                <div className="meta">
                  Completed: {project.completion_date}
                </div>
              )}

              <div className="portfolio-actions">

                

                <Link
                  href="/portfolio"
                  className="more-btn"
                >
                  More Projects
                </Link>

              </div>

            </div>

          </article>

        ))}

      </div>

    </section>
  )
}