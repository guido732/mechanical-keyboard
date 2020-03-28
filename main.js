(() => {
	// Local Vars
	const colorThemes = { coral: "coral-sea", sky: "sky-city", jungle: "jungle-mystery" };
	let movingBackgroundElements = [];
	let rotatingBackgroundElements = [];
	// DOM Cache
	const $containerCoral = document.querySelector(".background__container--coral");
	const $containerSky = document.querySelector(".background__container--sky");
	const $containerJungle = document.querySelector(".background__container--jungle");
	const $stylesheet = document.querySelector("#stylesheet");
	const $keyboard = document.querySelector(".keyboard");
	const $selector = document.querySelector("#pallete");
	const $inputBar = document.querySelector("#input-bar");
	const $backlight = document.querySelector("#backlight");
	const $accordeonBtn = document.querySelector(".options__button");
	const $panel = document.querySelector(".options__panel");
	const activeTheme = getTheme();
	const $loadscreen = document.querySelector(".loadscreen");
	const $longOnly = document.querySelectorAll(".keyboard-long-only");
	const $shortOnly = document.querySelectorAll(".keyboard-short-only");
	const $sizeToggle = document.querySelector("#length");
	const activeSize = getKeyboardSize();
	const $shiftRight = document.querySelector("#shift-right");
	const $bottomRightControls = document.querySelectorAll(".keyboard-short-grow");

	// Events
	// Keypress animation
	document.addEventListener("keydown", function(e) {
		e.preventDefault();
		const key = e.code;
		const repeat = e.repeat;
		if (!repeat) {
			const audio = document.querySelector(`[data-audio="${getRandomAudio()}"]`);
			audio.currentTime = 0;
			audio.play();
			document.querySelector(`[data-key='${key}']`).classList.add("key--pressed");
			moveBackgroundelements(movingBackgroundElements);
			rotateBackgroundelements(rotatingBackgroundElements);
		}
		$inputBar.focus();
	});
	document.addEventListener("keyup", function(e) {
		const key = e.code;
		document.querySelector(`[data-key='${key}']`).classList.remove("key--pressed");
		if (key === "Escape") {
			clearPressed();
			closePanel();
		}
	});
	// Clear all keys on click outside of keyboard
	document.addEventListener("click", e => {
		const keyboard = document.querySelector(".keyboard");
		let targetElement = e.target; // clicked element
		do {
			if (targetElement == keyboard) {
				return;
			}
			targetElement = targetElement.parentNode;
		} while (targetElement);
		clearPressed();
	});

	// On Load Event
	setTheme(activeTheme);
	handleBackground(activeTheme);
	handleBackgroundElements(activeTheme);
	handleKeyboardSize(activeSize);
	// Handle loadscreen
	window.onload = () => {
		document.querySelector(".keyboard").classList.remove("hidden");
		document.querySelector(".options").classList.remove("hidden");
		document.querySelector(".background").classList.remove("hidden");
		$loadscreen.classList.add("fade");
		setTimeout(() => {
			$loadscreen.parentNode.removeChild($loadscreen);
		}, 1000);
	};
	// Expansion panel
	$accordeonBtn.addEventListener("click", togglePanelVisibility);
	// Toggle backlight
	$backlight.checked = false;
	$backlight.addEventListener("change", toggleBacklight);
	// Theme Selector
	$selector.addEventListener("change", () => {
		const theme = $selector.value;
		setTheme(theme);
		handleBackground(theme);
		handleBackgroundElements(theme);
	});
	// Toggle keyboard Size
	$sizeToggle.addEventListener("change", () => {
		const value = $sizeToggle.checked;
		handleKeyboardSize(value);
	});

	// Functions and methods
	function clearPressed() {
		document.querySelectorAll(".key").forEach(key => key.classList.remove("key--pressed"));
	}
	// TODO: Refactor using length of querySelectorAll of audio atributes
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
	function setTheme(theme) {
		$stylesheet.setAttribute("href", `./styles/${colorThemes[theme]}.min.css`);
	}
	function getTheme() {
		return $selector.value;
	}
	function getKeyboardSize() {
		return $sizeToggle.checked;
	}
	function handleBackground(theme) {
		switch (theme) {
			case "sky":
				$containerCoral.classList.add("hidden");
				$containerJungle.classList.add("hidden");
				$containerSky.classList.remove("hidden");
				break;
			case "coral":
				$containerCoral.classList.remove("hidden");
				$containerJungle.classList.add("hidden");
				$containerSky.classList.add("hidden");
				break;
			case "jungle":
				$containerCoral.classList.add("hidden");
				$containerJungle.classList.remove("hidden");
				$containerSky.classList.add("hidden");
				break;
			default:
				console.log("Si estás viendo ésto, algo malió sal");
				break;
		}
	}
	function handleBackgroundElements(theme) {
		movingBackgroundElements = [];
		rotatingBackgroundElements = [];
		const rotatingElements = document.querySelectorAll(`.background__container--${theme} .rotating`);
		const movingElements = document.querySelectorAll(`.background__container--${theme} .moving`);
		rotatingElements.forEach(element => rotatingBackgroundElements.push(element));
		movingElements.forEach(element => movingBackgroundElements.push(element));
	}
	function handleKeyboardSize(value) {
		if (value) {
			// Short Keyboard
			console.log("short");

			$keyboard.classList.add("short");
			$keyboard.classList.remove("large");
			$shiftRight.classList.remove("key--4");
			$shiftRight.classList.add("key--7");
			$bottomRightControls.forEach(element => element.classList.add("key--2"));
		} else {
			// Large Keyboard
			console.log("large");
			$keyboard.classList.remove("short");
			$keyboard.classList.add("large");
			$shiftRight.classList.remove("key--7");
			$shiftRight.classList.add("key--4");
			$bottomRightControls.forEach(element => element.classList.remove("key--2"));
		}
	}
})();
