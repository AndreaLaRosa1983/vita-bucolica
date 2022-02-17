import mongoose from "mongoose";

const connectionLogSchema = mongoose.Schema({
  user: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  log: { type: String, required: true },
});

const ConnectionLog = mongoose.model("ConnectionLog", connectionLogSchema);

export default ConnectionLog;
