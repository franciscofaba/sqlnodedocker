import {pool} from '../db.js'


export const getStudent = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM Student')
        res.json(rows)

    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    }
    
}

export const getStudentById = async (req,res) => {
    try{
        console.log([req.params.idStudent])
        const [rows] = await pool.query('SELECT * FROM Student WHERE idStudent = ?', [req.params.idStudent])
        if (rows.length <= 0 ) return res.status(404).json({
            message:'ERROR: Student not found'
        })
        res.json(rows[0])
    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    }   
}

export const createStudent = async (req, res) => {
    try {
        const { idStudent, idCareer_fk, studentName, email, password} = req.body;

        // Inicia la transacción
        await pool.query('START TRANSACTION;');

        // Inserta en la tabla Student
        const [studentRows] = await pool.query('INSERT INTO `BBD_CRM`.`Student` (`idStudent`, `idCareer_fk`, `studentName`, `email`) VALUES (?, ?, ?, ?);', [idStudent, idCareer_fk, studentName, email]);

        // Inserta en la tabla login
        const [loginRows] = await pool.query('INSERT INTO `BBD_CRM`.`login` (`email`, `password`, `idStudent_fk`) VALUES (?, ?, ?);', [email, password, idStudent]);

        // Confirma la transacción
        await pool.query('COMMIT;');


        res.status(201).json({
            id: studentRows.insertId,
            idStudent,
            idCareer_fk,
            studentName,
            email,
            password,
            idStudent_fk: idStudent
        });
    } catch (error) {
        console.error('Error al insertar el Student:', error);
        // Revierte la transacción si hay un error
        await pool.query('ROLLBACK;');
        return res.status(500).json({
            message: 'ERROR: Algo salió mal'
        });
    }
};


export const updateStudent = async (req, res) => {
    try {
        const idStudent = req.params.idStudent; // Suponiendo que el ID del estudiante está en los parámetros de la solicitud
        const { idCareer_fk, studentName, email, password} = req.body;

        // Verificar si se está actualizando el correo electrónico
        const updatingEmail = req.body.email !== undefined;
        console.log(idStudent)
        // Inicia la transacción
        await pool.query('START TRANSACTION;');
        // Actualiza los datos del estudiante en la tabla Student
        const studentQuery = 'UPDATE `BBD_CRM`.`Student` SET  `idCareer_fk` = IFNULL(?, `idCareer_fk`), `studentName` = IFNULL(?, `studentName`), `email` = IFNULL(?, `email`) WHERE `idStudent` = ?;';

        // Si se está actualizando el correo electrónico, también actualizar en la tabla login
        await pool.query(studentQuery, [idCareer_fk, studentName, email, idStudent]);

        // Si se está actualizando el correo electrónico, también actualizar en la tabla login
        if (updatingEmail) {
            const loginQuery = 'UPDATE `BBD_CRM`.`login` SET `email` = ? WHERE `idStudent_fk` = ?;';
            await pool.query(loginQuery, [email, idStudent]);
        }

        // Confirma la transacción

        
        await pool.query('COMMIT;');

        res.status(200).json({
            id: idStudent,
            idCareer_fk,
            studentName,
            email,
            password,
            idStudent_fk: idStudent
        });
    } catch (error) {
        console.error('Error al actualizar el Student:', error);
        // Revierte la transacción si hay un error
        await pool.query('ROLLBACK;');
        return res.status(500).json({
            message: 'ERROR: Algo salió mal'
        });
    }
};





export const deleteStudent = async (req,res) => {
    try{
        console.log([req.params.idStudent])
        const [result]= await pool.query('DELETE FROM Student WHERE idStudent= ?', [req.params.idStudent])
        if (result.affectedRows <= 0 ) return res.status(404).json({
            message:'no se encontro envio'
        })
        console.log(result)
    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    } 
}