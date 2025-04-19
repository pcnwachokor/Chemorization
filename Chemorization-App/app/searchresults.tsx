// app/searchresults.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { searchPubChemCompound } from '@/components/api/pubchem';
import { getWikiSummary } from '@/components/api/wikipedia';

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

  // Helper to extract property values
  const getProperty = (label: string) => {
    const props = compoundData?.PC_Compounds?.[0]?.props || [];
    return (
      props.find((p: any) => p.urn.label === label)?.value?.sval ||
      props.find((p: any) => p.urn.label === label)?.value?.fval
    );
  };

  const cid = compoundData?.PC_Compounds?.[0]?.id?.id?.cid;
  const imageUrl = cid
    ? `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG`
    : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Search Results for "{query}"</Text>

      {loading && <ActivityIndicator size="large" color="#2D7D46" />}

      {!loading && compoundData && (
        <View style={styles.resultBlock}>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          )}

          <Text style={styles.header}>IUPAC Name:</Text>
          <Text>{getProperty('IUPAC Name') || 'Not available'}</Text>

          <Text style={styles.header}>Molecular Formula:</Text>
          <Text>{getProperty('Molecular Formula') || 'Not available'}</Text>

          <Text style={styles.header}>Molecular Weight:</Text>
          <Text>{getProperty('Molecular Weight') || 'Not available'}</Text>
        </View>
      )}

      {!loading && wikiData && (
        <View style={styles.resultBlock}>
          <Text style={styles.header}>Wikipedia Summary:</Text>
          <Text>{wikiData.extract || 'No summary available'}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2D7D46',
    textAlign: 'center',
  },
  resultBlock: {
    marginBottom: 25,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});
