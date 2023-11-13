const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./config/database');
const cors=require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});

app.post('/register', (req, res) => {
  // Parse the request body to retrieve 'name' and 'pass'
  console.log('this is register page');
  const { name, pass } = req.body;
  
  const saltRounds = 10;

  // Hash the password
  bcrypt.hash(pass, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error in password hashing:', err);
      res.status(500).send('Error in password hashing');
    } else {
      const newUser = {
        user_name: name,
        password: hash,
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
          localStorage.setItem("ActiveUser",)
        } else {
          res.status(401).send('Login failed');
        }
      });
    }
  });
});

// Create an API endpoint to get customer data
app.get('/getCustomers', (req, res) => {
  const query = 'SELECT * FROM customer_detail';
  
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
      res.status(500).json({ error: 'Error inserting data' });
    } else {
      console.log('Contact Details inserted successfully');
      res.status(201).json({ message: 'Contact Details inserted successfully' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
