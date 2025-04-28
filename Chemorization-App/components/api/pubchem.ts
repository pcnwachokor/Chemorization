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

export async function getPubChemDescription(cid: number) {
  try {
    const response = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${cid}/JSON`
    );
    const data = await response.json();

    const sections = data?.Record?.Section || [];

    // Deep search inside sections
    for (const section of sections) {
      if (section.Section) {
        for (const subsection of section.Section) {
          if (
            subsection.TOCHeading === 'Record Description' ||
            subsection.TOCHeading === 'Compound Summary'
          ) {
            if (
              subsection.Information?.[0]?.Value?.StringWithMarkup?.[0]?.String
            ) {
              return subsection.Information[0].Value.StringWithMarkup[0].String;
            }
          }
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch description:', error);
    return null;
  }
}
