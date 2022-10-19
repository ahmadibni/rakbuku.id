const books = [];
let inputJudul, 
    inputTahun,
    inputPenulis,
    isComplete,
    bookId,
    greenButtonVal,
    greenButton,
    redButton,
    uncompletedBookshelf,
    completedBookshelf,
    bookTitle,
    bookAuthor,
    bookYear,
    container,
    buttonContainer,
    bookSubmit;


const generateID = ()=>{
    return +new Date;
}

const generateBook = (id, title, author, year, isComplete)=>{
    return {
        id,
        title,
        author,
        year,
        isComplete,
    }
}

const addBook = ()=>{
    inputJudul = document.querySelector("#input-judul").value;
    inputPenulis = document.querySelector("#input-penulis").value;
    inputTahun = parseInt(document.querySelector("#input-tahun").value);
    isComplete = document.querySelector("#check-ifCompleted").checked;
    bookId = generateID();
    books.push(generateBook(bookId, inputJudul, inputPenulis, inputTahun, isComplete));
    render();
}

const findId = id => {
    for (const book of books) {
        if(book.id == id){
            return book;
        }
        return null;
    }
}

const findIndexBook = bookId => {
    for (const index of books) {            
        if(books[index].id === bookId){
            return index;
        }
    }
    return -1;
}

const moveToCompleted = id => {
    const bookTarget = findId(id);
    if(bookTarget == null) return;

    bookTarget.isComplete = true;
    render();
}

const moveToUncompleted = id => {
    const bookTarget = findId(id);
    if(bookTarget == null) return;

    bookTarget.isComplete = false;
    render();
}

const deleteBook = id => {
    const bookTarget = findIndexBook(id);

    if (bookTarget == -1) return;
    books.splice(bookTarget, 1);
    render();
}

const templateRak = element => {
    bookTitle = document.createElement('h3');
    bookTitle.textContent = element.title;
    
    bookAuthor = document.createElement('p');
    bookAuthor.textContent = "Penulis : " + element.author;
    
    bookYear = document.createElement('p');
    bookYear.textContent = "Tahun : " + element.year;
    
    greenButton = document.createElement('button');
    greenButton.classList.add('green');
    if(element.isComplete){
        greenButton.textContent = "Belum Dibaca";
        greenButton.addEventListener('click', ()=>{
            moveToUncompleted(element.id);
        });
    }
    else{
        greenButton.textContent = "Udah Dibaca";
        greenButton.addEventListener('click', ()=>{
            moveToCompleted(element.id);
        });
    }
    redButton = document.createElement('button');
    redButton.classList.add('red');
    redButton.textContent = 'Hapus Buku';
    redButton.addEventListener('click', ()=>{
        deleteBook(element.id);
    });

    buttonContainer = document.createElement('div');
    buttonContainer.classList.add('action');
    buttonContainer.append(greenButton, redButton);

    container = document.createElement('article');
    container.classList.add("book-item");
    container.append(bookTitle, bookAuthor, bookYear, buttonContainer);
    
    return container;
}


document.addEventListener("DOMContentLoaded", ()=>{
    
    bookSubmit = document.querySelector("#bookForm");
    bookSubmit.addEventListener('submit', function(event){
        event.preventDefault();
        
        addBook();
    });
});







const render = ()=>{
    uncompletedBookshelf = document.querySelector("#uncompletedBookshelfList");
    completedBookshelf = document.querySelector("#completedBookshelfList");

    uncompletedBookshelf.innerHTML = '';
    completedBookshelf.innerHTML = '';

    for (const book of books) {
        if(book.isComplete){
            completedBookshelf.append(templateRak(book));
        }
        else{
            uncompletedBookshelf.append(templateRak(book));
        }
    }
}