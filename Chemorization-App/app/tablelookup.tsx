import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import * as Speech from 'expo-speech';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import periodicTableJson from '@/assets/periodic-table.json';
const periodicTable: Record<string, ElementData> = periodicTableJson;
import layout from '@/assets/periodic-layout.json';

type ElementData = {
  symbol: string;
  name: string;
  atomicNumber: number;
  group: number;
  period: number;
  category: string;
};

export default function TableLookupScreen() {
  const [selected, setSelected] = useState<ElementData | null>(null);
  const scale = useSharedValue(1);

  const handlePress = (symbol: string) => {
    const element = (periodicTable as Record<string, ElementData>)[symbol];
    if (element) {
      setSelected(element);
      const spokenText = `${element.name}. Atomic number ${element.atomicNumber}. Category: ${element.category}`;
      Speech.speak(spokenText, { rate: 0.9 });
    }
  };

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale;
      },
      onEnd: () => {
        scale.value = withTiming(1, { duration: 300 });
      },
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const renderRow = (row: (string | null)[], rowIndex: number) => (
    <View key={rowIndex} style={styles.row}>
      {row.map((symbol, colIndex) => {
        if (!symbol) {
          return (
            <View
              key={`empty-${rowIndex}-${colIndex}`}
              style={[styles.emptyCell]}
            />
          );
        }
        if (symbol === '57-71' || symbol === '89-103') {
          return (
            <View
              key={`placeholder-${symbol}-${colIndex}`}
              style={[styles.element, styles.placeholder]}
            >
              <Text style={[styles.symbol, { fontSize: 10 }]}>{symbol}</Text>
            </View>
          );
        }
        const element = periodicTable[symbol];
        return (
          <TouchableOpacity
            key={`${symbol}-${colIndex}`}
            style={[
              styles.element,
              { backgroundColor: getColor(element.category) },
            ]}
            onPress={() => handlePress(symbol)}
          >
            <Text style={styles.symbol}>{element.symbol}</Text>
            <Text style={styles.number}>{element.atomicNumber}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Periodic Table</Text>
        <ScrollView horizontal>
          <PinchGestureHandler onGestureEvent={pinchHandler}>
            <Animated.View style={[animatedStyle, { paddingHorizontal: 10 }]}>
              {layout.map((row, i) => renderRow(row, i))}
            </Animated.View>
          </PinchGestureHandler>
        </ScrollView>

        <Modal visible={!!selected} transparent animationType="slide">
          <View style={styles.modal}>
            {selected && (
              <>
                <Text style={styles.modalTitle}>{selected.name}</Text>
                <Text style={styles.modalText}>Symbol: {selected.symbol}</Text>
                <Text style={styles.modalText}>
                  Atomic Number: {selected.atomicNumber}
                </Text>
                <Text style={styles.modalText}>Group: {selected.group}</Text>
                <Text style={styles.modalText}>Period: {selected.period}</Text>
                <Text style={styles.modalText}>
                  Category: {selected.category}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelected(null)}
                  style={styles.close}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Modal>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const getColor = (category: string) => {
  switch (category) {
    case 'noble gas':
      return '#00bcd4';
    case 'alkali metal':
      return '#ff5722';
    case 'alkaline earth metal':
      return '#ff9800';
    case 'metalloid':
      return '#9c27b0';
    case 'nonmetal':
      return '#4caf50';
    case 'halogen':
      return '#673ab7';
    case 'post-transition metal':
      return '#795548';
    case 'transition metal':
      return '#fdd835';
    case 'lanthanide':
      return '#ba68c8';
    case 'actinide':
      return '#ef5350';
    default:
      return '#9e9e9e';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
  },
  element: {
    width: 48,
    height: 48,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  emptyCell: {
    width: 48,
    height: 48,
    margin: 1,
    backgroundColor: 'transparent',
  },
  placeholder: {
    backgroundColor: '#b0bec5',
  },
  symbol: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  number: {
    fontSize: 10,
    color: 'white',
  },
  modal: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 6,
  },
  close: {
    marginTop: 20,
    backgroundColor: '#0f4c75',
    padding: 12,
    borderRadius: 6,
  },
});
