document.getElementById('calorieForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Collecting input values
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;
  const gender = document.getElementById('gender').value;
  const activityLevel = document.getElementById('activityLevel').value;
  const workoutIntensity = document.getElementById('workoutIntensity').value;

  // Calculating BMR
  let bmr = gender === 'male' ?
    (10 * weight) + (6.25 * height) - (5 * age) + 5 :
    (10 * weight) + (6.25 * height) - (5 * age) - 161;

  // Adjusting BMR based on activity level
  let tdee = bmr * activityLevel;

  // Further adjust TDEE based on workout intensity if necessary
  // This is a simplified adjustment, you might want to refine how workoutIntensity influences TDEE
  tdee += tdee * workoutIntensity;

  // Displaying the results
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `BMR: ${bmr.toFixed(2)} kcal/day <br> TDEE: ${tdee.toFixed(2)} kcal/day`;
});
