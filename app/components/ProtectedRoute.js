'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {

    checkUser()

  }, [])

  async function checkUser() {

    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (!session) {
      router.push('/login')
      return
    }

    setLoading(false)
  }

  if (loading) {
    return <h2>Loading...</h2>
  }

  return children
}