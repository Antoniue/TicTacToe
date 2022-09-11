let result = document.querySelector('.result');
let currentTurns = 0;
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
    let isFinished = false;
    const getBoard = () => {
        return [row1board,row2board,row3board];
    }

    const setFinish = (finish) => {
        isFinished = finish;
    }

    const getFinish = () => {
        return isFinished;
    }

    const restartBoard = () => {
        row1board = ['','',''];
        row2board = ['','',''];
        row3board = ['','',''];
        setFinish(false);
        gameFlow.render();
        result.innerHTML = '';
        currentTurns = 0;
    }
    const butt = document.querySelector('.restartButton');
    butt.addEventListener(
        'click', 
        () => restartBoard()
);
    return {getBoard, setFinish, getFinish};
}
)();

// gameFlow module
const gameFlow = (() => {
    let gameType = '';
    let row1 = document.querySelector('.row1');
    let row2 = document.querySelector('.row2');
    let row3 = document.querySelector('.row3');
    let turn = document.querySelector('.turn');
    let PlayerO = playerFactory('O');
    let PlayerX = playerFactory('X');
    let lastPlayer = playerFactory('O');

    let gameButton = document.querySelectorAll('.play');
    gameButton.forEach(gameButton => {
        gameButton.addEventListener(
            'click',
            () => {
                gameType = gameButton.getAttribute('id');
                render();
                turn.textContent = "Player "+PlayerX.symbol+"'s turn";
            }
        )
    });

    function getRandom(max){
        return Math.floor(Math.random() * max);
    }

    let currentPlayer = () => {
        if(lastPlayer.symbol === 'O')
        {
            lastPlayer = PlayerX;
            turn.textContent = "Player "+PlayerO.symbol+"'s turn";
            currentTurns++;
            return PlayerX;
        }
        if(lastPlayer.symbol === 'X')
        {
            lastPlayer = PlayerO;
            turn.textContent = "Player "+PlayerX.symbol+"'s turn";
            currentTurns++;
            return PlayerO;
        }
    }

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
        if(gameType === 'players')
        drawBoardPlayers();
        else if (gameType === 'playerAI')
        drawBoardAI();
        else
        turn.textContent = 'Please choose Game Mode';
    }

    function giveDecision(board){
        //checks if player has started in center
        if(board[1][1] == 'X'){
        //checks if it can fill any grid to win
        if(board[0][0] == 'O' && board[0][2] == 'O' && board[0][1] == '')
        return [0,1];
        if(board[0][0] == 'O' && board[2][0] == 'O' && board[1][0] == '')
        return [1,0];
        if(board[0][0] == 'O' && board[0][1] == 'O' && board[0][2] == '')
        return [0,2];
        if(board[0][1] == 'O' && board[0][2] == 'O' && board[0][0] == '')
        return [0,0];
        if(board[2][0] == 'O' && board[2][1] == 'O' && board[2][2] == '')
        return [2,2];
        if(board[2][1] == 'O' && board[2][2] == 'O' && board[2][0] == '')
        return [2,0];
        if(board[2][0] == 'O' && board[2][2] == 'O' && board[2][1] == '')
        return [2,1];
        if(board[2][2] == 'O' && board[0][2] == 'O' && board[1][2] == '')
        return [1,2];
        if(board[2][2] == 'O' && board[1][2] == 'O' && board[0][2] == '')
        return [0,2];
        if(board[2][0] == 'O' && board[1][0] == 'O' && board[0][0] == '')
        return [0,0];
        if(board[0][0] == 'O' && board[1][0] == 'O' && board[2][0] == '')
        return [2,0];
        if(board[0][2] == 'O' && board[1][2] == 'O' && board[2][0] == '')
        return [2,0];

        //checks if it can take any edge of the 4 edges as it's first grid (2nd best grids to fill after center)
        let random = getRandom(4);
        if(currentTurns == 1)
        {
        if(random == 0)
            return [0,0];
        if(random == 1)
            return [0,2];
        if(random == 2)
            return [2,0];
        if(random == 3)
            return [2,2];
        }

        //checks if player has 2 grids in a row so it can block it
        if(
            (board[0][0] == 'X' && board[1][0] == 'X') ||
            (board[0][2] == 'X' && board[1][1] == 'X') ||
            (board[2][1] == 'X' && board[2][2] == 'X'))
            if(board[2][0] == '')
        return [2 , 0];
        if(
            (board[0][1] == 'X' && board[1][1] == 'X') ||
            (board[2][0] == 'X' && board[2][2] == 'X'))
            if(board[2][1] == '')
        return [2 , 1];
        if(
            (board[0][2] == 'X' && board[1][2] == 'X') ||
            (board[0][0] == 'X' && board[1][1] == 'X') ||
            (board[2][0] == 'X' && board[2][1] == 'X'))
            if(board[2][2] == '')
        return [2 , 2];
        if(
            (board[1][0] == 'X' && board[2][0] == 'X') ||
            (board[1][1] == 'X' && board[2][2] == 'X') ||
            (board[0][1] == 'X' && board[0][2] == 'X'))
            if(board[0][0] == '')
        return [0 , 0];
        if(
            (board[1][1] == 'X' && board[2][1] == 'X') ||
            (board[0][0] == 'X' && board[0][2] == 'X'))
            if(board[0][1] == '')
        return [0 , 1];
        if(
            (board[1][2] == 'X' && board[2][2] == 'X') ||
            (board[1][1] == 'X' && board[2][0] == 'X') ||
            (board[0][0] == 'X' && board[0][1] == 'X'))
            if(board[0][2] == '')
        return [0 , 2];
        if(
            (board[1][0] == 'X' && board[1][1] == 'X') ||
            (board[0][2] == 'X' && board[2][2] == 'X'))
            if(board[1][2] == '')
        return [1 , 2];
        if(
            (board[0][0] == 'X' && board[2][0] == 'X') ||
            (board[1][1] == 'X' && board[1][2] == 'X'))
            if(board[1][0] == '')
        return [1 , 0];
        }
        
        //engages this else if player didn't put center as first grid
        else
        {
            //if center is not computer, place first computer grid as center
            if(board[1][1] != 'O')
            return [1,1];

             //checks if it can fill any grid to win
            if(
                ((board[0][0] == 'O' && board[0][2] == 'O')
                || (board[2][1] == 'O' && board[1][1] == 'O'))
                && board[0][1] == '')
            return [0,1];
            if(
                ((board[0][0] == 'O' && board[2][0] == 'O')
                || (board[1][1] == 'O' && board[1][2] == 'O'))
                && board[1][0] == '')
            return [1,0];
            if(
                ((board[0][0] == 'O' && board[0][1] == 'O')
                || (board[2][0] == 'O' && board[1][1] == 'O'))
                && board[0][2] == '')
            return [0,2];
            if(board[0][1] == 'O' && board[0][2] == 'O' && board[0][0] == '')
            return [0,0];
            if(
                ((board[2][0] == 'O' && board[2][1] == 'O')
                || (board[0][0] == 'O' && board[1][1] == 'O'))
                && board[2][2] == '')
            return [2,2];
            if(board[2][1] == 'O' && board[2][2] == 'O' && board[2][0] == '')
            return [2,0];
            if(
                ((board[2][0] == 'O' && board[2][2] == 'O')
                || (board[0][1] == 'O' && board[1][1] == 'O'))
                && board[2][1] == '')
            return [2,1];
            if(
                ((board[2][2] == 'O' && board[0][2] == 'O')
                || (board[1][0] == 'O' && board[1][1] == 'O'))
                && board[1][2] == '')
            return [1,2];
            if(board[2][2] == 'O' && board[1][2] == 'O' && board[0][2] == '')
            return [0,2];
            if(
                ((board[2][0] == 'O' && board[1][0] == 'O')
                || (board[2][2] == 'O' && board[1][1] == 'O'))
                && board[0][0] == '')
            return [0,0];
            if(board[0][0] == 'O' && board[1][0] == 'O' && board[2][0] == '')
            return [2,0];
            if(
                ((board[0][2] == 'O' && board[1][2] == 'O')
                || (board[0][2] == 'O' && board[1][1] == 'O'))
                 && board[2][0] == '')
            return [2,0];

            //checks if player has 2 grids in a row so it can block it
            if(
                (board[0][0] == 'X' && board[1][0] == 'X') ||
                (board[0][2] == 'X' && board[1][1] == 'X') ||
                (board[2][1] == 'X' && board[2][2] == 'X'))
                if(board[2][0] == '')
            return [2 , 0];
            if(
                (board[0][1] == 'X' && board[1][1] == 'X') ||
                (board[2][0] == 'X' && board[2][2] == 'X'))
                if(board[2][1] == '')
            return [2 , 1];
            if(
                (board[0][2] == 'X' && board[1][2] == 'X') ||
                (board[0][0] == 'X' && board[1][1] == 'X') ||
                (board[2][0] == 'X' && board[2][1] == 'X'))
                if(board[2][2] == '')
            return [2 , 2];
            if(
                (board[1][0] == 'X' && board[2][0] == 'X') ||
                (board[1][1] == 'X' && board[2][2] == 'X') ||
                (board[0][1] == 'X' && board[0][2] == 'X'))
                if(board[0][0] == '')
            return [0 , 0];
            if(
                (board[1][1] == 'X' && board[2][1] == 'X') ||
                (board[0][0] == 'X' && board[0][2] == 'X'))
                if(board[0][1] == '')
            return [0 , 1];
            if(
                (board[1][2] == 'X' && board[2][2] == 'X') ||
                (board[1][1] == 'X' && board[2][0] == 'X') ||
                (board[0][0] == 'X' && board[0][1] == 'X'))
                if(board[0][2] == '')
            return [0 , 2];
            if(
                (board[1][0] == 'X' && board[1][1] == 'X') ||
                (board[0][2] == 'X' && board[2][2] == 'X'))
                if(board[1][2] == '')
            return [1 , 2];
            if(
                (board[0][0] == 'X' && board[2][0] == 'X') ||
                (board[1][1] == 'X' && board[1][2] == 'X'))
                if(board[1][0] == '')
            return [1 , 0];
        }

        //incase nothing above gets engaged
        let temp1 = getRandom(3);
        let temp2 = getRandom(3);
        while(board[temp1][temp2] != '')
        {
            temp1 = getRandom(3);
            temp2 = getRandom(3);
        }
        return[temp1 , temp2];
    }

    const playAI = () => {
        currentPlayer = PlayerX;
        let decisions = giveDecision(board);
        board[decisions[0]][decisions[1]] = 'O';
        currentTurns++;
        render();
        checkWin();
    }

    const drawBoardAI = () => {
        const grids = document.querySelectorAll('.grid');
        grids.forEach(grids => {
            grids.addEventListener(
                'click',
                () => {
                    let gridid = grids.getAttribute('id');
                    if(gameBoard.getFinish() === false)
                        if(board[gridid[4]][gridid[5]] == ''){
                        board[gridid[4]][gridid[5]] = 'X';
                        currentTurns++;
                        render();
                        checkWin();
                        if(currentTurns != 9)
                            playAI();
                    }
                }
            )
        });
    }

    const drawBoardPlayers = () => {
        const grids = document.querySelectorAll('.grid');
        grids.forEach(grids => {
            grids.addEventListener(
                'click',
                () => {
                    let gridid = grids.getAttribute('id');
                    if(gameBoard.getFinish() === false)
                    {
                    if(board[gridid[4]][gridid[5]] == '')
                        board[gridid[4]][gridid[5]] = currentPlayer().symbol;
                    currentPlayer;
                    render();
                    checkWin();
                    }
                }
            )
        });
    }
    const checkWin = () => {
        console.log(currentTurns);
        if(currentTurns > 4)
        {
            if(
                (board[0][0] === 'X' && board[1][0] === 'X' && board[2][0] === 'X') //row left side
                ||(board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X') // \
                ||(board[0][0] === 'X' && board[0][1] === 'X' && board[0][2] === 'X') // row upper
                ||(board[0][2] === 'X' && board[1][2] === 'X' && board[2][2] === 'X') // row right side
                ||(board[2][0] === 'X' && board[2][1] === 'X' && board[2][2] === 'X') // row lower
                ||(board[0][1] === 'X' && board[1][1] === 'X' && board[2][1] === 'X') // vertical middle
                ||(board[1][0] === 'X' && board[1][1] === 'X' && board[1][2] === 'X') // horizontal middle
                ||(board[0][2] === 'X' && board[1][1] === 'X' && board[2][0] === 'X') // /
            )
            {
                result.innerHTML = 'Player X has won!'
                gameBoard.setFinish(true);
            }
            else if(
                (board[0][0] === 'O' && board[1][0] === 'O' && board[2][0] === 'O') //row left side
                ||(board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O') // \
                ||(board[0][0] === 'O' && board[0][1] === 'O' && board[0][2] === 'O') // row upper
                ||(board[0][2] === 'O' && board[1][2] === 'O' && board[2][2] === 'O') // row right side
                ||(board[2][0] === 'O' && board[2][1] === 'O' && board[2][2] === 'O') // row lower
                ||(board[0][1] === 'O' && board[1][1] === 'O' && board[2][1] === 'O') // vertical middle
                ||(board[1][0] === 'O' && board[1][1] === 'O' && board[1][2] === 'O') // horizontal middle
                ||(board[0][2] === 'O' && board[1][1] === 'O' && board[2][0] === 'O') // /
            )
            {
                result.innerHTML = 'Player O has won!'
                gameBoard.setFinish(true);
            }
            else if (currentTurns == 9)
            {
                result.innerHTML = "it's a fucking tie!";
                gameBoard.setFinish(true);
            }
        }
    }
    return {render};
}
)();

gameFlow.render();