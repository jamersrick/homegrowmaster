<?php
require_once("connection.php");

//print_r($_POST);
//exit;
if ($_POST){
	$name = filter_var($_POST["garName"], FILTER_SANITIZE_STRING);
	$user_id = filter_var($_POST["user_id"], FILTER_SANITIZE_STRING);
	$width = filter_var($_POST["widthMenu"], FILTER_SANITIZE_STRING);
	$length = filter_var($_POST["lengthMenu"], FILTER_SANITIZE_STRING);
	
$sql = "INSERT INTO gardens (name, user_id, width, length) VALUES";
	
$sql .= sprintf(" ('%s', %d, %d, %d),", 
	$name, $user_id, $width, $length);

}	
//print_r( $gardens );



$sql = rtrim($sql, ',');

// echo $sql;

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

