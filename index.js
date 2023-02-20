//Elementos
const preguntaElement = document.querySelector("#pregunta");
const fraseElement = document.querySelector("#frase");
const respuestaElement = document.querySelector("#respuesta");
const footer = document.querySelector("footer");
const preguntarBoton = document.querySelector("#preguntar");
const reiniciarBoton = document.querySelector("#reiniciar");

//Variables
let fraseSecreta = "Calo, por favor me gustaría que me respondas";
let estadoTruco = false;
let respuestaSecreta = ""


//Tooltip
document.querySelector("#icono").addEventListener("mouseover", (event) => {
	tooltip.classList.toggle("escondido",false)
});

document.querySelector("#icono").addEventListener("mouseout", (event) => {
	tooltip.classList.toggle("escondido",true)
});


//Texto de frase mágica
fraseElement.addEventListener("input", (event) => {
  console.log(event);
	if(event.data === "-") {
		estadoTruco = !estadoTruco
		if(!estadoTruco) escribirLetraCorrecta()
	};
	if(estadoTruco){
		if(event.data === null){
			respuestaSecreta = respuestaSecreta.substring(0,respuestaSecreta.length-2);
		} else {
			respuestaSecreta += event.data;
		}
		escribirLetraCorrecta()
	}
	fraseElement.classList.toggle("correcta",fraseElement.value === fraseSecreta) 
});

preguntarBoton.addEventListener("click",()=> {
	if(preguntaElement.value === "") return responder("No puedo responder a una pregunta vacía");
	if(
		fraseElement.value !== fraseSecreta
		|| respuestaSecreta === ""
	){
		return responder("Algo no suena bien, preferiría no responder esa pregunta");
	}
	responder(respuestaSecreta);
})

reiniciarBoton.addEventListener("click",()=> {
	estadoTruco = false;
	fraseSecreta = "";
	preguntaElement.value = "";
	fraseElement.value = "";
	respuestaElement.textContent = "Hazme una pregunta"
	preguntaElement.focus();
})

function escribirLetraCorrecta(){
	const letraAAgregar = fraseSecreta[fraseElement.value.length-1]
	if(letraAAgregar === undefined) return estadoTruco = false;
	fraseElement.value = fraseElement.value.substring(0,fraseElement.value.length-1)+letraAAGregar;
}

function responder(respuesta){
	respuestaElement.textContent = respuesta;
	footer.classList.toggle("escondido",false);
}

preguntaElement.focus();