let previousTabIndex = -1;
let currentTabIndex = 1;
let win;
function closeTab(e){
	let closingTab = e.target;
	let currentTab = win.selectedTab;
	console.log(closingTab._tPos, currentTab._tPos);
	//check if active tab is being closed
	// if (closingTab._tPos != currentTab._tPos){
	// 	//check if user has used more than one tab
	// 	if (previousTabIndex == -1){
	// 		//check if last tab on list
	// 		if (currentTabIndex < win.selected ){
	// 			win.selectedTab = win.tabs[currentTabIndex + 1]
	// 		} else {
	// 			win.selectedTab = win.tabs[currentTabIndex - 1]
	// 		}
			
	// 	} else {
	// 		console.log("end")
	// 	}
	// }

}

function setCurrentTab(e){
	let tab = e.target;
	if (currentTabIndex){
		previousTabIndex = currentTabIndex;
	}
	currentTabIndex = tab._tPos;
}


function initPreviousTab(window){
	console.log("prev tab js running");
	win = window.gBrowser;
	window.gBrowser.tabContainer.addEventListener("TabClose", closeTab, true);
	window.gBrowser.tabContainer.addEventListener("TabSelect", setCurrentTab, true)
	unload(function() window.gBrowser.tabContainer.removeEventListener("tabClose", closeTab));
	unload(function() window.gBrowser.tabContainer.removeEventListener("TabSelect", setCurrentTab));
}