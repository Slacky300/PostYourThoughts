const router = require('express').Router();

const { getAllPosts, addPost, deletePost, updatePost, getUserPosts } = require('../controllers/postCntrl');
const { validateToken } = require('../middlewares/validateJWTToken');


router.get('/', getAllPosts);

router.post('/add', validateToken, addPost);

router.delete('/delete/:id', validateToken, deletePost);

router.put('/update/:id', validateToken, updatePost);

router.get('/userPosts', validateToken, getUserPosts)

module.exports = router;



