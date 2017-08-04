var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne =
{
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
}

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
        $[heading]
    </h3>
    
    <dev>
        $[date]
    </dev>
    
    <dev>
        $[content]
    </dev>
</dev>
</body>
</html>

`;

return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/article-one', function(req,res)
{
   res.send(createTemplate(articleOne));
}
);

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
