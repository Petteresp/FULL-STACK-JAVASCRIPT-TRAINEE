
let tabla = document.getElementById('mascotas');
let formNewMascota = document.getElementById('formNewMascota');

console.log("funciona")

const getMascotas = async() =>{

  const mascotas = await axios.get('http://localhost:3000/mascotas')
  
  console.log(mascotas.data.data.mascotas);

  mascotas.data.data.mascotas.forEach(function(mascota) {
    const fila = tabla.insertRow();
    fila.insertCell().innerText = mascota.id;
    fila.insertCell().innerText = mascota.nombre;
    fila.insertCell().innerText = mascota.propietario.run;
    fila.insertCell().innerText = mascota.propietario.nombre;
  });

  }
getMascotas()

const newMascota = (datos) => {

    axios.post('http://localhost:3000/mascotas',{
        body: datos
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  
  };

formNewMascota.addEventListener('submit', (e) =>{
    e.preventDefault();
    let datos = new FormData(formNewMascota)

  console.log("diste click", datos)
  console.log(datos.get('nombre'))
  console.log(datos.get('run'))
  console.log(datos.get('propietario'))
  newMascota(datos);
})

  
