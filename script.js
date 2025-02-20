// Selezioniamo gli elementi principali
document.addEventListener("DOMContentLoaded", () => {
    const bookContainer = document.getElementById("book-container");
    const searchInput = document.getElementById("search-bar");
    const cartModal = document.getElementById("cart-modal");
    const cartButton = document.getElementById("cart-button");
    const cartItemsContainer = document.getElementById("cart-items");

    let books = [];
    let cart = [];
    let page = 1;
    let loading = false;

    // Funzione per caricare i libri dall'API
    async function fetchBooks() {
        if (loading) return;
        loading = true;
        try {
            const response = await fetch("https://striveschool-api.herokuapp.com/books")
                .then(res => {
                    console.log(res)
                    loading = false
                    return res
                });
            books = await response.json();
            renderBooks(books);
        } catch (error) {
            console.error("Errore nel caricamento dei libri", error);

        }
    }

    // Funzione per renderizzare le card dei libri
    function renderBooks(filteredBooks) {
        bookContainer.innerHTML = "";
        filteredBooks.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("card", "m-2", "p-2", "col-md-3");
            bookCard.innerHTML = `
                <img src="${book.img}" class="card-img-top" alt="${book.title}"/>
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.price}€</p>
                    <button class="btn btn-primary add-to-cart">Aggiungi al carrello</button>
                    <button class="btn btn-secondary skip">Salta</button>
                    <button class="btn btn-secondary details" id="${book.asin}">dettagli</button>
                    
                </div>
            `;

            const addToCartBtn = bookCard.querySelector(".add-to-cart");
            addToCartBtn.addEventListener("click", () => addToCart(book, bookCard));

            // event listner per il bottone salta card
            
            const removeCardBtn = bookCard.querySelector(".skip");
            removeCardBtn.addEventListener("click", () => saltoInLungo(book));
            
            // event listner per pagina dettagli

            const detailPageBtn = bookCard.querySelector(".details");
            detailPageBtn.addEventListener("click", () => {
                const id = detailPageBtn.getAttribute("id")
                window.location.href = `/details.html?id_book=${id}`

            });  
            



            bookContainer.appendChild(bookCard);
        });
    }



    // Aggiunge un libro al carrello e cambia il bordo della card
    function addToCart(book, card) {
        if (!cart.includes(book)) {
            cart.push(book);
            card.classList.add("border-success");
            updateCart();
        }
    }

    // Funzione per aggiornare il carrello nel modale
    function updateCart() {
        cartItemsContainer.innerHTML = "";
        cart.forEach((book, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("d-flex", "justify-content-between", "p-2", "border-bottom");
            cartItem.innerHTML = `
                <span>${book.title} - ${book.price}€</span>
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Rimuovi</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Assegniamo gli event listener ai bottoni rimuovi
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Funzione per filtrare i libri nella ricerca
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
        renderBooks(filteredBooks);
    });

    // Mostra/Nasconde il modale del carrello
    cartButton.addEventListener("click", () => {
        cartModal.classList.toggle("d-none");
    });

    // Carica i libri iniziali
    fetchBooks();

    // Infinite Scroll
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            fetchBooks();
        }
    });

    //funzione per pagina dettagli
    // function detailsPage()

    //funzione per saltare card

    function saltoInLungo(book) {
        books = books.filter(item => item.asin !== book.asin);
        renderBooks(books)
    }

    
    
});
