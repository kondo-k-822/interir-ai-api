import express from 'express';
import sampleRoutes from './routes/imageRoutes';

const app = express();
app.use(express.json());
app.use('/api', sampleRoutes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});