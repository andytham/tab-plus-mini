let previousTabIndex = 0;
let currentTabIndex = 1;
let win;
function selectTab(e){
	let tab = e.target;
	console.log('tab is closing', win);
	win.selectedTab = win.tabs[0]
}

function setPreviousTab(){

} 

function setCurrentTab(e){
	let tab = e.target;
	previousTabIndex = currentTabIndex;
	currentTabIndex = tab.tabIndex;
}

function loadPreviousTab(){

}

function initPreviousTab(window){
	console.log("prev tab js running");
	win = window.gBrowser;
	window.gBrowser.tabContainer.addEventListener("TabClose", selectTab, true);
	window.gBrowser.tabContainer.addEventListener("TabSelect", setCurrentTab, true)

	unload(function() window.gBrowser.tabContainer.removeEventListener("tabClose", selectTab));
	unload(function() window.gBrowser.tabContainer.removeEventListener("TabSelect", setCurrentTab));
}