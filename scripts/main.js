function startGame() {
    var state = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    var firstcoord = getrandomcoordinates();
    state[firstcoord.x][firstcoord.y] = 2;

    var secondcoord = getrandomcoordinates();
    state[secondcoord.x][secondcoord.y] = 2;

    render(state);

    addArrowHandler(function (direction) {
        if (direction === 'right') {
            moveRight(state);
        }
        else if (direction === 'down') {
            moveDown(state);
        }
        render(state);
        console.log("Key pressed", direction);
    });

    
}

function getrandomcoordinates() {
    var a = Math.floor(Math.random()*10)%4;
    var b = Math.floor(Math.random()*10)%4;
    return {x:a , y:b};
};

function moveRight(state) {
    var freeCell = []; 
    for (var i=0; i<=3; i++) {
        for (var j=3; j>=0; j--) {

            if ( (state[i][j] === 0) && !freeCell[i] ) {
               freeCell[i]=j;
                console.log('found freecell for row', i, freeCell[i])
           }
           if (state[i][j]&&freeCell[i]) {
               state[i][freeCell[i]] = state[i][j];
               state[i][j]= 0;
               freeCell[i]=j;

            }
                
        }
    }

    
}

function moveDown(state) {
    var freeCell = []; 
    for (var i=0; i<=3; i++) {
        for (var j=3; j>=0; j--) {

            if ( (state[j][i] === 0) && !freeCell[i] ) {
               freeCell[i]=j;
                console.log('found freecell for row', i, freeCell[i])
           }
           if (state[j][i]&&freeCell[i]) {
               state[freeCell[i]][i] = state[j][i];
               state[j][i]= 0;
               freeCell[i]=j;

            }
                
        }
    }

    console.log(state)
}