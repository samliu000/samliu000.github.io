import { listBlogPosts } from "./blog.js";

// blog post add/edit dialog
const blogDialog = document.getElementById("blog-dialog");

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
function showDialog(blogPosts, method, blogIndex = -1) {
  let dialogLegend =
    method == "edit" ? "Edit Blog Post" : "Create New Blog Post";
  let blogTitle = method == "edit" ? blogPosts[blogIndex].title : "";
  let blogSummary = method == "edit" ? blogPosts[blogIndex].summary : "";

  blogDialog.innerHTML = `<form method="dialog">
          <legend>${dialogLegend}</legend>
          <label for="blog-title-input">Title</label><br>
          <input type="text" id="blog-title-input" value="${blogTitle}" required></input><br>
  
          <label for="blog-summary-input">Summary</label><br>
          <textarea id="blog-summary-input" rows="5" cols="50" required>${blogSummary}</textarea><br>
  
          <button id="submit-blog-post">Submit</button>
      </form>`;

  // add event listener for submit button
  const submitBlogPostBtn = document.getElementById("submit-blog-post");
  submitBlogPostBtn.addEventListener("click", () => {
    onSubmitBlogPost(blogPosts, method, blogIndex);
  });

  // show the dialog
  blogDialog.show();
}

// create event listener for submit blog post button
function onSubmitBlogPost(blogPosts, method, blogIndex) {
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

export { clearDialogInputs, showDialog };
