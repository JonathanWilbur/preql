"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_1 = require("./boolean");
const uint_1 = require("./uint");
const sint_1 = require("./sint");
const ureal_1 = require("./ureal");
const sreal_1 = require("./sreal");
const blob_1 = require("./blob");
const text_1 = require("./text");
const percent_1 = require("./percent");
const serial_1 = require("./serial");
const date_1 = require("./date");
const year_1 = require("./year");
const month_1 = require("./month");
const day_1 = require("./day");
const time_1 = require("./time");
const datetime_1 = require("./datetime");
const timestamp_1 = require("./timestamp");
const money_1 = require("./money");
const geometry_1 = require("./geometry");
const point_1 = require("./point");
const line_1 = require("./line");
const polygon_1 = require("./polygon");
const json_1 = require("./json");
const xml_1 = require("./xml");
const yaml_1 = require("./yaml");
const toml_1 = require("./toml");
const oid_1 = require("./oid");
const sid_1 = require("./sid");
const iri_1 = require("./iri");
const irn_1 = require("./irn");
const email_1 = require("./email");
const dnslabel_1 = require("./dnslabel");
const fqdn_1 = require("./fqdn");
const dn_1 = require("./dn");
const inet_1 = require("./inet");
const cidr_1 = require("./cidr");
const macaddr_1 = require("./macaddr");
const varchar_1 = require("./varchar");
const fixchar_1 = require("./fixchar");
exports.dataTypes = {
    "blob": blob_1.blob,
    "boolean": boolean_1.boolean,
    "cidr": cidr_1.cidr,
    "date": date_1.date,
    "datetime": datetime_1.datetime,
    "day": day_1.day,
    "dn": dn_1.dn,
    "dnslabel": dnslabel_1.dnslabel,
    "email": email_1.email,
    "fixchar": fixchar_1.fixchar,
    "fqdn": fqdn_1.fqdn,
    "geometry": geometry_1.geometry,
    "inet": inet_1.inet,
    "iri": iri_1.iri,
    "irn": irn_1.irn,
    "json": json_1.json,
    "line": line_1.line,
    "macaddr": macaddr_1.macaddr,
    "money": money_1.money,
    "month": month_1.month,
    "oid": oid_1.oid,
    "percent": percent_1.percent,
    "point": point_1.point,
    "polygon": polygon_1.polygon,
    "serial": serial_1.serial,
    "sid": sid_1.sid,
    "sint": sint_1.sint,
    "sreal": sreal_1.sreal,
    "text": text_1.text,
    "time": time_1.time,
    "timestamp": timestamp_1.timestamp,
    "toml": toml_1.toml,
    "uint": uint_1.uint,
    "ureal": ureal_1.ureal,
    "varchar": varchar_1.varchar,
    "xml": xml_1.xml,
    "yaml": yaml_1.yaml,
    "year": year_1.year
};
