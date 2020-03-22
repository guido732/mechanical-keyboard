// document.querySelectorAll(".key").forEach(key => {
// 	key.addEventListener("mousedown", togglePress);
// 	key.addEventListener("mouseup", toggleRelease);
// });

// function togglePress(e) {
// 	e.target.closest(".key").classList.add("key--pressed");
// }
// function toggleRelease(e) {
// 	e.target.closest(".key").classList.remove("key--pressed");
// }

document.addEventListener("keydown", function(event) {
	const key = event.code;
	console.log(key);
	document.querySelector(`[data-key='${key}']`).classList.add("key--pressed");
});
document.addEventListener("keyup", function(event) {
	const key = event.code;
	// console.log(key);
	document.querySelector(`[data-key='${key}']`).classList.remove("key--pressed");
	if (key === "Escape") {
		clearPressed();
	}
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
