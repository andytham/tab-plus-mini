function setTabLoadOnTabSelect (e) {
  var tab = e.target;
  setTabLoad(tab);
}

function setTabLoad (tab) {
  tab.setAttribute("load", "true");
  console.log("load set");
}

function setTabUnload (tab) {
  tab.removeAttribute("load");
}
function onLoad (e) {
  console.log("window load");
  var tab = e.target;
  // tab.setAttribute("isLoaded","true");

  console.log(tab);
}
function initTabUnload(window) {
  
  setTabUnload(window.gBrowser.selectedTab);

  // sessionStore.persistTabAttribute("load");
  console.log("logging window");
  console.log(window);
  window.gBrowser.tabContainer.addEventListener("TabSelect", setTabLoadOnTabSelect, true);
  window.gBrowser.tabs.addEventListener("load", onLoad, false);
  unload(function() window.gBrowser.tabContainer.removeEventListener("load", setTabLoadOnTabSelect));
  unload(function() window.gBrowser.tabContainer.removeEventListener("TabSelect", setTabLoadOnTabSelect));

}
