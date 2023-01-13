//Users can add and remove objects from an array by creating input elements
//Practice creating an element on the page using input from the text input fields

//Each book will be an instance of the book class. Reusable code that allows me to Bookshelf a new book and display it on the DOM

//book_data.js maintains a an array of books currently being displayed on the DOM
//Maybe add CSS animation??? similar to steam trading cards

//Global variables and functions
//When creating my sort functions, I wanted functionality to extend beyond just sorting by the first letter. If the letters of two titles/authors keep matching, the function should keep checking for a difference until it finds one or reaches the end of one of the titles/authors, at which point, the shorter title/author gets placed ahead of the longer one. 

//lowercase all values in the sort functions involving alphabetical characters (sortByTitle and sortByAuthor)
//boolean values set the default clicked state of the sorting buttons to false (unclicked)
//maybe set a total click count that sets the bookData equal to sortedData if any of the sort buttons have been used???
const sortedData = []
let clickCnt = 0
let sortClick = false

let titleClick = false
let titleClickCnt = 0
const sortByTitle = (book1, book2) => {
    const newBook1 = book1.title.toLowerCase()
    const newBook2 = book2.title.toLowerCase()
    //In order to sort by title, I want to pass the value of the title property for each book into the sort function
    if (newBook1 === newBook2) {
        return 0
    }
    //first, determine which book is longer
    const checkTitle = () => {
        return newBook1.length > newBook2.length ? newBook1 : newBook2
    }
    const longestTitle = checkTitle()
    //The length of the longest book helps determine, how long we want to run a loop
    for (let i=0; i < longestTitle.length; i++) {
        if (newBook1[i] === undefined) {
            return -1
        }
        if (newBook2[i] === undefined) {
            return 1
        }
        else if (newBook1[i] === newBook2[i]) {
            continue
        }
        else {
            return newBook1[i] < newBook2[i] ? -1 : 1
        }
    }
}
let authorClick = false
let authorClickCnt = 0
const sortByAuthor = (book1, book2) => {
    const newBook1 = book1.author.toString().toLowerCase()
    const newBook2 = book2.author.toString().toLowerCase()
    if (newBook1 === newBook2) {
        return 0
    }
    const checkName = () => {
        return newBook1.length > newBook2.length ? newBook1 : newBook2
    }
    const longestName = checkName()
    for (let i = 0; i < longestName.length; i++) {
        if (newBook1[i] === undefined) {
            return -1
        }
        if (newBook2[i] === undefined) {
            return 1
        }
        else if (newBook1[i] === newBook2[i]) {
            continue
        }
        else {
            return newBook1[i] < newBook2[i] ? -1 : 1
        }
    }
}
let subjectClick = false
let subjectClickCnt = 0
const sortBySubject = (book1, book2) => {
    const newBook1 = book1.subject.toString()
    const newBook2 = book2.subject.toString()
    //Sorting by number of subjects (ascending order)
    if (book1.subject.length === book2.subject.length) {
        return newBook1.length < newBook2.length ? -1 : newBook1.length > newBook2.length ? 1 : 0
    }
    else {
        return book1.subject.length < book2.subject.length ? -1 : 1
    }
}

class Book {
    constructor(title,author,language,subject) {
        //What am I going to need???
        //Going to need to add a delete button to each book
        this.title = title,
        this.author = author,
        this.language = language,
        this.subject = subject,
        this.comment = ''
        //Where do we get these values? From user input once the button is clicked
    }
    //Need any functions?
    //We're going to need to render, but maybe, we'll have that be in a separate class???
}

class Bookshelf {
    constructor(obj) {
        this.obj = obj
        this.flip = false
    }
    createBook() {
        //Check to see if any sort buttons have been used (check click count)
        if(clickCnt >= 1) {
            bookData = sortedData
        }
        // const testbooks = document.querySelectorAll('.book')
        //Create an overarching div and append to the body as a child element
        //Create subsequent divs that hold the book info
        const booksEle = document.querySelector('.books')
        const book = document.createElement('div')
        // const image = document.createElement('img')
        const title = document.createElement('h1')
        const author = document.createElement('h2')
        const language = document.createElement('h2')
        const subject = document.createElement('h3')
        const userInterface = document.createElement('div')
        const comment = document.createElement('input')
        const commentBtn = document.createElement('button')
        const deleteBtn = document.createElement('button')

        //Assign values
        book.classList.add('book')
        title.innerText = this.obj.title
        author.innerText = this.obj.author
        language.innerText = this.obj.language
        subject.innerText = this.obj.subject
        userInterface.classList.add('userInterface')
        comment.classList.add('comment')
        comment.placeholder = 'Leave a comment...'
        comment.value = this.obj.comment
        //Check whether a book has been commented on or not
        if (this.obj.comment === '') {
            commentBtn.innerText = 'Comment'
        }
        else if (this.obj.comment === 'Invalid Entry') {
            commentBtn.innerText = 'Try Again'
            commentBtn.style.color = 'white'
            commentBtn.style.background = '#C56E5E'
        }
        else {
            commentBtn.innerText = 'View Saved Comment'
        }
        commentBtn.classList.add('commentBtn')
        deleteBtn.classList.add('deleteBtn')
        deleteBtn.innerText = 'Delete book'

        comment.addEventListener('click', (e) => {
            e.stopPropagation()
        })
        //Add event listener to comment buttons so that the comment.innerText of any given book is edited to the current value of the comment input box. book object will also be adjusted (add comment property)
        //this.comment defaults to false
        commentBtn.addEventListener('click', (e) => {
            if (this.obj.comment === '') {
                comment.style.display = 'inline-block'
                commentBtn.innerText = 'Save Comment'
            }

            if (commentBtn.innerText === 'View Saved Comment') {
                comment.style.display = 'inline-block'
            }

            if (commentBtn.innerText === 'Save Comment' && comment.value !== '') {
                comment.style.display = 'none'

                const booksEleChildren = booksEle.childNodes
                const bookEleChildren = book.childNodes
                for (const entry of booksEleChildren.entries()) {
                    if (book.innerText === entry[1].innerText) {
                        for (const entry2 of bookEleChildren.entries()) {
                            if (entry2[0] === 2) {
                                //Edit the book object
                                if (entry2[1].firstChild.value.length <= 280) {
                                    bookData[entry[0]].comment = `(${entry2[1].firstChild.value.length} characters) ${entry2[1].firstChild.value}`
                                }
                                else {
                                    bookData[entry[0]].comment = 'Invalid Entry'
                                }
                                //Re-render entire DOM
                                booksEle.innerText = ''
                                bookData.map((book) => {
                                    new Bookshelf(book).createBook()
                                })
                            }
                        }
                    }
                }
            }

            if (commentBtn.innerText === 'Try Again') {
                comment.style.display = 'none'

                const booksEleChildren = booksEle.childNodes
                for (const entry of booksEleChildren.entries()) {
                    if (book.innerText === entry[1].innerText) {
                        bookData[entry[0]].comment = ''
                    }
                    booksEle.innerText = ''
                    bookData.map((book) => {
                        new Bookshelf(book).createBook()
                    })
                }
            }       
            //This method prevents the click of any comment buttons from flipping the book
            e.stopPropagation()
        })
        //Add event listener to deleteBtn so that instance will run the function if clicked
        //Deleting an element should re-render the entire array of books 
        deleteBtn.addEventListener('click', (e) => {
            const booksEleChildren = booksEle.childNodes
            for (const entry of booksEleChildren.entries()) {
                if (book.innerText === entry[1].innerText) {
                    // Remove entry from array 
                    bookData.splice(entry[0], 1)
                    //Remove element from DOM
                    booksEle.removeChild(booksEleChildren[entry[0]])
                    //Re-Bookshelf entire DOM
                    booksEle.innerText = ''
                    bookData.map((book) => {
                        new Bookshelf(book).createBook()
                    })
                }
            }
            e.stopPropagation()
        })
        //Append new info to book element and append said element to the 'books' parent container
        //Add an event listener onto the book itself to make it so that only certain information is displayed at a time
        book.addEventListener('click', () => {
            this.flip = !this.flip
            if (this.flip === true) {
                book.replaceChildren(language, subject, userInterface)
            }
            else {
                book.replaceChildren(title, author, userInterface)
            }
        })
        userInterface.append(comment,commentBtn,deleteBtn)
        book.append(title,author,userInterface)
        booksEle.append(book)
    }
}

//Add event listener to search button
//When the search button is clicked, a function should look at the value of the searchbox and check if it matches either the author, title, language or subject of any of the books displayed on the page
//Could probably use the reduce function here?
const searchBtn = document.querySelector('#searchBtn')
searchBtn.addEventListener('click', () => {
    //When I search, the buttons of the results should be remapped so that only the current listing of books is displayed or changed
    //Searches should be case insensitive
    //set values by looking at DOM
    const title = document.querySelector('#title').value.toLowerCase()
    const author = document.querySelector('#author').value.toLowerCase()
    const language = document.querySelector('#language').value.toLowerCase()
    const subject = document.querySelector('#subject').value.toLowerCase()
    const booksEle = document.querySelector('.books')

    //Now compare these values with data stored in the bookData array. Use logic similar to logic used for the deleteBtn
    const booksEleChildren = booksEle.childNodes
    const searchResults = []
    for (const entry of booksEleChildren.entries()) {
        if (
            title === bookData[entry[0]].title.toLowerCase() || 
            author === bookData[entry[0]].author.toString().toLowerCase() || 
            language === bookData[entry[0]].language.toLowerCase() || 
            subject === bookData[entry[0]].subject.toString().toLowerCase()) {
                searchResults.push(bookData[entry[0]])
            }
    }

    //Re-render
    booksEle.innerText = ''
    searchResults.map((result) => new Bookshelf(result).createBook())

    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#language').value = ''
    document.querySelector('#subject').value = ''
})

const addBook = document.querySelector('#addBook')
addBook.addEventListener('click', () => {
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const language = document.querySelector('#language').value
    const subject = document.querySelector('#subject').value

    //Call the class to create a new book instance
    const book = new Book(title, author, language, subject)
    // book = randomImg(imageSrcs)

    //Check if valid user input
    if (title === '' || author === '' || language === '' || subject === '') {
        console.log('Invalid Entry!')
    }
    else {
        bookData.unshift(book)

        //Empty out the parent container prior to creating and adding elements
        const booksEle = document.querySelector('.books')
        booksEle.innerText = ''

        //Run a map function, so that a new Bookshelf of the screen runs the createEle function on every book within the books array
        bookData.map((book) => {
            new Bookshelf(book).createBook()
        })
        //Clear input text fields
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#language').value = ''
        document.querySelector('#subject').value = ''
    }
})

const sort = document.querySelector('.select')
sort.addEventListener('click', () => {
    sortClick =! sortClick
    if(sortClick === true) {
        const sortMenu = document.querySelector('#sortMenu')
        sortMenu.style.opacity = 1;
        sortMenu.style.display = 'block'
    }
    if (sortClick === false) {
        sortMenu.style.opacity = 0;
        sortMenu.style.display = 'none'
    }
})

const sortTitle = document.querySelector('#sortByTitle')
sortTitle.addEventListener('click', () => {
    //Click defaults to false. once clicked, titleClick === true
    //Check if the button has already been clicked at least once
    titleClick =! titleClick
    titleClickCnt++
    sortClick =! sortClick
    const selected = document.querySelector('.selected')

    if (sortClick === true) {
        const sortMenu = document.querySelector('#sortMenu')
        sortMenu.style.opacity = 1;
        sortMenu.style.display = 'block'
    }
    else {
        sortMenu.style.opacity = 0;
        sortMenu.style.display = 'none'
    }

    //Empty out the parent container prior to creating and adding elements
    const booksEle = document.querySelector('.books')
    booksEle.innerText = ''

    //sort the bookData array then run a map function to re-render sorted book

    if (titleClick === false) {
        bookData.reverse()
        selected.innerText = 'Sorting books by title (Z-A)'
    }
    else if (titleClick === true && titleClickCnt > 1) {
        bookData.reverse()
        selected.innerText = 'Sorting books by title (A-Z)'
    }
    else {
        bookData.sort(sortByTitle)
        selected.innerText = 'Sorting books by title (A-Z)'
    }
    bookData.map((book) => new Bookshelf(book).createBook())
    console.log(bookData)
    console.log('break')
})

const sortAuthor = document.querySelector('#sortByAuthor') 
sortAuthor.addEventListener('click', () => {
    authorClick =! authorClick
    authorClickCnt++
    sortClick = !sortClick
    const selected = document.querySelector('.selected')

    if (sortClick === true) {
        const sortMenu = document.querySelector('#sortMenu')
        sortMenu.style.opacity = 1;
        sortMenu.style.display = 'block'
    }
    else {
        sortMenu.style.opacity = 0;
        sortMenu.style.display = 'none'
    }

    const booksEle = document.querySelector('.books')
    booksEle.innerText = ''

    if (authorClick === false) {
        bookData.reverse()
        selected.innerText = 'Sorting books by author (Z-A)'
    }
    else if (authorClick === true && authorClickCnt > 1) {
        bookData.reverse()
        selected.innerText = 'Sorting books by author (A-Z)'
    }
    else {
        bookData.sort(sortByAuthor)
        selected.innerText = 'Sorting books by author (A-Z)'
    }
    bookData.map((book) => new Bookshelf(book).createBook())
})

const sortSubject = document.querySelector('#sortBySubject') 
sortSubject.addEventListener('click', () => {
    subjectClick =! subjectClick
    subjectClickCnt++
    sortClick = !sortClick
    const selected = document.querySelector('.selected')

    if (sortClick === true) {
        const sortMenu = document.querySelector('#sortMenu')
        sortMenu.style.opacity = 1;
        sortMenu.style.display = 'block'
    }
    else {
        sortMenu.style.opacity = 0;
        sortMenu.style.display = 'none'
    }

    const booksEle = document.querySelector('.books')
    booksEle.innerText = ''

    if (subjectClick === false) {
        bookData.reverse()
        selected.innerText = 'Sorting books by number of topics (descending)'
    }
    else if (subjectClick === true && subjectClickCnt > 1) {
        bookData.reverse()
        selected.innerText = 'Sorting books by number of topics (ascending)'
    }
    else {
        bookData.sort(sortBySubject)
        selected.innerText = 'Sorting books by number of topics (ascending)'
    }
    bookData.map((book) => new Bookshelf(book).createBook())
    bookData.forEach((book) => console.log(book.subject.length))
    console.log('break')
})

//View entire bookshelf after searching for something
const reset = document.querySelector('#reset') 
reset.addEventListener('click', () => {
    const booksEle = document.querySelector('.books')
    booksEle.innerText = ''
    bookData.map((book) => new Bookshelf(book).createBook())
})

//By default, we're going to want to display all books currently being held within the bookData array when the website first fires. 
//We're going to have to create Book instances out of each entry in bookData and push that value through each element again with the map function. 

let currentBookData = bookData.map((book) => {
    return new Book(book.title, book.author, book.language, book.subject)
})
bookData = currentBookData

//In this map function, I've updated the bookData array and set it equal to the currentBookData array in order to display all the elements of the array as instances of the book class instead of regular objects

bookData.map((book) => new Bookshelf(book).createBook())