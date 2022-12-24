/*
    _listado: 
    {
        'uuid-1231312-1231231212-123123' {
            'id': 12,
            'desc': Hacer la compra,
            completadoEn: enero 2023
        }
    },
    {
        'uuid-1231312-1231231212-123123' {
            'id': 12,
            'desc': Hacer la compra,
            completadoEn: enero 2023
        }
    }
*/

import { Tarea } from "./tarea.js";

class Tareas {

    _listado = {}

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea )
        })
        return listado;
    }

    constructor () {
        this._listado = {};
    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea( desc );

        this._listado[tarea.id] = tarea;

    }


    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto (){
        this.listadoArr.forEach( (tarea, i) => {
            let indice = `${i + 1 + '.'}`.green;
            const {desc, completadoEn} = tarea;
            const estado = completadoEn ? 'Done'.green : 'Pending'.red;
            console.log(`${indice} ${desc} :: ${estado}`);
        });
    }
 
    listarPendientesCompletadas ( trueOrFalse ){
        
        this.listadoArr.forEach( (tarea, i) => {
            let indice = `${i + 1 + '.'}`.green;
            const {desc, completadoEn} = tarea;
            const estado = completadoEn ? 'Done'.green : 'Pending'.red;
            

            if ( trueOrFalse && completadoEn) {
                console.log(`${indice} ${desc} :: ${completadoEn}`);
                return
            } else if ( !trueOrFalse && !completadoEn) {
                console.log(`${indice} ${desc} :: ${estado}`);
            }

        });

    }

    borrarTarea ( id = '' ) {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = `${new Date().toISOString().getDate()}`.green
            }

        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        });


    }
}

export { Tareas };

