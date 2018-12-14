let previousTabIndex = -1;
let prevTemp = -2;
let currentTabIndex = 1;
let gBrowser;
let tabHistory = [];
let selectCounter = 0;
function closeTab(e){
	let closingTab = e.target;
	let currentTab = gBrowser.selectedTab;
	let prevTab = gBrowser.tabs[previousTabIndex]


	// check if active tab is being closed
	if (closingTab._tPos == prevTab._tPos){
		//check if loaded more than one tab
		console.log('first condition');
		if (prevTemp == -1){
			console.log("no prev tab");
		} else {
			gBrowser.selectedTab = gBrowser.tabs[prevTemp]
		}
	} else {
		console.log("don't need to do anything");
		// win.selectedTab = win.tabs[previousTabIndex]
	}
}

//old
function setCurrentTab(e){
	let tab = e.target;
	if (currentTabIndex){
		prevTemp = previousTabIndex;
		previousTabIndex = currentTabIndex;
	}
	currentTabIndex = tab._tPos;
}

function adjustTabHistory(e){
	let tab = e.target;
	let t1 = tabHistory[tabHistory.length - 1];
	let t2 = tabHistory[tabHistory.length - 2];
	let t3 = tabHistory[tabHistory.length - 3];

	function deleteHistoryClosingTab(targetTab) {
		for(let i = 0; i < tabHistory.length; i++){
			if(tabHistory[i] == targetTab){
				tabHistory.splice(i, 1); //delete closing tab from history and reindex
			}
		}
	}
	if(t1){
		if (t1.closing == true){ //see if tab currently on is being closed
			deleteHistoryClosingTab(t1)
			gBrowser.selectedTab = t2
		} else {
			tabHistory.push(tab);
		}
	} else {
		tabHistory.push(tab);
	}


}

function prevTabOnClose(e){
	console.log("after close");
}


function initPreviousTab(window){
	gBrowser = window.gBrowser;
	if (gBrowser.tabContainer.getAttribute("tabplusmini-select-previous-tab-on-close")){
		window.gBrowser.tabContainer.addEventListener("TabSelect", adjustTabHistory, true);
		window.gBrowser.tabContainer.addEventListener("TabClose", prevTabOnClose, true);
	
		unload(function() {window.gBrowser.tabContainer.removeEventListener("TabSelect", adjustTabHistory)});
		unload(function() {window.gBrowser.tabContainer.removeEventListener("tabClose", prevTabOnClose)});
	}

}

// window.gBrowser.tabContainer.addEventListener("beforeunload", function(e){console.log(e.target);}, true);
//http://mdn.beonex.com/en/Code_snippets/Tabbed_browser.html