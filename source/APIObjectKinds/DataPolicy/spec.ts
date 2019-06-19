export default
interface Spec {
  selector: {
    matchLabels: {
      [name: string]: string;
    };
  };
  require: {
    queryLogs: boolean;
    slowQueryLogs: boolean;
    insertLogs: boolean;
    updateLogs: boolean;
    flag: boolean;
    nonExistence: boolean;
  };
  nonComplianceAction: 'warn' | 'ignore';
};
