import Todo from "../../model/Todo.js";

export const getTodayReport = async (req, res) => {
  try {
    const today = new Date();

    const start = new Date(today);
    start.setHours(0, 0, 0, 0);

    const end = new Date(today);
    end.setHours(23, 59, 59, 999);

    const tasks = await Todo.find({
      createdAt: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    );

    const pendingTasks = tasks.filter(
      (task) => task.status !== "Completed"
    );

    const totalTasks = tasks.length;
    const completedCount = completedTasks.length;
    const pendingCount = pendingTasks.length;

    const completionPercentage =
      totalTasks === 0
        ? 0
        : Math.round((completedCount / totalTasks) * 100);

    res.json({
      totalTasks,
      completedCount,
      pendingCount,
      completionPercentage,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate today report",
      error: error.message,
    });
  }
};