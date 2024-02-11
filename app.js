import express from "express"
import bcrypt from "bcrypt"

const app = express()
const port = 3000;

// In Memory
const users = [];

app.use(express.json())

// Register Function
app.post("/register", async (req,res) => {
    try {
        const {email, password} = req.body;
        // Find User
        const findUser = users.find((data) => email == data.email)
       if(findUser){
        res.status(400).send("Wrong Email or Wron Password");
       }
       // Hash Password
       const hashPassword = await bcrypt.hash(password, 10);
       users.push({email, password: hashPassword})
       console.log(users)
       res.status(201).send("Registered Successfuly!")
    }
    catch (err) {
        res.status(500).send({message: err.message});
    }
})

// Login Function
app.post("/login", async (req,res) => {
    try{
        const {email, password} = req.body;
        // Find User 
        const findUser = users.find((data) => email == data.email)
        if(!findUser){
            res.status(400).send("Wrong Email or Wron Password");
           }
        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if(passwordMatch){
            res.status(200).send("Logged in seuccessfully !");
        }else{
            res.status(400).send("Wrong Email or Wron Password");
        }
    } catch (err){
        res.status(500).send({message: err.message});
    }
})
app.listen(port, () => {
    console.log("Server is started on port 3000");
})