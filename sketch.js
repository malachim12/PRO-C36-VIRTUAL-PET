var dog,sadDog,happyDog,database,lastfeed,foodS,foodStock,feedime,feeddog,addfoods;


function preload(){
  //Images loaded
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {

  database = firebase.database();
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObject = new food();
  foodstock = database.ref('Food');
  foodstock.on("value", readStock);
  feeddog = createButton("Feed the Dog!");
  feeddog.position(700,90);
  feeddog.mousePressed(feedDog);

  addfoods = createButton("Add Food");
  addfoods.position(800,90);
  addfoods.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  
  foodObject.display();
  feedtime = database.ref('FeedTime');
  feedtime.on("value", function(data){
    lastfeed = data.val();
  });

  console.log("last feed"+lastfeed);
  fill("white");
  textSize(20);
  if(lastfeed >=12){
    text("Last Feed:", +lastfeed%12 + " PM",600,90)
  }
  else if(lastfeed == 0){
    console.log("Feedtime message");
    text("Last Feed : 12am",600,90)
  }
  else{
    console.log("Feedtime message2");
    text("Last Feed", +lastfeed + " AM",600,90)
  }
  
  drawSprites();
}
function readStock(data){
  foodS = data.val();
  foodObject.updatefoodStock(foodS);
}

function addFoods(){
  foodS = foodS+1;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);
  console.log("Message 1");
  if(foodObject.getfoodStock() <= 0){
    console.log("Message 2");
    foodObject.updatefoodStock(foodObject.getfoodStock()*0);
  }
  else{
    console.log("Message 3");
    foodObject.updatefoodStock(foodObject.getfoodStock() - 1);
  }

database.ref('/').update({
  Food: foodObject.getfoodStock(),
  FeedTime : hour()
})

}

