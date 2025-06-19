const buttons = document.querySelectorAll(".buttons button");
const display = document.getElementById("numers");
let outcome = 0;
let operator = "+";
let a = ""
let b = ""
let isTypingB = false;
function isNumber(value) {
    return ["0","1","2","3","4","5","6","7","8","9","."].includes(value);
}
function isOperator(value) {
  return ["+", "-", "*", "/"].includes(value);
}
function operate(var1, var2, operator){ 
    if (b == "") {return a}
    var1 = parseFloat(var1)
    var2 = parseFloat(var2)
    if (operator==="+") {
        return var1 + var2
    }else if (operator === "-") {
        return var1 - var2
    }else if (operator === "*") {
        return var1 * var2
    }else {
        if (b == 0) {
            return "Really?"
        }
        else {
        return var1/var2}
    }
} 

function Equal(a,b,operator) {
    let outcome = operate(a,b,operator)
    display.textContent = outcome
    a = outcome; 
    b = ""; 
    operator = ""
    isTypingB = true
}
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.dataset.value;
        if (isNumber(val)) {
            if (!isTypingB) {
                a += val.toString()
                display.textContent = a
            }
            else {
                b += val.toString()
                display.textContent = b
            }
            

        }else if (isOperator(val)) {
            if (operator !== "") {
                Equal(a,b,operator)
                a = operate(a,b,operator)
                operator = val
                
                b = ""
                
            }
            else {operator = val
            isTypingB = true}
            
        }else if (val === '=') {
            Equal(a,b,operator)
            a = operate(a,b,operator)
            b = ""
        }else if (val==="del") {
            if (isTypingB) {
                b = b.slice(0,-1)
                display.textContent = b
            } else {
                a = a.slice(0, -1)
                display.textContent = a
            }
        }else if (val==="clear") {
            a = ""; b = ""; operator = ""; isTypingB = false
            display.textContent = 0
        }

    })
})