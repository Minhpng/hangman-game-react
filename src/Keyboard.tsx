import style from "./Keyboard.module.css"

const KEYS = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
]
type KeyboardProps = {
	activeLetters: string[]
	incorrectLetters: string[]
	addGuessedLetter: (letter: string) => void
}
export function Keyboard({ activeLetters, incorrectLetters, addGuessedLetter }: KeyboardProps) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
				gap: "0.5rem",
				alignSelf: "stretch",
			}}>
			{KEYS.map((key) => {
				const isActive = activeLetters.includes(key)
				const isInactive = incorrectLetters.includes(key)
				return (
					<button
						onClick={() => addGuessedLetter(key)}
						className={`
						${style.btn}
						${isActive ? style.active : ""}
						${isInactive ? style.inactive : ""}
					`}
						disabled={isInactive || isActive}
						key={key}>
						{key}
					</button>
				)
			})}
		</div>
	)
}
