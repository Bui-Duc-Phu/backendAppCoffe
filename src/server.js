const config = require('./configs/import');
const { port, hostname,printColoredConsole,conFigViewEngine,express } = config;
const app = express();

conFigViewEngine(app);


app.get('/', (req, res) => {
    res.send('Hello, World!');
  });



app.listen(port, () => {
  printColoredConsole('violet', 'Server Running --->  listening on port ' +  port);
});
