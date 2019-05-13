import DataType from '../DataType';

const email: DataType = {
  mariadb: {
    equivalentNativeType: (): string => 'VARCHAR(256)',
    checkConstraints: (path: [ string, string, string ]): string[] => [
      `${path[2]} RLIKE '^\\X{1,64}@[\\p{L}\\p{N}](?:[\\p{L}\\p{N}\\-_\\.]{0,251}[\\p{L}\\p{N}])?$'`
      // eslint-disable-next-line max-len
      + ` OR ${path[2]} RLIKE '^\\X{1,64}@\\[(?:(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d?|0)\\.){3}(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d?|0)\\]$'`
      // eslint-disable-next-line max-len
      + ` OR ${path[2]} RLIKE '^^\\X{1,64}@\\[IPv6:(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\\]$'`,
    ],
    getters: (): { [ name: string ]: string } => ({}),
    setters: (): { [ name: string ]: string } => ({}),
  },
};

export default email;
