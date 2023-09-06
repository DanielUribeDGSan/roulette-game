interface Props {
  oration: string;
}

export const Board = ({ oration }: Props) => {
  // Dividir la oración en palabras
  const words = oration.split(' ');

  // Funcíon para generar las rows
  const generateRow = (row: string[]) => {
    const rowText = row.join(' ');
    const emptySpaces = 14 - rowText.length;

    return (
      <>
        {rowText.split('').map((char, index) => (
          <div
            className={char.trim() !== '' ? 'square' : 'square empty'}
            key={`char_${index}`}
          >
            {char}
          </div>
        ))}
        {Array.from({ length: emptySpaces }, (_, index) => (
          <div className='square empty' key={`empty_${index}`}></div>
        ))}
      </>
    );
  };

  // Función para dividir las palabras en filas
  const divideWordsIntoRows = (words: string[]) => {
    const rows = [];
    let currentRow: string[] = [];
    let currentRowLength = 0;

    for (const word of words) {
      const wordLength = word.length;
      const wordWithSpaceLength = wordLength + 1;

      if (currentRowLength + wordWithSpaceLength <= 14) {
        currentRow.push(word);
        currentRowLength += wordWithSpaceLength;
      } else {
        rows.push(currentRow);
        currentRow = [word];
        currentRowLength = wordWithSpaceLength;
      }
    }

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  const rows = divideWordsIntoRows(words);

  return (
    <div className='board'>
      {rows.map((row, index) => (
        <div className='line' key={`line_${index}`}>
          {generateRow(row)}
        </div>
      ))}
    </div>
  );
};
