import 'reflect-metadata';

export const injectMetadataKey = Symbol('inject');
 
export function Inject(target: Object, propertyKey: any, parameterIndex: number) {
    const depsMap = Reflect.getOwnMetadata(injectMetadataKey, target, propertyKey) || new Map<number, string>();
    const types = Reflect.getMetadata('design:paramtypes', target);
    const type = types[parameterIndex];
    depsMap.set(parameterIndex, type.name);
    Reflect.defineMetadata(injectMetadataKey, depsMap, target, propertyKey);
}