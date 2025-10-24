const myLibrary = [];

function Book(title,genre,description,author,pictureUrl,releaseDate,pages,read) {
  // the constructor..
  if (!new.target){
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

  this.makeBook = function() {
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

function addBookToLibrary(title,genre,description,author,pictureUrl,releaseDate,pages,read) {
  // take params, create a book then a store it in the array
  const book = new Book(title,genre,description,author,pictureUrl,releaseDate,pages,read);
  myLibrary.push(book.makeBook())
}

const example = addBookToLibrary(
  "The Little Prince",
  "Novella",
  "A stranded aviator meets a young prince who has travelled from his tiny asteroid to Earth; through their encounter the story touches on themes of friendship, love, loss, loneliness and the human condition.",
  "https://upload.wikimedia.org/wikipedia/en/0/05/Littleprince.JPG",
  "Antoine de Saint-Exupéry",
  "April 1943",
  "96 pages",
  true
);

