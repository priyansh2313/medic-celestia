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

// Function to fetch community posts
function getCommunityPosts() {
    global $conn;
    $sql = "SELECT cp.id, cp.content, cp.timestamp, u.username FROM community_posts cp
            JOIN users u ON cp.user_id = u.id
            ORDER BY cp.timestamp DESC";
    $result = $conn->query($sql);
    $posts = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $posts[] = $row;
        }
    }
    return $posts;
}

// Get the community posts
$posts = getCommunityPosts();

// Return the posts as JSON
header('Content-Type: application/json');
echo json_encode($posts);

// Close the database connection
$conn->close();
?>
