// function that changes the dialog between the confirm, alert, prompt types
function modifyDialog(title, type) {
  const dialog = document.getElementById("custom-dialog");

  // setup text input field
  let textInput = "";
  if (type == "prompt") {
    textInput = `<input id="text-input" type="text"></input><br>`;
  }

  let cancelBtnHtml =
    type != "alert" ? `<button id="cancel-dialog">Cancel</button>` : "";

  dialog.innerHTML = `
        <h2>${title}</h2>
        <form method="dialog">
            ${textInput}
            ${cancelBtnHtml}          
            <button id="confirm-dialog">Ok</button>
        </form>`;

  // setup cancel event listener
  const cancelBtn = document.getElementById("cancel-dialog");
  if (type == "confirm") {
    cancelBtn.addEventListener("click", onConfirmCancelPress);
  } else if (type == "prompt") {
    cancelBtn.addEventListener("click", onPromptCancelPress);
  }

  // setup confirm event listener
  const confirmBtn = document.getElementById("confirm-dialog");
  if (type == "confirm") {
    confirmBtn.addEventListener("click", onConfirmOkPress);
  } else if (type == "prompt") {
    confirmBtn.addEventListener("click", onPromptOkPress);
  } else if (type == "alert") {
    confirmBtn.addEventListener("click", onAlertOkPress);
  }
}

// resets the output tag to be blank
function resetOutputTag() {
  const outputElem = document.getElementById("output");
  outputElem.innerHTML = "";
}

// Set up dialog buttons
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

// Set up form collection
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

export { onAlertPress, onConfirmPress, onPromptPress };
