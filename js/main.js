function main() {
  //Mostrar el título del documento
  const pageTitleDiv = document.getElementById("page-title");
  displayTitle(pageTitleDiv);

  //Leer los datos de los integrantes y mostrarlos
  const primerIntegranteDiv = document.getElementById("primer-integrante");
  const segundoIntegranteDiv = document.getElementById("segundo-integrante");
  const integrantes = procesarIntegrantes(
    primerIntegranteDiv,
    segundoIntegranteDiv
  );

  //Ver si coinciden los nombres
  const coincidencias = datosCoinciden(
    integrantes[0].primerNombre,
    integrantes[0].segundoNombre,
    integrantes[1].primerNombre,
    integrantes[1].segundoNombre
  );
  if (coincidencias.coincidencia) {
    //Encontramos una coincidencia
    document.getElementById("aviso-coincidencia").className = "aviso visible";
    console.log(
      `Hay concidencias en los nombres de los integrantes: ${coincidencias.valor}`
    );
  } else {
    document.getElementById("aviso-coincidencia").className = "aviso hidden";
  }
}

function displayTitle(outputDiv) {
  //Con JS leer directamente el contenido del elemento <title> e imprimirlo en la consola.
  let title = document.title;
  console.log(`Título del documento: ${title}`);
  outputDiv.innerHTML = title;
}

function procesarIntegrantes(outputDiv1, outputDiv2) {
  //Obtener los datos de las listas
  var integrantes = getIntegrantes("description-lists");

  const primerIntegrante = getDatosIntegrante(integrantes[0]);
  const segundoIntegrante = getDatosIntegrante(integrantes[1]);

  outputDiv1.innerHTML = primerIntegrante;
  outputDiv2.innerHTML = segundoIntegrante;

  const result = `Integrante 1: ${primerIntegrante}\nIntegrante 2: ${segundoIntegrante}`;
  console.log(result);

  return integrantes;
}

function getIntegrantes(containerDiv) {
  const integrantes = [];
  let primerNombre, segundoNombre, primerApellido, segundoApellido;

  var items = document.getElementById(containerDiv).children;
  for (let i = 0; i < items.length; i++) {
    const listItem = items[i];

    if (listItem.tagName == "DL") {
      //Encontré un description list. Corresponde a un nuevo integrante
      let childIndex = 0;
      primerNombre = "";
      segundoNombre = "";
      primerApellido = "";
      segundoApellido = "";

      while (childIndex < items[i].children.length) {
        let element = listItem.children[childIndex];
        if (element.tagName == "DT") {
          //Nombre del description term
          const termName = element.innerText;

          //Encontré un description term. Buscar el description definition
          //El tag DD debería estar después del DT
          childIndex++;
          element = listItem.children[childIndex];

          if (element.tagName == "DD") {
            switch (termName) {
              case "Primer nombre":
                primerNombre = element.innerText;
                break;
              case "Segundo nombre":
                segundoNombre = element.innerText;
                break;
              case "Primer apellido":
                primerApellido = element.innerText;
                break;
              case "Segundo apellido":
                segundoApellido = element.innerText;
                break;

              default:
                break;
            }
          }
        }
        childIndex++;
      }

      debugger;
      //Agregar los datos del integrante al array de integrantes
      const integrante = {
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
      };
      integrantes.push(integrante);
    }
  }
  return integrantes;
}

function getDatosIntegrante(integrante) {
  //Inicializar una variable string para guardar el nombre completo
  let nombreCompleto = "";

  //Concatenar los nombres y los apellidos, estos en mayúsculas
  if (integrante.primerNombre) {
    nombreCompleto += integrante.primerNombre + " ";
  }
  if (integrante.segundoNombre) {
    nombreCompleto += integrante.segundoNombre + " ";
  }
  if (integrante.primerApellido) {
    nombreCompleto += integrante.primerApellido.toUpperCase() + " ";
  }
  if (integrante.segundoApellido) {
    nombreCompleto += integrante.segundoApellido.toUpperCase() + " ";
  }

  // Quitar el último espacio
  return nombreCompleto.trim();
}

function datosCoinciden(n1, n2, n3, n4) {
  if (n1 === n3 || n1 == n4)
    return {
      coincidencia: true,
      valor: n1,
    };

  if (n2 === n3 || n2 == n4)
    return {
      coincidencia: true,
      valor: n2,
    };
}

//Invocar a la función main
main();
