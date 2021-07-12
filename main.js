objects = [];
status = "";
function preload()
{
    song = loadSound("alarm.mp3");
}
function setup() {
  canvas = createCanvas(380, 380);
  canvas.position(390,100);
  video = createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          if(objects[i].label == "person")
          {
            document.getElementById("baby_detected_or_not_detected").innerHTML = "Baby Found";
            console.log("stop");
            song.stop();
          }
          else
          {
            document.getElementById("baby_detected_or_not_detected").innerHTML = "Baby Not Found";
            console.log("play"); 
            song.play();
            song.volume(0.5);
          }
         }
        if(objects.length == 0)
        {
          document.getElementById("baby_detected_or_not_detected").innerHTML = "Baby Not Found";
          console.log("play"); 
          song.play();
          song.volume(0.5);
        }
      }
}
function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}
function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}