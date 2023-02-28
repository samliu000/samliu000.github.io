// variable that stores all blog posts in Object format
let blogPosts = JSON.parse(localStorage.getItem("blog-list")) || [];

// blog post add/edit dialog
const blogDialog = document.getElementById("blog-dialog");

// function that shows the current blogPosts onto the screen
function listBlogPosts() {
  const blogList = document.getElementById("blog-list");
  blogList.innerHTML = "";
  for (let i = 0; i < blogPosts.length; i++) {
    const blogPost = blogPosts[i];
    const domBlogItem = document.createElement("li");
    domBlogItem.innerHTML = `<h2>${blogPost.title} (${blogPost.date})</h2>
        <p>${blogPost.summary}</p>
        <img id="edit${i}" src="images/edit_icon.svg" alt="edit blog post" width="25" height="25">
        <img id="delete${i}" src="images/trash_icon.svg" alt="delete blog post" width="25" height="25">`;
    blogList.appendChild(domBlogItem);

    attachBlogPostListeners(i);
  }
}

// attach edit and delete event listeners
function attachBlogPostListeners(blogIndex) {
  const editButton = document.getElementById("edit" + blogIndex);
  const deleteButton = document.getElementById("delete" + blogIndex);
  editButton.addEventListener("click", () => {
    showDialog("edit", blogIndex);
  });
  deleteButton.addEventListener("click", () => {
    deleteBlogPost(blogIndex);
  });
}
function deleteBlogPost(blogIndex) {
  blogPosts.splice(blogIndex, 1);

  // convert blogPosts to a string with JSON.stringify and save to localStorage
  localStorage.setItem("blog-list", JSON.stringify(blogPosts));

  listBlogPosts();
}

// clear all dialog input fields
function clearDialogInputs() {
  const blogTitle = document.getElementById("blog-title-input");
  const blogSummary = document.getElementById("blog-summary-input");
  if (blogTitle != null) {
    blogTitle.value = "";
  }
  if (blogSummary != null) {
    blogSummary.value = "";
  }
}

// show dialog function
function showDialog(method, blogIndex = -1) {
  let dialogLegend =
    method == "edit" ? "Edit Blog Post" : "Create New Blog Post";
  let blogTitle = method == "edit" ? blogPosts[blogIndex].title : "";
  let blogSummary = method == "edit" ? blogPosts[blogIndex].summary : "";

  blogDialog.innerHTML = `<form method="dialog">
        <legend>${dialogLegend}</legend>
        <label for="blog-title-input">Title</label><br>
        <input type="text" id="blog-title-input" value="${blogTitle}" required></input><br>

        <label for="blog-summary-input">Summary</label><br>
        <textarea id="blog-summary-input" rows="5" cols="70" required>${blogSummary}</textarea><br>

        <button id="submit-blog-post">Submit</button>
    </form>`;

  // add event listener for submit button
  const submitBlogPostBtn = document.getElementById("submit-blog-post");
  submitBlogPostBtn.addEventListener("click", () => {
    onSubmitBlogPost(method, blogIndex);
  });

  // show the dialog
  blogDialog.show();
}
// create event listener for add blog post button
function addBlogPost() {
  clearDialogInputs();
  showDialog("add");
}
const addBlogPostBtn = document.getElementById("add-blog-post");
addBlogPostBtn.addEventListener("click", addBlogPost);

// create event listener for submit blog post button
function onSubmitBlogPost(method, blogIndex) {
  const newBlogTitle = document.getElementById("blog-title-input").value;
  const newBlogSummary = document.getElementById("blog-summary-input").value;

  // do not add new blog post if user left title or summary field blank
  if (newBlogTitle == "" || newBlogSummary == "") return;

  if (method == "add") {
    blogPosts.push({
      title: newBlogTitle,
      date: new Date().toLocaleDateString("en-US"),
      summary: newBlogSummary,
    });
  } else if (method == "edit") {
    blogPosts[blogIndex] = {
      title: newBlogTitle,
      date: new Date().toLocaleDateString("en-US"),
      summary: newBlogSummary,
    };
  }

  // convert blogPosts to a string with JSON.stringify and save to localStorage
  localStorage.setItem("blog-list", JSON.stringify(blogPosts));

  // refresh list to include new blog post
  listBlogPosts();
}

// initial display of all blog posts
if (blogPosts.length == 0) {
  blogPosts.push({
    title: "Javascript",
    date: new Date().toLocaleDateString("en-US"),
    summary:
      "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries.",
  });
  blogPosts.push({
    title: "Kotlin",
    date: new Date().toLocaleDateString("en-US"),
    summary:
      "Kotlin is a cross-platform, statically typed, general-purpose high-level programming language with type inference. Kotlin is designed to interoperate fully with Java, and the JVM version of Kotlin's standard library depends on the Java Class Library, but type inference allows its syntax to be more concise.",
  });
  blogPosts.push({
    title: "Rust",
    date: new Date().toLocaleDateString("en-US"),
    summary:
      "Rust is a multi-paradigm, high-level, general-purpose programming language. Rust emphasizes performance, type safety, and concurrency",
  });
}
listBlogPosts();

/*
TODOS:
- Put dialog stuff in separate module
*/
