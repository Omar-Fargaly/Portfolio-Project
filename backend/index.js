const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors());

const config= {
    user:"test",
    password:"1234",
    server:"YOUSSEF",
    database:"MshLinkedin",
    options:{
        trustServerCertificate:true,
        trustedConnection:false,
        enableArithAbort:true,
        instancename:"MSSQLSERVER",
    },
    port:1433
}


app.use(express.json());
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

app.use(express.json());
app.post('/users/profile', async (req, res) => {
    const { Userid } = req.body;

    if (!Userid) {
        return res.status(400).json({ message: 'no userid is found.' });
    }

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('User_id', sql.VarChar, Userid)
            .query('SELECT * FROM users WHERE User_id = @User_id');

        if (result.recordset.length > 0) {
            const newUserId = result.recordset[0].User_id;
            return res.status(201).json({
                message: 'Userdata returned successfull',
                data: result.recordset[0]
            });
        } else {
            // No user found, deny access
            res.status(401).json({ message: 'can not find user' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.use(express.json());
app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and Password are required.' });
    }

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, password)
            .query('SELECT * FROM users WHERE Email = @Email AND Password = @Password');

        if (result.recordset.length > 0) {
            const newUserId = result.recordset[0].User_id;
            return res.status(201).json({
                message: 'Login successfull',
                userId: newUserId
            });
        } else {
            // No user found, deny access
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/posts/select', async(req,res)=>{
    try {
    const pool= await sql.connect(config);
    const data= pool.request().query('SELECT Posts.*, Users.First_Name, Users.Last_Name, Users.uimg_url FROM posts JOIN Users ON Posts.User_id=Users.User_id;');
    data.then(result=>{
        return res.json(result.recordset);
    })
}
catch(err) {
    console.log(err);
}});

// insert into users using form.
app.use(express.json())
app.post('/users/insert', async (req, res) => {
    const { First_Name, Last_Name, Email, Password } = req.body;
    if (!First_Name || !Last_Name || !Email || !Password) {
        return res.status(400).json({ message: 'Name and Email and Password are required.' });
    }
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('First_Name', sql.VarChar, First_Name)
            .input('Last_Name', sql.VarChar, Last_Name)
            .input('Email', sql.VarChar, Email)
            .input('Password', sql.VarChar, Password)
            .query('INSERT INTO users (First_Name, Last_Name, Email, Password, uimg_url) ' +
                'VALUES (@First_Name, @Last_Name, @Email, @Password, ' + "'../imgs/profile/Dummy.jpg'" +'); ' +
                'SELECT SCOPE_IDENTITY() AS User_id');
        const newUserId = result.recordset[0].User_id;
        return res.status(201).json({
            message: 'User added successfully',
            userId: newUserId
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error inserting user' });
    }
});

app.use(express.json());
app.post('/users/pull', async (req, res) => {
    const {User_id} = req.body;

    if (!User_id) {
        return res.status(400).json({ message: 'invalid profileid' });
    }

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('User_id', sql.VarChar, User_id)
            .query('SELECT * FROM users WHERE User_id = @User_id');
        return res.json(result.recordset);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
});

app.use(express.json())
app.post('/posts/insert', async (req, res) => {
    const { Content, img_url, User_id} = req.body;
    if (!Content || !img_url|| !User_id) {
        return res.status(400).json({ message: ' content and img and user_id are required.' });
    }
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Content', sql.VarChar, Content)
            .input('img_url', sql.VarChar, img_url)
            .input('User_id', sql.Int, User_id)
            .query('INSERT INTO posts (Content, img_url,User_id ,title) ' +
                'VALUES (@Content, @img_url, @User_id, ' + "'This is a post that got inserted'"+');')
        return res.status(201).json({
            message: 'Post added successfully',
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error inserting Post' });
    }
});

app.get('/', (req,res)=> {
    return res.json('Hello backend is working')});
app.listen(port, ()=>{
    console.log('server has started');
});
