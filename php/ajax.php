<?php
/*
* Receives post call from javascript
*/ 
if(isset($_POST['action'])){
	//Make new csv file
	$filename = "data-analyzer.csv";
	//Write posted data to csv
	writeFile($filename, $_POST['action']);
	//Return name of file to open
	echo $filename;
    exit;
}
/*
* Writes CSV data ($data) to file
*/
function writeFile($filename, $data){
	//Open file and write to it. If the file opening failed, say so.
	$f = fopen("$filename", "w") or die("file open failed ");
	fwrite($f, $data);
	fclose($f);
	//Clean current buffer
	ob_clean();
    flush();
}
?>