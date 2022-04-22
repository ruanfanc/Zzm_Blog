const { createBlog, uploadimg, getblogsinfo, getblogdetail, deleteBlog, getdateindexs, getsortsnum, getlabelsnum, getblogsnum, getsorts, getlabels, getlabelinfo, getsortinfo } = require('../router_handler/blog')
const { Login } = require('../router_handler/user')
const express = require('express');
const multer = require('multer')
const upload = multer({ dest: __dirname + '/../uploads' })
const router = express.Router()


router.post('/blog/uploadimg', upload.single('file'), uploadimg)
router.get('/blog/getblogsinfo/:id', getblogsinfo)
router.get('/blog/getblogdetail/:id', getblogdetail)
router.post('/blog/getsorts', getsortsnum)
router.post('/blog/getlabels', getlabelsnum)
router.post('/blog/getblogsnum', getblogsnum)
router.post('/blog/sort/getsorts', getsorts)
router.post('/blog/sort/getlabels', getlabels)
router.get('/blog/sort/getlabelinfo/:label/:index', getlabelinfo)
router.get('/blog/sort/getsortinfo/:sort/:index', getsortinfo);
router.post('/user/createBlog', createBlog)
router.post('/blog/deleteBlog', deleteBlog)
router.post('/blog/login', Login)
router.get('/blog/getdateindexs/:index', getdateindexs);

module.exports = router
