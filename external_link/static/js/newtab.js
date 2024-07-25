const React = window.React
const Modifier = window.DraftJS.Modifier
const EditorState = window.DraftJS.EditorState

// Define NewTabLinkSource class to create a new entity when rendered
class NewTabLinkSource extends React.Component {
  // Create the entity and get its key when the component is mounted
  componentDidMount() {
    const { editorState, entityType } = this.props;
    const content = editorState.getCurrentContent();

    // Create a new entity using Draft.js API with the specified data
    const contentWithEntity = content.createEntity(
      entityType.type,
      "MUTABLE",
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
  };

  // Render the component and handle the "Open link in new tab" button click
  render() {
    const { editorState, entityKey, onComplete } = this.props;
    createAndHandleLinkForm(editorState, entityKey, onComplete);
    return "";
  };
}

// Define NewTabLink functional component to render the new tab link
const NewTabLink = (props) => {
  const { entityKey, contentState, children } = props;
  const data = contentState.getEntity(entityKey).getData();

  // Create an anchor element with target set to open in a new tab
  return React.createElement(
    "a",
    {
      href: data.url,
      target: "_blank",
      rel: "noopener noreferrer"
    },
    children
  );
};

// Register the plugin when the script loads, to make the editor load as expected
window.draftail.registerPlugin(
  {
    type: "NEW_TAB_LINK",
    source: NewTabLinkSource,
    decorator: NewTabLink,
  }
);

// Create and handle the link form when called
function createAndHandleLinkForm(editorState, entityKey, onComplete) {
  // Get the selected text from the editor state
  const selection = editorState.getSelection();
  const anchorKey = selection.getAnchorKey();
  const currentContent = editorState.getCurrentContent();
  const currentBlock = currentContent.getBlockForKey(anchorKey);
  const start = selection.getStartOffset();
  const end = selection.getEndOffset();
  const selectedText = currentBlock.getText().slice(start, end);

  // Create FormModal and its elements
  const formModal = document.createElement("div");
  formModal.id = "form-modal";
  formModal.classList.add("modal-form");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-form-content");

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";

  const form = document.createElement("form");
  form.id = "link-form";

  const URLTextLabel = document.createElement("label");
  URLTextLabel.setAttribute("for", "url-text");
  URLTextLabel.textContent = "URL Text:";

  const URLTextInput = document.createElement("input");
  URLTextInput.type = "text";
  URLTextInput.id = "url-text";
  URLTextInput.name = "url-text";
  URLTextInput.required = true;
  URLTextInput.value = selectedText;

  const URLLabel = document.createElement("label");
  URLLabel.setAttribute("for", "url");
  URLLabel.textContent = "URL:";

  const URLInput = document.createElement("input");
  URLInput.type = "text";
  URLInput.id = "url-text";
  URLInput.name = "url-text";
  URLInput.required = true;

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Submit";
  submitBtn.classList.add("submit-btn");

  const brElement = document.createElement("br");

  const errorMessage = document.createElement("div");
  errorMessage.id = "error-message";
  errorMessage.style.color = "red";

  // Assemble form
  form.appendChild(URLTextLabel);
  form.appendChild(URLTextInput);
  form.appendChild(brElement);
  form.appendChild(brElement);
  form.appendChild(URLLabel);
  form.appendChild(URLInput);
  form.appendChild(errorMessage);
  form.appendChild(brElement);
  form.appendChild(brElement);
  form.appendChild(submitBtn);

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(form);
  formModal.appendChild(modalContent);
  document.body.appendChild(formModal);

  // Display the form modal
  formModal.classList.add("active");

  // Handle form modal close button click
  closeBtn.onclick = () => {
    formModal.classList.remove("active");
    document.body.removeChild(formModal);
    onComplete(editorState);
  };

  // Handle form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const urlText = URLTextInput.value;
    var url = URLInput.value;

    const isValidUrl = urlString=> {
      var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.@~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
      return !!urlPattern.test(urlString);
	  }

    // Check if a given string is a valid URL
    if (!isValidUrl(url)) {
      errorMessage.textContent = "Please enter a valid URL.";
      return;
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
    }


    // Reset the error message
    errorMessage.textContent = "";

    // Create a new entity with the updated URL data
    const content = editorState.getCurrentContent();
    const contentWithUpdatedEntity = content.createEntity(
      "NEW_TAB_LINK",
      "MUTABLE",
      { url }
    );
    const updatedEntityKey = contentWithUpdatedEntity.getLastCreatedEntityKey();

    // Update the EditorState with the new content
    const newState = EditorState.set(
      editorState,
      { currentContent: contentWithUpdatedEntity }
    );

    // Replace the selected text with the new link text and entity
    const newContent = Modifier.replaceText(
      newState.getCurrentContent(),
      newState.getSelection(),
      urlText,
      newState.getCurrentInlineStyle(),
      updatedEntityKey
    );

    // Push the new content to the editor state
    const nextState = EditorState.push(
      newState,
      newContent,
      "insert-characters"
    );

    // Complete the operation and close the form modal
    onComplete(nextState);
    formModal.style.display = "none";
    document.body.removeChild(formModal);
  });

  return form
}
