let molecules = [];
const numOfMolecules = 1500; // adjust mol count here
let collisions = 0; //display variable
let colWidth;
let rowHeight;
let gridCols = 10;
let gridRows = 10;
let gridMap = [];
let row;
let col;


function setup() { // draw canvas and create array of Molecules
    createCanvas(windowWidth, windowHeight);
    background(127);
    

    
    for (let i = 0; i < numOfMolecules; i++) {
        molecules.push(new Molecule(8, i)); // pass base size
    }
}


function Grid(_rows,_cols){ // gui function
    gridMap=[];
    this.gridRows=_rows;
    this.gridCols=_cols;
    create3DArray(_rows,_cols);
}




function draw() {
    
    background(127);

    colWidth = width / gridRows;
    rowHeight = height / gridCols;
    
    drawGrid();

    molecules.forEach(molecule => { // for each molecule run functions
        molecule.render();
        molecule.checkEdges();
        molecule.step();
        molecule.resetBalls();
    });

    //world functions
    
    create3DArray(gridRows,gridCols);
    splitIntoGrids();
    drawText();
    checkIntersections();

}

function create3DArray(_rows, _cols) { // creates an empty 3 dimensional array arrayName[][][]
    gridMap = [];
    for (i = 0; i < _rows; i++) {
        gridMap.push([]);
        for (j = 0; j < _cols; j++) {
            gridMap[i].push([]);
        }
    }
}

function splitIntoGrids() { //assigns molecules to their corrosponding grid cell

    molecules.forEach(m => {
        let col = Math.floor(m.position.x / colWidth)
        let row = Math.floor(m.position.y / rowHeight)

        gridMap[row][col].push(m.key);
    });

}


function checkIntersections() { // using 4 nested for loops checks broad phase collision for each molecule and only the molecules in the same cell as it

    for (i = 0; i < gridRows; i++) {
        for (j = 0; j < gridCols; j++) { // cycle through each cell

            if (gridMap[i][j].length > 1) { //if there is more than one molecule in the cell

                for (z = 0; z < gridMap[i][j].length; z++) { 
                    for (x = z + 1; x < gridMap[i][j].length; x++) { // for each molecule in the cell check the next molecule for collision (z+1)

                        m1 = molecules[gridMap[i][j][z]];
                        m2 = molecules[gridMap[i][j][x]]; // assign shorthand for the colliding molecules

                        resultVector = p5.Vector.sub(m1.position, m2.position);
                        if (resultVector.mag() < m1.r + m2.r) { // check for collision on the two held molecules


                            m1.fillr = 255;
                            m1.fillg = 0; // sets the fill of colliding molecules to red
                            m2.fillr = 255;
                            m2.fillg = 0;

                            returnFill(); //count red molecules

                        }
                    }


                }
            }
        }
    }
}





function drawText() { //handles display of collisions and framerate

    fill(255);
    stroke(0);
    strokeWeight(5);

    for (i = 0; i < gridRows; i++) { // displays the molecule count of each cell in its bottom right corner
        for (j = 0; j < gridCols; j++) {
            noStroke();
            textSize(10);
            text(gridMap[i][j].length, (colWidth * j)+((colWidth/100)*80),(rowHeight * i)+((rowHeight/100)*80));
            
        }
    }

    textSize(32);
    text('FR: ' + frameRate().toFixed(0), 200, 30);
    text('Collisions: ' + collisions, 380, 30)
    collisions = 0; // reset collisions


}



function returnFill() { // counts number of red molecules and changes display variable for collisions. This result was more accurate than counting colliding molecules
    let tempArray = [];
    molecules.forEach(m => {
        if (m.fillr == 255) {
            tempArray.push(m);
        }
        collisions = tempArray.length;
    });
}

function drawGrid() { //divides canvas according to number of rows cols
    for (i = 0; i < gridRows; i++) {
        for (j = 0; j < gridCols; j++) {
            noFill();
            strokeWeight(1);
            stroke(0, 0, 255);
            rect(i * colWidth, j * rowHeight, colWidth, rowHeight);

        }
    }
}

function unloadScrollBars() { // adjusts content size to available screen space
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
}


