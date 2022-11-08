import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import words from "./wordList.json"

function App() {
	const [wordToGuess, setWordToGuess] = useState(() => {
		return words[Math.floor(Math.random() * words.length)]
	})

	const [guessedLetters, setGuessedLetters] = useState<string[]>([])

	const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter))

	// const addGuessedLetter = useCallback(
	// 	(letter: string) => {
	// 		console.log(guessedLetters)
	// 		if (guessedLetters.includes(letter)) return

	// 		setGuessedLetters((currentLetter) => [...currentLetter, letter])
	// 	},
	// 	[guessedLetters]
	// )

	function addGuessedLetter(letter: string) {
		if (guessedLetters.includes(letter)) return
		console.log(guessedLetters)

		setGuessedLetters((currentLetter) => [...currentLetter, letter])
	}

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key

			if (!key.match(/^[a-z]$/)) return

			e.preventDefault()

			addGuessedLetter(key)
		}

		document.addEventListener("keypress", handler)
		console.log("inEffect")

		return () => {
			console.log("outEffect")

			document.removeEventListener("keypress", handler)
		}
	}, [guessedLetters])

	return (
		<div
			style={{
				maxWidth: "800px",
				display: "flex",
				flexDirection: "column",
				gap: "2rem",
				margin: "0 auto",
				alignItems: "center",
			}}>
			<div style={{ fontSize: "2rem", textAlign: "center" }}>Lose win state</div>
			<HangmanDrawing numberOfGuesses={incorrectLetters.length} />
			<HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
			<Keyboard />
		</div>
	)
}

export default App
