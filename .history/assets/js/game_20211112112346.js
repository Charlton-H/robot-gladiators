function randomNumber(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

var getPlayerName = function () {
  var name = "";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: randomNumber(10, 14),
  money: 10,
  reset: function () {
    this.health = 100;
    this.attack = 10;
    this.money = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 12),
  },
  {
    name: "Amy Android",
    attack: randomNumber(12, 18),
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(16, 20),
  },
];
// var enemyHealth = randomNumber(40, 60);
// var enemy.attack = randomNumber(5, 15);

// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// function fightOrSkip() {
var fightOrSkip = function () {
  // ask player if they'd like to fight or run
  var promptFight = window.prompt(
    "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' OR 'SKIP' to choose"
  );

  // Enter the conditional recursive function call here!
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // if player choses to skip
  if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (True), leave fight
    if (confirmSkip) {
      window.alert(
        playerInfo.name + " has decided to skip this fight. Goodbye!"
      );
      // subtract money from playerMoney for skipping
      playerInfo.money = playerInfo.money - 10;
      shop();
    }
  }
};

var fight = function (enemy) {
  // repeat and execute as long as the enemy-robot is alive
  while (playerInfo.health > 0 && enemy.health > 0) {
    fightOrSkip();
    // ask player if they'd like to fight or run
    // var promptFight = window.prompt(
    //   "Enemy: " +
    //     enemy.name +
    //     "\n" +
    //     "Health: " +
    //     enemy.health +
    //     "\n" +
    //     "Attack: " +
    //     enemy.attack +
    //     "\n\n" +
    //     "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' OR 'SKIP' to choose"
    // );

    // // if player choses to skip
    // if (promptFight === "skip" || promptFight === "SKIP") {
    //   // confirm player wants to skip
    //   var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    //   // if yes (True), leave fight
    //   if (confirmSkip) {
    //     window.alert(
    //       playerInfo.name + " has decided to skip this fight. Goodbye!"
    //     );
    //     // subtract money from playerMoney for skipping
    //     playerInfo.money = Math.max("0,playerMoney - 10");
    //     // if no (False), ask question again by running fight() again
    //     console.log("playerMoney", playerInfo.money);
    //     break;
    //   }
    // }
    // } else if (promptFight === "fight" || promptFight === "FIGHT") {
    //Subtract the value of `playerAttack` from the value of `enemy.health` and use that result to update the value in the `enemyHealth` variable
    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);
    // Log a resulting message to the console so we know that it worked.
    console.log(
      playerInfo.name +
        " attacked " +
        enemy.name +
        ". " +
        enemy.name +
        " now has " +
        enemy.health +
        " health remaning."
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died!");
      break;
    } else {
      window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }
    // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);
    // Log a resulting message to the console so we know that it worked.
    console.log(
      enemy.name +
        " attacked " +
        playerInfo.name +
        ". " +
        playerInfo.name +
        " now has " +
        playerInfo.health +
        " health remaning."
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      break;
    } else {
      window.alert(
        playerInfo.name + " still has " + playerInfo.health + " health left."
      );
    }
  }
};

var startGame = function () {
  // reset player stats
  playerInfo.reset();
  // playerInfo.health = 100;
  // playerInfo.attack = randomNumber(8, 15);
  // playerInfo.money = 10;

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert(
        "Welcome to Robot Gladiators, " +
          playerInfo.name +
          "! Let's begin Round " +
          (i + 1)
      );
      var pickedEnemyObj = enemyInfo[i];

      pickedEnemyObj.health = randomNumber(40, 60);

      //debugger;

      fight(pickedEnemyObj);
    } else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
    if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
      playerInfo.money = playerInfo.money + 3;
      var storeConfirm = window.confirm(
        "The fight is over, visit the store before the next round? You have " +
          playerInfo.money +
          " available funds to use."
      );
      if (storeConfirm) {
        shop();
      }
    }
  }
  endGame();
};

var endGame = function () {
  if (playerInfo.health > 0) {
    window.alert("The game has now ended. Let's see how you did!");
  } else {
    window.alert("You've lost your robot in battle.");
  }
  var playAgainConfirm = window.confirm("Would you like to play again?");
  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function () {
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );
  switch (shopOptionPrompt) {
    case "REFILL":
    case "refill":
      playerInfo.refillHealth();
      // if (playerInfo.money >= 7) {
      //   window.alert("Refilling player's health by 20 for 7 dollars.");
      //   // increase health and decrease money
      //   playerInfo.health = playerInfo.health + 20;
      //   playerInfo.money = playerInfo.money - 7;
      // } else {
      //   window.alert("You don't have enough money!");
      // }
      break;
    case "UPGRADE":
    case "upgrade":
      playerInfo.upgradeAttack();
      // if (playerInfo.money >= 7) {
      //   window.alert("Upgrading player's attack by 6 for 7 dollars.");
      //   // increase attack and decrease money
      //   playerInfo.attack = playerInfo.attack + 6;
      //   playerInfo.money = playerInfo.money - 7;
      // } else {
      //   window.alert("You don't have enough money!");
      // }
      break;
    case "LEAVE":
    case "leave":
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

startGame();
