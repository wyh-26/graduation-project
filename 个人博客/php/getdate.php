<?php
	$link = mysqli_connect("localhost" , "root" , "123456" , "push_card");
	if(!$link){
		echo "connect error!";
		exit;
	}
	
	mysqli_set_charset($link , "utf8");
	
	$sql_select = "select* from task_list";
	mysqli_query($link , $sql_select);
	
	$hash = array();
	array_push($hash , "今日完成");
	array_push($hash , "今日任务");
	array_push($hash , "年度任务");
	array_push($hash , "月度任务");
	array_push($hash , "周度任务");
	
	$arr = array();
	for($i = 0; $i < 5; $i++){
		array_push($arr , array());
	}
	
	for($j = 0; $j < 5; $j++){
		$sql_get = "select* from task_list where class= '{$hash[$j]}'";
		
		$res = mysqli_query($link , $sql_get);
		while($row = mysqli_fetch_assoc($res) ){
			array_push($arr[$j] , $row);
		}
	}
	
	echo json_encode($arr);
	mysqli_close($link);





?>