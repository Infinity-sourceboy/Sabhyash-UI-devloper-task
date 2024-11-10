add all the file and the files are demo.html , style.css , Script.js
Let’s walk through an example of adding a laptop product using the multi-step "Add Product" page. We’ll simulate the user entering details step-by-step and show the expected output in the table after submission.

Example Scenario: Adding a Laptop
Step 1: Basic Product Details
Product Name: "Laptop Pro 2023"
SKU: "LAPTOP2023"
Brand Name: "TechBrand"
Category: "Electronics"
Subcategory: "Laptops"
Next Button Clicked: Moves to Step 2.

Step 2: Descriptions and Metadata
Short Description: "High-performance laptop for professionals."
Full Description: "The Laptop Pro 2023 features a 15-inch Retina display, Intel i7 processor, 16GB RAM, and 512GB SSD, making it perfect for demanding tasks."
Meta Title: "Laptop Pro 2023 - TechBrand"
Meta Keywords: "laptop, electronics, TechBrand, i7, SSD"
Meta Description: "Discover the Laptop Pro 2023 with unmatched performance and sleek design."
Next Button Clicked: Moves to Step 3.

Step 3: Media Uploads
Main Image: [User uploads an image file of the laptop]
Gallery Images: [User uploads 3 additional images showcasing the laptop]
Next Button Clicked: Moves to Step 4.

Step 4: Variant Options
Add Variant Button Clicked: Opens modal.
Variant Type: "Color"
Color: [User selects "Space Gray" using a color picker]
Add Variant: Saves the variant option.
Add Variant Button Clicked Again: Opens modal.
Variant Type: "Size"
Size: "15 inch"
Add Variant: Saves the variant option.
Next Button Clicked: Moves to Step 5.

Step 5: Pricing and Additional Costs
Base Price: "1499.99"
Discount (%): "10"
Shipping Fee: "20"
Total Stock: "50"
Final Price Display:

Calculated Final Price:
Formula: Final Price = Base Price - (Base Price * Discount / 100) + Shipping Fee
Calculation: Final Price = 1499.99 - (1499.99 * 10 / 100) + 20 = 1499.99 - 149.99 + 20 = 1370.00
Submit Button Clicked: Saves the product details to local storage and displays them in a table.

Dynamic Table Output
After submitting the form, the product details would be displayed in a dynamically created table below the form:
