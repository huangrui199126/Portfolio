var width=600;
var height=600;
var diameter = 20;
var min=50;
var max=100;
var Position=function(a,b){
    var self=this;
    this.x=a;
    this.y=b;
    this.moveable=false;
    this.direction='p';
    this.nextNode;
}
var switchPosition=function(position1,position2){
    var temp = position2.x;
    position2.x=position1.x;
    position1.x=temp;
    temp=position2.y;
    position2.y=position1.y;
    position1.y=temp;
    temp=position2.direction;
    position2.direction=position1.direction;
    position1.direction=temp;
}
var checkMoveable=function(start,position){
    var distanceX=position.x-start.x;
    var distanceY=position.y-start.y;
    var isMoveable=false;
    if((distanceX>0&&distanceX<30) && (distanceY>-diameter&&distanceY<diameter) && start.direction=='d'){
        isMoveable=true;
        position.y=start.y
    }
    if((distanceX<0&&distanceX>-30) && (distanceY>-diameter&&distanceY<diameter) && start.direction=='a'){
        isMoveable=true;
        position.y=start.y
    }
    if((distanceY>0&&distanceY<30) && (distanceX>-diameter&&distanceX<diameter) && start.direction=='s'){
        isMoveable=true;
        position.x=start.x;
    }
    if((distanceY<0&&distanceY>-30) && (distanceX>-diameter&&distanceX<diameter) && start.direction=='w'){
        isMoveable=true;
        position.x=start.x;
    }
    return isMoveable;
}
var checkLose=function(){
    if(start.x>width)return true;
    if(start.x<0)return true;
    if(start.y>height)return true;
    if(start.y<0)return true;
    var t=start;
    if(t.nextNode){
        t=t.nextNode;
        while(t.nextNode){
            if(t.x==start.x&&t.y==start.y)
                return true;
            t=t.nextNode;
        }
    }
    return false;
};
var move=function(prev,position){
    if(prev!=position)
        switch(prev.direction){
            case 'a':
                if(prev.y==position.y)
                    position.direction='a';
                else if(prev.y<position.y)
                    position.direction='w';
                else if(prev.y>position.y)
                    position.direction='s';
                break;
            case 'd':
                if(prev.y==position.y)
                    position.direction='d';
                else if(prev.y<position.y)
                    position.direction='w';
                else if(prev.y>position.y)
                    position.direction='s';
                break;
            case 'w':
                if(prev.x==position.x)
                    position.direction='w';
                else if(prev.x<position.x)
                    position.direction='a';
                else if(prev.x>position.x)
                    position.direction='d';
                break;
            case 's':
                if(prev.x==position.x)
                    position.direction='s';
                else if(prev.x<position.x)
                    position.direction='a';
                else if(prev.x>position.x)
                    position.direction='d';
                break;
        }

    switch(position.direction){
        case 'a':position.x-=diameter;
            break;
        case 'd':position.x+=diameter;
            break;
        case 'w':position.y-=diameter;
            break;
        case 's':position.y+=diameter;
            break;
    }
};
var lose=false;
var win=false;
var counter=0;
var chainLength=1;
var speed =10;

var date=new Date();
var num =min+Math.floor(Math.random()*(max-min));
var randomGenrate=function(minN,maxN){
    return minN+(maxN-minN)*Math.random(date.getMilliseconds());
}
var position=[];

//generate the random positions
var horizon=Math.floor(width/diameter-3);
var vertical=Math.floor(height/diameter-6);
var positions=horizon*vertical;
var numbers=[];

//generate num's distinct random numbers
for(var i=0;i<num;i++){
    var temp=Math.floor(positions*Math.random(i+date.getMilliseconds()));
    if(numbers.indexOf(temp)==-1
      && numbers.indexOf(temp-1)==-1
      && numbers.indexOf(temp+1)==-1
      && numbers.indexOf(temp+horizon)==-1
      && numbers.indexOf(temp-horizon)==-1){
        numbers.push(temp);
        console.log(temp);
    }else
        i--;
}
for(var i=0;i<numbers.length;i++){
    var x=3*diameter+diameter*Math.floor(numbers[i]/horizon);
    var y=3*diameter+diameter*Math.floor(numbers[i]%horizon);
    position.push(new Position(x,y));
}
var start=position[Math.floor(Math.random()*num)];
start.moveable=true;

end=start;
var pause=false;



function setup(){
    createCanvas(600,600);
    background(0,255,0);
};
function draw(){
    background(0,255,0);
    for(var i=0;i<num;i++){
        fill(0,0,0);
        if(position[i].moveable)fill(255,0,0);
        if(position[i]==start)fill(255,255,0);
        ellipse(position[i].x,position[i].y,diameter,diameter);
    }
    counter++;
    counter=counter%(100/speed);

    if(counter==0){
        if(!lose && !win&&checkLose()){
            alert("game over");
            lose=true;
        }
        if(!win && !lose &&chainLength==num){
            alert("you are winner");
            win=true;
        }
        //time of change direction
        for(var i=0;i<num;i++){
            if(!position[i].moveable)
                if(checkMoveable(start,position[i])){
                    position[i].moveable=true;
                    position[i].direction=start.direction;
                    position[i].nextNode=start;
                    chainLength++;
                    start=position[i];
                    //                            switchPosition(start,position[i]);
                }
        }

        if(start.direction!='p'){
            move(start,start); 
            var curr=start;
            while(curr.nextNode){
                move(curr,curr.nextNode);
                curr=curr.nextNode;
            }
        }
    }

};


function keyTyped() {
    if (key == 'a') {
        if(start.direction!='d')start.direction='a';
    } else if (key == 'd') {
        if(start.direction!='a')start.direction='d';
    } else if(key == 'w'){
        if(start.direction!='s')start.direction='w';
    } else if(key == 's'){
        if(start.direction!='w')start.direction='s';
    } else if(key == 'p'){
        start.direction='p';
    }
    return false; // prevent any default behavior
}

$("#pause").click(function(){
    pause=!pause;
});