import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { stringify } from "querystring";
import ejs from "ejs";


mongoose.connect("mongodb+srv://jaideep:Jaideep03@cluster0.udm7ere.mongodb.net/code_monkeys", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
});

const guuidesSchema=new mongoose.Schema({
    name: String,
    state: String,
    des: String,
    no: String,
    price: String,
});

// Use a different variable name for the model, e.g., GuideModel
const GuideModel = mongoose.model("guide", guuidesSchema);

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;



app.set('view engine', 'ejs');


var data;

// Place the bodyParser middleware before your routes
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the _dirname directory
app.use(express.static(_dirname));



app.get("/", async (req, res) => {
    try {
      const documents = await GuideModel.find({});
      const data = documents; // Define the 'data' variable here
      res.render("home.ejs", { data });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error"); // Handle the error gracefully
    }
  });
  


app.get("/login",(req,res)=>{
    res.render("login.ejs");
})

app.get("/singin", (req, res) => {
    res.render("singup.ejs");
});

app.get("/TouristOrGuide",(req,res)=>{
    res.render("TorG.ejs")
})

app.get("/guideregister", (req, res) => {
    res.render("guidedetails.ejs");
})

app.post("/submitguideinfo",(req,res)=>{
    // Capture data from the request body
    console.log(req.body);
    const guideData = {
        name: req.body.name,
        state: req.body.state,
        des: req.body.des,
        no: req.body.no,
        price: req.body.price,
      };
    
      // Create a new Guide instance and save it using the model
  const guideInstance = new GuideModel(guideData); // Use GuideModel here
  guideInstance.save();
  res.render("registered.ejs");
})

app.get("/about",(req,res)=>{
    res.render("about.ejs")
})

app.post("/login_submit", (req, res) => {
    console.log(req.body);
    res.redirect("/TouristOrGuide");
});

app.post("/singup_submit", (req, res) => {
    console.log(req.body);
    res.redirect("/TouristOrGuide");
});

app.post("/TorGsubmit", (req,res)=>{
    const bodyKeys = Object.keys(req.body);
    if (bodyKeys[0]==="guide"){
        res.render("guidedetails.ejs");
    }
    
else {
    res.redirect("/");
}});

app.post("/sbm",(req,res)=>{
    console.log(req.body);
    res.render("tick.ejs");
})

app.post("/tcomplain",(req,res)=>{
    console.log(req.body);
    res.render("tickcomplain.ejs");
})

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${port}`);
});