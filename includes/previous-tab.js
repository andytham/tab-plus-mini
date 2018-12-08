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
	for(let i = 0; i < tabHistory.length; i++){
		if(tabHistory[i] == tab){
			tabHistory.splice(i, 1); //delete from array and reindex
		}
	}
	tabHistory.push(tab);
}

function prevTabOnClose(e){
	let closingTab = e.target;
	let newTab = gBrowser.selectedTab;
	let activeTab = tabHistory[tabHistory.length - 2];
	let prevTab = tabHistory[tabHistory.length - 3];
	
	if (closingTab == activeTab){
		gBrowser.selectedTab = prevTab;
	}
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
	window.gBrowser.tabContainer.addEventListener("TabSelect", adjustTabHistory, true);
	window.gBrowser.tabContainer.addEventListener("TabClose", prevTabOnClose, true);

	window.gBrowser.tabContainer.addEventListener("TabAttrModified", onModify, true);
	unload(function() {window.gBrowser.tabContainer.removeEventListener("TabSelect", adjustTabHistory)});
	unload(function() {window.gBrowser.tabContainer.removeEventListener("tabClose", prevTabOnClose)});
}

// window.gBrowser.tabContainer.addEventListener("beforeunload", function(e){console.log(e.target);}, true);
//http://mdn.beonex.com/en/Code_snippets/Tabbed_browser.html