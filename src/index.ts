import express from 'express';
import session from "express-session";
import imageRoutes from './routes/imageRoutes';

const app = express();
app.use(express.json());

app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // HTTPSの場合は true に
}));

app.use('/api', imageRoutes);

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000/');
});