let currentStep = 1;
const totalSteps = 5;

function nextStep(step) {
    if (validateStep(step)) {
        document.getElementById(`step${step}`).style.display = 'none';
        currentStep++;
        document.getElementById(`step${currentStep}`).style.display = 'block';
    }
}

function prevStep(step) {
    document.getElementById(`step${step}`).style.display = 'none';
    currentStep--;
    document.getElementById(`step${currentStep}`).style.display = 'block';
}

function validateStep(step) {
    // Add validation logic for each step
    return true; // Placeholder for validation logic
}

function updateSubcategories() {
    const category = document.getElementById('category').value;
    const subcategorySelect = document.getElementById('subcategory');
    subcategorySelect.innerHTML = '';

    if (category === 'Electronics') {
        subcategorySelect.innerHTML = `<option value="Mobiles">Mobiles</option>
                                        <option value="Laptops">Laptops</option>`;
    } else if (category === 'Clothing') {
        subcategorySelect.innerHTML = `<option value="Men">Men</option>
                                        <option value="Women">Women</option>`;
    } else if (category === 'Home Appliances') {
        subcategorySelect.innerHTML = `<option value="Kitchen">Kitchen</option>
                                        <option value="Living Room">Living Room</option>`;
    }
}

function openVariantModal() {
    const variantModal = new bootstrap.Modal(document.getElementById('variantModal'));
    variantModal.show();
}

function updateVariantFields() {
    const variantType = document.getElementById('variantType').value;
    const variantFields = document.getElementById('variantFields');
    variantFields.innerHTML = '';

    if (variantType === 'Size') {
        variantFields.innerHTML = `<label for="size" class="form-label">Size</label>
                                   <input type="text" class="form-control" id="size">`;
    } else if (variantType === 'Color') {
        variantFields.innerHTML = `<label for="color" class="form-label">Color</label>
                                   <input type="color" class="form-control" id="color">`;
    } else if (variantType === 'Unit') {
        variantFields.innerHTML = `<label for="unitCount" class="form-label">Unit Count</label>
                                   <input type="number" class="form-control" id="unitCount">
                                   <label for="unitType" class="form-label">Unit Type</label>
                                   <select class="form-select" id="unitType">
                                       <option value="kg">kg</option>
                                       <option value="piece">piece</option>
                                   </select>`;
    }
}

function saveVariant() {
    const variantType = document.getElementById('variantType').value;
    const variantValue = variantType === 'Size' ? document.getElementById('size').value :
        variantType === 'Color' ? document.getElementById('color').value :
        variantType === 'Unit' ? `${document.getElementById('unitCount').value} ${document.getElementById('unitType').value}` : '';

    const variantList = document.getElementById('variantList');
    variantList.innerHTML += `<div>${variantType}: ${variantValue}</div>`;
    const variantModal = bootstrap.Modal.getInstance(document.getElementById('variantModal'));
    variantModal.hide();
}

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    saveToLocalStorage();
    displayProducts();
});

function saveToLocalStorage() {
    const productData = {
        productName: document.getElementById('productName').value,
        sku: document.getElementById('sku').value,
        brandName: document.getElementById('brandName').value,
        category: document.getElementById('category').value,
        shortDescription: document.getElementById('shortDescription').value,
        fullDescription: document.getElementById('fullDescription').value,
        metaTitle: document.getElementById('metaTitle').value,
        metaKeywords: document.getElementById('metaKeywords').value,
        metaDescription: document.getElementById('metaDescription').value,
        basePrice: document.getElementById('basePrice').value,
        discount: document.getElementById('discount').value,
        shippingFee: document.getElementById('shippingFee').value,
        totalStock: document.getElementById('totalStock').value,
        variants: Array.from(document.getElementById('variantList').children).map(variant => variant.innerText)
    };

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(productData);
    localStorage.setItem('products', JSON.stringify(products));
}

function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productTableBody = document.getElementById('productTable').querySelector('tbody');
    productTableBody.innerHTML = '';

    products.forEach((product, index) => {
        productTableBody.innerHTML += `<tr>
            <td>${product.productName}</td>
            <td>${product.sku}</td>
 <td>${product.brandName}</td>
            <td>${product.category}</td>
            <td>${calculateFinalPrice(product.basePrice, product.discount, product.shippingFee)}</td>
            <td>
                <button class="btn btn-warning" onclick="editProduct(${index})">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

// function calculateFinalPrice(basePrice, discount, shippingFee) {
//     const discountAmount = (basePrice * (discount / 100)) || 0;
//     return (basePrice - discountAmount + (shippingFee || 0)).toFixed(2);
// }

function calculateFinalPrice(basePrice, discount, shippingFee) {
    // Parse input values to ensure they are numbers
    basePrice = parseFloat(basePrice) || 0; // Default to 0 if NaN
    discount = parseFloat(discount) || 0; // Default to 0 if NaN
    shippingFee = parseFloat(shippingFee) || 0; // Default to 0 if NaN

    // Calculate discount amount
    const discountAmount = (basePrice * (discount / 100));

    // Calculate final price
    const finalPrice = basePrice - discountAmount + shippingFee;

    // Return the final price rounded to two decimal places as a number
    return parseFloat(finalPrice.toFixed(2));
}

function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products[index];

    document.getElementById('productName').value = product.productName;
    document.getElementById('sku').value = product.sku;
    document.getElementById('brandName').value = product.brandName;
    document.getElementById('category').value = product.category;
    document.getElementById('shortDescription').value = product.shortDescription;
    document.getElementById('fullDescription').value = product.fullDescription;
    document.getElementById('metaTitle').value = product.metaTitle;
    document.getElementById('metaKeywords').value = product.metaKeywords;
    document.getElementById('metaDescription').value = product.metaDescription;
    document.getElementById('basePrice').value = product.basePrice;
    document.getElementById('discount').value = product.discount;
    document.getElementById('shippingFee').value = product.shippingFee;
    document.getElementById('totalStock').value = product.totalStock;

    const variantList = document.getElementById('variantList');
    variantList.innerHTML = '';
    product.variants.forEach(variant => {
        variantList.innerHTML += `<div>${variant}</div>`;
    });

    currentStep = 1;
    for (let i = 1; i <= totalSteps; i++) {
        document.getElementById(`step${i}`).style.display = (i === currentStep) ? 'block' : 'none';
    }
}

function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products'));
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

document.getElementById('basePrice').addEventListener('input', updateFinalPrice);
document.getElementById('discount').addEventListener('input', updateFinalPrice);
document.getElementById('shippingFee').addEventListener('input', updateFinalPrice);

function updateFinalPrice() {
    const basePrice = parseFloat(document.getElementById('basePrice').value) || 0;
    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const shippingFee = parseFloat(document.getElementById('shippingFee').value) || 0;
    const finalPrice = calculateFinalPrice(basePrice, discount, shippingFee);
    document.getElementById('finalPriceDisplay').innerText = finalPrice;
}