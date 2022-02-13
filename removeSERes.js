/* Script to hide search engine results from given list of
 * * fed websites.
 * List of supported search engines:
 * * 1) Google (all domains, such as .com and .co.uk) 
 */

// Read in scripts to define how to block per search engine (SE)

// Define everything within async function to ensure that the 
// // Promise returned from fetching the list of websites to block.
async function getBlockedSites() {
	try {
		let response = await browser.storage.sync.get("blockedsites");
		let sitestoblock = response.blockedsites;
		var blockedSites = sitestoblock.split('\n');

		/*
		// Testing only: Read in list of websites to block
		var blockedSites = [
			'pinterest.com',
			'pinterest.ca',
			'reddit.com',
			'findanyanswer.com',
			'everythingwhat.com'
			];
		*/

		// Counter to track number of blocked results
		var numRemoved = 0;

		// Google:
		// Read in search results on Google page
		// Remember to only have the script run on a results page
		
		// Google:
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
				if (/tbm=isch/.test(currUrl)) {
					// Looking for the following results:
					// resultsRemove[j].parentElement.className == 'isv-r PNCib MSM1fd BUooTd'
					resultsRemove[j].parentElement.remove();
					// Counter to track number of blocked results
					numRemoved++;
					// TODO: What to do to keep removing images with endless scroll?
					// TODO: Show number of blocked results
					// TODO: When majority of pictures on endless scroll are blocked, endless scroll doesn't work to see if there may be more pictures that can pass the block.
				// Else if this is news results page:
				} else if (/tbm=nws/.test(currUrl)) {
					// Looking for the following results:
					// resultsRemove[j].parentElement.parentElement.parentElement.parentElement.className == 'nChh6e Dy0REb g09czf'
					resultsRemove[j].parentElement.parentElement.parentElement.parentElement.remove();
					numRemoved++;
				// Else if videos results page:
				} else if (/tbm=vid/.test(currUrl)) {
					// Looking for the following results:
					// resultsRemove[j].parentElement == 'tF2Cxc'
					resultsRemove[j].parentElement.parentElement.parentElement.remove();
					numRemoved++;
				// Else if shopping results page:
				} else if (/tbm=shop/.test(currUrl)) {
					// Looking for the following results:
					// resultsRemove[j].parentElement.parentElement.parentElement.parentElement.className == 'sh-dgr__gr-auto sh-dgr__grid-result';
					resultsRemove[j].parentElement.parentElement.parentElement.parentElement.parentElement.remove();
					numRemoved++;
					// TODO: Show number of blocked results
				// Else if books results page:
				} else if (/tbm=bks/.test(currUrl)) {
					// Looking for the following results:
					// resultsRemove[j].parentElement.className == 'Yr5TG'
					resultsRemove[j].parentElement.remove();
					numRemoved++;
					// TODO: Show number of blocked results
				// Else if finance results page:
				} else if (/google.*\/finance\//.test(currUrl)) {
					// Looking for the following results:
					resultsRemove[j].remove();
					numRemoved++;
				// Else if All results page:
				} else if (/search/.test(currUrl)) {
					// Looking for the following results:
					// resultsRemove[j] parent class is 'yuRUbf' or 'vLK3gc', or parent's parent class is 'usJj9c'
					// TODO: Don't hide images in the right-hand blurb unless they match a banned URL
					resultsRemove[j].parentElement.parentElement.parentElement.parentElement.remove();
					numRemoved++;
				}
			}
		}

		var resultsSingPlur;
		if (numRemoved == 1) {
			resultsSingPlur = 'result';
		} else {
			resultsSingPlur = 'results';
		}
		var resultStats = document.querySelector('#result-stats');
		resultStats.innerHTML = resultStats.innerHTML.substring(0, resultStats.innerHTML.length - 13) + '. Blocked ' + numRemoved + ' ' + resultsSingPlur + ' on this page.' + resultStats.innerHTML.substring(resultStats.innerHTML.length - 13, resultStats.innerHTML.length);
		
	} catch(error) {
		console.log(`Error: ${error}`);
	}
}

getBlockedSites();