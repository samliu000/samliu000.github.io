import { clearDialogInputs, showDialog } from "./blog-dialog-utilities.js";

// variable that stores all blog posts in Object format
let blogPosts = JSON.parse(localStorage.getItem("blog-list")) || [];

// function that shows the current blogPosts onto the screen
function listBlogPosts() {
  const blogList = document.getElementById("blog-list");
  blogList.innerHTML = "";
  for (let i = 0; i < blogPosts.length; i++) {
    const blogPost = blogPosts[i];
    const domBlogItem = document.createElement("li");
    domBlogItem.innerHTML = `<h2>${blogPost.title} (${blogPost.date})</h2>
        <p>${blogPost.summary}</p>
        <button id="edit${i}">Edit</button>
        <button id="delete${i}">Delete</button>`;
    blogList.appendChild(domBlogItem);

    attachBlogPostListeners(i);
  }
}

// attach edit and delete event listeners
function attachBlogPostListeners(blogIndex) {
  const editButton = document.getElementById("edit" + blogIndex);
  const deleteButton = document.getElementById("delete" + blogIndex);
  editButton.addEventListener("click", () => {
    showDialog(blogPosts, "edit", blogIndex);
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

// create event listener for add blog post button
function addBlogPost() {
  clearDialogInputs();
  showDialog(blogPosts, "add");
}
const addBlogPostBtn = document.getElementById("add-blog-post");
addBlogPostBtn.addEventListener("click", addBlogPost);

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

export { listBlogPosts };
