import React, { useMemo } from 'react';
import type { Employee } from '../types';
import { dateToDayOfYear } from '../utils/dateHelpers';
import { STATUS_CODES } from '../constants';

interface DailyRosterProps {
  employees: Employee[];
  year: number;
  selectedDate: string;
  onDateChange: (date: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLocateEmployee: (employeeId: number) => void;
}

const DailyRoster: React.FC<DailyRosterProps> = ({ 
  employees, 
  year, 
  selectedDate, 
  onDateChange,
  searchQuery,
  onSearchChange,
  onLocateEmployee
}) => {
  const dayOfYear = useMemo(() => {
    const date = new Date(`${selectedDate}T00:00:00`);
    if (date.getFullYear() !== year) return null;
    return dateToDayOfYear(date);
  }, [selectedDate, year]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return employees.filter(emp =>
      emp.nomeFuncional.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, employees]);

  const handleGoToToday = () => {
    const today = new Date();
    if (today.getFullYear() === year) {
      onDateChange(today.toISOString().split('T')[0]);
    } else {
      onDateChange(`${year}-01-01`);
    }
  };

  return (
    <div className="bg-escala-dark-surface rounded-lg p-4 mb-6 shadow">
      <h3 className="text-lg font-semibold text-white mb-3">Consultar Status e Navegar na Tabela</h3>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-wrap">
        <div className="flex items-center gap-2">
            <label htmlFor="roster-date" className="text-sm text-gray-400">Data:</label>
            <input
              type="date"
              id="roster-date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="bg-escala-dark-background border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-escala-secondary"
              min={`${year}-01-01`}
              max={`${year}-12-31`}
            />
        </div>
        <button
          onClick={handleGoToToday}
          className="px-4 py-2 bg-escala-primary hover:bg-escala-secondary text-white font-semibold rounded-lg shadow-md transition-colors duration-200 text-sm"
        >
          Ir para Hoje
        </button>
        <div className="flex items-center gap-2 flex-grow w-full sm:w-auto">
          <label htmlFor="search-agent" className="text-sm text-gray-400">Nome:</label>
          <input
            type="text"
            id="search-agent"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Digite para pesquisar o servidor..."
            className="w-full bg-escala-dark-background border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-escala-secondary"
          />
        </div>
      </div>

      {searchQuery.trim() && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          {searchResults.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {searchResults.map(emp => {
                const status = dayOfYear ? emp.schedule[dayOfYear] : undefined;
                const statusInfo = status ? STATUS_CODES[status] : { label: 'Não definido', color: 'text-gray-400', bgColor: 'bg-gray-700' };
                return (
                  <li 
                    key={emp.id} 
                    className="flex items-center justify-between bg-escala-dark-background/50 p-2 rounded-md cursor-pointer hover:bg-escala-secondary/50 transition-colors"
                    onClick={() => onLocateEmployee(emp.id)}
                    title={`Clique para localizar ${emp.nomeFuncional} na tabela`}
                  >
                    <span className="font-medium">{emp.nomeFuncional}</span>
                    <span className={`font-semibold px-2 py-1 rounded-md text-xs ${statusInfo.bgColor} ${statusInfo.color}`}>
                      {statusInfo.label} {status && `(${status})`}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-2 text-gray-500 text-center">Nenhum servidor encontrado com o nome "{searchQuery}".</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyRoster;