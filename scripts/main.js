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
         else if (direction === 'left') {
            moveLeft(state);
          }
          else if (direction === 'up') {
            moveUp(state);   
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

function getnewcoordinates() {
    var c = Math.floor(Math.random()*10)%4;
    var d = Math.floor(Math.random()*10)%4;
    return {x:c , y:d};
};

function moveRight(state) {
    var t = false;
    var freeCell = []; 
    for (var i=0; i<=3; i++) {
        for (var j=3; j>=0; j--) {

            if ( (state[i][j] === 0) && (typeof freeCell[i] == "undefined") ) {
               freeCell[i]=j;
                console.log('found freecell for row', i, freeCell[i])
           }
           if (state[i][j]&& (typeof freeCell[i] != "undefined")) {
               t=true;
               state[i][freeCell[i]] = state[i][j];
               state[i][j]= 0;
               freeCell[i]--;
               }
                
        }
    }
    mergeRight(state);
    PullRight(state);    
    if (wonCheck(state)){
     return alert('YOU WON!');
    }
     if (!freeCheck(state)){
     return alert('Game Over');
    }
    if(t){
    addNew(state);
    }   
}

function moveDown(state) {
    var t = false;
    var freeCell = []; 
    for (var i=0; i<=3; i++) {
        for (var j=3; j>=0; j--) {

            if ( (state[j][i] === 0) && (typeof freeCell[i] == "undefined") ) {
               freeCell[i]=j;
                console.log('found freecell for row', i, freeCell[i])
           }
           if (state[j][i]&& (typeof freeCell[i] != "undefined")) {
               t=true;
               state[freeCell[i]][i] = state[j][i];
               state[j][i]= 0;
               freeCell[i]--;
               }
                
        }
    }
    mergeDown(state);
    PullDown(state); 
    if (wonCheck(state)){
     return alert('YOU WON!');
    }   
     if (!freeCheck(state)){
     return alert('Game Over');
    }
    if(t){
    addNew(state);
    }
}

function moveLeft(state) {
    var t = false;
    var freeCell = []; 
    for (var i=0; i<=3; i++) {
        for (var j=0; j<=3; j++) {

            if ( (state[i][j] === 0) && (typeof freeCell[i] == "undefined")) {
               freeCell[i]=j;
                console.log('found freecell for row', i, freeCell[i]);

           } 
           if (state[i][j]&& (typeof freeCell[i] != "undefined")) {
               t=true;
               state[i][freeCell[i]] = state[i][j];
               state[i][j]= 0;
               freeCell[i]++;
               }
                
        }
    }
    mergeLeft(state);
    PullLeft(state);
    if (wonCheck(state)){
     return alert('YOU WON!');
    }
     if (!freeCheck(state)){
     return alert('Game Over');
    }
    if(t){
    addNew(state);
    }
}

function moveUp(state) {
    var t = false;
    var freeCell = []; 
    for (var i=0; i<=3; i++) {
        for (var j=0; j<=3; j++) {

            if ( (state[j][i] === 0) && (typeof freeCell[i] == "undefined") ) {
               freeCell[i]=j;
                console.log('found freecell for row', i, freeCell[i])
           }
           if (state[j][i]&&(typeof freeCell[i] != "undefined")) {
               t=true;
               state[freeCell[i]][i] = state[j][i];
               state[j][i]= 0;
               freeCell[i]++;
               }

        }
    }
    mergeUp(state);
    PullUp(state);
    if (wonCheck(state)){
     return alert('YOU WON!');
    }
     if (!freeCheck(state)){
     return alert('Game Over');
    }
    if(t){
    addNew(state);
    }
}

function mergeUp(state){
     var t = false;
     for (var i=0;i<=3;i++){
      for (var j=0;j<=3;j++){

        if ((typeof state[j+1] != "undefined")&&(state[j][i]===state[j+1][i])&&(typeof state[j+1][i] != "undefined")&&(state[j][i] !== 0)){
          t=true;
          state[j][i]+=state[j][i];
          state[j+1][i] = 0;
 
        }
      }
     }
     
}

function mergeDown(state){
     var t = false;
     for (var i=0;i<=3;i++){
      for (var j=3; j>=0; j--){
        if ((typeof state[j-1] != "undefined")&&(state[j-1][i]===state[j][i])&&(typeof state[j-1][i] != "undefined")&&(state[j][i] !== 0)){
          t=true;
          state[j][i]+=state[j][i];
          state[j-1][i] = 0;

        }
      }
     }
     
}

function mergeLeft(state){
     var t = false;
     for (var i=0;i<=3;i++){
      for (var j=0;j<=3;j++){
        if ((typeof state[i][j+1] != "undefined")&&(state[i][j]===state[i][j+1])&&(state[i][j] !== 0)){
          t=true;
          state[i][j]+=state[i][j];
          state[i][j+1] = 0;

        }
      }
     }
     
}    

function mergeRight(state){
     var t = false;
     for (var i=0;i<=3;i++){
      for (var j=3; j>=0; j--){
        if ((typeof state[i][j-1] != "undefined")&&(state[i][j]===state[i][j-1])&&(state[i][j] !== 0)){
          t=true;
          state[i][j]+=state[i][j];
          state[i][j-1] = 0;

        }
      }
    }
    
}    

/*function addNew(state){
  for (var i=0;i<=3;i++){
      for (var j=0; j<=3; j++){
        console.log(state[i][j]);
        if ((state[i][j]===0)||(typeof state[i][j]!=='number')){
         return state[i][j]=2;
        }
      }
    }
}
*/

function addNew(state){
  var a = Math.floor(Math.random()*100)%4;
  if (a === 0) {
    addFour(state);
  }
  else {
    addTwo(state);
  }
}


function addTwo(state){
  var newcoord = getnewcoordinates();
  while (state[newcoord.x][newcoord.y]!==0){
    newcoord = getnewcoordinates();
  }
  state[newcoord.x][newcoord.y] = 2;
}


function addFour(state){
  var newcoord = getnewcoordinates();
  while (state[newcoord.x][newcoord.y]!==0){
    newcoord = getnewcoordinates();
  }
  state[newcoord.x][newcoord.y] = 4;
}


function freeCheck(state){
  var freeCell = [];
  var t = true;
  for (var i=0; i<=3; i++) {
        for (var j=0; j<=3; j++) {
          if ( (state[i][j] === 0) && (typeof freeCell[i] == "undefined") ){
            freeCell[i]=j;
            console.log('am casuta libera', freeCell[i])
            return t = true;
          }
          else t = false;
        }
      }
 }


function wonCheck(state){
  var freeCell = [];
  var t = true;
  for (var i=0; i<=3; i++) {
        for (var j=0; j<=3; j++) {
          if ( (state[i][j] === 64) && (typeof freeCell[i] == "undefined") ){
            freeCell[i]=j;
            console.log('am casuta castigatoare', freeCell[i])
            return t = true;
          }
          else t = false;
        }
      }
 }



/*function checkFreeandAdd(state){
  var f = 0;
  for (var i=0;i<=3;i++){
      for (var j=0; j<=3; j++){
         if (state[i][j]===0){
         f++;
        }
      }
    }
    while(f!==0){
     addNew(state) 
    }
}*/

/*function randomNew(state){
  var newcoord = getnewcoordinates();
  while (state[i][j]!==0){
  newcoord = getnewcoordinates();
  }
  state[newcoord.x][newcoord.y] = 2;
}
*/

function PullUp(state) {
    var freeCell = []; 
    for (var i=0; i<=3; i++) {
        for (var j=0; j<=3; j++) {

            if ( (state[j][i] === 0) && (typeof freeCell[i] == "undefined") ) {
               freeCell[i]=j;
                console.log('found freecell for row', i, freeCell[i])
           }
           if (state[j][i]&&(typeof freeCell[i] != "undefined")) {
               state[freeCell[i]][i] = state[j][i];
               state[j][i]= 0;
               freeCell[i]++;
               }

        }
    }
}

function PullRight(state) {
    var freeCell = []; 
    for (var i=0; i<=3; i++) {
        for (var j=3; j>=0; j--) {

            if ( (state[i][j] === 0) && (typeof freeCell[i] == "undefined") ) {
               freeCell[i]=j;
                console.log('found freecell for row', i, freeCell[i])
           }
           if (state[i][j]&& (typeof freeCell[i] != "undefined")) {
               state[i][freeCell[i]] = state[i][j];
               state[i][j]= 0;
               freeCell[i]--;
               }
                
        }
    }
}

function PullLeft(state) {
    var freeCell = []; 
    for (var i=0; i<=3; i++) {
        for (var j=0; j<=3; j++) {

            if ( (state[i][j] === 0) && (typeof freeCell[i] == "undefined")) {
               freeCell[i]=j;
                console.log('found freecell for row', i, freeCell[i]);

           } 
           if (state[i][j]&& (typeof freeCell[i] != "undefined")) {
               state[i][freeCell[i]] = state[i][j];
               state[i][j]= 0;
               freeCell[i]++;
               }
                
        }
    }
}

function PullDown(state) {
    var freeCell = []; 
    for (var i=0; i<=3; i++) {
        for (var j=3; j>=0; j--) {

            if ( (state[j][i] === 0) && (typeof freeCell[i] == "undefined") ) {
               freeCell[i]=j;
                console.log('found freecell for row', i, freeCell[i])
           }
           if (state[j][i]&& (typeof freeCell[i] != "undefined")) {
               state[freeCell[i]][i] = state[j][i];
               state[j][i]= 0;
               freeCell[i]--;
               }
                
        }
    }
}