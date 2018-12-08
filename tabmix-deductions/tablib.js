if (!Tabmix.extensions.tabGroupManager) {
	let aboutBlank = 'this.addTab("about:blank", {skipAnimation: true})';
	let aboutNewtab = /this\.addTab\(BROWSER_NEW_TAB_URL, {\s?skipAnimation: true\s?}\)/;
	let code = gBrowser._beginRemoveTab.toString().indexOf(aboutBlank) > -1 ?
		aboutBlank : aboutNewtab;
	Tabmix.changeCode(gBrowser, "gBrowser._beginRemoveTab")._replace(
		code, 'TMP_BrowserOpenTab(null, null, true)'
	).toCode();
}