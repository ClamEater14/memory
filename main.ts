namespace SpriteKind {
    export const Display = SpriteKind.create()
}

let inputImgs: Image[] = [
    assets.image`A`,
    assets.image`B`,
    assets.image`Up`,
    assets.image`Down`,
    assets.image`Left`,
    assets.image`Right`
]

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.A.isPressed())
    {
        checkPlayerInput(Button.A)
    } 
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.B.isPressed())
    {
        checkPlayerInput(Button.B)
    }   
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.up.isPressed())
    {
        checkPlayerInput(Button.Up)
    }  
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.down.isPressed())
    {
        checkPlayerInput(Button.Down)
    }
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.left.isPressed())
    {
        checkPlayerInput(Button.Left)
    }  
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.right.isPressed())
    {
        checkPlayerInput(Button.Right)
    }  
})

function correct() {
    music.baDing.play()
    currentSequenceIndex++

    // if you have reached to the end of the sequence, switch to the next round
    if (currentSequenceIndex == sequenceSize) {
        playerTurn = false
        info.changeScoreBy(1)
        displayText("Nice job!", Color.Green)
        music.magicWand.playUntilDone()
        pause(1000)
        sequenceSize++
        beginNextRound()
    }
}

function wrong(correctButton: number) {
    playerTurn = false
    displayText("Wrong!", Color.Red)
    music.buzzer.playUntilDone()
    pause(1000)
    displayText("The correct one is...", Color.Red)
    inputSprite.setImage(inputImgs[correctButton])
    pause(2000)

    // If you break the record, you win!
    // Otherwise, you lose!
    // You can do this with an "if" statement as well.
    game.over(info.score() >= info.highScore())
}

function displayText(text: string, color: Color = Color.Grey) {
    gameText.setText(text)
    gameText.setOutline(1, color)
    gameText.setPosition(80, 30)
}

function checkPlayerInput(button: number) {
    if (playerTurn == true) {
        let correctButton: number = sequence[currentSequenceIndex]

        inputSprite.setImage(inputImgs[button])
        if (button == correctButton) {
            correct()
        }
        else {
            wrong(correctButton)
        }
    }
}

function beginNextRound() {
    currentSequenceIndex = 0
    sequence = []
    inputSprite.setImage(assets.image`QuestionMark`)
    playerTurn = false
    displayText("Watch & remember!")
    pause(1000)

    for (let index = 0; index < sequenceSize; index++) {
        let chosenInputIndex: number = randint(0, inputImgs.length - 1)
        let chosenInputImg: Image = inputImgs[chosenInputIndex]
        sequence.push(chosenInputIndex)
        inputSprite.setImage(chosenInputImg)
        inputSprite.setFlag(SpriteFlag.Invisible, false)
        music.zapped.play()
        pause(500)
        inputSprite.setFlag(SpriteFlag.Invisible, true)
        pause(250)
    }

    pause(500)
    inputSprite.setFlag(SpriteFlag.Invisible, false)
    displayText("Repeat the pattern!")
    inputSprite.setImage(assets.image`QuestionMark`)
    playerTurn = true
}

let playerTurn: boolean = false
let sequenceSize: number = 1
let currentSequenceIndex: number = 0
let sequence: number[] = []

let gameText: TextSprite = textsprite.create("")
let inputSprite: Sprite = sprites.create(assets.image`QuestionMark`, SpriteKind.Display)

info.setScore(0)
game.showLongText("Watch the pattern and memorize it!\nRepeat it using buttons!", DialogLayout.Full)
beginNextRound() 