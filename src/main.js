//Debemos crear un contexto para dibujar en el canvas.
const canvas = document.getElementById('game');
const game = canvas.getContext('2d'); //Definimos el eje "x" y "y"

//Variables para el tamaño del canvas
let canvasSize, elementsSize;

//En cuanto la ventana cargue se ejecuta la funcion.
window.addEventListener('load', setCanvasSize);
//Ajustamos el tamaño del canvas cuando el tamaño cambia
window.addEventListener('resize', setCanvasSize);

///////////////////FUNCION PARA TAMAÑO DE CANVAS
function setCanvasSize() {
    //En caso de que sea mobile
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8; //El width mide el 80%
    } else {
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

///////////////////////////INICIA EL JUEGO
function startGame() {
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

    //Creamos objeto de posicion jugador
    let playerPosition = {};
    let goalPosition = {};
    let bombPosition = {};
    let limitesMapa = {
        primeraEsquina: 0,
        segundaEsquina: 0,
        terceraEsquina: 0,
        cuartaEsquina: 0
    };
    let diferenciaTotal = 0;

    let contadorBombas = 0;
    let contadorRenders = 0;
    let retornoPlayer = false;
    function pintarRender(x_player = 0, y_player = 0, verificacion = true) {
        if(verificacion == true){
            game.clearRect(0, 0, canvasSize, canvasSize); //Reinicia el canvas de los iconos viejos
            console.log(verificacion)
            //Hacemos el recorrido para imprimir los mapas 10x10 (este es el tamaño de la matriz)
            for (let x = 1; x <= 10; x++) {
                for (let y = 1; y <= 10; y++) {
                    //Fill text nos ayuda a meter texto al canvas.
                    game.fillText(emojis[mapRowCols[y - 1][x - 1]], elementsSize * x + 15, elementsSize * y - 10);

                    //Definimos los límites del mapa
                    if (y == 1 && x == 1) {
                        limitesMapa.primeraEsquina = {
                            x: elementsSize * x + 15,
                            y: elementsSize * y - 10
                        }
                    } else if (y == 1 && x == 10) {
                        limitesMapa.segundaEsquina = {
                            x: elementsSize * x + 15,
                            y: elementsSize * y - 10
                        }
                    } else if (y == 10 && x == 1) {
                        limitesMapa.terceraEsquina = {
                            x: elementsSize * x + 15,
                            y: elementsSize * y - 10
                        }
                    } else if (y == 10 && x == 10) {
                        limitesMapa.cuartaEsquina = {
                            x: elementsSize * x + 15,
                            y: elementsSize * y - 10
                        }
                    }

                    //Detectamos el punto de inicio en el mapa
                    if (emojis[mapRowCols[y - 1][x - 1]] == '🚪' && contadorRenders == 0) {
                        //Guardamos la posicion del jugador en un objeto
                        playerPosition = {
                            x: elementsSize * x + 15,
                            y: elementsSize * y - 10
                        };
                        contadorRenders += contadorRenders + 1;
                        game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
                    }

                    //Delimitar la salida del mapa
                    //if (verificacion == true) {
                        game.fillText(emojis['PLAYER'], x_player, y_player);
                        localStorage.setItem('x_memory', x_player);
                        localStorage.setItem('y_memory', y_player);
                    // } else if (verificacion == false) {
                    //     let x_memory = localStorage.getItem('x_memory');
                    //     let y_memory = localStorage.getItem('y_memory');
                    //     game.fillText(emojis['PLAYER'], x_memory, y_memory);
                    //     console.log('x_memory', x_memory)
                    //     console.log('y_memory', y_memory)
                    // }

                    //Detectamos donde estan las bombas
                    if (emojis[mapRowCols[y - 1][x - 1]] == '💣') {
                        let nombreBomba = `bomba_${contadorBombas++}`;
                        bombPosition[nombreBomba] = {
                            x: elementsSize * x + 15,
                            y: elementsSize * y - 10
                        }
                    }

                    //Detectamos donde esta la meta
                    if (emojis[mapRowCols[y - 1][x - 1]] == '🎁') {
                        //Guardamos la posicion de la meta en el juego
                        goalPosition = {
                            x: elementsSize * x + 15,
                            y: elementsSize * y - 10
                        };
                    }
                }
            }
        }
    }
    pintarRender();

    //Debemos calcular la diferencia entre los elementos
    function calcularDiferenciGeneralPosition() {
        //Al ser una grilla ambas diferencias son lo mismo
        let diferenciaPosition;
        diferenciaPosition = bombPosition['bomba_0'].x - bombPosition['bomba_10'].x;
        diferenciaTotal = -1 * diferenciaPosition.toFixed(2);
    }
    calcularDiferenciGeneralPosition();

    console.log({ playerPosition, goalPosition, bombPosition, limitesMapa, canvasSize });

    ////////////////////////////////////////////////
    //Accedemos a los botones
    let up = document.getElementById('up');
    let left = document.getElementById('left');
    let right = document.getElementById('right');
    let down = document.getElementById('down');

    //Activamos la funcion con cada tecla con el click
    up.addEventListener('click', () => keyPressed('38'));
    left.addEventListener('click', () => keyPressed('37'));
    right.addEventListener('click', () => keyPressed('39'));
    down.addEventListener('click', () => keyPressed('40'));

    //Activamos la funcion de click (la página esta a la escucha de la tecla que se presiona)
    document.onkeydown = keyPressed;

    //Detecta la tecla que fue presionada.
    let verificacion = true;
    function keyPressed(e) {
        e = e || window.event; //Se vincula el código con un evento en la ventana.
        if ((e.keyCode == '38' || e == '38') && verificacion == true) {
            //up
            playerPosition.y = playerPosition.y - diferenciaTotal;
            verificacion = verificarLimite(playerPosition.x, playerPosition.y);
            pintarRender(parseFloat((playerPosition.x).toFixed(2)), parseFloat((playerPosition.y).toFixed(2)), verificacion);
            console.log('playerPosition.x, playerPosition.y', parseFloat((playerPosition.x).toFixed(2)), parseFloat((playerPosition.y).toFixed(2)))
        } else if ((e.keyCode == '40' || e == '40') && verificacion == true) {
            // down arrow
            playerPosition.y = playerPosition.y + diferenciaTotal;
            verificacion = verificarLimite(playerPosition.x, playerPosition.y);
            pintarRender(parseFloat((playerPosition.x).toFixed(2)), parseFloat((playerPosition.y).toFixed(2)), verificacion);
            console.log('playerPosition.x, playerPosition.y', parseFloat((playerPosition.x).toFixed(2)), parseFloat((playerPosition.y).toFixed(2)))
        } else if ((e.keyCode == '37' || e == '37') && verificacion == true) {
            // left arrow
            playerPosition.x = playerPosition.x - diferenciaTotal;
            verificacion = verificarLimite(playerPosition.x, playerPosition.y);
            pintarRender(parseFloat((playerPosition.x).toFixed(2)), parseFloat((playerPosition.y).toFixed(2)), verificacion);
            console.log('playerPosition.x, playerPosition.y', parseFloat((playerPosition.x).toFixed(2)), parseFloat((playerPosition.y).toFixed(2)))
        } else if ((e.keyCode == '39' || e == '39') && verificacion == true) {
            // right arrow
            playerPosition.x = playerPosition.x + diferenciaTotal;
            verificacion = verificarLimite(playerPosition.x, playerPosition.y);
            pintarRender(parseFloat((playerPosition.x).toFixed(2)), parseFloat((playerPosition.y).toFixed(2)), verificacion);
            console.log('playerPosition.x, playerPosition.y', parseFloat((playerPosition.x).toFixed(2)), parseFloat((playerPosition.y).toFixed(2)))
        }else if(verificacion == false){
            console.log(playerPosition)
            playerPosition.x = (parseFloat(localStorage.getItem('x_memory'))).toFixed(2);
            playerPosition.y = (parseFloat(localStorage.getItem('y_memory'))).toFixed(2);
            pintarRender(playerPosition.x, playerPosition.y, verificacion);
            verificacion = true
        }
    }

    function verificarLimite(valor_x, valor_y) {
        //Validacion de esquinas del mapa
        if (valor_x + diferenciaTotal < limitesMapa.terceraEsquina.x || valor_x > limitesMapa.segundaEsquina.x || valor_y < limitesMapa.primeraEsquina.y || valor_y > limitesMapa.terceraEsquina.y) {
            return false;
        } else {
            return true;
        }
    }
}