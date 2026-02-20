import mongoose from "mongoose"

const dailyTaskSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },

    completedTasks: [
      {
        _id: false,
        taskId: mongoose.Schema.Types.ObjectId,
        title: String,
        description: String,
      },
    ],

    pendingTasks: [
      {
        _id: false,
        taskId: mongoose.Schema.Types.ObjectId,
        title: String,
        description: String,
      },
    ],

    totalTasks: Number,
    completedCount: Number,
    pendingCount: Number,
    completionPercentage: Number,
  },
  { timestamps: true }
);

const DailyTask =  new mongoose.model("DailyTask", dailyTaskSchema);
export default DailyTask;
