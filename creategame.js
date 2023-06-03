var lamp, aladinBackgroundImg, aladinBackground, genie, genieImg
var score = 0
var invisibleFloor
var lampG
var END = 0;
var PLAY = 1
var gameState = PLAY;


function preload() {
    aladinBackgroundImg = loadAnimation("bg.png")
    genieImg = loadImage("genie.png")
    lampImg = loadImage("lamp.png")
}

function setup() {
    createCanvas(1000, 600)

    aladinBackground = createSprite(width / 2, height / 2 + 100, width, height);
    aladinBackground.addAnimation("ground", aladinBackgroundImg);


    genie = createSprite(70, 300, 20, 20);
    genie.addImage("floating", genieImg)
    genie.scale = 0.15

    invisibleFloor = createSprite(500, 600, 1000 ,5)

    lampG = createGroup()
    score = 0
}

function draw() {

    background("180")

    text("Score: " + score, 600, 350);
    text("Game Over" ,600,380)
    


    if (gameState === PLAY) {
        score = score + Math.round(getFrameRate() / 60)
        spawnLamps();
        genie.velocityY = genie.velocityY + 0.8
        aladinBackground.velocityX = -2

        if (aladinBackground.x < 400) {
            aladinBackground.x = width / 2
        }
        if (keyDown("space") && genie.y >= 200) {
            genie.velocityY = -10;
        }

       

        if (lampG.isTouching(genie) || genie.isTouching(invisibleFloor)) {
            gameState = END;
        }

    } else if (gameState === END) {
        
        background.setVelocity(0)
        lampG.setVelocityXEach(0);
        genie.velocity = 0
        lampG.setLifetimeEach(-1)
       
    }



    createEdgeSprites();
    drawSprites();

}
function spawnLamps() {
    if (frameCount % 90 === 0) {
        var lamp = createSprite(width, 100, 40, 10);
        lamp.y = Math.round(random(10, 500));
        lamp.addImage(lampImg);
        lamp.scale = 0.1;
        lamp.velocityX = -4;
        lamp.lifetime = 300;
        lampG.add(lamp);
    }
}