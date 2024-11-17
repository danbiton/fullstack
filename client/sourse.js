const url = "http://localhost:3000/product";
let products;

const display = document.querySelector("#board");

// async function getProduct() {
//   try {
//     // const response = await fetch(`${url}/getAllProduct`);
//     const {data} = await axios.get(`${url}/getAllProduct`, {withCredentials: true});
//     // const data = await response.json();
//     products = data.products;
//     buildTableProducts();
//   } catch (error) {
//     console.log(error);
//   }
// }

async function getProduct(ispage) {
  try {
    const response = await fetch(`${url}/getAllProduct`);
    // const {data} = await axios.get(`${url}/getAllProduct`, {withCredentials: true});
    const data = await response.json();
    products = data.products;
    // buildTableProducts();
    if (ispage === "table") buildTableProducts();
    else buildCards();
  } catch (error) {
    console.log(error);
  }
}

function buildCards() {
  display.innerHTML = "";

  display.className = "d-flex flex-wrap justify-content-center";
  products.forEach((product) => {
    display.innerHTML += `
    
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" >
        <div class="card h-100 shadow-sm">
          <img src="${product.product_image}" 
               class="card-img-top img-fluid" 
               alt="${product.product_name}" 
               style="height: 200px; object-fit: cover; width: 100%;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.product_name}</h5>
            <p class="card-text text-muted">${
              product.product_description || "No description available"
            }</p>
            <p class="card-text fw-bold">₪${product.product_price}</p>
            <button onclick="buildList('${encodeURIComponent(JSON.stringify(product))}')"class="btn btn-primary mt-auto add-to-cart" data-id="${product._id}">Add to Cart</button>
          </div>
        </div>
      </div>`;
  });
}
let lstProduct = [];
function buildList(product) {
  const getproduct = JSON.parse(decodeURIComponent(product));
  const newProduct = {
    product_image: getproduct.product_image,
    product_price: getproduct.product_price,
    quantity: 1,
    total: getproduct.product_price,
  };
  const existingProduct = lstProduct.find(
    (item) =>
      item.product_image === newProduct.product_image &&
      item.product_price === newProduct.product_price
  );
  if (existingProduct) {
    existingProduct.quantity += 1
    existingProduct.total += getproduct.product_price
  } else {
    lstProduct.push(newProduct);
  }
  
}


function displayCart() {
  display.innerHTML = `<body>
    <div class="cart-container">
        <div class="cart-header">
            Your Shopping Cart
        </div>
        <div class="table-container">
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                
                </thead>
            <tbody id="cartList">
            
            </tbody>
          </table>
          </div>
        <div class="cart-footer">
            <button class="close-button">Close</button>
            <div class="total-section">
                Total: <span id="cart-total">$0</span>
                <button class="checkout-button">Checkout</button>
            </div>
        </div>
    </div>`;

  const showDetails = document.querySelector("#cartList");
  lstProduct.forEach((product1, index) => {
    showDetails.innerHTML += ` <tr>
    
    <td><img src="${product1.product_image}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;"></td>
    <td class="item-total">${product1.product_price}</td>
    <td><input type="number" class="quantity-input" value="${product1.quantity}" min="1" data-price="29.90" oninput="updatePrice(${index})"></td>  
     <td class="item-total">${product1.total}</td> 
    <td><button class="action-button" onclick="removeProduct(${index})">Remove</button></td>
</tr>`;
  });
  updateCartTotal();
  
}

function updatePrice(index) {
  const product1 = lstProduct[index];
  const QtyInput = document.querySelectorAll(".quantity-input")[index];
  const newQuantity = parseInt(QtyInput.value, 10);
  
  product1.quantity = newQuantity;
  product1.total = product1.product_price * newQuantity;
  
  
  displayCart() 
  updateCartTotal();
}

function updateCartTotal() {
  const totalElement = document.querySelector("#cart-total");
  const totalAmount = lstProduct.reduce((acc, product) => acc + product.total, 0);
  totalElement.innerHTML = `${totalAmount.toFixed(2)}`;
}


function removeProduct(index) {
  lstProduct.splice(index, 1);
  displayCart();
  
}

function buildTableProducts() {
  board.innerHTML = `
  <div class="container mt-4">
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Product Image</th>
          <th scope="col">Product Name</th>
          <th scope="col">Product Description</th>
          <th scope="col">Product Price</th>
        </tr>
      </thead>
      <tbody id="bodytable"></tbody>
    </table>
  </div>
`;
  const table = document.querySelector("#bodytable");
  table.innerHTML = "";

  products.forEach((product) => {
    table.innerHTML += `
        <tr>
          <td>${product._id}</td>
          <td><img src="${product.product_image}" alt="Product Image" width="50"></td>
          <td>${product.product_name}</td>
          <td>${product.product_description}</td>
          <td>${product.product_price}</td>
        </tr>
        `;
  });
}

async function FormProduct() {
  display.innerHTML = `
   <div class="container mt-5">
    <div class="form-container">
      <h4 class="text-center">הוספת מוצר</h4>
      <form id="addProduct">
        <div class="mb-2">
          <label for="productName" class="form-label">שם מוצר</label>
          <input type="text" class="form-control form-control-sm" required name="product_name" id="product_name">
        </div>
        <div class="mb-2">
          <label for="productPrice" class="form-label">מחיר מוצר</label>
          <input type="number" class="form-control form-control-sm" required name="product_price" id="product_price">
        </div>
        <div class="mb-2">
          <label for="productDescription" class="form-label">תיאור מוצר</label>
          <textarea class="form-control form-control-sm" rows="3" name="product_description"
            id="product_description"></textarea>
        </div>
        <div class="mb-2">
      <label for="product_image" class="form-label">תמונת מוצר</label>
      <input type="file" class="form-control form-control-sm" required name="product_image" id="product_image" accept="image/*">
       </div>
        <button type="submit" class="btn btn-primary btn-sm">הוסף מוצר</button>

      </form>
      </div>`;
  addProducts();
}

// async function addProducts() {
//   const addProduct = document.querySelector("#addProduct");
//   addProduct.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const product = {
//       product_name: e.target.productName.value,
//       product_price: e.target.productPrice.value,
//       product_image: e.target.productImage.value,
//       product_description: e.target.productDescription.value,
//     };

//     try {
//       const { data } = await axios.post(`${url}/addproduct`, product, {
//         withCredentials: true,
//       });

//       console.log(data);
//       //   const response = await fetch(`${url}/addproduct`, {
//       //     method: "POST",
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //     },
//       //     body: JSON.stringify(product),
//       //   });

//       //   const data = await response.json();
//       // console.log(data.message);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// }

async function addProducts() {
  const addProduct = document.querySelector("#addProduct");
  addProduct.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(e);
    console.log(e.currentTarget);

    const formdata = new FormData(e.currentTarget);

    try {
      const response = await fetch(`${url}/addproduct`, {
        method: "POST",
        body: formdata,
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
}

function SignupForm() {
  display.innerHTML = `
  <div style="height: 100vh;" class="w-50 mx-auto d-flex justify-content-center align-items-center">
  <form id="signup_form">
      <h1>Log up Form</h1>
      <div class="form-group">
        <label for="user_name">first Name</label>
        <input type="text"class="form-control"  id="user_name" name="user_name"   placeholder="Ente Name"required > 
 
        <small id="nameHelp" class="form-text text-muted">
         השם שלך לא ישותף עם אף אחד.
        </small>
      </div>
      <div class="form-group">
        <label for="user_email">Email address</label>
        <input type="email" class="form-control" id="user_email" name="user_email" aria-describedby="emailHelp"
          placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
          else.</small>
      </div>
      <div class="form-group">
        <label for="user_password">Password</label>
        <input name="user_password" type="password" class="form-control" id="user_password" placeholder="Password">
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>`;
  sign_up();
}

async function sign_up() {
  const signupForm = document.querySelector("#signup_form");

  const url1 = "http://localhost:3000/users";
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = {
      user_name: e.target.user_name.value,
      user_email: e.target.user_email.value,
      user_password: e.target.user_password.value,
    };
    try {
      const { data } = await axios.post(`${url1}/signup`, user, {
        withCredentials: true,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
}

function showLoginForm() {
  display.innerHTML = `
  <div style="height: 100vh;" class="w-50 mx-auto d-flex justify-content-center align-items-center">
  <form id="login_form">
      <h1>Login Form</h1>
      <div class="form-group">
        <label for="user_email">Email address</label>
        <input type="email" class="form-control" id="user_email" name="user_email" aria-describedby="emailHelp"
          placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
          else.</small>
      </div>
      <div class="form-group">
        <label for="user_password">Password</label>
        <input name="user_password" type="password" class="form-control" id="user_password" placeholder="Password">
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div`;
  sign_in();
}

async function sign_in() {
  const loginForm = document.querySelector("#login_form");

  const url1 = "http://localhost:3000/users";
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = {
      user_email: e.target.user_email.value,
      user_password: e.target.user_password.value,
    };
    try {
      const { data } = await axios.post(`${url1}/signin`, user, {
        withCredentials: true,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
}

async function LogOut() {
  try {
    const url1 = "http://localhost:3000/users";
    const { data } = await axios.get(`${url1}/signout`, {
      withCredentials: true,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
