import { Inject } from "./inject.decorator";
import { ServiceC } from "./service-c";

export class ServiceB {
    constructor(@Inject public serviceC: ServiceC) {}

    method2() {
        console.log('Hello from ServiceB');
        this.serviceC.method3();
    }
}