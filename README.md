Setup and utils taken from "Tab Kit Highlighter" by PikachuEXE.
Understanding of tab properties taken from "Tab Mix Plus" and MDN's XUL documents.

My tabs started being restored by the session manager in the incorrect order, and I narrowed down the problem to latest version of Tree Style Tabs and Tab Mix Plus. Can't fault the sole creator and maintainer of TMP as it is a massive extension, so I decided to split off the options I personally use and practically can't live without.

- Bold currently selected tab.
- Italicized and colorize text for unloaded or "pending" tabs.
- Prevent blank pages (e.g. when downloading).
- Set last active tab as current tab when closing the active tab.

TODO:
prevent blank pages
close tab puts us back to last used tab
	store last tab's index
	if active tab closes
	set active tab to last index
Add bools for these above options

Future TODO:
add custom options for CSS