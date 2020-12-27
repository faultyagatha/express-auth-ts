import express from 'express';
import cookieSession from 'cookie-session';

import { router } from './routes/loginRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['ghoshghg'] }));
app.use(router);

app.listen(3000, () => {
  console.log('listening on port 3000');
})