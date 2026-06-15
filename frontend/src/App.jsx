import { useState, useEffect } from "react"

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [input, setInput] = useState("")
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/notes/")
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  function addFlashcard() {
    if (input === "") return
    setFlashcards([...flashcards, input])
    setInput("")
  }

  function deleteFlashcard(index) {
    setFlashcards(flashcards.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h1>Smart Study Assistant</h1>

      <h2>Flashcards</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a flashcard"
      />
      <button onClick={addFlashcard}>Add</button>

      <ul>
        {flashcards.map((card, index) => (
          <li key={index}>
            {card}
            <button onClick={() => deleteFlashcard(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Notes (from Django)</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.title}: {note.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default App