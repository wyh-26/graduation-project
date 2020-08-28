<?php
	$link = mysqli_connect("localhost" , "root"  , "123456" , "push_card");
	
	if(!$link){
		echo "connect error!";
		exit;
	}
	mysqli_set_charset($link , "utf8");
	
	
	$content = $_GET["content"];
	$sql = "delete from task_list where content = '{$content}'";
	
	mysqli_query($link , $sql);

	mysqli_close($link);
?>