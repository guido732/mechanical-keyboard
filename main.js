document.addEventListener("keydown", function(event) {
	const key = event.code;
	const audio = document.querySelector(`[data-audio="${getRandomAudio()}"]`);
	audio.currentTime = 0;
	audio.play();
	document.querySelector(`[data-key='${key}']`).classList.add("key--pressed");
});
document.addEventListener("keyup", function(event) {
	const key = event.code;
	document.querySelector(`[data-key='${key}']`).classList.remove("key--pressed");
	key === "Escape" && clearPressed();
});

document.addEventListener("click", evt => {
	const keyboard = document.querySelector(".keyboard");
	let targetElement = evt.target; // clicked element
	do {
		if (targetElement == keyboard) {
			console.log("clicked inside keyboard");

			return;
		}
		targetElement = targetElement.parentNode;
	} while (targetElement);
	clearPressed();
});

function clearPressed() {
	document.querySelectorAll(".key").forEach(key => key.classList.remove("key--pressed"));
}

const getRandomAudio = () => {
	const number = Math.floor(Math.random() * 5) + 1;
	return number;
};
