const menu = document.getElementById("optionsMenu");
const textValue = document.getElementById("textValue");

textValue.addEventListener('keydown', ()=>{
    setTimeout(() => {
        document.querySelector(".selected").textContent = textValue.value;
    }, 10);
});