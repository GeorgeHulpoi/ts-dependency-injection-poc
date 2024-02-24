import { Inject } from "./inject.decorator";

import { ServiceA } from "./service-a";
import { ServiceB } from "./service-b";

export class Controller {
    constructor(@Inject public serviceA: ServiceA, @Inject public serviceB: ServiceB) {}
}