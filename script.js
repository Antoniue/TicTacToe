// factory function for players
const playerFactory = (symbol) => {
    this.symbol = symbol;
    return {symbol};
}

// gameBoard module
const gameBoard = (() => {
    let row1board = ['','',''];
    let row2board = ['','',''];
    let row3board = ['','',''];
    const getBoard = () => {
        return [row1board,row2board,row3board];
    }

    const restartBoard = () => {
        row1board = ['','',''];
        row2board = ['','',''];
        row3board = ['','',''];
        gameFlow.render();
    }
    const butt = document.querySelector('.restartButton');
    butt.addEventListener(
        'click', 
        () => {restartBoard(); console.log('restart');}
);
    return {getBoard};
}
)();

// gameFlow module
const gameFlow = (() => {
    let row1 = document.querySelector('.row1');
    let row2 = document.querySelector('.row2');
    let row3 = document.querySelector('.row3');
    const player1 = playerFactory('X');
    const player2 = playerFactory('O');
    const render = () => {
        board = gameBoard.getBoard();
        row1.innerHTML = '';
        row2.innerHTML = '';
        row3.innerHTML = '';
        for(let index = 0; index < 3; index++)
        {
            row1.innerHTML += '<div class="grid" id="grid0'+(index)+'">'+board[0][index]+'</div>'
            row2.innerHTML += '<div class="grid" id="grid1'+(index)+'">'+board[1][index]+'</div>'
            row3.innerHTML += '<div class="grid" id="grid2'+(index)+'">'+board[2][index]+'</div>'
        }
        drawBoard();
    }
    const drawBoard = () => {
        const grids = document.querySelectorAll('.grid');
        grids.forEach(grids => {
            grids.addEventListener(
                'click',
                () => {
                    let gridid = grids.getAttribute('id');
                    board[gridid[4]][gridid[5]] = player2.symbol;
                    render();
                }
            )
        });
    }
    return {render};
}
)();

gameFlow.render();