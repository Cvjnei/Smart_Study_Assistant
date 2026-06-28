import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import Chat from "./Chat"

function Dashboard({ token, onLogout }) {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  function loadNotes() {
    fetch("http://127.0.0.1:8000/api/notes/", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setNotes(data))
  }

  function createNote() {
    fetch("http://127.0.0.1:8000/api/notes/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(() => {
        setTitle("")
        setContent("")
        loadNotes()
      })
    }

  return (
    <div>
      <h1>Smart Study Assistant</h1>
      <button onClick={onLogout}>Logout</button>
      <Chat token={token} />
      <h2>Create Note</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={createNote}>Save Note</button>
      <h2>Notes</h2>
      <button onClick={loadNotes}>Load Notes</button>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.title}: {note.content}</li>
        ))}
      </ul>
    </div>
  )
}


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [page, setPage] = useState("login")

function handleLogin(accessToken) {
  localStorage.setItem("token", accessToken)
  setToken(accessToken)
}

function handleLogout() {
  localStorage.removeItem("token")
  setToken(null)
  setPage("login")
}

  if (token) {
    return <Dashboard token={token} onLogout={handleLogout} />
  }

  return (
    <div>
      <h1>Smart Study Assistant</h1>
      {page === "login" && (
        <>
          <Login onLogin={handleLogin} />
          <p>Don't have an account? <button onClick={() => setPage("register")}>Register</button></p>
        </>
      )}
      {page === "register" && (
        <>
          <Register onRegister={() => setPage("login")} />
          <p>Already have an account? <button onClick={() => setPage("login")}>Login</button></p>
        </>
      )}
    </div>
  )
}

export default App