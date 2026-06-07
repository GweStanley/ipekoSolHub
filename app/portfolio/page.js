'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import '../styles/portfolio.css'

export default function PortfolioPage() {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {

    const { data } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false })

    setProjects(data || [])
  }

  return (
    <section className="portfolio-page">

      <div className="portfolio-header">
        <h1>Portfolio</h1>
        <p>
          Selected work and completed projects.
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

              {project.project_link && (
                <a
                  href={project.project_link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  Visit Project
                </a>
              )}

            </div>

          </article>

        ))}

      </div>

    </section>
  )
}