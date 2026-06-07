'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import '../styles/marketplace.css'

export default function MarketplacePreview() {

  const [items, setItems] = useState([])

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {

    const { data } = await supabase
      .from('marketplace')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

    setItems(data || [])
  }

  return (
    <section className="marketplace-page">

      <div className="marketplace-header">
        <h2>Marketplace</h2>
        <p>
          Browse featured listings from our marketplace.
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

              <p>{item.description}</p>

              {(item.category || item.location) && (

                <div className="marketplace-meta">

                  {item.category && (
                    <span>{item.category}</span>
                  )}

                  {item.location && (
                    <span>{item.location}</span>
                  )}

                </div>

              )}

              <div className="marketplace-actions">

  {item.contact_phone && (
    <a
      href={`https://wa.me/${item.contact_phone.replace(/\D/g, '')}`}
      target="_blank"
      rel="noreferrer"
      className="contact-btn"
    >
      WhatsApp
    </a>
  )}

  <a
    href="/marketplace"
    className="more-btn"
  >
    More Products
  </a>

</div>

            </div>

          </article>

        ))}

      </div>

    </section>
  )
}