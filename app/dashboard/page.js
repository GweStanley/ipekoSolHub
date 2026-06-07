'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import ProtectedRoute from '../components/ProtectedRoute'
import ContentManager from '../components/ContentManager'
import '../styles/dashboard.css'

export default function DashboardPage() {

  const [section, setSection] = useState('highlights')
  const [uploading, setUploading] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  // Portfolio
  const [projectLink, setProjectLink] = useState('')
  const [technology, setTechnology] = useState('')
  const [completionDate, setCompletionDate] = useState('')

  // Marketplace
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [location, setLocation] = useState('')

  // Testimonials
  const [clientName, setClientName] = useState('')
  const [message, setMessage] = useState('')

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  function resetForm() {
    setTitle('')
    setDescription('')
    setPrice('')
    setProjectLink('')
    setTechnology('')
    setCompletionDate('')
    setCategory('')
    setContactPhone('')
    setLocation('')
    setClientName('')
    setMessage('')
    setFile(null)
  }

  async function uploadFile() {

    if (!file) return null

    const filename = `${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from('media')
      .upload(filename, file)

    if (error) {
      throw error
    }

    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(filename)

    return data.publicUrl
  }

  async function handleSubmit() {

  try {

    setUploading(true)

    let mediaUrl = null

    if (file) {
      mediaUrl = await uploadFile()
    }

    let result

    if (section === 'highlights') {

      result = await supabase
        .from('highlights')
        .insert([
          {
            title,
            description,
            media_url: mediaUrl,
            media_type: file?.type || 'unknown'
          }
        ])
        .select()
    }

    if (section === 'portfolio') {

      result = await supabase
        .from('portfolio')
        .insert([
          {
            title,
            description,
            image_url: mediaUrl,
            project_link: projectLink,
            technology,
            completion_date: completionDate
          }
        ])
        .select()
    }

    if (section === 'marketplace') {

      result = await supabase
        .from('marketplace')
        .insert([
          {
          title,
          description,
          price,
          image_url: mediaUrl,
          category,
          contact_phone: contactPhone,
          location
        }
        ])
        .select()
    }

    if (section === 'testimonials') {

      result = await supabase
        .from('testimonials')
        .insert([
          {
            client_name: clientName,
            message
          }
        ])
        .select()
    }

    if (result?.error) {

      console.error(result.error)

      alert(result.error.message)

      return
    }

    console.log('INSERT SUCCESS:', result.data)

    alert('Content uploaded successfully')

    resetForm()

    window.location.reload()

  } catch (error) {

    console.error(error)

    alert(error.message)

  } finally {

    setUploading(false)

  }
}

  return (
    <ProtectedRoute>

      <div className="dashboard">

        <div className="dashboard-header">

          <h1>Admin Dashboard</h1>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

        <div className="dashboard-section">

          <h2>Upload Content</h2>

          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            <option value="highlights">
              Highlights
            </option>

            <option value="portfolio">
              Portfolio
            </option>

            <option value="marketplace">
              Marketplace
            </option>

            <option value="testimonials">
              Testimonials
            </option>
          </select>

          {section !== 'testimonials' && (
            <>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />

              <input
                type="file"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />
            </>
          )}

          {section === 'portfolio' && (
            <>
              <input
                type="text"
                placeholder="Project Link"
                value={projectLink}
                onChange={(e) =>
                  setProjectLink(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Technology Stack"
                value={technology}
                onChange={(e) =>
                  setTechnology(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Completion Date"
                value={completionDate}
                onChange={(e) =>
                  setCompletionDate(e.target.value)
                }
              />
            </>
          )}

          {section === 'marketplace' && (
            <>
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={contactPhone}
                onChange={(e) =>
                  setContactPhone(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />
            </>
          )}

          {section === 'testimonials' && (
            <>
              <input
                type="text"
                placeholder="Client Name"
                value={clientName}
                onChange={(e) =>
                  setClientName(e.target.value)
                }
              />

              <textarea
                placeholder="Testimonial"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              />
            </>
          )}

          <button
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading
              ? 'Uploading...'
              : 'Upload Content'}
          </button>

        </div>

        <ContentManager />

      </div>

    </ProtectedRoute>
  )
}