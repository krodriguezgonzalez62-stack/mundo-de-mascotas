
"use strict";

/* =====================================
   1. MENÚ DE NAVEGACIÓN
===================================== */

const botonMenu = document.getElementById("boton-menu");
const enlacesMenu = document.getElementById("enlaces-menu");

botonMenu.addEventListener("click", () => {

    const abierto = enlacesMenu.classList.toggle("abierto");

    botonMenu.setAttribute("aria-expanded", String(abierto));

});

enlacesMenu.querySelectorAll("a").forEach(enlace => {

    enlace.addEventListener("click", () => {

        enlacesMenu.classList.remove("abierto");

        botonMenu.setAttribute("aria-expanded", "false");

    });

});


/* =====================================
   2. CAMBIAR EL TEMA DE LA PÁGINA
===================================== */

const botonTema = document.getElementById("boton-tema");

botonTema.addEventListener("click", () => {

    const oscuro = document.body.classList.toggle("tema-oscuro");

    botonTema.textContent = oscuro
        ? "Usar tema claro"
        : "Cambiar tema";

});


/* =====================================
   3. FILTRAR LAS RAZAS DE MASCOTAS
===================================== */

const filas = document.querySelectorAll("tbody tr[data-animal]");

const resultadoFiltro = document.getElementById("resultado-filtro");

document.querySelectorAll(".filtro").forEach(boton => {

    boton.addEventListener("click", () => {

        const filtro = boton.dataset.filtro;

        let visibles = 0;

        filas.forEach(fila => {

            const mostrar =
                filtro === "todos" ||
                fila.dataset.animal === filtro;

            fila.hidden = !mostrar;

            if (mostrar) {
                visibles++;
            }

        });

        document.querySelectorAll(".filtro").forEach(b => {
            b.classList.remove("activo");
        });

        boton.classList.add("activo");

        resultadoFiltro.textContent =
            `Se muestran ${visibles} razas: ${
                filtro === "todos"
                    ? "todas las mascotas"
                    : filtro.toLowerCase() + "s"
            }.`;

    });

});


/* =====================================
   4. VALIDACIÓN DEL FORMULARIO
===================================== */

const formulario = document.getElementById("formulario-mascotas");

const mensaje = document.getElementById("mensaje-formulario");

formulario.addEventListener("submit", evento => {

    evento.preventDefault();

    mensaje.className = "mensaje";

    const nombre = formulario.elements.nombre.value.trim();

    const correo = formulario.elements.correo.value.trim();

    const mascota = formulario.elements.mascota.value;


    // Validar nombre

    if (nombre.length < 2) {

        mensaje.textContent =
            "Escribe un nombre de al menos dos caracteres.";

        mensaje.classList.add("error");

        formulario.elements.nombre.focus();

        return;

    }


    // Validar correo electrónico

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!correoValido) {

        mensaje.textContent =
            "Ingresa un correo electrónico válido.";

        mensaje.classList.add("error");

        formulario.elements.correo.focus();

        return;

    }


    // Validar selección de mascota

    if (!mascota) {

        mensaje.textContent =
            "Selecciona tu mascota preferida.";

        mensaje.classList.add("error");

        formulario.elements.mascota.focus();

        return;

    }


    // Comprobar los demás campos

    if (!formulario.checkValidity()) {

        mensaje.textContent =
            "Revisa los campos: algunos valores están fuera del rango permitido.";

        mensaje.classList.add("error");

        formulario.reportValidity();

        return;

    }


    // Mostrar mensaje de confirmación

    mensaje.textContent =
        `¡Gracias, ${nombre}! Registramos tu preferencia por ${mascota.toLowerCase()} en esta demostración. No se enviaron datos a ningún servidor.`;

    mensaje.classList.add("exito");

});


/* =====================================
   5. LIMPIAR EL FORMULARIO
===================================== */

formulario.addEventListener("reset", () => {

    mensaje.textContent = "";

    mensaje.className = "mensaje";

});
