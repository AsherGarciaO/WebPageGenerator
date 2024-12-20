const workSpace = document.getElementById("workSpace");
const bordeRango = 5;
let offsetX = 0, offsetY = 0;
let isIncreasing = {value: false, object: null};
let position = {x: 0, y: 0};
let side = {derecho: false, arriba: false, abajo: false, izquierdo: false};

workSpace.addEventListener('mouseup', ()=>{
    isIncreasing.value = false;
    isIncreasing.object = null;

    side.derecho = false;
    side.izquierdo = false;
    side.arriba = false;
    side.abajo = false;
});

workSpace.addEventListener('mousedown', (e)=>{
    isIncreasing.value = true;
    position.x = e.clientX;
    position.y = e.clientY;
});

workSpace.addEventListener('mousemove', (e) => {
    let element = isIncreasing.object;
    
    if(element !== null && element.classList.contains("selected") && isIncreasing.value){
        const rect = element.getBoundingClientRect();

        if (element.style.cursor == 'ns-resize' && side.arriba){
            enBordeSuperior = e.clientY - rect.top <= bordeRango*10;

            element.style.height = `${(parseInt(element.style.height.replace("px", "")))+(position.y-e.clientY)}px`;
            element.style.top = `${(parseInt(element.style.top.replace("px", "")))-(position.y-e.clientY)}px`;            
        }
        else if(element.style.cursor == 'ns-resize' && side.abajo){
            enBordeInferior = rect.bottom - e.clientY <= bordeRango*10;

            element.style.height = `${(parseInt(element.style.height.replace("px", "")))+(e.clientY-position.y)}px`;
        }
        else if(element.style.cursor == 'ew-resize' && side.derecho){   
            enBordeDerecho = rect.right - e.clientX <= bordeRango*10;
            
            element.style.width = `${(parseInt(element.style.width.replace("px", "")))+(e.clientX-position.x)}px`;
        }
        else if(element.style.cursor == 'ew-resize' && side.izquierdo){
            enBordeIzquierdo = e.clientX - rect.left <= bordeRango*10;

            element.style.width = `${(parseInt(element.style.width.replace("px", "")))+(position.x-e.clientX)}px`;
            element.style.left = `${(parseInt(element.style.left.replace("px", "")))-(position.x-e.clientX)}px`;            
        }
        position.x = e.clientX;
        position.y = e.clientY;
    }        
});

document.getElementById("atexlogo").addEventListener('click', ()=> {
    window.location.href = "https://atex-it.com/";
});

document.addEventListener('keydown', (e)=> {
    if (e.key === 'Escape') {
        document.querySelectorAll(".selected").forEach((el) => {
            el.classList.remove("selected");
            el.style.width = `${parseInt(el.style.width.replace("px", ""))+6}px`;
            el.style.height = `${parseInt(el.style.height.replace("px", ""))+6}px`;
            el.style.cursor = "default";
        });
    }
});

function addHTMLElement(item) {
    document.querySelectorAll(".selected").forEach((el) => { el.classList.remove("selected"); });
    let element = document.createElement(item);

    element.style.position = 'absolute';
    element.classList.add('generatedElement');
    element.style.top = '100px';
    element.style.left = '100px';
    element.style.width = '200px';
    element.style.height = '100px';
    element.setAttribute('draggable', 'true');

    element.addEventListener('click', () => {
        if(!element.classList.contains("selected")){            
            element.style.width = `${parseInt(element.style.width.replace("px", ""))-6}px`;
            element.style.height = `${parseInt(element.style.height.replace("px", ""))-6}px`;
        }

        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));

        if (!element.classList.contains("selected")) {
            element.classList.add("selected");
            if (element.style.cursor !== "ew-resize" && element.style.cursor !== "ns-resize") {
                element.style.cursor = "move";
            }
        }
    });

    element.addEventListener('dragstart', (e) => {
        if (element.style.cursor !== "ew-resize" && element.style.cursor !== "ns-resize") {
            if (!element.classList.contains("selected")) {
                document.querySelectorAll(".selected").forEach((el) => { el.classList.remove("selected");});
                element.classList.add("selected");
            }

            const rect = element.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            element.style.opacity = '0.5';

            document.body.addEventListener('dragover', (e) => { e.preventDefault();});
            document.body.addEventListener('drop', (e) => { e.preventDefault();});
        } 
        else {
            e.preventDefault();
        }
    });

    element.addEventListener('dragend', (e) => {
        element.style.opacity = '1';

        const rect = workSpace.getBoundingClientRect();
        let x = e.clientX - rect.left - offsetX;
        let y = e.clientY - rect.top - offsetY;

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
        isIncreasing.value = false;
        isIncreasing.object = null;

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
    });

    element.addEventListener('mousemove', (e) => {
        if (element.classList.contains("selected") && !isIncreasing.value) {
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

    element.addEventListener('mousedown', (e)=>{
        isIncreasing.object = element;

        const rect = element.getBoundingClientRect();
        let enBordeIzquierdo = e.clientX - rect.left <= bordeRango;
        let enBordeDerecho = rect.right - e.clientX <= bordeRango;
        let enBordeSuperior = e.clientY - rect.top <= bordeRango;
        let enBordeInferior = rect.bottom - e.clientY <= bordeRango;
    
        side.derecho = enBordeDerecho;
        side.izquierdo = enBordeIzquierdo;
        side.arriba = enBordeSuperior;
        side.abajo = enBordeInferior;
    });

    workSpace.appendChild(element);
}
