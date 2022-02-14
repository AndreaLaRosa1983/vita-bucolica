import Log from "../models/log.js";

export const getLastNotificationLog = async (req, res) => {
    try {
        const user = req.params.user;
        const lastLog = await Log.find({ user: user, log: "NOTIFICATIONOK"}).sort({ $natural: -1 }).limit(1);
        res.status(200).json({ data: lastLog});
        return;
      } catch (error) {
        res.status(404).json({ message: error.message });
        return;
      }
};

export const postLog = async (req, res) => {
    const log = req.body;
    const newLog = new Log({
        user: log.user,
        createdAt: new Date().toISOString(),
        log: log.log,
    });
    try {
    await newLog.save()
    res.status(201).json(newLog);
    return;
    } catch (error) {
        res.status(409).json({ message: error.message });
        return;
    }
  };