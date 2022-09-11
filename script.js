// gameBoard module
const gameBoard = (() => {
    let row1board = ['x','',''];
    let row2board = ['','x','o'];
    let row3board = ['o','','x'];
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
        () => restartBoard()
    );

    return {getBoard };
}
)();

// factory function for players
const playerFactory = (symbol) => {
    this.symbol = symbol;
}

// gameFlow module
const gameFlow = (() => {
    let row1 = document.querySelector('.row1');
    let row2 = document.querySelector('.row2');
    let row3 = document.querySelector('.row3');
    const render = () => {
        board = gameBoard.getBoard();
        row1.innerHTML = '';
        row2.innerHTML = '';
        row3.innerHTML = '';
        for(let index = 0; index < 3; index++)
        {
            row1.innerHTML += '<div class="grid grid1'+(index+1)+'">'+board[0][index]+'</div>'
            row2.innerHTML += '<div class="grid grid2'+(index+1)+'">'+board[1][index]+'</div>'
            row3.innerHTML += '<div class="grid grid3'+(index+1)+'">'+board[2][index]+'</div>'
        }
    }
    return {render};
}
)();



gameFlow.render();