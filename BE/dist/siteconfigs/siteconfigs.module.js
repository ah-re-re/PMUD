"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteConfigsModule = void 0;
const common_1 = require("@nestjs/common");
const siteconfigs_service_1 = require("./services/siteconfigs.service");
const siteconfigs_controller_1 = require("./controllers/siteconfigs.controller");
const siteconfigs_repository_1 = require("./repository/siteconfigs.repository");
const mongoose_1 = require("@nestjs/mongoose");
const siteconfig_schema_1 = require("./schema/siteconfig.schema");
let SiteConfigsModule = class SiteConfigsModule {
};
SiteConfigsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: siteconfig_schema_1.SiteConfig.name, schema: siteconfig_schema_1.SiteConfigSchema }]),
        ],
        controllers: [siteconfigs_controller_1.SiteConfigsController],
        providers: [siteconfigs_service_1.SiteConfigsService, siteconfigs_repository_1.SiteConfigsRepository],
        exports: [siteconfigs_service_1.SiteConfigsService],
    })
], SiteConfigsModule);
exports.SiteConfigsModule = SiteConfigsModule;
//# sourceMappingURL=siteconfigs.module.js.map