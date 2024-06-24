const config = require('./configs/import');
const { port, hostname, printColoredConsole, conFigViewEngine, express,sequelize } = config;
const app = express();
conFigViewEngine(app);

const {router_SignUp} = require('./routers/signUpRoute')




app.use("/auth", router_SignUp);


// Đồng bộ hóa model
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      printColoredConsole('violet', 'Server Running ---> listening on port ' + port);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });


