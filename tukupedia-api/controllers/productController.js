const db = require('../database')

module.exports = {
    getProducts: (req, res) => {
        let sql = `SELECT * FROM products`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                if (result.length > 0) {
                    res.send({
                        status: 200,
                        results: result
                    })
                } else {
                    res.send({
                        status: 404,
                        message: 'Data not found',
                        results: result
                    })
                }
            } catch(err) {
                console.log(err)
            }
        })
    },

    getProductById: (req, res) => {
        let sql = `SELECT * FROM products WHERE id = ${req.params.id}`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                if (result.length > 0) {
                    res.send({
                        status: 200,
                        results: result
                    })
                } else {
                    res.send({
                        status: 404,
                        message: 'Data not found',
                        results: result
                    })
                }
            } catch(err) {
                console.log(err)
            }
        })
    },

    createProduct: (req, res) => {
        let sql = `INSERT INTO products (id, name, description, price, seller, rating, picture)
        VALUES (0, '${req.body.name}', '${req.body.description}', ${req.body.price},
        '${req.body.seller}', ${req.body.rating}, '${req.body.picture}')`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                res.send({
                    status: 201,
                    message: 'Create product success',
                    results: result
                })
            } catch(err) {
                console.log(err)
            }
        })
    },

    editProduct: (req, res) => {
        let sql = `UPDATE products SET name = '${req.body.name}', description = '${req.body.description}',
        price = ${req.body.price}, seller = '${req.body.seller}', rating = ${req.body.rating},
        picture = '${req.body.picture}' WHERE id = ${req.params.id}`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                res.send({
                    status: 200,
                    message: 'Edit product success',
                    results: result
                })
            } catch(err) {
                console.log(err)
            }
        })
    },

    deleteProduct: (req, res) => {
        let sql = `DELETE FROM products WHERE id = ${req.params.id}`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                res.send({
                    status: 200,
                    message: 'Delete product success',
                    results: result
                })
            } catch(err) {
                console.log(err)
            }
        })
    }
}