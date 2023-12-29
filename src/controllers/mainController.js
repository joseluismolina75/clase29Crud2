const fs = require('fs');
const path = require('path');

//me dice donde está ubicada la base
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const inDiscount = products.filter(product => product.discount > 0)
		console.log(inDiscount.length);
		const visited = products.filter(product => product.category === "visited")
		console.log(visited.length);
		res.render('index.ejs', {inDiscount, visited})
	},
	search: (req, res) => {
		let searchProducts = products.filter(product => product.name == req.query.keywords);
		res.send(searchProducts);
	},
	search2: (req, res) => {
		palabra = (req.query.keywords).toLowerCase();
		const pFound = products.some(product => product.name.toLowerCase().includes(palabra));
		const pToSearch = products.filter(product => product.name.toLowerCase().includes(palabra));
		res.send(searchProducts);
};

module.exports = controller;
