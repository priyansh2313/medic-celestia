document.addEventListener("DOMContentLoaded", function () {
    const postForm = document.getElementById("create-post-form");
    const postContent = document.getElementById("post-content");
    const postList = document.getElementById("post-list");

    postForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const content = postContent.value.trim();
        if (content !== "") {
            // Create a new post element
            const newPost = document.createElement("li");
            newPost.textContent = content;

            // Add the new post to the post list
            postList.appendChild(newPost);

            // Clear the post input
            postContent.value = "";
        }
    });
});



document.getElementById("")