let email = document.getElementById("email");
let emailErr = document.getElementById("emailErr");
let password = document.getElementById("password");
let passErr = document.getElementById("passErr");
let nam = document.getElementById("name");
let nameErr = document.getElementById("nameErr");
let emailLog = document.getElementById("emailLog");
let emailLogErr = document.getElementById("emailLogErr");
let passwordLog = document.getElementById("passwordLog");
let passLogErr = document.getElementById("passLogErr");
let users = [];
let words = [
  "term",
  "dart",
  "cant",
  "rant",
  "trip",
  "glitch",
  "trick",
  "awesome",
  "flawesome",
  "random",
  "candle",
  "render",
  "tender",
  "gender",
  "calender",
  "gender",
  "craft",
  "graft",
  "shaft",
  "live",
];

let scores = [];
let guessed = [];
let guesses = 5;
let word;
let wordGuess;
let score = 0;
let wordSplit;
let wordSplit1;
let nextClick = 0;
let atempt = 0;

function blankCheck(element, error) {
  if (!element.value) {
    error.innerHTML = "Can't be blank";
    error.style.color = "red";
    return false;
  } else {
    return true;
  }
}
function emailVal() {
  blankCheck(email, emailErr);
  let emailCheck =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
  if (email.value.match(emailCheck)) {
    emailErr.innerHTML = "";
    return true;
  } else {
    emailErr.innerHTML = "*" + "Invalid";
    emailErr.style.color = "red";
    return false;
  }
}
function passwordVal() {
  blankCheck(password, passErr);
  if (password.value.length < 8) {
    passErr.innerHTML = "*" + "Can't be less than 8 characters";
    passErr.style.color = "red";
  } else {
    return true;
  }
}
function existingCheck() {
  let userExist = JSON.parse(localStorage.getItem("user"));
  if (userExist) {
    userExist.forEach((e) => {
      if (e.email == email.value) {
        passErr.innerHTML = "email already exists!";
        passErr.style.color = "red";
      } else {
        register();
      }
    });
  } else {
    register();
  }
}
function register() {
  blankCheck(nam, nameErr);
  passwordVal();
  if (
    blankCheck(email, emailErr) &&
    emailVal() &&
    passwordVal() &&
    blankCheck(nam, nameErr)
  ) {
    let user = {
      name: nam.value,
      password: password.value,
      email: email.value,
    };

    users.push(user);

    localStorage.setItem("user", JSON.stringify(users));

    nam.value = "";
    email.value = "";
    password.value = "";
    passErr.innerHTML = "Successfully registered!";
    passErr.style.color = "white";
  } else {
    return false;
  }
}
let check = localStorage.getItem("user");
if (check) {
  users = JSON.parse(check);
}
nam.addEventListener("input", () => {
  nameErr.innerHTML = "";
  nameErr.color = "#f39560";
  blankCheck(nam, nameErr);
});

email.addEventListener("input", () => {
  emailErr.innerHTML = "";
  emailErr.color = "#f39560";
  blankCheck(email, emailErr);
  emailVal();
});
password.addEventListener("input", () => {
  passErr.innerHTML = "";
  passErr.color = "#f39560";
  blankCheck(password, passErr);
  passwordVal();
});
function login() {
  document.getElementById("containerReg").style.display = "none";
  document.getElementById("containerLog").style.display = "block";
}

let guessMsg = document.getElementById("guessMsg");
let guessRem = document.getElementById("guessRemaing");
let wordDisplay = document.getElementById("word");

function chooseWord() {
  word = words[Math.floor(Math.random() * words.length)];
  wordGuess = word;
  wordSplit1 = word.split("");
  wordSplit = word.split("");
  for (let i = 0; i < 3; i++) {
    randomIndex = Math.floor(Math.random() * wordSplit.length);
    wordSplit[randomIndex] = "";
  }
  wordSplit.forEach((e, index) => {
    let wordDisplayedNode = `<input value="${e}" class="inFleid" id="letterIn${index}" maxlength="1" placeholder="${
      e ? e : "-"
    }" />`;

    wordDisplay.innerHTML += wordDisplayedNode;
  });
  for (let i = 0; i < wordSplit.length; i++) {
    if (wordSplit[i] === "") {
      document.getElementById("letterIn" + i).disabled = false;
    } else {
      document.getElementById("letterIn" + i).disabled = true;
    }
  }
  let guessVal = document.querySelectorAll(".inFleid");
  for (let i = 0; i < guessVal.length; i++) {
    guessVal[i].addEventListener("input", function () {
      if (
        wordSplit1[i].includes(guessVal[i].value) &&
        guessVal[i].value != ""
      ) {
        wordSplit[i] = guessVal[i].value;
        guessRem.innerText = "Guesses Remaining:" + guesses;
        guessVal[i].style.borderColor = "green";
        atempt += 1;
        if (!wordSplit.includes("-") && !wordSplit.includes("")) {
          score++;
          next();
        }
      } else {
        atempt += 1;
        if (guessVal[i].value != "") {
          guesses -= 1;
        }
        guessRem.innerText = "Guesses Remaining:" + guesses;
        guessVal[i].style.borderColor = "red";
        if (guesses == 0) {
          guessMsg.innerText = "Sorry you are out of guesses!";
          guessMsg.style.color = "red";
          next();
        }
      }
      if (guessVal[i].style.borderColor == "green") {
        for (let i = 0; i < guessVal.length; i++) {
          if (guessVal[i].value == "") {
            document.getElementById("letterIn" + i).focus();
            break;
          }
        }
      }
    });
  }
}

function play() {
  blankCheck(emailLog, emailLogErr);
  blankCheck(passwordLog, passLogErr);
  for (let i = 0; i < users.length; i++) {
    if (
      emailLog.value === users[i].email &&
      passwordLog.value === users[i].password
    ) {
      document.getElementById("containerLog").style.display = "none";
      document.getElementById("containerGame").style.display = "block";
    } else if (
      emailLog.value != users[i].email &&
      passwordLog == users[i].password
    ) {
      emailLogErr.innerHTML = "Invalid Email";
      emailLogErr.style.color = "red";
    } else if (
      emailLog.value == users[i].email &&
      passwordLog != users[i].password
    ) {
      passLogErr.innerHTML = "Invalid Password";
      passLogErr.style.color = "red";
    }
  }
}
emailLog.addEventListener("input", () => {
  emailLogErr.innerHTML = "";
  emailLogErr.color = "#f39560";
  blankCheck(emailLog, emailLogErr);
  emailVal();
});
passwordLog.addEventListener("input", () => {
  passLogErr.innerHTML = "";
  passLogErr.color = "#f39560";
  blankCheck(passwordLog, passLogErr);
});

function next() {
  nextClick += 1;
  let atempt1;
  let atempt2;
  let atempt3;
  if (nextClick === 1) {
    atempt1 = atempt;
    scores.push(atempt1);
  }
  if (nextClick === 2) {
    atempt2 = atempt;
    scores.push(atempt2);
  }
  if (nextClick === 3) {
    atempt3 = atempt;
    scores.push(atempt3);
  }
  guesses = 5;
  guessMsg.innerText = "";
  guessRem.innerText = "Guesses Remaining: " + guesses;
  wordDisplay.innerHTML = "";
  if (nextClick == 3) {
    document.getElementById("containerGame").style.display = "none";
    document.getElementById("dash").style.display = "block";
    document.getElementById("score").innerText = score + "/3";
    document.getElementById("atempt").innerText = scores[0];
    document.getElementById("atempt1").innerText = scores[1];
    document.getElementById("atempt2").innerText = scores[2];
    console.log(scores);
  } else {
    chooseWord();
  }
  atempt = 0;
}
function tryAgain() {
  document.getElementById("containerReg").style.display = "none";
  document.getElementById("dash").style.display = "none";
  document.getElementById("containerLog").style.display = "none";
  document.getElementById("containerGame").style.display = "block";
  nextClick = -1;
  score = 0;
  next();
}
function registerationForm() {
  document.getElementById("containerReg").style.display = "block";
  document.getElementById("containerLog").style.display = "none";
}
chooseWord();
