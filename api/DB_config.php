<?php
require_once '../vendor/autoload.php';
date_default_timezone_set('Europe/Bucharest');
$servername = "sql7.freemysqlhosting.net";
$username = "sql7253038";
$password = "ZcSfyT15rB";
$dbname = "sql7253038";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

mysqli_set_charset($conn,'utf8');

// selects http method
$method = $_SERVER['REQUEST_METHOD'];
// fetches url params
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
echo json_encode($request, JSON_NUMERIC_CHECK);
// fetches http body (for post requests)
$input = json_decode(file_get_contents("php://input"));
?>
