function Book(title, author, pages, haveReadIT) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finishedReading = haveReadIT;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}



const Book1 = new Book('fart', 'fastfary', 123, false);

let myLibrary = [Book1];
// title author total pages Have you read it?
const bookContainerDOM = document.querySelector('.book-container');


function createBookDiv() {
    const div = document.createElement('div');
    div.classList.add('book');
    return div
}

function displayBooks(books, library) {
    for (let i = 0; i < books.length; i++) {
        const bookDiv = createBookDiv();
        populateBookDiv(bookDiv, books[i], i);
        library.appendChild(bookDiv);
    }
}
const removeBook = function() {
    alert('hellos')
};

function addBookBtns(div, arrNum) {
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    removeBtn.textContent = 'REMOVE';
    readBtn.textContent = "READ";
    removeBtn.classList.add('remove-book');
    removeBtn.setAttribute(`data-${arrNum}`, "democlass")
    readBtn.classList.add('toggle=read-book');
    div.appendChild(removeBtn);
    div.appendChild(readBtn);
    removeBtn.onclick = removeBook;

}

function populateBookDiv(div, book, arrayNumber) {
    for (const prop in book) {
        if (book.hasOwnProperty(prop)) {
            const paragraphElement = document.createElement('p');
            paragraphElement.classList.add(prop);
            paragraphElement.textContent = (prop === 'finishedReading') ?
                `FINISHED READING: ${book[prop] ? '✅' : '❎'}` : `${prop.toUpperCase()}: ${book[prop]}`;
            // Inserts before the remove and add buttons.
            div.appendChild(paragraphElement);
        }
    }
    addBookBtns(div, arrayNumber);
}

function refreshLibrary() {
    bookContainerDOM.firstChild.remove();
    const bookLibrary = document.createElement('div');
    bookLibrary.classList.add('book-library');
    bookContainerDOM.appendChild(bookLibrary);
    displayBooks(myLibrary, bookLibrary);
}
// Modal
let modalBtn = document.getElementById("modal-btn")
let modal = document.querySelector(".modal")
let closeBtn = document.querySelector(".close-btn")
modalBtn.onclick = function() {
    modal.style.display = "block"
}
closeBtn.onclick = function() {
    modal.style.display = "none"
}
window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = "none"
    }
}

const submitFormBtnDOM = document.querySelector('#submit-form-btn');

const getFormInput = function() {
    const name = document.getElementById('name');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const readIt = (document.getElementById('reading').checked) ? true : false;
    const book = new Book(name.value, author.value, +pages.value, readIt);
    const form = document.querySelector('#form');
    form.reset();
    return book
}

submitFormBtnDOM.addEventListener('click', (e) => {
    const book = getFormInput();
    addBookToLibrary(book);
    refreshLibrary();
    modal.style.display = "none"

});

refreshLibrary();