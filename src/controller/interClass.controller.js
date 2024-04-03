import {pool} from '../db.js'


export const getinterClass = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM interClass')
        res.json(rows)

    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    }
    
}