const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.write('this is home page');
        res.write('<html> <head> <title> Form</title> </head>');
        res.write(
            '<body><form method="post" action="/about" ><input name="massage"/> </form> </body>'
        );
        res.end();
    } else if (req.url === '/about' && req.method === 'GET') {
        res.write('this is about page');
        req.on('body' (body)=>{
            console.log(body.toString())
        })
        res.end();
    } else {
        res.write('This is url page');
        res.end();
    }
});
server.listen(3000);
