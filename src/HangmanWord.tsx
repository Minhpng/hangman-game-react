type HangmanWordProps = {
	reveal: boolean
	wordToGuess: string
	guessedLetters: string[]
}

export function HangmanWord({ wordToGuess, guessedLetters, reveal }: HangmanWordProps) {
	return (
		<div
			style={{
				display: "flex",
				gap: ".25em",
				fontSize: "6rem",
				fontFamily: "monospace",
				fontWeight: "bold",
				textTransform: "uppercase",
			}}>
			{wordToGuess.split("").map((letter, index) => {
				return (
					<span key={index} style={{ borderBottom: "0.1em solid black" }}>
						<span
							style={{
								visibility: guessedLetters.includes(letter) || reveal ? "visible" : "hidden",
								color: !guessedLetters.includes(letter) ? "red" : "black",
							}}>
							{letter}
						</span>
					</span>
				)
			})}
		</div>
	)
}
