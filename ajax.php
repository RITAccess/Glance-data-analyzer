<?php 
if(isset($_POST['action'])){
	$filename = "data-analyzer.csv";
	writeFile($filename, $_POST['action']);
	//$content = $_POST['action'];
	//$f = fopen("php://output", 'w');
	//fwrite($f, $_POST['action']);
	//fclose($f);
	/*
	header('Content-Description: File Transfer');
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename='.$filename);
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filename));*/
    echo $filename;
    //echo getcwd();
    exit;

}

function writeFile($filename, $data){
	$f = fopen("php://output", 'w');
	fwrite($f, $data);
	fclose($f);
	ob_clean();
    flush();
}

?>
