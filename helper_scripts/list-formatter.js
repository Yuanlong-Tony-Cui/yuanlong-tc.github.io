function formatter(str) {
    // Get names:
    let list_items = str.split(",");
    for (i in list_items) {
        list_items[i] = list_items[i].trim();
    }
    console.log(list_items);

    // Generate new string:
    let new_string = "";
    let number = 0;
    for (let i=0; i<list_items.length; i++) {
        new_string = `${new_string}${i+1}. 《${list_items[i]}》`;
        if (i !== list_items.length-1) {
            new_string += ' ';
        }
    }
    console.log(new_string);
}

formatter("Fate Stay Night,野良神,天气之子,为美好的世界献上祝福,卫宫家今天的饭, 埃罗芒阿老师, DARLING IN THE FRANXX, 可塑性记忆, ReLIFE, 无彩限的怪灵世界, 缘之空, 昨日之歌, 人渣的本愿, 辉夜大小姐想让我告白(第二季), 未来日记, 凉宫春日的忧郁,凉宫春日的消失,轻音少女,未闻花名,只有我不存在的城市,浪客剑心,朝花夕誓,东京残响,公主连结,知晓天空之蓝的人啊");