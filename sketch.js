var dog, happyDog, dogImg, happyDogImg;
var database;
var foodS, foodStock;
var fedTime, lastFed;
var feed, addFood;
var foodObj;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
	
}

function setup() {
  createCanvas(500, 500);

  
  dog = createSprite(400,300,30,30);
  dog.scale = 0.25;
  dog.addImage(dogImg);
  
  foodObj = new Food();

  database = firebase.database();

  foodObj.getFoodStock();  
  //foodStock = database.ref("Food");
  //foodStock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {
  background(46, 139, 87);
  
  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  }); 

  fill(255,255,254);
        textSize(15);
        if(lastFed >= 12){
            text("Last Feed : "+ lastFed%12 + " PM", 350,30);
        }else if(lastFed == 0){
            text("Last Feed : 12 AM", 350,30);
        }else{
            text("Last Feed : "+ lastFed + " AM", 350,30);
        }


  drawSprites();
  
  foodObj.display();

}
/*
function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  database.ref("/").update({
    Food:x
  })
}
*/
function feedDog(){
  dog.addImage(happyDogImg);
  //var foodS = foodObj.getFoodStock();
 // console.log("foodS", foodS);
  //foodObj.updateFoodStock(foodS-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock()-1,
    FeedTime:hour()
  })
}

function addFoods(){
  var foodS = foodObj.getFoodStock();
  //console.log("foodS", foodS);
  foodS++;
  //console.log("foodS", foodS);
  database.ref("/").update({
    Food:foodS
  })
}



