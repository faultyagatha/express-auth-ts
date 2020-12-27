import 'reflect-metadata';

export function get(path: string) {
  return function (
    target: any,
    key: string,
    propertyDesc: PropertyDescriptor
  ) {
    Reflect.defineMetadata('path', path, target, key);
  }
}