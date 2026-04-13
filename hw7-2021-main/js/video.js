var video;

var SPEED_SLOW_FACTOR = 0.9;
var SPEED_FAST_FACTOR = 1 / SPEED_SLOW_FACTOR;

function updateVolumeInfo() {
	var volEl = document.querySelector("#volume");
	var slider = document.querySelector("#slider");
	if (!volEl || !video || !slider) {
		return;
	}
	if (!video.muted) {
		video.volume = Number(slider.value) / 100;
	}
	if (video.muted) {
		volEl.innerHTML = "0%";
	} else {
		volEl.innerHTML = Math.round(Number(slider.value)) + "%";
	}
}

window.addEventListener("load", function() {
	video = document.querySelector("#player1");
	if (!video) {
		return;
	}

	video.autoplay = false;
	video.removeAttribute("autoplay");
	video.loop = false;

	console.log("Video element initialized; autoplay and looping are off.");

	video.addEventListener("play", function() {
		updateVolumeInfo();
	});

	updateVolumeInfo();

	document.querySelector("#play").addEventListener("click", function() {
		var playPromise = video.play();
		updateVolumeInfo();
		if (playPromise !== undefined) {
			playPromise.then(function() {
				updateVolumeInfo();
			}).catch(function() {
				updateVolumeInfo();
			});
		}
	});

	document.querySelector("#pause").addEventListener("click", function() {
		video.pause();
	});

	document.querySelector("#slower").addEventListener("click", function() {
		video.playbackRate *= SPEED_SLOW_FACTOR;
		console.log("New playback speed: " + video.playbackRate);
	});

	document.querySelector("#faster").addEventListener("click", function() {
		video.playbackRate *= SPEED_FAST_FACTOR;
		console.log("New playback speed: " + video.playbackRate);
	});

	document.querySelector("#skip").addEventListener("click", function() {
		var dur = video.duration;
		if (!isNaN(dur) && dur > 0 && video.currentTime + 10 >= dur) {
			video.currentTime = 0;
		} else {
			video.currentTime += 10;
		}
		console.log("Current video time (seconds): " + video.currentTime);
	});

	document.querySelector("#mute").addEventListener("click", function() {
		video.muted = !video.muted;
		var btn = document.querySelector("#mute");
		if (video.muted) {
			btn.innerHTML = "Unmute";
		} else {
			btn.innerHTML = "Mute";
		}
		updateVolumeInfo();
	});

	document.querySelector("#slider").addEventListener("input", function() {
		var v = this.value / 100;
		video.volume = v;
		if (v > 0) {
			video.muted = false;
			document.querySelector("#mute").innerHTML = "Mute";
		}
		updateVolumeInfo();
	});

	document.querySelector("#vintage").addEventListener("click", function() {
		video.classList.add("oldSchool");
	});

	document.querySelector("#orig").addEventListener("click", function() {
		video.classList.remove("oldSchool");
	});
});
