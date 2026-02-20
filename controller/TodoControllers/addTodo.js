import Todo from "../../model/Todo.js";

export const addTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const todo = await Todo.create({
      title,
      description,
      status,
    });

    res.status(201).json({
      message: "Todo created",
      todo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};