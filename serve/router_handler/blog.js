const path = require("path");
const { db } = require(path.join(__dirname, "../mysql/index"))

exports.uploadimg = async (req, res) => {
    let file = req.file

    file.url = `http://127.0.0.1:3000/uploads/${file.filename}`
    console.log(file);
    res.send(file)
}
exports.createBlog = async (req, res) => {
    let bloginfo = req.body
    let sql = 'insert into bolgdetail set ?'
    await db.query(sql, { title: bloginfo.title, vicetitle: bloginfo.vicetitle, content: bloginfo.content, date: bloginfo.date, views: bloginfo.views, likes: bloginfo.likes, sort: bloginfo.sort, label: bloginfo.label }, (err, result) => {
        if (err) {
            return res.status('422').send({
                status: 0, message: err.message
            })
        }
        res.send({
            status: 200, message: "创建成功"
        })
    })

}

exports.getblogsinfo = async (req, res) => {
    let id = req.params.id ? req.params.id : 1
    limitnum = 6 * (id - 1)
    let sql = `SELECT * FROM bolgdetail  order by id desc limit ${limitnum},6 `
    let sql2 = `SELECT * FROM bolgdetail  order by id  limit 6 `
    await db.query(sql, (err, result) => {
        if (err) {
            return res.status('422').send({
                status: 0, message: "查询失败", errmessage: err.message
            });
        } else {
            if (result.length < 6) {
                db.query(sql2, (err, result2) => {
                    if (err) {
                        return res.status('422').send({
                            status: 0, message: "查询失败", errmessage: err.message
                        });
                    }
                    else {
                        return res.send({
                            status: 200, message: "查询成功", blogs: result2
                        })
                    }
                })
            }
            else {
                return res.send({
                    status: 200, message: "查询成功", blogs: result
                })
            }
        }

    })
}

exports.getblogdetail = async (req, res) => {
    let id = req.params.id
    let sql = `select * from bolgdetail where id = ${id} `
    await db.query(sql, (err, result) => {
        if (err) {
            return res.status('422').send({
                status: 0, message: "查询失败", errmessage: err.message
            });
        } else {
            return res.send({
                status: 200, message: "查询成功", blogdetail: result
            })
        }

    })

}

exports.getsortsnum = async (req, res) => {
    let sql = "SELECT sort,count(*) as num FROM bolgdetail group by sort"
    await db.query(sql, (err, result) => {
        if (err) {
            return res.status('422').send({
                status: 0, message: "查询失败", errmessage: err.message
            });
        } else {
            return res.send({
                status: 200, message: "查询成功", sorts: result
            })
        }
    })

}

exports.getlabelsnum = async (req, res) => {
    let sql = "SELECT label,count(*) as num FROM bolgdetail group by label"
    await db.query(sql, (err, result) => {
        if (err) {
            return res.status('422').send({
                status: 0, message: "查询失败", errmessage: err.message
            });
        } else {
            return res.send({
                status: 200, message: "查询成功", labels: result
            })
        }
    })
}

exports.getblogsnum = async (req, res) => {
    let sql = "SELECT count(*)as num FROM bolgdetail"
    await db.query(sql, (err, result) => {
        if (err) {
            return res.status('422').send({
                status: 0, message: "查询失败", errmessage: err.message
            });
        } else {
            return res.send({
                status: 200, message: "查询成功", blogsnum: result
            })
        }
    })
}

exports.getsorts = async (req, res) => {
    let sql = 'SELECT * ,count(*)as num FROM bolgdetail where sort="技术"'
    await db.query(sql, (err, result) => {
        if (err) {
            return res.status('422').send({
                status: 0, message: "查询失败", errmessage: err.message
            });
        } else {
            return res.send({
                status: 200, message: "查询成功", sorts: result
            })
        }
    })

}

exports.getlabels = async (req, res) => {
    let sql = "SELECT *,count(*) as num FROM bolgdetail group by label"
    await db.query(sql, (err, result) => {
        if (err) {
            return res.status('422').send({
                status: 0, message: "查询失败", errmessage: err.message
            });
        } else {
            return res.send({
                status: 200, message: "查询成功", labels: result
            })
        }
    })
}

exports.getlabelinfo = async (req, res) => {
    let index = 6 * (req.params.index - 1)
    let label = req.params.label
    let sql = `SELECT * FROM bolgdetail where label = '${label}' order by id desc limit ${index}, 6 `
    await db.query(sql, (err, result) => {
        if (err) {
            return res.status('422').send({
                status: 0, message: "查询失败", errmessage: err.message
            });
        } else {
            return res.send({
                status: 200, message: "查询成功", labelinfo: result
            })
        }
    })
}

exports.getsortinfo = async (req, res) => {
    let index = 6 * (req.params.index - 1)
    let sort = req.params.sort
    let sql = `SELECT * FROM bolgdetail where sort = '${sort}' order by id desc limit ${index}, 6 `
    await db.query(sql, (err, result) => {
        if (err) {
            return res.status('422').send({
                status: 0, message: "查询失败", errmessage: err.message
            });
        } else {
            return res.send({
                status: 200, message: "查询成功", sortinfo: result
            })
        }
    })
}

exports.getdateindexs = async (req, res) => {
    let index = 6 * (req.params.index - 1)
    let sql = `SELECT date,title,vicetitle FROM bolgdetail order by id desc limit ${index}, 6;  `
    await db.query(sql, (err, result) => {
        if (err) {
            return res.status('422').send({
                status: 0, message: "查询失败", errmessage: err.message
            });
        } else {
            return res.send({
                status: 200, message: "查询成功", sortinfo: result
            })
        }
    })
}
exports.deleteBlog = async (req, res) => {
    let id = req.body.id
    let sql = `delete FROM bolgdetail where id = ${id}`
    await db.query(sql, (err, result) => {
        if (err) {
            return res.status('422').send({
                status: 0, message: "删除失败", errmessage: err.message
            });
        } else {
            return res.send({
                status: 200, message: "删除成功", sortinfo: result
            })
        }
    })

}