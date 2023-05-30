export function formatTitle(title, MAX_LENGTH = 12) {
    const lines = [];
    let startIndex = 0;
    
    // Iterate over the title and split it into substrings of length MAX_LENGTH
    while (startIndex < title.length) {
      const endIndex = Math.min(startIndex + MAX_LENGTH, title.length);
      const line = title.substring(startIndex, endIndex);
      lines.push(line);
      startIndex += MAX_LENGTH;
    }
    
    return lines;
  }