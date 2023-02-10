let names_fruits = ["lemon", "strawberry", "pear", "orange"];
let fruits_played = ["", "", ""];
let current_play = 0;
let score = 0;
let remaining_rounds = 5;
$("#game_over").hide();

$("#button_play").click(function(){
  if(current_play>3) return;
  let fruit_a_jouer = "#fruit"+ (current_play+1);
  console.log(fruit_a_jouer);
  fruits_played[current_play] = choisirFruit($(fruit_a_jouer));
  current_play++;
  if(current_play==3){
    calculateScore();
    if(remaining_rounds<1) {
      setTimeout(gameOver, 1000);
      return;
    }
    setTimeout(reinitialise, 1000);
  }
})

function reinitialise(){
  current_play = 0;
  fruits_played = ["", "", ""];
  $(".card").children("img").each(function(){
    $(this).attr("src", "img/mystery.jpg");
  });
}

function gameOver(){
  $("#cards").hide();
  $("#play").hide();
  $("#display_rounds").hide();
  $("#game_over").show();
}

function choisirFruit(image){
  var indice = randomInteger(names_fruits.length);
  var nom_fruit = names_fruits[indice];
  image.attr("src", "img/"+nom_fruit+".jpg");
  return nom_fruit;
}

function randomInteger(max) {
  return Math.floor(Math.random() * max);
}

function calculateFrequency(valeur) {
    var compte = 0;
    fruits_played.forEach((v) => (v === valeur && compte++));
    return compte;
}

function calculateScore(){
  remaining_rounds --;
  var max_frequency = 0;
  fruits_played.forEach((f) =>
    {
      occ = calculateFrequency(f);
      if(occ>max_frequency) max_frequency = occ;
    }
  );
  if(max_frequency==2) score += 50;
  if(max_frequency==3) {
    score += 200;
    remaining_rounds += 1;
  }
  $("#display_score").html("Score : "+score);
  $("#display_rounds").html("Remaining rounds: "+remaining_rounds);
}
