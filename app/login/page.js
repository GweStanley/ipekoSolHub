'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import '../../styles/tasks.css'

export default function LoginPage() {

  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function login() {

    setError('')

    const { data, error: dbError } = await supabase
      .from('task_users')
      .select('*')
      .eq('username', username.trim())
      .limit(1)

    if (dbError) {
      setError('Database error')
      return
    }

    const user = data?.[0]

    if (!user) {
      setError('User not found')
      return
    }

    if (user.password !== password.trim()) {
      setError('Incorrect password')
      return
    }

    localStorage.setItem(
      'taskUser',
      JSON.stringify(user)
    )

    router.push('/tasks/dashboard')
  }

  return (

    <div className="task-login">

      <div className="task-login-card">

        <h1>Task Login</h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (
          <p style={{ color: 'red' }}>
            {error}
          </p>
        )}

        <button onClick={login}>
          Login
        </button>

      </div>

    </div>

  )
}