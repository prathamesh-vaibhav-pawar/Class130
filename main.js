song = ""
song2 = ""
RightWristX = 0
RightWristY = 0
LeftWristX = 0
LeftWristY = 0
ScoreLeftWrist = 0
ScoreRightWrist = 0
function preload(){
    song = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}
function setup(){
    Canvas = createCanvas(500,600)
    Canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    pose = ml5.poseNet(video,Modelloaded)
    pose.on('pose',Gotresult)
}
function Modelloaded(){
    console.log("Model loaded")
}
function draw(){
    image(video,0,0,500,600) 
    if(ScoreRightWrist < 0.2){
        circle(RightWristX,RightWristY,20)
        if(song2.isPlaying() == false){
            song.stop()
            song2.play()
            document.getElementById("Song_name").innerHTML = "Song name is "
        }
    }
    else{
        song2.stop()
    }
    if(ScoreLeftWrist < 0.2){
        circle(LeftWristX,LeftWristY,20)
        song2.stop()
        if(song.isPlaying() == false){
            song.play()
            document.getElementById("Song_name").innerHTML = "Song name is hogwards.... "
        }
    }
    else{
        song.stop()
    }
}
function Gotresult(result){
    if(result.length > 0){
        console.log(result)
        RightWristX = result[0].pose.result.RightWrist.x 
        RightWristY = result[0].pose.result.RightWrist.y 
        LeftWristX = result[0].pose.result.LeftWrist.x
        LeftWristY = result[0].pose.result.LeftWrist.y
        ScoreLeftWrist = result[0].pose.keypoints[9].score 
        ScoreRightWrist = result[0].pose.keypoints[10].score
    }
}