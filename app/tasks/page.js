'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TasksPage() {

  const router = useRouter()

  useEffect(() => {
    router.push('/tasks/login')
  }, [])

  return null
}