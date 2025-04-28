import { cleanQuery } from '../utils/cleanQuery'; // adjusted path

describe('cleanQuery', () => {
  it('removes "what is" from the start of the query', () => {
    expect(cleanQuery('What is Chemistry?')).toBe('chemistry');
  });

  it('removes "tell me about" from the start of the query', () => {
    expect(cleanQuery('Tell me about atoms')).toBe('atoms');
  });

  it('removes "define" from the start of the query', () => {
    expect(cleanQuery('Define molecule')).toBe('molecule');
  });

  it('removes "how does" from the start of the query', () => {
    expect(cleanQuery('How does photosynthesis work?')).toBe(
      'photosynthesis work'
    );
  });

  it('removes "what does" from the start of the query', () => {
    expect(cleanQuery('What does an enzyme do?')).toBe('an enzyme do');
  });

  it('handles trailing question mark only', () => {
    expect(cleanQuery('Atoms?')).toBe('atoms');
  });

  it('returns lowercased and trimmed text', () => {
    expect(cleanQuery('   What is   Density?    ')).toBe('density');
  });

  it('returns unchanged query if no pattern matches', () => {
    expect(cleanQuery('simple statement')).toBe('simple statement');
  });
});
