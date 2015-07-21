<?php
/*
* Receives post call from javascript
*/ 
if(isset($_POST['action'])){
	//Make new csv file
	$num = rand(0,6000);
	$filename = "data-analyzer" . $num . ".csv";
	//Write posted data to csv
	writeFile($filename, $_POST['action']);
	//Return name of file to open
	$phpFile = "fileDownload".$num.".php";	
	$myPhp = '<?php 
	$file_url = "'.$filename.'";
	header(\'Content-Type: application/octet-stream\');
	header("Content-Transfer-Encoding: Binary"); 
	header("Content-disposition: attachment; filename=\"" . basename("data-analyzer.csv") . "\""); 
	echo readfile($file_url);
	unlink($file_url);
	unlink(__FILE__);
	?>';
	chmod($filename, 0777);
	writeFile($phpFile,$myPhp);
	chmod($phpFile, 0777);
	echo $phpFile;
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
