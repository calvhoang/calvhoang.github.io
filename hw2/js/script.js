document.querySelector("button").addEventListener("click", gradeQuiz);

function isFormValid() {
    let isValid = true;
    let q1Response = document.querySelector("#q1").value;
    let validationFdbk = document.querySelector("#validationFdbk");

    if (q1Response === "") {
        isValid = false;
        validationFdbk.textContent = "Question 1 was not answered";
    }

    return isValid;
}

let score = 0;

function setMarkImage(index, imageName, altText) {
    let markContainer = document.querySelector(`#markImg${index}`);
    markContainer.textContent = "";

    let img = document.createElement("img");
    img.src = `img/${imageName}`;
    img.alt = altText;
    markContainer.appendChild(img);
}

function rightAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Correct!";
    feedback.className = "bg-success text-white rounded-4 py-1 ps-2";
    setMarkImage(index, "checkmark.svg", "Checkmark");
    score += 10;
}

function wrongAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Incorrect!";
    feedback.className = "bg-warning text-white rounded-1 py-1 ps-2";
    setMarkImage(index, "xmark.svg", "X mark");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function displayChoices(q, choices) {
    let choicesArray = choices;
    shuffleArray(choicesArray);

    let choicesContainer = document.querySelector(`#${q}Choices`);
    choicesContainer.textContent = "";

    for (let choice of choicesArray) {
        let input = document.createElement("input");
        input.type = "radio";
        input.name = `${q}`;
        input.id = choice;
        input.value = choice;
        input.classList.add("form-check-input");

        let label = document.createElement("label");
        label.htmlFor = choice;
        label.textContent = choice;
        label.classList.add("form-check-label");

        choicesContainer.appendChild(input);
        choicesContainer.appendChild(label);
        choicesContainer.appendChild(document.createTextNode(" "));
    }
}

let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
let q8ChoicesArray = ["Hawaii", "Maine", "Washington", "Florida"]

displayChoices("q4", q4ChoicesArray);
displayChoices("q8", q8ChoicesArray)

let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
    attempts = 0;
} else {
    attempts = Number(attempts);
}

function gradeQuiz() {
    document.querySelector("#validationFdbk").textContent = "";
    document.querySelector("#scoreMessage").textContent = "";

    if (!isFormValid()) {
        return;
    }

    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let selectedQ4 = document.querySelector("input[name=q4]:checked");
    let q5Response = document.querySelector("#q5").value.toLowerCase();
    let q7Response = document.querySelector("#q7").value;
    let selectedQ8 = document.querySelector("input[name=q8]:checked")
    let q9Response = document.querySelector("#q9").value;
    let q10Response = document.querySelector("#q10").value.toLowerCase();

    if (q1Response === "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    if (q2Response === "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    if (document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    if (q5Response === 'alaska') {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    if (document.querySelector("#Wyoming").checked &&
        document.querySelector("#Idaho").checked &&
        document.querySelector("#Montana").checked &&
        !document.querySelector("#Nevada").checked &&
        !document.querySelector("#Utah").checked) {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    if (q7Response === "ak") {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    if (selectedQ8 !== null && selectedQ8.value === "Maine") {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    if (q9Response === "0") {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    if (q10Response === "lake ontario" || q10Response === "ontario") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    let totalScore = document.querySelector("#totalScore");

    if (score >= 80) {
        document.querySelector("#scoreMessage").textContent = "Congratulations, you got a high score!";
        totalScore.className = "text-success";
    } else {
        totalScore.className = "text-danger";
    }

    totalScore.textContent = `Total Score: ${score}`;

    attempts++;
    document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
    localStorage.setItem("total_attempts", attempts);
}