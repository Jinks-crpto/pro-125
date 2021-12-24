song1="";
song2="";
leftwristx="";
leftwristy="";
rightwristx="";
rightwristy="";
scoreLeftwrist=0;
scoreRightwrist=0;
song1_status="";
song2_status="";

function setup()
 { canvas = createCanvas(600, 500);
     canvas.center(); 
     video = createCapture(VIDEO); 
     video.hide(); 

     poseNet=ml5.poseNet(video,modelLoaded);
     poseNet.on('pose', gotPoses)
    }

    function modelLoaded(){
        console.log('PoseNet Is Initalized');
    }
    function gotPoses(results){
        if(results.length>0)
        {
            console.log(results);
            scoreLeftwrist=results[0].pose.keypoints[10].score;
            scoreRightwrist=results[0].pose.keypoints[9].score;
            console.log("scoreLeftwrist = " + scoreLeftwrist + "scoreRightwrist" + scoreRightwrist );

            leftwristx=results[0].pose.leftWrist.x;
            leftwristy=results[0].pose.leftWrist.y;
            console.log("leftwristx = " + leftwristx +"leftwristy = " + leftwristy);
            
            rightwristx=results[0].pose.rightWrist.x;
            rightwristy=results[0].pose.rightWrist.y;
            console.log("rightwristx = " + rightwristx +"rightwristy = " + rightwristy);
        
        }
    }

     function draw(){
image(video,0,0,600,500);

fill("#ff0000");
stroke("#ff0000");

if(scoreRightwrist > 0.2) {
     circle(rightwristx,rightwristy,20);
    song2.stop();
    if(song1_status == false) { song1.play(); 
    document.getElementById("song1").innerHTML = "Playing - Harry Potter Theme Song" } 
    }
    if(scoreLeftwrist > 0.2) {
        circle(leftwristx,leftwristy,20);
       song1.stop();
       if(song2_status == false) { song2.play(); 
       document.getElementById("song2").innerHTML = "Playing - Peter Pan Follow The Leader Song" } }}

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("PeterPan.mp3");
}

function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);

}
     
