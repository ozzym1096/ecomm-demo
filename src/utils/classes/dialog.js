import aria from '../aria';
import { tick } from 'svelte';

/**
 * @constructor
 * @desc Dialog object providing modal focus management.
 *
 * @param dialogNode
 *          The element serving as the dialog container.
 * @param focusAfterClosed
 *          Either the DOM node or the ID of the DOM node to focus when the
 *          dialog closes.
 * @param focusFirst
 *          Optional parameter containing either the DOM node or the ID of the
 *          DOM node to focus when the dialog opens. If not specified, the
 *          first focusable element in the dialog will receive focus.
 */
aria.Dialog = function (dialogVisibility, dialogNode, focusAfterClosed, focusFirst) {
	this.dialogVisibility = dialogVisibility;

	// Disable scroll on the body element
	document.body.classList.add(aria.Utils.dialogOpenClass);

	if (typeof dialogNode !== 'object') {
		throw new Error(`${dialogNode} is not an element`);
	}
	else {
		this.dialogNode = dialogNode;
	}

	if (typeof focusAfterClosed === 'string') {
		this.focusAfterClosed = document.getElementById(focusAfterClosed);
	}
	else if (typeof focusAfterClosed === 'object') {
		this.focusAfterClosed = focusAfterClosed;
	}
	else {
		throw new Error(
			'the focusAfterClosed parameter is required for the aria.Dialog constructor.');
	}

	if (typeof focusFirst === 'object') {
		this.focusFirst = focusFirst;
	}
	else {
		throw new Error(
			'the focusFirst parameter is required for the aria.Dialog constructor.');
	}

	// Bracket the dialog node with two invisible, focusable nodes.
	// While this dialog is open, we use these to make sure that focus never
	// leaves the document even if dialogNode is the first or last node.
	var preDiv = document.createElement('div');
	this.preNode = this.dialogNode.parentNode.insertBefore(preDiv,
		this.dialogNode);
	this.preNode.tabIndex = 0;
	this.preNode.style.position = "absolute";
	var postDiv = document.createElement('div');
	this.postNode = this.dialogNode.parentNode.insertBefore(postDiv,
		this.dialogNode.nextSibling);
	this.postNode.style.position = "absolute";
	this.postNode.tabIndex = 0;

	this.addListeners();
	aria.OpenDialogList.push(this);
	this.focusFirst.focus();
	this.lastFocus = document.activeElement;
}; // end Dialog constructor

aria.Dialog.prototype.trapFocus = function (event) {
	if (aria.Utils.IgnoreUtilFocusChanges) {
		return;
	}
	var currentDialog = aria.getCurrentDialog();
	if (currentDialog.dialogNode.contains(event.target)) {
		currentDialog.lastFocus = event.target;
	}
	else {
		aria.Utils.focusFirstDescendant(currentDialog.dialogNode);
		if (currentDialog.lastFocus == document.activeElement) {
			aria.Utils.focusLastDescendant(currentDialog.dialogNode);
		}
		currentDialog.lastFocus = document.activeElement;
	}
};

aria.Dialog.prototype.addListeners = function () {
	document.addEventListener('focus', this.trapFocus, true);
	document.addEventListener('keyup', aria.handleEscape);
};

aria.Dialog.prototype.removeListeners = function () {
	document.removeEventListener('keyup', aria.handleEscape);
	document.removeEventListener('focus', this.trapFocus, true);
};

aria.Dialog.prototype.close = async function () {
	aria.OpenDialogList.pop();
	this.removeListeners();
	aria.Utils.remove(this.preNode);
	aria.Utils.remove(this.postNode);
	document.body.classList.remove(aria.Utils.dialogOpenClass);
	this.dialogVisibility.set(false);
	setTimeout(() => this.focusAfterClosed.focus(), 100);
};

export const openDialog = async function (dialogVisibility, dialogNode, focusAfterClosed, focusFirst) {
	dialogVisibility.set(true);
	await tick();
	new aria.Dialog(dialogVisibility, dialogNode, focusAfterClosed, focusFirst);
};

export const closeDialog = function () {
	aria.getCurrentDialog().close();
};
