//coroesel

let arr=[
    "https://st-images.honasa.in/1920_X512_389faf85d0.jpg?format=auto&width=&qualilty=",
    "https://st-images.honasa.in/1920_X512_deaktop_ca7d483324.jpg?format=auto&width=&qualilty="
    
]
let root = document.getElementById('root');

let i = 0;
let timer;
appendimg(1);

//append image to the root div
function appendimg(z) {
    let img = document.createElement("img");
    img.src = arr[z];

    root.innerHTML = "";
    root.append(img);
}

//again start the carousel automatically
function startCaroseal() {
    timer = setInterval(function () {
        if (i == arr.length) {
            i = 0;
        }
        appendimg(i);
        i++;
    }, 4000);
}

startCaroseal();

// previous button
function prev() {
    clearInterval(timer);
    if (i == 0) {
        i = arr.length - 1;
    } else {
        i--;
    }
    appendimg(i);
    setTimeout(startCaroseal, 4000);
    console.log(i);
}

//next button code 
function next() {
    clearInterval(timer);
    if (i == arr.length) {
        i = 0;
    } else {
        i++;
    }
    appendimg(i);
    setTimeout(startCaroseal, 4000);
    console.log(i);
}




// -----------------------------------------------------------------------------------------------------------------------------------------------------



//CRUD
let ADD = document.getElementById("ADD");
ADD.addEventListener("submit", addData);

function addData(event) {
    event.preventDefault();

    let prodname = document.getElementById("prodname").value;
    let prodprice = document.getElementById("prodprice").value;
    let prodimage = document.getElementById("prodimg").value;
    let prodcategory = document.getElementById("prodcat").value;

    let obj = {
        productName: prodname,
        productPrice: prodprice,
        productCategory: prodcategory,
        productImage: prodimage,
    };

    console.log("Object to send:", obj);
    sendDataToDb(obj);
}

async function sendDataToDb(obj) {
    try {
        let response = await fetch("http://localhost:4000/products", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            console.log("Data sent successfully");
        } else {
            console.error("Failed to send data:", response.statusText);
        }
    } catch (error) {
        console.error("Error sending data:", error);
    }
}

async function getData() {
    try {
        let data = await fetch("http://localhost:4000/products");

        let actualData = await data.json();

        console.log("Fetched data:", actualData);

        let container = document.createElement("div");
        actualData.forEach((product) => {
            let productDiv = document.createElement("div");

            productDiv.innerHTML = `
                <h3>${product.productName}</h3>
                <p>Price: $${product.productPrice}</p>
                <p>Category: ${product.productCategory}</p>
                <img src="${product.productImage}" alt="${product.productName}" />
            `;
            container.appendChild(productDiv);
        });

        document.body.appendChild(container);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call getData to fetch and display existing data
getData();
