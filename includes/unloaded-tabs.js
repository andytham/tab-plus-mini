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
  var tab = e.target;
  // tab.setAttribute("isLoaded","true");
  console.log("window load", tab);
}
function initTabUnload(window) {
  
  setTabUnload(window.gBrowser.selectedTab);

  // sessionStore.persistTabAttribute("load");

  window.gBrowser.tabContainer.addEventListener("TabSelect", setTabLoadOnTabSelect, true);
  window.addEventListener("load", onLoad, true)
  unload(function() window.gBrowser.tabContainer.removeEventListener("load", setTabLoadOnTabSelect));
  unload(function() window.gBrowser.tabContainer.removeEventListener("TabSelect", setTabLoadOnTabSelect));

}
