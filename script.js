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


let generateID = ()=>{
    return +new Date();
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

let findId = bookId => {
    for (const book of books) {
        if(book.id == bookId){
            return book;
        }
    }
    return null;
}

let findIndexBook = bookId => {
    for (const index in books) {            
        if(books[index].id === bookId){
            return index;
        }
    }
    return -1;
}


let addBook = ()=>{
    inputJudul = document.querySelector("#input-judul").value;
    inputPenulis = document.querySelector("#input-penulis").value;
    inputTahun = parseInt(document.querySelector("#input-tahun").value);
    isComplete = document.querySelector("#check-ifCompleted").checked;
    bookId = generateID();
    books.push(generateBook(bookId, inputJudul, inputPenulis, inputTahun, isComplete));
    render();
}



let moveToCompleted = id => {
    const bookTarget = findId(id);
    if(bookTarget == null) return;

    bookTarget.isComplete = true;
    render();
}

let moveToUncompleted = id => {
    const bookTarget = findId(id);
    if(bookTarget == null) return;

    bookTarget.isComplete = false;
    render();
}

let deleteBook = id => {
    const bookTarget = findIndexBook(id);

    if (bookTarget == -1) return;
    books.splice(bookTarget, 1);
    render();
}

let templateRak = element => {
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
            munculBookMoved();
        });
    }
    else{
        greenButton.textContent = "Udah Dibaca";
        greenButton.addEventListener('click', ()=>{
            moveToCompleted(element.id);
            munculBookMoved();
        });
    }
    redButton = document.createElement('button');
    redButton.classList.add('red');
    redButton.textContent = 'Hapus Buku';
    redButton.addEventListener('click', ()=>{
        deleteBook(element.id);
        munculBookDeleted();
    });

    buttonContainer = document.createElement('div');
    buttonContainer.classList.add('action');
    buttonContainer.append(greenButton, redButton);

    container = document.createElement('article');
    container.classList.add("book-item");
    container.append(bookTitle, bookAuthor, bookYear, buttonContainer);
    
    return container;
}


let render = ()=>{
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

const notFound = document.querySelector("#notFound");
const munculNotFound = ()=>{
    notFound.classList.remove('hilang');
    notFound.classList.add('muncul');
    setTimeout(()=>{
        notFound.classList.add('hilang');
        notFound.classList.remove('muncul');
    }, 2000);
}

const bookAdded = document.querySelector("#bookAdded");
const munculBookAdded = ()=>{
    bookAdded.classList.remove('hilang');
    bookAdded.classList.add('muncul');
    setTimeout(()=>{
        bookAdded.classList.add('hilang');
        bookAdded.classList.remove('muncul');
    }, 2000);
}

const bookMoved = document.querySelector("#bookMoved");
const munculBookMoved = ()=>{
    bookMoved.classList.remove('hilang');
    bookMoved.classList.add('muncul');
    setTimeout(()=>{
        bookMoved.classList.add('hilang');
        bookMoved.classList.remove('muncul');
    }, 2000);
}

const bookDeleted = document.querySelector("#bookDeleted");
const munculBookDeleted = ()=>{
    bookDeleted.classList.remove('hilang');
    bookDeleted.classList.add('muncul');
    setTimeout(()=>{
        bookDeleted.classList.add('hilang');
        bookDeleted.classList.remove('muncul');
    }, 2000);
}

const searchBookTitle = document.querySelector('#searchBookTitle');
let cari = ()=>{  
    uncompletedBookshelf = document.querySelector("#uncompletedBookshelfList");
    completedBookshelf = document.querySelector("#completedBookshelfList");

    let found = books.some(e => e.title.trim().toLowerCase() == searchBookTitle.value.trim().toLowerCase());
    let filteredBooks = books.filter(e => e.title.trim().toLowerCase() == searchBookTitle.value.trim().toLowerCase())
    if (found) {
        uncompletedBookshelf.innerHTML = '';
        completedBookshelf.innerHTML = '';
        for (const book of filteredBooks) {
            if(book.isComplete){
                completedBookshelf.append(templateRak(book));
            }
            else{
                uncompletedBookshelf.append(templateRak(book));
            }
        }
    }
    else{
        munculNotFound();
    }
}

document.addEventListener("DOMContentLoaded", ()=>{

    bookSubmit = document.querySelector("#bookForm");
    bookSubmit.addEventListener('submit', function(e){
        e.preventDefault();
        addBook();
        munculBookAdded();
    });
    const searchBook = document.querySelector("#searchBook");
    searchBook.addEventListener('submit', function(e){
        e.preventDefault();
        e.stopPropagation();
        cari();
    });
    searchBookTitle.addEventListener('input', e=>{
        if(e.target.value == ''){
            render();
        }
    });
});
    
