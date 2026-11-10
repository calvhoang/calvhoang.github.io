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

function gradeQuiz() {
  console.log("Grading quiz...");
  document.querySelector("#validationFdbk").textContent = "";

  if (!isFormValid()) {
    return;
  }

  let q1Response = document.querySelector("#q1").value;
  console.log(q1Response);
}