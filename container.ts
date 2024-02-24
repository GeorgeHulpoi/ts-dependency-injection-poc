import 'reflect-metadata';

import { injectMetadataKey } from "./inject.decorator";
import { Injector } from './injector';
import { Type } from './types';

export class Container {
    private readonly providers: Map<string | symbol, Type<any>> = new Map();
    private readonly instances: Map<string | symbol, any> = new Map();

    addProvider<T>(token: string | symbol, type: Type<T>): void {
        this.providers.set(token, type);
    }

    getProvider<T>(token: string | symbol): Type<T> | null {
        return this.providers.get(token) || null;
    }

    get<T>(token: string | symbol): T {
        if (this.instances.has(token)) {
            return this.instances.get(token)!;
        }

        if (this.providers.has(token)) {
            const instanceType = this.getProvider<T>(token)!;
            const injector = new Injector(instanceType, this);
            const instance = injector.getInstance();
            this.instances.set(token, instance);

            return instance;
        } else {
            throw new Error(`${token.toString()} is not provided`);
        }
    } 

    static getDependencies<T>(type: Type<T>): Map<number, Type<any>> {
        return Reflect.getOwnMetadata(injectMetadataKey, type);
    }
}