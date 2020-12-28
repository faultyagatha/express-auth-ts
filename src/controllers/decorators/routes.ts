import 'reflect-metadata';

import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

/** generic function to list all the methods we want to build the decorators for */
function routeBinder(method: string) {
  return function (path: string) {
    return function (
      target: any,
      key: string,
      propertyDesc: PropertyDescriptor
    ) {
      Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
    };
  }
}

/** add more methods */
export const get = routeBinder(Methods.Get);
export const post = routeBinder(Methods.Post);
export const put = routeBinder(Methods.Put);
export const patch = routeBinder(Methods.Patch);
