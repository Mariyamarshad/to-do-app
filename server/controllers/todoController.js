const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error("GET /todos failed: ", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

const addTodo = async (req, res) => {
  try {
    const newTodo = new Todo({ text: req.body.text });
  const savedTodo = await newTodo.save();
  res.status(201).json(savedTodo);
  } catch (err) {
    console.error("Post /todos failed:", err.message);
    res.status(500).json({error: "Server Error"})
  }
};

const updateTodo = async (req, res) => {
    try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTodo) {
      console.warn(`PUT /todos/${req.params.id} - Not Found`);
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(`PUT /todos/${req.params.id} failed:`, error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

const deleteTodo = async (req, res) => {
   try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);

    if (!deleted) {
      console.warn(`DELETE /todos/${req.params.id} - Not Found`);
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    console.error(`DELETE /todos/${req.params.id} failed:`, error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
