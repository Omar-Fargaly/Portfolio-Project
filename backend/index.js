const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors());

const config= {
    user:"test",
    password:"1234",
    server:"DESKTOP-1O1MV4M",
    database:"MshLinkedin",
    options:{
        trustServerCertificate:true,
        trustedConnection:false,
        enableArithAbort:true,
        instancename:"MSSQLSERVER",
    },
    port:1433
}

app.get('/users/select', async(req,res)=>{
    try {
    const pool= await sql.connect(config);
    const data= pool.request().query('select * from users');
    data.then(result=>{
        return res.json(result.recordset);
    })
}
catch(err) {
    console.log(err);
}
});

app.get('/posts/select', async(req,res)=>{
    try {
    const pool= await sql.connect(config);
    const data= pool.request().query('select * from posts');
    data.then(result=>{
        return res.json(result.recordset);
    })
}
catch(err) {
    console.log(err);
}});

app.post('/users/insert', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name and Email and Password are required.' });
    }
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('First_Name', sql.VarChar, name)
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, password)
            .query('INSERT INTO users (name, email, password) VALUES (@name, @email, @password)');
        return res.status(201).json({ message: 'User added successfully', rowsAffected: result.rowsAffected });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error inserting user' });
    }
});
app.get('/', (req,res)=> {
    return res.json('Hello back end is working')});
app.listen(port, ()=>{
    console.log('server has started');
});