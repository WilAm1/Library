function Book(title, author, pages, haveReadIT) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finishedReading = haveReadIT;
}

Book.prototype.toggleRead = function() {
    this.finishedReading = (this.finishedReading) ? false : true;
    saveToLocalStorage();
    return this.finishedReading
};

// localStorage Functions
const addBookToLibrary = function(book) {
    myLibrary.push(book);
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

const JSONToBook = function(book) {
    return new Book(book.title, book.author, book.pages, book.finishedReading)
}

function getLocalStorage() {
    const library = JSON.parse(localStorage.getItem('library'));
    if (!library) return []
    return library.map(book => JSONToBook(book))
}


// Book div and its content
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
    refreshLibrary();
    saveToLocalStorage();
};

const addBookBtns = function(div, arrNum) {
    const btnsContainer = document.createElement('div');
    btnsContainer.classList.add('book-btn-container');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'REMOVE';
    removeBtn.setAttribute(`data-array-number`, arrNum);
    removeBtn.classList.add('remove-book');
    removeBtn.onclick = removeBook;
    btnsContainer.appendChild(removeBtn);
    const readBtn = document.createElement('button');
    readBtn.textContent = "HAVE READ IT";
    readBtn.classList.add('toggle=read-book');
    readBtn.setAttribute(`data-array-number`, arrNum);
    readBtn.onclick = toggleReadStatus;
    btnsContainer.appendChild(readBtn);

    div.appendChild(btnsContainer);
}

const isFinishedIcon = function(bool) {
    return (bool) ? ' FINISHED READING: ✅' : ' FINISHED READING: ❌'
};

const toggleReadStatus = function(e) {
    const bookNumber = e.target.getAttribute('data-array-number');
    const isReading = myLibrary[bookNumber].toggleRead();
    const isReadingElement = document.querySelector(`.finishedReading-${bookNumber}`);
    isReadingElement.textContent = isFinishedIcon(isReading);
};

// Add book object content to its div element
const populateBookDiv = function(div, book, arrayNumber) {
    for (const prop in book) {
        if (book.hasOwnProperty(prop)) {
            const paragraphElement = document.createElement('p');
            paragraphElement.classList.add(prop);
            paragraphElement.classList.add(`${prop}-${arrayNumber}`);
            // adds the property to the paragraph text
            paragraphElement.textContent = (prop === 'finishedReading') ?
                `${isFinishedIcon(book[prop])}` : `${prop.toUpperCase()}: ${book[prop]}`;
            // Inserts before the buttons of remove and add .
            div.appendChild(paragraphElement);
        }
    }
    addBookBtns(div, arrayNumber);
}

const displayBooks = function(books, library) {
    // loops to the array of book objects and create seperate div for each book
    for (let i = 0; i < books.length; i++) {
        const bookDiv = createBookDiv(i);
        populateBookDiv(bookDiv, books[i], i);
        library.appendChild(bookDiv);
    }
}



function refreshLibrary() {
    // Works by removing the previous child element of the container and filling it with updated one
    const libraryContainer = document.querySelector('.library-container');
    libraryContainer.firstChild.remove();
    const bookLibrary = document.createElement('div');
    bookLibrary.classList.add('book-library');
    displayBooks(myLibrary, bookLibrary);
    libraryContainer.appendChild(bookLibrary);

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

// Form and Submit Input
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
    const form = document.querySelector('#form');
    form.reset();
    const book = new Book(name, author, pages, readIt);
    errorElement.classList.remove('active');
    return book
}

const submitFormBtnDOM = document.querySelector('#submit-form-btn');
submitFormBtnDOM.addEventListener('click', () => {
    const newBook = getFormInput();
    if (!newBook) return
    addBookToLibrary(newBook);
    refreshLibrary();
    saveToLocalStorage();
    modal.style.display = "none"
});



// const Book1 = new Book('Sample Book Title', 'WilAmI', '123', true);
let myLibrary = getLocalStorage();

refreshLibrary();