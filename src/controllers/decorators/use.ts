import 'reflect-metadata';
import { RequestHandler } from 'express';

import { MetadataKeys } from './MetadataKeys';

/** factory decorator */
export function use(middleware: RequestHandler) {
  return function (
    target: any,
    key: string,
    propertyDesc: PropertyDescriptor
  ) {
    //pull the metadata middleware property from our given property
    //if it doesn't exist, assign it an empty array
    const middlewares = Reflect.getMetadata(
      MetadataKeys.Middleware,
      target,
      key
    ) || [];
    middlewares.push(middleware);
    Reflect.defineMetadata(
      MetadataKeys.Middleware,
      middlewares,
      target,
      key
    );
  }
}