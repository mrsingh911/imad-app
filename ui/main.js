//Counter Code

var button = document.getElementById('counter');

button.onclick = function()
{
    // Create a request object.
    var request = new XMLHttpRequest();
    
    //Store the response in a variable
    
    request.onreadystatechange = function()
    {
        if(request.readyState === XMLHttpRequest.DONE)
        {
            //Take some action.
            
            if(request.status === 200)
            {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        //Not done yet.
    };
   //Make the request
   
   request.open('GET','navjit911.imad.hasura-app.io/counter',true);
   request.send(null);

};

//Submit name 


var submit = document.getElementById('submit_btn');
submit.onclick = function()
{
    // Create a request object.
    var request = new XMLHttpRequest();
    
    //Store the response in a variable
    
    request.onreadystatechange = function()
    {
        if(request.readyState === XMLHttpRequest.DONE)
        {
            //Take some action.
            
            if(request.status === 200)
            {
                   var names = request.responseText;
                   
                   names = JSON.parse(name);
    var list = '';
    for( var i=0; i<name.length; i++)
    {
        list +='<li>' + name[i]+'<li>';
    }
    
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
            }
        }
        //Not done yet.
    };
   //Make the request
   var nameInput = document.getElementById('name');
    var name = nameInput.value;
   request.open('GET','navjit911.imad.hasura-app.io/submit-name?name='+ name,true);
   request.send(null);


};