/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/

let aria = {};

aria.KeyCode = {
	ESC: 27
};

aria.Utils = {};

aria.Utils.IgnoreUtilFocusChanges = false;
aria.Utils.dialogOpenClass = 'has-dialog';
aria.OpenDialogList = new Array(0);

aria.Utils.attemptFocus = function (element) {
	aria.Utils.IgnoreUtilFocusChanges = true;
	try {
		element.focus();
	} catch (error) {
	}
	aria.Utils.IgnoreUtilFocusChanges = false;
	return (document.activeElement === element);
};

aria.Utils.focusFirstDescendant = function (element) {
	for (var i = 0; i < element.childNodes.length; i++) {
		var child = element.childNodes[i];
		if (aria.Utils.attemptFocus(child) ||
			aria.Utils.focusFirstDescendant(child)) {
			return true;
		}
	}
	return false;
};

aria.Utils.focusLastDescendant = function (element) {
	for (var i = element.childNodes.length - 1; i >= 0; i--) {
		var child = element.childNodes[i];
		if (aria.Utils.attemptFocus(child) ||
			aria.Utils.focusLastDescendant(child)) {
			return true;
		}
	}
	return false;
};

aria.getCurrentDialog = function () {
	if (aria.OpenDialogList && aria.OpenDialogList.length) {
		return aria.OpenDialogList[aria.OpenDialogList.length - 1];
	}
};

aria.Utils.remove = function (item) {
	if (item.remove && typeof item.remove === 'function') {
		return item.remove();
	}
	if (item.parentNode &&
		item.parentNode.removeChild &&
		typeof item.parentNode.removeChild === 'function') {
		return item.parentNode.removeChild(item);
	}
	return false;
};

aria.closeCurrentDialog = function () {
	var currentDialog = aria.getCurrentDialog();
	if (currentDialog) {
		currentDialog.close();
		return true;
	}
	return false;
};

aria.handleEscape = function (event) {
	var key = event.which || event.keyCode;
	if (key === aria.KeyCode.ESC && aria.closeCurrentDialog()) {
		event.stopPropagation();
	}
};

export default aria;
