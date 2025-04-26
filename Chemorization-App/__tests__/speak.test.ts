import { speak } from '../utils/speak';
import * as Speech from 'expo-speech';

// Mock expo-speech
jest.mock('expo-speech', () => ({
  speak: jest.fn(),
}));

describe('speak', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls Speech.speak with default voice (en-US)', () => {
    speak('Hello, world');

    expect(Speech.speak).toHaveBeenCalledWith(
      'Hello, world',
      expect.objectContaining({
        language: 'en-US',
        pitch: 0.8,
        rate: 0.95,
      })
    );
  });

  it('calls Speech.speak with UK voice (en-GB)', () => {
    speak('Hello, world', 'uk');

    expect(Speech.speak).toHaveBeenCalledWith(
      'Hello, world',
      expect.objectContaining({
        language: 'en-GB',
        pitch: 0.8,
        rate: 0.95,
      })
    );
  });
});
