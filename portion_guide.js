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

// TODO: Add block to handle refresh states in a session (formulaPair should persist)
$(document).ready(function() {
    const storedFormulaPair = JSON.parse(sessionStorage.getItem("formulaPair"))
    if (storedFormulaPair){
        formulaPair = storedFormulaPair;
    }
})

// Initialize event listeners.
enterManualConfirmed.addEventListener('click', function() {
    setManualEntry(
        document.getElementById("pet-weight-calculation"), 
        document.getElementById("recommended-serving")
    )

    // Save current formulaPair to session storage.
    sessionStorage.setItem("formulaPair", JSON.stringify(formulaPair));

    manualDialog.close();
});
$('#pet-weight').on('change keyup', function() {
    const servingRecommendation = formulaPair.recommendedServing * $('#pet-weight').val();

    $("#measurement-value").text(servingRecommendation + ' grams');

    
})

function setManualEntry(inputPetWeight, inputMinimumFoodPortion){
    formulaPair.petWeight = inputPetWeight.value;
    formulaPair.minimumFoodPortion = inputMinimumFoodPortion.value;
    formulaPair.recommendedServing = formulaPair.minimumFoodPortion / formulaPair.petWeight;

    console.log("formulaPair changed: " + formulaPair);

    return formulaPair;
}