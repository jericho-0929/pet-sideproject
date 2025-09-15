// Initialization
// Buttons
const dryFoodButton = document.getElementById("dry-food");
const wetFoodButton = document.getElementById("wet-food");
const selectFoodButton = document.getElementById

// Manual Entry Dialog
const enterManualConfirmed = document.getElementById("enter-manual-okay");
const enterManualCanceled = document.getElementById("enter-manual-cancel");
const manualDialog = document.getElementById("enter-manual-dialog")

console.log("portion_guide.js loaded.")

const formulaPair = {
    petWeight: 0,
    minimumFoodPortion: 0,
    recommendedServing: 0
};

enterManualConfirmed.addEventListener('click', function() {
    const inputPetWeight = document.getElementById("pet-weight-calculation");
    const inputMinimumFoodPortion = document.getElementById("recommended-serving");
    formulaPair.petWeight = inputPetWeight.value;
    formulaPair.minimumFoodPortion = inputMinimumFoodPortion.value;
    formulaPair.recommendedServing = formulaPair.minimumFoodPortion / formulaPair.petWeight;

    console.log("Formula entered: " + formulaPair);

    manualDialog.close();
});