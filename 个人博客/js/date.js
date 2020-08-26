window.onload = function() {

	var nodeDate = document.getElementById("date");
	var nodeTime = document.getElementById("time");
	var nodeHours = document.getElementById("hours");
	var nodeMinutes = document.getElementById("minutes");
	var nodeYearMonth = document.getElementById("year-month-date");

	function sec(result , oxml){
		var taskData = JSON.parse(result);

		var nodeTaskList = document.getElementsByClassName("task-list");
		for(var i = 0; i < 5; i++){
			var nodeTask = nodeTaskList[i].getElementsByClassName("list");
			for(var j = 0; j < taskData[i].length; j++){
				var task = document.createElement("li");
				var text = document.createElement("input");
				text.className = "task-text";
				task.className = "task";
				text.type = "text";
				text.value = taskData[i][j].content;
				//alert(taskData[i][j].content);
				task.appendChild(text);
				nodeTask[0].appendChild(task);
			}
		}
	}
	function sqlOnload(){
		var oxml = new XMLHttpRequest();
		oxml.open("get" , "php/getdate.php" , true);
		oxml.send();
		oxml.onreadystatechange = function() {
			if (oxml.readyState == 4) {
				//alert(oxml.responseText);
				sec(oxml.responseText , oxml);
			}
		}
	}

	sqlOnload();
	function showTime() {
		var oDate = new Date();
		var newHour = oDate.getHours();
		var newMinute = oDate.getMinutes();
		var strMinute = "";
		if (newMinute < 10) {
			strMinute = "0"
		}
		nodeHours.innerHTML = newHour;
		nodeMinutes.innerHTML = strMinute + newMinute;
	}

	function showDate() {
		var oDate = new Date();
		var year = oDate.getFullYear();
		var month = oDate.getMonth() + 1;
		var date = oDate.getDate();
		var day = oDate.getDay();
		nodeYearMonth.innerHTML = year + " 年 " + month + " 月 " + date + " 日 ";
		var oToday = document.getElementById("today");
		var str = "";
		switch (day) {
			case 1:
				str = "一";
				break;
			case 2:
				str = "二";
				break;
			case 3:
				str = "三";
				break;
			case 4:
				str = "四";
				break;
			case 5:
				str = "五";
				break;
			case 6:
				str = "六";
				break;
			case 7:
				str = "天";
				break;
		}

		oToday.innerHTML = "星期 " + str;
	}
	var timer = setInterval(showTime, 1000);
	var dater = setInterval(showDate, 60000);
	showTime();
	showDate();

	function createTask() {
		var obtn = document.getElementsByClassName("btn");
		//alert(obtn.length);
		for (var i = 0; i < obtn.length; i++) {
			obtn[i].onclick = function(ev) {
				var task = document.createElement("li");
				var text = document.createElement("input");
				text.className = "task-text";
				task.className = "task";
				text.type = "text";
				task.appendChild(text);
				this.parentNode.parentNode.parentNode.childNodes[3].appendChild(task);
			}
		}
	}
	
	function modif(){
		var otask_list = document.getElementsByClassName("task-list");
		var flag = 0;
		
		for(var i = 0; i < otask_list.length; i++){
			if(otask_list[i].style.display == "block"){
				flag = i; break;
			}
		}
		
		var olist = otask_list[flag].getElementsByClassName("list");
		var oinput = olist[0].getElementsByClassName("task-text");
		
		for(let i = 0; i < oinput.length; i++){
			
			oinput[i].onkeydown = function(ev){
				var e = ev || window.event;
				
				if(e.keyCode == 13){
					var content = e.target.value;
					
					alert(e.target.value);
					var taskClass = "";
					alert(flag);
					switch(flag){
						case 0:taskClass += "今日完成"; break;
						case 1:taskClass += "今日任务"; break;
						case 2:taskClass += "特别任务"; break;
						case 3:taskClass += "年度任务"; break;
						case 4:taskClass += "月度任务"; break;
						case 5:taskClass += "周度任务"; break;
					}
					var data = "?" + "任务类别=" + taskClass + "&" + "任务内容=" + content + "&是否完成=" + false;
					alert(data);
					var xmr = new XMLHttpRequest();
					var xurl = "php/insertdate.php" + data;
					xmr.open("get" , xurl , true);
					xmr.send();
					xmr.onreadystatechange = function() {
						if (xmr.readyState == 4) {
							alert("成功");
						}
					}
				}
			}
		}
	}
	createTask();
	setInterval(modif , 1000);
}
