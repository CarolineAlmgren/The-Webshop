import { IProduct } from "../models/IProduct";
import { getMProducts, getWProducts } from "../services/productService";
import "./../scss/style.scss";

/* Shoppingcart ikonen ändras när man lägger till produkter*/
let cartValue:number = 0;
const cartValueTag = document.getElementById("cartValueTag") as HTMLElement;
const storedCartValue = localStorage.getItem("cartValue");


if (storedCartValue){
  cartValue=JSON.parse(storedCartValue);
}

/* Hämta produkter på dam sidan*/
const productsWContainer = document.getElementById("productsWContainer");

const productsW = await getWProducts();

for (let i = 0; i < productsW.length; i++) {
  const productBox = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("p");
  const price = document.createElement("p");
  const addToCartBtn = document.createElement("button");
  
  productBox.className = ("productBox");
  imgContainer.className = ("imgContainer")
  img.className = ("imgContainer--img");
  title.className = ("productBox--title");
  price.className = ("productBox--price");
  addToCartBtn.className = ("productBox--btn");
  
  img.src = productsW[i].image;
  title.innerHTML = productsW[i].title;
  price.innerHTML = productsW[i].price +" $".toString();
  addToCartBtn.innerHTML = "Add to cart";
  productsW[i].qty = 0;
  
  productBox.appendChild(imgContainer);
  imgContainer.appendChild(img);
  productBox.appendChild(title);
  productBox.appendChild(price);
  productBox.appendChild(addToCartBtn);
  productsWContainer?.appendChild(productBox);
  
  addToCartBtn.addEventListener("click", ()=>{
    if(shoppingCartList.includes(productsW[i])) {
      productsW[i].qty++;
    }else{
      productsW[i].qty = 1;
      shoppingCartList.push(productsW[i]);
    } 
    cartValue ++;
    shoppingCartHtml();
    showShoppingCartValue();
  })
}

/* Hämta produkter på herr sidan*/
const productsMContainer = document.getElementById("productsMContainer");

const productsM = await getMProducts();

for (let i = 0; i < productsM.length; i++) {
  const productBox = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("p");
  const price = document.createElement("p");
  const addToCartBtn = document.createElement("button");
  
  productBox.className = ("productBox");
  imgContainer.className = ("imgContainer")
  img.className = ("imgContainer--img");
  title.className = ("productBox--title");
  price.className = ("productBox--price");
  addToCartBtn.className = ("productBox--btn");
  
  img.src = productsM[i].image;
  title.innerHTML = productsM[i].title;
  price.innerHTML = productsM[i].price +" $".toString();
  addToCartBtn.innerHTML = "Add to cart";
  productsM[i].qty = 0;
  
  productBox.appendChild(imgContainer);
  imgContainer.appendChild(img);
  productBox.appendChild(title);
  productBox.appendChild(price);
  productBox.appendChild(addToCartBtn);
  productsMContainer?.appendChild(productBox);
  
  addToCartBtn.addEventListener("click", ()=>{
    if(shoppingCartList.includes(productsM[i])) {
      productsM[i].qty++;
    }else{
      productsM[i].qty = 1;
      shoppingCartList.push(productsM[i]);
    }
    cartValue++;
    shoppingCartHtml();
    showShoppingCartValue();
  })
};
    


// Skapande av varukorg lista och local storage getItem
const shoppingCartContainer = document.getElementById("shoppingCartContainer");

let shoppingCartList:IProduct[] = [];

const valueFromLs = localStorage.getItem("shoppingCartList");

if (valueFromLs) {
  shoppingCartList = JSON.parse(valueFromLs);
}

// Huvud funktion som sätter local storage och som styr summan i varukorgen
const shoppingCartHtml = () => {

  if(shoppingCartContainer){
  shoppingCartContainer.innerHTML= "";
}

  localStorage.setItem("shoppingCartList", JSON.stringify(shoppingCartList));

  const summaryOfValue = document.getElementById("summaryOfValue");
  let sum: number = 0;
  
  /* Loop för varukorg listan */
  for(let i = 0; i < shoppingCartList.length; i++){
    sum += shoppingCartList[i].price * shoppingCartList[i].qty;

    const productBox = document.createElement("div");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("p");
    const price = document.createElement("p");
    const qtyContainer = document.createElement("div");
    const plusBtn = document.createElement("button")
    const minusBtn = document.createElement("button")
    const removeBtn = document.createElement("button");
    const qty = document.createElement("p");
  

    productBox.className = ("shoppingCartBox");
    imgContainer.className = ("imgContainerSC");
    img.className = ("imgContainerSC--img");
    title.className = ("shoppingCartBox--title");
    price.className = ("shoppingCartBox--price");
    removeBtn.className = ("shoppingCartBox--removeBtn");
    
    qtyContainer.className =("qtyContainer");
    minusBtn.className = ("qtyContainer--changeQtyBtn");
    plusBtn.className = ("qtyContainer--changeQtyBtn");
    
    img.src = shoppingCartList[i].image;
    title.innerHTML = shoppingCartList[i].title;
    price.innerHTML = shoppingCartList[i].price +" $".toString();
    plusBtn.innerHTML = "+";
    qty.innerHTML = shoppingCartList[i].qty.toString();
    minusBtn.innerHTML = "-";
    removeBtn.innerHTML ="Remove";

    removeBtn.addEventListener("click", () => {
      shoppingCartList.splice(i);
      productBox.innerHTML = "";
      cartValue = 0;
      cartValueTag.innerHTML = "";
      sum = 0;

      checkSum()
      shoppingCartHtml();
      showShoppingCartValue();
      checkIfEmpty();
    });

    //Plus knapp för varukorg
    plusBtn.addEventListener ("click", ()=>{
      if(shoppingCartContainer){
        shoppingCartContainer.innerHTML ="";
      }
      shoppingCartList[i].qty++;
      cartValue++;
      qty.innerHTML = shoppingCartList[i].qty.toString();
      shoppingCartHtml();
      showShoppingCartValue();
    });

    //Minus knapp för varukorg
    minusBtn.addEventListener ("click", ()=>{
      if(shoppingCartList[i].qty === 1){ 
        cartValue --; 
        productBox.remove();
        shoppingCartList.splice(i,1);
        sum =0;
        checkSum();
        shoppingCartHtml();
        showShoppingCartValue();
        checkIfEmpty();

      } else{
        shoppingCartList[i].qty--;
        qty.innerHTML = shoppingCartList[i].qty.toString();
        cartValue--;
        checkSum();
        shoppingCartHtml();
        showShoppingCartValue();
    }
  }
    
    )

    const checkSum = () => {
    if(summaryOfValue){
      summaryOfValue.innerHTML = "";
      summaryOfValue.innerHTML = "Sum: " + sum.toString() +"$";
     }
    };

    checkSum();

    imgContainer.appendChild(img);
    productBox.appendChild(imgContainer)
    productBox.appendChild(title);
    title.appendChild(price);
    qtyContainer.appendChild(minusBtn);
    qtyContainer.appendChild(qty);
    qtyContainer.appendChild(plusBtn);
    title.appendChild(qtyContainer);
    qtyContainer.appendChild(removeBtn);
    shoppingCartContainer?.appendChild(productBox);

  };
};

shoppingCartHtml()

//Klick funktion nedan för att navigera till woman/mens sidor från hero
const imgContainerW = document.querySelector(".main--imgContainerW");
const imgContainerM = document.querySelector(".main--imgContainerM");

imgContainerW?.addEventListener("click", ()=>{
  window.open("womens.html", "_self");
})

imgContainerM?.addEventListener("click", ()=>{
  window.open("mens.html", "_self");
})

//funktion för att visualisera val av betalning
  const paymentChoice = document.getElementById("paymentChoice");
  const card = document.getElementById("card");
  const swish = document.getElementById("swish");
  
  
  card?.addEventListener("click", ()=>{
    if(paymentChoice){
      paymentChoice.innerHTML = "";
    }
    const cardNumberDiv = document.createElement("div");
    const cardNumberInput = document.createElement("input");
    const cardExtraNumberDiv = document.createElement("div");
    const cardExpireInput = document.createElement("input");
    const cardCvc = document.createElement("input");
  
    cardNumberInput.placeholder = "xxxx xxxx xxxx xxxx";
    cardExpireInput.placeholder = "M/Y";
    cardCvc.placeholder = "CVC";
  
    cardNumberInput.className = ("cardNumber");
    cardExtraNumberDiv.className = ("monthCvcDiv");
    cardExpireInput.className = ("monthCvc");
    cardCvc.className = ("monthCvc");
  
  
    paymentChoice?.appendChild(cardNumberDiv);
    cardNumberDiv.appendChild(cardNumberInput);
    paymentChoice?.appendChild(cardExtraNumberDiv);
    cardExtraNumberDiv.appendChild(cardExpireInput);
    cardExtraNumberDiv.appendChild(cardCvc);
  });
  
  swish?.addEventListener("click", ()=>{
    if(paymentChoice){
      paymentChoice.innerHTML = "";
    }
  
    const cardNumberDiv = document.createElement("div");
    const cardNumberInput = document.createElement("input");
  
    cardNumberInput.placeholder = "+46 ";
    cardNumberInput.className = ("cardNumber");
  
    paymentChoice?.appendChild(cardNumberDiv);
    cardNumberDiv.appendChild(cardNumberInput);
  });

  const showShoppingCartValue = ()=> {
    localStorage.setItem("cartValue", JSON.stringify(cartValue));
    if (cartValueTag){
      cartValueTag.innerHTML = "";
      cartValueTag.innerHTML = cartValue.toString();
    }
  }
  
  showShoppingCartValue();





 //Funktion för checkOutLoop
 const checkoutHTML =()=>{
 
const orderSummaryContainer = document.getElementById("orderSummaryContainer");
const summaryOfValue = document.getElementById("summaryOfValue") as HTMLParagraphElement;

let sum: number = 0;

for (let i=0; i< shoppingCartList.length; i++){
  sum += shoppingCartList[i].price * shoppingCartList[i].qty;

  const productBox = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("p");
  const price = document.createElement("p");
  const qtyContainer = document.createElement("div");
  const plusBtn = document.createElement("button")
  const minusBtn = document.createElement("button")
  const removeBtn = document.createElement("button");
  const qty = document.createElement("p");

  productBox.className = ("checkOut--productBox");
  imgContainer.className = ("checkOut--imgContainer")
  img.className = ("checkOut--img");
  title.className = ("checkOut--title");
  price.className = ("checkOut--price");
  removeBtn.className = ("checkOut--removeBtn");
  minusBtn.className = ("checkOut--minusBtn");
  plusBtn.className = ("checkOut--plusBtn");
  qtyContainer.className = ("checkOut--qty");

  img.src = shoppingCartList[i].image;
  title.innerHTML = shoppingCartList[i].title;
  price.innerHTML = shoppingCartList[i].price +" $".toString();
  plusBtn.innerHTML = "+";
  qty.innerHTML = shoppingCartList[i].qty.toString();
  minusBtn.innerHTML = "-";
  removeBtn.innerHTML ="Remove";
  
  removeBtn.addEventListener("click", () => {
    cartValue = 0; 
    productBox.remove();
    shoppingCartList.splice(i,1);
    sum =0;
    summaryOfValue.innerHTML = "Sum: " + sum.toString() +"$";
    
    shoppingCartHtml();
    showShoppingCartValue();

  });
  
  imgContainer.appendChild(img);
  productBox.appendChild(imgContainer)
  productBox.appendChild(title);
  title.appendChild(price);
  orderSummaryContainer?.appendChild(productBox);
  qtyContainer.appendChild(minusBtn);
  qtyContainer.appendChild(qty);
  qtyContainer.appendChild(plusBtn);
  title.appendChild(qtyContainer);
  qtyContainer.appendChild(removeBtn);

 // plusknapp för varorna i checkouten
   plusBtn.addEventListener ("click", ()=>{
    if(shoppingCartContainer){
      shoppingCartContainer.innerHTML ="";
    }
    shoppingCartList[i].qty++;
    cartValue++;
    qty.innerHTML = shoppingCartList[i].qty.toString();
    
    shoppingCartHtml();
    showShoppingCartValue();
  });

  //Minus knapp för varorna i checkouten
  minusBtn.addEventListener ("click", ()=>{
    if(shoppingCartList[i].qty === 1){ 
      cartValue --; 
      productBox.remove();
      shoppingCartList.splice(i,1);
      sum =0;
      summaryOfValue.innerHTML = "Sum: " + sum.toString() +"$";
      
      shoppingCartHtml();
      showShoppingCartValue();

    } else{
      shoppingCartList[i].qty--;
      qty.innerHTML = shoppingCartList[i].qty.toString();
      cartValue--;
      
      shoppingCartHtml();
      showShoppingCartValue();
  }
});

 }
}
checkoutHTML();

// Innehåll som visas när varukorgen är tom
const checkIfEmpty = () => {
  if(cartValue === 0){
  console.log("det funka");
  const emtpyTitle = document.createElement("h3");
  const continueShoppingBtn = document.createElement("btn");

  emtpyTitle.className = ("emptyTitle");
  continueShoppingBtn.className = ("continueShoppingBtn");

  emtpyTitle.innerHTML = "Your shopping bag is empty!";
  continueShoppingBtn.innerHTML = "Continue shopping";
  continueShoppingBtn.addEventListener("click", ()=>{
    window.open("index.html", "_self");
  })

  shoppingCartContainer?.appendChild(emtpyTitle);
  shoppingCartContainer?.appendChild(continueShoppingBtn);

  const sumAside = document.querySelector(".sumAside") as HTMLDivElement;
  sumAside.className = ("sumAside__empty");
}
};

checkIfEmpty();

const checkOutBtn = document.getElementById("checkOutBtn");
  checkOutBtn?.addEventListener("click", ()=>{
    window.open("checkOut.html", "_self");
  })

  const purchaseBtn = document.querySelector(".purchaseBtn");

  purchaseBtn?.addEventListener("click", () => {
    window.open("purchase.html", "_self");
  });

  const continueShoppingBtn = document.getElementById("continueShopBtn");
  continueShoppingBtn?.addEventListener("click", () => {
    window.open("index.html", "_self");
  });

