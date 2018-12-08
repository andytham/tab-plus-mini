gBrowser.selectIndexAfterRemove = function(oldTab) {
	var tabs = TMP_TabView.currentGroup();
	var currentIndex = tabs.indexOf(this.mCurrentTab);
	if (this.mCurrentTab != oldTab)
		return currentIndex;
	var l = tabs.length;
	if (l == 1)
		return 0;
	var mode = Tabmix.prefs.getIntPref("focusTab");
	switch (mode) {
		case 0: // first tab
			return currentIndex === 0 ? 1 : 0;
		case 1: // left tab
			return currentIndex === 0 ? 1 : currentIndex - 1;
		case 3: // last tab
			return currentIndex == l - 1 ? currentIndex - 1 : l - 1;
		case 6: {// last opened
			let lastTabIndex, maxID = -1;
			tabs.forEach((tab, index) => {
				if (tab == oldTab)
					return;
				let linkedPanel = tab.linkedPanel.replace('panel', '');
				if (Tabmix.isVersion(260))
					linkedPanel = linkedPanel.substr(linkedPanel.lastIndexOf("-") + 1);
				let id = parseInt(linkedPanel);
				if (id > maxID) {
					maxID = id;
					lastTabIndex = index;
				}
			});
			return lastTabIndex;
		}
		case 4: {// last selected
			let tempIndex = this.previousTabIndex(oldTab, tabs);
			// if we don't find last selected we fall back to default
			if (tempIndex > -1)
				return tempIndex;
		}
		/* falls through */
		case 2: // opener / right  (default )
		case 5: // right tab
			/* falls through */
		default:
			if (mode != 5 && Services.prefs.getBoolPref("browser.tabs.selectOwnerOnClose") && "owner" in oldTab) {
				var owner = oldTab.owner;
				if (owner && owner.parentNode && owner != oldTab && !owner.hidden) {
					// oldTab and owner still exist just return its position
					let tempIndex = tabs.indexOf(owner);
					if (tempIndex > -1)
						return tempIndex;
				}
			}
	}
	return currentIndex == l - 1 ? currentIndex - 1 : currentIndex + 1;
};