import {pool} from '../db.js'


export const getCourse = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM Course')
        res.json(rows)

    } catch(error) {
        return res.status(500).json({
            message:'ERROR: something goes wrong'
        })
    }
    
}

export const getCourseByCareer = async (req,res) => {
    try{
        console.log([req.params.idStudent_fk])
        const [rows] = await pool.query('SELECT * FROM Course WHERE idCareer_fk = ?', [req.params.Career])
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




