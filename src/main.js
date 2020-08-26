let socket = io("/");
let lang = navigator.language || navigator.userLanguage;
console.log("Language: " + lang);
$(document).ready(() => {
  console.log("Document ready!!!");
  //$("#divRemote").hide();
  let speechRec = new p5.SpeechRec(lang, gotSpeech);
  //console.log(speechRec);

  function gotSpeech() {
    if (speechRec.resultValue) {
      //console.log(speechRec.resultString);
      $("#txtLocalSpeech").html(speechRec.resultString);
    }
  }

  function openStream() {
    let config = { audio: true, video: true };
    return navigator.mediaDevices.getUserMedia(config);
  }

  function playStream(idVideo, stream) {
    speechRec.continuous = true; // turn continuous off!
    speechRec.interimResults = true;
    speechRec.start();
    console.log("Speech started");
    speechRec.onError = restartOnErr;
    speechRec.onEnd = restartOnEnd;
    //console.log(speechRec);
    let video = document.getElementById(idVideo);
    video.srcObject = stream;
    video.play();
  }

  function restartOnErr() {
    speechRec.start();
    console.log("Speech onError restarted");
  }

  function restartOnEnd() {
    speechRec.start();
    console.log("Speech onEnd restarted");
  }

  openStream().then((stream) => playStream("localStream", stream));
});
