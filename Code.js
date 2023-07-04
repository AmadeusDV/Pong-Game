// Código que "criará" o espaço onde as coisas acontecerão 

var cnv = document.getElementById("cnv");
var ctx = cnv.getContext("2d");
ctx.fillStyle="#a0a0a0";
var width = 1300;
var height = 700;
ctx.fillRect(0, 0, width, height);

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
	X: 652.5,
	Y: 350,
	r: 5,
	t: 0,
	vx: 5,
	vy: 5,
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
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle="#a0a0a0";
	ctx.fillRect(0, 0, width, height);
}

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
	}
)

// função que irá animar a bolinha, com o objetivo de ter uma direção aleatória ao iniciar o programa
// Utilizarei o comando Math.random() ?

function moveBolinha(bol) {
	bol.X += bol.vx;
	bol.Y += bol.vy;
}

function moveBarra(barra) {

}

function handleUserInput(){
	
}

function detectColisionRectangleCircle(rect, circ){

}

function updatePhysics(){
	moveBolinha(ballin);

	moveBarra(player);
	moveBarra(enemy);

	//Detect colission
	if((ballin.X - ballin.r) <= 0 || (ballin.X + ballin.r) >= width){
		ballin.vx *= -1;
	}
	if((ballin.Y - ballin.r) <= 0 || (ballin.Y + ballin.r) >= height){
		ballin.vy *= -1;
	}

	detectColisionRectangleCircle(player, ballin);
	detectColisionRectangleCircle(enemy, ballin);

}

function plot(){
	cleanTela();
	drawRectangle(ctx, player);
	drawRectangle(ctx, enemy);
	drawBall(ctx, ballin);
}

function update(){
	handleUserInput();
	updatePhysics();
	plot();
}

// Timer
var timer = setInterval(update, 16.666);