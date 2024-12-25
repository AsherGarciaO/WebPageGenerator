const workSpace = document.getElementById("workSpace");
const optionsMenu = document.getElementById("optionsMenu");
const sideBar = document.getElementById("leftBar");
const navBarContainer = document.getElementById("navBarContainer");

const bordeRango = 5;
let offsetX = 0, offsetY = 0;
let objectSelected = {resize: false, object: null};
let position = {x: 0, y: 0};
let side = {derecho: false, arriba: false, abajo: false, izquierdo: false};

document.addEventListener('keydown', (e)=> {
    if (e.key === 'Escape') {
        document.querySelectorAll(".selected").forEach((el) => {
            el.classList.remove("selected");
            el.style.width = `${parseInt(el.style.width.replace("px", ""))+6}px`;
            el.style.height = `${parseInt(el.style.height.replace("px", ""))+6}px`;
            el.style.cursor = "default";
        });

        optionsMenu.style.display = "none";
    }
    else if(e.key === "Delete" && workSpace.querySelector(".selected") !== null && optionsMenu.style.display === "none"){
        workSpace.removeChild(workSpace.querySelector(".selected"));
        document.querySelectorAll(".selected").forEach((el) => {el.classList.remove("selected");});
    }
    else if(e.key === "Backspace" && workSpace.querySelector(".selected") !== null && optionsMenu.style.display === "none"){
        workSpace.removeChild(workSpace.querySelector(".selected"));
        document.querySelectorAll(".selected").forEach((el) => {el.classList.remove("selected");});
    }
});

document.addEventListener('click', (e) => {
    if (!optionsMenu.contains(e.target)) {
        optionsMenu.style.display = "none";
    }
});

sideBar.addEventListener('mousemove', ()=>{    
    objectSelected.resize = false;
    objectSelected.object = null;

    side.derecho = false;
    side.izquierdo = false;
    side.arriba = false;
    side.abajo = false;
});

navBarContainer.addEventListener('mousemove', ()=>{    
    objectSelected.resize = false;
    objectSelected.object = null;

    side.derecho = false;
    side.izquierdo = false;
    side.arriba = false;
    side.abajo = false;
});

workSpace.addEventListener('mouseup', ()=>{
    objectSelected.resize = false;
    objectSelected.object = null;

    side.derecho = false;
    side.izquierdo = false;
    side.arriba = false;
    side.abajo = false;
});

workSpace.addEventListener('mousedown', (e)=>{
    objectSelected.resize = true;
    position.x = e.clientX;
    position.y = e.clientY;
});

workSpace.addEventListener('mousemove', (e) => {
    let element = objectSelected.object;
    
    if(element !== null && element.classList.contains("selected") && objectSelected.resize){
        const rect = element.getBoundingClientRect();

        if (element.style.cursor == 'ns-resize' && side.arriba){
            enBordeSuperior = e.clientY - rect.top <= bordeRango*10;

            element.style.height = `${(parseInt(element.style.height.replace("px", "")))+(position.y-e.clientY)}px`;
            element.alto.valor = `${(parseInt(element.style.height.replace("px", "")))}`;
            element.style.top = `${(parseInt(element.style.top.replace("px", "")))-(position.y-e.clientY)}px`;            
        }
        else if(element.style.cursor == 'ns-resize' && side.abajo){
            enBordeInferior = rect.bottom - e.clientY <= bordeRango*10;

            element.style.height = `${(parseInt(element.style.height.replace("px", "")))+(e.clientY-position.y)}px`;
            element.alto.valor = `${(parseInt(element.style.height.replace("px", "")))}`;
        }
        else if(element.style.cursor == 'ew-resize' && side.derecho){   
            enBordeDerecho = rect.right - e.clientX <= bordeRango*10;
            
            element.style.width = `${(parseInt(element.style.width.replace("px", "")))+(e.clientX-position.x)}px`;
            element.largo.valor = `${(parseInt(element.style.width.replace("px", "")))}`;
        }
        else if(element.style.cursor == 'ew-resize' && side.izquierdo){
            enBordeIzquierdo = e.clientX - rect.left <= bordeRango*10;

            element.style.width = `${(parseInt(element.style.width.replace("px", "")))+(position.x-e.clientX)}px`;
            element.largo.valor = `${(parseInt(element.style.width.replace("px", "")))}`;
            element.style.left = `${(parseInt(element.style.left.replace("px", "")))-(position.x-e.clientX)}px`;            
        }
        position.x = e.clientX;
        position.y = e.clientY;
    
    }        
});

function addHTMLElement(item) {
    document.querySelectorAll(".selected").forEach((el) => {
        el.classList.remove("selected");
        el.style.width = `${parseInt(el.style.width.replace("px", ""))+6}px`;
        el.style.height = `${parseInt(el.style.height.replace("px", ""))+6}px`;
        el.style.cursor = "default";
    });

    let opacidad = "1";
    let element = document.createElement(item);
    element.largo = {valor: "200", tipo: "px"};
    element.alto = {valor: "100", tipo: "px"};

    element.style.top = '100px';
    element.style.left = '100px';
    element.style.width = '200px';
    element.style.height = '100px';
    element.style.margin = '0px';
    element.style.padding = '0px';
    element.style.position = 'absolute';
    element.style.opacity = "1";
    element.style.backgroundColor = "#333333";
    element.style.color = "#000000";
    element.style.display = "flex";
    element.style.alignItems = "center";
    element.style.justifyContent = "center";
    element.style.fontSize = "15px";
    element.style.fontFamily = "Arial";
    element.setAttribute('draggable', 'true');
    
    if(item == "img"){
        element.src = "./../img/AtexLogo.jpg";
    }

    element.addEventListener('click', () => {
        document.querySelectorAll(".selected").forEach((el) => {
            el.classList.remove("selected");
            el.style.width = `${parseInt(el.style.width.replace("px", ""))+6}px`;
            el.style.height = `${parseInt(el.style.height.replace("px", ""))+6}px`;
            el.style.cursor = "default";
        });
        if(!element.classList.contains("selected")){            
            element.style.width = `${parseInt(element.style.width.replace("px", ""))-6}px`;
            element.style.height = `${parseInt(element.style.height.replace("px", ""))-6}px`;
        }


        if (!element.classList.contains("selected")) {
            element.classList.add("selected");
            if (element.style.cursor !== "ew-resize" && element.style.cursor !== "ns-resize") {
                element.style.cursor = "move";
            }
        }
    });

    element.addEventListener('dragstart', (e) => {
        optionsMenu.style.display = "none";

        if (element.style.cursor !== "ew-resize" && element.style.cursor !== "ns-resize") {
            if (!element.classList.contains("selected")) {
                document.querySelectorAll(".selected").forEach((el) => {
                    el.classList.remove("selected");
                    el.style.width = `${parseInt(el.style.width.replace("px", ""))+6}px`;
                    el.style.height = `${parseInt(el.style.height.replace("px", ""))+6}px`;
                    el.style.cursor = "default";
                });
                element.classList.add("selected");
            }

            const rect = element.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            opacidad = element.style.opacity;
            element.style.opacity = '0.5';

            document.body.addEventListener('dragover', (e) => { e.preventDefault();});
            document.body.addEventListener('drop', (e) => { e.preventDefault();});
        } 
        else {
            e.preventDefault();
        }
    });

    element.addEventListener('dragend', (e) => {
        element.style.opacity = opacidad;

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
        objectSelected.resize = false;
        objectSelected.object = null;

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
    });

    element.addEventListener('mousemove', (e) => {
        if (element.classList.contains("selected") && !objectSelected.resize) {
            const rect = element.getBoundingClientRect();
            const enBordeIzquierdo = e.clientX - rect.left <= bordeRango;
            const enBordeDerecho = rect.right - e.clientX <= bordeRango;
            const enBordeSuperior = e.clientY - rect.top <= bordeRango;
            const enBordeInferior = rect.bottom - e.clientY <= bordeRango;


            if(optionsMenu.style.display === "none"){                
                if (enBordeIzquierdo || enBordeDerecho) {
                    element.style.cursor = 'ew-resize';
                } 
                else if (enBordeSuperior || enBordeInferior) {
                    element.style.cursor = 'ns-resize';
                } 
                else{
                    element.style.cursor = 'move';
                }
            }    
            else{
                element.style.cursor = "default";
            }        
        }
    });

    element.addEventListener('mousedown', (e)=>{
        objectSelected.object = element;

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

    element.addEventListener('contextmenu', (e) => {
        e.preventDefault();  
             
        document.querySelectorAll(".selected").forEach((el) => {
            el.classList.remove("selected");
            el.style.width = `${parseInt(el.style.width.replace("px", ""))+6}px`;
            el.style.height = `${parseInt(el.style.height.replace("px", ""))+6}px`;
            el.style.cursor = "default";
        });

        if(!element.classList.contains("selected")){            
            element.style.width = `${parseInt(element.style.width.replace("px", ""))-6}px`;
            element.style.height = `${parseInt(element.style.height.replace("px", ""))-6}px`;
            element.classList.add("selected");
        }

        optionsMenu.style.display = "block";
        optionsMenu.style.left = `${e.clientX-sideBar.getBoundingClientRect().width}px`;
        optionsMenu.style.top = `${e.clientY-navBarContainer.getBoundingClientRect().height}px`; 

        if(optionsMenu.getBoundingClientRect().right > workSpace.getBoundingClientRect().right){
            optionsMenu.style.left = `${e.clientX-sideBar.getBoundingClientRect().width-optionsMenu.getBoundingClientRect().width}px`;
        }

        if(optionsMenu.getBoundingClientRect().bottom > workSpace.getBoundingClientRect().bottom){
            optionsMenu.style.top = `${e.clientY-navBarContainer.getBoundingClientRect().height-optionsMenu.getBoundingClientRect().height}px`; 
            if(optionsMenu.getBoundingClientRect().top < workSpace.getBoundingClientRect().top){
                optionsMenu.style.top = `${e.clientY-navBarContainer.getBoundingClientRect().height}px`;
                optionsMenu.style.top = `${e.clientY-navBarContainer.getBoundingClientRect().height-(optionsMenu.getBoundingClientRect().height/2)}px`; 
            }
        }
        
        
        document.getElementById("textP").textContent = ((item == "img")? "URL: ":"Texto: ");
        document.getElementById("textValue").placeholder = ((item == "img")? "URL":"Texto");
        if(item != "img"){
            document.getElementById("textValue").value = element.textContent;
        }
        else{
            document.getElementById("textValue").src = element.src;
        }

        document.getElementById("bgColor").value = rgbToHex(element.style.backgroundColor);
        document.getElementById("opacidad").value = parseFloat(element.style.opacity);
        document.getElementById("textColor").value = rgbToHex(element.style.color);
        document.getElementById("fuente").querySelectorAll("*").forEach((option)=>{
            option.selected = (option.value == element.style.fontFamily.replace('"', "").replace('"', ""));
        });
        document.getElementById("fuenteTam").value = parseFloat(element.style.fontSize);

        document.getElementById("largo").value = element.largo.valor;
        document.getElementById("largoOptions").querySelectorAll("*").forEach((option)=>{
            option.selected = (option.value == element.largo.tipo);
        });

        document.getElementById("alto").value = element.alto.valor;
        document.getElementById("altoOptions").querySelectorAll("*").forEach((option)=>{
            option.selected = (option.value == element.largo.tipo);
        });

        document.getElementById("largo").addEventListener('change', () => {
            const largo = document.getElementById('largo');
            const opts = document.getElementById('largoOptions');
            let newSize = parseFloat(largo.value);
            let elemento = document.querySelector(".selected");
            let objeto = elemento.largo;
            
            objeto.tipo = opts.value;
            if (opts.value != "px") {
                if (newSize >= 100) {
                    newSize = 100;
                    largo.value = 100.0;
                    objeto.valor = `${100}`;
                }
                newSize = convertirPxPorcentaje(newSize, "largo");
            } else if (opts.value == "px" && newSize > workSpace.getBoundingClientRect().width) {
                newSize = workSpace.getBoundingClientRect().width;
                largo.value = workSpace.getBoundingClientRect().width;
                objeto.valor = `${workSpace.getBoundingClientRect().width}`;
                elemento.style.left = "0px";
            }
        
            elemento.style.width = newSize + "px";
            elemento.largo.valor = newSize+"";
            if (elemento.getBoundingClientRect().right > workSpace.getBoundingClientRect().right) {
                elemento.style.left = `${elemento.getBoundingClientRect().left - (elemento.getBoundingClientRect().right - workSpace.getBoundingClientRect().right) - sideBar.getBoundingClientRect().width}px`;
            }
        });
        
        document.getElementById("largo").addEventListener('keydown', () => {
            setTimeout(() => {
                const largo = document.getElementById('largo');
                const opts = document.getElementById('largoOptions');
                let newSize = parseFloat(largo.value);
                let elemento = document.querySelector(".selected");
                let objeto = elemento.largo;
        
                objeto.tipo = opts.value;
                if (opts.value != "px") {
                    if (newSize >= 100) {
                        newSize = 100;
                        largo.value = 100.0;
                        objeto.valor = `${100}`;
                    }
                    newSize = convertirPxPorcentaje(newSize, "largo");
                } else if (opts.value == "px" && newSize > workSpace.getBoundingClientRect().width) {
                    newSize = workSpace.getBoundingClientRect().width;
                    largo.value = workSpace.getBoundingClientRect().width;
                    objeto.valor = `${workSpace.getBoundingClientRect().width}`;
                    elemento.style.left = "0px";
                }
        
                elemento.style.width = newSize + "px";
                elemento.largo.valor = newSize+"";
                if (elemento.getBoundingClientRect().right > workSpace.getBoundingClientRect().right) {
                    elemento.style.left = `${elemento.getBoundingClientRect().left - (elemento.getBoundingClientRect().right - workSpace.getBoundingClientRect().right) - sideBar.getBoundingClientRect().width}px`;
                }
            }, 1);
        });
        
        document.getElementById("largoOptions").addEventListener('change', () => {
            const largo = document.getElementById('largo');
            const opts = document.getElementById('largoOptions');
            let newSize = parseFloat(largo.value);
            let elemento = document.querySelector(".selected");
            let objeto = elemento.largo;
        
            objeto.tipo = opts.value;
            if (opts.value != "px") {
                if (newSize >= 100) {
                    newSize = 100;
                    largo.value = 100.0;
                    objeto.valor = `${100}`;
                }
                newSize = convertirPxPorcentaje(newSize, "largo");
            } else if (opts.value == "px" && newSize > workSpace.getBoundingClientRect().width) {
                newSize = workSpace.getBoundingClientRect().width;
                largo.value = workSpace.getBoundingClientRect().width;
                objeto.valor = `${workSpace.getBoundingClientRect().width}`;
                elemento.style.left = "0px";
            }
        
            elemento.style.width = newSize + "px";
            elemento.largo.valor = newSize+"";
            if (elemento.getBoundingClientRect().right > workSpace.getBoundingClientRect().right) {
                elemento.style.left = `${elemento.getBoundingClientRect().left - (elemento.getBoundingClientRect().right - workSpace.getBoundingClientRect().right) - sideBar.getBoundingClientRect().width}px`;
            }
        });
        
        document.getElementById("alto").addEventListener('change', () => {
            const alto = document.getElementById('alto');
            const opts = document.getElementById('altoOptions');
            let newSize = parseFloat(alto.value);
            let elemento = document.querySelector(".selected");
            let objeto = elemento.alto;
        
            objeto.tipo = opts.value;
            if (opts.value != "px") {
                if (newSize >= 100) {
                    newSize = 100;
                    alto.value = 100.0;
                    objeto.valor = `${100}`;
                }
                newSize = convertirPxPorcentaje(newSize, "alto");
            } else if (opts.value == "px" && newSize > workSpace.getBoundingClientRect().height) {
                newSize = workSpace.getBoundingClientRect().height;
                alto.value = workSpace.getBoundingClientRect().height;
                objeto.valor = `${workSpace.getBoundingClientRect().height}`;
                elemento.style.top = "0px";
            }
        
            elemento.style.height = newSize + "px";
            elemento.alto.valor = newSize+"";
            if (elemento.getBoundingClientRect().bottom > workSpace.getBoundingClientRect().bottom) {
                elemento.style.top = `${elemento.getBoundingClientRect().top - (elemento.getBoundingClientRect().bottom - workSpace.getBoundingClientRect().bottom) - navBarContainer.getBoundingClientRect().height}px`;
            }
        });
        
        document.getElementById("alto").addEventListener('keydown', () => {
            setTimeout(() => {
                const alto = document.getElementById('alto');
                const opts = document.getElementById('altoOptions');
                let newSize = parseFloat(alto.value);
                let elemento = document.querySelector(".selected");
                let objeto = elemento.alto;
        
                objeto.tipo = opts.value;
                if (opts.value != "px") {
                    if (newSize >= 100) {
                        newSize = 100;
                        alto.value = 100.0;
                        objeto.valor = `${100}`;
                    }
                    newSize = convertirPxPorcentaje(newSize, "alto");
                } else if (opts.value == "px" && newSize > workSpace.getBoundingClientRect().height) {
                    newSize = workSpace.getBoundingClientRect().height;
                    alto.value = workSpace.getBoundingClientRect().height;
                    objeto.valor = `${workSpace.getBoundingClientRect().height}`;
                    elemento.style.top = "0px";
                }
        
                elemento.style.height = newSize + "px";
                elemento.alto.valor = newSize+"";
                if (elemento.getBoundingClientRect().bottom > workSpace.getBoundingClientRect().bottom) {
                    elemento.style.top = `${elemento.getBoundingClientRect().top - (elemento.getBoundingClientRect().bottom - workSpace.getBoundingClientRect().bottom) - navBarContainer.getBoundingClientRect().height}px`;
                }
            }, 1);
        });
        
        document.getElementById("altoOptions").addEventListener('change', () => {
            const alto = document.getElementById('alto');
            const opts = document.getElementById('altoOptions');
            let newSize = parseFloat(alto.value);
            let elemento = document.querySelector(".selected");
            let objeto = elemento.alto;
        
            objeto.tipo = opts.value;
            if (opts.value != "px") {
                if (newSize >= 100) {
                    newSize = 100;
                    alto.value = 100.0;
                    objeto.valor = `${100}`;
                }
                newSize = convertirPxPorcentaje(newSize, "alto");
            } else if (opts.value == "px" && newSize > workSpace.getBoundingClientRect().height) {
                newSize = workSpace.getBoundingClientRect().height;
                alto.value = workSpace.getBoundingClientRect().height;
                objeto.valor = `${workSpace.getBoundingClientRect().height}`;
                elemento.style.top = "0px";
            }
        
            elemento.style.height = newSize + "px";
            elemento.alto.valor = newSize+"";
            if (elemento.getBoundingClientRect().bottom > workSpace.getBoundingClientRect().bottom) {
                elemento.style.top = `${elemento.getBoundingClientRect().top - (elemento.getBoundingClientRect().bottom - workSpace.getBoundingClientRect().bottom) - navBarContainer.getBoundingClientRect().height}px`;
            }
        });
        
    });

    workSpace.appendChild(element);
}

function convertirPxPorcentaje(pixeles, lado){
    let valor = 0;
    if(lado == "largo"){
        valor = workSpace.getBoundingClientRect().width;
    }
    else{
        valor = workSpace.getBoundingClientRect().height;
    }
    
    return pixeles*(valor/100);
}

function rgbToHex(rgbColor) {
    const rgbValues = rgbColor.match(/\d+/g).map(Number);
    const hex = rgbValues.map(value => value.toString(16).padStart(2, '0')).join('').toUpperCase();
    return `#${hex}`;
}