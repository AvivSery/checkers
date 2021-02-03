
var gameBoard = [[],[],[],[],[],[],[],[]];
//gameBoard = setGameBoard();
gameBoard = [
    ["00",new Stone (0,1,true),"02",new Stone(0,3,true),"04",new Stone(0,5,true),"06",new Stone(0,7,true)],
    [new Stone (1,0,true),"11",new Stone (1,2,true),"13",new Stone (1,4,true),"15",new Stone (1,6,true),"17"],
    ["20",new Stone (2,1,true),"22",new Stone(2,3,true),"24",new Stone(2,5,true),"26",new Stone(2,7,true)],
    ["30","31","32","33","34","35","36","37"],
    ["40","41","42","43","44","45","46","47"],
    [new Stone (5,0,false),"51",new Stone (5,2,false),"53",new Stone (5,4,false),"55",new Stone (5,6,false),"57"],
    ["60",new Stone (6,1,false),"62",new Stone(6,3,false),"64",new Stone(6,5,false),"66",new Stone(6,7,false)],
    [new Stone (7,0,false),"71",new Stone (7,2,false),"73",new Stone (7,4,false),"75",new Stone (7,6,false),"77"]

]

setCells();
findWhereToPutStonePhoto();


function Stone(row,column,isBlack){
    this.row=row;
    this.column=column;
    this.isBlack=isBlack;
}

Stone.prototype.checkIfMoveIsPossible = function(rowToMoveToward,columnToMoveToward){

    if(isBlack && rowToMoveToward -1 === this.row && (columnToMoveToward -1 === this.column ||
        columnToMoveToward +1 === this.column )){
            return true;
    }
    if (!isBlack && rowToMoveToward +1 === this.row && (columnToMoveToward -1 === this.column ||
        columnToMoveToward +1 === this.column)){
        return true;
    }
    return false;
}

Stone.prototype.checkIfStrikingIsPossible = function(rowToMoveToward,columnToMoveToward,colorToStrike){

    if (isBlack && rowToMoveToward - 2 === this.row && columnToMoveToward-this.column === 2
        && document.getElementById((rowToMoveToward-1).toString() + (columnToMoveToward -1).toString()).alt===colorToStrike){
        deletImg(document.getElementById((rowToMoveToward-1).toString() + (columnToMoveToward -1).toString()));
        return true;
    }
    else if (isBlack && rowToMoveToward -2 ===this.row && columnToMoveToward - this.column === -2 &&
        document.getElementById((rowToMoveToward-1).toString() + (columnToMoveToward +1).toString()).alt===colorToStrike){
            deletImg(document.getElementById((rowToMoveToward-1).toString() + (columnToMoveToward +1).toString()));
            return true;
    }
    if (!isBlack && rowToMoveToward + 2 === this.row && columnToMoveToward-this.column === -2
        && document.getElementById((rowToMoveToward+1).toString() + (columnToMoveToward +1).toString()).alt===colorToStrike){

        deletImg(document.getElementById((rowToMoveToward+1).toString() + (columnToMoveToward +1).toString()));
        return true;

    }
    else if (!isBlack && rowToMoveToward +2 ===this.row && columnToMoveToward - this.column === 2 &&
        document.getElementById((rowToMoveToward+1).toString() + (columnToMoveToward -1).toString()).alt===colorToStrike){
            deletImg(document.getElementById((rowToMoveToward+1).toString() + (columnToMoveToward -1).toString()));
            return true;
    }
    return false;
}


function King(row,column,isBlack){
    this.row = row;
    this.column = column;
    this.isBlack = isBlack
}

King.prototype = new Stone();
King.prototype.constructor = King;

King.prototype.checkIfKingMoveIsPossible = function(rowToMoveToward,columnToMoveToward){
    var king = new King (this.row,this.column,this.isBlack);
    var colorToStrike = this.isBlack ? "red":"black"; 
    sumOfRows = rowToMoveToward - this.row;
    sumOfColumns = columnToMoveToward - this.column;
    if ((sumOfRows === -1|| sumOfRows ===1 )&&(sumOfColumns===1||sumOfColumns===-1)){
        return true;
    }
    else if (king.checkIfMoveIsPossible(rowToMoveToward,columnToMoveToward)){
        return true;
    }
    else if (king.checkIfStrikingIsPossible(rowToMoveToward,columnToMoveToward,colorToStrike)){
        return true;
    }
    isBlack = !isBlack;
    if(king.checkIfStrikingIsPossible(rowToMoveToward,columnToMoveToward,colorToStrike)){
        isBlack = !isBlack;
        return true;
    }
    return false;
}

var countClicks = 0;
var countTurns = 2;
changeHeader(countTurns);//משנה את הכותרת מעל הלוח
var idOfFirstCell  = null;
var idOfSecondCell = null;
var isBlack = false;
var turnsWithOutStrikesOrStonesMovement = 0;




function checkClicks(id){

if (countClicks % 2 === 0){
    
    if (!checkIfEmpySpaceHaveBeenChosen(id) ||!checkWhiceTurnIsIt(id,countTurns)){
        idOfFirstCell = null;//בדיקה האם נבחרה משבצת ריקה והאם בחירת האבן תואמת את התור
        countClicks--;
    }
    else{
        idOfFirstCell = id;
    }    
}
else if (countClicks % 2 !== 0){

    if(checkIfCellIsTaken(id)){//בדיקה האם המקום אליו רוצים לנוע תפוס כבר
        idOfFirstCell = null;
        idOfSecondCell = null;
    }
    else {
        idOfSecondCell = id;
    }
 
}
if (idOfFirstCell  !== null &&  idOfSecondCell !== null){

    var rowOfStone = parseInt(idOfFirstCell.slice(0,1));
    var columnOfStone = parseInt(idOfFirstCell.slice(1));
    var rowToMoveToward = parseInt(idOfSecondCell.slice(0,1));
    var columnToMoveToward = parseInt(idOfSecondCell.slice(1));
    var colorToStrike = isBlack ? "red":"black";
    var isKingHaveChosen = chekIfKingHaveBeenChosen(rowOfStone,columnOfStone);//בודק האם מלך נבחר
    var didStrikeHappend = false;

    if(!isKingHaveChosen){
        var stone = new Stone(rowOfStone,columnOfStone,isBlack, isKingHaveChosen);//בדיקת תנועה של אבן רגילה
      if (stone.checkIfMoveIsPossible(rowToMoveToward,columnToMoveToward,colorToStrike) || 
      stone.checkIfStrikingIsPossible(rowToMoveToward,columnToMoveToward,colorToStrike)){
        swapImg();//החלפת  תמונה
        isBlack = !isBlack;
        turnsWithOutStrikesOrStonesMovement = 0;//איפוס צעדים בהם אבן לא זזה
        didStrikeHappend = checkingIfStrikeHappend(rowOfStone,rowToMoveToward);
    }
    }
    else if (isKingHaveChosen){
        var king = new King(rowOfStone,columnOfStone,isBlack, isKingHaveChosen);//בדיקת תנועה של מלך
        if(king.checkIfKingMoveIsPossible(rowToMoveToward,columnToMoveToward,colorToStrike)){
          swapImg();//החלפת תמונה
          isBlack = !isBlack;
          turnsWithOutStrikesOrStonesMovement = checkingIfStrikeHappend(rowToMoveToward,rowOfStone)
          ? 0: ++turnsWithOutStrikesOrStonesMovement;//סופר או מאפס את ספירת 15 הצעדים
          didStrikeHappend = checkingIfStrikeHappend(rowOfStone,rowToMoveToward);
        }      
    }
     checkForDoubleStrike(rowToMoveToward, columnToMoveToward,didStrikeHappend,columnOfStone);
    checkForTieDueTo15Moves(turnsWithOutStrikesOrStonesMovement);//בודק תיקו
             
}


countClicks++;
checkIfWinningIsntPossible();//בודק תיקו
checkIfWinAchieved()//בודק ניצחון
}


function checkForDoubleStrike(rowToMoveToward, columnToMoveToward,didStrikeHappend,columnOfStone){

    if (!didStrikeHappend){
        return false;
    }

    var colorToStrike = isBlack ? "black":"red";
    var rowToStrike = isBlack ? -1 : 1;
    var columnToStrike = columnToMoveToward > columnOfStone ? 1 : -1; 

    if ((typeof gameBoard[rowToMoveToward+ (rowToStrike *2)][columnToMoveToward+ (columnToStrike *2)] !== "undefined")&&
        gameBoard[rowToMoveToward + rowToStrike][columnToMoveToward+ columnToStrike] instanceof Stone &&
        !( gameBoard[rowToMoveToward+ (rowToStrike *2)][columnToMoveToward+ (columnToStrike *2)] instanceof Stone)&&
        (document.getElementById((rowToMoveToward+ rowToStrike).toString() + (columnToMoveToward+ columnToStrike).toString()).alt === colorToStrike)){
        idOfFirstCell = (rowToMoveToward.toString() + columnToMoveToward.toString());
        idOfSecondCell = ((rowToMoveToward+ (rowToStrike *2)).toString() + (columnToMoveToward + (columnToStrike*2)).toString())
        countTurns++;
        deletImg(document.getElementById((rowToMoveToward+ rowToStrike).toString()+(columnToMoveToward+ columnToStrike).toString()));
        swapImg();//החלפת  תמונה
        checkForDoubleStrike(rowToMoveToward + (rowToStrike*2), columnToMoveToward +(columnToStrike*2),
        true, columnToMoveToward+ columnToStrike);
    }   
}


function setCells(){

    var placesToSet = 
    ["01","03","05","07","10","12","14","16","21","23","25","27",
    "30","32","34","36","41","43","45","47","50","52","54","56",
    "61","63","65","67","70","72","74","76"];

    for (var i=0; i<placesToSet.length;i++){
    var cell =  document.getElementById(placesToSet[i]);
    cell.setAttribute("id", placesToSet[i]);
    cell.addEventListener('click', getTdId);//קליק על התא נותן את האיידי שלו
    cell.style.backgroundColor = "black";
    cell.style.padding = 0;    
    } 
}

function getTdId(id){
 
    var idProperty = id.target.id;
    checkClicks(idProperty);    
}

function findWhereToPutStonePhoto(){

    var numToAdd = 0;
    var sumofIandJ = 0;
    for (var i = 0 ; i<8;i++){
        for (var j=0; j<8;j++){
            sumofIandJ = i + j + numToAdd;
            switch (sumofIandJ){
                case 1: case 3: case 5: case 7: case 8: case 10: 
                case 12: case 14: case 17: case 19: case 21: case 23:
                    placedStonePicture(i,j,"blackStone.jpg", "black"); break;
                case 40: case 42: case 44: case 46: case 49: case 51: 
                case 53: case 55: case 56: case 58: case 60: case 62: 
                    placedStonePicture(i,j,"redStone.jpg","red"); break;
            }
        }
        numToAdd = numToAdd +7; 
    }
}

function placedStonePicture(row,column,src,alt){//פונקציית הצבת תמונה

    var id = row.toString() + column.toString();
    var parentDiv = document.getElementById(id);
    var newIMG = document.createElement("IMG");
    newIMG.setAttribute("src", src);
    newIMG.alt = alt;
    newIMG.setAttribute("width", "50");
    newIMG.setAttribute("height", "50");
    newIMG.setAttribute("display", "block");
    newIMG.setAttribute("margin-left", "auto");
    newIMG.setAttribute("margin-right", "auto");
    newIMG.setAttribute("id", id);
    parentDiv.alt = alt;
    parentDiv.appendChild(newIMG);
    
}

function checkIfEmpySpaceHaveBeenChosen(id){
    
    var e = document.getElementById(id);
    var isThereStone = e.hasChildNodes();
    return isThereStone;
}

function checkWhiceTurnIsIt(id, countTurns){
    var stoneColor = document.getElementById(id).alt;
   
    if ((stoneColor === "red" && countTurns % 2 ===0)||
        (stoneColor === "black" && countTurns% 2 !==0)){
            return true;
        }
        return false;
   }

function checkIfCellIsTaken(id){
    var CellToMoveToward = document.getElementById(id);
    return CellToMoveToward.hasChildNodes();
} 

function chekIfKingHaveBeenChosen(rowOfStone,columnOfStone){
    
    if (gameBoard[rowOfStone][columnOfStone] instanceof King){
        return true;
    } 
    return false;
}

function swapImg(){

    var firstCell = document.getElementById(idOfFirstCell);
    var imgToRemove = firstCell.childNodes[0];
    var secondCell = document.getElementById(idOfSecondCell);
    imgToRemove.setAttribute("id", idOfSecondCell);
    secondCell.alt = firstCell.alt;
    secondCell.appendChild(imgToRemove);
    changeGameBoard(countTurns);
    idOfFirstCell  = null;
    idOfSecondCell = null;
    countTurns++;
    changeHeader(countTurns);
}

function changeGameBoard(countTurns){
    var isStoneBlack = countTurns % 2 !==0 ? true:false;
    var rowOfStone = parseInt(idOfFirstCell.slice(0,1));
    var columnOfStone = parseInt(idOfFirstCell.slice(1));
    var rowToMoveToward = parseInt(idOfSecondCell.slice(0,1));
    var columnToMoveToward = parseInt(idOfSecondCell.slice(1));
    var stone = new Stone (rowToMoveToward,columnToMoveToward,isStoneBlack);

    if (isStoneBlack && rowToMoveToward ===7){//הכתרת מלך שחור
        stone = new King (rowToMoveToward,columnToMoveToward,isStoneBlack);
        var cell = document.getElementById(idOfSecondCell);
        deletImg(cell);
        placedStonePicture(rowToMoveToward ,columnToMoveToward,"blackKing.png","black");
        cell.addEventListener('click' , getTdId);
    }
    else if (!isStoneBlack && rowToMoveToward ===0){//הכתרת מלך אדום
        stone = new King (rowToMoveToward,columnToMoveToward,isStoneBlack);
        var cell = document.getElementById(idOfSecondCell);
        deletImg(cell);
        placedStonePicture(rowToMoveToward ,columnToMoveToward,"redKing.png","red");
        cell.addEventListener('click' , getTdId);
    }

    if (gameBoard[rowOfStone][columnOfStone] instanceof King){
    stone = new King (rowToMoveToward,columnToMoveToward,isStoneBlack);
    }
    
    gameBoard[rowToMoveToward][columnToMoveToward] = stone;
    gameBoard[rowOfStone][columnOfStone] = idOfFirstCell 
}

function changeHeader(countTurns){
    var h = document.getElementById("turn");  
    
    if (h.hasChildNodes()){
        var textToRemove = h.childNodes[0];
        h.removeChild(textToRemove);
    }
if ( countTurns % 2 !== 0 ){
    var text = document.createTextNode("Turn : Black");
    h.appendChild(text);
}
else if (countTurns % 2 === 0) {
    var text = document.createTextNode("Turn : Red");
     h.appendChild(text);
}
}

function deletImg(id){
    var cell = id;
    cell.removeChild(cell.childNodes[0]);
    var placeToChange = cell.id;
    gameBoard[placeToChange[0]][placeToChange[1]] = cell.id;
}

function checkingIfStrikeHappend(rowToMoveToward,rowOfStone){
    if (rowToMoveToward - rowOfStone ===2 || rowToMoveToward - rowOfStone ===-2){
        return true;
    }
    return false;   
}

function checkForTieDueTo15Moves(turnsWithOutStrikesOrStonesMovement){

    if (turnsWithOutStrikesOrStonesMovement ===15){
        alert("Game over, its a tie !");
       checkClicks = undefined;
    }
}

function checkIfWinningIsntPossible(){
    var blackStone = 0, redStone = 0,blackKing = 0,  redKing = 0;

    for (var i = 0 ; i<8; i++){
        for(var j = 0; j<8;j++){

            if(gameBoard[i][j] instanceof King && gameBoard[i][j].isBlack)
            blackKing++;
            else if(gameBoard[i][j] instanceof King && gameBoard[i][j].isBlack===false)
            redKing++;
            else if(gameBoard[i][j] instanceof Stone && gameBoard[i][j].isBlack)
            blackStone++;
            else if(gameBoard[i][j] instanceof Stone && gameBoard[i][j].isBlack===false)
            redStone++;
        }
    }
    if(((blackKing=== 2 &&redKing===1)||(blackKing===1 &&redKing===2)) && blackStone===0&& redStone===0 ){
        alert("Game Over, its a tie");
        checkClicks = undefined;
    }
}

function checkIfWinAchieved(){
    var blackStone = 0, redStone = 0,blackKing = 0,  redKing = 0;

    for (var i = 0 ; i<8; i++){
        for(var j = 0; j<8;j++){

            if(gameBoard[i][j] instanceof King && gameBoard[i][j].isBlack)
            blackKing++;
            else if(gameBoard[i][j] instanceof King && gameBoard[i][j].isBlack===false)
            redKing++;
            else if(gameBoard[i][j] instanceof Stone && gameBoard[i][j].isBlack)
            blackStone++;
            else if(gameBoard[i][j] instanceof Stone && gameBoard[i][j].isBlack===false)
            redStone++;
        }
    }
    if(blackKing===0 &&blackStone===0){
        alert("Game Over, red wins !");
        checkClicks = undefined;
    }
    else if(redKing===0 &&redStone===0){
        alert("Game Over, Black wins !");
        checkClicks = undefined;
    }
} 

