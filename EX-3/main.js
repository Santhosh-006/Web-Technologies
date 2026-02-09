const form = document.getElementById("surveyForm");
const progressBar = document.getElementById("progressBar");
const statusText = document.getElementById("status");
const conditionalBox = document.getElementById("conditionalBox");

// CONDITIONAL RENDERING
document.querySelectorAll('input[name="satisfied"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    conditionalBox.classList.toggle("hidden", radio.value !== "No");
  });
});

// PROGRESS BAR (NO VALIDATION)
function updateProgress() {
  const inputs = form.querySelectorAll("input, select, textarea");
  let filled = 0;

  inputs.forEach((input) => {
    if (
      (input.type === "radio" && input.checked) ||
      (input.type === "checkbox" && input.checked) ||
      (input.value && input.type !== "radio" && input.type !== "checkbox")
    ) {
      filled++;
    }
  });

  progressBar.style.width = (filled / inputs.length) * 100 + "%";
}

form.addEventListener("input", updateProgress);

// AUTO SAVE — NO VALIDATION
setInterval(() => {
  const data = {};
  new FormData(form).forEach((value, key) => (data[key] = value));
  localStorage.setItem("surveyAutoSave", JSON.stringify(data));
  statusText.innerText = "Responses auto-saved";
}, 10000);

// VALIDATION ONLY ON SUBMIT
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const age = document.getElementById("age").value;
  const features = document.querySelectorAll(".feature:checked");

  if (!age || age < 18 || age > 60) {
    alert("Age must be between 18 and 60");
    return;
  }

  if (features.length < 2 || features.length > 3) {
    alert("Select 2 to 3 features");
    return;
  }

  alert("Survey submitted successfully!");
  localStorage.removeItem("surveyAutoSave");
  form.reset();
  progressBar.style.width = "0%";
});
