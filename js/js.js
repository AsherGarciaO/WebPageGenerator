document.getElementById("atexlogo").addEventListener('click', ()=> {
    window.location.href = "https://atex-it.com/";
});

document.querySelectorAll(".titleOptions").forEach(element =>{
    element.addEventListener('click', ()=>{
        if(element.dataset.show == "false"){
            document.querySelectorAll(".titleOptions").forEach(it => {
                it.dataset.show = "false";
                it.querySelector("img").src = "./../img/Show.png";
                getElementByDataTarget(it.dataset.point).style.display = "none";
            });

            element.dataset.show = "true";
            element.querySelector("img").src = "./../img/Showed.png";
            
            getElementByDataTarget(element.dataset.point).style.display = "block";
        }
        else{
            element.dataset.show = "false";
            element.querySelector("img").src = "./../img/Show.png";
            getElementByDataTarget(element.dataset.point).style.display = "none";
        }
    });
});

document.getElementById('newClass').addEventListener('keydown', (e)=>{
    let newClass = document.getElementById('newClass');
    setTimeout(() => {
        if(e.key === "Enter" && (newClass.value.trim().startsWith(".") || newClass.value.trim().startsWith("#"))){
            addCssOption(newClass.value);
            newClass.value = "";
        }
        else if((!newClass.value.trim().startsWith(".") || !newClass.value.trim().startsWith("#")) && e.key === "Enter"){
            alert("Las clases deben iniciar con un . o #");
        }
    }, 1);
});

function getElementByDataTarget(target){
    let targets = document.querySelectorAll(".elementsContainers");
    for(let i = 0; i < targets.length; i++){
        if(target == targets[i].dataset.target){
            return targets[i];
        }
    }
}

function getContainerByDataPointer(pointer){
    let points = document.querySelectorAll(".CSSparameters");
    for(let i = 0; i < points.length; i++){
        if(pointer == points[i].dataset.class){
            return points[i];
        }
    }
}