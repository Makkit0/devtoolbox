const jsonInput = document.getElementById("jsonInput");
const jsonOutput = document.getElementById("jsonOutput");
const jsonMessage = document.getElementById("jsonMessage");
const jsonInfo = document.getElementById("jsonInfo");

const formatBtn = document.getElementById("formatBtn");
const minifyBtn = document.getElementById("minifyBtn");
const validateBtn = document.getElementById("validateBtn");
const copyBtn = document.getElementById("copyBtn");
const swapBtn = document.getElementById("swapBtn");
const clearBtn = document.getElementById("clearBtn");


function parseJSON() {
    try {
        return JSON.parse(jsonInput.value);
    } catch (error) {
        jsonMessage.textContent = "JSON inválido: " + error.message;
        return null;
    }
}

function getJSONInfo(data) {
    let type = "Desconocido";
    let keys = 0;
    let elements = 0;

    if (Array.isArray(data)) {
        type = "Array";
        elements = data.length;
    } else if (data !== null && typeof data === "object") {
        type = "Objeto";
        keys = Object.keys(data).length;
        elements = Object.keys(data).length;
    } else {
        type = typeof data;
    }

    return {
        type,
        keys,
        elements
    };
}

formatBtn.addEventListener("click", function () {
    const data = parseJSON();

    if (data === null) {
        jsonOutput.value = "";
        return;
    }

    jsonOutput.value = JSON.stringify(data, null, 2);
    jsonMessage.textContent = "JSON válido y formateado correctamente.";
});


minifyBtn.addEventListener("click", function () {
    const data = parseJSON();

    if (data === null) {
        jsonOutput.value = "";
        return;
    }

    jsonOutput.value = JSON.stringify(data);
    jsonMessage.textContent = "JSON minificado correctamente.";
});


validateBtn.addEventListener("click", function () {
    const data = parseJSON();

    if (data === null) {
        jsonOutput.value = "";
        jsonInfo.textContent = "";
        return;
    }

    jsonOutput.value = JSON.stringify(data, null, 2);
    jsonMessage.textContent = "✓ JSON válido.";

    const info = getJSONInfo(data);

    jsonInfo.innerHTML = `
        <strong>Información:</strong>
        Tipo: ${info.type} |
        Claves: ${info.keys} |
        Elementos: ${info.elements}
    `;
});


copyBtn.addEventListener("click", async function () {
    if (!jsonOutput.value) {
        jsonMessage.textContent = "No hay ningún resultado para copiar.";
        return;
    }

    try {
        await navigator.clipboard.writeText(jsonOutput.value);
        jsonMessage.textContent = "✓ Resultado copiado al portapapeles.";
    } catch (error) {
        jsonMessage.textContent = "No se pudo copiar el resultado.";
    }
});

swapBtn.addEventListener("click", function () {
    if (!jsonOutput.value) {
        jsonMessage.textContent = "No hay ningún resultado para intercambiar.";
        return;
    }

    jsonInput.value = jsonOutput.value;
    jsonMessage.textContent = "✓ Resultado colocado como nueva entrada.";
});


clearBtn.addEventListener("click", function () {
    jsonInput.value = "";
    jsonOutput.value = "";
    jsonMessage.textContent = "";
    jsonInfo.textContent = "";
});