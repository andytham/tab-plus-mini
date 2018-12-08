if (aTab.closing ||
	this._windowIsClosing)
	return false;

var browser = this.getBrowserForTab(aTab);

if (!aTab._pendingPermitUnload && !aAdoptedByTab && !aSkipPermitUnload) {
	// We need to block while calling permitUnload() because it
	// processes the event queue and may lead to another removeTab()
	// call before permitUnload() returns.
	aTab._pendingPermitUnload = true;
	let {
		permitUnload,
		timedOut
	} = browser.permitUnload();
	delete aTab._pendingPermitUnload;
	// If we were closed during onbeforeunload, we return false now
	// so we don't (try to) close the same tab again. Of course, we
	// also stop if the unload was cancelled by the user:
	if (aTab.closing || (!timedOut && !permitUnload)) {
		// NB: deliberately keep the _closedDuringPermitUnload set to
		// true so we keep exiting early in case of multiple calls.
		return false;
	}
}


var closeWindow = false;
var newTab = false;
if (this.tabs.length - this._removingTabs.length == 1) {
	closeWindow = aCloseWindowWithLastTab != null ? aCloseWindowWithLastTab :
		!window.toolbar.visible ||
		Services.prefs.getBoolPref("browser.tabs.closeWindowWithLastTab");

	if (closeWindow) {
		// We've already called beforeunload on all the relevant tabs if we get here,
		// so avoid calling it again:
		window.skipNextCanClose = true;
	}

	// Closing the tab and replacing it with a blank one is notably slower
	// than closing the window right away. If the caller opts in, take
	// the fast path.
	if (closeWindow &&
		aCloseWindowFastpath &&
		this._removingTabs.length == 0) {
		// This call actually closes the window, unless the user
		// cancels the operation.  We are finished here in both cases.
		this._windowIsClosing = window.closeWindow(true, window.warnAboutClosingWindow);
		return null;
	}

	newTab = true;
}

aTab.closing = true;
this._removingTabs.push(aTab);
this._visibleTabs = null; // invalidate cache

// Invalidate hovered tab state tracking for this closing tab.
if (this.tabContainer._hoveredTab == aTab)
	aTab._mouseleave();

if (newTab)
	this.addTab(BROWSER_NEW_TAB_URL, {
		skipAnimation: true
	});
else
	this.tabContainer.updateVisibility();

// We're committed to closing the tab now.
// Dispatch a notification.
// We dispatch it before any teardown so that event listeners can
// inspect the tab that's about to close.
var evt = new CustomEvent("TabClose", {
	bubbles: true,
	detail: {
		adoptedBy: aAdoptedByTab
	}
});
aTab.dispatchEvent(evt);

if (!aAdoptedByTab && !gMultiProcessBrowser) {
	// Prevent this tab from showing further dialogs, since we're closing it
	var windowUtils = browser.contentWindow.QueryInterface(Ci.nsIInterfaceRequestor).
	getInterface(Ci.nsIDOMWindowUtils);
	windowUtils.disableDialogs();
}

// Remove the tab's filter and progress listener.
const filter = this._tabFilters.get(aTab);

browser.webProgress.removeProgressListener(filter);

const listener = this._tabListeners.get(aTab);
filter.removeProgressListener(listener);
listener.destroy();

if (browser.registeredOpenURI && !aAdoptedByTab) {
	this._unifiedComplete.unregisterOpenPage(browser.registeredOpenURI,
		browser.getAttribute("usercontextid") || 0);
	delete browser.registeredOpenURI;
}

// We are no longer the primary content area.
browser.setAttribute("type", "content-targetable");

// Remove this tab as the owner of any other tabs, since it's going away.
for (let tab of this.tabs) {
	if ("owner" in tab && tab.owner == aTab)
		// |tab| is a child of the tab we're removing, make it an orphan
		tab.owner = null;
}

aTab._endRemoveArgs = [closeWindow, newTab];
return true;