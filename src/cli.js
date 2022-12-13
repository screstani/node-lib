import chalk from 'chalk';
import fs from 'fs';
import { get } from 'http';
import getFile from './index.js';

const path = process.argv;

function printList(result, id = '') {
    console.log(
        chalk.yellow('lista de links'), 
        chalk.black.bgGreen(id),
        result);
}

async function textProcess(args) {
    const path = args[2];

    try {
        fs.lstatSync(path);
    } catch(erro) {
        if(erro.code === 'ENOENT') {
            console.log('there is no such file or directory');
            return;
        }
    }
    if(fs.lstatSync(path).isFile()) {
        const resultado = await getFile(args[2]);
        printList(resultado);
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path)
        files.forEach(async (fileName) => {
            const list = await getFile(`${path}/${fileName}`)
            printList(list, fileName);
        })
    }
    
}

textProcess(path);