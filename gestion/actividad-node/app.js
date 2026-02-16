const chalk = require ('chalk');
const dayjs = require ('dayjs');

const ahora = dayjs().format('DD-MM-YY HH:mm:ss');

console.log(chalk.green('!Bienvenido al digimundo!'));
console.log(chalk.cyan(`!Hoy es ${ahora}`));
console.log(chalk.magenta('Esta el portal listo para el digimundo.'));
