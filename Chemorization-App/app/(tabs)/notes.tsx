import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MicOverlay from '@/components/MicOverlay';

const chemistryFacts = [
  "Water expands when it freezes.",
  "The periodic table has 118 elements.",
  "Hydrogen is the most abundant element in the universe.",
  "Mercury is the only metal that's liquid at room temperature.",
  "A mole of any substance contains 6.022 × 10²³ particles.",
  "Carbon can form more compounds than any other element.",
  "Salt (NaCl) is made from sodium and chlorine.",
  "Helium is lighter than air and non-flammable.",
  "Atoms are mostly empty space.",
  "Acids have a pH less than 7, bases greater than 7.",
  "Gold is one of the least reactive chemical elements.",
  "Dry ice is solid carbon dioxide.",
  "The only letter missing from the periodic table is J.",
  "Enzymes are biological catalysts.",
  "Rust forms when iron reacts with oxygen and water.",
  "Avogadro's number is 6.022 × 10²³.",
  "Lipids are hydrophobic — they repel water.",
  "The nucleus contains protons and neutrons.",
  "Alloys are mixtures of two or more metals.",
  "Electrons orbit the nucleus in energy shells.",
  "Water is known as the universal solvent.",
  "Soap molecules are both hydrophobic and hydrophilic.",
  "Catalysts speed up reactions without being consumed.",
  "Organic chemistry focuses on carbon-based compounds.",
  "pH measures the acidity or basicity of a solution.",
  "The human body is about 65% oxygen by mass.",
  "Lead's chemical symbol is Pb, from Latin 'plumbum'.",
  "Diamonds are pure carbon atoms arranged in a crystal lattice.",
  "Teflon is an extremely non-stick polymer.",
  "The blue color in copper sulfate crystals comes from water molecules.",
  "Ammonia (NH₃) is a pungent-smelling gas.",
  "Baking soda is sodium bicarbonate (NaHCO₃).",
  "Neon lights glow when electricity excites neon gas.",
  "Ozone (O₃) protects Earth from harmful UV rays.",
  "Fluorine is the most reactive element.",
  "Sulfuric acid is one of the most important industrial chemicals.",
  "Sugar's chemical formula is C₁₂H₂₂O₁₁.",
  "Photosynthesis turns carbon dioxide and water into glucose and oxygen.",
  "Fluoroantimonic acid is the strongest known acid.",
  "Liquid nitrogen boils at -196°C.",
  "An isotope has the same number of protons but different neutrons.",
  "The most common element in Earth's crust is oxygen.",
  "Chlorophyll gives plants their green color.",
  "DNA stands for deoxyribonucleic acid.",
  "The hardest naturally occurring substance is diamond.",
  "The chemical symbol for silver is Ag.",
  "Stainless steel contains iron, carbon, and chromium.",
  "The air we breathe is about 78% nitrogen.",
  "Atoms are made of protons, neutrons, and electrons."
];

export default function NotesHomeScreen() {
  const router = useRouter();
  const [currentFact, setCurrentFact] = useState(getRandomFact());

  function getRandomFact() {
    const randomIndex = Math.floor(Math.random() * chemistryFacts.length);
    return chemistryFacts[randomIndex];
  }

  const refreshFact = () => {
    setCurrentFact(getRandomFact());
  };

  return (
    <View style={styles.container}>
      <MicOverlay />
      
      {/* All content moved down */}
      <View style={styles.content}>
        <Text style={styles.title}>My Notes</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/add')}>
          <FontAwesome name="plus-circle" size={30} color="white" />
          <Text style={styles.buttonText}>Add New Note</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/view')}>
          <FontAwesome name="folder-open" size={30} color="white" />
          <Text style={styles.buttonText}>View Notes</Text>
        </TouchableOpacity>

        {/* Chemistry Fact Section */}
        <View style={styles.tipContainer}>
          <Text style={styles.tipHeader}>🧪 Chemistry Fact of the Day</Text>
          <Text style={styles.tip}>{currentFact}</Text>

          <TouchableOpacity style={styles.refreshButton} onPress={refreshFact}>
            <Text style={styles.refreshText}>🔁 Refresh Fact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 120, // Push all the content down
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D7D46',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  tipContainer: {
    marginTop: 40,
    backgroundColor: '#e0f7fa',
    borderLeftWidth: 5,
    borderLeftColor: '#00796b',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  tipHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00796b',
  },
  tip: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  refreshButton: {
    marginTop: 10,
  },
  refreshText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00796b',
  },
});


