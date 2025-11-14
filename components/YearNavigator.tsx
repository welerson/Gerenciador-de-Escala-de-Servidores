
import React from 'react';

interface YearNavigatorProps {
  year: number;
  setYear: (year: number) => void;
}

const YearNavigator: React.FC<YearNavigatorProps> = ({ year, setYear }) => {
  return (
    <div className="flex items-center gap-2 bg-escala-dark-surface p-2 rounded-lg">
      <button
        onClick={() => setYear(year - 1)}
        className="px-3 py-1 w-10 h-10 flex items-center justify-center rounded-md bg-escala-primary hover:bg-escala-secondary transition-colors text-white"
        aria-label="Ano anterior"
      >
        &lt;
      </button>
      <span className="font-bold text-lg w-20 text-center">{year}</span>
      <button
        onClick={() => setYear(year + 1)}
        className="px-3 py-1 w-10 h-10 flex items-center justify-center rounded-md bg-escala-primary hover:bg-escala-secondary transition-colors text-white"
        aria-label="Próximo ano"
      >
        &gt;
      </button>
    </div>
  );
};

export default YearNavigator;
