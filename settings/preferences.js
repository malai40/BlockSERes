function openTab(event) {
	// Declare all variables
	var i, tabcontent, sidetabbutton, tabName;
	
	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="sidetab-button" and remove the class "active"
	sidetabbutton = document.getElementsByClassName("sidetab-button");
	for (i = 0; i < sidetabbutton.length; i++) {
		sidetabbutton[i].className = sidetabbutton[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	if (event.currentTarget.id.match("sidetab-button-searcheng")) {
		tabName = "search-engines";
	} else if (event.currentTarget.id.match("sidetab-button-blockedsites")) {
		tabName = "blocked-sites";
	} else if (event.currentTarget.id.match("sidetab-button-lang")) {
		tabName = "languages";
	} else if (event.currentTarget.id.match("sidetab-button-abt")) {
		tabName = "about";
	}
	document.getElementById(tabName).style.display = "block";
	event.currentTarget.className += " active";
}

/* Save the list of websites to block */
function saveOptions(e) {
  e.preventDefault();
  
  browser.storage.sync.set({
    blockedsites: document.querySelector("#textarea-blockedsites").value
  });
}

/* Load the list of websites to block from the last time */
function restoreOptions() {
  
  function setCurrentChoice(result) {
    document.querySelector("#textarea-blockedsites").value = result.blockedsites;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("blockedsites");
  getting.then(setCurrentChoice, onError);
  
}

/* Save the list of websites to block */
function saveOptionsSE(e) { //No hyphen allowed in function name
  e.preventDefault();
  
  var form = document.querySelector('#search-engine-list'); 
  var checkboxes = form.querySelectorAll('input[type=checkbox]');
  
  var vals = {};
  
  for (var i = 0; i < checkboxes.length; i++) {
      vals[i] = checkboxes[i].id;
      vals[vals[i]] = checkboxes[i].checked;
  }
  
  browser.storage.sync.set({
    activeSE: vals
  });
  
}

/* Load the list of websites to block from the last time */
function restoreOptionsSE() {
  
  function setCurrentChoice(result) {
  	var form = document.querySelector('#search-engine-list'); 
    var checkboxes = form.querySelectorAll('input[type=checkbox]');
    
    for (var i = 0; i < checkboxes.length; i++) 
    {
    	checkboxes[i].checked = result.activeSE[checkboxes[i].id];
    	//window.alert(checkboxes[i].id);
    }
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("activeSE");
  getting.then(setCurrentChoice, onError);
  
}

/* Ready the navigation tab clicking */
// Must not use inline JS "onclick" in html due to security restriction
document.querySelectorAll(".sidetab-button").forEach(item => {
	item.addEventListener("click", openTab);
});


/* Open the default tab */
document.getElementById("sidetab-button-searcheng").click();

/* Ready the Save and Load functions */
// document.addEventListener("DOMContentLoaded", function(){restoreOptions(section)});
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save").addEventListener("click", saveOptions);

document.addEventListener("DOMContentLoaded", restoreOptionsSE);
document.querySelector("#saveSE").addEventListener("click", saveOptionsSE);
