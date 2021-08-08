var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}
var maxradius = 40;
var minradius = 10;

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

})

window.addEventListener('resize', function (event) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    init();

})

function Circle(x, y, dx, dy, radius) {

    var color = "#" + ((1 << 24) * Math.random() | 0).toString(16);


    this.draw = function () {
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, false);

        c.fillStyle = color;
        c.fill();
    }
    this.update = function () {

        if (x + radius > innerWidth || x < radius) {
            dx = -dx;
        }
        if (y + radius > innerHeight || y < radius) {
            dy = -dy;
        }


        if (mouse.x - x < 100 && mouse.x - x > -100 && mouse.y - y < 100 && mouse.y - y > -100) {
            if (radius < maxradius) {

                radius += 1.5;
            }
        } else if (radius > minradius) {
            radius -= 1.5;
        }

        x += dx;
        y += dy;
        this.draw();
    }
}


var circlearray = [];

function init() {
    circlearray = [];
    for (var i = 0; i < 20; i++) {

        var radius = minradius;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dy = (Math.random() - 0.5) * 4;
        var dx = (Math.random() - 0.5) * 4;
        circlearray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {


    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);


    for (var i = 0; i < circlearray.length; i++) {
        circlearray[i].update();
    }

}
animate();
init();

(function () {
    var script = document.createElement('script');
    script.onload = function () {
        var stats = new Stats();
        document.body.appendChild(stats.dom);
        requestAnimationFrame(function loop() {
            stats.update();
            requestAnimationFrame(loop)
        });
    };
    script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
    document.head.appendChild(script);
})();




