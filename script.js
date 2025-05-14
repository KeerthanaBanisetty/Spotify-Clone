console.log('hi babe');
let abc=new Audio();
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid input";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
    // Use backticks (``) for string interpolation
    return`${formattedMinutes}:${formattedSeconds}`;
}
async function getsongs() {
    let s=await fetch("http://127.0.0.1:5500/general.html");
    let response=await s.text();
    let div= document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    let songs=[];
    for(let n=0;n<as.length;n++){
        const element=as[n];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("http://127.0.0.1:5500/songs/")[1])
        }
    }
    return songs;

}
const playmusic=(track,pause=false)=>{
    // Make sure there are no leading or trailing spaces in the 'track' variable
abc.src = "/songs/" + track.trim();  // Fix spaces

// Attempt to play the audio
abc.play().catch(error => {
console.error("Error playing audio:", error);
});

    if(!pause){
        abc.play()
        play.src="pause.svg"
    }
    document.querySelector(".songinfo").innerHTML=track
    document.querySelector(".songtime").innerHTML="00:00"
}
    
async function main() {
    let songs=await getsongs();
    playmusic(songs[0],true)
    let songul=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for(const song of songs){
        songul.innerHTML=songul.innerHTML+`<li style="list-style: none;">
                    <img class="invert"  src="./musiclogo.svg" style="width: 25px;" >
                    <div class="info">
                        <div style="padding-top: 2vh;">
                            ${song}
                        </div>
                    </div>
                    
                    <img class="invert" src="./play.svg" style="width: 25px;margin:5px">
                </li>`
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e =>{
        e.addEventListener("click",element =>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML)
        })
    });
    //attach a event listner to each song
Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click",element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playmusic(e.querySelector(".info").firstElementChild.innerHTML)

        
    })
});
 //attach a event lister to play next song or previous
play.addEventListener("click",()=>{
    if(abc.paused){
        abc.play()
        play.src="pause.svg"
    }
    else{
        abc.pause()
        play.src="play.svg"
    }
})
//play the first song
// var audio=new Audio(songs[0]);
//audio.play();

// audio.addEventListener("loadeddata",()=>{
//     console.log(audio.duration,audio.currentSrc,audio.currentTime)
// });
//listen fot time update event
abc.addEventListener ("timeupdate", ()=>{
console.log(abc.currentTime, abc.duration);
document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(abc.
    currentTime)}/${secondsToMinutesSeconds(abc.duration)}`
    document.querySelector(".circle").style.left=(abc.currentTime / abc.duration)*100 +"%";
    
})
//add a event lister for seekbar
document.querySelector(".seekbar").addEventListener("click",e=>{
let percent=(e.offsetX / e.target.getBoundingClientRect().width) * 100
document.querySelector(".circle").style.left = percent+ "%";
abc.currentTime=((abc.duration)*percent)/100
})
    
    
}

main()
