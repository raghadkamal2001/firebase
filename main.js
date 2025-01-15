 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
 import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyDAR80DwAkejOev9k1g2kEnONn6pvqgmrs",
   authDomain: "fir-test-9da99.firebaseapp.com",
   projectId: "fir-test-9da99",
   storageBucket: "fir-test-9da99.firebasestorage.app",
   messagingSenderId: "231764632927",
   appId: "1:231764632927:web:fa21f811fa53c9085ec2ea",
   measurementId: "G-SFZZTB2SMV"
 };

 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);


// constructor function
function Product(title, price, description, image) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
}

// Fetch products from API and create objects
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products?limit=20');
    const data = await response.json();
    const productsArray = data.map(product => new Product(product.title, product.price, product.description, product.image));
    renderProducts(productsArray);
}

// Render products as cards
function renderProducts(products) {
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = '';
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
            <button onclick="deleteProduct(${index})">Delete</button>
            <button onclick="editProduct(${index})">Update</button>
        `;
        productsSection.appendChild(productCard);
    });
}

// Create product
async function createProduct(title, price, description, image) {
    try {
        await addDoc(collection(db, 'products'), { title, price, description, image, deleted: false });
        alert('Product created successfully!');
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Handle form submission
const form = document.getElementById('product-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;
    createProduct(title, price, description, image);
});

fetchProducts();