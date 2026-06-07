'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import '../../styles/tasks.css'

export default function LoginPage() {

  const router = useRouter()

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  async function login() {

    const { data } = await supabase
      .from('task_users')
      .select('*')
      .eq('username',username)
      .eq('password',password)
      .single()

    if(!data){
      alert('Invalid credentials')
      return
    }

    localStorage.setItem(
      'taskUser',
      JSON.stringify(data)
    )

    router.push('/tasks/dashboard')
  }

  return (

    <div className="task-login">

      <div className="task-login-card">

        <h1>Task Manager</h1>

        <input
          placeholder="Username"
          onChange={(e)=>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <button onClick={login}>
          Login
        </button>

      </div>

    </div>

  )
}