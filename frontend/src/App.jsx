import { useState, useEffect } from "react"
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
      .then(res => {
        if (res.status === 401) {
          onLogout()
          return []
        }
        return res.json()
      })
      .then(data => {
        if (Array.isArray(data)) setNotes(data)
      })
  }

  useEffect(() => {
    loadNotes()
  }, [])

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
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Smart Study Assistant</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
          onClick={onLogout}
        >
          Logout
        </button>
      </nav>
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <Chat token={token} notes={notes} />
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Create Note</h2>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            onClick={createNote}
          >
            Save Note
          </button>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">My Notes</h2>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
              onClick={loadNotes}
            >
              Refresh
            </button>
          </div>
          <ul className="space-y-3">
            {notes.map(note => (
              <li key={note.id} className="border border-gray-200 rounded-lg px-4 py-3">
                <p className="font-semibold text-gray-800">{note.title}</p>
                <p className="text-gray-600 text-sm">{note.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Smart Study Assistant</h1>
      {page === "login" && (
        <>
          <Login onLogin={handleLogin} />
          <p className="mt-4 text-gray-600">
            Don't have an account?{" "}
            <button className="text-blue-600 hover:underline font-semibold" onClick={() => setPage("register")}>
              Register
            </button>
          </p>
        </>
      )}
      {page === "register" && (
        <>
          <Register onRegister={() => setPage("login")} />
          <p className="mt-4 text-gray-600">
            Already have an account?{" "}
            <button className="text-blue-600 hover:underline font-semibold" onClick={() => setPage("login")}>
              Login
            </button>
          </p>
        </>
      )}
    </div>
  )
}

export default App