let turned = 1;
let page = 0;


function turn(chosen) {
    if (chosen !== page) {
        turned *= -1;
        const cover = document.getElementById("cover");
        if (cover.classList.contains("cover2")) {
            cover.classList.remove("cover2");
        } else {
            cover.classList.add("cover2")
        }
        for (let thing of cover.children) {
            if (thing.id !== "page" + page.toString()) {
                thing.classList.remove("pg1");
                thing.classList.remove("pg-1");
                thing.classList.add("hidden");
            }
            if (thing.id === "page" + chosen.toString()) {
                thing.classList.remove("hidden")
                thing.classList.add(`pg${turned}`)
            }
        }
        page = chosen;
    }
}

function focusing(obj) {
    document.getElementById("mindmap").style.width = `100vw`;
    document.getElementById("mindmap").style.height = `100vh`;
    document.getElementById("mindmap").style.left = `0`;
    document.getElementById("mindmap").style.top = `0`;
    document.getElementById("mindmap").style.fontSize = `600px`;
    if (obj.id === "Xbtn") {
        obj = document.getElementById("main").children[0];
    }
    let distance = counting(obj);
    document.getElementById("mindmap").style.width = `${100 * (Math.pow(3, distance))}%`;
    document.getElementById("mindmap").style.height = `${100 * (Math.pow(3, distance))}%`;
    document.getElementById("rec").style.width = `${100 * (Math.pow(3, distance))}%`;
    document.getElementById("rec").style.height = `${100 * (Math.pow(3, distance))}%`;
    document.getElementById("mindmap").style.left = `-${(obj.offsetLeft + obj.offsetWidth / 2 - screen.width / 2)}px`;
    document.getElementById("mindmap").style.top = `-${(obj.offsetTop + obj.offsetHeight / 2 - screen.height / 2.3)}px`;
    document.getElementById("rec").style.left = `-${(obj.offsetLeft + obj.offsetWidth / 2 - screen.width / 2)}px`;
    document.getElementById("rec").style.top = `calc(${(obj.offsetTop * -1 + obj.offsetHeight / -2 - screen.height / -2.3)}px - ${100 * Math.pow(3, distance)}vh)`;
    document.getElementById("mindmap").style.fontSize = `${600 * (Math.pow(3, distance))}px`;
    makeLines()
}

function counting(obj) {
    let distance = 0;
    if (obj.parentNode.id === "main") {
        return distance;
    } else {
        return 1 + counting(obj.parentNode);
    }
}

function makeLines() {
    document.getElementById("rec").innerHTML = "";
    for (let x of document.getElementsByClassName("square")) {
        x.addEventListener("click", function () { focusing(this) });
    }
    for (let sqr of document.getElementsByClassName("square")) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute("x1", sqr.offsetLeft + sqr.offsetWidth / 2);
        line.setAttribute("x2", sqr.parentNode.parentNode.children[0].offsetLeft + sqr.parentNode.parentNode.children[0].offsetWidth / 2);
        line.setAttribute("y1", sqr.offsetTop + sqr.offsetHeight / 2);
        line.setAttribute("y2", sqr.parentNode.parentNode.children[0].offsetTop + sqr.parentNode.parentNode.children[0].offsetHeight / 2);
        line.classList.add("linha");
        document.getElementById("rec").appendChild(line);
    }
}