"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsService = void 0;
const common_1 = require("@nestjs/common");
const carts_repository_1 = require("../repository/carts.repository");
let CartsService = class CartsService {
    constructor(cartsRepository) {
        this.cartsRepository = cartsRepository;
    }
    async create(createUserDto) {
        return await this.cartsRepository.create(createUserDto);
    }
    async findAll(filter) {
        return await this.cartsRepository.findAll(filter);
    }
    async active(id) {
        return await this.cartsRepository.active(id);
    }
    async filterAndGroupByDate() {
        return await this.cartsRepository.filterAndGroupByDate();
    }
};
CartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [carts_repository_1.CartsRepository])
], CartsService);
exports.CartsService = CartsService;
//# sourceMappingURL=carts.service.js.map