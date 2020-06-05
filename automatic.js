auto.waitFor();
auto.setMode("normal");

console.show();
log("开始");
launchApp("手机淘宝");
sleep(2000);

// 进入618活动页面
function to618() {
	sleep(2000);
	if (desc("搜索").exists()) {
		desc("搜索").findOne().click();
		sleep(1000);
		idContains("searchEdit").setText("618列车");
		desc("搜索").findOne().click();
		sleep(1000);
		log("进入淘宝618列车活动界面");
		return 1;
	} else {
		log("无法进入活动界面，脚本结束！");
		sleep(1000);
		console.hide();
		return -1;
	}
}

if (to618() == 1) {
	while (1) {
		// 寻找领喵币按钮
		var miao = textContains("领喵币").findOne(5000);
		if (miao == null) {
			log("未找到领喵币按钮，尝试进入活动页面！");
			if (to618() == -1) break;
		}
		textContains("领喵币").waitFor();
		log("点击领喵币");
		textContains("领喵币").click();
		sleep(1000);
		textContains("0000喵币").waitFor();
		sleep(1000);
		if (textContains("去浏览").exists()) {
			log("点击去浏览");
			textContains("去浏览").findOne().click();
			log("开始浏览");
			// 随机延时25-30秒，如果没有浏览成功便返回可以增加
			sleep(1000 * random(25, 30));
			log("结束浏览，返回");
			back();
			textContains("关闭").click();
			log("关闭领喵币中心");
			sleep(1000);
		} else {
			log("脚本结束");
			sleep(1000);
			console.hide();
			break;
		}
	}
}
