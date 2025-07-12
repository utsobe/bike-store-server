import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

const port = 3000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  } catch (error) {
    console.log(error);
  }
}

main();
