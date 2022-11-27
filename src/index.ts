import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";

const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));
async function Welcome() {
  chalkAnimation.glitch(
    chalk.bold.red("\t\tWelcome to the " + chalk.redBright("DUNGEON!")),
    0.3
  );

  await sleep();
}
await Welcome();

// game variables
const enemies: string[] = ["Skeleton", "Warrior", "Assasin"];
const maxEnemyHealth: number = 75;
const enemyAttackDamage: number = 25;
let health: number = 100;
const attackDamage: number = 50;
let numBandages: number = 3;
const numBandagesHealAmount: number = 30;
const bandagesDropChance: number = 50;

let running: boolean = true;

GAME: while (running) {
  console.log(
    chalk.bold.red(
      `-------------------------------------------------------------------`
    )
  );

  let enemyHealth: number = Math.floor(Math.random() * maxEnemyHealth);
  let enemy: string = enemies[Math.floor(Math.random() * enemies.length)];

  chalkAnimation.pulse(`\t\t# ${enemy} is here #\n`);
  await sleep();

  while (enemyHealth > 0) {
    console.log(chalk.yellow(`\t Your HP: ${health}`));
    console.log(chalk.yellow(`\t ${enemy}'s HP: ${enemyHealth}`));
    console.log(chalk.yellow(`\t What would you like to do?`));
    let ans = await inquirer.prompt([
      {
        type: "list",
        name: "choose",
        choices: [
          chalk.yellow("Attack"),
          chalk.yellow("Bandage Wound"),
          chalk.yellow("Run"),
        ],
      },
    ]);

    if (ans.choose == chalk.yellow("Attack")) {
      let damageDealt: number = Math.floor(Math.random() * attackDamage);
      let damageTaken: number = Math.floor(Math.random() * enemyAttackDamage);

      enemyHealth -= damageDealt;
      health -= damageTaken;

      console.log(
        chalk.yellow(`\t> You strike the ${enemy} for ${damageDealt} damage.`)
      );
      console.log(
        chalk.yellow(`\t> You recieve ${damageTaken} in retaliation!`)
      );

      if (health < 1) {
        console.log(
          chalk.red(
            `You have taken too much damage, you are too weak to go on!`
          )
        );
        break;
      }
    } else if (ans.choose == chalk.yellow("Bandage Wound")) {
      if (numBandages > 0) {
        health += numBandagesHealAmount;
        numBandages--;
        console.log(
          chalk.yellow(
            `You got a bandage \n You now have ${health} HP! \n You now have ${numBandages} left`
          )
        );
      } else {
        console.log(
          chalk.yellow(
            `\t> You have no bandages left. Defeat enemies for a chance to get one.`
          )
        );
      }
    } else {
      console.log(chalk.yellow(`You run away from the ${enemy}`));
      continue GAME;
    }
  }
  if (health < 1) {
    console.log(chalk.red(`You limp out of the dungeon, weak from battle.`));
    break;
  }
  console.log(
    chalk.red(
      `-------------------------------------------------------------------`
    )
  );
  console.log(chalk.green(` # ${enemy} was defeated! #`));
  console.log(chalk.green(` # You have ${health} HP left`));

  if (Math.floor(Math.random() * 100) > bandagesDropChance) {
    numBandages++;
    console.log(chalk.green(` # The ${enemy} dropped a bandage # `));
    console.log(` # You now have ${numBandages} bandage(s).`);
  }
  console.log(
    chalk.red(
      `-------------------------------------------------------------------`
    )
  );
  console.log(chalk.yellow(`What would you like to do now?`));
  let answ = await inquirer.prompt([
    {
      name: "choose",
      type: "list",
      choices: [
        chalk.yellow("Continue Fighting"),
        chalk.yellow("Exit Dungeon"),
      ],
    },
  ]);

  if (answ.choose == chalk.yellow("Continue Fighting")) {
    console.log(chalk.yellow(`You continue on your adventure!`));
  } else {
    console.log(
      chalk.red(`You exit the dungeon, successfully from your adventures`)
    );
    break;
  }
}

chalkAnimation.karaoke(
  "---------------------------The END----------------------------------------"
);
