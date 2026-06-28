import { useState } from "react"

function Chat({ token, notes }) {
  const [message, setMessage] = useState("")
  const [replies, setReplies] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedNote, setSelectedNote] = useState("")

  function sendMessage() {
    if (!message) return
    setLoading(true)

    const body = { message }
    if (selectedNote) body.note_id = selectedNote

    fetch("http://127.0.0.1:8000/api/chat/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        setReplies([...replies, { question: message, answer: data.reply }])
        setMessage("")
        setLoading(false)
      })
  }

  return (
    <div>
      <h2>AI Study Assistant</h2>
      <select value={selectedNote} onChange={e => setSelectedNote(e.target.value)}>
        <option value="">No note selected (general question)</option>
        {notes.map(note => (
          <option key={note.id} value={note.id}>{note.title}</option>
        ))}
      </select>
      <br />
      <input
        placeholder="Ask a study question..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>
      <div>
        {replies.map((r, i) => (
          <div key={i}>
            <p><strong>You:</strong> {r.question}</p>
            <p><strong>AI:</strong> {r.answer}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chat