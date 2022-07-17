//Player Class
class Player {
    constructor(character, operator, difficulty) {
        this.character = character
        this.operator = operator
        this.difficulty = difficulty
    }
    //Character functions

}

//Game Object
let num1 = null
let num2 = null
let correctAnswer = null
let timerInterval = null

let game = {
    //Game Functions
    startButton () {
        startScreen.style.display = "none"
        characterSelectScreen.style.display = "flex"
        player1 = new Player("", "", "")
        player2 = new Player("", "", "")
    },
    fightButton () {
        while (player1.character === "" || player1.operator === "") {
            alert(`Please choose both a character and operator!`)
            return
        }
        characterSelectScreen.style.display = "none"
        gameScreen.style.display = "flex"
        problemBox.style.display = "flex"
        nextButton.style.display = "block"
        if (player1.character === "male") {
            player1Character.setAttribute("src", "../assets/images/male-idle.gif")
            player2Character.setAttribute("src", "../assets/images/female-idle.gif")
        }
        else {
            player1Character.setAttribute("src", "../assets/images/female-idle.gif")
            player2Character.setAttribute("src", "../assets/images/male-idle.gif")
        }
    },
    generateProblems () {
        timerNumber.innerText = 10
        if(player1.operator === "addition") {
            num1 = Math.round(Math.random() * 10)
            num2 = Math.round(Math.random() * 10)
            problemText.innerText = `${num1} + ${num2} = ?`
            correctAnswer = num1 + num2
        }
        else if(player1.operator === "subtraction") {
            num1 = Math.round(Math.random() * 10)
            num2 = Math.round(Math.random() * 10)
            while(num1 < num2) {
                num2 = Math.round(Math.random() * 10)
            }
            problemText.innerText = `${num1} - ${num2} = ?`
            correctAnswer = num1 - num2
        }
        else if(player1.operator === "multiplication") {
            num1 = Math.round(Math.random() * 10)
            num2 = Math.round(Math.random() * 10)
            problemText.innerText = `${num1} x ${num2} = ?`
            correctAnswer = num1 * num2
        }
        else if(player1.operator === "division") {
            while(num1 % num2 !== 0 || num2 === 0) {
                num1 = Math.round(Math.random() * 10)
                num2 = Math.round(Math.random() * 10)
            }
            problemText.innerText = `${num1} ÷ ${num2} = ?`
            correctAnswer = num1 / num2
        }
        else if(player1.operator === "all") {
            let randomOperator = Math.round(Math.random() * 3)
            if(randomOperator === 0) {
                num1 = Math.round(Math.random() * 10)
                num2 = Math.round(Math.random() * 10)
                problemText.innerText = `${num1} + ${num2} = ?`
                correctAnswer = num1 + num2
            }
            else if(randomOperator === 1) {
                num1 = Math.round(Math.random() * 10)
                num2 = Math.round(Math.random() * 10)
                while(num1 < num2) {
                    num2 = Math.round(Math.random() * 10)
                }
                problemText.innerText = `${num1} - ${num2} = ?`
                correctAnswer = num1 - num2
            }
            else if(randomOperator === 2) {
                num1 = Math.round(Math.random() * 10)
                num2 = Math.round(Math.random() * 10)
                problemText.innerText = `${num1} x ${num2} = ?`
                correctAnswer = num1 * num2
            }
            else if(randomOperator ===3) {
                while(num1 % num2 !== 0 || num2 === 0) {
                    num1 = Math.round(Math.random() * 10)
                    num2 = Math.round(Math.random() * 10)
                }
                problemText.innerText = `${num1} ÷ ${num2} = ?`
                correctAnswer = num1 / num2
            }
        }
        timerInterval = setInterval(() => {
            timerNumber.innerText = parseInt(timerNumber.innerText) - 1
            if(timerNumber.innerText === "0") {
                clearInterval(timerInterval)
                answerSpace.style.display = "none"
                submitButton.style.display = "none"
                problemText.innerText = "You ran out of time!"
                nextButton.style.display = "block"
            }
        },1000)

    },
    solveProblem () {
        let answerNumber = parseInt(document.querySelector("#answer").value)
        answerSpace.style.display = "none"
        submitButton.style.display = "none"
        nextButton.disabled = true
        nextButton.style.display = "block"
        if(answerNumber === correctAnswer) {
            problemText.innerText = "Correct!"
            setTimeout(() => {
                let newplayer2HPNumber = parseInt(player2HPNumber.innerText) - 10
                player2HPNumber.innerText = newplayer2HPNumber
                player2HPFill.style.width = `${newplayer2HPNumber}%`
                nextButton.disabled = false
            }, 1000)
        }
        else {
            problemText.innerText = "Incorrect! You lose your turn."
            nextButton.disabled = false
            nextButton.style.display = "block"
        }
    }
}


//DOM Elements

//EVENT LISTENER CONFIRMATION SOUND
//============================================================
const ding = new Audio("assets/sounds/ding.mp3")
//============================================================

const startScreen = document.querySelector(".start-screen")
const startButton = document.querySelector("#start-button")

const characterSelectScreen = document.querySelector(".character-select-screen")
const maleIdle = document.querySelector("#male-idle")
const femaleIdle = document.querySelector("#female-idle")
const chooseAddition = document.querySelector("#choose-addition")
const chooseSubtraction = document.querySelector("#choose-subtraction")
const chooseMultiplication = document.querySelector("#choose-multiplication")
const chooseDivision = document.querySelector("#choose-division")
const chooseAll = document.querySelector("#choose-all")
const fightButton = document.querySelector("#fight-button")

const gameScreen = document.querySelector(".game-screen")
const problemBox = document.querySelector(".problem-box")
const problemText = document.querySelector("#problem-text")
const answerSpace = document.querySelector(".answer-space")
const answer = document.querySelector("#answer")
const submitButton = document.querySelector("#submit-button")
const nextButton = document.querySelector("#next-button")
const player1Character = document.querySelector("#player1-character")
const player2Character = document.querySelector("#player2-character")
const player1HPFill = document.querySelector("#player1-hp-fill")
const player1HPNumber = document.querySelector("#player1-hp-number")
const player2HPFill = document.querySelector("#player2-hp-fill")
const player2HPNumber = document.querySelector("#player2-hp-number")
const timerNumber = document.querySelector("#timer-number")


//Event Listeners
startButton.addEventListener("click", () => {
    game.startButton()
})
maleIdle.addEventListener("click", () => {
    ding.play()
    femaleIdle.setAttribute("id", "female-idle")
    maleIdle.setAttribute("id", "chosen-character")
    player1.character = "male"
})
femaleIdle.addEventListener("click", () => {
    ding.play()
    maleIdle.setAttribute("id", "male-idle")
    femaleIdle.setAttribute("id", "chosen-character")
    player1.character = "female"
})
chooseAddition.addEventListener("click", () => {
    ding.play()
    chooseSubtraction.setAttribute("id", "choose-subtraction")
    chooseMultiplication.setAttribute("id", "choose-multiplication")
    chooseDivision.setAttribute("id", "choose-division")
    chooseAll.setAttribute("id", "choose-all")
    chooseAddition.setAttribute("id", "chosen-operator")
    player1.operator = "addition"
})
chooseSubtraction.addEventListener("click", () => {
    ding.play()
    chooseAddition.setAttribute("id", "choose-addition")
    chooseMultiplication.setAttribute("id", "choose-multiplication")
    chooseDivision.setAttribute("id", "choose-division")
    chooseAll.setAttribute("id", "choose-all")
    chooseSubtraction.setAttribute("id", "chosen-operator")
    player1.operator = "subtraction"
})
chooseMultiplication.addEventListener("click", () => {
    ding.play()
    chooseAddition.setAttribute("id", "choose-addition")
    chooseSubtraction.setAttribute("id", "choose-subtraction")
    chooseDivision.setAttribute("id", "choose-division")
    chooseAll.setAttribute("id", "choose-all")
    chooseMultiplication.setAttribute("id", "chosen-operator")
    player1.operator = "multiplication"
})
chooseDivision.addEventListener("click", () => {
    ding.play()
    chooseAddition.setAttribute("id", "choose-addition")
    chooseSubtraction.setAttribute("id", "choose-subtraction")
    chooseMultiplication.setAttribute("id", "choose-multiplication")
    chooseAll.setAttribute("id", "choose-all")
    chooseDivision.setAttribute("id", "chosen-operator")
    player1.operator = "division"
})
chooseAll.addEventListener("click", () => {
    ding.play()
    chooseAddition.setAttribute("id", "choose-addition")
    chooseSubtraction.setAttribute("id", "choose-subtraction")
    chooseMultiplication.setAttribute("id", "choose-multiplication")
    chooseDivision.setAttribute("id", "choose-division")
    chooseAll.setAttribute("id", "chosen-operator")
    player1.operator = "all"
})
fightButton.addEventListener("click", () => {
    ding.play()
    game.fightButton()
})
submitButton.addEventListener("click", () => {
    clearInterval(timerInterval)
    game.solveProblem()
})
nextButton.addEventListener("click", () => {
    num1 = null
    num2 = null
    correctAnswer = null
    timerInterval = null
    document.querySelector("#answer").value = ""
    nextButton.style.display = "none"
    answerSpace.style.display = "flex"
    submitButton.style.display = "block"
    game.generateProblems()
})