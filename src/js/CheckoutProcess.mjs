import { 
  getLocalStorage,
  setLocalStorage,
  alertMessage,
  removeAllAlerts,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.Qty,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }

    calculateItemQuantity(list){
        const quantities = list.map((item) => item.Qty);
        const initialValue = 0;
        const quantTotal = quantities.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
        return quantTotal;
    }
  
    calculateItemSummary() {
        const summaryElement = document.querySelector(
            this.outputSelector + " #cartTotal"
          );
          const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
          );
          itemNumElement.innerText = this.calculateItemQuantity(this.list);
          // calculate the total of all the items in the cart
          // may need to fix this
          const amounts = this.list.map((item) => item.FinalPrice * item.Qty);
          let quant = this.calculateItemQuantity(this.list);
        //   console.log(quant);
          this.itemTotal = amounts.reduce((sum, item) => sum + item);
          summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
    }
  
    calculateOrdertotal() {
        const quantity = this.calculateItemQuantity(this.list);
        console.log(quantity);
        this.shipping = 10 + (quantity - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
          parseFloat(this.itemTotal) +
          parseFloat(this.shipping) +
          parseFloat(this.tax)
        ).toFixed(2);
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(
          this.outputSelector + " #orderTotal"
        );
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
      }
    async checkout() {
        const formElement = document.forms["checkout"];
    
        const json = formDataToJSON(formElement);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
          const res = await services.checkout(json);
          console.log(res);
          setLocalStorage("so-cart", []);
          location.assign("/checkout/success.html");
        } catch (err) {

          removeAllAlerts();
          for (let message in err.message) {
            alertMessage(err.message[message]);
          }
          console.log(err);
        }
    }
  }