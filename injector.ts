import { Container } from "./container";
import { injectMetadataKey } from "./inject.decorator";
import { Type } from "./types";

export class Injector<T> {
    constructor(private readonly type: Type<T>, private readonly container: Container) {}

    getInstance(): T {
        const deps = this.getDependencies() || new Map();
        const args: any[] = [];
        
        deps.forEach((dep, index) => {
            args[index] = this.container.get(dep);
        })

        return new this.type(...args);
    }

    getDependencies(): Map<number, string> {
        return Reflect.getOwnMetadata(injectMetadataKey, this.type);
    }
}