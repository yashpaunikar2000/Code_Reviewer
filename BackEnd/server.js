require('dotenv').config()//you can access API key
const app=require('./src/app')
app.listen(8080,()=>{
    console.log('server is runninng on port 8080');
})