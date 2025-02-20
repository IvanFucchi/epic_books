document.addEventListener("DOMContentLoaded", () => {

const urlParams = new URLSearchParams(window.location.search);
const idBook = urlParams.get("id_book");
const bookDetailTitle = document.getElementById("bookTitle");
const bookDetailImg = document.getElementById("imgContainer");
const bookDetailCategory = document.getElementById("asin");
const bookDetailPrice = document.getElementById("price");
const bookDetailAsin = document.getElementById("category");

let bookDetail 

async function fetchDetails(idBook) {
    try {
        const res = await fetch(`https://striveschool-api.herokuapp.com/books/${idBook}`);
        const bookDetail = await res.json();
        
        const {asin, title, category, price, img} = bookDetail; // Corretto
        renderBookDetails( asin, title, category, price, img);
    } catch (error) {
        console.error("Errore nel caricamento dei dettagli del libro:", error);
    }
}


fetchDetails(idBook)


// funzione per renderizare i details 

function renderBookDetails(asin, title, category, price, img) {
    bookDetailTitle.innerHTML=title
    bookDetailCategory.innerHTML=category
    bookDetailImg.innerHTML=`<img class="img-fluid" src="${img}"/>`
    bookDetailPrice.innerHTML=price
    bookDetailAsin.innerHTML=asin

}



});