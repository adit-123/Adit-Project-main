// routes.js
const express = require('express');
const ExcelJS = require('exceljs');
const ProductReference = require('./ProductReference'); // Adjust the path as needed
const router = express.Router();

router.get('/',async (req,res)=>{
  res.send("Hello Dear")
})

// POST route to submit product and reference data
router.post('/api/submit', async (req, res) => {
  try {
    const { name, mobileNo, gstNo, products, reference } = req.body;

    // Create a new ProductReference document
    const newProductReference = new ProductReference({
      name,
      mobileNo,
      gstNo,
      products,
      reference,
    });

    // Save the document to the database
    const savedData = await newProductReference.save();
    res.status(201).json({ message: 'Data submitted successfully!', data: savedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting data', error: error.message });
  }
});

router.get('/api/download', async (req, res) => {
  try {
    // Fetch all data
    const data = await ProductReference.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Define headers
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Mobile No', key: 'mobileNo', width: 15 },
      { header: 'GST No', key: 'gstNo', width: 15 },
      { header: 'Product Name', key: 'productName', width: 20 },
      { header: 'Category', key: 'category', width: 15 },
      { header: 'Quantity', key: 'qty', width: 10 },
      { header: 'Unit', key: 'unit', width: 10 },
      { header: 'Price', key: 'pay', width: 15 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Date', key: 'date', width: 15 },
    ];

    // Add rows with each record's stored date
    data.forEach((entry) => {
      entry.products.forEach((product) => {
        worksheet.addRow({
          name: entry.name,
          mobileNo: entry.mobileNo,
          gstNo: entry.gstNo,
          productName: product.productName,
          category: product.category,
          qty: product.qty,
          unit: product.unit,
          pay: product.pay,
          description: product.description,
          date: entry.date ? new Date(entry.date).toLocaleDateString() : '', // Use stored date
        });
      });
    });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');

    // Send Excel file
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to download Excel file' });
  }
});


module.exports = router;
