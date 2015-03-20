//The Library

//You've been contracted to write a piece of software for the local library. The software needs to meet the following requirements:

//- The software should track the library's inventory of books
//- Each book listing should include the title, author, genre (Fiction, Non-Fiction, etc.), length, and checked-in/checked-out status
//- Librarians should be able to:
//a.) add books to the inventory
//b.) remove books from the inventory 
//c.) view a list of all the books in the library
//d.) view a list of all the books in a given genre
//e.) search for a book by title or author

var sget = require('sget');

function userInput(str){
	return sget(str).trim();
};

var Library = {
	"1" : {
		"booktitle" : "The Wizard of Oz",
		"author" : "Johnathan Ozzwald",
		"genre" : "Absolute fact",
		"pagecount" : "650",
		"bookid" : "1"
	}
};
var bookIdCounter = 1;

function Book(bookTitle, author, genre, pageCount, checkedOut){
	Book.bookTitle = bookTitle;
	Book.author = author;
	Book.genre = genre;
	Book.pageCount = pageCount;
	Book.checkedOut = checkedOut;
};

var Messages = {
	initial : "What would you like to do?",
	addbook : {
		booktitle : "What is the title of this book?",
		author : "Who was this book written by?",
		genre: "What genre is this book in?",
		pagecount : "How many pages long is this book?",
		}
};

var interface = function(){
	console.log("===========================\nDetroit Labs Public Library\n===========================\nMENU\n1) List all books\n2) Add a book\n3) Remove a book\n4) Quit\n5) Search by genre");
	
	switch(userInput(Messages.initial)){
		case "1" :
			listBooks();
			break;
		case "2" :
			addBook();
			break;
		case "3" :
			removeBook();
			break;
		case "4" :
			console.log("===========================\nGoodbye, and have a great day!\n===========================");
			process.exit();
			break;
		case "5" :
			listByGenre();
			break;
		default :
			console.log("\n*****************************\nERROR:\nPlease choose a number from the menu");
			interface();
	}
};

var listBooks = function(){
	console.log("---------------------------\nLIBRARY INVENTORY:\n---------------------------\n");

	for(book in Library){
		
		var displayBookTitle = Library[book].booktitle.toUpperCase();

		console.log(displayBookTitle + "\n" + "ID: " + Library[book].bookid + "\nBy: " + Library[book].author + "\nGenre: " + Library[book].genre + "\n" + Library[book].pagecount + " pages\n______________________________");
	
	}
	interface();
};

var addBook = function(){
	bookIdCounter ++;
	Library[bookIdCounter] = {"booktitle" : "booktitle"};

	Library[bookIdCounter].booktitle = userInput(Messages.addbook.booktitle);
	Library[bookIdCounter].author = userInput(Messages.addbook.author);
	Library[bookIdCounter].genre = userInput(Messages.addbook.genre);
	Library[bookIdCounter].pagecount = userInput(Messages.addbook.pagecount);
	Library[bookIdCounter].bookid = bookIdCounter;
	
	var displayBookTitle = Library[bookIdCounter].booktitle.toUpperCase();
	
	console.log("______________________________\nYou have added:\n" + displayBookTitle + "\n" + "ID: " + bookIdCounter + "\nBy: " + Library[bookIdCounter].author + "\nGenre: " + Library[bookIdCounter].genre + "\n" + Library[bookIdCounter].pagecount + " pages");

	interface();
};

var removeBook = function(){
	var sayBookToRemove = userInput("What is the ID of the book that you would like to remove?\nEnter 'list books' to review the books in your Library");
	if(sayBookToRemove === "list books"){
		listBooks();
		console.log(sayBookToRemove);
	} else {
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\nThe book " + Library[sayBookToRemove].booktitle);
		//take the number they put in and find that book in the library.
		delete Library[sayBookToRemove];
		//delete that book.
		console.log("has been removed.");

		interface();
	}
};

var listByGenre = function(){
	var genreToSearch = userInput("What genre would you like to search for?");

	for(book in Library){
		if(Library[book].genre == genreToSearch){
			console.log(Library[book].booktitle);
		}
	}
	interface();
};
	



interface();

