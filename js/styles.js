const lista = document.getElementById("cssElementsList");
const estilos = document.getElementById("estilos");

function crearLista(){
    let styles = document.styleSheets[1];
    document.getElementById("allClasses").querySelectorAll("*").forEach(i =>{
        document.getElementById("allClasses").removeChild(i);
    });

    for(let i = 0; i < styles.cssRules.length; i++){
        let style = styleJsObject(styles.cssRules[i].cssText);
        addCssOption(style.name);
    }
}

function styleJsObject(style){
    let JSObject = {};

    JSObject.name = style.split(" {")[0];

    let rules = style.split(" {")[1].replace("}", "").split(";");
    for(let i = 0; i < rules.length; i++){
        if(rules[i].split(": ")[0].trim() !== ""){
            JSObject[((rules[i].split(": ")[0].trim() === "background-color")?"backgroundColor":rules[i].split(": ")[0].trim())] = rules[i].split(": ")[1];
        }
    }

    JSObject.all = style.replace(" { ", " {\n\t ").replace(/; /g, ";\n\t").replace("\t}", "}");
    return JSObject;
}

function JsObjectStyle(obj) {
    let estilo = {};

    Object.entries(obj).forEach(([clave, valor])=>{
        if(clave != "all" && clave != "name" && clave != ""){
            estilo[clave] = valor;
        }
    });

    return obj.name + " { " + Object.entries(estilo).map(([clave, valor]) => `${clave}: ${valor}`).join("; ") + "; }";
    
}

function addCssOption(className) {
    const container = document.getElementById("allClasses");
    const cssOptionsDiv = document.createElement("div");
    cssOptionsDiv.className = "cssOptions";

    const optionCSSDiv = document.createElement("div");
    optionCSSDiv.className = "optionCSS";

    const classNameParagraph = document.createElement("label");
    classNameParagraph.className = "normalTextOptionsCSS cssClass";
    classNameParagraph.dataset.pointer = `${className}`;
    classNameParagraph.dataset.show = "false";
    classNameParagraph.textContent = `${className}`;
    classNameParagraph.addEventListener('click', ()=>{
        if(classNameParagraph.dataset.show == "false"){
            document.querySelectorAll(".cssClass").forEach(it => {
                it.dataset.show = "false";
                getContainerByDataPointer(it.dataset.pointer).style.display = "none";
            });

            classNameParagraph.dataset.show = "true";
            getContainerByDataPointer(classNameParagraph.dataset.pointer).style.display = "block";
        }
        else{
            classNameParagraph.dataset.show = "false";
            getContainerByDataPointer(classNameParagraph.dataset.pointer).style.display = "none";
        }
    });

    const clearDiv = document.createElement("div");
    clearDiv.className = "clear";

    const parametersDiv = document.createElement("div");
    const img = document.createElement("img");
    img.classList.add("delete");
    img.src = "./../img/Delete.png";
    img.title = "Borrar Regla CSS";
    img.addEventListener('click', ()=>{
        container.removeChild(cssOptionsDiv);
        setTimeout(() => {
            let styles = document.styleSheets[1];
            let texto = "";

            for(let i = 0; i < styles.cssRules.length; i++){
                let style = styleJsObject(styles.cssRules[i].cssText);
                if(style.name !== className){
                    texto += style.all+"\n";
                }
            }
            estilos.textContent = texto.replace("backgroundColor", "background-color");

            document.querySelectorAll(className).forEach(el =>{
                el.classList.remove(className.replace(".", "").replace("#", ""));
            });
        }, 10);
    });

    parametersDiv.className = "CSSparameters";
    parametersDiv.dataset.class = `${className}`;

    function createParameter(labelText, dataRule, dataClass) {
        const br1 = document.createElement("br");
        const label = document.createElement("p");
        label.className = "normalTextOptions";
        label.textContent = labelText;


        const br2 = document.createElement("br");
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("cssParameter");
        input.dataset.rule = dataRule;
        input.dataset.class = dataClass;
        input.addEventListener('keydown', (e)=>{
            setTimeout(() => {
                let styles = document.styleSheets[1];
                let texto = "";

                for(let i = 0; i < styles.cssRules.length; i++){
                    let style = styleJsObject(styles.cssRules[i].cssText);
                    if(style.name !== dataClass){
                        texto += style.all+"\n";
                    }
                }

                texto += crearEstilo(dataClass);

                estilos.textContent = texto.replace("backgroundColor", "background-color");
                deshabilitarStyle(document.querySelector(".selected"));
            }, 10);
        });

        const clear = document.createElement("div");
        clear.className = "clear";

        parametersDiv.appendChild(br1);
        parametersDiv.appendChild(label);
        parametersDiv.appendChild(input);
        parametersDiv.appendChild(clear);
        parametersDiv.appendChild(br2);
    }

    createParameter("Largo:", "width", className);
    createParameter("Alto:", "height", className);
    createParameter("Color Fondo:", "background-color", className);
    createParameter("Mostrar:", "display", className);
    createParameter("Margen:", "margin", className);
    createParameter("Relleno:", "padding", className);
    createParameter("Fuente:", "font-family", className);
    createParameter("Tamaño Fuente:", "font-size", className);
    createParameter("Cursor:", "cursor", className);
    createParameter("Subrayado Enlaces:", "text-decoration", className);
    
    optionCSSDiv.appendChild(classNameParagraph);
    optionCSSDiv.appendChild(img);
    optionCSSDiv.appendChild(clearDiv);
    parametersDiv.appendChild(document.createElement("br"));
    parametersDiv.appendChild(document.createElement("br"));
    optionCSSDiv.appendChild(parametersDiv);
    cssOptionsDiv.appendChild(optionCSSDiv);
    container.appendChild(cssOptionsDiv);
}

function crearEstilo(clase){
    let valores = document.querySelectorAll(".cssParameter");
    let estilo = clase+"{";

    for(let i = 0; i < valores.length; i++){
        if(valores[i].dataset.class === clase && valores[i].value.trim() !== ""){
            estilo += `\n${((valores[i].dataset.rule === "backgroundColor")?"background-color":valores[i].dataset.rule)}: ${valores[i].value};`;
        }
    }

    estilo += "}";

    return estilo;
}

crearLista();