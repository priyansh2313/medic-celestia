document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("appointmentModal");
    const modalClose = document.getElementById("modalClose");
    const appointmentButton = document.querySelectorAll(".appointment-button");
    const expertList = document.getElementById("expertList");
    const sortField = document.getElementById("sortField");
    const filterByDisorder = document.getElementById("filterByDisorder");
    // Sample expert data with profile pictures (update with actual data)
    const experts = [
        {
            name: "Dr. John Smith",
            experience: "Ph.D. in Clinical Psychology, 10+ years of experience",
            disorder: "Anxiety",
            profilePicture: "https://tse4.mm.bing.net/th?id=OIP.Y_uv6gw8uY2kd9RHoEevxAHaE8&pid=Api&P=0&h=180.jpg"
        },
        {
            name: "Dr. Sarah Johnson",
            experience: "Licensed Psychologist, Specializes in Anxiety and Depression",
            disorder: "Depression",
            profilePicture: "https://tse2.mm.bing.net/th?id=OIP.uNe4GOYw4ml0QNNYg2qoPQHaFU&pid=Api&P=0&h=180.jpg"
        },
        {
            name: "Dr. Emily Davis",
            experience: "Counseling Psychologist, Expert in Stress Management",
            disorder: "Stress",
            profilePicture: "https://tse1.mm.bing.net/th?id=OIP.gSgWt8iKizVdPmfun_XfwQHaE8&pid=Api&P=0&h=180.jpg"
        },
        // Add more experts as needed
    ];

    // Function to generate expert cards
    function generateExpertCards(selectedDisorder) {
        expertList.innerHTML = '';

        experts.forEach((expert) => {
            if (selectedDisorder === '' || expert.disorder === selectedDisorder) {
                const expertCard = document.createElement("div");
                expertCard.classList.add("expert-card");

                // Create the profile picture element
                const profilePicture = document.createElement("img");
                profilePicture.src = expert.profilePicture;
                profilePicture.alt = `${expert.name}'s Picture`; // Corrected line
                profilePicture.classList.add("profile-picture");
                expertCard.appendChild(profilePicture);

                // Create the expert details element
                const expertDetails = document.createElement("div");
                expertDetails.classList.add("expert-details");

                const expertName = document.createElement("h3");
                expertName.textContent = expert.name;

                const expertDescription = document.createElement("p");
                expertDescription.textContent = `Experience: ${expert.experience}\nDisorder: ${expert.disorder}`;

                expertDetails.appendChild(expertName);
                expertDetails.appendChild(expertDescription);

                expertCard.appendChild(expertDetails);

                // Create the appointment button
                const appointmentButton = document.createElement("button");
                appointmentButton.classList.add("appointment-button");
                appointmentButton.textContent = "Book Appointment";

                appointmentButton.addEventListener("click", () => {
                    modal.style.display = "block"; // Open the modal when the button is clicked
                });

                expertCard.appendChild(appointmentButton);

                expertList.appendChild(expertCard);
            }
        });
    }

    // Initial generation of expert cards based on the default sorting field (name) and no filtering
    generateExpertCards('');

    // Sort experts based on the selected field (name, experience, or disorder)
    sortField.addEventListener("change", () => {
        const selectedField = sortField.value;
        if (selectedField === "name") {
            experts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (selectedField === "experience") {
            experts.sort((a, b) => a.experience.localeCompare(b.experience));
        } else if (selectedField === "disorder") {
            experts.sort((a, b) => a.disorder.localeCompare(b.disorder));
        }

        generateExpertCards(filterByDisorder.value); // Re-generate cards with the current filter
    });

    // Filter experts by disorder when the user selects a disorder from the dropdown
    filterByDisorder.addEventListener("change", () => {
        const selectedDisorder = filterByDisorder.value;
        generateExpertCards(selectedDisorder);
    });

    // Close the modal when the close button is clicked
    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close the modal when the user clicks outside the modal
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission
    const appointmentForm = document.getElementById("appointmentForm");
    appointmentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const userName = document.getElementById("patientName").value;
        const userPhone = document.getElementById("patientPhone").value;
        const appointmentDate = document.getElementById("appointmentDate").value;

        // Handle the form data (e.g., send it to a server)
        // For demonstration, we'll just show an alert with the data
        const confirmationMessage = `Appointment booked for:
        Name: ${userName}
        Phone Number: ${userPhone}
        Appointment Date: ${appointmentDate}`;

        alert(confirmationMessage);

        modal.style.display = "none"; // Close the modal after submission
    });
});
