class GestorUsuarios{
  constructor(){
    this.usuarios = [];
    this.getData();
  }

  getData(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET","https://jsonplaceholder.typicode.com/users");
    xhr.send();

    xhr.onload = () =>{
      if(xhr.status === 200){
        this.usuarios = JSON.parse(xhr.responseText);
        console.log(this.usuarios);
      }
    }
  }


  listarNombres(){
   let nombre = this.usuarios.map(usuario => usuario.name);
   console.log(nombre);
  }

  mostrarInfoUsuario(){
    let nombre = prompt("Ingrese nombre del usuario: ");
    let usuario = this.usuarios.find(usuario => usuario.name === nombre);
    if(usuario){
      console.log(`Username: ${usuario.username}`);
      console.log(`Email: ${usuario.email}`);
    }
    else{
      console.log("Usuario no encontrado");
    }
  }

  mostarDireccionUsuario(){
    let nombre = prompt("Ingrese nombre del usuario:");
    let usuario = this.usuarios.find(usuario => usuario.name === nombre);
    if(usuario){
        console.log(`Street: ${usuario.address.street}`);
        console.log(`Suite: ${usuario.address.suite}`);
        console.log(`City: ${usuario.address.city}`);
        console.log(`Zipcode: ${usuario.address.zipcode}`);
    }else{
      console.log("Usuario no encontrado");
    }
  }

  mostrarInfoAvanUsuario(){
    let nombre = prompt("Ingrese nombre del usuario:");
    let usuario = this.usuarios.find(usuario => usuario.name === nombre);
    if(usuario){
      console.log(`Phone: ${usuario.phone}`);
      console.log(`Website: ${usuario.website}`);
      console.log(`Company: ${usuario.company.name}`);
    }else{
      console.log("Usuario no encontrado");
    }
  }

  listarCompanies(){
    this.usuarios.forEach(usuario => {
    console.log(`${usuario.company.name}: ${usuario.company.catchPhrase} \n`)
    });
  }

  listarNombresAlfabetic(){
    let nombres = this.usuarios.map(usuario => usuario.name).sort();
    console.log(nombres);
  }

}

let gestor = new GestorUsuarios();

  // Botones HTML para llamar a cada método
let listarNombresBtn = document.getElementById("listar-nombres-btn");
listarNombresBtn.addEventListener("click", () => gestor.listarNombres());

let mostrarInfoUsuarioBtn = document.getElementById("mostrar-info-usuario-btn");
mostrarInfoUsuarioBtn.addEventListener("click", () => gestor.mostrarInfoUsuario());

let mostrarDireccionUsuarioBtn = document.getElementById("mostrar-direccion-usuario-btn");
mostrarDireccionUsuarioBtn.addEventListener("click", () => gestor.mostarDireccionUsuario());

let mostrarInfoAvanUsuarioBtn = document.getElementById("mostrar-info-avan-usuario-btn");
mostrarInfoAvanUsuarioBtn.addEventListener("click", () => gestor.mostrarInfoAvanUsuario());

let listarCompaniesBtn = document.getElementById("listar-comp-btn");
listarCompaniesBtn.addEventListener("click", () => gestor.listarCompanies());

let listarNombresAlfabeticBtn = document.getElementById("listar-nombres-alf-btn");
listarNombresAlfabeticBtn.addEventListener("click", () => gestor.listarNombresAlfabetic());