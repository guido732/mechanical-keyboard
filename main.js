// Local Vars
const colorThemes = { coral: "coral-sea", sky: "sky-city", jungle: "jungle-mystery" };
// DOM Cache
const $containerCoral = document.querySelector("background__container--coral");
const $containerSky = document.querySelector("background__container--sky");
const $containerJungle = document.querySelector("background__container--jungle");
const $stylesheet = document.querySelector("#stylesheet");
const $selector = document.querySelector("#pallete");
const $backlight = document.querySelector("#backlight");
const $accordeonBtn = document.querySelector(".options__button");
const $panel = document.querySelector(".options__panel");

// Keypress animation
document.addEventListener("keydown", function(event) {
	const key = event.code;
	const audio = document.querySelector(`[data-audio="${getRandomAudio()}"]`);
	audio.currentTime = 0;
	audio.play();
	document.querySelector(`[data-key='${key}']`).classList.add("key--pressed");
	moveBackgroundelements(document.querySelectorAll(".background__element--wave"));
	rotateBackgroundelements(document.querySelectorAll(".background__element--blob__svg"));
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
			return;
		}
		targetElement = targetElement.parentNode;
	} while (targetElement);
	clearPressed();
});

// Expansion panel
$accordeonBtn.addEventListener("click", togglePanelVisibility);

// Toggle backlight
$backlight.checked = false;
$backlight.addEventListener("change", toggleBacklight);

// Theme Selector
$selector.value = "coral"; //sets default value in case page is reloaded so it defaults to coral sea
$selector.addEventListener("change", setTheme);

function clearPressed() {
	document.querySelectorAll(".key").forEach(key => key.classList.remove("key--pressed"));
}
// Refactor using length of querySelectorAll of audio atributes
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
function moveBackgroundelements(elements) {
	elements.forEach(element => {
		const rand = Math.random() * Math.random();
		let position = +element.getAttribute(["data-posx"]);
		let direction = element.getAttribute(["data-dir"]);
		if (position + rand >= 50 && direction === "ltr") {
			element.setAttribute(["data-dir"], "rtl");
			direction = "rtl";
		}
		if (position - rand <= 0 && direction === "rtl") {
			element.setAttribute(["data-dir"], "ltr");
			direction = "ltr";
		}
		if (direction === "ltr") {
			element.setAttribute(["data-posx"], position + rand);
			element.style.transform = `translateX(${position + rand}%)`;
			if (position >= 50) {
				element.setAttribute(["data-dir"], "rtl");
			}
		} else if (direction === "rtl") {
			element.setAttribute(["data-posx"], position - rand);
			element.style.transform = `translateX(${position - rand}%)`;
			if (position <= 0) {
				element.setAttribute(["data-dir"], "ltr");
			}
		}
	});
}
function rotateBackgroundelements(elements) {
	elements.forEach(element => {
		const rotation = +element.getAttribute(["data-rotation"]);
		const rand = Math.random();
		element.style.transform = `rotate(${rotation + rand}deg)`;
		element.setAttribute(["data-rotation"], rotation + rand);
	});
}
function setTheme(e) {
	const theme = e.target.value;
	$stylesheet.setAttribute("href", `./styles/${colorThemes[theme]}.min.css`);
	switch (theme) {
		case "sky":
			break;
		case "coral":
			break;
		case "jungle":
			break;
		default:
			console.log("Si estás viendo ésto, algo malió sal");
			break;
	}
}
function getTheme() {
	const activeStylesheet = $stylesheet
		.getAttribute("href")
		.split("/")[2]
		.split(".")[0];
	return activeStylesheet;
}
