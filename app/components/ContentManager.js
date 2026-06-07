'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ContentManager() {

  const [activeTab, setActiveTab] =
    useState('highlights')

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadContent()
  }, [activeTab])

  async function loadContent() {

    setLoading(true)

    const { data, error } = await supabase
      .from(activeTab)
      .select('*')
      .order('created_at', {
        ascending: false
      })

    if (!error) {
      setItems(data || [])
    }

    setLoading(false)
  }

  async function deleteItem(id) {

    const confirmed =
      window.confirm(
        'Are you sure you want to delete this item?'
      )

    if (!confirmed) return

    const { error } = await supabase
      .from(activeTab)
      .delete()
      .eq('id', id)

    if (error) {
      alert(error.message)
      return
    }

    loadContent()
  }

  return (

    <div className="content-manager">

      <div className="manager-tabs">

        <button
          className={
            activeTab === 'highlights'
              ? 'active-tab'
              : ''
          }
          onClick={() =>
            setActiveTab('highlights')
          }
        >
          Highlights
        </button>

        <button
          className={
            activeTab === 'portfolio'
              ? 'active-tab'
              : ''
          }
          onClick={() =>
            setActiveTab('portfolio')
          }
        >
          Portfolio
        </button>

        <button
          className={
            activeTab === 'marketplace'
              ? 'active-tab'
              : ''
          }
          onClick={() =>
            setActiveTab('marketplace')
          }
        >
          Marketplace
        </button>

        <button
          className={
            activeTab === 'testimonials'
              ? 'active-tab'
              : ''
          }
          onClick={() =>
            setActiveTab('testimonials')
          }
        >
          Testimonials
        </button>

      </div>

      <h2>
        Manage {activeTab}
      </h2>

      {loading ? (

        <p>Loading...</p>

      ) : items.length === 0 ? (

        <p>No content found.</p>

      ) : (

        items.map((item) => (

          <div
            className="manager-card"
            key={item.id}
          >

            <div className="manager-info">

             {(item.media_url || item.image_url) && (

                    <img
                        src={item.media_url || item.image_url}
                        alt=""
                        className="manager-image"
                    />

                    )}

              <div>

                {item.title && (
                  <h3>{item.title}</h3>
                )}

                {item.description && (
                  <p>{item.description}</p>
                )}

                {item.client_name && (
                  <h3>
                    {item.client_name}
                  </h3>
                )}

                {item.message && (
                  <p>{item.message}</p>
                )}

                {item.price && (
                  <p>
                    <strong>
                      Price:
                    </strong>{' '}
                    {item.price}
                  </p>
                )}

                {item.category && (
                  <p>
                    <strong>
                      Category:
                    </strong>{' '}
                    {item.category}
                  </p>
                )}

                {item.location && (
                  <p>
                    <strong>
                      Location:
                    </strong>{' '}
                    {item.location}
                  </p>
                )}

                {item.contact_phone && (
                  <p>
                    <strong>
                      Phone:
                    </strong>{' '}
                    {item.contact_phone}
                  </p>
                )}

                {item.technology && (
                  <p>
                    <strong>
                      Tech:
                    </strong>{' '}
                    {item.technology}
                  </p>
                )}

                {item.project_link && (
                  <p>
                    <strong>
                      URL:
                    </strong>{' '}
                    {item.project_link}
                  </p>
                )}

              </div>

            </div>

            <button
              className="delete-btn"
              onClick={() =>
                deleteItem(item.id)
              }
            >
              Delete
            </button>

          </div>

        ))

      )}

    </div>

  )
}