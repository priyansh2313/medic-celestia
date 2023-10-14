document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("questionnaire-form");
    const submitButton = document.getElementById("submit-button");

    submitButton.addEventListener("click", () => {
        const q1 = parseInt(document.getElementById("q1").value, 10);
        // Add more question variables and values here

        // Calculate the total score
        const totalScore = q1 /* + q2 + q3 + q4 + q5 */; // Add all question scores here

        // Store the score in sessionStorage for the result page to access
        sessionStorage.setItem("mentalHealthScore", totalScore);

        // Redirect to the result page
        window.location.href = "result.html";
    });
});
