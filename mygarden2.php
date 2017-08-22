<?php
require_once("connection.php");

//print_r($_POST);
//exit;
// if ($_POST){
// 	$name = filter_var($_POST["plantName"], FILTER_SANITIZE_STRING);
// 	$quantity = filter_var($_POST["pQty"], FILTER_SANITIZE_STRING);
// 	$sow_date = filter_var($_POST["datepicker_sow"], FILTER_SANITIZE_STRING);
// 	$harvest_date = filter_var($_POST["datepicker_harvest"], FILTER_SANITIZE_STRING);
// 	$harvest_volume = filter_var($_POST["pVol"], FILTER_SANITIZE_STRING);
// 	$price = filter_var($_POST["pPrice"], FILTER_SANITIZE_STRING);
// 	$total_amt = filter_var($_POST["total"], FILTER_SANITIZE_STRING);
	
$sql = "INSERT INTO plant_diary (name, quantity, sow_date, harvest_date, harvest_volume, price, total_amt, `garden_id`) VALUES";

foreach($_POST['data'] as $harvestdata) {
	
$sql .= sprintf(" ('%s', %d, '%s', '%s', %d, %d, %d, %d),", 
	//$name, $quantity, $sow_date, $harvest_date, $harvest_volume, $price, $total_amt);
	$harvestdata['name'],$harvestdata['quantity'],$harvestdata['sow_date'],
	$harvestdata['harvest_date'],$harvestdata['harvest_volume'], $harvestdata['price'],
	$harvestdata['total_amt'],$harvestdata['garden_id']);
}
	
//print_r( $harvestdata );

$sql = rtrim($sql, ',');

// echo $sql;

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();