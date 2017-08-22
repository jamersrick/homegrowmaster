<?php
require_once("connection.php");

//print_r($_POST);
//exit;

//mysqli_connect("home_grow", $conn);


//$getImage = mysqli_query("SELECT * FROM photo") or die("Could not retrieve image: " .mysqli_error($conn));



$output = array();
$result = "SELECT * FROM photo";
while ($row = $result-> fetch_assoc())

//while($row = mysql_fetch_array($result))
{
	$output[] = $row['photo'];
	//echo "<img src='".$row['photo']."' />";
}
echo json_encode($output);


//$result = mysqli_query($conn, $sql);
	if ($conn->query($result) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $result . "<br>" . $conn->error;
	}