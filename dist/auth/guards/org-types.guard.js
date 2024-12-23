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
exports.ORG_TYPES_GUARD = exports.OrgTypesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const org_types_decorator_1 = require("../decorators/org-types.decorator");
let OrgTypesGuard = class OrgTypesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const allowedTypes = this.reflector.get(org_types_decorator_1.ORG_TYPES_KEY, context.getHandler());
        if (!allowedTypes) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        const userOrgType = user.orgType;
        if (!userOrgType) {
            return false;
        }
        return allowedTypes.includes(userOrgType);
    }
};
exports.OrgTypesGuard = OrgTypesGuard;
exports.OrgTypesGuard = OrgTypesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], OrgTypesGuard);
exports.ORG_TYPES_GUARD = Symbol('OrgTypesGuard');
//# sourceMappingURL=org-types.guard.js.map