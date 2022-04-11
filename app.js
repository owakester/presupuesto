/* Llamada a appscript de google para visualizar google traer info de google sheet */
const url =
  "https://script.googleusercontent.com/macros/echo?user_content_key=vnHuywflHe_zQofXqN3BUPCJnsdJP3B23mpAdv_0tjJDcKK3KiW2DmPbhppgRug3RtD2yK0QR5HFmYw3ZMXsT16Hut-jaHC9m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNp7Wvz1S9DlOpYU-m7C4Af5uiiWsECooCstuXwhaamhlA1k8_lGmEnjiOFDwZjmmibMYSZXCy_C6ooBgau1i-yuB1F9lqGT7dz9Jw9Md8uu&lib=MFK4xC7y3sT0GDrArtd8YFwhvTfcvbrpA";

const contenedorCarrito =
  document.querySelector(
    "#descripcion tbody"
  ); /* Despliega info de JSON en table. */
const agregarP = document.querySelector("#agregar tbody");

let carrito = [];

let listaProducto = [];
let suma = 0;
let ultimo = 0;
let counts=0;

ultimo = listaProducto[listaProducto.length - 1];
/* listaProducto.forEach(agregando); */
function agregando(i) {

listaProducto.push({producto1:carrito[i].nombre, precio1:carrito[i].precio, id1:carrito[i].id});
let lastid=listaProducto[listaProducto.length-1].id1



counts = carrito[i].id;

if (lastid===listaProducto.some(item=>item.id1)) {
  console.log(lastid+"se encuentra en"+counts)
} else {
  console.log("no se encuentra")
}


console.log(counts)


  const row1 = document.createElement("tr");

  row1.innerHTML = ` 
  <td>${carrito[i].id} </td>
  <td>${carrito[i].nombre} </td>
  <td>$ ${carrito[i].precio} </td>
  `;
  suma = suma + carrito[i].precio;
  let cantidad = 0;






  /*     console.log(suma) */
  let total = (document.querySelector("#total").textContent = "$" + suma);
/*   console.log(total); */
  agregarP.appendChild(row1);





}




/* function agregando(i) {
  let hAtribute = (document
    .getElementById("mas")
    .getAttribute("data-id").innerHTML = i);
  document.getElementById("prueba").innerHTML = hAtribute;
} */

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => {
    let pagina1 = 10;
    let i = 0;

    ejecutar();

    function ejecutar() {
      var table = $("#descripcion > tbody > tr > td ").remove();
      for (i; i < jsondata.data.length; i++) {
        const row = document.createElement("tr");
        row.className="mitabla";
        const agregar = document.createElement("tr");

        let articulos = {
          nombre: jsondata.data[i].Producto,
          medida: jsondata.data[i].Medida,
          precio: jsondata.data[i].Precio,
        };
        row.innerHTML = `
             <td><button onclick="agregando(${i})"data-id="${(articulos.id =
          i)}" id="mas" class="btn btn-blue"><ion-icon size="large" name="add-circle-outline"></ion-icon></button>${
          articulos.nombre
        } </td>
             <td>${articulos.medida} </td>
             <td>${articulos.precio} </td>
        `;
     /*    console.log(articulos.nombre) */
        carrito.push(articulos);
        contenedorCarrito.appendChild(row);
        agregarP.appendChild(agregar);

        if (i == pagina1) {
          i += +1;
          siguiente(pagina1);
          pagina1 = pagina1 + 10;
          break;
        }
      } //for
    }

    function siguiente(pagina1) {
      /*  console.log("hola  "+pagina1) */

      document.getElementById("btn").addEventListener("click", ejecutar);
    }
  });