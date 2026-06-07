'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import '../styles/marketplace.css'

export default function MarketplacePage() {

  const [items, setItems] = useState([])

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {

    const { data } = await supabase
      .from('marketplace')
      .select('*')
      .order('created_at', { ascending: false })

    setItems(data || [])
  }

  return (
    <section className="marketplace-page">

      <div className="marketplace-header">
        <h1>Marketplace</h1>
        <p>
          Browse available listings, services and opportunities.
        </p>
      </div>

      <div className="marketplace-grid">

        {items.map((item) => (

          <article
            className="marketplace-card"
            key={item.id}
          >

            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
              />
            )}

            <div className="marketplace-content">

              <div className="marketplace-top">

                <h2>{item.title}</h2>

                {item.price && (
                  <span className="price-tag">
                    {item.price}
                  </span>
                )}

              </div>

              <p>
                {item.description}
              </p>

              {(item.category ||
                item.location) && (

                <div className="marketplace-meta">

                  {item.category && (
                    <span>
                      {item.category}
                    </span>
                  )}

                  {item.location && (
                    <span>
                      {item.location}
                    </span>
                  )}

                </div>

              )}

{item.contact_phone && (
  <a
    href={`https://wa.me/${item.contact_phone.replace(/\D/g, '')}`}
    target="_blank"
    rel="noreferrer"
    className="contact-btn"
  >
    Chat on WhatsApp
  </a>
)}
            </div>

          </article>

        ))}

      </div>

    </section>
  )
}