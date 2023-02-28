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
    error.innerHTML = "*" + "Can't be blank";
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
function register() {
  blankCheck(nam, nameErr);
  passwordVal();
  if (emailVal() && passwordVal()) {
    let user = {
      name: nam.value,
      password: password.value,
      email: email.value,
    };
    users.push(user);
    localStorage.setItem("user", JSON.stringify(users));
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
let guess = document.getElementById("guessInput");
function chooseWord() {
  word = words[Math.floor(Math.random() * words.length)];
  wordGuess = word;
  wordSplit1 = word.split("");
  wordSplit = word.split("");
  for (let i = 0; i < 3; i++) {
    randomIndex = Math.floor(Math.random() * wordSplit.length);
    wordSplit[randomIndex] = "-";
  }
  wordSplit.forEach((e, index) => {
    let wordDisplayedNode = `<div class="letter" id="letter${index}"><input value="${e}"disabled /></div>`;
    wordDisplay.innerHTML += wordDisplayedNode;
  });
}
chooseWord();
console.log(wordSplit);
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

      guessRem.innerText = "Guesses Remaining: " + guesses;
    } else if (
      emailLog.value != users[i].email &&
      passwordLog == users[i].password
    ) {
      emailLogErr.innerHTML = "*" + "Invalid Email";
      emailLogErr.style.color = "red";
    } else if (
      emailLog.value == users[i].email &&
      passwordLog != users[i].password
    ) {
      passLogErr.innerHTML = "*" + "Invalid Password";
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

function guessIn() {
  atempt += 1;
  guessRem.innerText = "Guesses Remaining:" + guesses;

  if (guesses <= 0) {
    guessMsg.innerText = "";
    guess.innerHTML = "";
    document.getElementById("submit").style.display = "none";
    guessMsg.innerText = "Sorry you are out of guesses!";
    guessMsg.style.color = "red";
    document.getElementById("next").style.display = "block";
  } else {
    if (!guess.value) {
      guessMsg.innerText = "Please enter the letter!";
      guessMsg.style.color = "red";
    } else if (wordSplit1.includes(guess.value)) {
      guessed.push(guess.value);
      guessMsg.innerText = "Good Going!";
      guessMsg.style.color = "green";

      for (let i = 0; i < word.length; i++) {
        if (wordSplit1[i].includes(guess.value)) {
          wordSplit[i] = guess.value;
          wordDisplay.innerHTML = wordSplit.join("");
        }
      }
      if (!wordSplit.includes("-")) {
        score += 1;
        guessMsg.innerText = "Hurray you guessed it!";
        guessMsg.style.color = "green";
        document.getElementById("next").style.display = "block";
        document.getElementById("submit").style.display = "none";
      }
      guess.value = "";
    } else {
      guessMsg.innerText = "Try again!";
      guessMsg.style.color = "red";
      guess.value = "";
    }
    guesses -= 1;
  }
}
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
  guess.innerHTML = "";
  wordDisplay.innerHTML = "";
  if (nextClick == 3) {
    document.getElementById("containerGame").style.display = "none";
    document.getElementById("dash").style.display = "block";
    document.getElementById("score").innerText = score + "/3";
    document.getElementById("atempt").innerText = scores[0] + "/5";
    document.getElementById("atempt1").innerText = scores[1] + "/5";
    document.getElementById("atempt2").innerText = scores[2] + "/5";
    console.log(scores);
  } else {
    chooseWord();
    document.getElementById("next").style.display = "none";
    document.getElementById("submit").style.display = "block";
  }
  atempt = 0;
}
function tryAgain() {
  document.getElementById("containerReg").style.display = "none";
  document.getElementById("dash").style.display = "none";
  document.getElementById("containerGame").style.display = "none";
  document.getElementById("containerLog").style.display = "block";
}
