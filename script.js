function agregarPersona() {
  const personasDiv = document.getElementById("personas");

  const divPersona = document.createElement("div");
  divPersona.classList.add("persona-aporte");

  // Input para el nombre
  const inputNombre = document.createElement("input");
  inputNombre.type = "text";
  inputNombre.placeholder = "Nombre";
  inputNombre.classList.add("nombre-persona");
  inputNombre.required = true;

  // Input para el aporte
  const inputAporte = document.createElement("input");
  inputAporte.type = "number";
  inputAporte.min = "0";
  inputAporte.step = "0.01";
  inputAporte.placeholder = "0.00";
  inputAporte.classList.add("aporte-persona");
  inputAporte.required = true;

  divPersona.appendChild(inputNombre);
  divPersona.appendChild(inputAporte);

  personasDiv.appendChild(divPersona);
}

function calcularGastos() {
  const personasDiv = document.getElementById("personas");
  const resultado = document.getElementById("resultado");
  const gastoTotalInput = document.getElementById("gastoTotal");

  const nombresInputs = personasDiv.querySelectorAll(".nombre-persona");
  const aportesInputs = personasDiv.querySelectorAll(".aporte-persona");

  let totalPersonas = nombresInputs.length;
  if (totalPersonas === 0) {
    resultado.textContent = "Agrega al menos una persona.";
    return;
  }

  let aportes = [];

  for (let i = 0; i < totalPersonas; i++) {
    const nombre = nombresInputs[i].value.trim();
    const aporte = parseFloat(aportesInputs[i].value);

    if (!nombre) {
      resultado.textContent = `Por favor ingresa un nombre para la persona ${i + 1}.`;
      return;
    }

    if (isNaN(aporte) || aporte < 0) {
      resultado.textContent = `Revisa el aporte de ${nombre}, debe ser un número válido.`;
      return;
    }

    aportes.push({ nombre, aporte });
  }

  let totalGastado = parseFloat(gastoTotalInput.value);
  if (isNaN(totalGastado) || totalGastado === 0) {
    totalGastado = aportes.reduce((acc, curr) => acc + curr.aporte, 0);
  }

  const montoPorPersona = totalGastado / totalPersonas;

  let mensaje = `Total gastado: $${totalGastado.toFixed(2)}.\nCada persona debería poner: $${montoPorPersona.toFixed(2)}.\n\n`;

  aportes.forEach(({ nombre, aporte }) => {
    const diferencia = aporte - montoPorPersona;
    if (Math.abs(diferencia) < 0.01) {
      mensaje += `${nombre} puso lo justo.\n`;
    } else if (diferencia < 0) {
      mensaje += `${nombre} debe poner $${Math.abs(diferencia).toFixed(2)} más.\n`;
    } else {
      mensaje += `${nombre} puso $${diferencia.toFixed(2)} de más y debe recibir ese monto.\n`;
    }
  });

  resultado.textContent = mensaje;
}
