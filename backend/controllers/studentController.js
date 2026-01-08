const db = require("../config/db");

exports.getAllStudents = async (req, res) => {
  const { page = 1, limit = 10, search = "", course_id } = req.query;
  const offset = (page - 1) * limit;

  try {
    let query = `
      SELECT s.*, c.name as course_name 
      FROM students s 
      LEFT JOIN courses c ON s.course_id = c.id 
      WHERE (s.name LIKE ? OR s.email LIKE ?)
    `;
    const params = [`%${search}%`, `%${search}%`];

    if (course_id) {
      query += " AND s.course_id = ?";
      params.push(course_id);
    }

    query += " ORDER BY s.created_at DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await db.query(query, params);

    // Total count for pagination
    let countQuery =
      "SELECT COUNT(*) as total FROM students WHERE (name LIKE ? OR email LIKE ?)";
    const countParams = [`%${search}%`, `%${search}%`];
    if (course_id) {
      countQuery += " AND course_id = ?";
      countParams.push(course_id);
    }
    const [countResult] = await db.query(countQuery, countParams);

    res.json({
      data: rows,
      pagination: {
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(countResult[0].total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT s.*, c.name as course_name FROM students s LEFT JOIN courses c ON s.course_id = c.id WHERE s.id = ?",
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Student not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addStudent = async (req, res) => {
  const { name, email, age, course_id } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO students (name, email, age, course_id) VALUES (?, ?, ?, ?)",
      [name, email, age, course_id]
    );
    res.status(201).json({
      success: true,
      data: { id: result.insertId, name, email, age, course_id },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, age, course_id } = req.body;
  try {
    await db.query(
      "UPDATE students SET name = ?, email = ?, age = ?, course_id = ? WHERE id = ?",
      [name, email, age, course_id, id]
    );
    res.json({ success: true, message: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM students WHERE id = ?", [id]);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
