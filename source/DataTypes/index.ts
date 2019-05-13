import DataType from '../DataType';
import boolean from './boolean';
import uint from './uint';
import sint from './sint';
import ureal from './ureal';
import sreal from './sreal';
import blob from './blob';
import text from './text';
import percent from './percent';
import serial from './serial';
import date from './date';
import year from './year';
import month from './month';
import day from './day';
import time from './time';
import datetime from './datetime';
import timestamp from './timestamp';
import money from './money';
import geometry from './geometry';
import point from './point';
import line from './line';
import polygon from './polygon';
import json from './json';
import xml from './xml';
import yaml from './yaml';
import toml from './toml';
import oid from './oid';
import sid from './sid';
import iri from './iri';
import irn from './irn';
import email from './email';
import dnslabel from './dnslabel';
import fqdn from './fqdn';
import dn from './dn';
import inet from './inet';
import cidr from './cidr';
import macaddr from './macaddr';
import varchar from './varchar';
import fixchar from './fixchar';

const dataTypes: { [ name: string ]: DataType } = {
  blob,
  boolean,
  cidr,
  date,
  datetime,
  day,
  dn,
  dnslabel,
  email,
  fixchar,
  fqdn,
  geometry,
  inet,
  iri,
  irn,
  json,
  line,
  macaddr,
  money,
  month,
  oid,
  percent,
  point,
  polygon,
  serial,
  sid,
  sint,
  sreal,
  text,
  time,
  timestamp,
  toml,
  uint,
  ureal,
  varchar,
  xml,
  yaml,
  year,
};

export default dataTypes;
