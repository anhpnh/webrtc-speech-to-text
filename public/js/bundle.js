!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){let n=io("/"),o=navigator.language||navigator.userLanguage;console.log("Language: "+o);let r=new Peer;$(document).ready(()=>{console.log("Document ready!!!"),$("#divLocal").hide(),$("#divOnline").hide(),$("#divRemote").hide();let e=new p5.SpeechRec(o,(function(){e.resultValue&&($("#txtLocalSpeech").html(e.resultString),n.emit("local-gui-text",e.resultString))}));function t(){return navigator.mediaDevices.getUserMedia({audio:!0,video:!0})}function i(e,t){let n=document.getElementById(e);n.srcObject=t,n.play()}function l(t,n){e.continuous=!0,e.interimResults=!0,e.start(),console.log("Speech started"),e.onEnd=a;let o=document.getElementById(t);o.srcObject=n,o.play()}function a(){e.start(),console.log("Speech onEnd restarted")}$("#ulUser").on("click","li",(function(){let e=$(this).attr("id");t().then(t=>{l("localStream",t),r.call(e,t).on("stream",e=>{i("remoteStream",e)})}),$("#divRemote").show(),$("#divSignUp").hide(),n.on("server-gui-text",e=>{$("#txtRemoteSpeech").html(e)})})),n.on("ai-do-ngat-ket-noi",e=>{$("#"+e).remove()}),n.on("danh-sach-online",e=>{$("#divLocal").show(),$("#divOnline").show(),e.forEach(e=>{let{ten:t,peerID:n}=e;$("#ulUser").append(`<li id='${n}'>${t}</li>`)}),n.on("co-nguoi-dung-moi",e=>{let{ten:t,peerID:n}=e;$("#ulUser").append(`<li id='${n}'>${t}</li>`)})}),n.on("dang-ki-that-bai",e=>{alert(e+" da duoc dang ki. Vui long chon username khac")}),r.on("open",e=>{console.log("Peer: "+e),$("#btnSignUp").click(()=>{let t=$("#txtUserName").val().trim();n.emit("nguoi-dung-dang-ki",{ten:t,peerID:e})})}),$("#btnCall").click(()=>{let e=$("#remoteID").val();t().then(t=>{l("localStream",t),r.call(e,t).on("stream",e=>{i("remoteStream",e)})})}),r.on("call",e=>{t().then(t=>{e.answer(t),l("localStream",t),e.on("stream",e=>{i("remoteStream",e)}),n.on("server-gui-text",e=>{$("#txtRemoteSpeech").html(e)})}),$("#divRemote").show(),$("#divSignUp").hide()})})}]);