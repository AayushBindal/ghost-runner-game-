var PLAY = 1;
var END = 0;
var gameState = PLAY;

var background1;
var background2;

var gameOver;
var gameOverImage;

var invisible;
var invisibleGroup;

var ghost;
var ghost1;

var door1 , climber1;
var door2 , climber2;
var doorGroup , climberGroup;

function preload(){
  background2 = loadImage("tower.png");
  door2 = loadImage("image-removebg-preview.png");
  climber2 = loadImage("climber.png");
  ghost = loadImage("ghost-standing.png");
  gameOverImage = loadImage("image-removebg-preview (2).png");
}

function setup(){
  createCanvas(600,600);
  background1 = createSprite(300,300);
  background1.addImage("background",background2);
  background1.velocityY = 2;
  
  ghost1 = createSprite(300,200);
  ghost1.addImage("ghost",ghost);
  ghost1.scale = 0.4;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
}

function draw(){
  background("Darkblue");
  if(gameState === PLAY){
   
  if(keyDown("space")){
    ghost1.velocityY = -9;
  }
    
  if(keyDown(LEFT_ARROW)){
    ghost1.x = ghost1.x -2;
  }
  if(keyDown(RIGHT_ARROW)){
    ghost1.x = ghost1.x +2;
  }
  if(ghost1.isTouching(climberGroup)){
     ghost1.velocityY = 0;
  }
    
  if(background1.y>400){
     background1.y = 300;
     }
    
  doors();
    
    if(invisibleGroup.isTouching(ghost1) || ghost1.y >600){
      ghost1.destroy();
      gameState = END;
    }
    
    camera.position.x = 300;
    camera.position.y = ghost1.y;
    
  drawSprites();
  
  }
  else if(gameState === END){
    textSize(20);
    gameOver = createSprite(300 ,500);
    gameOver.addImage(gameOverImage);
    drawSprites();
    camera.position.x = gameOver.x;
    camera.position.y = mouseY;
  }

  ghost1.velocityY = ghost1.velocityY +1;

}
function doors(){
  if(frameCount % 200 === 0){
    door1 = createSprite(Math.round(random(120,400)),-1);
    door1.addImage("door",door2);
    
    climber1 = createSprite(door1.x,50);
    climber1.addImage("climber",climber2);
    climber1.velocityY = 2;
    
    invisible = createSprite(climber1.x,60,climber1.width,5);
    invisible.velocityY = 2;
    invisible.visible = false;
    
    ghost1.depth = door1.depth +1;
    
    climber1.lifetime = 280;
    
    door1.lifetime = 300;
    door1.velocityY = 2;
    
    doorGroup.add(door1);
    climberGroup.add(climber1);
    invisibleGroup.add(invisible);
  }
}