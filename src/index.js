import express from 'express'
import indexRoutes from './routes/index.routes.js'
import StudentRoutes from './routes/Student.routes.js'
import loginRoutes from './routes/login.routes.js'
import courseRoutes from './routes/course.routes.js'
import careerRoutes from './routes/career.routes.js'

const app = express()




app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Cambia esta URL al origen correcto
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });





app.use(indexRoutes)
app.use('/api',StudentRoutes)
app.use('/api',loginRoutes)
app.use('/api',courseRoutes)
app.use('/api',careerRoutes)




app.use((res,req,next) =>{
    res.statusCode(404).json({
        message: 'Endpoint not found'
    })
})

export default app;
