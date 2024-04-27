// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
var session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const projectsRouter = require('./router/projectsRouter');
const projectsEvaluationRouter = require('./router/projectsEvaluationRouter');
const supervisorRouter = require('./router/supervisorRouter');
const connectDb = require('./connectDb');     

db = connectDb()

// var MongoDBStore = require('connect-mongodb-session')(session);
// var store = new MongoDBStore({
//     uri: 'mongodb://127.0.0.1:27017/connect_mongodb_session_test',
//     collection: 'mySessions'
//   });
//   store.on('error', function(error) {
//     console.log(error);
//   });
const User = require('./models/user');
const Student = require('./models/student');
const Project=require('./models/project')
var cookieParser= require('cookie-parser');
const student = require('./models/student');
// Create Express app
var app = express();
// app.use(require('express-session')({
//     secret: 'This is a secret',
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
//     },
//     store: store,
//      resave: true,
//     saveUninitialized: true
//   })); s
  
const PORT = process.env.PORT || 8000;

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/myapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));



// Enable CORS for all routes
app.use(express.json())

app.use(cors());
// app.use(cookieParser('keyboard cat'))
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use('/group', projectsRouter);
app.use('/group-evaluation',projectsEvaluationRouter);
app.use('/supervisor',supervisorRouter);
// Configure session middleware
// app.post('/groups',async(req,res)=>{res.send("Hello There")})

app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log('Received login request:', { username, password });
  
      const user = await User.findOne({ username });
      if (!user || user.password !== password) {
        console.log('Login failed: Invalid username or password');
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
    
      console.log('Login successful');
     res.json({ message: 'Login successful' });
   
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }app.use(express.json())
    
  });


 
  app.get('/home', async (req, res) => {
    try {
      // Fetch student data from the database
      const students = await Student.find();
     
      const projects = await Project.find();
    
      return res.json({ students ,projects});
    } catch (err) {
      console.error("Error retrievingdata:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });




  app.put('/student/:id', async (req, res) => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedStudent);
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/student', async (req, res) => {
    try {
      const newStudent = new Student(req.body);
      console.log(newStudent)
      const savedStudent = await newStudent.save();
      res.json(savedStudent);
    } catch (error) {
      console.error('Error adding student:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.delete('/student/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the student by ID and delete it from the database
      await Student.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ error: 'An error occurred while deleting the student' });
    }
  });


  app.get('/project', async (req, res) => {
    try {
      const projects = await Project.find(); // Fetch projects data without populating
      res.json(projects);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  });
  app.post('/project', async (req, res) => {
    try {
      const newProject = new Project(req.body);
      console.log(newProject)
      const savedProject = await newProject.save();
      res.json(savedProject);
    } catch (error) {
      console.error('Error adding project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.put('/project/:id', async (req, res) => {
    const projectId = req.params.id;
    const updatedprojectData = req.body;
  
  console.log("updated")
    try {
      // Update the project in the MongoDB database
      const updatedproject = await Project.findByIdAndUpdate(projectId, updatedprojectData, { new: true });
  
      res.status(200).json(updatedproject);
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

 
  app.delete('/project/:id', async (req, res) => {
    const projectId = req.params.id;
   
    try {
        // Find the project by fypId and delete it
        console.log("in delete", projectId);
        const deletedProject = await Project.findOneAndDelete({ fypId: projectId });

        // If the project does not exist, send an error response
        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // If the project is deleted successfully, send a success response
        res.json({ success: 'Project deleted successfully', project: deletedProject });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'An error occurred while deleting the project' });
    }
});


  app.post('/logout', (req, res) => {
    req.session.destroy();
   
    res.json({ message: 'Logout successful' });
  });
  
 
  
  
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
