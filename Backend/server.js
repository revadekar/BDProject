const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./config/database');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});

app.get('/getRoles',(req,res)=>{
  const query='select * from roles';
  db.query(query,(err,result)=>{
    if (err) {
      console.error('Error getting roles: ' + err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Send the results back to the client as JSON
      res.status(200).json(result);
      console.log(result);
    }
  })
})
app.post('/register', (req, res) => {
  // Parse the request body to retrieve 'name' and 'pass'
  //console.log('this is register page');
  const { name,username, pass,roleId } = req.body;
  
  const saltRounds = 10;

  // Hash the password
  bcrypt.hash(pass, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error in password hashing:', err);
      res.status(500).send('Error in password hashing');
    } else {
      const newUser = {
        Name: name,
        user_name: username,
        password: hash,
        role_id:roleId,
        // Add other user data as needed
      };
      
      // Insert the user into the database
      db.query('INSERT INTO users SET ?', newUser, (dbErr, result) => {
        if (dbErr) {
          console.error('Error inserting data:', dbErr);
          res.status(500).send('Error inserting data');
        } else {
          console.log('Data inserted:', result);
          res.status(200).send('Data inserted successfully');
        }
      });
    }
  });
});

app.post('/login', (req, res) => {
  // Parse the request body to retrieve 'name' and 'pass'
  const { username, password } = req.body;
console.log('username: ', username,'password:',password);
  // Retrieve the hashed password from your MySQL database (use your database query)
  db.query('SELECT password FROM users WHERE user_name = ?', [username], (dbErr, dbResult) => {
    if (dbErr) {
      console.error('Error querying database:', dbErr);
      res.status(500).send('Error querying database');
    } else if (dbResult.length === 0) {
      res.status(401).send('User not found');
    } else {
      const hashedPasswordFromDatabase = dbResult[0].password;
      
      // Compare the entered password with the stored hash
      bcrypt.compare(password, hashedPasswordFromDatabase, (bcryptErr, result) => {
        if (bcryptErr) {
          console.error('Error comparing passwords:', bcryptErr);
          res.status(500).send('Error comparing passwords');
        } else if (result === true) {
          res.status(200).send('Login successful');
        //  localStorage.setItem("ActiveUser",)
        } else {
          res.status(401).send('Login failed');
        }
      });
    }
  });
});

// Create an API endpoint to get customer data
app.get('/getCustomers', (req, res) => {
  const query = 'SELECT * FROM customer_detail order by Cust_name';
  
  // Execute the database query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing the query: ' + err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Send the results back to the client as JSON
      res.json(results);
      //console.log(results);
    }
  });
});
app.post('/addCustomer', (req, res) => {
  const { Cust_name, Address, City, State, Country } = req.body;

  // Validate the data here if needed

  const query = `INSERT INTO customer_detail (Cust_name, Address, City, State, Country)
                 VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [Cust_name, Address, City, State, Country], (err, result) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error inserting data' });
    } else {
      console.log('Customer Data inserted successfully');
      res.status(201).json({ message: 'Customer Data inserted successfully' });
    }
  });
});
app.post('/addContact', (req, res) => {
  const { contact_person, Designation, Email_id, Mobile, Landline,Fax, Cust_id } = req.body;

  // Validate the data here if needed

  const query = `INSERT INTO contact_details (contact_person, Designation, Email_id, Mobile, Landline,Fax, Cust_id)
                 VALUES (?, ?, ?, ?, ?,?,?)`;

  db.query(query, [contact_person, Designation, Email_id, Mobile, Landline,Fax, Cust_id], (err, result) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Unable to add contact details', details: err.message });
    } else {
      console.log('Contact Details inserted successfully');
      res.status(201).json({ message: 'Contact Details inserted successfully' });
    }
  });
});
app.post('/getContactDetails',(req,res)=>{
  const{selectedCustomer}=req.body;
  console.log('selected customer',selectedCustomer);
  const Cust_name=selectedCustomer;
  const query=`SELECT * FROM contact_detail where Cust_name=?`


  db.query(query, [Cust_name], (err, result) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error receiving data' });
    } else {
      console.log('Contact Details received successfully');
      console.log(result);
      res.status(201).json(result);
    }
  });
})

app.post('/getUserProfile',(req,res)=>{
  const {ActiveUser} =req.body;
  const User=ActiveUser;
  console.log('AciveUser',User);
  const query=`SELECT * FROM profile where user_name= ?`
  db.query(query,[User],(err,result)=>{
    if(err){
      console.error('Error:', err);
      res.status(500).json({ error: 'Error receiving data' });
    }else{
      console.log('User Details received successfully');
      console.log(result);
      res.status(201).json(result);
    }

  });
})

app.get('/getUsers',(req,res)=>{
  const query=`SELECT * FROM profile`
  db.query(query,(err,result)=>{
    if(err){
      console.error('Error:', err);
      res.status(500).json({ error: 'Error receiving data' });
    }else{
      console.log('Users received successfully');
      console.log(result);
      res.status(201).json(result);
    }

  });
})

app.post('/editContact', (req, res) => {
  const { contact_person, Designation, Email_id, Mobile, Landline,Fax, contact_id } = req.body;

  // Validate the data here if needed

  const query = `update contact_details
  set contact_person=?,designation=?,Email_id=?,mobile=?, landline=?,fax=? where contact_id=?`;

  db.query(query, [contact_person, Designation, Email_id, Mobile, Landline,Fax, contact_id], (err, result) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error updating data' });
    } else {
      console.log('Contact Details updated successfully');
      res.status(201).json({ message: 'Contact Details updated successfully' });
    }
  });
});

app.delete('/deleteContact', (req, res) => {
  const { contact_id } = req.body;
  console.log(contact_id);
  const query = 'DELETE FROM contact_details WHERE contact_id = ?';

  db.query(query, contact_id, (err, result) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error deleting data', message: err.message });
    } else {
      console.log('Contact Details deleted successfully');
      res.status(201).json({ message: 'Contact Details deleted successfully' });
    }
  });
});


app.post('/editUser', (req, res) => {
  const { user_id, changedRoleId } = req.body;
  console.log('user_id', user_id);
  console.log('changedRoleId', changedRoleId);
  const query=`update users set role_id=? where user_id=?`
  db.query(query,[changedRoleId,user_id],(err,result)=>{
    if(err){
      console.error('Error:', err);
      res.status(500).json({ error: 'Error editing user' });
    } else {
      console.log(result);
      console.log('user Details edited successfully');
      res.status(201).json({ message: 'user Details edited successfully' });
    }
  })
});
app.post('/deleteUser',(req,res)=>{
  const {user_id}=req.body;
  console.log('deletingUserId',user_id);
  const query=`delete from users where user_id=?`
  db.query(query,[user_id],(err,result)=>{
    if(err){
      console.error('Error',err);
      res.status(500).json({error:'Error deleting user'});
    }else{
      console.log(result);
      console.log('User deleted successfully');
      res.status(201).json({message:'User deleted successfully'})
    }
  })
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
