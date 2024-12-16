const workSpace = document.getElementById("workSpace");
const bordeRango = 5;

document.getElementById("atexlogo").addEventListener('click', ()=>{
    window.location.href = "https://atex-it.com/";
});

document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') {
        document.querySelectorAll(".selected").forEach((el)=>{el.classList.remove("selected");});
    }    
});

function addHTMLElement(item){
    document.querySelectorAll(".selected").forEach((el)=>{el.classList.remove("selected");});

    let element = document.createElement(item);

    element.style.position = 'absolute';
    element.classList.add('generatedElement');
    element.style.top = '50%';
    element.style.left = '50%';
    element.setAttribute('draggable', 'true');

    element.addEventListener('click', ()=>{
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));

        element.classList.add("selected");
        if(element.classList.contains("selected")){
            element.style.cursor = 'move';
        }
    });

    element.addEventListener('dragstart', (e) => {        
        if(!element.classList.contains("selected")){
            document.querySelectorAll(".selected").forEach((el)=>{el.classList.remove("selected");});
            element.classList.add("selected");
        }

        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        element.style.opacity = '0.5';

        document.body.addEventListener('dragover', (e)=>{e.preventDefault();});
        document.body.addEventListener('drop', (e)=>{e.preventDefault();});
    });
    
    element.addEventListener('dragend', (e) => {
        element.style.opacity = '1';
    
        const rect = workSpace.getBoundingClientRect();
        const x = e.clientX - rect.left - offsetX;
        const y = e.clientY - rect.top - offsetY;
    
        const maxX = workSpace.clientWidth - element.offsetWidth;
        if (x < 0) {
            x = 0;
        } 
        else if (x > maxX) {
            x = maxX;
        }
    
        const maxY = workSpace.clientHeight - element.offsetHeight;
        if (y < 0) {
            y = 0;
        } 
        else if (y > maxY) {
            y = maxY;
        }

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
    });

    element.addEventListener('mousemove', (e) => {
        if(element.classList.contains("selected")){
            const rect = element.getBoundingClientRect();
              
            const enBordeIzquierdo = e.clientX - rect.left <= bordeRango;
            const enBordeDerecho = rect.right - e.clientX <= bordeRango;
            const enBordeSuperior = e.clientY - rect.top <= bordeRango;
            const enBordeInferior = rect.bottom - e.clientY <= bordeRango;
        
            if (enBordeIzquierdo || enBordeDerecho) {
                element.style.cursor = 'ew-resize';
            } 
            else if (enBordeSuperior || enBordeInferior) {
                element.style.cursor = 'ns-resize';
            } 
            else {
                element.style.cursor = 'move';
            }
        }    
    });

    
    workSpace.appendChild(element);
}