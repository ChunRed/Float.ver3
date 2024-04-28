let socket;
socket = io.connect("http://192.168.0.126:3000");


// set pipeline time
var timestate_1 = 4500; //出現資訊 -> 計算關鍵字 的時間
var timestate_2 = timestate_1 + 1500; //計算關鍵字 -> 計算資訊位元
var timestate_3 = timestate_2 + 4500; //計算資訊位元 -> 計算資訊重量
var timestate_4 = timestate_3 + 3500; //計算資訊重量 -> 完成
var timestate_5 = timestate_4 + 4500; //計算資訊重量 -> 完成
var timestate_6 = timestate_5 + 5000; //計算資訊重量 -> 完成
var timestate_all = timestate_6 + 7000;//每則貼文之間的間隔時間


let message = new bootstrap.Modal(document.getElementById('MessageModal'));
let loading_message = new bootstrap.Modal(document.getElementById('LoadingMessageModal'));
//loading_message.toggle();

setInterval(function () {
    socket.emit("message");
    document.querySelector('.State').innerHTML = "資訊："
}, timestate_all);



socket.on("message", function (MSG) {
    document.getElementById("image").style.visibility = "visible";
    document.getElementById("time").style.visibility = "visible";
    document.getElementById("foot").style.visibility = "visible";
    let msg = document.querySelector('.Message');
    let name = document.querySelector('.Name');

    msg.innerHTML = MSG[1];
    name.innerHTML = MSG[0];
    name.style.fontSize = "20px";

    let keyword1 = MSG[2];
    let keyword2 = MSG[3];
    let keyword3 = MSG[4];

    let msg_baffle = baffle(msg);
    let name_baffle = baffle(name);

    name_baffle.set({
        characters: ["▟", "▚", "█", "▛", "█▙", "▝█", "▜"],
        speed: 80
    });
    msg_baffle.set({
        characters: ["█", "$", "@", "+", "*", "▝", "&"],
        speed: 80
    });

    name_baffle.reveal(2000);
    msg_baffle.reveal(2000);

    //--fade in massage----------------------------------
    message.toggle();

    text = " "+msg.innerHTML;
    let keyword = [keyword1, keyword2, keyword3];
    console.log(keyword);
    let new_text = "";
    let text_array = [];

    console.log(text);

    if (typeof text === 'string') {
        text.split(keyword[0])[0].split(keyword[1]);
        text.split(keyword[0])[1].split(keyword[1]);
    } else {
        // 👇️ this runs
        console.log('The variable does NOT store a string');
    }



    let a = text.split(keyword[0]);
    let a_array = [a[0], keyword[0], a[1]];

    let b_array = [];
    for (let i = 0; i < a_array.length; i++) {
        if (a_array[i].search(keyword[1]) != -1) {
            let b = a_array[i].split(keyword[1]);
            for (let j = 0; j < b.length; j++) {
                if (j != b.length - 1) {
                    b_array.push(b[j]);
                    b_array.push(keyword[1]);
                }
                else b_array.push(b[j]);
            }
        }
        else {
            b_array.push(a_array[i]);
        }

    }


    let c_array = [];
    for (let i = 0; i < b_array.length; i++) {
        if (b_array[i].search(keyword[2]) != -1) {
            let c = b_array[i].split(keyword[2]);
            for (let j = 0; j < c.length; j++) {
                if (j != c.length - 1) {
                    c_array.push(c[j]);
                    c_array.push(keyword[2]);
                }
                else c_array.push(c[j]);
            }
        }
        else {
            c_array.push(b_array[i]);
        }

    }

    text_array = c_array;
    console.log(text_array);

    //計算關鍵字
    setTimeout(() => {
        document.getElementById("image").style.visibility = "hidden";
        document.getElementById("time").style.visibility = "hidden";
        document.getElementById("foot").style.visibility = "hidden";
        document.querySelector('.State').innerHTML = "計算關鍵字...";

        new_text = "";
        for (let i = 0; i < text_array.length; i++) {
            if (text_array[i] == keyword[0] || text_array[i] == keyword[1] || text_array[i] == keyword[2]) {
                new_text += text_array[i];
            }
            else {
                for (let j = 0; j < text_array[i].length; j++) {
                    new_text += "口";
                }
            }
        }
        msg.innerHTML = new_text;

        msg_baffle = baffle(document.querySelector('.Message'));
        msg_baffle.set({
            characters: ["〇", "運", "算"],
            speed: 50
        });
        msg_baffle.reveal(1000);

        name.innerHTML = "提取關鍵字";
        name.style.fontSize = "40px";
        name_baffle = baffle(name);
        name_baffle.set({
            characters: ["運", "作", "中", "。"],
            speed: 50
        });
        name_baffle.reveal(1000);

    }, timestate_1)

    //特寫關鍵字
    setTimeout(() => {
        new_text = "";
        let show_keyword = setInterval((() => {
            new_text = "";
            for (let i = 0; i < text_array.length; i++) {
                if (text_array[i] == keyword[0] || text_array[i] == keyword[1] || text_array[i] == keyword[2]) {
                    new_text += "<span style=\"color: white; background-color: black\">" + text_array[i] + "</span>"
                }
                else {

                    for (let j = 0; j < text_array[i].length; j++) {
                        let flag = Math.floor(Math.random() * 7);
                        switch (flag) {
                            case 0:
                                new_text += "<span style=\"background-color:black\">口</span>";
                                break;
                            case 1:
                                new_text += "<span style=\"background-color:white;color:white\">＠</span>";
                                break;
                            case 2:
                                new_text += "<span style=\"background-color:rgb(4, 255, 253)\">" + text_array[i][i] + "</span>";
                                break;
                            case 3:
                                new_text += "<span style=\"background-color:rgb(255,99,115);color:white\">口</span>";
                                break;
                            case 4:
                                new_text += "<span style=\"background-color:black\">口</span>";
                                break;
                            case 5:
                                new_text += "<span style=\"background-color:black\">口</span>";
                                break;
                            case 6:
                                new_text += "<span style=\"background-color:black\">口</span>";
                                break;
                        }
                    }
                }
            }
            msg.innerHTML = new_text;
        }), 50);

        setTimeout(() => {
            clearInterval(show_keyword);
            new_text = "";
            for (let i = 0; i < text_array.length; i++) {
                if (text_array[i] == keyword[0] || text_array[i] == keyword[1] || text_array[i] == keyword[2]) {
                    new_text += "<span style=\"color: white; background-color: black\">" + text_array[i] + "</span>"
                }
                else {

                    for (let j = 0; j < text_array[i].length; j++) {
                        let flag = Math.floor(Math.random() * 2);
                        switch (flag) {
                            case 0:
                                new_text += "<span style=\"background-color:black\">口</span>";
                                break;
                            case 1:
                                new_text += "<span style=\"background-color:white;color:white\">口</span>";
                                break;
                        }
                    }
                }
            }
            msg.innerHTML = new_text;
        }, 1000)

    }, timestate_2)

    //計算資訊位元
    setTimeout(() => {
        document.querySelector('.State').innerHTML = "計算資訊位元...";

        show_bits = setInterval((() => {
            new_text = "";
            for (let i = 0; i < text_array.length; i++) {
                if (text_array[i] == keyword[0] || text_array[i] == keyword[1] || text_array[i] == keyword[2]) {
                    new_text += "<span style=\"color: white; background-color: black\">" + text_array[i] + "</span>"
                }
                else {

                    for (let j = 0; j < text_array[i].length; j++) {
                        let flag = Math.floor(Math.random() * 4);
                        switch (flag) {
                            case 0:
                                new_text += "<span style=\"background-color:rgb(255,99,115); color:rgb(255,99,115); \">口</span>";
                                break;
                            case 1:
                                new_text += "<span style=\"background-color:rgb(255,99,115); color:rgb(255,99,115); \">口</span>";
                                break;
                            case 2:
                                new_text += "<span style=\"background-color:black; color:black; \">口</span>";
                                break;
                            case 3:
                                new_text += "<span style=\"color:white; \">口</span>";
                                break;
                        }
                    }
                }
            }
            msg.innerHTML = new_text;
        }), 50);


        setTimeout(() => {
            clearInterval(clearInterval(show_bits));
            new_text = "";
            for (let i = 0; i < text_array.length; i++) {
                if (text_array[i] == keyword[0] || text_array[i] == keyword[1] || text_array[i] == keyword[2]) {
                    new_text += "<span style=\"color: black; \">" + text_array[i] + "</span>"
                }
                else {
                    for (let j = 0; j < text_array[i].length; j++) {
                        new_text += "<span style=\"color:white\">口</span>";
                    }
                }
            }
            msg.innerHTML = new_text;

        }, 1000)


        name.innerHTML = "刪除非關鍵字位元";
        name.style.fontSize = "40px";
        name_baffle = baffle(name);
        name_baffle.set({
            characters: ["運", "作", "中", "。"],
            speed: 50
        });
        name_baffle.reveal(1000);


    }, timestate_3)

    //顯示資訊位元
    setTimeout(() => {
        document.querySelector('.State').innerHTML = "資訊位元："

        new_text = "";
        for (let i = 0; i < text_array.length; i++) {
            if (text_array[i] == keyword[0] || text_array[i] == keyword[1] || text_array[i] == keyword[2]) {
                new_text += "<span style=\"color: black;\">" + text_array[i] + "</span>"
            }
            else {
                for (let j = 0; j < text_array[i].length; j++) {
                    new_text += "<span style=\"color: white\">口</span>";
                }
            }
        }
        msg.innerHTML = new_text;

        name.innerHTML = "已刪除"+ (0.29 * Math.floor(Math.random() * 9999)) +" 位元";
        name.style.fontSize = "40px";
        name_baffle = baffle(name);
        name_baffle.set({
            characters: ["運", "作", "中", "。"],
            speed: 50
        });
        name_baffle.reveal(1000);

    }, timestate_4)

    //計算資訊重量
    setTimeout(() => {
        document.querySelector('.State').innerHTML = "計算資訊重量...";

        show_bits = setInterval((() => {
            new_text = "";
            for (let i = 0; i < text_array.length; i++) {
                if (text_array[i] == keyword[0] || text_array[i] == keyword[1] || text_array[i] == keyword[2]) {
                    new_text += "<span  style=\"color: black;\">" + text_array[i] + "</span>"
                }
                else {

                    for (let j = 0; j < text_array[i].length; j++) {
                        let flag = Math.floor(Math.random() * 3);
                        switch (flag) {
                            case 0:
                                new_text += "<span style=\"color:white\">口</span>";
                                break;
                            case 1:
                                new_text += "<span style=\"color:white;\">口</span>";
                                break;
                            case 2:
                                new_text += "<span style=\"background-color:black; color:black; \">口</span>";
                                break;
                        }
                    }
                }
            }
            msg.innerHTML = new_text;
        }), 50);

        setTimeout(() => {
            clearInterval(clearInterval(show_bits));
            new_text = "";
            for (let i = 0; i < text_array.length; i++) {
                if (text_array[i] == keyword[0] || text_array[i] == keyword[1] || text_array[i] == keyword[2]) {
                    new_text += "<span style=\"color: black;\">" + text_array[i] + "</span>"
                }
                else {
                    for (let j = 0; j < text_array[i].length; j++) {
                        new_text += "<span style=\"color:white\">口</span>";
                    }
                }
            }
            msg.innerHTML = new_text;

        }, 2000)

        name.innerHTML = "運算中...";
        name.style.fontSize = "40px"
        loading_message.toggle();

    }, timestate_5)


    setTimeout(() => {
        name.innerHTML = "已刪除：0.00000000000000000000000000000000000"+ Math.floor(Math.random() * 9999) +" 克";
        name.style.fontSize = "40px";
        name_baffle = baffle(name);
        name_baffle.set({
            characters: ["運", "作", "中", "。"],
            speed: 50
        });
        name_baffle.reveal(1000);
        loading_message.toggle();
    }, timestate_6);


    //--fade out massage---------------------------------
    setTimeout(() => {
        document.querySelector('.State').innerHTML = "完成";
        message.toggle();
    }, timestate_6 + 5000)
});
