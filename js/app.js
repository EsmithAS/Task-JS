// variables
let id = document.querySelector.bind(document);
const lista = id('#lista-tareas');
id('#Todas').style.color = '#23272B';


// AddEventListener

addEventListener();

function addEventListener(){

    document.addEventListener( 'DOMContentLoaded' , mostrarTareas );
    id('#contenido').addEventListener( 'click', accionTarea );
    id('#menu').addEventListener( 'click', menu );

    switch(parseInt(localStorage.getItem('menu'))){
        case 0:
                id('#Pendientes').style.color = '#23272B'; break;
        case 1:
                id('#Realizadas').style.color = '#23272B'; break;
        case 2:   
                id('#Todas').style.color = '#23272B';break;
    }
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

function agregarTarea (){ // Agregar tarea al LocalStorage

    if(id('#agregar').value === 'Cancelar'){
        id('#actualizar').classList.add('Actualizar');
        id('#agregar').value = 'Agregar';
        return 0;
    }

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
    mostrarTareas();
}

function mostrarTareas () { // Mostrar tareas del LocalStorage
    
    if (localStorage.getItem('menu')== null){
        localStorage.setItem('menu',2);
    }
    let filtro = parseInt(localStorage.getItem('menu'));
    
    
    lista.innerHTML = '';
    let liTarea = function ( id , tarea , clase ){
        const estado = clase === 'green' ? 'volver' : 'check';
        return `
                <li id="item-${id}" class="${clase}">
                    ${tarea}
                    <span>
                        <svg id="editar" data-bind="${id}" class="icon ${clase}">
                            <use href="img/iconos/icons.svg#lapiz"/> 
                        </svg>
                        <svg id="estado" data-bind="${id}" class="icon ${clase}">
                            <use href="img/iconos/icons.svg#${estado}"/> 
                        </svg>
                        <svg id="eliminar" data-bind="${id}" class="icon ${clase}">
                            <use href="img/iconos/icons.svg#x"/> 
                        </svg>
                    </span>
                </li>
            `;
    } 
    
    obtnerTareas().forEach( function ( obj ) {

        // gray - red - green
        const id = obj.id;
        const tarea = obj.tarea;
        const clase  = obj.estado === 0 ? 'red' : 'green';
        
        
        if ( obj.estado === filtro ){
            lista.innerHTML += liTarea( id , tarea , clase );
        }else {
            if ( filtro === 2 ){
                lista.innerHTML += liTarea( id , tarea , clase );
            } 
        }      
        
    });
}

function accionTarea (e) {

    e.preventDefault();

    const target = e.target.tagName === 'use' ? e.target.parentElement : e.target;
    
    if (target.tagName === 'svg' || target.id === 'actualizar' || target.id === 'agregar' ){

        const idTarea = target.getAttribute('data-bind');

        switch( target.id ){
    
            case 'actualizar'   : actualizarTareas( parseInt(idTarea) , target.id ); id('#txtTarea').value = '' ; break;
            case 'agregar'   : agregarTarea()     ; break;
            case 'editar'   : editar( parseInt(idTarea) )     ; break;
            case 'estado' : actualizarTareas( parseInt(idTarea) , target.id )   ; break;
            case 'eliminar' : actualizarTareas( parseInt(idTarea) , target.id )   ; break;
    
        }

    }        

}


function actualizarTareas ( idTarea , valor  ){

    const arrTareas = obtnerTareas();
    const txt = id('#txtTarea');

    if ( txt.value.length === 0 && valor === 'actualizar'){
        txt.focus();
        txt.style = 'box-shadow : 0px 0px 5px red';
        return 0;
    }
    txt.style = 'box-shadow : none';

    arrTareas.forEach( function ( obj , index ){

        if ( obj.id === idTarea ){
            switch(valor){
                case 'estado'    :  obj.estado = obj.estado === 0 ? 1 : 0; break; 

                case 'actualizar':  obj.tarea = txt.value
                                    id('#actualizar').classList.add('Actualizar');
                                    id('#agregar').value = 'Agregar'; break;
                                     
                case 'eliminar': arrTareas.splice(index,1); break; 
            }
        }
    });
    
    localStorage.setItem( 'tareas' , JSON.stringify( arrTareas ) );
    mostrarTareas();
}

function editar ( idTarea ) {

    const li = document.getElementById('item-'+idTarea);
        
    id('#actualizar').classList.remove('Actualizar');
    id('#agregar').value = 'Cancelar';
    id('#txtTarea').value = li.textContent.trim();
    id('#actualizar').setAttribute('data-bind',idTarea);

}

function menu (e){
    const a = e.target;
    if( a.tagName.toLowerCase() === 'a' ){
        
        id('#Todas').style.color = '#727272';
        id('#Pendientes').style.color = '#727272';
        id('#Realizadas').style.color = '#727272';

        switch(a.id){
            case 'Todas':   
                            id('#Todas').style.color = '#23272B';
                            localStorage.setItem('menu',2); break;
            case 'Pendientes':
                            id('#Pendientes').style.color = '#23272B';
                            localStorage.setItem('menu',0); break;
            case 'Realizadas':
                            id('#Realizadas').style.color = '#23272B';
                            localStorage.setItem('menu',1); break;
        }
    }
    
    mostrarTareas();
     
}