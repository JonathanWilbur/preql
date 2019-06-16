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
  // TODO: I think this needs to be an enum.
  nonComplianceActions: {
    displayWarning: boolean;
    addWarningEntry: {
      databaseName: string;
      structName: string;
      attributeName: string;
    }
    ignore: boolean;
    nullify: boolean;
    dropIfEmpty: boolean;
  };
};
