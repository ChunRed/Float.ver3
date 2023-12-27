let socket;
socket = io.connect("http://192.168.0.126:3000");


let  message = new bootstrap.Modal(document.getElementById('MessageModal'));


setInterval(function () {
    socket.emit("message");
    document.querySelector('.State').innerHTML = "資訊："
}, 10000);



socket.on("message", function (MSG) {
    
    let msg = document.querySelector('.Message');
    let name = document.querySelector('.Name');
    
    msg.innerHTML = MSG[1];
    name.innerHTML = MSG[0];

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

    text = msg.innerHTML;
    let keyword = "資訊";
    let new_text = "";
    var myObj = { colour : "blue" };

    for(let i=0; i<text.length; i++){
        if(i < text.search(keyword) || i >  text.search(keyword)+keyword.length){   
            if(text[i] == '，' || text[i] == '。'|| text[i] == '「'|| text[i] == '」'){
                new_text += text[i];
            }
            else new_text += '口';
        }
        else{
            new_text += text[i];
        }
    }

    setTimeout(() => {
        document.querySelector('.State').innerHTML = "運算中..."
        msg.innerHTML = new_text;
        msg_baffle = baffle(document.querySelector('.Message'));
        msg_baffle.set({
            characters: ["〇", "運","算"],
            speed: 50
        });
        msg_baffle.reveal(1000);
    }, 4500)
    

//--fade out massage---------------------------------
    setTimeout(() => {
        message.toggle();
    }, 8000)
});



// function OpenMessage(){
    
//     let msg = document.querySelector('.Message');
    
//     msg.innerHTML = "現實世界中的行為與物件正不斷轉換成為大量的「資訊」， 當人們試圖尋找能證明「資訊」存在的方法時，也開始嘗試 以科學方法計算出「資訊重量」。";
//     let msg_baffle = baffle(document.querySelector('.Message'));
//     let name_baffle = baffle(document.querySelector('.Name'));

//     name_baffle.set({
//         characters: ["▟", "▚", "█", "▛", "█▙", "▝█", "▜"],
//         speed: 80
//     });
//     msg_baffle.set({
//         characters: ["█", "$", "@", "+", "*", "▝", "&"],
//         speed: 80
//     });

//     name_baffle.reveal(2000);
//     msg_baffle.reveal(2000);

// //--fade in massage----------------------------------
//     message.toggle();

//     text = msg.innerHTML;
//     let keyword = "資訊";
//     let new_text = "";

//     for(let i=0; i<text.length; i++){
//         if(i < text.search(keyword) || i >  text.search(keyword)+keyword.length){   
//             if(text[i] == '，' || text[i] == '。'|| text[i] == '「'|| text[i] == '」'){
//                 new_text += text[i];
//             }
//             else new_text += '口';
//         }
//         else{
//             new_text += text[i];
//         }
//     }

//     setTimeout(() => {
//         msg.innerHTML = new_text;
//         msg_baffle = baffle(document.querySelector('.Message'));
//         msg_baffle.set({
//             characters: ["☐","☒"],
//             speed: 50
//         });
//         msg_baffle.reveal(1000);
//     }, 4500)
    

// //--fade out massage---------------------------------
//     setTimeout(() => {
//         message.toggle();
//     }, 8000)

// }