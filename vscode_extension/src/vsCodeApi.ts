// interface for vscode class instance
interface vscode {
	postMessage(message: any): void;
    getState(): any;
    setState(newState: any): any
  }
  
declare const vscode: vscode;

class VSCodeWrapper {
    private readonly vscodeApi: vscode = vscode;

    /**
     * Send message to the extension framework.
     * @param message
     */
    public postMessage(message: any): void {
        this.vscodeApi.postMessage(message);
    }

    /**
     * Add listener for messages from extension framework.
     * @param callback called when the extension sends a message
     * @returns function to clean up the message eventListener.
     */
    public onMessage(callback: (message: any) => void): () => void {
        window.addEventListener('message', callback);
        return () => window.removeEventListener('message', callback);
    }

	public getState(): any {
		return this.vscodeApi.getState();
	}

	public setState(newState: any): void {
		this.vscodeApi.setState(newState);
	}
}

export const VSCodeAPI: VSCodeWrapper = new VSCodeWrapper();

