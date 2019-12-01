const db = require('../database')

module.exports = {
    getCarts: (req, res) => {
        let sql = `SELECT c.id, c.product_id, p.name, p.description, p.price, p.seller, p.rating, p.picture,
        c.qty, c.user_id FROM carts as c JOIN products as p ON c.product_id = p.id`

        if (req.query.product_id && req.query.user_id) {
            sql += ` WHERE c.product_id = ${req.query.product_id} AND c.user_id = ${req.query.user_id}`
        } else if (req.query.user_id) {
            sql += ` WHERE c.user_id = ${req.query.user_id}`
        }

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

    getCartById: (req, res) => {
        let sql = `SELECT c.id, c.product_id, p.name, p.description, p.price, p.seller, p.rating, p.picture,
        c.qty, c.user_id FROM carts as c JOIN products as p ON c.product_id = p.id WHERE c.id = ${req.params.id}`

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

    createCart: (req, res) => {
        let sql = `INSERT INTO carts (id, product_id, qty, user_id)
        VALUES (0, ${req.body.product_id}, ${req.body.qty}, ${req.body.user_id})`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                res.send({
                    status: 201,
                    message: 'Create cart success',
                    results: result
                })
            } catch(err) {
                console.log(err)
            }
        })
    },

    editCart: (req, res) => {
        let sql = `UPDATE carts SET qty = ${req.body.qty} WHERE id = ${req.params.id}`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                res.send({
                    status: 200,
                    message: 'Edit cart success',
                    results: result
                })
            } catch(err) {
                console.log(err)
            }
        })
    },

    deleteCart: (req, res) => {
        let sql = `DELETE FROM carts WHERE id = ${req.params.id}`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                res.send({
                    status: 200,
                    message: 'Delete cart success',
                    results: result
                })
            } catch(err) {
                console.log(err)
            }
        })
    }
}