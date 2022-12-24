import colors from 'colors';
import { inquirerMenu, pausa, leerInput, listadoParaBorrar, confirmar, mostrarListadoChecklist } from './helpers/inquirer.js';
import { guardarDB, leerDB } from './helpers/archivo.js';
import fs from 'fs';
import { Tareas } from './models/tareas.js';
import { Tarea } from './models/tarea.js';

const main = async () => {

  let opt = '';
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if ( tareasDB ) {
    //cargar tareas
    tareas.cargarTareasFromArray( tareasDB )
  }


  // await pausa();


  do {

    opt = await inquirerMenu();

    switch (opt.option) {

      case 1:

        //Crear tarea y guardar en .json
        const desc = await leerInput('Descripcion:');
        console.log(desc);
        tareas.crearTarea( desc )

      break;
      case 2:

        //Mostrar listado de .json
        tareas.listadoCompleto();

      break;
      case 3:

        //Mostrar Completadas
        tareas.listarPendientesCompletadas(true);

      break;
      case 4:

        //Mostra Incompletas
        tareas.listarPendientesCompletadas(false);

      break;
      case 5:

        //Marcar completadas o pendientes
        const ids = await mostrarListadoChecklist( tareas.listadoArr )
        tareas.toggleCompletadas( ids );

      break;
      case 6:

        //Listado para borrar alguna tarea, listando con prompt todas las tareas y retornar el ID
        const id = await listadoParaBorrar(tareas.listadoArr)
        if ( id !== 0 ) {

          //Confirmacion de eliminacion
          const ok = await confirmar( `Are you sure to delete this task?`.red )
          
          //Borrar de verdad
          if ( ok ){
            tareas.borrarTarea( id )
            console.log('Task deleted.'.blue);
          }

        }


      break;
      case 0:
        
        console.log( `${'Exiting...\n'.red}Saved task will remain saved in a JSON file.` );

      break;
    
    }

    guardarDB( tareas.listadoArr );

    await pausa();

  } while (opt.option !== 0);

};
main();