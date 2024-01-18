<?php
$servername = "localhost";
$username_db = "root";
$password_db = "";
$dbname = "baza";
$port = 3307;

$conn = mysqli_connect($servername, $username_db, $password_db,$dbname, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

    if ($stmt->execute()) {
        echo "Registration Successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();


$conn->close();
?>