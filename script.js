

let mute = false
let mystream;
//client  creation

let client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
});
// client init
client.init("dfba5d6957c5420a85923c6676cdb006");

client.join(
    "006dfba5d6957c5420a85923c6676cdb006IACWYoywSH7yGu8T0OWF/iwCrDwhzFQ+bUy5A+mMERgF0KDfQtYAAAAAEADQXSp/c8HuYAEAAQBywe5g",
     "demo",
    null,
       (uid)=>{
        let localStream = AgoraRTC.createStream({
         audio: true,
         video: true,
        });
        localStream.init(()=>{
            mystream = localStream;
            localStream.play("local");
            client.publish(localStream);
        });
  });

client.on("stream-added", function(evt){
    client.subscribe(evt.stream);
});
// Play the remote stream when it is subsribed
client.on("stream-subscribed", function(evt){
    let stream = evt.stream;
    let streamId = String(stream.getId());
    let right = document.getElementById('remote');
    let div = document.createElement('div');
    div.id = streamId;
    right.appendChild(div);
    stream.play(streamId);
});


function muteAudio() {
    mystream.muteAudio();
}

function unmuteAudio() {
    mystream.unmuteAudio();
}

