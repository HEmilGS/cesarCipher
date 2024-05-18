const readlineSync = require('readline-sync');
const fs = require('fs');
const path = require('path');

function cesarCipher(str, idx) {
    let result = '';
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';

    for (let letter of str) {
        let isUpperCase = letter === letter.toUpperCase();
        letter = letter.toLowerCase();
        let index = alphabet.indexOf(letter);

        if (index !== -1) {
            let newIndex = (index + idx) % alphabet.length;
            let newLetter = alphabet[newIndex];
            newLetter = isUpperCase ? newLetter.toUpperCase() : newLetter;
            result += newLetter;
        } else {
            result += letter;
        }
    }

    return result;
}

function registerUser() {
    let name = readlineSync.question('Enter your name: ');
    let password = readlineSync.question('Enter your password: ', {
        hideEchoBack: true // Hide password input for privacy
    });
    let cifrado = cesarCipher(password, 3);

    console.log("Welcome " + name);
    console.log("Your password is: " + password);
    console.log("Your encrypted password is: " + cifrado);

    addUser(name, password, cifrado);
}

function addUser(userName, password, passwordCifrado) {
    const filePath = path.join(__dirname, 'users.json');
    let users = [];

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        users = JSON.parse(data);
    }

    users.push({ name: userName, password: password, encryptedPassword: passwordCifrado });

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
    console.log('User registered successfully');
}

function loginUser() {
    const filePath = path.join(__dirname, 'users.json');
    let users = [];

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        users = JSON.parse(data);
    }

    let name = readlineSync.question('Enter your name to login: ');
    let password = readlineSync.question('Enter your password to login: ', {
        hideEchoBack: true // Hide password input for privacy
    });
    let cifrado = cesarCipher(password, 3);

    console.log("Your encrypted password is: " + cifrado);

    const user = users.find(u => u.name === name && u.encryptedPassword === cifrado);

    if (user) {
        console.log("Login successful! Welcome " + name);
    } else {
        console.log("Login failed! Username or password is incorrect.");
    }
}

function showMenu() {
    console.log('\n1. Register User');
    console.log('2. Login User');
    console.log('3. Exit');
    let choice = readlineSync.question('Choose an option: ');

    switch (choice) {
        case '1':
            registerUser();
            break;
        case '2':
            loginUser();
            break;
        case '3':
            console.log('Exiting...');
            process.exit();
        default:
            console.log('Invalid choice. Please choose again.');
    }
}

function main() {
    while (true) {
        showMenu();
    }
}

main();
