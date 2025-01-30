import {renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    return `<li class="product-card">
            <a href="../product_pages/index.html?product=${product.Id}">
              <img
                src="${product.Images.PrimaryMedium}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.Name}</h2>
              <p class="product-card__price">$${product.FinalPrice}</p></a>
          </li>`;
    }

function topList(list){
    const topValues = ["880RR", "985RF", "985PR", "344YJ"];
    const finalList = list.filter((tent) => topValues.includes(tent.Id));
    return finalList;
}

export default class ProductList {
    constructor(category, dataSource, listElement){
        //this will make our class flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init(){
        const list = await this.dataSource.getData(this.category);
        // console.log(list);
        // const tipList = topList(list);

        this.renderList(list);

        document.querySelector(".title").innerHTML = this.category;
    }
    renderList(list){
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
