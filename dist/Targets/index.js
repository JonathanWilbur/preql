"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MariaDB_1 = __importDefault(require("./MariaDB"));
const targets = new Map([
    ['mariadb', MariaDB_1.default],
]);
exports.default = targets;
