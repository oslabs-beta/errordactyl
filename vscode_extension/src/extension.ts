import * as vscode from "vscode";
import { EXTENSION_CONSTANT } from "./utils/constant";
import { SidebarWebview } from "./providers/sidebar-provider";
import { LocalStorageWrapper } from './utils/localStorage'

export function activate(context: vscode.ExtensionContext) {

	let extStorage = new LocalStorageWrapper(context.globalState);
	let workspaceStorage = new LocalStorageWrapper(context.workspaceState);

	// Register view
	const SidebarWebViewProvider = new SidebarWebview(context?.extensionUri, extStorage, workspaceStorage);
	let view = vscode.window.registerWebviewViewProvider(
		EXTENSION_CONSTANT.SIDEBAR_WEBVIEW_ID,
		SidebarWebViewProvider
	);
	context.subscriptions.push(view);
};

// this method is called when your extension is deactivated
export function deactivate() {}