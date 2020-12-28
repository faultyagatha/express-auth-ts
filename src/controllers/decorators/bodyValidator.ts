import 'reflect-metadata';

import { MetadataKeys } from './MetadataKeys';

export function bodyValidator(...keys: string[]) {
  return function (
    target: any,
    key: string,
    propertyDesc: PropertyDescriptor
  ) {
    Reflect.defineMetadata(
      MetadataKeys.Validator,
      keys,
      target,
      key
    );
  }
}