const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();
const port = 3000;

app.use(cors());
app.use(logger());

const userRouter = (req, res) => {
  res.json({
    msg: 'success',
    data: {
      userName: 'admin',
      roles: ['admin'],
    },
    code: 0,
  });
};

app.use('/api/v1/user', userRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
