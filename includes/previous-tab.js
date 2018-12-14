let previousTabIndex = -1;
let prevTemp = -2;
let currentTabIndex = 1;
let gBrowser;
let tabHistory = [];

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
	if (tab != tabHistory[tabHistory.length-2]){ //if new tab is NOT the tab that we want to go to
		for(let i = 0; i < tabHistory.length; i++){
			if(tabHistory[i] == tab){
				tabHistory.splice(i, 1); //delete closing tab from history and reindex
			}
		}
		tabHistory.push(tab);
	} else { //if it is, just push the new tab to top of list
		tabHistory.splice(tabHistory.length - 2, 1); //delete old entry
		tabHistory.push(tab);
	}
}

function prevTabOnClose(e){
	let closingTab = e.target;
	let newTab = gBrowser.selectedTab;
	let t1 = tabHistory[tabHistory.length - 1];
	let t2 = tabHistory[tabHistory.length - 2];
	let t3 = tabHistory[tabHistory.length - 3];
	let prevTab;
	// console.log(t1.attributes.label,t2.attributes.label,t3.attributes.label);
	// console.log('closing', closingTab.attributes.label);

	//check if it is even the active tab being closed
	//need this because it only covered when the two tabs were next to each other
	if (closingTab != t2){
		for(let i = 0; i < tabHistory.length; i++){
			if(tabHistory[i] == closingTab){
				tabHistory.splice(i, 1);
			}
		}
	}
	else if (gBrowser.selectedTab == t1){

	}
	//check if NOT the previous tab was the one underneath the closing tab
	else if(tabHistory[tabHistory.length - 1] != tabHistory[tabHistory.length - 3]){
		prevTab = tabHistory[tabHistory.length - 3];
		for(let i = 0; i < tabHistory.length; i++){
			if(tabHistory[i] == closingTab){
				tabHistory.splice(i, 1); //delete closing tab from history and reindex
			}
		}
		tabHistory.splice(tabHistory.length - 1, 1); //delete tab that was loaded due to Firefox "adopted by" from history
		gBrowser.selectedTab = prevTab;
	} else { // i don't think this ever runs
		for(let i = 0; i < tabHistory.length; i++){
			if(tabHistory[i] == closingTab){
				tabHistory.splice(i, 1); //delete closing tab from history and reindex
			}
		}
	} 
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