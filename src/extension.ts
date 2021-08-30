import * as vscode from "vscode";
import { generateUnitTest } from "ng-generate-tests";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "ng:generateUnitTest",
    (uri: vscode.Uri) => {
      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Scanning the file to generate unit test",
          cancellable: false
        },
        async (progress) => {
          var p = new Promise(resolve => {
            setTimeout(async () => {
              try {
                await generateUnitTest(uri.fsPath);
              }
              catch(err) {
                vscode.window.showErrorMessage("Error generating unit test for file");
                return resolve(false);
              }
              progress.report({
                increment: 100,
                message: "Generated Unit test Successfully."
              });
              return resolve(true);
            }, 0);
          });
          return p;
        }
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
