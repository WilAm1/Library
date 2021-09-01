function Book(title, author, pages, haveReadIT) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finishedReading = haveReadIT;
}
Book.prototype.toggleRead = function() {
    this.finishedReading = (this.finishedReading) ? false : true
    return this.finishedReading
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}



const Book1 = new Book('Sample', 'Jonny', 123, false);

let myLibrary = [Book1];
// title author total pages Have you read it?
const bookContainerDOM = document.querySelector('.book-container');


function createBookDiv(arrayNum) {
    const div = document.createElement('div');
    div.classList.add('book');
    div.classList.add(`book-${arrayNum}`);
    return div
}

function displayBooks(books, library) {
    for (let i = 0; i < books.length; i++) {
        const bookDiv = createBookDiv(i);
        populateBookDiv(bookDiv, books[i], i);
        library.appendChild(bookDiv);
    }
}
const removeBook = function(e) {
    const bookNumber = e.target.getAttribute('data-array-number');
    myLibrary = myLibrary.filter((book) => book !== myLibrary[bookNumber]);
    refreshLibrary()

};
const toggleReadStatus = function(e) {
    const bookNumber = e.target.getAttribute('data-array-number');
    const isReading = myLibrary[bookNumber].toggleRead();
    const paraIsReading = document.querySelector(`.finishedReading-${bookNumber}`);
    paraIsReading.textContent = isFinishedIcon(isReading);
    e.target.textContent = (isReading) ? 'READ' : 'NOT READ';
    console.log(myLibrary[bookNumber].finishedReading);
}

function addBookBtns(div, arrNum) {
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    removeBtn.textContent = 'REMOVE';
    readBtn.textContent = "READ";
    removeBtn.classList.add('remove-book');
    removeBtn.setAttribute(`data-array-number`, arrNum);
    readBtn.classList.add('toggle=read-book');
    readBtn.setAttribute(`data-array-number`, arrNum);
    div.appendChild(removeBtn);
    div.appendChild(readBtn);
    removeBtn.onclick = removeBook;
    readBtn.onclick = toggleReadStatus;
}

function isFinishedIcon(bool) {
    return (bool) ? ' FINISHED READING: ✅' : ' FINISHED READING: ❎'
}

function populateBookDiv(div, book, arrayNumber) {
    for (const prop in book) {
        if (book.hasOwnProperty(prop)) {
            const paragraphElement = document.createElement('p');
            paragraphElement.classList.add(prop);
            paragraphElement.classList.add(`${prop}-${arrayNumber}`);
            // 
            paragraphElement.textContent = (prop === 'finishedReading') ?
                `${isFinishedIcon(book[prop])}` : `${prop.toUpperCase()}: ${book[prop]}`;
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