import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {
  searchPubChemCompound,
  getPubChemDescription,
} from '@/components/api/pubchem';

export default function SearchResultsScreen() {
  const { query } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [compoundData, setCompoundData] = useState<any>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pubchem = await searchPubChemCompound(query as string);
        setCompoundData(pubchem);

        const cid = pubchem?.PC_Compounds?.[0]?.id?.id?.cid;
        if (cid) {
          const desc = await getPubChemDescription(cid);
          setDescription(desc);
        }
      } catch (error) {
        console.error('Failed to fetch PubChem data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

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

  const maxLength = 150;

  const renderDescription = () => {
    if (!description) {
      return <Text>No description available</Text>;
    }

    if (description.length <= maxLength) {
      return <Text>{description}</Text>;
    }

    return (
      <>
        <Text>
          {descriptionExpanded
            ? description
            : `${description.substring(0, maxLength)}...`}
        </Text>
        <TouchableOpacity
          onPress={() => setDescriptionExpanded(!descriptionExpanded)}
        >
          <Text style={styles.toggleText}>
            {descriptionExpanded ? 'Show Less' : 'Show More'}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Search Results for "{query}"</Text>

      {loading && <ActivityIndicator size="large" color="#2D7D46" />}

      {!loading && compoundData ? (
        <View style={styles.resultBlock}>
          {imageUrl && (
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}

          <Text style={styles.header}>IUPAC Name:</Text>
          <Text>{getProperty('IUPAC Name') || 'Not available'}</Text>

          <Text style={styles.header}>Molecular Formula:</Text>
          <Text>{getProperty('Molecular Formula') || 'Not available'}</Text>

          <Text style={styles.header}>Molecular Weight:</Text>
          <Text>{getProperty('Molecular Weight') || 'Not available'}</Text>

          <Text style={styles.header}>Description:</Text>
          {renderDescription()}
        </View>
      ) : (
        !loading && (
          <Text style={styles.noResult}>
            No chemistry-related data found for "{query}".
          </Text>
        )
      )}

      {/* Modal for Fullscreen Image */}
      {imageUrl && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <TouchableOpacity
              style={styles.modalContainer}
              onPress={() => setIsModalVisible(false)}
            >
              <Image
                source={{ uri: imageUrl }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 20,
    justifyContent: 'center',
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
  noResult: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
    marginTop: 20,
  },
  toggleText: {
    color: '#2D7D46',
    marginTop: 5,
    fontWeight: '600',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '90%',
  },
});
