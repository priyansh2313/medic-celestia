<?php
// Database configuration
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "mental_health_community";

// Create a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to insert a new community post
function insertCommunityPost($user_id, $content) {
    global $conn;
    $content = $conn->real_escape_string($content);
    $sql = "INSERT INTO community_posts (user_id, content) VALUES ('$user_id', '$content')";
    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return false;
    }
}

// Get the post content from the request
$postData = json_decode(file_get_contents('php://input'), true);

if (isset($postData['content'])) {
    // Replace 'user_id' with the actual user ID of the logged-in user
    $user_id = 1; // Example user ID; you need to implement user authentication
    $content = $postData['content'];

    if (insertCommunityPost($user_id, $content)) {
        // Post was successfully added
        $response = ['success' => true];
    } else {
        // Error occurred while adding the post
        $response = ['success' => false, 'error' => 'Error adding post'];
    }
} else {
    // Invalid request or missing data
    $response = ['success' => false, 'error' => 'Invalid request'];
}

// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($response);

// Close the database connection
$conn->close();
?>
