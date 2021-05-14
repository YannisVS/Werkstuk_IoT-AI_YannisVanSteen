"use strict";

let mobilenet;
let video;
let label;

function modelReady() {
  console.log('Model is ready!');
  mobilenet.predict(gotResults);
}

function gotResults(error, results) {

  results.forEach(element => {
    if (element.probability >= 0.7) {
      console.log("Prediction ready");
      console.log("chance of it being " + element.className + " are " + element.probability);
      label = createP("chance of it being " + element.className + " are " + element.probability);
    }
  });
  setTimeout(function () {
    mobilenet.predict(gotResults);
  }, 1000);

}

// function imageReady() {
//   image(puffin, 0, 0, width, height);
// }

function setup() {
  let canvas = createCanvas(640, 550);
  canvas.parent("container");
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  label = createP('Loading model and video...');
  label = createP('History:');
  mobilenet = ml5.imageClassifier("MobileNet", video, modelReady);
}

function draw() {
  background(0);
  image(video, 0, 0);
}