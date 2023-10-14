document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the mental health score from sessionStorage
    const score = sessionStorage.getItem("mentalHealthScore");

    if (score !== null) {
        const scoreElement = document.getElementById("score");
        const interpretationElement = document.getElementById("interpretation");

        scoreElement.textContent = score;

        // You can add custom interpretations based on score ranges
        if (score >= 4) {
            interpretationElement.textContent = "You're doing well!";
        } else if (score >= 2) {
            interpretationElement.textContent = "Take care of yourself.";
        } else {
            interpretationElement.textContent = "Consider seeking help.";
        }
    } else {
        // Handle the case where the score is not found
        alert("Score not found.");
    }
});



        document.getElementById("captureBtn").addEventListener("click", function() {
            // Capture the entire document body
            html2canvas(document.body).then(function(canvas) {
                // Convert the captured content to a data URL representing a JPG image
                var imgData = canvas.toDataURL("image/jpeg");

                // Create a link element to download the JPG image
                var a = document.createElement("a");
                a.href = imgData;
                a.download = "webpage.jpg";
                a.click();
            });
        });
    