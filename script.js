// // console.log("This is project2.");

// class Book {
//     constructor(name, author, type) {
//         this.name = name;
//         this.author = author;
//         this.type = type;
//     }
// }

// class Display {
//     add(book) {
//         let tableBody = document.getElementById('tableBody');

//         let uiString = `<tr>
//                             <td>${book.name}</td>
//                         <td>${book.author}</td>
//                             <td>${book.type}</td>
//                         </tr>`;

//         tableBody.innerHTML += uiString;
//     }

//     clear() {
//         let libraryForm = document.getElementById("libraryForm");
//         libraryForm.reset();
//     }

//     validate(book) {
//         if (book.name.length < 1 || book.author.length < 2) {
//             return false;
//         } else {
//             return true;
//         }
//     }

//     show(type, displayMessage) {
//         let message = document.getElementById('message');
//         let boldText;
//         if (type === 'success') {
//             boldText = "Success";
//         } else {
//             boldText = "Error";
//         }

//         message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
//                                 <strong>${boldText}:</strong> ${displayMessage}
//                                 </div>`;
//         setTimeout(function () {
//             message.innerHTML = '';
//         }, 1500);
//     }
// }

// // Add submit event listener to library fotm...

// let libraryForm = document.getElementById("libraryForm");

// libraryForm.addEventListener('submit', libraryFormSubmit);

// function libraryFormSubmit(e) {
//     // console.log("You have submitted library form.");

//     let name = document.getElementById('bookName').value;
//     let author = document.getElementById('author').value;

//     let type;
//     let programming = document.getElementById('programming');
//     let mathmatics = document.getElementById('mathmatics');
//     let science = document.getElementById('science');
//     let other = document.getElementById('other');

//     if (programming.checked) {
//         type = programming.value;
//     }
//     else if (mathmatics.checked) {
//         type = mathmatics.value;
//     }
//     else if (science.checked) {
//         type = science.value;
//     }
//     else if (other.checked) {
//         type = other.value;
//     }

//     let book = new Book(name, author, type);
//     let display = new Display();
//     // console.log(book);

//     if (display.validate(book)) {
//         display.add(book);
//         display.clear();
//         display.show('success', 'Your book has been successfully added.')

//     }
//     else {
//         display.show('danger', `Sorry you can't add this book`);
//     }
//     e.preventDefault();
// }

// if user adds a book, add it to the local storage...
showBooks();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let bookName = document.getElementById('bookName');
    let authorName = document.getElementById('author');

    let programming = document.getElementById('programming');
    let mathmatics = document.getElementById('mathmatics');
    let science = document.getElementById('science');
    let other = document.getElementById('other');

    let books = localStorage.getItem('books');

    if (books == null) {
        booksobj = [];

    } else {
        booksobj = JSON.parse(books);
    }

    let type;
    if (programming.checked) {
        type = programming.value;
    }
    else if (mathmatics.checked) {
        type = mathmatics.value;
    }
    else if (science.checked) {
        type = science.value;
    }
    else if (other.checked) {
        type = other.value;
    }

    let myObj = {
        book: bookName.value,
        author: authorName.value,
        booktype: type
    }

    let message = document.getElementById('message');
    let boldText;
    let displayMessage;

    if (myObj.book.length < 1 || myObj.author.length < 2) {
        boldText = "Error";
        displayMessage = `Sorry you can't add this book.`;
        message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                </div>`;

        setTimeout(function () {
            message.innerHTML = '';
        }, 1500);

    }
    else {
        boldText = "Success";
        displayMessage = 'Your book has been successfully added.';
        message.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                </div>`;

        setTimeout(function () {
            message.innerHTML = '';
        }, 1500);

        booksobj.push(myObj);
    }


    localStorage.setItem('books', JSON.stringify(booksobj));
    bookName.value = "";
    authorName.value = "";
    type = "";
    // console.log(booksobj);
    e.preventDefault();
    showBooks();
});

// Function to show elements from localStorage...
function showBooks() {
    let books = localStorage.getItem('books');

    if (books == null) {
        booksobj = [];

    } else {
        booksobj = JSON.parse(books);
    }

    let html = '';
    booksobj.forEach(function (element, index) {
        let uiString = `<tr class='tab'>
                        <td>${index + 1}.</td>
                        <td>${element.book}</td>
                        <td>${element.author}</td>
                        <td>${element.booktype}</td>
                        <td id="${index}" onclick="deleteBook(this.id)" style='cursor:pointer; color:blue'>Delete Book</td>
                        </tr>`;
        html += uiString;
    });

    let booksElm = document.getElementById('tableBody');
    if (booksobj.length != 0) {
        booksElm.innerHTML = html;
    } else {
        booksElm.innerHTML = `Nothing to show! Use "Add a book" section above to add books.`;

    }
}

function  deleteBook(index) {
    let books = localStorage.getItem('books');

    if (books == null) {
        booksobj = [];

    } else {
        booksobj = JSON.parse(books);
    }

    booksobj.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(booksobj));
    showBooks();
}

// Search the books by user...
let search = document.getElementById("searchTxt");
search.addEventListener('input', function(){
    // let inputVal = search.value.toLowerCase();
    let inputVal = search.value;
    // console.log("Input event fired!", inputVal);
    let tab = document.getElementsByClassName("tab");
    Array.from(tab).forEach(function(element){
        let rowTxt = element.getElementsByTagName('td')[1].innerText;
        if (rowTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})
