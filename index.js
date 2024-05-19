#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
import gradient from 'gradient-string';
import chalkAnimation from "chalk-animation";
import figlet from 'figlet';
import { createSpinner } from "nanospinner";
let playerName;
//step 1 welcome
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('WHO WANTS TO PLAY A NUMBER GUESSING GAME ? \n');
    await sleep();
    rainbowTitle.stop();
    //step 2 how to play
    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you make a mistake you will be  ${chalk.bgRed(' OUT of the GAME')}
    `);
}
//3 ask name
async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });
    playerName = answers.player_name;
}
console.clear();
await welcome();
await askName();
let condition = true;
while (condition) {
    //4 game
    async function game() {
        const randomNumber = Math.floor(Math.random() * 6 + 1);
        const answers = await inquirer.prompt({
            name: "userGuessNumber",
            type: "number",
            message: "Please guess a number (1 to 6) ",
        });
        return handleAnswer(answers.userGuessNumber === randomNumber);
    }
    await game();
    //5  check
    async function handleAnswer(isCorrect) {
        const spinner = createSpinner('Checking answer...').start();
        await sleep();
        if (isCorrect) {
            spinner.success({ text: `Nice work ${playerName}.` });
            figlet(`Congrats , ${playerName} !\n  Well-played`, (err, data) => {
                console.log(gradient.pastel.multiline(data) + '\n');
                process.exit(0);
            });
        }
        else {
            spinner.error({ text: ` Game over, you lose ${playerName}!` });
            // process.exit(1);
            let con = await inquirer.prompt({
                name: "continue",
                type: "confirm",
                message: "Do you wnat to continue",
                default: "false",
            });
            condition = con.continue;
            console.log(condition);
        }
    }
}
//   async function cont() {
//     const con = await inquirer.prompt({
//       name:"continue",
//       type:"confirm",
//       message:"Do you wnat to continue",
//       default:"false",
//     },);
//     return con.continue  
//   }
//   await cont();
// }
