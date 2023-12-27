let Canvas;
let rectangles = [];
let Canvas_Parent = document.getElementById("msg_canvas");
let Height;

let index = 9

function setup() {

    for (let i = 0; i < index; i++) {
        rectangles[i] = new Rect(i);
    }

    Canvas = createCanvas(windowWidth, windowHeight);
    Canvas.style("display", "block");
    Canvas.style("display", "block");


}

function draw() {
    background(255);
    for (let i = 0; i < index; i++) {
        rectangles[i].update();
        rectangles[i].display();
    }


}


class Rect {

    constructor(id) {
        this.id = id;
        this.opacity = 0;
        this.rectangle = createElement("div");
        this.rectangle.parent(Canvas_Parent);
        this.rectangle.style("position", "absolute");
        this.rectangle.style("margin-top", "1%");
        this.rectangle.style("left", "0px");
        this.rectangle.size(0, 6);
        this.rectangle.style("background-color", "rgb(0,0,0)");
    }

    update() {
        
        this.rectangle.style("margin-top", Height * (this.id + 2) + "px");
        this.rectangle.style("opacity", this.opacity);

        if (document.querySelector('.State').innerHTML == "運算中...") {
            this.rectangle.style("left", "0px");
            if (Height * this.id >= document.querySelector('.Message').offsetHeight) {
                let w_value = lerp(this.rectangle.width, 0, 0.05);
                this.opacity = 0;
                this.rectangle.style("width", w_value + "px");
            }
            else {
                let w_value = lerp(this.rectangle.width, document.querySelector('.State').offsetWidth, (this.id*0.01)+0.03);
                this.opacity = 255;
                this.rectangle.style("width", w_value + "px");
                //console.log(w_value);
            }
            setTimeout(() => {
                document.querySelector('.State').innerHTML = "完成";
            }, 1500)
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
    // Canvas.style("height", Height +
    //     "px");
    // console.log(Height +" : "+ document.querySelector('.Message').offsetHeight);
}, 100);