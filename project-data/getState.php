<?php



$fp = fopen("stateContent.txt", "r");
$data = fread($fp, filesize("stateContent.txt"));

echo $data;


?>