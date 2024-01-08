// Generate a random password with uppercase letters, lowercase letters, and digits
function generatePassword(length) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    console.log(!includeSymbols.checked);

    if (includeSymbols.checked) {
        chars += '!@#$%^&*_+~?><=';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        password += chars.charAt(index);
    }
    return password;
}

let infoTimeout = undefined;

// Generate a new password and display it in the input field
function generateNewPassword() {
    const show = document.getElementById('show');
    const length = passLen.value;

    const password = generatePassword(length);
    
    show.textContent = password;


    //copy to clipboard
    navigator.clipboard.writeText(password);

    //store last 10 passwords
    //const recentPasswords = JSON.parse(localStorage.getItem('recentPasswords')) || [];
    //recentPasswords.push(password);
    //if (recentPasswords.length > 10) {
        //recentPasswords.shift();
    //}
    //localStorage.setItem('recentPasswords', JSON.stringify(recentPasswords));

    generateButton.textContent = 'Copied!';
    //clear info after 3 seconds
    if (infoTimeout) {
        clearTimeout(infoTimeout);
    }
    infoTimeout = setTimeout(() => {

        generateButton.textContent = 'Generate';
        show.textContent = '----------';
    
    }, 3000);
}

// Add a click listener to the Generate Password button
const generateButton = document.getElementById('generateButton');
const lenLabel = document.getElementById('lenLabel');
const passLen = document.getElementById('passLen');
const includeSymbols = document.getElementById('includeSymbols');

//find if localstorage has include checkbox values
const includeSymbolsValue = localStorage.getItem('includeSymbols');

if (!includeSymbolsValue) {
    localStorage.setItem('includeSymbols', true);
    includeSymbols.checked = true;
} else {
    includeSymbols.checked = includeSymbolsValue === 'true';
}

const passLenValue = localStorage.getItem('passLen');
if (!passLenValue) {
    localStorage.setItem('passLen', 14);
    passLen.value = 10;
    lenLabel.textContent = `Password length: ${passLen.value}`;
} else {
    passLen.value = passLenValue;
    lenLabel.textContent = `Password length: ${passLen.value}`;
}

includeSymbols.addEventListener('change', () => {
    localStorage.setItem('includeSymbols', includeSymbols.checked);
});


generateButton.addEventListener('click', generateNewPassword);

passLen.addEventListener('input', () => {
    lenLabel.textContent = `Password length: ${passLen.value}`;
    localStorage.setItem('passLen', passLen.value);
});