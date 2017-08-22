<?php

require_once("connection.php");

$sql = "INSERT INTO garden_items (type, height, width, top, bottom, `left`, `right`, `garden_id`) VALUES";

foreach($_POST['data'] as $plant) {
	
$sql .= sprintf(" ('%s', '%s', '%s', '%s', '%s', '%s', '%s', %d),", 
	$plant['type'], $plant['height'], $plant['width'], $plant['top'], $plant['bottom'], $plant['left'], $plant['right'], $plant['garden_id']) ;

	
print_r( $plant );

}

$sql = rtrim($sql, ',');

// echo $sql;

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();