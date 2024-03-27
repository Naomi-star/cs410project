const container = document.querySelector(".container"), // Selects the element with class "container"
mainVideo = container.querySelector("video"), // Selects the <video> element within the container
videoTimeline = container.querySelector(".video-timeline"), // Selects the element with class "video-timeline" within the container
progressBar = container.querySelector(".progress-bar"), // Selects the progress bar element within the container
volumeBtn = container.querySelector(".volume i"), // Selects the volume button icon within the container
volumeSlider = container.querySelector(".left input"), // Selects the volume slider within the container
currentVidTime = container.querySelector(".current-time"), // Selects the element displaying current video time within the container
videoDuration = container.querySelector(".video-duration"), // Selects the element displaying video duration within the container
skipBackward = container.querySelector(".skip-backward i"), // Selects the skip backward button icon within the container
skipForward = container.querySelector(".skip-forward i"), // Selects the skip forward button icon within the container
playPauseBtn = container.querySelector(".play-pause i"), // Selects the play/pause button icon within the container
speedBtn = container.querySelector(".playback-speed span"), // Selects the playback speed button icon within the container
speedOptions = container.querySelector(".speed-options"), // Selects the speed options menu within the container
pipBtn = container.querySelector(".pic-in-pic span"), // Selects the picture-in-picture button icon within the container
fullScreenBtn = container.querySelector(".fullscreen i"); // Selects the fullscreen button icon within the container

let timer; // Declares a variable for a timer


const hideControls = () => { // Defines a function to hide video controls
    if(mainVideo.paused) return; // If the video is paused, return
    timer = setTimeout(() => { // Set a timeout to hide controls after 3 seconds
        container.classList.remove("show-controls"); // Remove the class to hide controls
    }, 3000);
}
hideControls(); // Call the hideControls function initially

container.addEventListener("mousemove", () => { // Listens for mouse movement on the container
    container.classList.add("show-controls"); // Adds a class to show controls
    clearTimeout(timer); // Clears any existing timeout
    hideControls(); // Calls the hideControls function again
});

const formatTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`;
}

videoTimeline.addEventListener("mousemove", e => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

mainVideo.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
}

volumeBtn.addEventListener("click", () => {
    if(!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    if(e.target.value == 0) {
        return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});

document.addEventListener("click", e => {
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded") {
        speedOptions.classList.remove("show");
    }
});

fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement) {
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
});

speedBtn.addEventListener("click", () => speedOptions.classList.toggle("show"));
pipBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());
skipBackward.addEventListener("click", () => mainVideo.currentTime -= 5);
skipForward.addEventListener("click", () => mainVideo.currentTime += 5);
mainVideo.addEventListener("play", () => playPauseBtn.classList.replace("fa-play", "fa-pause"));
mainVideo.addEventListener("pause", () => playPauseBtn.classList.replace("fa-pause", "fa-play"));
playPauseBtn.addEventListener("click", () => mainVideo.paused ? mainVideo.play() : mainVideo.pause());
videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar));