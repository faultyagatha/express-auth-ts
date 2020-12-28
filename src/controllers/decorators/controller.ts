import 'reflect-metadata';
import { Request, Response, NextFunction, RequestHandler } from 'express';

import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

function bodyValidators(keys: string[]): RequestHandler {
  return function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }
    //check the keys
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send('Invalid request');
        return;
      }
    }
    next();
  }
}

/** decorator factory function */
export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.Path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.Method, target.prototype, key);
      const middlewares = Reflect.getMetadata(
        MetadataKeys.Middleware,
        target.prototype,
        key) || []; //handle undefined cases
      const requiredBodyProps = Reflect.getMetadata(
        MetadataKeys.Validator,
        target.prototype,
        key
      ) || []; //handle undefined cases
      const validator = bodyValidators(requiredBodyProps);
      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
      }
    }
  }
}