class Molecule {
    constructor(_size,_i){
        this.position = createVector(random(0+(_size*2),width-(_size*2)),random(0+(_size*2),height-(_size*2))); // to prevent being placed in zone where center point is behind the checkEdges point we make sure the starting point is at least two molecules from the edge
        this.velocity = createVector(random(-2,2),random(-2,2));
        this.size = _size*(random(1,3));
        this.r = this.size/2;
        this.fillr = 0;
        this.fillg = 255;
        this.fillb = 0;
        this.key = _i; //index reference
    }
    
    render() {
        stroke(0);
        strokeWeight(1)
        fill(this.fillr,this.fillg,this.fillb); //enables changing colour dynamically
        push()
            translate(this.position.x,this.position.y)
            ellipse(0,0,this.size,this.size);
        pop();
    }
    
    step() {
        this.position.add(this.velocity);
    }
    
    resetBalls(){
        this.fillr = 0;
        this.fillg = 255;
        this.fillb = 0;
    }
    
    checkEdges(){ // inculdes radius for accurate bouncing at edges
        
        if(this.position.x - this.r < 0 || this.position.x + this.r > width){
            this.velocity.x = this.velocity.x * -1;
        }
        
        if(this.position.y -this.r < 0 || this.position.y +this.r > height){
            this.velocity.y = this.velocity.y * -1;
        }
    }
    
}


    
    