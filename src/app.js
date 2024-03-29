import app from './index.js'
import {PORT,HOST} from './config.js'

// app.listen(PORT)
// console.log('server running on port', PORT)

app.listen(PORT, HOST, () => {
    console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});