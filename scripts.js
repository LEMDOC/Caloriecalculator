document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('calorieForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Ensure values are parsed as Numbers
    const age = Number(document.getElementById('age').value);
    const weight = Number(document.getElementById('weight').value);
    const height = Number(document.getElementById('height').value);
    const gender = document.getElementById('gender').value;
    const activityLevel = Number(document.getElementById('activityLevel').value);
    const workoutIntensity = Number(document.getElementById('workoutIntensity').value);
    const bodyFat = Number(document.getElementById('bodyFat').value); // Ensure this is a number, even if it's empty

    let bmr;
    if (bodyFat) {
      const leanBodyMass = weight * (1 - (bodyFat / 100));
      bmr = 370 + (21.6 * leanBodyMass);
    } else {
      bmr = gender === 'male' ?
        (10 * weight) + (6.25 * height) - (5 * age) + 5 :
        (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    let tdee = bmr * activityLevel;
    tdee += tdee * workoutIntensity;

    const goal = document.getElementById('goal').value;
    let adjustedCalories = tdee;

    switch (goal) {
      case 'gain':
        adjustedCalories += 500; // Example surplus
        break;
      case 'maintain':
        // Might keep TDEE the same but focus on diet quality
        break;
      case 'lose':
        adjustedCalories -= 500; // Example deficit
        break;
    }

    const goalWeight = Number(document.getElementById('goalWeight').value); // New input for goal weight
    const weightDifference = goalWeight - weight; // Positive for weight gain, negative for weight loss
    let caloriesPerDayChange = adjustedCalories - tdee; // Adjusting based on the goal

    // Calculate weeks to goal
    const weeksToGoal = weightDifference / (caloriesPerDayChange / 500 * 0.5);

    // Adjusted display message to include goal weight and weeks to reach goal
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Age: ${age} years<br>BMR: ${bmr.toFixed(2)} kcal/day<br>TDEE (before adjustment): ${tdee.toFixed(2)} kcal/day<br>Calories after goal adjustment: ${adjustedCalories.toFixed(2)} kcal/day<br>Weeks to reach goal weight: ${Math.abs(weeksToGoal).toFixed(1)}`;
  });
});
