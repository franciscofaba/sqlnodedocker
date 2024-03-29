import {pool} from '../db.js'


export const getAlumno = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM Alumno')
        res.json(rows)

    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    }
    
}

export const getAlumnoById = async (req,res) => {
    try{
        console.log([req.params.idAlumno])
        const [rows] = await pool.query('SELECT * FROM alumno WHERE idAlumno = ?', [req.params.idAlumno])
        if (rows.length <= 0 ) return res.status(404).json({
            message:'no se encontro envio'
        })
        res.json(rows[0])
    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    }   
}

export const createAlumno = async (req, res) => {
    try {
        const { idAlumno,idCarrera_fk,nombreAlumno,mail } = req.body;
        const [rows] = await pool.query('INSERT INTO `BBD_CRM`.`Alumno` (`idAlumno`, `idCarrera_fk`, `nombreAlumno`, `mail`) VALUES (?,?,?,?)', [idAlumno,idCarrera_fk,nombreAlumno,mail]);
        res.status(201).json({
            id: rows.insertId,
            idAlumno,
            idCarrera_fk,
            nombreAlumno,
            mail
        });
    } catch(error) {
        console.error('Error al insertar el alumno:', error);
        return res.status(500).json({
            message: 'ERROR: algo salió mal'
        });
    }
};

export const updateAlumno = async (req, res) => {
    try {
        const { idAlumno} = req.params;
        const {idCarrera_fk, nombreAlumno, mail} = req.body;
        await pool.query('SET FOREIGN_KEY_CHECKS=0');
        const [result] = await pool.query('UPDATE alumno SET idAlumno = IFNULL(?, idAlumno), idCarrera_fk = IFNULL(?, idCarrera_fk), nombreAlumno = IFNULL(?, nombreAlumno)  , mail= IFNULL(?, mail) WHERE idAlumno = ?', [idAlumno,idCarrera_fk,nombreAlumno,mail]);

        console.log(result);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'No se encontró el envío'
            });
        }

        const [rows] = await pool.query('SELECT * FROM alumno WHERE idAlumno = ?', [idAlumno]);
        await pool.query('SET FOREIGN_KEY_CHECKS=1');
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'ERROR: algo salió mal'
        });
    }
}


export const deleteAlumno = async (req,res) => {
    try{
        console.log([req.params.idAlumno])
        const [result]= await pool.query('DELETE FROM Alumno WHERE idAlumno= ?', [req.params.idAlumno])
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