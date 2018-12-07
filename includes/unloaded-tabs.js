function setTabLoadOnTabSelect (e) {
  var tab = e.target;
  setTabLoad(tab);
}

function setTabLoad (tab) {
  tab.setAttribute("load", "true");
}

function setTabUnload (tab) {
  tab.removeAttribute("load");
}


function initTabUnload(window) {
  console.log('unloaded js running');
  setTabUnload(window.gBrowser.selectedTab);

  window.gBrowser.tabContainer.addEventListener("TabSelect", setTabLoadOnTabSelect, true);

  unload(function() window.gBrowser.tabContainer.removeEventListener("TabSelect", setTabLoadOnTabSelect));

}
