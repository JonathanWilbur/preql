"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_1 = __importDefault(require("./boolean"));
const uint_1 = __importDefault(require("./uint"));
const sint_1 = __importDefault(require("./sint"));
const ureal_1 = __importDefault(require("./ureal"));
const sreal_1 = __importDefault(require("./sreal"));
const blob_1 = __importDefault(require("./blob"));
const text_1 = __importDefault(require("./text"));
const percent_1 = __importDefault(require("./percent"));
const serial_1 = __importDefault(require("./serial"));
const date_1 = __importDefault(require("./date"));
const year_1 = __importDefault(require("./year"));
const month_1 = __importDefault(require("./month"));
const day_1 = __importDefault(require("./day"));
const time_1 = __importDefault(require("./time"));
const datetime_1 = __importDefault(require("./datetime"));
const timestamp_1 = __importDefault(require("./timestamp"));
const money_1 = __importDefault(require("./money"));
const geometry_1 = __importDefault(require("./geometry"));
const point_1 = __importDefault(require("./point"));
const line_1 = __importDefault(require("./line"));
const polygon_1 = __importDefault(require("./polygon"));
const json_1 = __importDefault(require("./json"));
const xml_1 = __importDefault(require("./xml"));
const yaml_1 = __importDefault(require("./yaml"));
const toml_1 = __importDefault(require("./toml"));
const oid_1 = __importDefault(require("./oid"));
const sid_1 = __importDefault(require("./sid"));
const iri_1 = __importDefault(require("./iri"));
const irn_1 = __importDefault(require("./irn"));
const email_1 = __importDefault(require("./email"));
const dnslabel_1 = __importDefault(require("./dnslabel"));
const fqdn_1 = __importDefault(require("./fqdn"));
const dn_1 = __importDefault(require("./dn"));
const inet_1 = __importDefault(require("./inet"));
const cidr_1 = __importDefault(require("./cidr"));
const macaddr_1 = __importDefault(require("./macaddr"));
const varchar_1 = __importDefault(require("./varchar"));
const fixchar_1 = __importDefault(require("./fixchar"));
const dataTypes = {
    blob: blob_1.default,
    boolean: boolean_1.default,
    cidr: cidr_1.default,
    date: date_1.default,
    datetime: datetime_1.default,
    day: day_1.default,
    dn: dn_1.default,
    dnslabel: dnslabel_1.default,
    email: email_1.default,
    fixchar: fixchar_1.default,
    fqdn: fqdn_1.default,
    geometry: geometry_1.default,
    inet: inet_1.default,
    iri: iri_1.default,
    irn: irn_1.default,
    json: json_1.default,
    line: line_1.default,
    macaddr: macaddr_1.default,
    money: money_1.default,
    month: month_1.default,
    oid: oid_1.default,
    percent: percent_1.default,
    point: point_1.default,
    polygon: polygon_1.default,
    serial: serial_1.default,
    sid: sid_1.default,
    sint: sint_1.default,
    sreal: sreal_1.default,
    text: text_1.default,
    time: time_1.default,
    timestamp: timestamp_1.default,
    toml: toml_1.default,
    uint: uint_1.default,
    ureal: ureal_1.default,
    varchar: varchar_1.default,
    xml: xml_1.default,
    yaml: yaml_1.default,
    year: year_1.default,
};
exports.default = dataTypes;
