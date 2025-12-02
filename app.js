const DOM = {
    btns: document.querySelectorAll(".btns"),
    input: document.querySelector("#input"),
    subInput: document.querySelector("#subInput"),
}

const cleanInput = (key) => {
    DOM.input.value = DOM.input.value.replace(/[^0-9+\-*/%.]/g, "");
    DOM.input.value = DOM.input.value.replace(/([+\-*/%.])\1+/g, "$1");
    DOM.input.value = DOM.input.value.replace(/([+\-*/%.])([+\-*/%.])/g, "$1");
    if(/[+\-*/%.]/.test(key)){
        DOM.subInput.textContent = DOM.input.value;
    }
}

const deleteChar = () => {
    DOM.input.value = DOM.input.value.slice(0, -1);
}

const reset = () => {
    DOM.input.value = "";
    DOM.subInput.textContent = "";
}

const handleInput = (key) => {
    if(/[+\-*/%.]/.test(key) && !(/[+\-*/%.]/.test(DOM.input.value)) ){
        DOM.input.value += key; 
    } 
    else if (!(/[+\-*/%.]/.test(key))) {
        DOM.input.value += key; 
    } 
}

const calculate = () => {
    let data = DOM.input.value;
    if(/[+\-*/%.]/.test(data)) DOM.subInput.textContent = `${data} = `;
    let expression = DOM.input.value.replaceAll("%", "/100 * ");
    let result = eval(expression);
    DOM.input.value = Number.isInteger(result) ? result :  result.toFixed(2);
    console.log(DOM.input.value);
}

window.addEventListener("keydown", (e) => {-+
    handleInput(e.key);
    cleanInput(e.key);
    if(e.key == "Enter") calculate();
    if(e.key == "Backspace" || e.key == "Delete") deleteChar();
}); 

DOM.btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let key = e.target.dataset.key;
        key === "AC" ? reset()
        :  key === "DEL" ? deleteChar() : key === "=" ? calculate() : "";
        handleInput(key);
        cleanInput(key);
    });
});


