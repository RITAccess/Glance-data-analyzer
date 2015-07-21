<?php 
//Open data-analyzer csv file
$file_url = 'data-analyzer.csv';
//Set the file headers
header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary"); 
header("Content-disposition: attachment; filename=\"" . basename($file_url) . "\""); 
//Download the file
readfile($file_url);
//Delete the file
unlink($file_url);
?>