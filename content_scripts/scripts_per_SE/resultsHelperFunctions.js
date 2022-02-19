function singPlurResults(numRemoved) {
	if (numRemoved == 1) {
		return 'result';
	} else {
		return 'results';
	}
}

function googleModifyExistingResultsNumber(numRemoved, classToSearchNumberResults) {
	var resultsSingPlur = singPlurResults(numRemoved);
	
	var resultStats = document.querySelector(classToSearchNumberResults);
	// TODO for All Results page: Turn off text-transform: capitalize in CSS on this class, then re-capitalize "Results" in the first part manually.
	resultStats.innerHTML = resultStats.innerHTML.substring(0, resultStats.innerHTML.length - 13) + '. Blocked ' + numRemoved + ' ' + resultsSingPlur + ' on this page.' + resultStats.innerHTML.substring(resultStats.innerHTML.length - 13, resultStats.innerHTML.length);
}

function bingModifyExistingResultsNumber(numRemoved, classToSearchNumberResults) {
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