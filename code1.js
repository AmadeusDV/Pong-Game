// Código que "criará" o espaço onde as coisas acontecerão 

var cnv = document.getElementById("cnv");
var ctx = cnv.getContext("2d");
ctx.fillStyle="#a0a0a0";
ctx.fillRect(0, 0, 1300, 700);
	
// Código dos Objetos

var buttons = {
	s: 83,
	w: 87,
	baixo: 40,
	cima: 38
}

var player = {
	x: 100,
	y: 200,
	w: 5,
	h: 90,
	vy: 10
}

var enemy = {
	x: 1195,
	y: 500,
	w: 5,
	h: 90,
	vy: 10
}

var ballin = {
	X: cnv.width/2,
	Y: cnv.height/2,
	r: 5,
	t: 0,
	vx: 10,
	vy: 10,
	dx: 5,
    dy: 5
}

// Código do desenho das barras

function drawRectangle(canvas, geo){
	canvas.beginPath();
	canvas.rect(geo.x, geo.y, geo.w, geo.h); // ctx.rect(x,y,w,h)
	canvas.strokeStyle="black";
	canvas.lineWidth=2;
	canvas.stroke();
}

// Código do desenho da bolinha

function drawBall(canvas, bola){
	canvas.beginPath();
	canvas.arc(bola.X, bola.Y, bola.r, 0, 2*Math.PI); //ctx.arc(x,y,r,ain,afn,ahor) - ain e afn angulos inicial e final - ahor = true arco desenhado no sentido anti-horário e false no sentido horário.
	canvas.fillStyle = "black"; //ctx.fillstyle cor de preenchimento
	canvas.fill(); // ctx.fill desenho com preenchimento
}

// Código com a função de limpar a tela

function cleanTela(){
	ctx.clearRect(0, 0, 1300, 700);
	ctx.fillStyle="#a0a0a0";
	ctx.fillRect(0, 0, 1300, 700);
}

// Código com o objetivo de animar a bolinha, além de ter as interações com as barras, sistema de colisão,

function Motion() {
    ballin.X += ballin.dx;
    ballin.Y += ballin.dy;

    if(ballin.Y + ballin.r > cnv.height || ballin.Y - ballin.r < 0) {
        ballin.dy *= -1;
    }

    if (
        ballin.X - ballin.r < player.x + player.w &&
        ballin.Y > player.y &&
        ballin.Y < player.y + player.h
    ) {
        ballin.dx *= -1;
    }

    if (
        ballin.X - ballin.r < enemy.x + enemy.w &&
        ballin.Y > enemy.y &&
        ballin.Y < enemy.y + enemy.h
    ) {
        ballin.dx *= -1;
    }

    if(ballin.X + ballin.r > player.w) {
        resetBall();
    }

    cleanTela();
    drawRectangle(ctx, player);
    drawRectangle(ctx, enemy);
    drawBall(ctx, ballin);

    requestAnimationFrame(Motion);
}

// Código que reiniciará a posição da bolinha

function resetBall() {
    ballin.X = cnv.width/2;
    ballin.Y = cnv.height/2;
    ballin.dx *= -1;
}

// Código que startará o jogo

function start() {
	EhoMexeMexe = setInterval('Motion()', 20)
}

// Código que fará o jogo parar

function stop() {
	clearInterval(EhoMexeMexe);
	EhoMexeMexe = null;
} 

// Código que fará o jogo reiniciar (Talvez não seja necessário)

function restart () {	
	reload()
}

drawRectangle(ctx, player);

drawRectangle(ctx, enemy);

drawBall(ctx, ballin);

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Código que fará ser possível mover as barras com botões do teclado.

document.addEventListener(
	"keydown", 
	function (event) {
		// Atualizar objetos
		if(event.keyCode == buttons.w){
			player.y = player.y - player.vy;
		}
		else if(event.keyCode == buttons.s){
			player.y = player.y + player.vy
		}
		else if(event.keyCode == buttons.cima){
			enemy.y = enemy.y - enemy.vy
		}
		else if(event.keyCode == buttons.baixo){
			enemy.y = enemy.y + enemy.vy
		}
		
// Atualizar Tela
		
		cleanTela();
		drawRectangle(ctx, player);
		drawRectangle(ctx, enemy);
		drawBall(ctx, ballin);
	}
)

/*function anima() {
	var y = 410 + vy*t
	var x = 920 + vx*t
	var bol = document.getElementById("")
	bol.style.top = y + "px";
	bol.style.left = x + "px";
	t = t + dt	
}*/
