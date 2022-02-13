function saveOptions(e) {
  e.preventDefault();
  
  browser.storage.sync.set({
    blockedsites: document.querySelector("#textarea").value
  });
}

function restoreOptions() {
  
  function setCurrentChoice(result) {
    document.querySelector("#textarea").value = result.blockedsites;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("blockedsites");
  getting.then(setCurrentChoice, onError);
  
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save").addEventListener("click", saveOptions);