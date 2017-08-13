var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
app.use(morgan('combined'));

var config = {
    user: 'navjit911',
    database: 'navjit911',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
}; 
 
var articles = { 
'article-one':{
    title: 'Article One | Navjit Singh',
    heading: 'Article One',
    date: 'Aug 5,2017',
    content:      `   <p>
            This is the actal content that I want to write on my website. Let's see how it looks on the website. This is going to be awesome, I am already tellin you this and this is going to be great.This is the actal content that I want to write on my website. Let's see how it looks on the website. This 
        </p>
        <p>
            This is the actal content that I want to write on my website. Let's see how it looks on the website. This is going to be awesome, I am already tellin you this and this is going to be great.This is the actal content that I want to write on my website.
        </p>
        <p>
            This is the actal content that I want to write on my website. Let's see how it looks on the website. This is going to be awesome,
        </p>`
},
'article-two':{title: 'Article Two | Navjit Singh',
    heading: 'Article Two',
    date: 'Aug 6,2017',
    content:      `   <p>
            This is the actal content that I want to write on my website. Let's see how it looks on the we. This 
        </p>
        <p>
           The content for the second article.
        </p>`},
'article-three':{title: 'Article Thre | Navjit Singh',
    heading: 'Article Two',
    date: 'Aug 7,2017',
    content:      `   <p>
            This is the actal content that I want to write on my website.
            This is the content for third article.
        </p>
       `}
};

function createTemplate(data)
{
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
var htmlTemplate = `
<html>
<head>
    <title>
        Article One, Navjit Singh.
    </title>
    

<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="/ui/style.css" rel="stylesheet" />

</head>

<body>
    <dev class="container">
    <dev>
    <a href ='/'>Home</a>
    </dev>
    <hr/>
    
    <h3>
        ${heading}
    </h3>
    
    <dev>
        ${date}
    </dev>
    
    <dev>
        ${content}
    </dev>
</dev>
</body>
</html>

`;

return htmlTemplate;
}

var pool = new Pool(config);
apt.get('/test-db',function(req,res)
{
    //make a select request
    //return the reposnse with the table
    pool.query('SELECT * FROM test',function(err,result)
    {
        if(err)
        {
      res.status(500).send(err.toString());
        }
        
        else{
            res.send(JSON.stringify(result));
        }
    });
}
);

var counter = 0;
app.get('/counter', function(req,res)
{
    counter = counter + 1;
    res.send(counter.toString());
}
);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var names = [];
app.get('/submit-name/',function(req,res) //URL: /submit-name?name=xxxx
{
    var name = req.query.name;
    
    //Get the name from the request.
    names.push(name);
    
    //JSON: javascript Object Notation
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function(req,res){
//articleName = article-one
//article[articleName]=={} content object for article one.


pool.query("SELECT * FROM article WHERE title = " + req.params.articleName, function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }
    else
    {
        if(result.rows.length === 0) {
            res.status(404).send('Article not found');
        }
        else
        {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
})
var articleData =
   res.send(createTemplate(articleData));
});

app.get('/article-two', function(req,res)
{
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
}
);

app.get('/article-three', function(req,res)
{
   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
}
);


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
