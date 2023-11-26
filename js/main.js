function main() {
  //Mostrar el título del documento
  const pageTitleDiv = document.getElementById("page-title");
  displayTitle(pageTitleDiv);

  //Leer con JS, ni bien se cargue la página, los datos definidos en el HTML
  const primerIntegranteDiv = document.getElementById("primer-integrante");
  const segundoIntegranteDiv = document.getElementById("segundo-integrante");
  const integrantes = procesarIntegrantes(
    primerIntegranteDiv,
    segundoIntegranteDiv
  );

  //Analizar coincidencias en los nombres
  //Ver si los nombres cargados en el HTML coinciden en algún caso
  coincidenciaNombres(integrantes);

  //Consultar a través de un confirm si se desea comparar los apellidos
  //En caso contrario no tomar ninguna acción
  if (window.confirm("¿Desea comparar también los apellidos?")) {
    //Rrealizar la comparación de apellidos, con el mismo criterio que con los nombres
    //y realizar las mismas acciones
    coincidenciaApellidos(integrantes);
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
  var listContainer = document.getElementById("description-lists");
  var integrantes = getIntegrantes(listContainer);

  /*La generación del string con el nombre completo que se mostrará en consola del integrante
  no debe repetirse, sino lograr que una función lo lleve a cabo y simplemente
  llamarla una vez para cada integrante*/
  const primerIntegrante = getDatosIntegrante(integrantes[0]);
  const segundoIntegrante = getDatosIntegrante(integrantes[1]);

  outputDiv1.innerHTML = primerIntegrante;
  outputDiv2.innerHTML = segundoIntegrante;

  //Informar en la consola los nombres completos de cada integrante.
  //Debe utilizarse un único llamado a console.log para generar los 4 (2!) renglones
  const result = `Integrante 1: ${primerIntegrante}\nIntegrante 2: ${segundoIntegrante}`;
  console.log(result);

  return integrantes;
}

function getIntegrantes(containerDiv) {
  const integrantes = [];
  let primerNombre, segundoNombre, primerApellido, segundoApellido;

  var items = containerDiv.children;
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

function coincidenciaNombres(integrantes) {
  //Ver si coinciden los nombres
  const coincidencias = datosCoinciden(
    integrantes[0].primerNombre,
    integrantes[0].segundoNombre,
    integrantes[1].primerNombre,
    integrantes[1].segundoNombre
  );
  if (coincidencias.coincidencia) {
    //Encontramos una coincidencia
    //Avisar de la coincidencia y pedir un color
    color = notificarCoincidencia("N", coincidencias.valor);
    if (color) {
      var listContainer = document.getElementById("description-lists");
      destacarLista(listContainer, coincidencias.valor, color);
    }
  } else {
    document.getElementById("aviso-coincidencia-nombres").className =
      "aviso hidden";

    //Si, en cambio, no hay coincidencias, informar en la consola que no las hubo.
    console.log(
      "Lo siento, pero no hubo concidencias en los nombres de los integrantes."
    );
  }
}

function coincidenciaApellidos(integrantes) {
  //Ver si coinciden los apellidos
  const coincidencias = datosCoinciden(
    integrantes[0].primerApellido,
    integrantes[0].segundoApellido,
    integrantes[1].primerApellido,
    integrantes[1].segundoApellido
  );
  if (coincidencias.coincidencia) {
    //Encontramos una coincidencia
    //Avisar de la coincidencia y pedir un color
    color = notificarCoincidencia("A", coincidencias.valor);
    if (color) {
      var listContainer = document.getElementById("description-lists");
      destacarLista(listContainer, coincidencias.valor, color);
    }
  } else {
    document.getElementById("aviso-coincidencia-apellidos").className =
      "aviso hidden";

    //Si, en cambio, no hay coincidencias, informar en la consola que no las hubo.
    console.log(
      "Lo siento, pero no hubo concidencias en los apellidos de los integrantes."
    );
  }
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

function notificarCoincidencia(tipo, valorRepetido) {
  const nombresOApellidos = tipo === "N" ? "nombres" : "apellidos";
  document.getElementById(`aviso-coincidencia-${nombresOApellidos}`).className =
    "aviso visible";

  //Informar en la consola que hubo coincidencias
  console.log(
    `Hay concidencias en los ${nombresOApellidos} de los integrantes: ${valorRepetido}`
  );

  //Informar en un prompt que hubo coincidencias y solicitar en ese mismo prompt que se ingrese un color
  //para destacar los nombres (o apellidos)
  return window.prompt(
    `Hay concidencias en los ${nombresOApellidos} de los integrantes: ${valorRepetido}. 
    Escriba el código HTML válido de un color para destacar las coincidencias.`
  );
}

function destacarLista(containerDiv, valor, color) {
  var items = containerDiv.children;
  for (let i = 0; i < items.length; i++) {
    const listItem = items[i];

    if (listItem.tagName == "DL") {
      let childIndex = 0;

      while (childIndex < items[i].children.length) {
        let element = listItem.children[childIndex];
        if (element.tagName == "DT") {
          childIndex++;
          element = listItem.children[childIndex];

          if (element.tagName == "DD") {
            if (element.innerText === valor) {
              //Agregarle estilos en línea a los nombres coincidentes, de tal manera que se destaquen en color
              //los items de listas cuyos nombres (o apellidos) coincidan
              element.style.color = color;
            }
          }
        }
        childIndex++;
      }
    }
  }
}

//Invocar a la función main
main();
