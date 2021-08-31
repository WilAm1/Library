function Book(title, author, pages, haveReadIT) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finishedReading = haveReadIT;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function createBookDiv() {
    const div = document.createElement('div');
    div.classList.add('book');
    return div
}

function populateBookDiv(div, book) {
    for (const prop in book) {
        if (book.hasOwnProperty(prop)) {
            const paragraphElement = document.createElement('p');
            paragraphElement.classList.add(prop);
            paragraphElement.textContent = (prop === 'finishedReading') ?
                `FINISHED READING: ${book[prop]}` : `${prop.toUpperCase()}: ${book[prop]}`;
            div.appendChild(paragraphElement);
        }

    }
    // const titlePara = document.createElement('p');
    // const authorPara = document.createElement('p');
    // const pagesPara = document.createElement('p');
    // const haveReadITPara = document.createElement('p');
    // titlePara.textContent = `Title: ${book.title}`;
    // authorPara.textContent = `Author: ${book.title}`;
    // pagesPara.textContent = `Pages: ${book.title}`;
    // haveReadITPara.textContent = `Have read it: ${book.haveReadIT}`;
    // div.appendChild(titlePara);
    // div.appendChild(authorPara);
    // div.appendChild(pagesPara);
    // div.appendChild(haveReadITPara);
}

const Book1 = new Book('fart', 'fastfary', 123, false);
const Book2 = new Book('fart2', 'fastfary', 123, false);
const Book3 = new Book('fart3', 'fastfary', 123, false);
let myLibrary = [Book1, Book2, Book3];
// title author total pages Have you read it?
const bookContainerDOM = document.querySelector('.book-container');


function displayBooks(book) {
    const bookDiv = createBookDiv();
    populateBookDiv(bookDiv, book);
    bookContainerDOM.appendChild(bookDiv);
}

function refreshLibrary() {
    myLibrary.forEach(displayBooks);
}

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
    console.log(book);
}

submitFormBtnDOM.onclick = getFormInput
refreshLibrary()