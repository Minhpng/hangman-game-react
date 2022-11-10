import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import words from "./wordList.json"

function setWord() {
	return words[Math.floor(Math.random() * words.length)]
}

function App() {
	const [wordToGuess, setWordToGuess] = useState(setWord())
	const [guessedLetters, setGuessedLetters] = useState<string[]>([])

	const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter))

	const isLoser = incorrectLetters.length >= 6
	const isWinner = wordToGuess.split("").every((letter) => guessedLetters.includes(letter))

	const addGuessedLetter = useCallback(
		(letter: string) => {
			if (guessedLetters.includes(letter) || isLoser || isWinner) return
			console.log(`loser: ${isLoser}, winner: ${isWinner}`)

			setGuessedLetters((currentGuessed) => {
				return [...currentGuessed, letter]
			})
		},
		[guessedLetters, isLoser, isWinner]
	)

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key

			if (!key.match(/^[a-z]$/)) return

			e.preventDefault()

			addGuessedLetter(key)
		}

		document.addEventListener("keypress", handler)

		return () => {
			document.removeEventListener("keypress", handler)
		}
	}, [guessedLetters])

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key

			if (key !== "Enter") return
			if (isLoser || isWinner) {
				e.preventDefault()

				setWordToGuess(setWord())
				setGuessedLetters([])
			}
		}
		document.addEventListener("keypress", handler)

		return () => {
			document.removeEventListener("keypress", handler)
		}
	}, [isLoser, isWinner])

	const isReset = isLoser || isWinner

	const resetBtn = useCallback(() => {
		setWordToGuess(setWord())
		setGuessedLetters([])
	}, [])

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
			<div style={{ fontSize: "2rem", textAlign: "center" }}>
				{isWinner && "Winner! - Refresh to try again"}
				{isLoser && "Nice try! - Refresh to try again"}
			</div>
			<HangmanDrawing numberOfGuess={incorrectLetters.length} />
			<HangmanWord reveal={isLoser} wordToGuess={wordToGuess} guessedLetters={guessedLetters} />
			<Keyboard
				disabled={isLoser || isWinner}
				activeLetters={guessedLetters.filter((letter) => wordToGuess.includes(letter))}
				incorrectLetters={incorrectLetters}
				addGuessedLetter={addGuessedLetter}
			/>
			{isReset && <button onClick={resetBtn}>Reset</button>}
		</div>
	)
}

export default App
