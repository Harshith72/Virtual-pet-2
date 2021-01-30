//Create variables here
var dog,dogImg;
var happyDog;
var database;
var foodS;
var foodStock;
var fedTime;
var lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 1000);
  
  database=firebase.database();

  dog = createSprite(850,550,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.4;

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  feed = createButton("Feed the dog");
  feed.position(400,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(400,125);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46,139,87);

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  //add styles here
  textSize(25);
  fill("white");
  stroke("red");
  if(lastFed>=12){
    text("last Fed:" + lastFed%12 + "PM",200,30);
  }
  if(lastFed==0){
    text("last Fed: 12 AM",350,30);
  }
  else{
    text("last Fed:" + lastFed + "AM",200,30)
  }
  drawSprites();
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
}
  
  function showError() {
    console.log("Error in writing to the database");
}
function feedDog(){
  dog.addImage(happyDog);
  foodS--;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFodStock(),
    FeedTime:hour()
  })
}
