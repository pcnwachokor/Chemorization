// docs: https://www.mediawiki.org/wiki/API:Main_page
import axios from 'axios';

export const getWikiSummary = async (term: string) => {
  try {
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`
    );
    return response.data;
  } catch (error) {
    console.error('Wikipedia API Error:', error);
    return null;
  }
};
