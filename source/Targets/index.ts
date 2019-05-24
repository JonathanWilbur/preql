import Target from '../Target';
import MariaDBTarget from './MariaDB';

const targets: Map<string, Target> = new Map([
  ['mariadb', MariaDBTarget],
]);

export default targets;
