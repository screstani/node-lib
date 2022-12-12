import fs from 'fs';
import chalk from 'chalk';

function getLinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...text.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados;
}

function errDealing(err) {
    console.log(err);
    throw new Error(chalk.red(err.code, 'Directory is empty'));
}

//async / await
async function getFile(filePath) {
    try {
        const encoding = "utf-8";
        const text = await fs.promises.readFile(filePath, encoding);
        console.log(getLinks(text));
    } catch(err) {
        errDealing(err);
    } finally {
        console.log(chalk.yellow('operação concluída'));
    }
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
