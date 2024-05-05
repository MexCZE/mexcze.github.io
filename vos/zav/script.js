function calculate() {
  var currentExercises = parseInt(
    document.getElementById("currentExercises").value
  );
  var totalExercises = 1200;
  var remainingExercises = totalExercises - currentExercises;

  var endDate = new Date(document.getElementById("endDate").value);
  var daysLeft = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24));
  var exercisesPerDay = Math.ceil(remainingExercises / daysLeft);

  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML =
    "<p>Zbývající počet cvičení do cíle: <strong>" +
    remainingExercises +
    "</strong></p>" +
    "<p>Počet cvičení, které musíte napsat denně do konce zadaného data: <strong>" +
    exercisesPerDay +
    "</strong></p>";
}
