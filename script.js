// Formulario de Cambio de Turno
// Validaciones e interacción del lado del cliente.
// Usa datos ficticios: no representa la configuración ni los datos de ningún cliente real.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCambioTurno");
  const nombre = document.getElementById("nombre");
  const identificacion = document.getElementById("identificacion");
  const turnoActual = document.getElementById("turnoActual");
  const turnoPropuesto = document.getElementById("turnoPropuesto");
  const fechaCambio = document.getElementById("fechaCambio");
  const mensajeError = document.getElementById("mensajeError");
  const mensajeExito = document.getElementById("mensajeExito");

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    ocultarMensajes();

    if (!validarFormulario()) return;

    // En un entorno real, aquí se enviaría la información a un servicio
    // (por ejemplo, un flujo de Power Automate) mediante fetch().
    const solicitud = {
      nombre: sanitizarTexto(nombre.value),
      identificacion: sanitizarTexto(identificacion.value),
      turnoActual: turnoActual.value,
      turnoPropuesto: turnoPropuesto.value,
      fechaCambio: fechaCambio.value,
    };

    console.log("Solicitud de cambio de turno:", solicitud);

    mostrarExito("Solicitud enviada correctamente.");
    form.reset();
  });

  function validarFormulario() {
    if (!nombre.value.trim()) {
      mostrarError("Ingresa el nombre completo.");
      return false;
    }
    if (!/^\d{6,12}$/.test(identificacion.value.trim())) {
      mostrarError("Ingresa un número de identificación válido.");
      return false;
    }
    if (!turnoActual.value) {
      mostrarError("Selecciona el turno actual.");
      return false;
    }
    if (!turnoPropuesto.value) {
      mostrarError("Selecciona el turno propuesto.");
      return false;
    }
    if (turnoActual.value === turnoPropuesto.value) {
      mostrarError("El turno propuesto debe ser diferente al turno actual.");
      return false;
    }
    if (!fechaCambio.value) {
      mostrarError("Selecciona la fecha del cambio.");
      return false;
    }
    return true;
  }

  function sanitizarTexto(texto) {
    return String(texto).replace(/[<>]/g, "").trim();
  }

  function mostrarError(texto) {
    mensajeError.textContent = texto;
    mensajeError.hidden = false;
  }

  function mostrarExito(texto) {
    mensajeExito.textContent = texto;
    mensajeExito.hidden = false;
  }

  function ocultarMensajes() {
    mensajeError.hidden = true;
    mensajeExito.hidden = true;
  }
});
