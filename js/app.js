// variables
let id = document.querySelector.bind(document);


// AddEventListener

addEventListener();

function addEventListener(){
    id('#btnAgregar').addEventListener( 'click' , agregarTarea );
}




// Funciones

function obtnerTareas (){ // Obtener tareas del LocalStorage

    let arrTareas = [];

    if ( localStorage.getItem('tareas') === null ){
        arrTareas = [];
    }else{
        arrTareas = JSON.parse( localStorage.getItem('tareas') );
    }

    return arrTareas;

}

function agregarTarea (e){ // Agregar tarea al LocalStorage
    e.preventDefault();

    let txt , arrTareas , idTarea , objTarea;
     
    txt = id('#txtTarea');

    if ( txt.value.length === 0 ){
        txt.focus();
        txt.style = 'box-shadow : 0px 0px 5px red';
        return 0;
    }
    txt.style = 'box-shadow : none';

    arrTareas = obtnerTareas();
    idTarea = arrTareas.length === 0 ? 0 : arrTareas[arrTareas.length-1].id;

    objTarea = {
        id      : idTarea + 1,
        tarea   : txt.value,
        estado  : 0
    };

    arrTareas.push( objTarea );    
    localStorage.setItem( 'tareas' , JSON.stringify( arrTareas ) );

}

