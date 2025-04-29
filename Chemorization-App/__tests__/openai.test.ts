import { getChemistryAnswer } from '../utils/openai';
import { OpenAI } from 'openai';

// Mock the OpenAI module
jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: 'Mocked chemistry answer',
                },
              },
            ],
          }),
        },
      },
    })),
  };
});

describe('getChemistryAnswer', () => {
  it('returns a mocked chemistry answer from OpenAI', async () => {
    const result = await getChemistryAnswer('What is an atom?');
    expect(result).toBe('Mocked chemistry answer');
  });
});