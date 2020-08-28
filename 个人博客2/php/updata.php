<?php
	$link = mysqli_connect("localhost" , "root" , "123456" , "push_card");
	if(!$link){
		echo "connect error!";
		exit;
	}
	
	mysqli_set_charset($link , "utf8");
	$content = $_GET["原任务内容"];
	$newcontent = $_GET["新任务内容"];
	$className = $_GET["任务类别"];
	$status = $_GET["是否完成"];
	$sql = "UPDATE task_list SET content='{$newcontent}' WHERE content='{$content}' ";

	$res = mysqli_query($link , $sql);
	
	mysqli_close($link);
?>