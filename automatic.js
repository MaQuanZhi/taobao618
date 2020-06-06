auto.waitFor();
auto.setMode("normal");
console.show();
log("开始");
launchApp("手机淘宝");
sleep(2000);

function to618() {
    sleep(2000);
    if (desc("搜索").exists()) {
        desc("搜索").findOne().click();
        sleep(1000);
        idContains("searchEdit").setText("618列车");
        desc("搜索").findOne().click();
        sleep(1000);
        log("进入淘宝618列车活动界面");
        sleep(1000);
        return 1;
    } else {
        log("无法进入活动界面，结束！");
        sleep(1000);
        console.hide();
        return -1;
    }
}

function click_button(str) {
    if (textContains(str).exists()) {
        log("点击" + str);
        textContains(str).findOne().click();
        log("开始浏览");
        sleep(1000 * 15);
        textContains("完成").findOne(15 * 1000);
        log("结束浏览，返回");
        back();
        sleep(1000);
        if (textContains("关闭").exists()) {
            textContains("关闭").click();
            log("关闭领喵币中心");
            sleep(1000);
        } else {
            to618();
        }
        return 1;
    } else return -1;
}

if (to618() == 1) {
    while (1) {
        var miao = textContains("领喵币").findOne(10000);
        if (miao == null) {
            log("未找到领喵币按钮，尝试进入活动页面！");
            if (to618() == -1) break;
        }
        log("点击领喵币");
        textContains("领喵币").waitFor();
        sleep(1000);
        textContains("领喵币").click();
        sleep(1000);
        textContains("0000喵币").waitFor();
        sleep(1000);
        var a = click_button("去浏览");
        var b = click_button("去逛逛");
        var c = click_button("去参与");
        var d = click_button("去观看");
        if (a == -1 && b == -1 && c == -1 && d == -1) {
            log("结束");
            sleep(1000);
            console.hide();
            break;
        }
    }
}
