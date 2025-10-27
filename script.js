const myLibrary = [];

function Book(title, genre, description, author, pictureUrl, datePublished, pages, read) {
  // the constructor..
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.genre = genre;
  this.description = description;
  this.pictureUrl = pictureUrl;
  this.datePublished = datePublished;
  this.read = (read === "yes" || read === true) ? true : false;
};

Book.prototype.updateRead = function(){
  this.read = (this.read === "yes" || this.read === true) ? true : false;
}

function addBookToLibrary(title, genre, description, author, pictureUrl, datePublished, pages, read) {
  // take params, create a book then a store it in the array
  const book = new Book(title, genre, description, author, pictureUrl, datePublished, pages, read);
  myLibrary.push(book);
}

const libContainer = document.querySelector("#library");
const addBookBtn = document.getElementById("openForm");
const modalForm = document.querySelector("dialog");
const addBookform = document.querySelector("button[type=submit]");
const dialogForm = document.getElementById("dialogForm");

if (!localStorage.hasOwnProperty("myLibrary")) {
  addBookToLibrary(
    "The Little Prince",
    "Novella",
    "A stranded aviator meets a young prince who has travelled from his tiny asteroid to Earth; through their encounter the story touches on themes of friendship, love, loss, loneliness and the human condition.",
    "Antoine de Saint-Exupéry",
    "https://upload.wikimedia.org/wikipedia/en/0/05/Littleprince.JPG",
    "April 1943",
    "96",
    true
  );

  addBookToLibrary(
    "Frankenstein; or, The Modern Prometheus",
    "Gothic novel",
    "Frankenstein tells the story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment that involved putting it together with different body parts.",
    "Mary Shelley",
    "https://upload.wikimedia.org/wikipedia/commons/6/65/Frankenstein_and_Monster_-_The_Cincinnati_Enquirer%2C_1910.jpg",
    "January 1818",
    "280",
    false
  );
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
} else {
  const books = JSON.parse(localStorage.getItem("myLibrary"));
  books.forEach(book => {
    myLibrary.push(book);
  });
}
refreshBooks()

addBookBtn.addEventListener("click", () => {
  modalForm.showModal();
  addBookform.addEventListener("click", (e) => {
    e.preventDefault();
    const title =  document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const pages = document.getElementById("pages").value.trim();
    const description =  document.getElementById("description").value.trim();
    const read =  document.querySelector(".btn-container input[type=radio]:checked").value;
    const imgUrl = document.getElementById("imgUrl").value.trim();
    const datePublished = document.getElementById("datePublished").value.trim();
    addBookToLibrary(title, genre, description, author, imgUrl, datePublished, pages, read);
    
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    dialogForm.style.display = "none";
    
    refreshBooks()
  });
});

function makeBookCard(book) {
  const bookBox = document.createElement("div");
  bookBox.setAttribute("class", "book-box");

  const img = document.createElement("img");
  img.setAttribute("src", book.pictureUrl);

  const title = document.createElement("h2");
  title.textContent = book.title;

  const description = document.createElement("div");
  const descriptionTitle = document.createElement("p");
  descriptionTitle.innerHTML = '<b>Description: </b>';
  const descriptionContent = document.createElement("p");
  descriptionContent.className = "desc-text";
  descriptionContent.textContent = book.description;
  description.append(descriptionTitle, descriptionContent);

  const genre = document.createElement("p");
  genre.innerHTML = '<b>Genre: </b>';
  const genreContent = document.createElement("span");
  genreContent.textContent = book.genre;
  genre.appendChild(genreContent);

  const author = document.createElement("p");
  author.innerHTML = "<b>Author: </b>"
  const authorContent = document.createElement("span");
  authorContent.textContent = book.author;
  author.appendChild(authorContent);

  const datePublished = document.createElement("p");
  datePublished.innerHTML = "<b>Date: </b>"
  const date = document.createElement("span");
  date.textContent = book.datePublished;
  datePublished.appendChild(date);

  const pages = document.createElement("p");
  pages.innerHTML = "<b>Pages: </b>";
  const pagesContent = document.createElement("span");
  pagesContent.textContent = book.pages + " pages";
  pages.appendChild(pagesContent);

  const status = document.createElement("p");
  status.innerHTML = "<b>Status: </b>";
  const statusContent = document.createElement("span");
  statusContent.setAttribute("class", "status")
  statusContent.textContent = book.read === false ? "Not Read" : "Read 🤓";
  status.appendChild(statusContent);

  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "btn-container")

  const readBtn = document.createElement("button");
  readBtn.textContent = "Mark Read";
  readBtn.dataset.id = book.id
  readBtn.value = (book.read === false || book.read === "no") ? "Not read" : "Read";

  const removeBook = document.createElement("button");
  removeBook.setAttribute("class","removeBtn")
  removeBook.textContent = "Remove book";
  removeBook.dataset.id = book.id
  buttonContainer.append(readBtn, removeBook);
  bookBox.append(img, title, author,datePublished, genre, pages, description, status, buttonContainer);

    bookBox.addEventListener("click",(e)=>{
    if (e.target.tagName === "BUTTON"){
      const id = e.target.dataset.id;
      const indexToUpdate = myLibrary.findIndex(book => book.id === id);
      if (e.target.value === "Not read" || e.target.value === "Read"){
        //(myLibrary[indexToUpdate].updateRead();
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
      }
      else if(e.target.className === "removeBtn"){
        myLibrary.splice(indexToUpdate,1);
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
      }
    }
    refreshBooks()
    console.log(myLibrary);
  })
  libContainer.appendChild(bookBox);
}

function refreshBooks(){
  const books = document.querySelectorAll(".book-box")
  if (books.length > 0) books.forEach((book)=>{book.remove();});

  if (myLibrary.length > 0) {
    myLibrary.forEach(book => { makeBookCard(book) });
  }
}