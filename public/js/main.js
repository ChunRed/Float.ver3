let socket;
socket = io.connect("http://192.168.0.126:3000");
socket.emit("web_message");


let msg = document.getElementById("element");
let time = "";
let text = "";
let keyword = [];
let new_text = "";
let text_array = [];
let hide_text = 0;

let read_delayTime = 5000;
let hide_delayTime = 100;



socket.on("web_message", function (message) {

// init global value
    msg = document.getElementById("element");
    time = message[0];
    text = message[1];
    keyword = [message[2], message[3], message[4], message[5]];
    document.querySelector(':root').style.setProperty('--mask_color', 'rgb(0,0,0)');
    new_text = "";
    text_array = [];
    hide_text = 0;

// show message (use typed.js)

    //date
    var date = new Typed('#date', {
        strings: [time],
        typeSpeed: 50,
        onComplete: (self) => {
            date.destroy();
            document.getElementById("date").innerHTML = time;
        },
    });

    //msg
    var typed = new Typed('#element', {
        strings: [text],
        startDelay: 1000,
        typeSpeed: 20,
        backDelay: 100,
        onComplete: (self) => {
            console.log("animation done");
            typed.destroy();
            msg.innerHTML = text;
    
    
            //delay time to read message.
            var timeout_id = setTimeout((() => {
                split_msg();
            }), read_delayTime);
        },
    });
});



function split_msg() {

    if (typeof text === 'string') {
        text.split(keyword[0])[0].split(keyword[1]);
        text.split(keyword[0])[1].split(keyword[1]);
    } else {
        console.log('The variable does NOT store a string');
    }

    let a_array = [];
    let a = text.split(keyword[0]);
    for(let j = 0; j < a.length; j++){
        if (j != a.length - 1) {
            a_array.push(a[j]);
            a_array.push(keyword[0]);
        }
        else a_array.push(a[j]);
    }
    



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

    let d_array = [];
    for (let i = 0; i < c_array.length; i++) {
        if (c_array[i].search(keyword[3]) != -1) {
            let d = c_array[i].split(keyword[3]);
            for (let j = 0; j < d.length; j++) {
                if (j != d.length - 1) {
                    d_array.push(d[j]);
                    d_array.push(keyword[3]);
                }
                else d_array.push(d[j]);
            }
        }
        else {
            d_array.push(c_array[i]);
        }

    }

    text_array = d_array;
    console.log(text_array);
    hide_message();
}


function hide_message() {
    let index = 0;
    let IntervalID = setInterval((() => {
        new_text="";

        if(index < text_array.length){
            if (text_array[index] == keyword[0] || text_array[index] == keyword[1] || text_array[index] == keyword[2] || text_array[index] == keyword[3]) {
                
            }
            else {
                hide_text += text_array[index].length;
                let mask = "<span class=\"mask\">"+text_array[index] +"</span>";
                text_array[index] = mask;
            }
            
            for(let i=0; i < text_array.length; i++){
                new_text += text_array[i];
            }
            
            msg.innerHTML = new_text;
            index ++;
        }

        else {
            clearInterval(IntervalID);
            hideText_fadeout();
        }
    }), hide_delayTime);
    
}

function hideText_fadeout(){
    let r = document.querySelector(':root');
    let value = 0;

    let IntervalID = setInterval((() => {
        if(value < 255){
            r.style.setProperty('--mask_color', 'rgb('+ value +','+ value +',' + value +')');
            value ++
        }
        else{
            r.style.setProperty('--mask_color', 'rgb(255,255,255)');
            clearInterval(IntervalID);
            reset();
        }
    }), 50);
}

function reset(){
    //date
    var date = new Typed('#date', {
        startDelay: 10000,
        strings: ["<br>"],
        typeSpeed: 80,
        backSpeed: 0,
        fadeOut: true,
        onComplete: (self) => {
            date.destroy();
            document.getElementById("date").innerHTML = "<br>";
        },
    });

    //msg
    var typed = new Typed('#element', {
        strings: ["已刪除：<br>0.000000000000000000000000000000000" + 319*hide_text + "克",""],
        startDelay: 5000,
        typeSpeed: 20,
        backSpeed: 0,
        backDelay: 5000,
        onComplete: (self) => {
            typed.destroy();
            msg.innerHTML = "";

            var timeout_id = setTimeout((() => {
                socket.emit("web_message");
            }), 5000);
        },
    });
}
