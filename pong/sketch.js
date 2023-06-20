// var da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

// var velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// var raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//var do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

// var colisão
let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

// tamanho da quadra
function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

//desenhando o jogo
function draw() {
  background(0);//cor de fundo da quadra 
  mostraBolinha(); //mostrar bolinha
  movimentoBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete); //mostrar raquete
  movimentoMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

// bolinha
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro); 
}

// movimento da bolinha
function movimentoBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

// verificação de colisão da bolinha na borda
function verificaColisaoBorda(){
  if (xBolinha + raio > width || 
    xBolinha < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
    yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

//raquete
function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentoMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + raqueteComprimento 
  && yBolinha - raio < yRaquete + raqueteAltura 
  && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
  
function verificaColisaoRaquete(x, y) {
    colidiu = 
      collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
      raquetada.play();
    }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color (219,112,147));
  rect(200, 10, 40, 20)
  fill(255);
  text(meusPontos, 220, 26);
  fill(color (219,112,147));
  rect(400, 10, 40, 20)
  fill(255);
  text(pontosOponente, 420, 26)
}

function marcaPonto(){
  if (xBolinha > 600){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 0){
    pontosOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}



