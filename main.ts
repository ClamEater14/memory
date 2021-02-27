let inputImgs: Image[] = [
    assets.image`A`,
    assets.image`B`,
    assets.image`Up`,
    assets.image`Down`,
    assets.image`Left`,
    assets.image`Right`
]

let inputTypes: (controller.Button)[] = [
    controller.A,
    controller.B,
    controller.up,
    controller.down,
    controller.left,
    controller.right
]

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
	
})

function addPlayerInput (inputType: number) {
	
}

function beginNextRound () {
    for (let index = 0; index < sequenceSize; index++) {
        let chosenInputIndex: number = randint(0, inputTypes.length - 1)
        let chosenInput: controller.Button = inputTypes[chosenInputIndex]
        let chosenInputImg: Image = inputImgs[chosenInputIndex]
        sequence.push(chosenInput)
        inputSprite.setImage(chosenInputImg)
    }
}

let sequenceSize: number = 1

let currentSequenceIndex = 0
let sequence: (controller.Button)[] = []
let playerSequence: number[] = []

let textSprite: TextSprite = textsprite.create("Watch & Remember!")
textSprite.setPosition(80, 30)
let inputSprite: Sprite = sprites.create(img`
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . . . . . . . . . . . 1 1 . . 
    . . . . . . . . . . . . 1 1 . . 
    . . . . . . . . . . . . 1 1 . . 
    . . . . . . . . . . . . 1 1 . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    `, 0)
beginNextRound()
 