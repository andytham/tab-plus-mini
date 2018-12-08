let previousTabIndex = -1;
let prevTemp = -2;
let currentTabIndex = 1;
let gBrowser;

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

function setCurrentTab(e){
	let tab = e.target;
	if (currentTabIndex){
		prevTemp = previousTabIndex;
		previousTabIndex = currentTabIndex;
	}
	currentTabIndex = tab._tPos;
}
function onModify(e){
	let tab = e.target;
	if (tab.closing){
		console.log("tab closing!");
	}
}

function initPreviousTab(window){
	console.log("prev tab js running");
	gBrowser = window.gBrowser;
	window.gBrowser.tabContainer.addEventListener("TabClose", closeTab, true);
	window.gBrowser.tabContainer.addEventListener("TabSelect", setCurrentTab, true);

	window.gBrowser.tabContainer.addEventListener("TabAttrModified", onModify, true);
	unload(function() {window.gBrowser.tabContainer.removeEventListener("tabClose", closeTab)});
	unload(function() {window.gBrowser.tabContainer.removeEventListener("TabSelect", setCurrentTab)});
}

// window.gBrowser.tabContainer.addEventListener("beforeunload", function(e){console.log(e.target);}, true);
//http://mdn.beonex.com/en/Code_snippets/Tabbed_browser.html