const inputSlider = document.querySelector("[slider]");
const lengthDisplay = document.querySelector(".passlength");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy-btn]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbercase = document.querySelector("#numbers");
const symbolcase = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");  // shows all checkboxs
const symbols = '~!$@#&*#^#)(*&^{):;">?/<|\;[#[]~``@%$&*';

let password = "";
let passwordlength = 10;
let checkCount = 1;

handleSlider();  //handle ui
/////////////////////

// copy_content
//handle_slider
//generatePassword
//set_indicator_color
// password randomly ban rha hai 
//getRandominteger(min,max)
//getRandomUpperCase()
//getRandomLowerCase()
//getrandomNumbers()
//getRandomSymbol()
//calculateStrenth()


// handle slider  -->> set passwordLength 

// password length ko ui p reflect krwata hai

function handleSlider() {
    inputSlider.value = passwordlength;
    lengthDisplay.innerText = passwordlength;

}

function set_indecator(color) {
    indicator.style.backgroundColor = color;
    // shdow    
}

function getRandominteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // min is add for getting value between min to max
}

function generateRandomNumber() {
    return getRandominteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRandominteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRandominteger(65, 91));
}

function generateSymbol() {
    const randNum = getRandominteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calculateStrength() {
    let vupper = false;
    let vlower = false;
    let vnumber = false;
    let vsymbol = false;

    if (uppercase.checked) vupper = true;
    if (lowercase.checked) vlower = true;
    if (numbercase.checked) vnumber = true;
    if (uppercase.checked) vsymbol = true;

    if (vupper && vlower && (vnumber || vsymbol) && passwordlength >= 8) {
        set_indecator("#0f0");
    }
    else if ((vupper || vlower) && (vnumber || vsymbol) && passwordlength >= 6) {
        set_indecator("#ff0");
    }
    else {
        set_indecator("#f00");
    }

}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch {
        copyMsg.innerText = "failed";
    }
    ///to make copy span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkBox) => {
        if (checkBox.checked)
            checkCount++;
    });

    if (passwordlength < checkCount) {
        passwordlength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input', (e) => {
    passwordlength = e.target.value;
    handleSlider();
})

copybtn.addEventListener('click', () => {
    if (passwordDisplay.value)   // agr koi value padi ho tabhi copy hogi  
        copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if (checkCount == 0)
        return;

    if (passwordlength < checkCount) {
        passwordlength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    //remove old password
    password = "";
    
        //let's put the stuff mentioned by checkboxes

//    if(uppercase.checked){
//     password+=generateUpperCase();
//    }
//    if(lowercase.checked){
//     password+=generateLowerCase();
//    }
//    if(numbercase.checked){
//     password+=generateRandomNumer();
//    }
//    if(symbolcase.checked){
//     password+=generateSymbol();
//    }

let funcArr = [];

if(uppercase.checked)
    funcArr.push(generateUpperCase);

if(lowercase.checked)
    funcArr.push(generateLowerCase);

if(numbercase.checked)
    funcArr.push(generateRandomNumber);

if(symbolcase.checked)
    funcArr.push(generateSymbol);

//compulsory addition
for(let i=0; i<funcArr.length; i++) {
    password += funcArr[i]();
}
   //remaining adddition
for(let i=0; i<passwordlength-funcArr.length; i++) {
    let randIndex = getRandominteger(0 , funcArr.length);
    
    password += funcArr[randIndex]();
}

password = shufflePassword(Array.from(password));
// password = shufflePassword(); 

// show in ui 
passwordDisplay.value = password;

// calculate strength
calculateStrength();

});
