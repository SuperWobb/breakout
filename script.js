//Constroi mapa

const grid = document.querySelector('.grid');
const pontuacaoDisplay = document.querySelector('#score');
let pontuacao = 0;
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;

class Block
{
    constructor(xAxis, yAxis)
    {
        this.bottomLeft = [xAxis,yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
];

function addBlock()
{
    for(let i=0;i<blocks.length;i++)
    {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}
addBlock();

//Fim Constroi mapa

//Adiciona Jogador
const inicioJogador = [230,10];
let posicaoAtual = inicioJogador;
const jogador = document.createElement('div');
jogador.classList.add('jogador');
grid.appendChild(jogador);

function desenhaJogador()
{
    jogador.style.left = posicaoAtual[0] + 'px';
    jogador.style.bottom = posicaoAtual[1] + 'px';
}

desenhaJogador();

function mover(e)
{
    switch(e.key)
    {
        case 'ArrowLeft':
            if(posicaoAtual[0] > 0)
            {
                posicaoAtual[0] -= 10;
                desenhaJogador();
            }
            break;
        case 'ArrowRight':
            if(posicaoAtual[0] < boardWidth - blockWidth)
            {
                posicaoAtual[0] += 10;
                desenhaJogador();
            }
            break;
    }
}

document.addEventListener('keydown', mover);

//fim adiciona jogador

//adiciona bola
const bolaInicio = [270, 40];
const bolaDiametro = 20;
let xDirecao = 2;
let yDirecao = 2;
let bolaPosicao = bolaInicio;
const bola = document.createElement('div');
bola.classList.add('bola');
grid.appendChild(bola);
desenhaBola();
let timerId;

function desenhaBola()
{
    bola.style.left = bolaPosicao[0] + 'px';
    bola.style.bottom = bolaPosicao[1] + 'px';
}

function moveBola()
{
    bolaPosicao[0] += xDirecao;
    bolaPosicao[1] += yDirecao;
    desenhaBola();
    checaColisao();
}

timerId = setInterval(moveBola, 30);

function checaColisao()
{
    //jogador
    if(bolaPosicao[0] > posicaoAtual[0] && bolaPosicao[0] < posicaoAtual[0] + blockWidth &&
        bolaPosicao[1] > posicaoAtual[1] && bolaPosicao[1] < posicaoAtual[1] + blockHeight)
        {
            mudaDirecao();
        }

    //blocos
    for(let i=0; i<blocks.length;i++)
    {
        if(bolaPosicao[0] > blocks[i].bottomLeft[0] && bolaPosicao[0] < blocks[i].bottomRight[0] &&
            bolaPosicao[1] + bolaDiametro > blocks[i].bottomLeft[1] && bolaPosicao[1] < blocks[i].topLeft[1])
            {
                const todosBlocos = Array.from(document.querySelectorAll('.block'));
                todosBlocos[i].classList.remove('block');
                blocks.splice(i,1);
                mudaDirecao();   
                pontuacao++;
                pontuacaoDisplay.textContent = pontuacao;
                if(blocks.length === 0)
                {
                    alert('você venceu!');
                    clearInterval(timerId);
                    document.removeEventListener('keydown', mover);
                }
            }
    }

    //paredes
    if(bolaPosicao[0] >= boardWidth-bolaDiametro ||
        bolaPosicao[1] >= boardHeight-bolaDiametro ||
        bolaPosicao[0] <= 0)
    {
        mudaDirecao();
    }
    if(bolaPosicao[1] < 0)
    {
        clearInterval(timerId);
        alert('você perdeu! sua pontuação final foi: ' + pontuacao);
        document.removeEventListener('keydown', mover);
    }
}

function mudaDirecao()
{
    if(xDirecao === 2 && yDirecao === 2)
    {
        yDirecao = -2;
        return;
    }
    if(xDirecao === 2 && yDirecao === -2)
    {
        xDirecao = -2;
        return;
    }
    if(xDirecao === -2 && yDirecao === -2)
    {
        yDirecao = 2;
        return;
    }
    if(xDirecao === -2 && yDirecao === 2)
    {
        xDirecao = 2;
        return;
    }
}