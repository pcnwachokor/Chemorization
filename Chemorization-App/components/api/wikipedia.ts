// docs: https://www.mediawiki.org/wiki/API:Main_page
// import axios from 'axios';

// export const getWikiSummary = async (term: string) => {
//   const chemistryTerm = `${term.trim()} (chemistry)`;
//   try {
//     const response = await axios.get(
//       `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`
//     );
//     return response.data;
//   } catch (error) {
//     console.warn('Please enter chemistry-specific content');
//     return null;
//   }
// };
