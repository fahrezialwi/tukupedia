const db = require('../database')

module.exports = {
    getUsers: (req, res) => {
        let sql = `SELECT * FROM users`
        
        if (req.query.username) {
            sql += ` WHERE username = '${req.query.username}'`
        } else if (req.query.email) {
            sql += ` WHERE email = '${req.query.email}'`
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
                        message: 'User not found',
                        results: result
                    })
                }
            } catch(err) {
                console.log(err)
            }
        })
    },

    getUserById: (req, res) => {
        let sql = `SELECT * FROM users WHERE id = ${req.params.id}`

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
                        message: 'User not found',
                        results: result
                    })
                }
            } catch(err) {
                console.log(err)
            }
        })
    },

    createUser: (req, res) => {
        let sql = `INSERT INTO users (id, username, email, password, role)
        VALUES (0, '${req.body.username}', '${req.body.email}', '${req.body.password}', 'user')`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                res.send({
                    status: 201,
                    message: 'Create user success',
                    results: result
                })
            } catch(err) {
                console.log(err)
            }
        })
    },

    loginUser: (req, res) => {
        let sql = `SELECT * FROM users WHERE username = '${req.query.username}' AND password = '${req.query.password}'`

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
                        status: 401,
                        message: 'Wrong email or password',
                        results: result
                    })
                }
            } catch(err) {
                console.log(err)
            }
        })
    }
}