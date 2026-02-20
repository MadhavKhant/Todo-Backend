import cron from "node-cron";
import Todo from "../model/Todo.js";
import DailyTask from "../model/DailyTask.js";

const startDailyReportJob = () => {
  cron.schedule("59 23 * * *", async () => {
    try {
      const today = new Date();

      const start = new Date(today);
      start.setHours(0, 0, 0, 0);

      const end = new Date(today);
      end.setHours(23, 59, 59, 999);

      const tasks = await Todo.find({
        createdAt: { $gte: start, $lte: end },
      });

      const completedTasks = [];
      const pendingTasks = [];

      tasks.forEach((task) => {
        if (task.status === "Completed") {
          completedTasks.push({
            taskId: task._id,
            title: task.title,
            description: task.description,
          });
        } else {
          pendingTasks.push({
            taskId: task._id,
            title: task.title,
            description: task.description,
          });
        }
      });

      const totalTasks = tasks.length;
      const completedCount = completedTasks.length;
      const pendingCount = pendingTasks.length;

      const completionPercentage =
        totalTasks === 0
          ? 0
          : (completedCount / totalTasks) * 100;

      await DailyTask.findOneAndUpdate(
        { date: start },
        {
          date: start,
          completedTasks,
          pendingTasks,
          totalTasks,
          completedCount,
          pendingCount,
          completionPercentage,
        },
        { upsert: true }
      );

      console.log("Daily report generated");
    } catch (error) {
      console.error("Cron job error:", error);
    }
  });
};

export default startDailyReportJob;