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
        console.log([req.params.email])
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





