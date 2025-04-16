// docs: https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest
import axios from 'axios';

export const searchPubChemCompound = async (compoundName: string) => {
  try {
    const response = await axios.get(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${compoundName}/JSON`
    );
    return response.data;
  } catch (error) {
    console.error('PubChem API Error:', error);
    return null;
  }
};
