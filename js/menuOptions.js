const menu = document.getElementById("optionsMenu");
const textValue = document.getElementById("textValue");
const bgColor = document.getElementById("bgColor");
const opacity = document.getElementById("opacidad");
const textColor = document.getElementById("textColor");
const fuente = document.getElementById("fuente");
const fuenteTam = document.getElementById("fuenteTam");
const clases = document.getElementById("clases");

textValue.addEventListener('keydown', ()=>{
    setTimeout(() => {
        if(document.getElementById("textP").textContent == "Texto: "){
            document.querySelector(".selected").textContent = textValue.value;
        }
        else if(document.getElementById("textP").textContent == "URL: "){
            if(document.querySelector(".selected").tagName === 'IMG'){
                document.querySelector(".selected").src = textValue.value;
            }
            else if(document.querySelector(".selected").tagName === 'A'){
                document.querySelector(".selected").href = textValue.value;
                document.querySelector(".selected").textContent = textValue.value;
            }
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

clases.addEventListener('change', ()=>{
    let classes = document.querySelector(".selected").classList;

    for(let i = 0; i < classes.length; i++){
        if(classes[i] !== "selected"){
            document.querySelector(".selected").classList.remove(classes[i]);
        }
    }

    document.querySelector(".selected").classList.add(clases.value.replace(".", "").replace("#", ""));
    deshabilitarStyle(document.querySelector(".selected"));
});

document.getElementById("deleteElement").addEventListener('click', ()=>{
    workSpace.removeChild(document.querySelector(".selected"));
    menu.style.display = "none";
});