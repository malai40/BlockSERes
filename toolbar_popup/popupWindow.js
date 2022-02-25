
/*
Button is on by default.
If user turns button off, reload the page without blocking.
If user turns button on, reload the page with blocking.
*/
function toggleBlocking(event) {
	if (document.getElementById('block-toggle"').checked) {
        /* reload the page without blocking */
    } else {
    	/* reload the page with blocking */
    }
}
/*
document.querySelector("#block-toggle").addEventListener("click", toggleBlocking);
*/

var goButton = document.querySelector("#go-settings");
goButton.addEventListener("click", () => {
    browser.runtime.openOptionsPage();
});