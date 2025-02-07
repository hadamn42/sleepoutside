import { productCardTemplate } from "./ProductList.mjs";
import ProductData from "./ProductData.mjs"; 

const searchInput = document.getElementById("search");
const searchButton = document.querySelector(".searchBar");
const dataSource = new ProductData(); 

async function handleSearch(query) {
    if (!query) {
        console.log("Please enter a valid product");
        return;
    }

    try {
        
        const products = await dataSource.getData(query);
        
        if (products && products.length > 0) {
            
            productCardTemplate(products[0]);
        } else {
            console.log("Product not found");
        }
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}


searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleSearch(searchInput.value.trim());
    }
});

searchButton.addEventListener("click", function () {
    handleSearch(searchInput.value.trim());
});