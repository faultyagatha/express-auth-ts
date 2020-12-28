import { Request, Response } from 'express';

import { get, controller, bodyValidator, post } from './decorators';


@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>`);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email && password
      && email === 'test@test.com'
      && password === 'password') {
      //mark the person as logged in
      req.session = { loggedIn: true };
      //redirect to the root route
      res.redirect('/');
    } else {
      res.status(422).json({
        status: 'error',
        message: 'not found'
      });
    }
  }

  @get('./logout')
  getLogout(req: Request, res: Response) {
    req.session = null; //undefined
    res.redirect('/');
  }
}