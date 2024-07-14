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
exports.SiteConfigsController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const siteconfigs_service_1 = require("../services/siteconfigs.service");
const create_siteconfig_dto_1 = require("../dto/create-siteconfig.dto");
const update_siteconfig_dto_1 = require("../dto/update-siteconfig.dto");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
let SiteConfigsController = class SiteConfigsController {
    constructor(siteconfigsService) {
        this.siteconfigsService = siteconfigsService;
    }
    create(createUserDto) {
        return this.siteconfigsService.create(createUserDto);
    }
    findAll() {
        return this.siteconfigsService.findAll();
    }
    findOne(id) {
        return this.siteconfigsService.findOne({ _id: id });
    }
    update(id, updateUserDto) {
        return this.siteconfigsService.update(id, updateUserDto);
    }
    remove(id) {
        return this.siteconfigsService.remove(+id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('authorization'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_siteconfig_dto_1.CreateSiteConfigDto]),
    __metadata("design:returntype", void 0)
], SiteConfigsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SiteConfigsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SiteConfigsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('authorization'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_siteconfig_dto_1.UpdateSiteConfigDto]),
    __metadata("design:returntype", void 0)
], SiteConfigsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('authorization'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SiteConfigsController.prototype, "remove", null);
SiteConfigsController = __decorate([
    (0, common_1.Controller)('siteconfigs'),
    (0, swagger_1.ApiTags)('SiteConfigs'),
    __metadata("design:paramtypes", [siteconfigs_service_1.SiteConfigsService])
], SiteConfigsController);
exports.SiteConfigsController = SiteConfigsController;
//# sourceMappingURL=siteconfigs.controller.js.map