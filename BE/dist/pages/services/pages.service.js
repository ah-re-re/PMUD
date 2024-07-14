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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const pages_repository_1 = require("../repository/pages.repository");
let PagesService = class PagesService {
    constructor(pagesRepository) {
        this.pagesRepository = pagesRepository;
    }
    async create(createUserDto) {
        return await this.pagesRepository.create(createUserDto);
    }
    async findAll() {
        return await this.pagesRepository.findAll();
    }
    async findOne(filter) {
        return await this.pagesRepository.findOne(filter);
    }
    async update(id, updateUserDto) {
        return await this.pagesRepository.update(id, updateUserDto);
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
PagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pages_repository_1.PagesRepository])
], PagesService);
exports.PagesService = PagesService;
//# sourceMappingURL=pages.service.js.map