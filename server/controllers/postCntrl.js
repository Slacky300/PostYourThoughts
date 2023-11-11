const Post = require('../models/postModel');
const User = require('../models/userModel');


const getAllPosts = async (req, res) => {

    try{

    

        const posts = await Post.find({}).populate('author', 'username');

        res.status(200).json({posts});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const getUserPosts = async (req, res) => {

    try{
            
            const posts = await Post.find({author: req.user.id});
    
            res.status(200).json({posts});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const addPost = async (req, res) => {

    try{
        const {title, content} = req.body;

        const post = new Post({
            title,
            content,
            author: req.user.id
        });


        const savedPost = await post.save();

        const user = await User.findById(req.user.id);
        
        user.posts.push(savedPost._id);

        await user.save();

        res.status(200).json({message: 'Post created successfully'});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}


const updatePost = async (req, res) => {

    try{
        const {title, content} = req.body;

        const post = await Post.findById(req.params.id);

        if(!post) return res.status(404).json({message: 'Post does not exist'});

        if(post.author.toString() !== req.user.id) return res.status(400).json({message: 'You are not authorized to update this post'});

        post.title = title;
        post.content = content;

        await post.save();

        res.status(200).json({message: 'Post updated successfully'});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const deletePost = async (req, res) => {

    try{
        const post = await Post.findById(req.params.id);

        if(!post) return res.status(400).json({message: 'Post does not exist'});

        if(post.author.toString() !== req.user.id) return res.status(400).json({message: 'You are not authorized to delete this post'});

        const existingUser = await User.findById(req.user.id);

        existingUser.posts.pull(post._id);

        await existingUser.save();

        await Post.deleteOne({ _id: req.params.id });

        res.status(200).json({message: 'Post deleted successfully'});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {getAllPosts, getUserPosts, addPost, updatePost, deletePost};