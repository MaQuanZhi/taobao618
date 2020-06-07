auto.waitFor();
auto.setMode("normal");

/* 根据列车等级删除taskList中
 * 大于等级的所有数字
 * 升级后重新添加
 * 全部列表 ["57", "54", "51", "48", "45", "42", "39", "36", "33", "30", "27", "24", "21", "18", "15", "9", "6", "3"];
 */
var taskList = ["27", "24", "21", "18", "15", "9", "6", "3"];

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
        //console.hide();
        return -1;
    }
}

function click_button(str) {
    if (textContains(str).exists()) {
        log("点击" + str);
        textContains(str).findOne().click();
        log("开始浏览");
        sleep(1000 * 15);
        textContains("完成").findOne(10 * 1000);
        log("结束浏览，返回");
        back();
        sleep(1000);
        if (textContains("关闭").exists()) {
            //textContains("关闭").click();
            //log("关闭领喵币中心");
            sleep(500);
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
        if (text("签到").exists()) {
            text("签到").findOne().click();
        }
        var a = click_button("去浏览");
        var b = click_button("去逛逛");
        var c = click_button("去参与");
        var d = click_button("去观看");
        if (a == -1 && b == -1 && c == -1 && d == -1) {
            log("结束");
            sleep(1000);
            //console.hide();
            break;
        }
    }
}

log("准备开始逛店铺");

// 逛店铺
if (textContains("关闭").exists()) {
    textContains("关闭").click();
    log("关闭领喵币中心");
    sleep(2000);
} else {
    to618();
}

sleep(1000);
text("打开图鉴").findOne().click();
sleep(1000);

//console.show();
taskList.forEach(task => {
    while (!text(task + "号车厢").exists()) {
        swipe(578, 1618, 588, 777, 1000);
        sleep(2000);

    }
    if (text(task + "号车厢").exists()) {
        log("做" + task + "号车厢任务");
        var a = text(task + "号车厢").findOne();
        a.click();
        sleep(3000);
        if (desc("签到").exists()) {
            log("签到");
            var b = desc("签到").findOnce().bounds();
            click(b.centerX(), b.centerY());
            sleep(1000);
        }

        var i = 0;
        while (1) {
            if (descContains("去浏览").exists()) {
                log("找到去浏览");
                var c = descContains("去浏览").findOne().bounds();
                click(c.centerX(), c.centerY());
                log("点击");
                sleep(3000);
                if (descContains("浏览店铺").exists()) {
                    descContains("完成").findOne(25000);
                } else if (id("taolive_input").exists()) {
                    back();

                    //click(device.width/2,device.height-100);
                    sleep(1000);
                } else {
                    sleep(1000);
                }
                log("返回");
                back();
                sleep(1000);
            } else {
                back();
                sleep(2000);
                break;
            }
        }

    }
});

log("任务已全部完成，如未完成请关闭淘宝后台重新运行");
