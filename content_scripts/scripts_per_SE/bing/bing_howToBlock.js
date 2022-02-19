// Script to define how to hide search results on Bing.
// This works on any Bing website, regardless of top-level domain (e.g. .com, .co.uk).

// numRemoved: Counter to track number of blocked results
// blockedSites: Array of top-level domains to block
function bingBlock(numRemoved, blockedSites) {
	// Read in search results on Bing page
	// Remember to only have the script run on a results page
	// Loop through list of blocked sites
	for (var i = 0; i < blockedSites.length; i++) {
		// Create the URLs that will be removed if found
		// TODO Ways to select each block to be removed only once? If a block has the URL in two different classes, the second class will throw null pointer if the first class results in both classes being removed from the page.
		var resultsRemove = document.querySelectorAll('a[href*="/'+blockedSites[i]+'"], a[href*=".'+blockedSites[i]+'"], a[href*=":'+blockedSites[i]+'"], div[data-lpage*=".'+blockedSites[i]+'"], div[ourl*="'+blockedSites[i]+'"]');
		// Get current URL. Where am I?
		currUrl = window.location.href;
		// Loop through all results that include banned URLs
		for (var j = 0; j < resultsRemove.length; j++) {
			// Below is old way by seeing if following classes are present.
			//if (resultsRemove[j].parentElement.className == 'yuRUbf' || resultsRemove[j].parentElement.parentElement.className == 'usJj9c' || resultsRemove[j].parentElement.className == 'vLK3gc') {
			// If this is an image results page:
			if (/bing.*\/images\//.test(currUrl)) {
				// Looking for the following results:
				// resultsRemove[j].parentElement.className == 'isv-r PNCib MSM1fd BUooTd'
				// TODO Sometimes this works, sometimes this doesn't load. Why?
				// window.alert('Working...');
				try {
					resultsRemove[j].parentElement.parentElement.parentElement.parentElement.parentElement.remove();
					numRemoved++;
				} catch (error) {
					// console.error(error);
					console.log('Result pertaining to ' + resultsRemove[j].innerHTML + ' already removed.');
				}
				// TODO: What to do to keep removing images with endless scroll?
				// TODO: Show number of blocked results
				// TODO: When majority of pictures on endless scroll are blocked, endless scroll doesn't work to see if there may be more pictures that can pass the block.
			// Else if this is news results page:
			} else if (/bing.*\/news\/search\?q=/.test(currUrl)) {
				// Looking for the following results:
				// resultsRemove[j].parentElement.parentElement.parentElement.parentElement.parentElement.className == 'news-card newsitem cardcommon b_cards2'
				try {
					resultsRemove[j].parentElement.parentElement.parentElement.parentElement.parentElement.remove();
					numRemoved++;
				} catch (error) { // If resultsRemove includes similar parts of the same results that have already been removed, catch the error from null pointer and continue to process.
					//console.error(error);
					console.log('Result pertaining to ' + resultsRemove[j].innerHTML + ' already removed.');
				}
				//var classToSearchNumberResults = '.rc';
			// Else if videos results page:
			} else if (/bing.*\/videos\?q=/.test(currUrl)) {
				// Looking for the following results:
				// class is "mc_vtvc_con_rc". ourl="www.youtube.com/watch?v=..."
				// Delete the parent of the parent of the parent of ^this.
				try {
					resultsRemove[j].parentElement.parentElement.parentElement.remove();
					numRemoved++;
				} catch (error) {
					//console.error(error);
					console.log('Result pertaining to ' + resultsRemove[j].innerHTML + ' already removed.');
				}
			// Else if All results page:
			} else if (/bing.*\/search\?/.test(currUrl)) {
				// Looking for the following results:
				// resultsRemove[j] parent class is 'b_algo' or 'b_context' (the right-hand blurb from Wikipedia)
				// TODO: Don't hide images in the right-hand blurb unless they match a banned URL
				try {
					resultsRemove[j].parentElement.parentElement.remove();
					numRemoved++;
				} catch (error) {
					//console.error(error);
					console.log('Result pertaining to ' + resultsRemove[j].innerHTML + ' already removed.');
				}
				//var classToSearchNumberResults = '.sb_count';
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
	var classToSearchNumberResults = bingFindResultsNumber(currUrl);
	var resultStats = document.querySelector(classToSearchNumberResults);
	// TODO for All Results page: Turn off text-transform: capitalize in CSS on this class, then re-capitalize "Results" in the first part manually.
	resultStats.innerHTML = resultStats.innerHTML + '. Blocked ' + numRemoved + ' ' + resultsSingPlur + ' on this page.';
	*/
	bingModifyResultsNumber(currUrl, numRemoved);
}