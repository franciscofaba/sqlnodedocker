import {pool} from '../db.js'


export const getLogin = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM login')
        res.json(rows)

    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    }
    
}

export const getLoginByMail = async (req,res) => {
    try{
        console.log([req.params.idAlumno_fk])
        const [rows] = await pool.query('SELECT * FROM Login WHERE mail = ?', [req.params.mail])
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

export const createLogin = async (req, res) => {
    try {
        const { mail, password, idAlumno_fk} = req.body;
        const [rows] = await pool.query('INSERT INTO `BBD_CRM`.`Login` (`mail`, `password`, `idAlumno_fk`) VALUES (?,?,?)', [mail, password, idAlumno_fk]);
        res.status(201).json({
            id: rows.insertId,
            mail, 
            password, 
            idAlumno_fk
        });
    } catch(error) {
        console.error('Error al insertar el alumno:', error);
        return res.status(500).json({
            message: 'ERROR: algo salió mal'
        });
    }
};

export const updateLogin = async (req, res) => {
    try {
        const { idAlumno_fk} = req.params;
        const {mail, password} = req.body;
        await pool.query('SET FOREIGN_KEY_CHECKS=0');
        const [result] = await pool.query('UPDATE login SET  mail = IFNULL(?, mail), password, = IFNULL(?, password,), idAlumno_fk = IFNULL(?, idAlumno_fk) WHERE idAlumno_fk = ?', [mail, password, idAlumno_fk]);

        console.log(result);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'No se encontró el envío'
            });
        }

        const [rows] = await pool.query('SELECT * FROM login WHERE idAlumno_fk = ?', [idAlumno_fk]);
        await pool.query('SET FOREIGN_KEY_CHECKS=1');
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'ERROR: algo salió mal'
        });
    }
}


export const deleteLogin = async (req,res) => {
    try{
        console.log([req.params.idAlumno_fk])
        const [result]= await pool.query('DELETE FROM login WHERE idAlumno_fk= ?', [req.params.idAlumno_fk])
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