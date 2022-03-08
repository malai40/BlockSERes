/* Script to hide search engine results from given list of
 * * fed websites.
 * List of supported search engines:
 * * 1) Google (all domains, such as .com and .co.uk) 
 * * 2) Bing
 */

// Read in scripts to define how to block per search engine (SE)

// Define everything within async function to ensure that the 
// // Promise returned from fetching the list of websites to block.
async function getBlockedSites() {
	try {
		let response = await browser.storage.sync.get("blockedsites");
		let sitestoblock = response.blockedsites;
		var blockedSites = sitestoblock.split('\n');
		
		// See what engines are enabled for blocking
		let responseSE = await browser.storage.sync.get("activeSE"); //Returns dictionary.
		activeSE = responseSE.activeSE;

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
		
		// Get current URL. Where am I?
		currUrl = window.location.href;
		
		
		
		
		// Pick which blocking function to use depending on 
		// // search engine currently loaded
		if (/www.google.*\//.test(currUrl)) {
			if (activeSE['google']) {
				//Google:
				googleBlock(0, blockedSites);
			}
		} else if (/www.bing.*\//.test(currUrl)) {
			if (activeSE['bing']) {
				//Bing:
				bingBlock(0, blockedSites);
			}
		} else if (/\/\/.duckduckgo.*\//.test(currUrl)) {
			//DuckDuckGo:
			// TODO
		}
		
	} catch(error) {
		console.log(`Error: ${error}`);
	}
}

getBlockedSites();