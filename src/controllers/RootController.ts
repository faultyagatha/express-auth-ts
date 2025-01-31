import { Request, Response, NextFunction } from 'express';

import { get, controller, use } from './decorators';

//protect auth midlleware
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) return next();

  res.status(403);
  res.send('Not permitted');
}

@controller('') //call with '' to prevent // when 2 decorators are appended
class RouteController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/auth/logout">Logout</a>
      </div>`);
    } else {
      res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/auth/login">Login</a>
      </div>`)
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected route, logged in user');
  }
}