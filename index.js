#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let enemies = ["Force", "Ghosts", " Warrior", "Godzilla"];
let maxEnemyHealth = 60;
let enemyAttackDamageToHero = 26;
let heroHealth = 100;
let attackDamageToEnemy = 60;
let numHealthPotions = 5;
let healthPotionHealAmount = 20;
let healthPotionDropChance = 50;
let gameRunning = true;
console.clear();
console.log(chalk.magenta("\n\t  Welcome to the JungleAttack!"));
GAME: while (gameRunning) {
    console.log("<<----------------------------------------------->>");
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(chalk.yellow(`\t # ${enemy} has appeared! #\n`));
    while (enemyHealth > 0) {
        console.log(chalk.cyan(`\n\tYour HP: ${heroHealth}`));
        console.log(chalk.red(`\t${enemy}'s HP: ${enemyHealth}\n`));
        let options = await inquirer.prompt({
            name: "ans",
            type: "list",
            message: "What would you like to do?",
            choices: ["1. Attack", "2. Drink Health Potion", "3. Run!"],
        });
        if (options.ans === "1. Attack") {
            let damageDealt = Math.floor(Math.random() * attackDamageToEnemy + 1);
            let damageTaken = Math.floor(Math.random() * enemyAttackDamageToHero + 1);
            enemyHealth -= damageDealt;
            heroHealth -= damageTaken;
            console.log(chalk.green(`\n> You strike the ${enemy} for ${damageDealt} damage.`));
            console.log(chalk.red(`> ${enemy} strikes you for ${damageTaken} damage.`));
            if (heroHealth < 1) {
                console.log(chalk.red("You are very damage, too weak to go further."));
                break;
            }
        }
        else if (options.ans === "2. Drink Health Potion") {
            if (numHealthPotions > 0) {
                heroHealth += healthPotionHealAmount;
                numHealthPotions--;
                console.log(chalk.green(`> Drink a health potion and heal yourself for ${healthPotionHealAmount}.`));
                console.log(chalk.cyan(`> Now you have ${heroHealth} HP.`));
                console.log(chalk.cyan(`> You have ${numHealthPotions} health potion(s) left.\n`));
            }
            else {
                console.log(chalk.red("> You have no health potions left! Defeat enemies for a chance to get one!\n"));
            }
        }
        else if (options.ans === "3. Run!") {
            console.log(chalk.yellow(`Run away from the ${enemy}!`));
            continue GAME;
        }
        else {
            console.log(chalk.red("Invalid command!"));
        }
    }
    if (heroHealth < 1) {
        console.log(chalk.red("Move out from the JungleAttack, weakest from battle."));
        break;
    }
    console.log("-----------------------------------------------");
    console.log(chalk.green(`# ${enemy} was defeated! #\n`));
    console.log(chalk.cyan(`# You have ${heroHealth} HP left. #`));
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    if (randomNumber < healthPotionDropChance) {
        numHealthPotions++;
        console.log(chalk.green(`# The ${enemy} dropped a health potion! #`));
        console.log(chalk.cyan(`\n# You now have ${numHealthPotions} health potion(s). #`));
    }
    console.log("-----------------------------------------------\n");
    let userOptions = await inquirer.prompt({
        name: "ans",
        type: "list",
        message: "What would you like to do now?",
        choices: ["1. Continue fight", "2. Exit JungleAttack"],
    });
    if (userOptions.ans === "1. Continue fight") {
        console.log(chalk.magenta("\n\t  Continue with your adventure!"));
    }
    else if (userOptions.ans === "2. Exit JungleAttack") {
        console.log(chalk.magenta("You exit the JungleAttack, successful on your adventures!"));
        break;
    }
    console.log(chalk.magenta("\t  ################################"));
    console.log(chalk.magenta("\t      # THANKS FOR PLAYING JUNGLEATTACK #"));
    console.log(chalk.magenta("\t  ################################\n"));
}
