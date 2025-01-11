const workSpace = document.getElementById("workSpace");
const optionsMenu = document.getElementById("optionsMenu");
const sideBar = document.getElementById("leftBar");
const navBarContainer = document.getElementById("navBarContainer");
const estilosBase = {
    top: '100px',
    left: '100px',
    width: '200px',
    height: '100px',
    margin: '0px',
    padding: '0px',
    position: 'absolute',
    opacity: "1",
    backgroundColor: "#333333",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    fontFamily: "Arial"
};

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
    else if(e.key === "Delete" && workSpace.querySelector(".selected") !== null && optionsMenu.style.display === "none" && document.activeElement === document.body){
        workSpace.removeChild(workSpace.querySelector(".selected"));
        document.querySelectorAll(".selected").forEach((el) => {el.classList.remove("selected");});
    }
    else if(e.key === "Backspace" && workSpace.querySelector(".selected") !== null && optionsMenu.style.display === "none" && document.activeElement === document.body){
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

    element.style.top = estilosBase.top;
    element.style.left = estilosBase.left;
    element.style.width = estilosBase.width;
    element.style.height = estilosBase.height;
    element.style.margin = estilosBase.margin;
    element.style.padding = estilosBase.padding;
    element.style.position = estilosBase.position;
    element.style.opacity = estilosBase.opacity;
    element.style.backgroundColor = estilosBase.backgroundColor;
    element.style.color = estilosBase.color;
    element.style.display = estilosBase.display;
    element.style.alignItems = estilosBase.alignItems;
    element.style.justifyContent = estilosBase.justifyContent;
    element.style.fontSize = estilosBase.fontSize;
    element.style.fontFamily = estilosBase.fontFamily;
    element.setAttribute('draggable', 'true');
    
    if(item == "img"){
        element.src = "./../img/AtexLogo.jpg";
    }
    else if(item == "a"){
        element.href = "#";   
        element.textContent = element.href;     
        element.addEventListener('click', (e)=>{
            e.preventDefault();
        });
        element.addEventListener('keydown', (e)=>{
            e.preventDefault();
        });
    }

    element.addEventListener('click', (e) => {
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

        let listaClases = document.getElementById("clases");
        let styles = document.styleSheets[1];

        listaClases.querySelectorAll("option").forEach(opt => {
            listaClases.removeChild(opt);
        });

        listaClases.appendChild(document.createElement("option"));
        for(let i = 0; i < styles.cssRules.length; i++){
            let style = styleJsObject(styles.cssRules[i].cssText);
            let optionClass = document.createElement("option");
            console.log(style.name);
            optionClass.textContent = style.name;
            optionClass.value = style.name;

            listaClases.appendChild(optionClass);
        }
             
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
        
        
        document.getElementById("textP").textContent = ((item == "img" || item == "a")? "URL: ":"Texto: ");
        document.getElementById("textValue").placeholder = ((item == "img" || item == "a")? "URL":"Texto");
        
        if(item == "img"){
            document.getElementById("textValue").value = element.src;
        }
        else if(item == "a"){        
            document.getElementById("textValue").value = element.href;
        }
        else{
            document.getElementById("textValue").value = element.textContent;
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

        let claseSeleccionada = getClassSelected(element);
        if(claseSeleccionada !== null){
            document.getElementById("clases").querySelectorAll("*").forEach(option =>{
                if(option.value === "."+getClassSelected(element)){
                    option.selected = true;
                }
            });
        }

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
            } 
            else if (opts.value == "px" && newSize > workSpace.getBoundingClientRect().width) {
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

function getClassSelected(elemento){
    if(elemento !== null){
        let valores = elemento.classList;
        for(let i = 0; i < valores.length; i++){
            if(valores[i] !== "selected"){
                return valores[i];
            }
        }
    }

    return null;
}

function deshabilitarStyle(element){
    let styles = document.styleSheets[1];
    for(let i = 0; i < styles.cssRules.length; i++){
        let style = styleJsObject(styles.cssRules[i].cssText);
        if(style.name === "."+getClassSelected(element) || style.name === "#"+getClassSelected(element)){
            if (style.top !== undefined) {
                element.style.removeProperty("top");
            } 
            else {
                if(element.style.top === undefined){
                    element.style.top = estilosBase.top;
                } 
            }
            
            if (style.left !== undefined) {
                element.style.removeProperty("left");
            } 
            else{
                if(element.style.left === undefined){
                    element.style.left = estilosBase.left;
                }                
            }
        
            
            if (style.width !== undefined) {
                element.style.removeProperty("width");
            } 
            else {
                element.style.width = estilosBase.width;
            }
            
            if (style.height !== undefined) {
                element.style.removeProperty("height");
            } 
            else {
                element.style.height = estilosBase.height;
            }
            
            if (style.margin !== undefined) {
                element.style.removeProperty("margin");
            } 
            else {
                element.style.margin = estilosBase.margin;
            }
            
            if (style.padding !== undefined) {
                element.style.removeProperty("padding");
            } 
            else {
                element.style.padding = estilosBase.padding;
            }
            
            if (style.position !== undefined) {
                element.style.removeProperty("position");
            } 
            else {
                element.style.position = estilosBase.position;
            }
            
            if (style.opacity !== undefined) {
                element.style.removeProperty("opacity");
            } 
            else {
                element.style.opacity = estilosBase.opacity;
            }
            
            if (style.backgroundColor !== undefined) {
                element.style.removeProperty("background-color");
            } 
            else {
                element.style.backgroundColor = estilosBase.backgroundColor;
            }
            
            if (style.color !== undefined) {
                element.style.removeProperty("color");
            } 
            else {
                element.style.color = estilosBase.color;
            }
            
            if (style.display !== undefined) {
                element.style.removeProperty("display");
            } 
            else {
                element.style.display = estilosBase.display;
            }
            
            if (style.alignItems !== undefined) {
                element.style.removeProperty("align-items");
            } 
            else {
                element.style.alignItems = estilosBase.alignItems;
            }
            
            if (style.justifyContent !== undefined) {
                element.style.removeProperty("justify-content");
            } 
            else {
                element.style.justifyContent = estilosBase.justifyContent;
            }
            
            if (style.fontSize !== undefined) {
                element.style.removeProperty("font-size");
            } 
            else {
                element.style.fontSize = estilosBase.fontSize;
            }
            
            if (style.fontFamily !== undefined) {
                element.style.removeProperty("font-family");
            } 
            else {
                element.style.fontFamily = estilosBase.fontFamily;
            }            
        }
    }
}