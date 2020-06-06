auto.waitFor();
auto.setMode("normal");

console.show();
log("开始，打开京东");
launchApp("京东");
sleep(2000);

log("正在进入活动页面");
descContains("搜索框").findOne().click();
className("android.widget.EditText").findOne().setText("叠蛋糕");
text("搜索").click();
sleep(2000);
click(device.width / 2, device.height / 2);
sleep(2000);

textContains("做任务").waitFor();
log("点击做任务");
textContains("做任务").findOne().click();
sleep(1000);

var i = 0;
while (1) {
	var button = textContains("去完成").findOnce(i);
	if (button != null) {
		var p = button.parent().parent().parent();
		var t = p.child(0).child(1).text();
		if (t.search("8秒") != -1) {
			button.click();
			log("点击去完成");
			sleep(8000);
			textContains("恭喜完成").findOne(8000);
			back();
			log("返回");
			sleep(2000);
			i = 0;
		} else i++;
	} else {
		log("结束");
		console.hide();
		exit();
	}
}
