Webcam.set({
    width:300,
    height: 250,
    image_format: 'png',
    image_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'/>";
    });
}
console.log("ml5: ", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/gYIo6gKWI/model.json", modelLoaded);

function modelLoaded() {
    console.log("Ml5 model has been loaded!");
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotLoaded);
}
function gotLoaded(error, result) {
    if(error) {
        console.error(error);
    } else {
        console.log(result);
        document.getElementById("object1").innerHTML = result[0].label;
        document.getElementById("accuracy1").innerHTML = result[0].confidence.toFixed(3);
        document.getElementById("object2").innerHTML = result[1].label;
        document.getElementById("accuracy2").innerHTML = result[1].confidence.toFixed(3);
    }
}