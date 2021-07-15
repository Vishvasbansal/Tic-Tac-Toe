var text = ['x', 'o'];
var chance = 0;
var no = []; //stores the buttons involved in tic tac toe

addEvent();
function addEvent() {
  $(".button").on("click", function() {
    $(this).off("click");
    if (chance % 2 === 1) {
      $(this).html(text[chance]);
      $(this).addClass("changeColor");
      chance = (chance + 1) % 2;
      check();
    } else {
      $(this).html(text[chance]);
      $(this).addClass("changeColor");
      chance = (chance + 1) % 2;
      check();
    }
  });
}

//this funtion checks if any player has won the game
function check() {
  no = $(".button");
  var win = 0;
  //this loop checks for the rows
  for (var i = 0; i < 9; i += 3) {
    var nos = [];
    var key = 0;
    for (var j = i; j - i < 3; j++) {
      nos.push($(no[j]).text());
      if (nos[nos.length - 1] === '-') {
        key = 1;
      }
    }
    if (key === 0 && nos[0] === nos[1] && nos[1] === nos[2]) {
      found("r", i);
      win++;
    }
  }
  //this loop checks for the columns
  for (var i = 0; i < 3; i += 1) {
    var nos = [];
    var key = 0;
    for (var j = i; j - i < 7; j += 3) {
      nos.push($(no[j]).text());
      if (nos[nos.length - 1] === '-') {
        key = 1;
      }
    }
    if (key === 0 && nos[0] === nos[1] && nos[1] === nos[2]) {
      found("c", i);
      win++;
    }
  }
  //this block checks for the main diagonal
  {
    var nos = [];
    var key = 0;
    nos.push($(no[0]).text());
    nos.push($(no[4]).text());
    nos.push($(no[8]).text());
    for (var j = 0; j < 3; j++) {
      if (nos[0] === '-' || nos[0] !== nos[j]) {
        key++;
        break;
      }
    }
    if (key === 0) {
      $(no[0]).addClass("winner");
      $(no[4]).addClass("winner");
      $(no[8]).addClass("winner");
      found(0, 0);
      win++;
    }
  }
  //this block checks for the second diagonal
  {
    var nos = [];
    var key = 0;
    nos.push($(no[2]).text());
    nos.push($(no[4]).text());
    nos.push($(no[6]).text());
    for (var j = 0; j < 3; j++) {
      if (nos[0] === '-' || nos[0] !== nos[j]) {
        key++;
        break;
      }
    }
    if (key === 0) {
      $(no[2]).addClass("winner");
      $(no[4]).addClass("winner");
      $(no[6]).addClass("winner");
      found(0, 2);
      win++;
    }
  }
  //if no one has won the game then check if it has ended
  if (win === 0) {
    doesItEnd();
  }
}
//this function highlights the winning pattern and also changes the text accordingly
function found(pattern, i) {
  $(".button").off("click");
  if ($(no[i]).text() === 'x') {
    $(".title").text("Player " + 1 + " Won!!");
  } else {
    $(".title").text("Player " + 2 + " Won!!");
  }
  if (pattern === "r") {
    for (var j = i; j - i < 3; j++) {
      $(no[j]).addClass("winner");
    }
  } else if (pattern === "c") {
    for (var j = i; j - i < 7; j += 3) {
      $(no[j]).addClass("winner");
    }
  }
  another(); //adds a Play again button
}
//this function checks for a potential draw and updates the text accordingly
function doesItEnd() {
  var key = 0;
  for (var i = 0; i < 9; i++) {
    if ($(no[i]).text() === '-') {
      key++;
      break;
    }
  }
  if (key === 0) {
    $(".title").text("It's a Draw!");
    $(".buttons").off("click");
    another();
  }
}
//adds a button which when clicked calls the refresh function
function another() {
  $(".again").html("<button class='again' onclick='refresh()'>Play Again</button>");
}
//starts the game again
function refresh() {
  chance = 0;
  for (var i = 0; i < no.length; i++) {
    $(no[i]).text('-');
    $(no[i]).removeClass("changeColor");
    $(no[i]).removeClass("winner");
    $(".again").html("");
    $(".title").html("Tic Tac Toe");
  }
  no = 0;
  addEvent();
}
