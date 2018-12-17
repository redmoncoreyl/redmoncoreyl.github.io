var radius;
var secondAngle;
var minuteAngle;
var hourAngle;

function setup() {
  createCanvas(600,600);
  
  radius = min(width/2, height/2) * 0.9;
}

function draw() {
  background(240);
  
  // clock circle
  translate(width/2,height/2);
  strokeWeight(5);
  stroke(0);
  noFill();
  ellipse(0, 0, radius*2, radius*2);
  
  // tick marks
  strokeWeight(2);
  for (var i = 0; i < 12; i++) {
    line(radius*0.9, 0, radius, 0);
    rotate(PI/6);
  }
  
  secondAngle = map(second(),0,60,PI/2,-3*PI/2);
  minuteAngle = map(minute()+second()/60,0,60,PI/2,-3*PI/2);
  hourAngle = map(hour()+minute()/60,0,24,PI/2,-7*PI/2);
  
  // second hand
  stroke(255,0,0);
  strokeWeight(2);
  rotate(-secondAngle);
  line(0, 0, 0.95*radius, 0);
  
  // minute hand
  stroke(0);
  strokeWeight(4);
  rotate(-minuteAngle+secondAngle);
  line(0, 0, 0.8*radius, 0);
  
  // hour hand
  strokeWeight(5);
  rotate(-hourAngle+minuteAngle);
  line(0, 0, 0.5*radius, 0);
}