// Fetch community posts and display them
function fetchCommunityPosts() {
    fetch('get_posts.php')
        .then(response => response.json())
        .then(posts => {
            // Display posts in the post-list section
            // You can use posts.forEach() to iterate through and display posts
        })
        .catch(error => console.error('Error fetching posts: ', error));
}

// Post a new community post
function postCommunityPost(content) {
    fetch('post_post.php', {
        method: 'POST',
        body: JSON.stringify({ content: content }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // Post was successfully added, you can refresh the post list or update it
        } else {
            console.error('Error posting post');
        }
    })
    .catch(error => console.error('Error posting post: ', error));
}

// Call fetchCommunityPosts() to initially load posts
fetchCommunityPosts();

// Add an event listener to the post button
document.getElementById('post-button').addEventListener('click', () => {
    const postContent = document.getElementById('post-content').value;
    if (postContent) {
        postCommunityPost(postContent);
    }
    document.addEventListener("DOMContentLoaded", function () {
        // ...
    
        // Add an event listener to the form for submission
        document.getElementById('post-form').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission
    
            const postContent = document.getElementById('post-content').value;
    
            if (postContent.trim() !== '') {
                // You can add validation and sanitization here if needed
    
                // Send the post content to the server (PHP script)
                fetch('post_post.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: postContent })
                })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        // Post was successfully added, you can refresh the post list or update it
                        fetchCommunityPosts(); // Update the post list, assuming you have a function for this
                    } else {
                        console.error('Error posting post');
                    }
                })
                .catch(error => console.error('Error posting post: ', error));
            }
        });
    
        // ...
    });
    
});
