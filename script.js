const myLibrary = [];
//localStorage.setItem("library",JSON.stringify(myLibrary))

function Book(title, genre, description, author, pictureUrl, releaseDate, pages, read) {
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
  this.releaseDate = releaseDate;
  this.read = read;

  this.makeBook = function () {
    const book = {};

    book.id = this.id;
    book.title = this.title;
    book.genre = this.genre;
    book.description = this.description;
    book.author = this.author;
    book.pictureUrl = this.pictureUrl;
    book.releaseDate = this.releaseDate;
    book.pages = this.pages;
    book.read = this.read;

    return book
  };

};

function addBookToLibrary(title, genre, description, author, pictureUrl, releaseDate, pages, read) {
  // take params, create a book then a store it in the array
  const book = new Book(title, genre, description, author, pictureUrl, releaseDate, pages, read);
  myLibrary.push(book.makeBook())
}

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
  "The Little Prince",
  "Novella",
  "A stranded aviator meets a young prince who has travelled from his tiny asteroid to Earth; through their encounter the story touches on themes of friendship, love, loss, loneliness and the human condition.",
  "Antoine de Saint-Exupéry",
  "https://upload.wikimedia.org/wikipedia/en/0/05/Littleprince.JPG",
  "April 1943",
  "96",
  false
);

const libContainer = document.querySelector("#library");

myLibrary.forEach(book => {
  const bookBox = document.createElement("div");
  bookBox.setAttribute("class", "book-box");
  bookBox.dataset["id"] = book.id;

  const img = document.createElement("img");
  img.setAttribute("src", book.pictureUrl);

  const title = document.createElement("h2");
  title.textContent = book.title;

  const description = document.createElement("div");
  const descriptionTitle = document.createElement("p");
  descriptionTitle.innerHTML = '<b>Description: </b>';
  const descriptionContent = document.createElement("p");
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

  const pages = document.createElement("p");
  pages.innerHTML = "<b>Pages: </b>";
  const pagesContent = document.createElement("span");
  pagesContent.textContent = book.pages + " pages";
  pages.appendChild(pagesContent);

  const status = document.createElement("p");
  status.innerHTML = "<b>Status: </b>";
  const statusContent = document.createElement("span");
  statusContent.textContent = book.read === false ? "Not Read" : "Read 🤓";
  status.appendChild(statusContent);

  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "btn-container")

  const readBtn = document.createElement("button");
  readBtn.textContent = "Mark Read";
  readBtn.value = book.read === false ? "Not Read" : "Read";

  const removeBook = document.createElement("button");
  removeBook.textContent = "Remove book";
  buttonContainer.append(readBtn, removeBook);

  bookBox.append(img, title, author, genre, pages, description, status, buttonContainer);

  libContainer.appendChild(bookBox);
});


const addBookBtn = document.getElementById("openForm");
const modalForm = document.querySelector("dialog");
addBookBtn.addEventListener("click", (e) => {
  modalForm.showModal();
})