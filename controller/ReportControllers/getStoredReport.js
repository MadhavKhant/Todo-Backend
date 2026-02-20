import DailyTask from "../../model/DailyTask.js";

export const getStoredReport = async (req, res) => {
  try {
    const { date } = req.query;

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const report = await DailyTask.findOne({ date: start });

    if (!report) {
      return res.status(200).json({
        message: "Report not generated yet",
      });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};