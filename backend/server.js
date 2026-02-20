const connectDB = require('./src/db/db');
const app = require('./src/app')
const port = 3000;

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});