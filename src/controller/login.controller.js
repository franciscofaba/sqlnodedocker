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

export const getLoginByEmail = async (req,res) => {
    try{
        console.log([req.params.idStudent_fk])
        const [rows] = await pool.query('SELECT * FROM Login WHERE email = ?', [req.params.email])
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



export const updateLogin = async (req, res) => {
    try {
        const { idStudent_fk} = req.params;
        const {email, password} = req.body;
        await pool.query('SET FOREIGN_KEY_CHECKS=0');
        const [result] = await pool.query('UPDATE login SET  email = IFNULL(?, email), password, = IFNULL(?, password,), idStudent_fk = IFNULL(?, idStudent_fk) WHERE idStudent_fk = ?', [email, password, idStudent_fk]);

        console.log(result);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'No se encontró el envío'
            });
        }

        const [rows] = await pool.query('SELECT * FROM login WHERE idStudent_fk = ?', [idStudent_fk]);
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
        console.log([req.params.idStudent_fk])
        const [result]= await pool.query('DELETE FROM login WHERE idStudent_fk= ?', [req.params.idStudent_fk])
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