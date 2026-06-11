import { useState } from "react"

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [input, setInput] = useState("")

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
    </div>
  )
}

export default App