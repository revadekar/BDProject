const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./config/database');
const cors = require('cors');
const app = express();
const path = require('path');
const fs=require('fs');
const multer = require('multer');

// Serve static files
app.use('/files', express.static(process.env.uploads));
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder where files will be saved
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Maintain the original file name
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
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




app.post('/getStates',(req,res)=>{
  const {country_name}=req.body;
  console.log('country_name',country_name);
  const query='select*from states where country_name=? order by name '
  db.query(query,[country_name],(err,result)=>{
    if(err){
      console.error('error getting states',err.message);
      res.status(500).json({error:'unable to get states'})
    }else{
      console.log('States received successfully');
      res.json(result);
    }
  })
})




app.post('/getCities',(req,res)=>{
  const {state_name}=req.body;
  console.log('state_name',state_name);
  const query='select*from cities where state_name=?'
  db.query(query,[state_name],(err,result)=>{
    if(err){
      console.error('error getting states',err.message);
      res.status(500).json({error:'unable to get cities'})
    }else{
      console.log('Cities received successfully');
      res.json(result);
    }
  })
})




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
  const { Cust_name, Address, City_name, State, Country,Website } = req.body;

  // Validate the data here if needed

  const query = `INSERT INTO customer_detail (Cust_name, Address, City_name, State, Country,Website)
                 VALUES (?, ?, ?, ?, ?,?)`;

  db.query(query, [Cust_name, Address, City_name, State, Country,Website], (err, result) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error inserting data' });
    } else {
      console.log('Customer Data inserted successfully');
      res.status(201).json({ message: 'Customer Data inserted successfully' });
    }
  });
});




app.post('/editCustomer', (req, res) => {
  const { updatedCustomerData } = req.body;
  const { Cust_id, ...customerDetails } = updatedCustomerData;

  const query = `UPDATE customer_detail SET ? WHERE Cust_id = ?`;

  db.query(query, [customerDetails, Cust_id], (err, result) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error editing customer', message: err.message });
    } else {
      console.log('Customer Details updated successfully', result);
      res.status(201).json({ message: 'Customer Details updated successfully' });
    }
  });
});




// Endpoint to delete customers by IDs
app.delete('/deleteCustomers', (req, res) => {
  const { ids } = req.body;
  const query = 'DELETE FROM customer_detail WHERE Cust_id IN (?)'; // Use a single placeholder for the array

  db.query(query, [ids], (err, result) => { // Wrap 'ids' in an array to pass it as a single value
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error deleting customers', message: err.message });
    } else {
      console.log({'Customer Details deleted successfully':result,DeletedCustomers:ids});
      res.status(201).json({ message: 'Customers Details deleted successfully' });
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
      //console.log(result);
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
      //console.log(result);
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
      //console.log(result);
      res.status(201).json(result);
    }

  });
})



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




app.get('/getGroups',(req,res)=>{
  const query='select * from group_details order by Group_Name';
  db.query(query,(error,result)=>{
    if(error){
      console.error('Error',error);
      res.status(500).json({error:'Error getting Groups'});
    }else
    {
      //console.log(result);
      console.log('Group details fetched successfully');
      res.status(201).json(result);
    }
  })
})

app.get('/getLocation',(req,res)=>{
  const query='select * from Locations';
  db.query(query,(error,result)=>{
    if(error){
      console.error('Error',error);
      res.status(500).json({error:'Error getting Location'});
    }else
    {
      //console.log(result);
      console.log('Location fetched successfully');
      res.status(201).json(result);
    }
  })
})


app.get('/getDesignation',(req,res)=>{
  const query='select * from designation';
  db.query(query,(error,result)=>{
    if(error){
      console.error('Error',error);
      res.status(500).json({error:'Error getting designations'});
    }else
    {
      //console.log(result);
      console.log('designation details fetched successfully');
      res.status(201).json(result);
    }
  })
})




app.post('/addEmployee',(req,res)=>{
  const { Group_id,Employee_Name,Designation,Email,Mobile,Office_landline,Location } = req.body;
console.log(req.body);
  const query = `INSERT INTO employee_details (Group_id,Employee_Name, Desig_Code, Email,Office_landline, Mobile, Location)
                 VALUES (?, ?, ?, ?, ?,?,?)`;

                 db.query(query, [Group_id,Employee_Name, Designation, Email,Office_landline, Mobile, Location], (err, result) => {
                  if (err) {
                    console.error('Error:', err);
                    res.status(500).json({ error: 'Unable to add Employee', details: err.message });
                  } else {
                    console.log('Employee Details inserted successfully');
                    res.status(201).json({ message:  'Employee Details inserted successfully' });
                  }
                });
              });





app.get('/getEmployees',(req,res)=>{
  const query='select * from employees';
  db.query(query,(error,result)=>{
    if(error){
      console.error('Error',error);
      res.status(500).json({error:'Error getting Employees'});
    }else
    {
      //console.log(result);
      console.log('Employees details fetched successfully');
      res.status(201).json(result);
    }
  })
})




app.post('/editEmployee', (req, res) => {
  const { Emp_id,Employee_Name,desig_code, Email, Mobile,Office_landline,Location, Group_id} = req.body;

  // Validate the data here if needed

  const query = `update employee_details
  set Employee_Name=?,Desig_Code=?,Email=?,mobile=?, Office_landline=?,Location=?,Group_id=? where Emp_id=?`;

  db.query(query, [ Employee_Name,desig_code, Email, Mobile, Office_landline,Location,Group_id, Emp_id], (err, result) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error updating data' });
    } else {
      console.log('employee Details updated successfully');
      res.status(201).json({ message: 'employee Details updated successfully' });
    }
  });
});




app.post('/deleteEmployee',(req,res)=>{
  const {Emp_id}=req.body;
  console.log('deletingEmployeeId',Emp_id);
  const query=`delete from employee_details where Emp_id=?`
  db.query(query,[Emp_id],(err,result)=>{
    if(err){
      console.error('Error',err);
      res.status(500).json({error:'Error deleting Employee'});
    }else{
      console.log(result);
      console.log('Employee deleted successfully');
      res.status(201).json({message:'Employee deleted successfully'})
    }
  })
})




app.get('/getProjects',(req,res)=>{
  const query='select * from projects';
  db.query(query,(error,result)=>{
    if(error){
      console.error('Error',error);
      res.status(500).json({error:'Error getting Projects'});
    }else
    {
     // console.log(result);
      console.log('Project details fetched successfully');
      res.status(201).json(result);
    }
  })
})




// Route to serve documents based on database path
app.get('/getDocument/:filename', (req, res) => {
  const filename = req.params.filename;

  // Check if the file exists
  const filePath = path.join('C:/Users/shilpa/Documents/project', filename);
  if (fs.existsSync(filePath)) {
    // Send the file if it exists
    console.log('file received');
    res.sendFile(filePath);
  } else {
    // Respond with a message if the file does not exist
    res.status(404).send('File not found');
    console.log('File not found');
  }
});



app.get('/getStatus',(req,res)=>{
  const query ='select * from status order by status_name';
  db.query(query,(err,result)=>{
    if(err){
      console.error('Error', err);
      res.status(500).json({error:'Error getting Status'});
    }else{
      //console.log(result);
      console.log('Status details fetched successfully');
      res.status(201).json(result);
    }
  })
})




app.post('/getEmployeesByGroupId',(req,res)=>{
  const {group_id}=req.body;
  const query ='select*from employee_details where Group_id=?';

  db.query(query,[group_id],(err,result)=>{
    if(err){
      console.error('Error', err);
      res.status(500).json({error:'Error getting employees'});
    }else{
      //console.log(result);
      console.log('Employees details fetched successfully');
      res.status(201).json(result);
    }
  })
})



app.get('/getCategories',(req,res)=>{
  const query ='select*from category_details order by Catgory_name';
  db.query(query,(err,result)=>{
    if(err){
      console.error('Error', err);
      res.status(500).json({error:'Error getting Categories'});
    }else{
      // console.log(result);
      console.log('Category details fetched successfully');
      res.status(201).json(result);
    }
  })
})



app.post('/editProject', (req, res) => {
  const {status_id,Project_id} = req.body;
 console.log('updatedProjectData',status_id);
  // Validate the data here if needed

  const query = `update project_detail set status_id=? where Project_id=?`;

  db.query(query, [status_id, Project_id], (err, result) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error updating data' });
    } else {
      console.log('Project Details updated successfully');
      res.status(201).json({ message: 'Project Details updated successfully' });
    }
  });
});

app.post('/uploadDocument',(req, res)=>{
  console.log('in the uploadDocument');

  const {projectDocument, filePath, id} = req.body;
  const query = `update project_detail SET project_document= ? where Project_id=?`;

    if (filePath) {

      db.query(query, [projectDocument, id], (err,result)=>{
        if(err){
          console.error('Error',err);
          return res.status(500).json({error : 'Error inserting data', details: err.message })
        }
          console.log('Document added successfully in database');
      })


      const targetDir = process.env.uploads;
      const fileName = path.basename(filePath);

      const targetPath = path.join(targetDir, fileName);

      // Copy the file to the target directory
    // Inside your file upload endpoint
// ... (other code remains the same)

fs.copyFile(filePath, targetPath, (err) => {
  if (err) {
      console.error('Error copying file:', err);
      console.log('Error uploading the file.');
      return res.status(400).json({ message: 'File copy failed' }); // Use 400 for client-side issues
  }

  // Delete the original file after successful copy
  fs.unlink(filePath, (err) => {
      if (err) {
          console.error('Error deleting original file:', err);
          // You may choose to handle this error differently
      }

      console.log('File moved to permanent directory.');
      // If everything succeeded
      db.query(query, [projectDocument, id], (err, result) => {
          if (err) {
              console.error('Error', err);
              return res.status(500).json({ error: 'Error inserting data', details: err.message });
          }
          console.log('File uploaded and database updated!');
          res.status(200).json({ message: 'Document uploaded successfully' });
      });
  });
});

    } else {
       return  res.status(500).json({ message: 'File not received on server' });
    }

})

app.post('/addProject', (req, res) => {
  const { newProject, filePath } = req.body;
  console.log('newProject', newProject);

  const query = `INSERT INTO project_detail SET ?`;

  db.query(query, [newProject], (err, result) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Error inserting data', details: err.message });
    }

    console.log('Project Details inserted successfully');

    if (filePath) {
      const targetDir = process.env.uploads;
      const fileName = path.basename(filePath);

      const targetPath = path.join(targetDir, fileName);

      // Copy the file to the target directory
      fs.copyFile(filePath, targetPath, (err) => {
        if (err) {
          console.error('Error copying file:', err);
          return res.status(201).json({ message: 'Project Details inserted successfully but file not uploaded' });
        }

        // Delete the original file after successful copy
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting original file:', err);
            // You may choose to handle this error differently
          }

          console.log('File moved to permanent directory.');
          res.status(201).json({ message: 'Project Details and file uploaded successfully!' });
        });
      });
    } else {
      res.status(201).json({ message: 'Project Details inserted successfully' });
    }
  });
});




// Define a POST endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Get the file path where it's stored
  const filePath = path.join(__dirname, req.file.path); // Get the file path
  console.log('File uploaded successfully!', filePath);

  // Send the file path as part of the response
  res.status(200).send({ message: 'File uploaded successfully!', filePath });
});

app.post('/deleteTempFile', (req, res) => {
  const { filePath } = req.body;
console.log('filePath',filePath);
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist or error accessing it
      return res.status(404).json({ error: 'File not found or inaccessible' });
    }

    // File exists, so delete it
    fs.unlink(filePath, (err) => {
      if (err) {
        // Error occurred while deleting the file
        console.error('Error deleting file:', err);
        return res.status(500).json({ error: 'Error deleting file' });
      }

      // File deleted successfully
      console.log('File deleted successfully' );
      return res.status(200).json({ message: 'File deleted successfully' });
    });
  });
});



// Endpoint to delete projects by IDs
app.delete('/deleteProject', (req, res) => {
  const { ids } = req.body;
  const query = 'DELETE FROM project_detail WHERE Project_id IN (?)'; // Use a single placeholder for the array

  db.query(query, [ids], (err, result) => { // Wrap 'ids' in an array to pass it as a single value
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error deleting projects', message: err.message });
    } else {
      console.log({'Project details deleted successfully':result, DeletedProjects:ids});
      res.status(201).json({ message: 'Project details deleted successfully' });
      }
  });
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
