const host = '127.0.0.1';
const puerto = '3711';

document.querySelector("#btn_ver_siguientes").addEventListener("click", () => {
    if (document.querySelector("#rad-5-reg").checked) {
        mostrarPaises(5);
    }
    if (document.querySelector("#rad-10-reg").checked) {
        mostrarPaises(10);
    }
    if (document.querySelector("#rad-20-reg").checked) {
        mostrarPaises(20);
    }
});

async function mostrarPaises(filtro = ''){

    try{
        
        let response;
        if (filtro === '') {
            response = await axios.get(`http://${host}:${puerto}`);
        } else {
            response = await axios.get(`http://${host}:${puerto}?registros=${filtro}`);
        }

        if(response.data.length === 0){
            mostrarPaises(filtro)
        }else{
            imprimirPais(response);
        }

    }catch(error) {
        // handle error
        console.log(error);
    };
}

document.querySelector('#formulario_paises').addEventListener('submit', function(e) {
    e.preventDefault();
    
    console.log(e.target);

    axios({
        method: 'post',
        url: `http://${host}:${puerto}`,
        data: {
          nombre: document.querySelector('#txt_nombre').value,
          continente: document.querySelector('#txt_continente').value,
          poblacion: document.querySelector('#txt_poblacion').value,
          pib_2019: document.querySelector('#txt_pib_2019').value,
          pib_2020: document.querySelector('#txt_pib_2020').value,
        }
    }).then(function (response) {
        console.log(response);
        //handle success
        // mensajeRespuesta(response);
        // mostrarPaises();
        // if (response.data.result === 'success') {
            document.querySelector('#formulario_paises').reset();
            alert("Producto Agregado");
            // limpiarCampos();
        // }else{
            // document.querySelector('#txt_nombre').classList.add("error");
            // document.querySelector('#txt_nombre').focus();
        // }

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });

});
 
let btnEliminarPais = document.querySelector('#btn_eliminar_pais');

btnEliminarPais.addEventListener('click',function(e){

    let url;
    let nombre = document.querySelector('#txt_nombre_eliminar').value;
    
    if (nombre.length > 0) {
        url = `http://${host}:${puerto}/?nombre=${nombre}`;
    }

    axios.delete(url).then( res => {
        console.log(res);
        alert("Eliminado");
        // mensajeRespuesta(res);
        // mostrarPaises();

        // if (res.data.result === 'success') {
        //     limpiarCampos();
        // }else{
        //     if (nombre.length > 0) {
        //         document.querySelector('#txt_nombre_eliminar').classList.add("error");
        //         document.querySelector('#txt_nombre_eliminar').focus();
        //     }
        // }

    }).catch(function (error) {
        // handle error
        console.log(error);
    });   


});


function imprimirPais(response){

    
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    thead.innerHTML = 
    
    `<tr>
        <th>Nombre</th>
        <th>Continente</th>
        <th>Poblacion</th>
        <th>Pib 2019</th>
        <th>Pib 2020</th>
    </tr>
    `; 
    
    let tbody = document.createElement('tbody');
    
    response.data.forEach(pais => {
        let tr =  
        `<tr>
            <td><strong>${pais.nombre}</strong></td>
            <td><strong>${pais.continente}</strong></td>
            <td><strong>${pais.poblacion}</strong></td>
            <td><strong>${pais.pib_2019}</strong></td>
            <td><strong>${pais.pib_2020}</strong></td>
        </tr>`
            
        tbody.innerHTML += tr;
    });


    table.appendChild(thead);
    table.appendChild(tbody);

    document.querySelector("#list-paises").innerHTML = '';
    document.querySelector("#list-paises").appendChild(table);

}

// function mensajeRespuesta(response){

//     if(response.data.result === 'success'){
//         document.querySelector("#response").classList.remove('hidden')
//         document.querySelector("#response").classList.add('success');
//         document.querySelector("#response").firstElementChild.textContent = response.data.details;
//         setTimeout(() => {
//             document.querySelector("#response").classList.remove('success')
//             document.querySelector("#response").classList.add('hidden');
//             document.querySelector("#response").firstElementChild.textContent = '';
//         }, 4000);
//     }else{
//         document.querySelector("#response").classList.remove('hidden')
//         document.querySelector("#response").classList.add('error');
//         document.querySelector("#response").firstElementChild.textContent = response.data.details;
//         setTimeout(() => {
//             document.querySelector("#response").classList.remove('error')
//             document.querySelector("#response").classList.add('hidden');
//             document.querySelector("#response").firstElementChild.textContent = '';
//         }, 4000);
//     }
// }

document.querySelectorAll('input').forEach( element => {

    element.addEventListener('blur', (e) => {
        e.target.classList.remove('error')
    });

});

function limpiarCampos() {
    document.querySelectorAll('input[type!=submit]').forEach(element => {
        element.value = '';
        element.classList.remove('error');
    });
}
