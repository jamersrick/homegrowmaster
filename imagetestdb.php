<?php

//connect to database
require_once("connection.php");

if(isset($_FILES['attachments'])){
	//echo "<PRE>";
	//var_dump($_FILES);
	
	//declare msg
	$msg = "";
	//$dir = "uploads/";
	$fileName = $_FILES['attachments']['name'];
	
	//upload files to upload dir
	$targetFile = "uploads/".basename($_FILES['attachments']['name'][0]);
	//$targetFile = $dir.$fileName;
	if(file_exists($targetFile))
		$msg = array("status" =>0, "msg" => "File already exists!");
	else if(move_uploaded_file($_FILES['attachments']['tmp_name'][0], $targetFile))
		$msg = array ("status" =>1, "msg" =>"File has been uploaded" , "path" => $targetFile);
		
    // ****************************************************************
    // You need to sanitize the data to prevent mysql injection attacks
    // ****************************************************************
    
    //$sql = sprintf("INSERT INTO photo (path) VALUES('%s')", $targetFile );
	$sql = sprintf("INSERT INTO photo (path) VALUES('%s')", $targetFile );

    
    if ($conn->query($sql) === false) {
	   $msg = array ("status" =>2, "msg" =>"Error: Could not save to the database" , "error" => $conn->error);
        
    }
    
	exit(json_encode($msg));
}
