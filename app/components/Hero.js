'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import '../styles/hero.css'

export default function Hero() {

  const slides = [

    {
      image:
        '/ipekosolGif.gif',

      title:
        'Innovative Projects & Digital Solutions',

      text:
        'Explore our portfolio of completed projects, creative work and successful client collaborations.',

      button:
        'View Portfolio',

      link:
        '/portfolio'
    },

    {
      image:
        '/market.png',

      title:
        'Marketplace Opportunities',

      text:
        'Browse products, services and opportunities available through our growing marketplace.',

      button:
        'Browse Marketplace',

      link:
        '/marketplace'
    },

    {
      image:
            '/highlights.png',

          title:
            'Latest Highlights & Updates',

          text:
            'Stay informed with our latest activities, achievements, events and featured content.',

          button:
            'View Highlights',

          link:
            '/#highlights'
    },

    {
      image:
        '/testimonial.png',

      title:
        'Trusted By Our Clients',

      text:
        'Read authentic testimonials and experiences from people we have worked with.',

      button:
        'Read Testimonials',

      link:
        '/testimonials'
    }

  ]

  const [current, setCurrent] = useState(0)

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent(prev =>
        prev === slides.length - 1
          ? 0
          : prev + 1
      )

    }, 6000)

    return () => clearInterval(interval)

  }, [])

  const nextSlide = () => {

    setCurrent(prev =>
      prev === slides.length - 1
        ? 0
        : prev + 1
    )

  }

  const prevSlide = () => {

    setCurrent(prev =>
      prev === 0
        ? slides.length - 1
        : prev - 1
    )

  }

  return (

    <section
      className="hero"
      style={{
        backgroundImage:
          `url(${slides[current].image})`
      }}
    >

      <div className="hero-overlay">

        <div className="hero-content">

          <span className="hero-badge">
            Featured
          </span>

          <h1>
            {slides[current].title}
          </h1>

          <p>
            {slides[current].text}
          </p>

          <Link
            href={slides[current].link}
            className="hero-btn"
          >
            {slides[current].button}
          </Link>

        </div>

        <button
          className="hero-arrow left"
          onClick={prevSlide}
        >
          ←
        </button>

        <button
          className="hero-arrow right"
          onClick={nextSlide}
        >
          →
        </button>

        <div className="hero-dots">

          {slides.map((_, index) => (

            <button
              key={index}
              className={
                current === index
                  ? 'dot active-dot'
                  : 'dot'
              }
              onClick={() =>
                setCurrent(index)
              }
            />

          ))}

        </div>

      </div>

    </section>

  )
}