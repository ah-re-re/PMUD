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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsRepository = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const cart_schema_1 = require("../schema/cart.schema");
let CartsRepository = class CartsRepository {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(createDto) {
        const created = new this.productModel(createDto);
        return await created.save();
    }
    async findAll(filter) {
        return this.productModel.find(filter).sort({ createdAt: -1 }).exec();
    }
    async active(id) {
        return await this.productModel.findByIdAndUpdate(id, { status: "active" });
    }
    async filterAndGroupByDate() {
        return this.productModel.aggregate([
            {
                $project: {
                    yearMonthDay: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                    },
                    cart: 1,
                },
            },
            {
                $group: {
                    _id: '$yearMonthDay',
                    records: { $push: { cart: '$cart' } },
                },
            },
        ]);
    }
};
CartsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CartsRepository);
exports.CartsRepository = CartsRepository;
//# sourceMappingURL=carts.repository.js.map