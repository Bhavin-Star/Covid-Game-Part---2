var virus, virusImg, player, playerImg, bg, virusGroup, score, arrowSound, restart1, restartImg;
var gamestate = 1

function preload(){
   
    virusImg = loadImage('images/virus.png');
    bg = loadImage('images/bg.jpg');
    playerImg = loadImage('images/plr.png');
    restartImg = loadImage('images/restart.png');

    arrowSound = loadSound('sounds/arrow.mp3');
    
}

function setup(){
    createCanvas(windowWidth,windowHeight)

    player = createSprite(100,windowHeight/2,50,50);    
    player.addImage(playerImg);
    player.scale = 0.3;
    
    virusGroup = createGroup();
    score = 0;

    restart1 = createSprite(windowWidth/2 + 50,windowHeight/2 - 110,50,50);
    restart1.addImage(restartImg);
    restart1.scale = 0.5;
    
}

function draw(){
    background('green');

    
    imageMode(CENTER);
    image(bg,windowWidth/2, windowHeight/2, windowWidth, windowHeight)
    

    if(gamestate == 1){
        
        spawnVirus();
        restart1.visible = false;
        player.visible = true;
        
        score = score + Math.round(getFrameRate()/60);
        textSize(18)
        fill(210,39,48);
        text ("Score: " + score, 50,50);  

        if(player.isTouching(virusGroup)){
            gamestate = 2
        }

        drawSprites();
    }

    if(gamestate == 2){

        virusGroup.destroyEach();
        player.visible = false;

        if(mousePressedOver(restart1) && gamestate == 2){
            restart();
          }

        restart1.visible = true;
        
        textSize(28)
        fill(210,39,48);
        text ("Your Score: " + score, windowWidth/2 - 50, windowHeight/2 + 50); 

        textSize(28)
        fill('cyan');
        text('You Lose', windowWidth/2, windowHeight/2 - 50)

        textSize(28)
        fill('yellow');
        text('You have been affected by Covid - 19', windowWidth/2 - 150, windowHeight/2)

        drawSprites();
    }
    
}   

function spawnVirus(){
    if(World.frameCount % 70 == 0){
        virus = createSprite(windowWidth,random(100,windowHeight-100),50,50)
        virus.velocityX = -3
        virus.addImage(virusImg);
        virus.scale = 0.04;  
        virusGroup.add(virus);      
    }

    
}

function keyPressed(){
    
    if(keyCode == 39){
        player.velocityX = 4;
        player.velocityY = 0;
        
    }
    
    else if(keyCode == 38){
        player.velocityY = -4;
        player.velocityX = 0;
        
    }

    else if(keyCode == 37){
        player.velocityX = -4;
        player.velocityY = 0;
        
    }

    else if(keyCode == 40){
        player.velocityY = 4;
        player.velocityX = 0;
        
    }
}

function restart(){

    gamestate = 1;
    score = 0;
    player.x = 100;
    player.y = displayHeight/2;
    player.velocityX = 0;
    player.velocityY = 0;
    
}