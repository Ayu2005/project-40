//creating global variable

var play=0;
var end=1;
var win=2;
var gameState=0;

var score=0;
var ground;
var bgimage;
var runner,runnerImg,collided;

var obstacle1;
var obstImg1,obstImg2,obstImg3;
var obstacles=[];

var gameOver,gameOverImg;
var restart,restartImage;

var obstacleGroup;
var finish,finishImg;
var winningImg;




function preload(){
  
  //loading image
  
 
  
  
  
  
  obstaceImage = loadImage("images/obstacle.png");
  bgimage=loadImage("images/bg3.png");
  runnerImg = loadAnimation("images/r1.png","images/r2.png","images/r3.png","images/r4.png");
  collided = loadAnimation("images/collidedimage.png");
  
  obstImg1=loadImage("images/halloween.png");
  obstImg2=loadImage("images/hat.png");
  obstImg3=loadImage("images/stone.png");

  gameOverImg=loadImage("images/gameOver.png");
  restartImage=loadImage("images/restart.png");

  finishImg = loadImage("images/finish.png");
  winningImg = loadImage("images/winrunner.png");

}



function setup() {
  
  createCanvas(displayWidth,displayHeight);
  
  
 


 
  //creatig sprite for ground
  ground=createSprite(300,displayHeight-180,displayWidth,10);
  ground.velocityX=-5;
  ground.visible=false;


  background=createSprite(10,10,windowWidth,windowHeight);
  background.addImage(bgimage);
  background.velocityX=-10;

  finish=createSprite(displayWidth,displayHeight-290);
  finish.addImage(finishImg);
  finish.setCollider("rectangle",0,0,80,finish.height-50);
  finish.debug=false;
  finish.visible=false;
 
  


  runner = createSprite(displayWidth-displayWidth+100,displayHeight/2,20,30);
  runner.addAnimation("sprite_running",runnerImg);
  runner.addAnimation("sprite_collided",collided);
  runner.addAnimation("sprite_win", winningImg);
  runner.scale=0.5;
  
 

 gameOver=createSprite(displayWidth/2,displayHeight/2);
  gameOver.addImage (gameOverImg);
  gameOver.scale=1
  
  
  restart=createSprite(displayWidth/2,displayHeight/2+100);
  restart.addImage(restartImage);
  restart.scale=0.1
  

  obstacleGroup=new Group();

  
  runner.setCollider("rectangle",0,0,80,runner.height-50);
  runner.debug=false;

  score=0;

  
 
}


function draw() {

  ground.x=ground.width/2;
  if(background.x<-1145){
    background.x=background.width/2;
  }

  background.velocityX=-10-score/100;
   
  


  if(gameState===play){
    //Assigning position of ground
    gameOver.visible=false;
    restart.visible=false;
    obstacles11();
    
   
    
    survivalTime=Math.ceil(frameCount/frameRate());
    
     
    
    score = score + Math.round(getFrameRate()/60)
                               
    score = score + Math.round(score/1000 );         
   
    
    
    
    if(keyDown("space") && runner.y>=displayHeight-260){
     
      runner.velocityY=-12;
    }



    if(score >= 100){

      finish.visible=true;
      finish.velocityX=background.velocityX;
      
    }

    
    
    
  }
  
  if(runner.isTouching(obstacleGroup)){
    gameState=end;
    runner.changeAnimation("sprite_collided",collided);

  }

  if(gameState===win){
    runner.changeAnimation("sprite_win",winningImg);
    runner.velocityX=1*0.0987;
    background.velocityX=background.velocityX*0.00111;
    finish.velocityX=0;
    restart.visible=true;
    obstacleGroup.destroyEach();


  }
    
 if(gameState===end){
   obstacleGroup.setVelocityXEach(0);
   obstacleGroup.setLifetimeEach(-1);
   
   
   background.velocityX=0;
   finish.velocityX=0;

   gameOver.visible=true;
   restart.visible=true;


   

   
 } 

 
 if(mousePressedOver(restart)) {
  reset();
}

  //Adding gravity
 
  

  runner.velocityY=runner.velocityY+0.85;  
  runner.collide(ground);

  

  
  
  
  drawSprites();
  
  textSize(30);
  fill("red");
  text("Score: "+ score, displayWidth/2,displayHeight-displayHeight+170);

  if(runner.isTouching(finish)){
    
    gameState=win;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
   
    textSize(40);
    fill(0);
    text("YOU WIN",displayWidth/2,displayHeight/2);

  }
  
}





function obstacles11(){
  if(frameCount%120===0){
    obstacle=createSprite(displayWidth,displayHeight-210);
  
  
  
    obstacle.velocityX=-10-score/100;;
    obstacle.lifetime=200;
    obstacle.scale=0.15;
    
    var rand=Math.round(random(1,3))
    switch(rand){
        case 1: obstacle.addImage(obstImg1);
        break;
        case 2: obstacle.addImage(obstImg2);
        break;
        case 3: obstacle.addImage( obstImg3);
        break;
        default: break;
        
           
           }
           obstacleGroup.add(obstacle);
    
  }
}

function winning(){
 
  finish.velocityX=background.velocityX;

}


function reset(){
  score=0;
  runner.changeAnimation("sprite_running",runnerImg);
  gameState=play;
  finish.x=displayWidth;
  finish.visible=false;

  background.velocityX=-10;
  gameOver.visible=false;
  restart.visible=false;
  obstacleGroup.destroyEach();



  
  

 
 
}
