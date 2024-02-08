document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('calorieForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Fetching form values safely
    const age = Number(document.getElementById('age').value) || 0;
    const weight = Number(document.getElementById('weight').value) || 0;
    const height = Number(document.getElementById('height').value) || 0;
    const gender = document.getElementById('gender').value;
    const activityLevel = Number(document.getElementById('activityLevel').value) || 1;
    const workoutIntensity = Number(document.getElementById('workoutIntensity').value) || 0;
    const bodyFat = document.getElementById('bodyFat').value ? Number(document.getElementById('bodyFat').value) : 0;
    const goalWeight = Number(document.getElementById('goalWeight').value) || weight; // Default to current weight if not specified

    // BMR calculation
    let bmr;
    if (bodyFat > 0) {
      const leanBodyMass = weight * (1 - bodyFat / 100);
      bmr = 370 + (21.6 * leanBodyMass);
    } else {
      bmr = gender === 'male'
        ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
        : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // TDEE calculation
    let tdee = bmr * activityLevel;
    tdee += tdee * workoutIntensity;

    // Adjusted Calories based on goal
    const goal = document.getElementById('goal').value;
    let adjustedCalories = tdee;
    switch (goal) {
      case 'gain':
        adjustedCalories += 500;
        break;
      case 'lose':
        adjustedCalories -= 500;
        break;
    }

    // Weeks to reach goal weight
    const weightDifference = goalWeight - weight;
    const weeklyCalorieDifference = adjustedCalories - tdee;
    const caloriesPerKg = 7700;
    const weeksToGoal = weightDifference * caloriesPerKg / weeklyCalorieDifference / 7;

    // Displaying the results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
          <p>BMR: <span class="info-icon" title="Base Metabolic Rate - xxx">?</span> ${bmr.toFixed(2)} kcal/day</p>
          <p>TDEE (Total Daily Energy Expenditure): <span class="info-icon" title="Total Daily Energy Expenditure - xxx">?</span> ${tdee.toFixed(2)} kcal/day</p>
          <p>Calories after goal adjustment: <span class="info-icon" title="Calories needed to meet your goal.">?</span> ${adjustedCalories.toFixed(2)} kcal/day</p>
          <p>Estimated weeks to reach goal weight: ${Math.abs(weeksToGoal).toFixed(1)}</p>
      `;
    document.getElementById('results-container').style.display = 'block';
  });
});
