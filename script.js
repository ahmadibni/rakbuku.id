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
const searchBookTitle = document.querySelector('#searchBookTitle');
let cari = ()=>{  
    uncompletedBookshelf = document.querySelector("#uncompletedBookshelfList");
    completedBookshelf = document.querySelector("#completedBookshelfList");

    uncompletedBookshelf.innerHTML = '';
    completedBookshelf.innerHTML = '';
    // let filteredBook = [];
    for (const book of books) {
        if (book.title == searchBookTitle.value) {
            // templateRak(book).style.display = "none";
            console.log(templateRak(book));
            if(book.isComplete){
                completedBookshelf.append(templateRak(book));
            }
            else{
                uncompletedBookshelf.append(templateRak(book));
            }
        }

    }

}

document.addEventListener("DOMContentLoaded", ()=>{

    bookSubmit = document.querySelector("#bookForm");
    bookSubmit.addEventListener('submit', function(event){
        event.preventDefault();
        addBook();
    });
    const searchBook = document.querySelector("#searchBook");
    searchBook.addEventListener('submit', function(event){
        event.preventDefault();
        cari();
    });
    searchBookTitle.addEventListener('input', e=>{
        if(e.target.value == ''){
            for (const book of books) {
                if(book.isComplete){
                    completedBookshelf.append(templateRak(book));
                }
                else{
                    uncompletedBookshelf.append(templateRak(book));
                }
            }
        }
    });
});
    
