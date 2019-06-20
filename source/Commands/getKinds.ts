import kinds from '../APIObjectKinds/index';

export default
function getKinds(): { kinds: string[] } {
  return {
    kinds: Object.keys(kinds),
  };
};
