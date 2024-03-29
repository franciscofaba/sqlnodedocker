import express from 'express'
import indexRoutes from './routes/index.routes.js'
import alumnoRoutes from './routes/alumno.routes.js'
import loginRoutes from './routes/login.routes.js'
const app = express()

app.use(express.json())
app.use(indexRoutes)


app.use('/api',alumnoRoutes)
app.use('/api',loginRoutes)

app.use((res,req,next) =>{
    res.statusCode(404).json({
        message: 'Endpoint not found'
    })
})

export default app;
