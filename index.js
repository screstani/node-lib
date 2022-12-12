import fs from 'fs';
import chalk from 'chalk';

function errDealing(err) {
    console.log(err);
    throw new Error(chalk.red(err.code, 'Directory is empty'));
}

//async / await
function getFile(filePath) {
    const encoding = "utf-8";
    const text = fs.promises.readFile(filePath, encoding);
    console.log(text);
}

//promises com then()
// function getFile(filePath) {
//     const encoding = "utf-8";
//     fs.promises.readFile(filePath, encoding)
//         .then((text) => console.log(chalk.green(text)))
//         .catch(errDealing);
//     // a forma acima é mais elegante do que essa : .catch((err) => errDealing(err)) , mas fazem a mesma coisa.
//     }



// function getFile(filePath) {
//     const encoding = "utf-8";
//     fs.readFile(filePath, encoding, (err, text) => {
//         if(err) {
//             errDealing(err);
//         }
//         console.log(chalk.green(text));
//     })
// }

getFile('./arquivos/texto.md');
