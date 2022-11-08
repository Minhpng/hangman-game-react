type HangmanWordProps = {
	guessedLetters: string[]
	wordToGuess: string
}

export function HangmanWord({ guessedLetters, wordToGuess }: HangmanWordProps) {
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
								visibility: guessedLetters.includes(letter) ? "visible" : "hidden",
							}}>
							{letter}
						</span>
					</span>
				)
			})}
		</div>
	)
}
