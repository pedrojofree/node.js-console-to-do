import inquirer from 'inquirer';
import colors from 'colors';

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green}Create new task.`
            },
            {
                value: 2,
                name: `${'2.'.green}Show all task.`
            },
            {
                value: 3,
                name: `${'3.'.green}Show all completed tasks.`
            },
            {
                value: 4,
                name: `${'4.'.green}Show all incompleted tasks.`
            },
            {
                value: 5,
                name: `${'5.'.green}Complete a task.`
            },
            {
                value: 6,
                name: `${'6.'.green}Delete a task.`
            },
            {
                value: 0,
                name: `${'0.'.green}Exit.`
            },
        ],
    }
]

const inquirerMenu = async() => {
    console.clear()
    console.log('=============================='.rainbow);
    console.log('       Select an option'.white);
    console.log('==============================\n'.rainbow);

    const opt = await inquirer.prompt(questions);

    return opt;

}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question)
}

const leerInput = async ( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate ( value ){
                if (value.length === 0){
                    return 'Enter something'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question)
    return desc;
}


const listadoParaBorrar = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        return {
            value: tarea.id,
            name: `${i + 1 + '. '}`.green  + `${tarea.desc}`
        }
    });

    choices.unshift( {
        value: 0,
        name: '0.'.green + ' Cancel'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas)

    return id

}

const confirmar = async ( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question)

    return ok
}

const mostrarListadoChecklist = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        return {
            value: tarea.id,
            name: `${i + 1 + '. '}`.green  + `${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select one or many',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta)

    return ids;

}

export { inquirerMenu, pausa, leerInput, listadoParaBorrar, confirmar, mostrarListadoChecklist};