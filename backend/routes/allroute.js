const router=require("express").Router();

const User=require("../models/usermodel");



router.post("/signup",async(req,res)=>{
    try{
        const {username,password,user_id}=req.body;

        const existinguser = await User.findOne({ 'user_id': user_id });
        if (existinguser) {
            return res.status(200).send({ message: 'User Already Exists', success: false });
        }
        const data={
          username,
          password,
          user_id,  
          likedsongs:[]
        }
        const newuser=new User(data);
        await newuser.save().then(()=>{
            res.status(200).json({message:"signed up successfully",success:true});   
        })
    }
    catch(error){
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;


    const user = await User.findOne({ 'username':username, 'password':password });

    if (user) {
      res.status(200).json({ message: "Login successful",user_id:user.user_id });
    } else {
    
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const { MongoClient, ObjectId } = require('mongodb');


const uri = 'mongodb://0.0.0.0/Jazz';

router.post('/:user_id/likedSongs', async (req, res) => {
  const { user_id } = req.params;
  const { songTitle } = req.body;

  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db();
    const collection = database.collection('users');

    const result = await collection.updateOne(
      { user_id: user_id },
      { $addToSet: { likedsongs: songTitle } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    await client.close();

    res.status(200).json({ message: 'Song added to liked songs' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.delete('/:user_id/likedSongs', async (req, res) => {
  const { user_id } = req.params;
  const { songTitle } = req.body;

  try {
    
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    
    const database = client.db();
    const collection = database.collection('users');

    const result = await collection.updateOne(
      { user_id: user_id },
      { $pull: { likedsongs: songTitle } } 
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(result);

    
    await client.close();

    res.status(200).json({ message: 'Song removed from liked songs' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:user_id/likedSongs', async (req, res) => {
  const { user_id } = req.params;

  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db();
    const collection = database.collection('users');

    // Find the user by user_id and project only the likedsongs field
    const user = await collection.findOne({ user_id }, { projection: { likedsongs: 1 } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await client.close();

    res.status(200).json({ likedSongs: user.likedsongs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:user_id/playlists', async (req, res) => {
  const { user_id } = req.params;

  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db();
    const collection = database.collection('playlist');

    // Find playlists by user_id
    const playlists = await collection.find({ user_id }).toArray();
    console.log(playlists)
    if (!playlists || playlists.length === 0) {
      return res.status(404).json({ error: 'No playlists found for this user' });
    }

    await client.close();

    res.status(200).json({ playlists });  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


 
module.exports=router;