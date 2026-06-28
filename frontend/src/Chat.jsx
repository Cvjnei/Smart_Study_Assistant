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
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-4">AI Study Assistant</h2>
      <select
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedNote}
        onChange={e => setSelectedNote(e.target.value)}
      >
        <option value="">No note selected (general question)</option>
        {notes.map(note => (
          <option key={note.id} value={note.id}>{note.title}</option>
        ))}
      </select>
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask a study question..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
      <div className="space-y-4">
        {replies.map((r, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800 mb-2">You: {r.question}</p>
            <p className="text-gray-600">AI: {r.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chat