function setTabReadOnTabLoad (e) {
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
  setTabRead(window.gBrowser.selectedTab);

  sessionStore.persistTabAttribute("load");

  window.gBrowser.tabContainer.addEventListener("TabSelect", setTabReadOnTabLoad, true);
  unload(function() window.gBrowser.tabContainer.removeEventListener("TabSelect", setTabReadOnTabLoad));
}
