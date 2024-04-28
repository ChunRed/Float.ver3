let Canvas;
let rectangles = [];
let Canvas_Parent = document.getElementById("msg_canvas");
let loading_bg = document.getElementById("loading_bg");
let Height;
let index = 9;
let loadingCanvas;
let loadingText;
let flag = true;
let state = document.querySelector('.Name');
let tex1 = ["010110100011110101101001101101000111101011010010110100011110101101001011010001111010110100101101000111101011010010110100011110101101001111101001010101100001000001111111010101110101001010100010101010011110101101001111101101001101010010101011101010101101001010101010101010100010000011111111010010101011101001010011111111101101000101001010101001111111110101101000111101011010011010100101010111010101011010010101010101010101000100000111111110100101010110000100000111111101010111010100101010100111111111010110100011110110100011110101101001101010010101011101010101101001010100110100011101001011010001111010110100101101000111101011010010110100011110101101001011010001111010110100101101000111101011010010110100110101101001011010001111010110100101101000111100000100000111111101010111010100101010100111111111010110100011110101101001101010010101011101010101101001010101010101010100010000011111111010010101011000010000011111110101011101010010101010011111111101011010001111010110100110101001010101110101010110100101010011010001111010110110100011110101101001011010001111010110100101101000111101011010", "101001011010001111010110100101101000111101011010010110100011110101101001011010001111010110100101101000111101011010010110100011110101101001111101101001101010010101011101010101101001010101010101010100010000011111111010010101011101001010011111111101101000101001010101001111111110101101000111101011010011010100101010111010101011010010101010101010101000100000111111110100101010110000100000111111101010111010100101010100111111111010110100011110110100011110101101001101010010101011101010101101001010100110100011110101101001011010001111010110100101101000111100000100000111111101010111010100101010100111111111010110100011110101101001101010010101011101010101101001010101010101010100010000011111111010010101011000010000011111110101011101010010101010011111111101011010001111010110100110101001010101110101010110100101010011010001111010110110100011110101101001011010001111010110100101101000111101011010010110100011110101101001101101000111101011010010110100011110101101001011010001111010110100101101000111101011010010110100011110101101001111101001010101100001000001111111010101110101001010100010101010",
    "00100000111111101010111010100101010100111111111010110100011110101101001101010010101011101010101010010110100011110101101001011010001111010110100101101000111101011010010110100011110101101001011010001111010100010000011111111010010111010011111111010010101011000010000011111110101011101010010101010011111111101011010001111010110100110101001010101110101010110100101010011010001111010110100101101000111101011010010110100011110101101001011010001111010110100101101000111101011010010110100011110101101001011010001111010110100110110100011110101101001011010001111010110100101101000111101011010010110100011110101101001011010001111010110100111010010101010101010101001010101001111111110101101000111101011010011010100101010111010101011010010101010101010101000100000111111110100101010110001011000010000011111110101011101010010101010011111111101011010001111010110100110101001010101110101010110100101010101010101010001000001111111101001010101100001000001111111010101110101001010101001111111110101101000111101011010011010100101010111010101011010010101001101000111101010101101001011010001111010"];

function setup() {

    for (let i = 0; i < index; i++) {
        rectangles[i] = new Rect(i);
    }

    Canvas = createCanvas(windowWidth, windowHeight);



}

function draw() {


    if (state.innerHTML == "運算中..." && flag) {
        Canvas.style("visibility", "visible");
        Canvas.style("position", "absolute");
        background(255, 0);
        let bg_value = 1;
        
        let loadingBG = setInterval((() => {
            if(bg_value > 0){
                bg_value -= 0.01;
            }
            else{
                bg_value = 0;
                clearInterval(loadingBG);
            }
            loading_bg.style.backgroundColor = "rgb(0,0,0,"+bg_value+")";
            //console.log(bg_value);
        }), 50);


        loadingCanvas = setInterval((() => {
            let seed = Math.floor(Math.random() * 5);
            switch (seed) {
                case 0:
                    fill(255);
                    break;
                case 1:
                    fill(0);
                    break;
                case 2:
                    fill(0);
                    break;
                case 3:
                    fill(255,99,115);
                    break;
                case 4:
                    fill(0);
                    break;
                case 5:
                    fill(0, 0, 255, 100);
                    break;

            }

            let x = random(-width, width);
            let y = random(0, height);
            rect(x, y, random(1, width), random(1, 100));


        }), 10);


        loadingText = setInterval(function () {
            let loading_text = document.getElementById("loading_text");
            let seed1 = Math.floor(Math.random() * 3);
        
            let new_text = "";
            for (let i = 0; i < tex1[seed1].length; i++) {
                let seed2 = Math.floor(Math.random() * 10);
                switch (seed2) {
                    case 0:
                        new_text += tex1[seed1][i];
                        break;
                    case 1:
                        new_text += "<span style=\" background-color: black \">" + tex1[seed1][i]+tex1[seed1][i]+tex1[seed1][i]+tex1[seed1][i]+tex1[seed1][i]+tex1[seed1][i]+tex1[seed1][i]+tex1[seed1][i]+tex1[seed1][i] + "</span>";
                        break;
                    case 2:
                        new_text += "<span style=\" background-color: black \">" + tex1[seed1][i] + "</span>";
                        break;
                    case 3:
                        new_text += "<span style=\" background-color:  rgb(255,99,115);\">" + tex1[seed1][i] + "</span>";
                        break;
                    case 4:
                        new_text += "<span style=\" background-color: rgb(4, 255, 253) \">" + tex1[seed1][i] + "</span>";
                        break;
                    case 5:
                        new_text += "<span style=\" color: white \">" + tex1[seed1][i] + "</span>";
                        break;
                    default:
                        new_text += "<span style=\" color: white \">" + tex1[seed1][i]+tex1[seed1][i]+tex1[seed1][i] + "</span>";
                        break;
                }
            }
        
            loading_text.innerHTML = new_text;
            loading_text.style.wordWrap = "break-word";
        
        
        }, 80);

        setTimeout(() => {
            document.getElementById("loading_text").innerHTML = "";
            clearInterval(loadingText);
        }, 6000);


        flag = false;
    }


    else if (state.innerHTML != "運算中..." && !flag) {
        Canvas.style("visibility", "hidden");
        Canvas.style("position", "absolute");
        //Canvas.style("z-index", "4");
        background(255, 255);
        clearInterval(loadingCanvas);
        flag = true;
    }



    for (let i = 0; i < index; i++) {
        rectangles[i].update();
        rectangles[i].display();
    }


}


class Rect {

    constructor(id) {
        this.id = id;
        this.opacity = 0;
        this.lineWidth = 0.5;
        this.rectangle = createElement("div");
        this.rectangle.parent(Canvas_Parent);
        this.rectangle.style("position", "absolute");
        this.rectangle.style("left", "0px");
        this.rectangle.size(0, this.lineWidth);
        this.rectangle.style("background-color", "rgb(0,0,0)");

    }

    update() {

        this.rectangle.style("margin-top", ((Height * (this.id + 2)) - (this.lineWidth * 2)) + "px");
        this.rectangle.style("opacity", this.opacity);
        this.rectangle.style("height", this.lineWidth + "vh");



        if (document.querySelector('.State').innerHTML == "計算關鍵字...") {
            this.rectangle.style("background-color", "rgba(" + random(0, 255) + "," + random(0, 255) + ",255 ,255)");
            this.rectangle.style("left", "0px");
            this.rectangle.style("border", "none");
            this.lineWidth = 0.8;

            if (Height * this.id >= document.querySelector('.Message').offsetHeight) {
                let w_value = lerp(this.rectangle.width, 0, 0.05);
                this.opacity = 0;
                this.rectangle.style("width", w_value + "px");
            }
            else {
                let w_value = lerp(this.rectangle.width, document.querySelector('.State').offsetWidth, (this.id * 0.01) + 0.03);
                this.opacity = 255;
                this.rectangle.style("width", w_value + "px");
                //console.log(w_value);
            }
            setTimeout(() => {
                document.querySelector('.State').innerHTML = "完成";
            }, 1500)
        }



        else if (document.querySelector('.State').innerHTML == "計算資訊位元...") {
            this.rectangle.style("background-color", "rgba(0,0,0,1)");
            this.rectangle.style("left", "0px");
            this.rectangle.style("border", "none");
            this.lineWidth = 3.5;
            this.rectangle.html(" " + (this.id + 1) * 12.343213 + "bits");
            this.rectangle.style("color", "rgba(255, 255, 255, 255)");

            if (Height * this.id >= document.querySelector('.Message').offsetHeight) {
                let w_value = lerp(this.rectangle.width, 0, 0.1);
                this.opacity = 0;
                this.rectangle.style("width", w_value + "px");
            }
            else {
                let w_value = lerp(this.rectangle.width, document.querySelector('.State').offsetWidth, (this.id * 0.03) + 0.03);
                this.opacity = 255;
                this.rectangle.style("width", w_value + "px");
                //console.log(w_value);
            }
            setTimeout(() => {
                document.querySelector('.State').innerHTML = "完成";
            }, 1500)
        }



        else if (document.querySelector('.State').innerHTML == "資訊位元：") {
            this.rectangle.style("background-color", "rgba(255,255,255,0)");
            this.rectangle.style("border", "solid");
            this.rectangle.style("border-width", "1px");
            this.rectangle.style("left", "0px");
            this.lineWidth = 2.5;
            this.rectangle.html("");
            this.rectangle.style("color", "rgba(0,0,0, 0.2)");

            if (Height * this.id >= document.querySelector('.Message').offsetHeight) {
                let w_value = lerp(this.rectangle.width, 0, 0.05);
                this.opacity = 0;
                this.rectangle.style("width", w_value + "px");
            }
            else {
                let w_value = lerp(this.rectangle.width, document.querySelector('.State').offsetWidth, (this.id * 0.01) + 0.03);
                this.opacity = 255;
                this.rectangle.style("width", w_value + "px");
                //console.log(w_value);
            }

        }



        else if (document.querySelector('.State').innerHTML == "完成") {
            let w_value = lerp(this.rectangle.width, 0, 0.05);
            let o_value = lerp(this.opacity, 0, 0.1);
            let l_value = lerp(this.rectangle.left, document.querySelector('.State').offsetWidth, 0.05);
            this.rectangle.style("opacity", "255");
            this.rectangle.style("width", w_value + "px");
            this.rectangle.style("left", l_value + "px");
            this.opacity = o_value;
            this.rectangle.style("opacity", this.opacity);

        }

    }


    display() {
        push();

        pop();
    }
}

setInterval(function () {

    Height = document.querySelector('.State').offsetHeight;
}, 100);



