const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if(read === true) {
        this.status = "Read";
    } else if(read === false) {
        this.status = "Not read";
    }
    myLibrary.push(this);
}
}

const Book1 = new Book ("The Hobbit", "J.R.R. Tolkien", "389", false);
const Book2 = new Book ("The Great Gatsby", "Scott Fitzgerald", "234", true);
const Book3 = new Book ("Ulysses", "James Joyce", "132", true);
const Book4 = new Book ("Pan Tadeusz", "Adam Mickiewicz", "567", false);
const Book5 = new Book ("1984", "George Orwell", "128", true);

function addBookToLibrary() {
    let title = document.querySelector("#bookTitle").value;
    let author = document.querySelector("#bookAuthor").value;
    let pages = document.querySelector("#bookPages").value;
    let read;
    if (document.querySelector("#bookRead").checked == true) {
    read = true;
    } else {
    read = false;
    }
    const book = new Book(title, author, pages, read);
    document.querySelector("#bookTitle").value = '';
    document.querySelector("#bookAuthor").value = '';
    document.querySelector("#bookPages").value = '';
    document.querySelector("#bookRead").checked = false;
    clearBooks();
    updateBookDisplay();
}

const btn = document.querySelector("#addBook");
btn.addEventListener('click', addBookToLibrary);
btn.addEventListener('click', (event) => {
    event.preventDefault();
});

const mainContent = document.querySelector(".main-content") ;

function updateBookDisplay() {
    let i = 0;
    myLibrary.forEach(function(book) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card", );
        bookCard.setAttribute("data-arrayid", i);
        mainContent.appendChild(bookCard);
        const titleSpace = document.createElement("h3");
        titleSpace.textContent = `${book.title}`
        bookCard.appendChild(titleSpace);
        const authorSpace = document.createElement("span");
        authorSpace.textContent = `${book.author}`
        bookCard.appendChild(authorSpace);
        const pagesSpace = document.createElement("span");
        pagesSpace.textContent = `${book.pages}`
        bookCard.appendChild(pagesSpace);
        const statusSpace = document.createElement("span");
        statusSpace.textContent = `${book.status}`
        bookCard.appendChild(statusSpace);
        const removeBookBtn = document.createElement("button");
        removeBookBtn.textContent = "Remove";
        bookCard.appendChild(removeBookBtn);
        removeBookBtn.addEventListener("click", function(){
            const bookIndex = bookCard.dataset.arrayid;
            myLibrary.splice(bookIndex, 1);
            clearBooks();
            updateBookDisplay();
        })
        const changeStatusBtn = document.createElement("button");
        changeStatusBtn.textContent = "Change status";
        bookCard.appendChild(changeStatusBtn);
        changeStatusBtn.addEventListener("click", function(){
            const bookIndex = bookCard.dataset.arrayid;
            if(myLibrary.at(bookIndex).status == "Read") {
            myLibrary.at(bookIndex).status = "Not read"
            } else if(myLibrary.at(bookIndex).status == "Not read") {
            myLibrary.at(bookIndex).status = "Read"
            }
            statusSpace.textContent = `${myLibrary.at(bookIndex).status}`
        })
        i++;
    })
}

function clearBooks() {
    while(mainContent.lastElementChild) {
        // const bookCard = document.querySelector(".book-card");
        mainContent.removeChild(mainContent.lastElementChild);
    } 
}

updateBookDisplay();