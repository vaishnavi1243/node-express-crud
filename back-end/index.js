import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import UserModel from './model/user.js';
const app = express();
app.use(cors());
app.use(express.json());
const databse= mongoose.connect('mongodb://127.0.0.1:27017/crud')
databse.then(()=>{
    console.log("connected succesfully");
})

app.get('/', (req, res) => {
    console.log("GET / route accessed");
    UserModel.find({})
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json({ error: err.message }));
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;

  UserModel.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
app.post('/updateUser/:id',(req,res)=>{
  console.log("user update");
  const id = req.params.id;

  UserModel.findByIdAndUpdate({_id:id},{
    name:req.body.name,
    email:req.body.email,
    age:req.body.age,
  }).then(user=> res.json(user))
  .catch(err => user.json(err))
})
app.post('/createUser',(req,res)=>{
    console.log("entered api req");
    UserModel.create(req.body)
    .then(user=> res.json(user))
    .catch(err => user.json(err))
})
app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully', user });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});
app.listen(3001,()=>{
    console.log('Server is Running');
})