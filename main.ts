namespace SpriteKind {
    export const Prop = SpriteKind.create()
}

function displayText(text: string, color: Color = Color.None) {
    gameText.setText(text)
    gameText.setOutline(1, color)
    gameText.setPosition(80, 30)
}

function checkPlayerInput(button: Button) {
    if (playerTurn == true) {
        let answer: Button = sequence[currentSequenceIndex]
        buttonSprite.setImage(buttonImgs[button])

        if (button == answer) {
            // Correct
            correct()
        }
        else {
            // Wrong
            wrong(answer)
        }
    }
}

function correct() {
    currentSequenceIndex++
    music.baDing.play()
    if (currentSequenceIndex == sequence.length) {
        playerTurn = false
        info.changeScoreBy(1)
        displayText("Nice job!", Color.Green)
        music.magicWand.playUntilDone()
        pause(1000)
        beginNextRound()
    }
}

function wrong(correctButton: Button) {
    playerTurn = false
    displayText("Wrong!", Color.Red)
    music.buzzer.play()
    pause(1000)
    displayText("The correct one is...", Color.Red)
    buttonSprite.setImage(buttonImgs[correctButton])
    pause(2000)

    game.over(info.score() >= info.highScore())
}

function beginNextRound() {
    sequenceSize++
    currentSequenceIndex = 0
    sequence = []
    buttonSprite.setImage(assets.image`QuestionMark`)

    playerTurn = false
    displayText("Watch and remember!")
    pause(1000)

    for (let index = 0; index < sequenceSize; index++) {
        let newButtonIndex = randint(0, buttons.length - 1)
        let newButtonImg = buttonImgs[newButtonIndex]
        sequence.push(newButtonIndex)
        buttonSprite.setImage(newButtonImg)
        buttonSprite.setFlag(SpriteFlag.Invisible, false)
        music.zapped.play()
        pause(500)
        buttonSprite.setFlag(SpriteFlag.Invisible, true)
        pause(250)
    }

    pause(500)
    buttonSprite.setFlag(SpriteFlag.Invisible, false)
    displayText("Repeat the pattern!")
    buttonSprite.setImage(assets.image`QuestionMark`)
    playerTurn = true
}

function connectButton(controllerButton: controller.Button, inputButton: Button) {
    controllerButton.onEvent(ControllerButtonEvent.Pressed, function () {
        if (controllerButton.isPressed()) {
            checkPlayerInput(inputButton)
        }
    })
}

let buttonImgs: Image[] = [
    assets.image`A`,
    assets.image`B`,
    assets.image`Up`,
    assets.image`Down`,
    assets.image`Left`,
    assets.image`Right`
]

let buttons: Button[] = [
    Button.A,
    Button.B,
    Button.Up,
    Button.Down,
    Button.Left,
    Button.Right
]

let playerTurn: boolean = false
let sequenceSize: number = 0
let currentSequenceIndex: number = 0
let sequence: Button[] = []

let gameText: TextSprite = textsprite.create("")
let buttonSprite: Sprite = sprites.create(assets.image`QuestionMark`, SpriteKind.Prop)

connectButton(controller.A, Button.A)
connectButton(controller.B, Button.B)
connectButton(controller.up, Button.Up)
connectButton(controller.down, Button.Down)
connectButton(controller.left, Button.Left)
connectButton(controller.right, Button.Right)

info.setScore(0)
game.showLongText("Watch the pattern and memorize it!\nRepeat it using buttons!", DialogLayout.Full)
beginNextRound()