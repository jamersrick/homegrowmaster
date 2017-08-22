<?
//logout.php


require_once('connection.php');
$con->userLogout();
header('Location:index.php);

