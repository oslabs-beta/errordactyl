const vscode = acquireVsCodeApi();
document.getElementById(ELEMENT_IDS.PARSE_BUTTON).addEventListener('click', () => {
    vscode.postMessage({
        action: POST_MESSAGE_ACTION.PARSE_FILES,
    })
});