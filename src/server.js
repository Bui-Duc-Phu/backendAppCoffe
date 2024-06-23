const config = require('./configs/import');
const { port, hostname, printColoredConsole, conFigViewEngine, express } = config;
const sequelize = require('./configs/db'); 
const User = require('./models/User'); 
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

conFigViewEngine(app);

app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

app.get('/auth/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/add-users', async (req, res) => {
  try {
      const { email, sdt, name, mpassword, typePassword } = req.body;
      const newUser = await User.create({ email, sdt, name, mpassword, typePassword });
      res.status(201).json(newUser);
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
  }
});



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


