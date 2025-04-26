import { generatePDF } from '../utils/pdfUtils';

// Mock expo-print and expo-sharing
jest.mock('expo-print', () => ({
  printToFileAsync: jest.fn().mockResolvedValue({ uri: 'mocked-file-uri' }),
}));

jest.mock('expo-sharing', () => ({
  shareAsync: jest.fn().mockResolvedValue(undefined),
}));

import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

describe('generatePDF', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls printToFileAsync with the correct HTML', async () => {
    await generatePDF('Hello Chemistry!');

    expect(printToFileAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        html: expect.stringContaining('Hello Chemistry!'),
        base64: false,
      })
    );
  });

  it('calls shareAsync with the file URI', async () => {
    await generatePDF('Hello Chemistry!');

    expect(shareAsync).toHaveBeenCalledWith('mocked-file-uri');
  });

  it('handles errors without crashing', async () => {
    (printToFileAsync as jest.Mock).mockRejectedValueOnce(
      new Error('Print failed')
    );

    await expect(generatePDF('Test')).resolves.not.toThrow();
  });
});
