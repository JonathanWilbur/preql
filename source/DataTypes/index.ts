import { DataType } from "../DataType";
import { boolean } from "./boolean";
import { uint } from "./uint";
import { sint } from "./sint";
import { ureal } from "./ureal";
import { sreal } from "./sreal";
import { blob } from "./blob";
import { text } from "./text";
import { percent } from "./percent";
import { serial } from "./serial";
import { date } from "./date";
import { year } from "./year";
import { month } from "./month";
import { day } from "./day";
import { time } from "./time";
import { datetime } from "./datetime";
import { timestamp } from "./timestamp";
import { money } from "./money";
import { geometry } from "./geometry";
import { point } from "./point";
import { line } from "./line";
import { polygon } from "./polygon";
import { json } from "./json";
import { xml } from "./xml";
import { yaml } from "./yaml";
import { toml } from "./toml";
import { oid } from "./oid";
import { sid } from "./sid";
import { iri } from "./iri";
import { irn } from "./irn";
import { email } from "./email";
import { dnslabel } from "./dnslabel";
import { fqdn } from "./fqdn";
import { dn } from "./dn";
import { inet } from "./inet";
import { cidr } from "./cidr";
import { macaddr } from "./macaddr";
import { varchar } from "./varchar";
import { fixchar } from "./fixchar";

export
const dataTypes : { [ name : string ] : DataType } = {
    "blob": blob,
    "boolean": boolean,
    "cidr": cidr,
    "date": date,
    "datetime": datetime,
    "day": day,
    "dn": dn,
    "dnslabel": dnslabel,
    "email": email,
    "fixchar": fixchar,
    "fqdn": fqdn,
    "geometry": geometry,
    "inet": inet,
    "iri": iri,
    "irn": irn,
    "json": json,
    "line": line,
    "macaddr": macaddr,
    "money": money,
    "month": month,
    "oid": oid,
    "percent": percent,
    "point": point,
    "polygon": polygon,
    "serial": serial,
    "sid": sid,
    "sint": sint,
    "sreal": sreal,
    "text": text,
    "time": time,
    "timestamp": timestamp,
    "toml": toml,
    "uint": uint,
    "ureal": ureal,
    "varchar": varchar,
    "xml": xml,
    "yaml": yaml,
    "year": year
};