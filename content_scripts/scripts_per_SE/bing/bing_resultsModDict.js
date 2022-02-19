// Script to figure out where on the page the "results" report is.
// Bing version.
// TODO Feed in the number and currURL, then modify the page here?

/*
function singPlurResults(numRemoved) {
	if (numRemoved == 1) {
		return 'result';
	} else {
		return 'results';
	}
}

function modifyExistingResultsNumber(numRemoved, classToSearchNumberResults) {
	var resultsSingPlur = singPlurResults(numRemoved);
	
	var resultStats = document.querySelector(classToSearchNumberResults);
	// TODO for All Results page: Turn off text-transform: capitalize in CSS on this class, then re-capitalize "Results" in the first part manually.
	resultStats.innerHTML = resultStats.innerHTML + '. Blocked ' + numRemoved + ' ' + resultsSingPlur + ' on this page.';

}

function addNewResultsNumber(numRemoved, classToSearchNumberResults) {
	// TODO
	var resultsSingPlur = singPlurResults(numRemoved);
	
	var resultStats = document.querySelector(classToSearchNumberResults);
	resultStats.innerHTML = resultStats.innerHTML + '. Blocked ' + numRemoved + ' ' + resultsSingPlur + ' on this page.';

}
*/

// currUrl: URL where we currently are
function bingModifyResultsNumber(currUrl, numRemoved) {
/*
	var resultsSingPlur;
	if (numRemoved == 1) {
		resultsSingPlur = 'result';
	} else {
		resultsSingPlur = 'results';
	}
	*/
	
	//var classToSearchNumberResults;
	
	// If an Images page:
	if (/bing.*\/images\//.test(currUrl)) {
		// TODO Add 'Results'
	// If a News page:
	} else if (/bing.*\/news\/search\?q=/.test(currUrl)) {
		//classToSearchNumberResults = '.rc';
		bingModifyExistingResultsNumber(numRemoved, '.rc');
	// If a Videos page:
	} else if (/bing.*\/videos\?q=/.test(currUrl)) {
		// TODO Add 'Results'
	// If normal All search page:
	} else if (/bing.*\/search\?/.test(currUrl)) {
		//classToSearchNumberResults = '.sb_count';
		bingModifyExistingResultsNumber(numRemoved, '.sb_count');
	}
	

}

