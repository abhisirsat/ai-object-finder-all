objects=[];

function preload(){

    
  
}

function setup(){

canvas = createCanvas(480 ,380);
canvas.center();
video=createCapture(VIDEO);
video.size(480,380);
video.hide();  
}

function detect(){
    
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : detecting object";
    object=document.getElementById("class").value;
}

function modelLoaded(){
    
        console.log("modelLoaded");
     status=true;
}

function gotResult(error, results){

if(error){

    console.log(error);
}

else{

    console.log(results);
    objects=results;
}

}

function draw(){

        image(video , 0, 0,480 ,380);
        
        if(status !=""){
    
            objectDetector.detect(video,gotResult);
            
            for(i=0;i < objects.length;i++){
            
            document.getElementById("status").innerHTML="status : objects detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are : " + objects.length;
            
            fill("#0000FF");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent +"%" ,objects[i].x + 15 ,objects[i].y + 15);
            noFill();
            stroke("00FF00");
            rect(objects[i].x, objects[i].y ,objects[i].width ,objects[i].height);

             if(objects[i].label==object){

                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML=object +" found";
                synth=window.speechSynthesis;
                utterthis=new SpeechSynthesisUtterance(object + " found");
                synth.speak(utterthis);
             }
             else{

                document.getElementById("status").innerHTML=object +" object not found";

             }
}

        

}

}
           

