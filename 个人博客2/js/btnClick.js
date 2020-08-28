function btn() {
	var osild = document.getElementsByClassName("sildbar-btn");
	var otask_list = document.getElementsByClassName("task-list");
	
	//初始化当前显示页面
	for (var i = 0; i < osild.length; i++) {
		if (i == 0) {
			otask_list[i].style.display = "block";
		} else {
			otask_list[i].style.display = "none";
		}
	}

	//为页面切换按钮添加点击事件
	for (var i = 0; i < osild.length; i++) {
		osild[i].index = i;
		osild[i].onclick = function() {
			otask_list[this.index].style.display = "block";
			this.style.background = "gray";
			for (var j = 0; j < osild.length; j++) {
				if (j != this.index) {
					otask_list[j].style.display = "none";
					osild[j].style.background = "none";
				}
			}
		}
	}
}




window.addEventListener("load", btn, false);



