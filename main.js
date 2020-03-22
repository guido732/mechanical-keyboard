// Keypress animation
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
	if (key === "Escape") {
		clearPressed();
		closePanel();
	}
});
// Clear all keys on click outside of keyboard
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
// Expansion panel
const $accordeonBtn = document.querySelector(".options__button");
const $panel = document.querySelector(".options__panel");
$accordeonBtn.addEventListener("click", togglePanelVisibility);
// Toggle backlight
const $backlight = document.querySelector("#backlight");
$backlight.checked = false;
$backlight.addEventListener("change", toggleBacklight);

function clearPressed() {
	document.querySelectorAll(".key").forEach(key => key.classList.remove("key--pressed"));
}
function getRandomAudio() {
	const number = Math.floor(Math.random() * 5) + 1;
	return number;
}
function togglePanelVisibility() {
	this.classList.toggle("active");
	if ($panel.style.maxHeight) {
		$panel.style.maxHeight = null;
		$accordeonBtn.textContent = "Show options";
	} else {
		$panel.style.maxHeight = $panel.scrollHeight + "px";
		$accordeonBtn.textContent = "Hide options";
	}
}
function closePanel() {
	$backlight.classList.remove("active");
	$panel.style.maxHeight = null;
	$accordeonBtn.textContent = "Show options";
}
function toggleBacklight() {
	const $keyboard = document.querySelectorAll(".keyboard__section");
	this.checked
		? $keyboard.forEach(section => section.classList.add("keyboard__section--backlight-active"))
		: $keyboard.forEach(section => section.classList.remove("keyboard__section--backlight-active"));
}
