import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";

export const getLastPostsNotifications = async (req, res) => {
  try {
    const lastAccess = req.body;
    const user = await User.findOne({ _id: lastAccess.user });
    const today = new Date().toISOString();
    const notificationsPostMessages = await PostMessage.find({
      tags: { $in: user.tags },
      createdAt: { $gte: lastAccess.createdAt, $lt: today },
    });
    if (
      notificationsPostMessages === null ||
      notificationsPostMessages.lenght === 0
    ) {
      res.status(200).json([]);
      return;
    } else {
      const newPosts = notificationsPostMessages.map((n) => ({
        name: n.name,
        title: n.title,
        tags: n.tags,
        id: n._id,
      }));
      res.status(200).json({ data: newPosts });
      return;
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    return;
  }
};
