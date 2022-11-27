import promptSync from "prompt-sync";
const prompt = promptSync();

function main(): void {
  // Game Variables
  const enemies: string[] = ["Assasin", "Skeleton", "Warrior", "Addy"];
  const maxEnemyHealth: number = 75;
  const enemyAttackDamage: number = 25;
  let health: number = 100;
  const attackDamage: number = 50;
  let numHealthPotions: number = 3;
  const healthPotionHealAmount: number = 30;
  const healthPotionDropChance: number = 50; // percentage

  let running: boolean = true;

  console.log("\n\tWelcome to The Dungeon!");

  Game: while (running) {
    console.log("-----------------------------------------------");

    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth) + 1;
    let enemy: string = enemies[Math.floor(Math.random() * enemies.length)];
    console.log(`\t# ${enemy} here! #\n`);

    while (enemyHealth > 0) {
      console.log(`\t Your HP: ${health}`);
      console.log(`\t ${enemy}'s HP: ${enemyHealth}`);
      console.log(`\n\t What would you like to do?`);
      console.log(`\t 1. Attack`);
      console.log(`\t 2. Drink Health Potion`);
      console.log(`\t 3. Run!`);

      let input: string = prompt("");
      if (input == "1") {
        let damageDealt: number = Math.floor(Math.random() * attackDamage) + 1;
        let damageTaken: number =
          Math.floor(Math.random() * enemyAttackDamage) + 1;

        enemyHealth -= damageDealt;
        health -= damageTaken;

        console.log(`\t> You strike the ${enemy} for ${damageDealt} damage.`);
        console.log(`\t> You recieve ${damageTaken} in retaliation!`);

        if (health < 1) {
          console.log(
            `You have taken too much damage, you are toow eak to go on!`
          );
          break;
        }
      } else if (input == "2") {
        if (numHealthPotions > 0) {
          health += healthPotionHealAmount;
          numHealthPotions--;
          console.log(
            `\t> You drink a health potion. \n\t You now have ${health} HP. \n\t You have ${numHealthPotions} health potions left.`
          );
        } else {
          console.log(
            `You have no health potions left! Defeat enemies for a chance to get!`
          );
        }
      } else if (input == "3") {
        console.log(`You run away from the ${enemy}!`);
        continue;
      } else {
        console.log(`\t Invalid Command`);
      }
      if (health < 1) {
        console.log(`You limp out of the dungeon, weak from battle.`);
        break;
      }
      console.log(
        `-----------------------------------------------------------------`
      );
      console.log(` # ${enemy} was defeated! #`);
      console.log(` # You have ${health} HP left. #`);

      if (Math.floor(Math.random() * 100) + 1 > healthPotionDropChance) {
        numHealthPotions++;
        console.log(` # their is a health potion! # `);
        console.log(` # You have ${numHealthPotions} health potion(s). #`);
      }
      console.log(
        `-----------------------------------------------------------------`
      );
      console.log(`What would you like to do now?`);
      console.log(`1. Continue fighting`);
      console.log(`2. Exit dungeon`);

      input = prompt("");

      while (input != "1" && input != "2") {
        console.log(`Invalid Command`);
        input = prompt("");
      }

      if (input == "1") {
        console.log(`You continue on your adventure!`);
      } else if (input == "2") {
        console.log(`You exit the dungeon, successful from your adventure!`);
        break;
      }
    }

    console.log(`###########################`);
    console.log(`The End`);
    console.log(`###########################`);
  }
}

main();
