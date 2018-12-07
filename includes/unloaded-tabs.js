function setTabLoadOnTabSelect (e) {
  var tab = e.target;
  setTabLoad(tab);
}

function setTabLoad (tab) {
  tab.setAttribute("load", "true");
  tab.addEventListener("click", function() {console.log("tab click", this);}, true)
  // tab.addEventListener("load",function() {console.log("DOM LOADED", this);}, true)
}

function setTabUnload (tab) {
  tab.removeAttribute("load");
}
function onLoad (e) {
  var tab = e.target;
  tab.setAttribute("isLoaded","true");
  console.log("onLoad!");
}

function initTabUnload(window) {
  
  setTabUnload(window.gBrowser.selectedTab);
// console.log(window);
  // console.log(window.gBrowser);
  // sessionStore.persistTabAttribute("load");
  window.gBrowser.tabContainer.addEventListener("TabSelect", setTabLoadOnTabSelect, true);
  // window.gBrowser.tabContainer.addEventListener("DOMContentLoaded", onLoad, true);
  // for(var i = 0; i < window.gBrowser.tabs.length; i++){
  //   window.gBrowser.tabs[i].addEventListener("load", onLoad, false);
  // }

  // unload(function() window.gBrowser.tabContainer.removeEventListener("load", setTabLoadOnTabSelect));
  unload(function() window.gBrowser.tabContainer.removeEventListener("TabSelect", setTabLoadOnTabSelect));

}
