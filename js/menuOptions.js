const menu = document.getElementById("optionsMenu");
const textValue = document.getElementById("textValue");
const bgColor = document.getElementById("bgColor");
const opacity = document.getElementById("opacidad");
const textColor = document.getElementById("textColor");
const fuente = document.getElementById("fuente");
const fuenteTam = document.getElementById("fuenteTam");

textValue.addEventListener('keydown', ()=>{
    setTimeout(() => {
        if(document.getElementById("textP").textContent == "Texto: "){
            document.querySelector(".selected").textContent = textValue.value;
        }
        else if(document.getElementById("textP").textContent == "URL: "){
            document.querySelector(".selected").src = textValue.value;
        }
    }, 1);
});

bgColor.addEventListener('change', ()=>{
    document.querySelector(".selected").style.backgroundColor = bgColor.value;
});

fuente.addEventListener('change', ()=>{
    document.querySelector(".selected").style.fontFamily = fuente.value;
});

textColor.addEventListener('change', ()=>{
    document.querySelector(".selected").style.color = textColor.value;
});

opacity.addEventListener('change', ()=>{
    let valor = parseFloat(document.querySelector(".selected").style.opacity);
    if(valor >= 0 && valor <= 1){
        document.querySelector(".selected").style.opacity = opacity.value;
    }
    else{
        document.querySelector(".selected").style.opacity = "1";
        opacity.value = 1.0;
    }
});

opacity.addEventListener('keydown', ()=>{
    setTimeout(() => {
        let valor = parseFloat(document.querySelector(".selected").style.opacity);
        if(valor >= 0 && valor <= 1){
            document.querySelector(".selected").style.opacity = opacity.value;
        }
        else{
            document.querySelector(".selected").style.opacity = "1";
            opacity.value = 1.0;
        }
    }, 1);
});

fuenteTam.addEventListener('change', ()=>{
    let valor = parseFloat(document.querySelector(".selected").style.fontSize);
    if(valor >= 1 && valor <= 100){
        document.querySelector(".selected").style.fontSize = fuenteTam.value+"px";
    }
    else{
        document.querySelector(".selected").style.fontSize = "15px";
        fuenteTam.value = 15.0;
    }
});

fuenteTam.addEventListener('keydown', ()=>{
    setTimeout(() => {
        let valor = parseFloat(document.querySelector(".selected").style.fontSize);
        if(valor >= 1 && valor <= 100){
            document.querySelector(".selected").style.fontSize = fuenteTam.value+"px";
        }
        else{
            document.querySelector(".selected").style.fontSize = "15px";
            fuenteTam.value = 15.0;
        }
    }, 1);
});

fuenteTam.addEventListener('change', ()=>{
    let valor = parseFloat(document.querySelector(".selected").style.fontSize);
    if(valor >= 1 && valor <= 100){
        document.querySelector(".selected").style.fontSize = fuenteTam.value+"px";
    }
    else{
        document.querySelector(".selected").style.fontSize = "15px";
        fuenteTam.value = 15.0;
    }
});

fuenteTam.addEventListener('keydown', ()=>{
    setTimeout(() => {
        let valor = parseFloat(document.querySelector(".selected").style.fontSize);
        if(valor >= 1 && valor <= 100){
            document.querySelector(".selected").style.fontSize = fuenteTam.value+"px";
        }
        else{
            document.querySelector(".selected").style.fontSize = "15px";
            fuenteTam.value = 15.0;
        }
    }, 1);
});