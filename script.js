let myLibrary = [Book1, Book2, Book3];
// title author total pages Have you read it?

function Book(title, author, pages, haveReadIT) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveReadIT = haveReadIT;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const Book1 = new Book('fart', 'fastfary', 123, false);
const Book2 = new Book('fart2', 'fastfary', 123, false);
const Book3 = new Book('fart3', 'fastfary', 123, false);

const bookContainerDOM = document.querySelector('.book-container');