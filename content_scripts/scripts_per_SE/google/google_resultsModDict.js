// Script to figure out where on the page the "results" report is.
// Google version.
// TODO Feed in the number and currURL, then modify the page here?

/*
function singPlurResults(numRemoved) {
	if (numRemoved == 1) {
		return 'result';
	} else {
		return 'results';
	}
}
*/

/*
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
function googleModifyResultsNumber(currUrl, numRemoved) {
/*
	var resultsSingPlur;
	if (numRemoved == 1) {
		resultsSingPlur = 'result';
	} else {
		resultsSingPlur = 'results';
	}
	*/
	
	//var classToSearchNumberResults;
	
	// Image results page
	if (/tbm=isch/.test(currUrl)) {
		// TODO Add 'Results'
	// News results page
	} else if (/tbm=nws/.test(currUrl)) {
		//TODO replace existing results number
		googleModifyExistingResultsNumber(numRemoved, '#result-stats');
	// Video results page
	} else if (/tbm=vid/.test(currUrl)) {
		//TODO replace existing results number
		googleModifyExistingResultsNumber(numRemoved, '#result-stats');
	// Shopping results page
	} else if (/tbm=shop/.test(currUrl)) {
		// TODO Add 'Results'
		//classToSearchNumberResults = '.sb_count';
	// Books results page
	} else if (/tbm=bks/.test(currUrl)) {
		// TODO Add 'Results'
	// Finance results page
	} else if (/google.*\/finance\//.test(currUrl)) {
		// TODO Add 'Results'
	// All search results page
	} else if (/search/.test(currUrl)) {
		//TODO replace existing results number
		googleModifyExistingResultsNumber(numRemoved, '#result-stats');
	}

}