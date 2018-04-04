(() => {
console.log("got videos");

//add to string prototype to cap first letter
String.prototype.capIt = function() {return this.replace(this.charAt(), this.charAt().toUpperCase());};

const sigils = document.querySelectorAll('.sigilContainer'),
	  lightbox = document.querySelector('.lightbox'),
	  closeLightbox = lightbox.querySelector('.close-lightbox'),
	  vidPlayer = document.querySelector('video'),
		tagline = document.querySelector('h1'),
		playPause = document.querySelector('.play-pause'),
		ffWd = document.querySelector('.forward'),
		rWnd = document.querySelector('.rewind'),
		imageBanner = document.querySelector('#houseImages');


//methods/ functions
function loadMovie(){
	//1.turn on light box
	lightbox.classList.add('show-lightbox');

//2.grab the right video based on class name- split yields name
	var house = this.className.split(' ')[1].capIt();
	tagline.innerHTML = house;

//3. put the path toegther and make the video load and play

	vidPlayer.src = `videos/House-${house}.${vidPlayer.currentSrc.split('.')[1]}`;

	vidPlayer.load();
	vidPlayer.play();

	animateBanners(this.dataset.offset);
}
function animateBanners(offset){
	//debugger;
	console.log(600 * offset);

	imageBanner.style.right = (offset * 600) + "px";
}

function closeLBox(){
	lightbox.classList.remove('show-lightbox');
	vidPlayer.pause();
	vidPlayer.currentTime=0;
}

function togglePlay(){
	//debugger;
	var theSVG = this.firstElementChild;

	if (vidPlayer.paused) {
		vidPlayer.play();
		theSVG.dataset.icon = "pause-circle";
	}
	else{
		vidPlayer.pause();
		theSVG.dataset.icon = "play-circle";
	}

}

function ffWdVid(){
	vidPlayer.currentTime +=15;
}

function rWdVid(){
	vidPlayer.currentTime -=15;
}

//events
sigils.forEach(sigil => sigil.addEventListener('click', loadMovie));
closeLightbox.addEventListener('click', closeLBox);

vidPlayer.addEventListener('ended',closeLBox);

playPause.addEventListener('click', togglePlay);

rWnd.addEventListener('click', rWdVid);

ffWd.addEventListener('click', ffWdVid);
})();
