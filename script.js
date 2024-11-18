const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if (read) {
      this.status = "Read";
    } else {
      this.status = "Not read";
    }
    myLibrary.push(this);
  }
}

const Book1 = new Book("The Hobbit", "J.R.R. Tolkien", "389", false);
const Book2 = new Book("The Great Gatsby", "Scott Fitzgerald", "234", true);
const Book3 = new Book("Ulysses", "James Joyce", "132", true);
const Book4 = new Book("Pan Tadeusz", "Adam Mickiewicz", "567", false);
const Book5 = new Book("1984", "George Orwell", "128", true);

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const obj = Object.fromEntries(fd);
  console.log(obj);
  if (obj.read) {
    obj.read = true;
  } else {
    obj.read = false;
  }
  new Book(obj.title, obj.author, obj.pages, obj.read);
  form.reset();
  clearBooks();
  updateBookDisplay();
  console.log(myLibrary);
});

const mainContent = document.querySelector(".main-content");

function updateBookDisplay() {
  let i = 0;
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    mainContent.appendChild(bookCard);
    const titleSpace = document.createElement("h3");
    titleSpace.textContent = `${book.title}`;
    bookCard.appendChild(titleSpace);
    const authorSpace = document.createElement("span");
    authorSpace.textContent = `${book.author}`;
    bookCard.appendChild(authorSpace);
    const pagesSpace = document.createElement("span");
    pagesSpace.textContent = `${book.pages}`;
    bookCard.appendChild(pagesSpace);
    const statusSpace = document.createElement("span");
    statusSpace.textContent = `${book.status}`;
    bookCard.appendChild(statusSpace);
    const removeBookBtn = document.createElement("button");
    removeBookBtn.textContent = "Remove";
    bookCard.appendChild(removeBookBtn);
    removeBookBtn.addEventListener("click", () => {
      myLibrary.splice(myLibrary.indexOf(book), 1);
      clearBooks();
      updateBookDisplay();
    });
    const changeStatusBtn = document.createElement("button");
    changeStatusBtn.textContent = "Change status";
    bookCard.appendChild(changeStatusBtn);
    changeStatusBtn.addEventListener("click", function () {
      const bookIndex = bookCard.dataset.arrayid;
      if (myLibrary.at(bookIndex).status == "Read") {
        myLibrary.at(bookIndex).status = "Not read";
      } else if (myLibrary.at(bookIndex).status == "Not read") {
        myLibrary.at(bookIndex).status = "Read";
      }
      statusSpace.textContent = `${myLibrary.at(bookIndex).status}`;
    });
    i++;
  });
}

function clearBooks() {
  while (mainContent.lastElementChild) {
    mainContent.removeChild(mainContent.lastElementChild);
  }
}

updateBookDisplay();
