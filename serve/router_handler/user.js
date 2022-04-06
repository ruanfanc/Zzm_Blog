const jwt = require('jsonwebtoken')
const { passdb } = require('../mysql/index')
exports.Login = async (req, res) => {
    let password = req.body.password
    let sql = 'select * from password'
    await passdb.query(sql, (err, result) => {
        if (err) {
            return res.status('422').send({
                status: 0, message: "查询失败", errmessage: err.message
            });
        } else {
            if (result[0].password == password) {
                const token = 'Bearer ' + jwt.sign(
                    {
                        _id: 'mengmeng',
                    },
                    'zzmlovesyj',
                    {
                        expiresIn: 3600 * 24 * 3
                    }
                )
                res.json({
                    status: '200',
                    token: token
                })
            } else {
                res.json({
                    status: '204',
                    message: '密码错误'
                })
            }

        }

    })
}
