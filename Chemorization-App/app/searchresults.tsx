// app/SearchResultsScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { searchPubChemCompound } from '@/components/api/pubchem';
import { getWikiSummary } from '@/components/api/wikipedia';
import { useLocalSearchParams } from 'expo-router';

export default function SearchResultsScreen() {
  const { query } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [compoundData, setCompoundData] = useState<any>(null);
  const [wikiData, setWikiData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pubchem = await searchPubChemCompound(query as string);
        const wiki = await getWikiSummary(query as string);
        setCompoundData(pubchem);
        setWikiData(wiki);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results for "{query}"</Text>

      {loading && <ActivityIndicator size="large" color="#2D7D46" />}

      {!loading && compoundData && (
        <View style={styles.resultBlock}>
          <Text style={styles.header}>PubChem CID:</Text>
          <Text>
            {compoundData?.PC_Compounds?.[0]?.id?.id?.cid ?? 'Not found'}
          </Text>
        </View>
      )}

      {!loading && wikiData && (
        <View style={styles.resultBlock}>
          <Text style={styles.header}>Wikipedia Summary:</Text>
          <Text>{wikiData.extract}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2D7D46',
  },
  resultBlock: { marginBottom: 20 },
  header: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
});
