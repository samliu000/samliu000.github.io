function modifyDialog(title, type) {
  const dialog = document.getElementById("custom-dialog");

  // setup text input field
  let textInput = "";
  if (type == "prompt") {
    textInput = `<input id="text-input" type="text"></input><br>`;
  }

  // set up cancel button
  let cancelButtonFuncName = "onConfirmCancelPress";
  if (type == "prompt") {
    cancelButtonFuncName = "onPromptCancelPress";
  }
  let cancelButton = `<button onclick="${cancelButtonFuncName}()">Cancel</button>`;
  if (type == "alert") {
    cancelButton = "";
  }

  // set up ok button
  let okButtonFuncName = "onConfirmOkPress";
  if (type == "prompt") {
    okButtonFuncName = "onPromptOkPress";
  } else if (type == "alert") {
    okButtonFuncName = "onAlertPromptOkPress";
  }

  dialog.innerHTML = `
        <h2>${title}</h2>
        <form method="dialog">
            ${textInput}
            ${cancelButton}              
            <button onclick='${okButtonFuncName}()'>Ok</button>
        </form>`;
}

function resetOutputTag() {
  const outputElem = document.getElementById("output");
  outputElem.innerHTML = "";
}

/* Set up dialog buttons */
function onAlertPress() {
  resetOutputTag();
  setTimeout(() => {
    modifyDialog("Alert Pressed!", "alert");
    const dialog = document.getElementById("custom-dialog");
    dialog.show();
  }, 0);
}
function onConfirmPress() {
  resetOutputTag();
  setTimeout(() => {
    modifyDialog("Do you want to confirm this?", "confirm");
    const dialog = document.getElementById("custom-dialog");
    dialog.show();
  }, 0);
}
function onPromptPress() {
  resetOutputTag();
  setTimeout(() => {
    modifyDialog("What is your name?", "prompt");
    const dialog = document.getElementById("custom-dialog");
    dialog.show();
  }, 0);
}

/* Set up form collection */
function setOutputTag(message, type) {
  message = DOMPurify.sanitize(message);
  const outputElem = document.getElementById("output");
  const typeName = type == "prompt" ? "Prompt" : "Confirm";
  outputElem.innerHTML = `${typeName} result : ${message}`;
}
function onConfirmCancelPress() {
  setOutputTag("False", "confirm");
}
function onPromptCancelPress() {
  setOutputTag("User didn't enter anything", "prompt");
}
function onAlertOkPress() {
  // do nothing
}
function onConfirmOkPress() {
  setOutputTag("True", "confirm");
}
function onPromptOkPress() {
  const message = document.getElementById("text-input").value;
  setOutputTag(message, "prompt");
}