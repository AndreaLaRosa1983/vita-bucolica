
import PostMessage from "../models/postMessage.js";

export const getLastPostsNotifications = async (req, res) => {
  try {
    const user = req.body;
    const tags = user.result.tags;
    const lastConnection = user.lastConnection[0].createdAt;
    const today = new Date().toISOString();
    const notificationsPostMessages = await PostMessage.find({ tags: {$in :tags},  createdAt:{$gte:lastConnection,$lt:today} });
    if(notificationsPostMessages === null  || notificationsPostMessages.lenght === 0 ){
      res.status(200).json([])
      return
    } else {
    const newPosts = notificationsPostMessages.map(n => ({ name:n.name, title:n.title, tags:n.tags, id:n._id}));
    res.status(200).json(newPosts);
    return; }
  } catch (error) {
    res.status(404).json({ message: error.message });
    return;
  }
};