document.getElementById('calorieForm').addEventListener('submit', function (e) {
  e.preventDefault();
  calculateCalories();
});

function calculateCalories() {
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weight').value;
  const height
