require('colors');


// VERSION SIN INQUIRER. (NO USADA)
const mostrarMenu = () => {

    return new Promise (resolve => {

        console.clear()
        console.log('=============================='.green);
        console.log('    Select an option'.green);
        console.log('==============================\n'.green);
    
        console.log(`${'1'.green}. Create task`);
        console.log(`${'2'.green}. Show task`);
        console.log(`${'3'.green}. Show completed task`);
        console.log(`${'4'.green}. Show completed task`);
        console.log(`${'5'.green}. Complete a task`);
        console.log(`${'6'.green}. Delete a task`);
        console.log(`${'0'.green}. Quit\n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question('Select an option: ', (answer) => { //Pedir y leer informacion ingresada

            readline.close();
            resolve(answer);
        })

    })
}

const pausa = () => {

    return new Promise (resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`\nPress ${'ENTER'.green} to continue\n`, (answer) => { //Pedir y leer informacion ingresada
            readline.close()
            resolve()
        })
    })

}

module.exports = {
    mostrarMenu,
    pausa
}
