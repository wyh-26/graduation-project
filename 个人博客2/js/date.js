window.onload = function() {

	var nodeDate = document.getElementById("date");
	var nodeTime = document.getElementById("time");
	var nodeHours = document.getElementById("hours");
	var nodeMinutes = document.getElementById("minutes");
	var nodeYearMonth = document.getElementById("year-month-date");

	function sec(result, oxml) {
		var taskData = JSON.parse(result);

		var nodeTaskList = document.getElementsByClassName("task-list");
		for (var i = 0; i < 5; i++) {
			var nodeTask = nodeTaskList[i].getElementsByClassName("list");
			for (var j = 0; j < taskData[i].length; j++) {
				var task = createTask();
				var inputs = task.getElementsByClassName("task-text");
				inputs[0].className = "task-text";
				inputs[0].type = "text";
				inputs[0].value = taskData[i][j].content;
				inputs[0].disabled = "disabled";
				//alert(taskData[i][j].content);
				task.appendChild(inputs[0]);
				nodeTask[0].appendChild(task);
			}
		}
		
	}

	
	function deletBtn(){
		this.parentNode.parentNode.removeChild(this.parentNode);
		var oli = this.parentNode;
		var inputs = oli.getElementsByClassName("task-text");
		var content = inputs[0].value;
		
		var data = "?content=" + content;
		 
		var oxml = new XMLHttpRequest();
		oxml.open("get" , "php/deletdate.php" + data , true);
		oxml.send();
		
		oxml.onreadystatechange = function() {
			if (oxml.readyState == 4) {
				alert("删除成功");
			}
		}
		
		
		
	}


	function sqlOnload() {
		var oxml = new XMLHttpRequest();
		oxml.open("get", "php/getdate.php", true);
		oxml.send();
		oxml.onreadystatechange = function() {
			if (oxml.readyState == 4) {
				//alert(oxml.responseText);
				sec(oxml.responseText, oxml);
			}
		}
	}

	function creon() {
		var task = createTask();
		this.parentNode.parentNode.parentNode.childNodes[3].appendChild(task);
	}

	function createTask() {
		var task = document.createElement("li");
		var btnDelet = document.createElement("button");
		var btnChange = document.createElement("button");
		var text = document.createElement("input");
		var check = document.createElement("input");

		check.type = "checkbox";
		check.onclick = deletBtn;
		btnDelet.innerHTML = "删除";
		btnChange.innerHTML = "修改";
		btnDelet.style.float = "right";
		btnDelet.className = "delet";
		btnDelet.onclick = deletBtn;
		btnChange.style.float = "right";
		btnChange.className = "change";
		btnDelet.style.margin = " 5px 0px 0px 2px";
		btnChange.style.margin = "5px 2px 0px 0px";



		task.style.float = "left";
		text.className = "task-text";
		task.className = "task";
		task.appendChild(check);
		text.type = "text";
		task.appendChild(text);
		task.appendChild(btnDelet);
		task.appendChild(btnChange);
		return task;
	}


	function newTask() {
		var obtn = document.getElementsByClassName("btn");
		for (var i = 0; i < obtn.length; i++) {
			obtn[i].onclick = creon;
		}

	}



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









	function modif() {
		var otask_list = document.getElementsByClassName("task-list");
		var flag = 0;

		for (var i = 0; i < otask_list.length; i++) {
			if (otask_list[i].style.display == "block") {
				flag = i;
				break;
			}
		}

		var olist = otask_list[flag].getElementsByClassName("list");
		var oinput = olist[0].getElementsByClassName("task-text");
		var difbtn = olist[0].getElementsByClassName("change");
		for (let i = 0; i < oinput.length; i++) {
			difbtn[i].onclick = function(){
				this.index = i;
				var oin = oinput[this.index];
				oin.disabled = false;
				
				oin.orvalue = oin.value;
				
			}
			
			
			
			oinput[i].onkeydown = function(ev) {
				var e = ev || window.event;
				
				if (e.keyCode == 13) {
					this.disabled = "disabled";
					
					var content = e.target.value;

					//alert(e.target.value);
					var taskClass = "";
					//alert(flag);
					switch (flag) {
						case 0:
							taskClass += "今日完成";
							break;
						case 1:
							taskClass += "今日任务";
							break;
						case 2:
							taskClass += "特别任务";
							break;
						case 3:
							taskClass += "年度任务";
							break;
						case 4:
							taskClass += "月度任务";
							break;
						case 5:
							taskClass += "周度任务";
							break;
					}
					
					var data = "?" + "任务类别=" + taskClass + "&" + "任务内容=" + content + "&是否完成=" + false;
					var xurl = "php/insertdate.php" + data;
					var xmr = new XMLHttpRequest();
					
					if(this.orvalue != null){
						data = "?" + "任务类别=" + taskClass + "&" + "原任务内容=" + this.orvalue + "&新任务内容=" + this.value + "&是否完成=" + false;
						xurl = "php/updata.php" + data;
					}
			
					xmr.open("get", xurl, true);
					xmr.send();
					xmr.onreadystatechange = function() {
						if (xmr.readyState == 4) {
							//alert(xmr.responseText);
						}
					}
					
				}
			}
		}
	}

	sqlOnload();
	newTask();

	setInterval(modif, 1000);

}
