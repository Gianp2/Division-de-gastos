function agregarPersona() {
  const personasDiv = document.getElementById("personas");

  const divPersona = document.createElement("div");
  divPersona.classList.add("persona-aporte");

  const inputNombre = document.createElement("input");
  inputNombre.type = "text";
  inputNombre.placeholder = "Nombre";
  inputNombre.classList.add("nombre-persona");
  inputNombre.required = true;

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
  resultado.innerHTML = ""; // Limpiar resultado anterior

  const nombresInputs = personasDiv.querySelectorAll(".nombre-persona");
  const aportesInputs = personasDiv.querySelectorAll(".aporte-persona");
  const totalPersonas = nombresInputs.length;

  if (totalPersonas === 0) {
    resultado.innerHTML = `<p class="error">Agrega al menos una persona.</p>`;
    return;
  }

  let aportes = [];

  for (let i = 0; i < totalPersonas; i++) {
    const nombre = nombresInputs[i].value.trim();
    const aporte = parseFloat(aportesInputs[i].value);

    if (!nombre) {
      resultado.innerHTML = `<p class="error">Por favor ingresa un nombre para la persona ${i + 1}.</p>`;
      return;
    }

    if (isNaN(aporte) || aporte < 0) {
      resultado.innerHTML = `<p class="error">Revisa el aporte de <strong>${nombre}</strong>, debe ser un número válido.</p>`;
      return;
    }

    aportes.push({ nombre, aporte });
  }

  let totalGastado = parseFloat(document.getElementById("gastoTotal").value);
  if (isNaN(totalGastado) || totalGastado === 0) {
    totalGastado = aportes.reduce((acc, p) => acc + p.aporte, 0);
  }

  const montoPorPersona = totalGastado / totalPersonas;

  // Mostrar resumen general
  const resumenGeneral = document.createElement("p");
  resumenGeneral.innerHTML = `
    <strong>Total gastado:</strong> $${totalGastado.toFixed(2)}<br>
    <strong>Cada persona debería poner:</strong> $${montoPorPersona.toFixed(2)}
  `;
  resultado.appendChild(resumenGeneral);

  // Mostrar resumen individual
  const resumenDiv = document.createElement("div");
  resumenDiv.classList.add("resumen-personas");

  aportes.forEach(({ nombre, aporte }) => {
    const diferencia = aporte - montoPorPersona;
    const personaResumen = document.createElement("div");
    personaResumen.classList.add("persona-resumen");

    if (Math.abs(diferencia) < 0.01) {
      personaResumen.textContent = `${nombre} puso lo justo.`;
      personaResumen.classList.add("justo");
    } else if (diferencia < 0) {
      personaResumen.textContent = `${nombre} debe poner $${Math.abs(diferencia).toFixed(2)} más.`;
      personaResumen.classList.add("falta");
    } else {
      personaResumen.textContent = `${nombre} puso $${diferencia.toFixed(2)} de más y debe recibirlo.`;
      personaResumen.classList.add("sobra");
    }

    resumenDiv.appendChild(personaResumen);
  });

  resultado.appendChild(resumenDiv);
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.error("Error al registrar el Service Worker:", err);
    });
  });
}
