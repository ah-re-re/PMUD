"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsModule = void 0;
const common_1 = require("@nestjs/common");
const carts_service_1 = require("./services/carts.service");
const products_controller_1 = require("./controllers/products.controller");
const carts_repository_1 = require("./repository/carts.repository");
const mongoose_1 = require("@nestjs/mongoose");
const cart_schema_1 = require("./schema/cart.schema");
let CartsModule = class CartsModule {
};
CartsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: cart_schema_1.Cart.name, schema: cart_schema_1.CartSchema }]),
        ],
        controllers: [products_controller_1.CartsController],
        providers: [carts_service_1.CartsService, carts_repository_1.CartsRepository],
    })
], CartsModule);
exports.CartsModule = CartsModule;
//# sourceMappingURL=carts.module.js.map