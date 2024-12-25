document.getElementById("atexlogo").addEventListener('click', ()=> {
    window.location.href = "https://atex-it.com/";
});

document.querySelectorAll(".titleOptions").forEach(element =>{
    element.addEventListener('click', ()=>{
        if(element.dataset.show == "false"){
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

function getElementByDataTarget(target){
    let targets = document.querySelectorAll(".elementsContainers");
    for(let i = 0; i < targets.length; i++){
        if(target == targets[i].dataset.target){
            return targets[i];
        }
    }
}