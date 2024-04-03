
import {pool} from '../db.js'

export const getAttendance = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Attendance');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener las carreras:', error.message); // Es útil registrar el mensaje de error real para depuración
        return res.status(500).json({
            message: 'ERROR: something goes wrong'
        });
    }
};