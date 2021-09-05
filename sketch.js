var robot1
var robotImg, coin, coinImg, jungle
var waterPuddle, puddleImg, coinGroup, puddleGroup
var fuel, fuelImg, fuelGroup
var finishLine, finishLineImg
var bg_music, robotstep, robotglitch
var gameState = 3
var PLAY = 0
var END=1
var WIN=2
var SERVE = 3
var score = 0
var lives = 3
function preload(){
  robotImg = loadImage("robot.png")
  Bg_img = loadImage("background.jpg")
  coinImg = loadImage("coin.png")
  puddleImg= loadImage("waterPuddle.png")

  fuelImg = loadImage("fuel.png")
  finishLineImg = loadImage("Finishline.png")

  bg_music = loadSound("bg_music.mp3")

  robotglitch = loadSound("glitch.wav")

  robotstep = loadSound("robotStep.wav")
}

function setup() {
  createCanvas(800,800);
  robot1 = createSprite(400, 700)
  robot1.addImage(robotImg)
  robot1.scale = 0.8
  
  bg_music.loop()


 finishLine = height*6-100
  
  
  coinGroup = createGroup()
  puddleGroup = createGroup()
  fuelGroup = createGroup()
;
}

function draw() {
  background("gray");  
  image(Bg_img, 0, -height * 5, width, height * 6);
 
  if(gameState === PLAY){

  if(robot1.y<-4000){
    gameState = WIN
  }
  if(keyDown("up")){
    robot1.y-=5
    camera.position.y = robot1.position.y
    spawnCoins()
    spawnPuddles()
    spawnFuel()

  }
 
  if(keyDown("right")){
    robot1.x+=5
  }
  if(keyDown("left")){
    robot1.x-=5
  }
  if(robot1.isTouching(puddleGroup)){
    puddleGroup.destroyEach()
    score-=1
    lives-=1
    robotglitch.play()
  } if(robot1.isTouching(coinGroup)){
    coinGroup.destroyEach()
    score+=1
 
  }
  if(robot1.isTouching(fuelGroup)){
    fuelGroup.destroyEach()
    lives+=1
 
  }
  if(lives<=0){
    gameState = END
  }
}

  drawSprites();
  if(keyDown("r")){
    gameState = PLAY
    }
  if(gameState === SERVE){
    fill("green")
    textSize(30)
    textAlign(CENTER)
    text("The city is holding a competition for ", 400,200)
    text("for its eco friendly tree planter robot",400,250)
    text("whoever drives the robot the best becomes the",400,300)
    text("head driver for the tree planter robot!",400,350)
    text("Press r to continue",400,400)
  
  }
  textSize(30)
  fill("black")
  text("Score: "+ score, width-800, robot1.y-200)
  textSize(30)
  fill("black")
  text("Lives: "+ lives, width-200, robot1.y-200)
  if(gameState === END){
    alert("GAME OVER")
  }
  if(gameState === WIN){
    alert("You WIN!!")
  }

}
function spawnCoins(){
  if(frameCount%120 === 0){
    coin = createSprite(random(250,600),random(robot1.y -800,robot1.y-500))
    coin.addImage(coinImg)
    coin.scale = 0.3
    coinGroup.add(coin)
  }
}
function spawnPuddles(){
  if(frameCount%77 === 0){
    waterPuddle = createSprite(random(200,500),random(robot1.y -800,robot1.y-500))
    waterPuddle.addImage(puddleImg)
    waterPuddle.scale = 0.3
    puddleGroup.add(waterPuddle)
  }
}
function spawnFuel(){
  if(frameCount%105 === 0){
    fuel = createSprite(random(200,500),random(robot1.y -800,robot1.y-500))
    fuel.addImage(fuelImg)
    fuel.scale = 0.03
    fuelGroup.add(fuel)
  }
}