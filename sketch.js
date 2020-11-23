var backGround,backGroundImage;
var ironMan,ironManImage;
var ironManSound;
var obstacle,obstacleImage;
var meteor,meteorImage;
var obstacleGroup,meteorGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
 
  backGroundImage = loadImage("space image.png");
  ironManImage = loadImage("iron man Image.png");
  obstacleImage = loadImage("170418-asteroid-mn-0730_b2c1f54812269d7ea29e5890b0c2b173[501].jpg");
  meteorImage = loadImage("comet[502].jpg");
  ironManSound = loadSound("Recording (11).m4a")
}

function setup(){
  createCanvas(500,600);
  
  // creating trex
  backGround = createSprite(200,200,20,50);
  backGround.addAnimation("running",backGroundImage);
  backGround.velocityY=15;
  
  //Creating ironman sprite
  ironMan=createSprite(250,480,20,20);
  ironMan.addImage("flying",ironManImage);
  ironMan.scale=0.5;
  ironMan.velocityX=0;
  
  //adding new groups for meteors and asteroids
  obstacleGroup = createGroup();
  meteorGroup = createGroup();
}
function draw(){
  //setting background as black
    background(0);
  
  //ressetting the background of space
  if (backGround.y>600){
    backGround.x=200;
    backGround.y=200;
  }
  
  //adding functionalities when gameState is play
  if (gameState===PLAY){
    
    //ironManSound.play();

    //adding movements to iron man 
    if(keyDown("right")){
      ironMan.x=ironMan.x+16;
    }
  
    if(keyDown("left")){
      ironMan.x=ironMan.x+-16;
    }
  
    if(keyDown("up")){
      ironMan.y=ironMan.y+-16;
    }
    
    if(keyDown("down")){
      ironMan.y=ironMan.y+16;
    }
    
    //creating asteroids and meteors and calling them in draw      function
    ASTEROIDS();
    METEORS();
    
    //adding gameState as end when it touches obstacle
  if(obstacleGroup.isTouching(ironMan)){
    gameState=END;
    }
  }
  
  //adding functionalities in end state
  if(gameState===END){
    backGround.velocityY=0;
    meteorGroup.destroyEach();
    obstacleGroup.destroyEach();
    ironMan.x=250;
  }
  
  drawSprites();
  
  //displaying text when game state is over
  if(gameState===END){
    stroke("white");
    textSize(20);
    fill("white");
    text("GAME OVER",200,250);
  }
}


function ASTEROIDS(){
  
  if(frameCount%150===0){
    obstacle = createSprite(200,-100,10,10);
    obstacle.velocityY=16;
    obstacle.addImage("asteroid",obstacleImage);
    obstacle.scale=0.1;
    obstacle.x=Math.round(random(10,480));
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
    
  }
  
  
  
}

function METEORS(){
  if(frameCount%50===0){
    meteor = createSprite(200,-100,10,10);
    meteor.velocityY=106;
    meteor.addImage("meteors",meteorImage);
    meteor.scale=0.1;
    meteor.x=Math.round(random(10,480));
    meteor.lifetime=100;
    meteorGroup.add(meteor);
    
  }
  
}