export default
class PreqlError extends Error {
  public relevantObjects: object[] = [];

  constructor(readonly uuid: string, readonly message: string) {
    super(message);
  }
};
