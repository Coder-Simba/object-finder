objects=[]
status=""
function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
   video=createCapture(VIDEO);
   video.size(380, 380);
   video.hide()

}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML="Status : Detecting Objects";
   object_name=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("Model Loaded!")
    status=true;
    objectDetector.detect(video, gotResult);
}


function draw(){
    image(video, 0, 0, 380, 380);

    if(status !=""){
        r= random(255);
        g= random(225);
        b= random(225);
        objectDetector.detect(video, gotResult);
       for(i=0; i< objects.length; i++){
        document.getElementById("status").innerHTML="Status : Object Detected";
        fill(r,g,b);
        percent = floor(objects[i].confidence*100);
        text(objects[i].label+""+percent+"%",objects[i].x, objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(results[i].label==object_name){
            document.getElementById("object_status").innerHTML=object_name+"found :)" ;
            
        }
        else{
            document.getElementById("object_status").innerHTML=object_name+"Not found :(";
            
        }
       }
    }
}


function gotResult(error, results){
    if(error){
        console.log(error);

    }
    console.log(results);
    objects=results;
}   