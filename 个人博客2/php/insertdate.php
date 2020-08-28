<?php
	$link = mysqli_connect("localhost" , "root" , "123456" , "push_card");
	if(!$link){
		echo "connect error!";
		exit;
	}
	
	mysqli_set_charset($link , "utf8");
	
	$sql = "select* from task_list";
	
	$res = mysqli_query($link , $sql);
	
	//var_dump($res);
	$className = $_GET["任务类别"];
	$content = $_GET["任务内容"];
	$status = $_GET["是否完成"];
	$insert_sql = "insert into task_list(class , content , status) values('{$className}', '{$content}' , {$status})";
	var_dump($_GET);
	$res2 = mysqli_query($link , $insert_sql);
	var_dump($res2);

?>