//Debemos crear un contexto para dibujar en el canvas.
const canvas = document.getElementById('game');
const game = canvas.getContext('2d'); //Definimos el eje "x" y "y"

//Variables para el tamaño del canvas
let canvasSize, elementsSize;

//En cuanto la ventana cargue se ejecuta la funcion.
window.addEventListener('load', setCanvasSize);
//Ajustamos el tamaño del canvas cuando el tamaño cambia
window.addEventListener('resize', setCanvasSize);

function setCanvasSize(){
    //En caso de que sea mobile
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8; //El width mide el 80%
    }else{
        canvasSize = window.innerHeight * 0.8; //El height mide el 80%
    }

    //Definimos el atributo de width y height
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    //Los elementos en el canvas miden la decima parte
    //del canvas
    elementsSize = canvasSize / 10;

    //Volvemos a iniciar el juego.
    startGame();
}

//Inicia el juego
function startGame(){
    //Los elementos al ser texto miden la decima parte
    game.font = elementsSize + 'px Verdana';
    //El texto lo alineamos al final
    game.textAlign = 'end';

    // //Imprimimos los elementos de nuestro objeto emojis.
    // //Hay que imprimir 10 elementos
    // for(let i = 1; i <= 10; i++){
    //     //Fill text nos ayuda a meter texto al canvas.
    //     game.fillText(emojis.I, elementsSize, elementsSize * i);
    // }

    //Acedemos al mapa y lo dividimos en un array
    const map = maps[0]; //El mapa tal cual
    const mapRows = map.trim().split('\n'); //Las puras files horizontales
    const mapRowCols = mapRows.map((row) => { //Los elementos separados
        return row.trim().split('')
    });

    console.log({map, mapRows, mapRowCols});

    for(let x = 1; x <= 10; x++){
        for(let y = 1; y <= 10; y++){
            //Fill text nos ayuda a meter texto al canvas.
            game.fillText(emojis[mapRowCols[y-1][x-1]], elementsSize * x+15, elementsSize * y-10);
        }
    }


}