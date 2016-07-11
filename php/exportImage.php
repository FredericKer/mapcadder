<?php
	//php to download the static map image
	$imageUrl = $_POST["iUrl"];

	header("Content-Type: image/jpeg");
	header('Content-Disposition: attachment;filename=map_image.jpg');
	header('Content-Type: application/force-download');
	
	echo file_get_contents($imageUrl);
	
	
?>