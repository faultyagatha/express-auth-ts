import { Router, Request, Response, NextFunction } from 'express';

//override the req.body and give it a fixed type (instead of any)
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
};

//protective auth midlleware
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) return next();

  res.status(403);
  res.send('Not permitted');
}

const router = Router();

router.get('/', (req, res) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
    <div>
      <div>You are logged in</div>
      <a href="/logout">Logout</a>
    </div>`);
  } else {
    res.send(`
    <div>
      <div>You are not logged in</div>
      <a href="/login">Login</a>
    </div>`)
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = null; //undefined
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route, logged in user');
});

export { router };