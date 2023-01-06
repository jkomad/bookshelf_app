//First, start by creating one book
//You want to create an object that holds information from book_data.js
//book_data.js holds objects with four properties, we want to grab this information and put it into a new object that displays on the screen

//Initialize elements in the DOM you want access to

class Book {
    constructor(bk, i) {
        this.bk = bk
        this.ele = document.createElement('div');
        this.i = i
    }

    createBk () {
        const title = document.createElement('h1')
        title.innerText = this.bk.title
        const author = document.createElement('h2')
        author.innerText = this.bk.author
        const language = document.createElement('h2')
        language.innerText = this.bk.language
        const subject = document.createElement('h3')
        subject.innerText = this.bk.subject
        this.ele.classList.add('book')
        const favBtn = document.createElement('button')
        favBtn.classList.add('favorite')
        favBtn.innerText = "Favorite"
        favBtn.addEventListener('click', () => {
            this.ele.style.backgroundColor = 'yellow'
        })
        this.ele.append(title,author,language,subject,favBtn)
        return this.ele
    }
}

class Bookshelf {
    constructor() {
        this.books = []
    }
}

const renderBooks = () => {
    const bookEles = bookData.map((book, i) => {
        const newBk = new Book(book).createBk()
        return newBk
    })
    const books = document.querySelector('.wrapper')
    books.replaceChildren(...bookEles)
}

//Add event listener to button
const addBtn = document.querySelector('#addBook')
addBtn.addEventListener('click', () => {

    //Create all the book elements ffrom book Data
    booksToSave = renderBooks()

    //Save book elements to bookshelf and add to screen
    // new Bookshelf = books.map()
    const testbkshlf = new Bookshelf
    console.log(typeof testbkshlf);
})

//List of favorite books should be initialized when the webpage opens
//Favorited books is just an empty Array. When a book's 'favorite' button is clicked, it gets added to this array, and its container is highlighted/the book title is added to a separate DOM element on the page

//Favorite function is outside the scope of everything that has already been initialized, I want it accessible after bookData is added

//Sorting. Uses filter function and user input to filter for only the book the user searched for (matches: author, title, or subject)

const filterBooks = 

//Add event listener to search button
const searchBtn = document.querySelector('#searchBtn')
searchBtn.addEventListener('click', => {
    //When the search button is clicked, a function should look at the value of the searchbox and check if it matches either the author, title, or subject of any of the books displayed on the page

    //this btn then re-renders the screen to replace all the child elements with only the one book that matches

})