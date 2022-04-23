const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();

const homeContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const aboutContent = "Dui accumsan sit amet nulla facilisi morbi tempus iaculis. Gravida in fermentum et sollicitudin ac orci. Porta nibh venenatis cras sed felis eget velit. Cursus sit amet dictum sit amet justo donec enim. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Diam sollicitudin tempor id eu nisl nunc mi. Nulla aliquet enim tortor at auctor urna nunc. Bibendum est ultricies integer quis auctor. Accumsan sit amet nulla facilisi morbi tempus iaculis. Pellentesque eu tincidunt tortor aliquam. Turpis egestas sed tempus urna et pharetra pharetra massa. Aliquet porttitor lacus luctus accumsan tortor posuere ac. Enim tortor at auctor urna."
const contactContent = "Dictumst quisque sagittis purus sit amet volutpat consequat. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Turpis egestas pretium aenean pharetra magna. Posuere urna nec tincidunt praesent. At quis risus sed vulputate odio ut. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Scelerisque purus semper eget duis. Pellentesque id nibh tortor id. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Urna neque viverra justo nec. Fermentum et sollicitudin ac orci phasellus egestas tellus. Sed enim ut sem viverra. Netus et malesuada fames ac turpis egestas sed tempus urna. Vehicula ipsum a arcu cursus vitae. Malesuada fames ac turpis egestas. Non nisi est sit amet facilisis magna etiam tempor. Faucibus nisl tincidunt eget nullam non nisi est. Purus gravida quis blandit turpis. Adipiscing enim eu turpis egestas pretium. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum."
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

var posts = [];

app.get("/", function (req,res) {
    res.render("home", {homeContent:homeContent,posts:posts});
})

app.get("/about", function (req, res) {
    res.render("about", {aboutContent: aboutContent});
})

app.get("/contact", function (req, res) {
    res.render("contact", {contactContent: contactContent});
})

app.get("/compose",function (req,res) {
    res.render("compose");
})

app.post("/compose",function (req,res) {
   var post = {
       title: req.body.journalTitle,
       entry: req.body.journalEntry
   };

   posts.push(post);
   res.redirect("/")
})

app.get("/posts/:title",function (req,res) {
    const requestedTitle = _.lowerCase(req.params.title);
    
    posts.forEach(function (post) {
        const storedTitle= _.lowerCase(post.title); 
        const storedContent = post.entry;
        if (storedTitle == requestedTitle)
        {
            console.log("Successful Match");
            res.render("postContent",{storedTitle: storedTitle, storedContent : storedContent});
        }
    })
})

app.listen(3000,function name(params) {
    console.log("server's running at port 3000");
})