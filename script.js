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
    if (var2 == "") {return var1}
    if (var1 == "") {
        return var2
    }
    var1 = parseFloat(var1)
    var2 = parseFloat(var2)
    if (operator==="+") {
        return var1 + var2
    }else if (operator === "-") {
        return var1 - var2
    }else if (operator === "*") {
        return var1 * var2
    }else if (operator === "/") {
        if (var2 == 0) {
            return "Really?"

        }
        else {
        let divis = var1 / var2;
        let intLength = parseInt(divis).toString().length;
        let precision = 15 - intLength;
        return parseFloat(var1/var2).toFixed(precision)}
    }
} 

function Equal(var1,var2,operator) {
    let outcome = operate(var1,var2,operator)
    let stroutcome = outcome.toString();
    stroutcome.length > 15 ? display.textContent = stroutcome.slice(0, 15) : display.textContent = stroutcome
    a = stroutcome; 
    b = ""; 
    isTypingB = false
}
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.dataset.value;
        if (isNumber(val)) {
            if (!isTypingB) {
                if (a.includes(".") && val==="." ){
                    a += ""
                }
                else {
                    if (a.length >= 15) return;
                    a += val.toString()
                    display.textContent = a
                }
            }
            else {
                if (b.includes(".") && val==="." ) {
                    
                }
                else {
                    if (b.length >= 15) return;
                    b += val.toString()
                display.textContent = b
                }
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
            operator = ""
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