let gBrowser;
let tabHistory = [];

function adjustTabHistory(e){
	let tab = e.target;
	let t1 = tabHistory[tabHistory.length - 1];
	let t2 = tabHistory[tabHistory.length - 2];

	function deleteHistoryClosingTab(targetTab) { //currently don't need to have it as a function...
		for(let i = 0; i < tabHistory.length; i++){
			if(tabHistory[i] == targetTab){
				tabHistory.splice(i, 1); //delete closing tab from history and reindex
			}
		}
	}

	if(t1){ // breaks if undefined, i.e. when it first runs so we have this
		if (t1.closing == true){ //see if tab currently on is being closed
			deleteHistoryClosingTab(t1);
			gBrowser.selectedTab = t2; //t2 doesn't update until AFTER adjustTabHistory is rerun, even though we just deleted the last entry in tabHistory
		} else {
			tabHistory.push(tab);
		}
	} else {
		tabHistory.push(tab); //creates the first tabHistory or "t1"
	}
}

function prevTabOnClose(e){
	console.log("after close");
}

function initPreviousTab(window){
	gBrowser = window.gBrowser;
	if (gBrowser.tabContainer.getAttribute("tabplusmini-select-previous-tab-on-close")){ //see if option is ticked in preferences
		window.gBrowser.tabContainer.addEventListener("TabSelect", adjustTabHistory, true);
		unload(function() {window.gBrowser.tabContainer.removeEventListener("TabSelect", adjustTabHistory)});
	}
}

//http://mdn.beonex.com/en/Code_snippets/Tabbed_browser.html