function Book(title, author, pages, haveReadIT) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finishedReading = haveReadIT;
}

Book.prototype.toggleRead = function() {
    this.finishedReading = (this.finishedReading) ? false : true
    return this.finishedReading
};


const addBookToLibrary = function(book) {
    myLibrary.push(book);
}

const Book1 = new Book('Sample', 'Jonny', 123, false);
let myLibrary = [Book1];


const createBookDiv = function(arrayNum) {
    const div = document.createElement('div');
    div.classList.add('book');
    div.classList.add(`book-${arrayNum}`);
    return div
}

const removeBook = function(e) {
    const bookNumber = e.target.getAttribute('data-array-number');
    // Removes the book
    myLibrary = myLibrary.filter((book) => book !== myLibrary[bookNumber]);
    refreshLibrary()

};

const addBookBtns = function(div, arrNum) {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'REMOVE';
    removeBtn.setAttribute(`data-array-number`, arrNum);
    removeBtn.classList.add('remove-book');
    removeBtn.onclick = removeBook;
    div.appendChild(removeBtn);
    const readBtn = document.createElement('button');
    readBtn.textContent = "HAVE READ IT";
    readBtn.classList.add('toggle=read-book');
    readBtn.setAttribute(`data-array-number`, arrNum);
    readBtn.onclick = toggleReadStatus;
    div.appendChild(readBtn);
}

const isFinishedIcon = function(bool) {
    return (bool) ? ' FINISHED READING: ✅' : ' FINISHED READING: ❌'
};
const toggleReadStatus = function(e) {
    const isReadingElement = document.querySelector(`.finishedReading-${bookNumber}`);
    const bookNumber = e.target.getAttribute('data-array-number');
    const isReading = myLibrary[bookNumber].toggleRead();
    isReadingElement.textContent = isFinishedIcon(isReading);
    console.log(myLibrary[bookNumber].finishedReading);
};

const populateBookDiv = function(div, book, arrayNumber) {
    for (const prop in book) {
        if (book.hasOwnProperty(prop)) {
            const paragraphElement = document.createElement('p');
            paragraphElement.classList.add(prop);
            paragraphElement.classList.add(`${prop}-${arrayNumber}`);
            // adds the property to the paragraph text
            paragraphElement.textContent = (prop === 'finishedReading') ?
                `${isFinishedIcon(book[prop])}` : `${prop.toUpperCase()}: ${book[prop]}`;
            // Inserts before the remove and add buttons.
            div.appendChild(paragraphElement);
        }
    }
    addBookBtns(div, arrayNumber);
}
const displayBooks = function(books, library) {
    // loops to the array of books and create seperate div for each book
    for (let i = 0; i < books.length; i++) {
        const bookDiv = createBookDiv(i);
        populateBookDiv(bookDiv, books[i], i);
        library.appendChild(bookDiv);
    }
}

function refreshLibrary() {
    // Works by removing the previous child element of the container and filling it with updated one
    const libraryContainer = document.querySelector('.book-container');
    libraryContainer.firstChild.remove();
    const bookLibrary = document.createElement('div');
    bookLibrary.classList.add('book-library');
    libraryContainer.appendChild(bookLibrary);
    displayBooks(myLibrary, bookLibrary);
}

// Modal
const modalBtn = document.getElementById("modal-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
modalBtn.onclick = function() {
    modal.style.display = "block";
};
closeBtn.onclick = function() {
    modal.style.display = "none";
};
window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
};


const submitFormBtnDOM = document.querySelector('#submit-form-btn');
const checkValidInput = function(name, author, pages) {
    return (name !== '' && author !== '' && (pages !== '' && Number(pages) > 0))
}

const getFormInput = function() {
    const name = document.getElementById('name').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readIt = (document.getElementById('reading').checked) ? true : false;
    const errorElement = document.querySelector('.error');

    if (checkValidInput(name, author, pages) == false) {
        errorElement.classList.add('active');
        return
    }

    form.reset();
    const book = new Book(name, author, pages, readIt);
    const form = document.querySelector('#form');
    errorElement.classList.remove('active');

    return book
}

submitFormBtnDOM.addEventListener('click', () => {
    const newBook = getFormInput();
    if (!newBook) return
    addBookToLibrary(newBoo);
    refreshLibrary();
    modal.style.display = "none"

});

refreshLibrary();