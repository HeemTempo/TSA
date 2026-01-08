const db = require("../config/db");

exports.getAllCourses = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM courses ORDER BY name ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addCourse = async (req, res) => {
  const { name, code, description } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO courses (name, code, description) VALUES (?, ?, ?)",
      [name, code, description]
    );
    res.status(201).json({
      id: result.insertId,
      name,
      code,
      description,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, code, description } = req.body;
  try {
    await db.query(
      "UPDATE courses SET name = ?, code = ?, description = ? WHERE id = ?",
      [name, code, description, id]
    );
    res.json({ id, name, code, description });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM courses WHERE id = ?", [id]);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
