import Todo from "../../model/Todo.js";

export const editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    console.log("Received data for update:", data);
    console.log("Todo ID to update:", id);

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({
      message: "Todo updated",
      updatedTodo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};