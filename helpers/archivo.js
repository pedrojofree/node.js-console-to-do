import fs from 'fs';
const guardarDB = ( data ) => {
    fs.writeFileSync('./db/data.json', JSON.stringify(data))
}

const leerDB = () => {

    if ( !fs.existsSync ( './db/data.json' ) ){
        return null
    }

    const tareasGuardadasString = fs.readFileSync('./db/data.json', {encoding: 'utf-8'})
    const tareasGuardadasArray = JSON.parse(tareasGuardadasString)

    console.log(tareasGuardadasArray);

    return tareasGuardadasArray;
}


export { guardarDB, leerDB };