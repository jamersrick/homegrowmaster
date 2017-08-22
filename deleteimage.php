<?

if (isset($_POST['submit'])) 
{
$targetFile = "uploads/".basename($_FILES['attachments']['name'][0]);
	if(unlink["$targetFile"]))
	{
		echo "image is deleted";
	}
	else
	{
		echo " Error!"
	}
}
