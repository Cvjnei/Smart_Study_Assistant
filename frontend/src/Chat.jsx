import { useState } from "react"

function Chat({ token }) {
  const [message, setMessage] = useState("")
  const [replies, setReplies] = useState([])
  const [loading, setLoading] = useState(false)

  function sendMessage() {
    if (!message) return
    setLoading(true)
    fetch("http://127.0.0.1:8000/api/chat/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
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