let socket = io("/");
let lang = navigator.language || navigator.userLanguage;
console.log("Language: " + lang);
let peer = new Peer();

$(document).ready(() => {
  console.log("Document ready!!!");
  $("#divLocal").hide();
  $("#divOnline").hide();
  $("#divRemote").hide();
  let speechRec = new p5.SpeechRec(lang, gotSpeech);
  //console.log(speechRec);

  //Call bang click
  $("#ulUser").on("click", "li", function () {
    let id = $(this).attr("id");
    openStream().then((stream) => {
      playStreamLocal("localStream", stream);
      let call = peer.call(id, stream);
      call.on("stream", (remoteStream) => {
        playStreamRemote("remoteStream", remoteStream);
      });
    });
    $("#divRemote").show();
    $("#divSignUp").hide();
    socket.on("server-gui-text", (text) => {
      $("#txtRemoteSpeech").html(text);
    });
  });

  //ai-do-ngat-ket-noi
  socket.on("ai-do-ngat-ket-noi", (peerID) => {
    $(`#${peerID}`).remove();
  });

  //danh-sach-online
  socket.on("danh-sach-online", (arrUserInfo) => {
    $("#divLocal").show();
    $("#divOnline").show();
    arrUserInfo.forEach((user) => {
      let { ten, peerID } = user;
      $("#ulUser").append(`<li id='${peerID}'>${ten}</li>`);
    });

    //co-nguoi-dung-moi
    socket.on("co-nguoi-dung-moi", (user) => {
      let { ten, peerID } = user;
      $("#ulUser").append(`<li id='${peerID}'>${ten}</li>`);
    });
  });

  //dang-ki-that-bai
  socket.on("dang-ki-that-bai", (username) => {
    alert(`${username} da duoc dang ki. Vui long chon username khac`);
  });

  peer.on("open", (id) => {
    console.log("Peer: " + id);
    //btnSignUp
    $("#btnSignUp").click(() => {
      let username = $("#txtUserName").val().trim();
      socket.emit("nguoi-dung-dang-ki", { ten: username, peerID: id });
    });
  });

  //Caller
  $("#btnCall").click(() => {
    let id = $("#remoteID").val();
    openStream().then((stream) => {
      playStreamLocal("localStream", stream);
      let call = peer.call(id, stream);
      call.on("stream", (remoteStream) => {
        playStreamRemote("remoteStream", remoteStream);
      });
    });
  });

  //Answer
  peer.on("call", (call) => {
    openStream().then((stream) => {
      call.answer(stream);
      playStreamLocal("localStream", stream);
      call.on("stream", (remoteStream) => {
        playStreamRemote("remoteStream", remoteStream);
      });
      socket.on("server-gui-text", (text) => {
        $("#txtRemoteSpeech").html(text);
      });
    });
    $("#divRemote").show();
    $("#divSignUp").hide();
  });

  function gotSpeech() {
    if (speechRec.resultValue) {
      //console.log(speechRec.resultString);
      $("#txtLocalSpeech").html(speechRec.resultString);
      socket.emit("local-gui-text", speechRec.resultString);
    }
  }

  function openStream() {
    let config = { audio: true, video: true };
    return navigator.mediaDevices.getUserMedia(config);
  }

  function playStreamRemote(idVideo, stream) {
    let video = document.getElementById(idVideo);
    video.srcObject = stream;
    video.play();
  }

  function playStreamLocal(idVideo, stream) {
    speechRec.continuous = true; // turn continuous off!
    speechRec.interimResults = true;
    speechRec.start();
    console.log("Speech started");
    //speechRec.onError = restartOnErr;
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

  //openStream().then((stream) => playStream("localStream", stream));
});
