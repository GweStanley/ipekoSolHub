'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import '../../styles/tasks.css'

export default function Dashboard() {

  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {

    const u = JSON.parse(localStorage.getItem('taskUser'))

    if (!u) {
      window.location.href = '/tasks/login'
      return
    }

    setUser(u)
    fetchTasks()

  }, [])

  async function fetchTasks() {

    const { data } = await supabase
      .from('tasks')
      .select('*')
      .eq('archived', false)
      .order('created_at', { ascending: false })

    setTasks(data || [])
  }

  async function createTask() {

    await supabase.from('tasks').insert([{
      title,
      description,
      priority,
      due_date: dueDate,
      status: 'Pending',
      created_by: 'Admin'
    }])

    setTitle('')
    setDescription('')
    setDueDate('')

    fetchTasks()
  }

  async function archiveTask(id) {

    await supabase
      .from('tasks')
      .update({ archived: true })
      .eq('id', id)

    fetchTasks()
  }

  const pending = tasks.filter(t => t.status === 'Pending')
  const progress = tasks.filter(t => t.status === 'In Progress')
  const completed = tasks.filter(t => t.status === 'Completed')

  if (!user) return null

  return (

    <div className="task-page">

      <div className="task-topbar">
        <div>
          <h1>Task Manager</h1>
          <p>Internal workflow system</p>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem('taskUser')
            window.location.href = '/tasks/login'
          }}
        >
          Logout
        </button>
      </div>

      {/* CREATE */}
      {user.role === 'admin' && (
        <div className="create-task-card">

          <h2>Create Task</h2>

          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />

          <div className="form-row">
            <select value={priority} onChange={e => setPriority(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>

          <button className="create-btn" onClick={createTask}>
            Create Task
          </button>

        </div>
      )}

      {/* STATS (NOW CORRECT) */}
      <div className="task-stats">

        <div className="stat-card">
          <h2>{tasks.length}</h2>
          <span>Total</span>
        </div>

        <div className="stat-card">
          <h2>{pending.length}</h2>
          <span>Pending</span>
        </div>

        <div className="stat-card">
          <h2>{progress.length}</h2>
          <span>In Progress</span>
        </div>

        <div className="stat-card">
          <h2>{completed.length}</h2>
          <span>Completed</span>
        </div>

      </div>

      {/* BOARD */}
      <div className="kanban-board">

        <Column title="Pending" tasks={pending} onOpen={setSelectedTask} />
        <Column title="In Progress" tasks={progress} onOpen={setSelectedTask} />
        <Column title="Completed" tasks={completed} onOpen={setSelectedTask} />

      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          user={user}
          onClose={() => setSelectedTask(null)}
          refresh={fetchTasks}
        />
      )}

    </div>
  )
}

function Column({ title, tasks, onOpen }) {

  return (
    <div className="task-column">
      <h2>{title}</h2>

      {tasks.map(task => (
        <div
          key={task.id}
          className="task-card"
          onClick={() => onOpen(task)}
        >
          <span className={`priority-badge ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>

          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <small>Due: {task.due_date || 'None'}</small>
        </div>
      ))}

    </div>
  )
}
function TaskModal({ task, user, onClose, refresh }) {

  const [status, setStatus] = useState(task.status)
  const [comment, setComment] = useState('')
  const [file, setFile] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    loadHistory()
  }, [])

  async function loadHistory() {

    const { data } = await supabase
      .from('task_updates')
      .select('*')
      .eq('task_id', task.id)
      .order('created_at', { ascending: true })

    setHistory(data || [])
  }

  async function uploadFile() {

    if (!file) return null

    const filename = `${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from('media')
      .upload(filename, file)

    if (error) return null

    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(filename)

    return data.publicUrl
  }

  async function submitUpdate() {

    const fileUrl = await uploadFile()

    await supabase.from('task_updates').insert([{
      task_id: task.id,
      author: user.role,
      comment,
      status,
      file_url: fileUrl
    }])

    // 🔴 IMPORTANT: update MASTER TASK STATUS
    await supabase
      .from('tasks')
      .update({ status })
      .eq('id', task.id)

    setComment('')
    setFile(null)

    loadHistory()
    refresh()
  }

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>{task.title}</h2>

        <p>{task.description}</p>

        <div className="timeline">

          {history.map(h => (

            <div className="timeline-item" key={h.id}>

              <strong>{h.author}</strong>
              <p>{h.comment}</p>

              {h.file_url && (
                <a href={h.file_url} target="_blank">
                  View File
                </a>
              )}

              <small>{h.status}</small>

            </div>
          ))}

        </div>

        {user.role === 'ba' && (

          <>

            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <textarea
              placeholder="Add update"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />

            <input
              type="file"
              onChange={e => setFile(e.target.files[0])}
            />

            <button onClick={submitUpdate}>
              Submit Update
            </button>

          </>
        )}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>

      </div>

    </div>
  )
}