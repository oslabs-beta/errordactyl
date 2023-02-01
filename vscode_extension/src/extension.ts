try {
	require("module-alias/register");
} catch (e) {
	console.log("module-alias import error !");
}
import * as vscode from "vscode";
import { EXTENSION_CONSTANT } from "./constant";
import { SidebarWebview } from "./providers/sidebar-provider";

export function activate(context: vscode.ExtensionContext) {
	// Register view
	const SidebarWebViewProvider = new SidebarWebview(context?.extensionUri, {});
	let view = vscode.window.registerWebviewViewProvider(
		EXTENSION_CONSTANT.SIDEBAR_WEBVIEW_ID,
		SidebarWebViewProvider,
		{
			webviewOptions: {retainContextWhenHidden: true,}
		}
	);
	context.subscriptions.push(view);
};

// this method is called when your extension is deactivated
export function deactivate() {}