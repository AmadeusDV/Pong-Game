// Jogo Pong não está completo, porém a essência do jogo já está presente.
// Código que construirá o espaço do jogo

var cnv = document.getElementById("cnv");
var ctx = cnv.getContext("2d");
ctx.fillStyle="#a0a0a0";
var width = 1300;
var height = 700;
ctx.fillRect(0, 0, width, height);
var vPaineltxtPontos1;
var vPaineltxtPontos2;
var pontos = 0;
var timer = setInterval(update, (1/60)*1000);

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

var ball = {
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

// Código com a função de começar o programa, após apertar o botão Start.

/*function start(){
	vplayer = document.getElementById("dvplayer");
	venemy = document.getElementById("dvenemy");
	vball = document.getElementById("dvball");
}*/
	vPaineltxtPontos1 = document.getElementById("txtPontos1");
	vPaineltxtPontos2 = document.getElementById("txtPontos2");

// Código com a função de limpar a tela

function cleanTela(){
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle="#a0a0a0";
	ctx.fillRect(0, 0, width, height);
}

//-----------------------------------------------------------------------------------------------------------------------

// função que irá animar a bolinha

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
	moveBolinha(ball);
	moveBarra(player);
	moveBarra(enemy);

	//Detect colision bolinha e paredes
	if(ball.X - ball.r <= 0 || ball.X + ball.r >= width){
		ball.vx *= -1;
	}
	if(ball.Y - ball.r <= 0 || ball.Y + ball.r >= height){
		ball.vy *= -1;
	}

	//Detect colision barras e paredes

	if(player.y + player.h >= height){
		player.y += (player.vy)*-1;
	}
	if(player.y <= 0){
		player.y -= (player.vy)*-1;
	}

	if(enemy.y + enemy.h >= height){
		enemy.y += (enemy.vy)*-1;
	}
	if(enemy.y <= 0){
		enemy.y -= (enemy.vy)*-1;
	}

	//Detect colision bolinha e barras

	if(ball.X <= player.x + player.w && ball.Y + ball.r >= player.y && ball.Y <= player.y + player.h) {
		ball.vy = (ball.Y - player.y + (player.h/2))/16;
		ball.vx *= -1;
	}
	if(ball.X >= enemy.x + enemy.w && ball.Y + ball.r >= enemy.y && ball.Y <= enemy.y + enemy.h) {
		ball.vy = (ball.Y - enemy.y + (enemy.h/2))/16;
		ball.vx *= -1;
	}

	//Detect marcar pontuação

	if(ball.X >= width - 5){
		pontos++;
		vPaineltxtPontos1.value = pontos;
	}
	if(ball.X <= 5){
		pontos++;
		vPaineltxtPontos2.value = pontos;
	}

	detectColisionRectangleCircle(player, ball);
	detectColisionRectangleCircle(enemy, ball);
}

function plot(){
	cleanTela();
	drawRectangle(ctx, player);
	drawRectangle(ctx, enemy);
	drawBall(ctx, ball);
}

function update(){
	handleUserInput();
	updatePhysics();
	plot();
}

// Código que moverá as barras com botões do teclado.

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
