async function fetchBooks() {
    const url = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YOUR_API_KEY";
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Controlliamo se la risposta contiene i libri
        if (data.results && data.results.books) {
            renderBooks(data.results.books);
        } else {
            console.error("Nessun libro trovato nella risposta API");
        }
    } catch (error) {
        console.error("Errore nel caricamento dei libri:", error);
    }
}

function renderBooks(books) {
    const bookContainer = document.getElementById("book-container");
    bookContainer.innerHTML = "";
    
    books.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card", "m-2", "p-2", "col-md-3");
        bookCard.innerHTML = `
            <img src="${book.book_image}" class="card-img-top" alt="${book.title}"/>
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">${book.author}</p>
                <p class="card-text">${book.description}</p>
                <button class="btn btn-primary add-to-cart">Aggiungi al carrello</button>
                <button class="btn btn-secondary skip">Salta</button>
            </div>
        `;
        
        bookContainer.appendChild(bookCard);
    });
}

document.addEventListener("DOMContentLoaded", fetchBooks);
