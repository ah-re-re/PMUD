"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSiteConfigDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_siteconfig_dto_1 = require("./create-siteconfig.dto");
class UpdateSiteConfigDto extends (0, mapped_types_1.PartialType)(create_siteconfig_dto_1.CreateSiteConfigDto) {
}
exports.UpdateSiteConfigDto = UpdateSiteConfigDto;
//# sourceMappingURL=update-siteconfig.dto.js.map