import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import app from "../index.js";

export const getPosts = async (req, res) => {
  try {
    const maxToShow = 6;
    const more  = parseInt(req.params.more);
    const totalMessages = await PostMessage.count();
    const postMessages = await PostMessage.find().sort({ $natural: -1 }).limit(maxToShow*more);
    res.status(200).json({ data: postMessages, numberOfPages: Math.ceil(totalMessages / maxToShow)});
    return;
  } catch (error) {
    res.status(404).json({ message: error.message });
    return;
  }
};

export const getPostsTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const postMessages = await PostMessage.find({tags: tag});
    res.status(200).json(postMessages.reverse());
    return;
  } catch (error) {
    res.status(404).json({ message: error.message });
    return;
  }
};

export const getPostsSearch = async (req, res) => {
  const { search } = req.params;
  try {  
    const postMessages = await PostMessage.aggregate([{
      '$search': {
        'index': 'search in postmessages',
        'text': {
          'query': search,
          'path': {
            'wildcard': '*'
          }
        }
      }
     } ])
    res.status(200).json(postMessages.reverse());
    return;
  } catch (error) {
    res.status(404).json({ message: error.message });
    return;
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  let io = app.get("io");
  try {
    await newPostMessage.save()
    const tags = newPostMessage.tags;
    const notificationToSend = { name:newPostMessage.name, title:newPostMessage.title, tags:newPostMessage.tags, id:newPostMessage._id}
    tags.forEach(tag => {io.to(tag).emit("newPost", notificationToSend);
  });
    res.status(201).json(newPostMessage);
    return;
  } catch (error) {
    res.status(409).json({ message: error.message });
    return;
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id - update");
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { ...post, id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
  return;
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  const updatedPost = await PostMessage.findByIdAndRemove(id);
  res.json({ message: " Post deleted succesfully" });
  return;
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "User not authenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with that id: ${id}`);
  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
  return;
};


