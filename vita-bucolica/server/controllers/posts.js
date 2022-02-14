import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import app from "../index.js";
//multiemit to avoid multiple message at client in the same room (at the moment funtionality is 
//reduced to the max number of preference of a client one for each tipe of article)
const multiEmit = (io,tags,notificationToSend) => {
  console.log(tags);
  console.log(notificationToSend);
  switch(tags.length){
    case 1:
      return io.to(tags[0]).emit("NEWPOST", notificationToSend);
    case 2:
      return io.to(tags[0]).to(tags[1]).emit("NEWPOST", notificationToSend);
    case 3:
      return io.to(tags[0]).to(tags[1]).to(tags[2]).emit("NEWPOST", notificationToSend);
    case 4:
      return io.to(tags[0]).to(tags[1]).to(tags[2]).to(tags[3]).emit("NEWPOST", notificationToSend);
    default:
      return 
  }
}



export const getPosts = async (req, res) => {
  try {
    const maxToShow = 6;
    const page  = parseInt(req.params.page);
    const totalMessages = await PostMessage.count();
    const postMessages = await PostMessage.find().sort({ $natural: -1 }).skip(maxToShow*page).limit(maxToShow);
    res.status(200).json({ data: postMessages, numberOfPages: Math.ceil(totalMessages / maxToShow)});
    return;
  } catch (error) {
    res.status(404).json({ message: error.message });
    return;
  }
};

export const getPostsTag = async (req, res) => {
  const { more, tag } = req.params;
  const maxToShow = 6;
  try {
    const postMessages = await PostMessage.find({tags: tag}).limit(maxToShow*(more));
    const numberOfPosts = await PostMessage.find({tags: tag}).count();
    const numberOfPostsToSee = numberOfPosts - postMessages.length;
    res.status(200).json({data: postMessages.reverse(), numberOfPosts: numberOfPosts, numberOfPostsToSee: numberOfPostsToSee});
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
    const notificationToSend = { name:newPostMessage.name, title:newPostMessage.title, tags:newPostMessage.tags, id:newPostMessage._id};
    console.log("hereOK")
    multiEmit(io, tags, notificationToSend);
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


