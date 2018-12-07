let previousTabIndex = -1;
let prevTemp = -2;
let currentTabIndex = 1;
let win;
function closeTab(e){
	let closingTab = e.target;
	let currentTab = win.selectedTab;
	let prevTab = win.tabs[previousTabIndex]


	// check if active tab is being closed
	if (closingTab._tPos == prevTab._tPos){
		//check if loaded more than one tab
		console.log('first condition');
		if (prevTemp == -1){
			console.log("no prev tab");
		} else {
			win.selectedTab = win.tabs[prevTemp]
		}
	} else {
		console.log("don't need to do anything");
		// win.selectedTab = win.tabs[previousTabIndex]
	}
}

function setCurrentTab(e){
	let tab = e.target;
	if (currentTabIndex){
		prevTemp = previousTabIndex;
		previousTabIndex = currentTabIndex;
	}
	currentTabIndex = tab._tPos;
}


function initPreviousTab(window){
	console.log("prev tab js running");
	win = window.gBrowser;
	window.gBrowser.tabContainer.addEventListener("TabClose", closeTab, true);
	window.gBrowser.tabContainer.addEventListener("TabSelect", setCurrentTab, true)
	unload(function() {window.gBrowser.tabContainer.removeEventListener("tabClose", closeTab)});
	unload(function() {window.gBrowser.tabContainer.removeEventListener("TabSelect", setCurrentTab)});
}