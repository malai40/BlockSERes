// Script to define how to hide search results on Google.
// This works on any Google website, regardless of top-level domain (e.g. .com, .co.uk).

// numRemoved: Counter to track number of blocked results
// blockedSites: Array of top-level domains to block
function googleBlock(numRemoved, blockedSites) {
	// Read in search results on Google page
	// Remember to only have the script run on a results page
	// Loop through list of blocked sites
	for (var i = 0, iMax = blockedSites.length; i < iMax; i++) {
		// Create the URLs that will be removed if found
		var resultsRemove = document.querySelectorAll('a[href*="/'+blockedSites[i]+'"], a[href*=".'+blockedSites[i]+'"], a[href*=":'+blockedSites[i]+'"], div[data-lpage*=".'+blockedSites[i]+'"');
		// Get current URL. Where am I?
		currUrl = window.location.href;
		// Loop through all results that include banned URLs
		for (var j = 0, jMax = resultsRemove.length; j < jMax; j++) {
			// Below is old way by seeing if following classes are present.
			//if (resultsRemove[j].parentElement.className == 'yuRUbf' || resultsRemove[j].parentElement.parentElement.className == 'usJj9c' || resultsRemove[j].parentElement.className == 'vLK3gc') {
			// If this is an image results page:
			if (/tbm=isch/.test(currUrl)) { //This URL can't be replicated in an honest search because '=' is always translated to '%3D' in a search query in the URL.
				// Looking for the following results:
				// resultsRemove[j].parentElement.className == 'isv-r PNCib MSM1fd BUooTd'
				try {
					resultsRemove[j].parentElement.remove();
					numRemoved++;
				} catch (error) {
					// console.log(error);
					console.log('Result pertaining to ' + resultsRemove[j].innerHTML + ' already removed.');
				}
				// TODO: What to do to keep removing images with endless scroll?
				// TODO: Show number of blocked results
				// TODO: When majority of pictures on endless scroll are blocked, endless scroll doesn't work to see if there may be more pictures that can pass the block.
			// Else if this is news results page:
			} else if (/tbm=nws/.test(currUrl)) {
				// Looking for the following results:
				// resultsRemove[j].parentElement.parentElement.parentElement.parentElement.className == 'nChh6e Dy0REb g09czf'
				try {
					resultsRemove[j].parentElement.parentElement.parentElement.parentElement.remove();
					numRemoved++;
				} catch (error) {
					// console.log(error);
					console.log('Result pertaining to ' + resultsRemove[j].innerHTML + ' already removed.');
				}
			// Else if videos results page:
			} else if (/tbm=vid/.test(currUrl)) {
				// Looking for the following results:
				// resultsRemove[j].parentElement == 'tF2Cxc'
				try {
					resultsRemove[j].parentElement.parentElement.parentElement.remove();
					numRemoved++;
				} catch (error) {
					// console.log(error);
					console.log('Result pertaining to ' + resultsRemove[j].innerHTML + ' already removed.');
				}
			// Else if shopping results page:
			} else if (/tbm=shop/.test(currUrl)) {
				// Looking for the following results:
				// resultsRemove[j].parentElement.parentElement.parentElement.parentElement.className == 'sh-dgr__gr-auto sh-dgr__grid-result';
				try {
					resultsRemove[j].parentElement.parentElement.parentElement.parentElement.parentElement.remove();
					numRemoved++;
				} catch (error) {
					// console.log(error);
					console.log('Result pertaining to ' + resultsRemove[j].innerHTML + ' already removed.');
				}
				// TODO: Show number of blocked results
			// Else if books results page:
			} else if (/tbm=bks/.test(currUrl)) {
				// Looking for the following results:
				// resultsRemove[j].parentElement.className == 'Yr5TG'
				try {
					resultsRemove[j].parentElement.remove();
					numRemoved++;
				} catch (error) {
					// console.log(error);
					console.log('Result pertaining to ' + resultsRemove[j].innerHTML + ' already removed.');
				}
				// TODO: Show number of blocked results
			// Else if finance results page:
			} else if (/google.*\/finance\//.test(currUrl)) {
				// Looking for the following results:
				try {
					resultsRemove[j].remove();
					numRemoved++;
				} catch (error) {
					// console.log(error);
					console.log('Result pertaining to ' + resultsRemove[j].innerHTML + ' already removed.');
				}
			// Else if All results page:
			} else if (/search/.test(currUrl)) {
				// Looking for the following results:
				// resultsRemove[j] parent class is 'yuRUbf' or 'vLK3gc', or parent's parent class is 'usJj9c'
				// TODO: Don't hide images in the right-hand blurb unless they match a banned URL
				// TODO: Make sure that results are being counted properly. Now, the same results counts thrice if there's the link, then a Cache link, then a Translate link.
				//window.alert(resultsRemove[j].outerHTML);
				try {
					resultsRemove[j].parentElement.parentElement.parentElement.parentElement.remove();
					numRemoved++;
				} catch (error) {
					// console.log(error);
					console.log('Result pertaining to ' + resultsRemove[j].innerHTML + ' already removed.');
				}
			}
		}
	}
/*
	var resultsSingPlur;
	if (numRemoved == 1) {
		resultsSingPlur = 'result';
	} else {
		resultsSingPlur = 'results';
	}
	var resultStats = document.querySelector('#result-stats');
	resultStats.innerHTML = resultStats.innerHTML.substring(0, resultStats.innerHTML.length - 13) + '. Blocked ' + numRemoved + ' ' + resultsSingPlur + ' on this page.' + resultStats.innerHTML.substring(resultStats.innerHTML.length - 13, resultStats.innerHTML.length);
*/
	googleModifyResultsNumber(currUrl, numRemoved)
	
}