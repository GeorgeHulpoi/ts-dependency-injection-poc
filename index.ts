import "reflect-metadata";

import { Container } from "./container";
import { Controller } from "./controller";
import { Injector } from "./injector";
import { ServiceA } from "./service-a";
import { ServiceB } from "./service-b";
import { ServiceC } from "./service-c";

const container = new Container();
container.addProvider(ServiceA.name, ServiceA);
container.addProvider(ServiceB.name, ServiceB);
container.addProvider(ServiceC.name, ServiceC);

const injector = new Injector(Controller, container);
const controller = injector.getInstance();

controller.serviceB.method2();