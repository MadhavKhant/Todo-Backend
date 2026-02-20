import Todo from "../../model/Todo.js";

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({
      message: "Todo deleted",
      deletedTodo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};