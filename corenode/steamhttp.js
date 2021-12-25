const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('<html> <head> <title> Form</title> </head>');
        res.write(
            '<body><form method="post" action="/process" ><input name="massage"/> </form> </body>'
        );
        res.end();
    } else if (req.url === '/process' && req.method === 'POST') {
        const arr = [];
        req.on('data', (data) => {
            // console.log(data.toString());
            arr.push(data);
        });
        req.on('end', () => {
            console.log('stream is finished');
            const parseArr = Buffer.concat(arr).toString();
            console.log(parseArr);
        });

        res.write('Thank you for submeiting');

        res.end();
    }
});

server.listen(3030);
