// gameBoard module
const gameBoard = (() => {
    let row1 = ['','',''];
    let row2 = ['','',''];
    let row3 = ['','',''];
    const getBoard = () =>
    {
        return [row1,row2,row3];
    }
    return {getBoard};
}
)();

// factory function for players
const playerFactory = (symbol) => {
    this.symbol = symbol;
}

// gameFlow module
const gameFlow = (() => {
    board = gameBoard.getBoard();
    const render = () => {
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

let row1 = document.querySelector('.row1');
let row2 = document.querySelector('.row2');
let row3 = document.querySelector('.row3');
gameFlow.render();