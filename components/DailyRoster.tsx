import React, { useState, useMemo } from 'react';
import type { Employee } from '../types';
import { dateToDayOfYear } from '../utils/dateHelpers';
import { STATUS_CODES } from '../constants';

interface DailyRosterProps {
  employees: Employee[];
  year: number;
}

const DailyRoster: React.FC<DailyRosterProps> = ({ employees, year }) => {
  const today = new Date();
  const initialDate = today.getFullYear() === year ? today : new Date(year, 0, 1);
  const [selectedDate, setSelectedDate] = useState(initialDate.toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="bg-escala-dark-surface rounded-lg p-4 mb-6 shadow">
      <h3 className="text-lg font-semibold text-white mb-3">Consultar Status do Servidor</h3>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
            <label htmlFor="roster-date" className="text-sm text-gray-400">Data:</label>
            <input
              type="date"
              id="roster-date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-escala-dark-background border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-escala-secondary"
              min={`${year}-01-01`}
              max={`${year}-12-31`}
            />
        </div>
        <div className="flex items-center gap-2 flex-grow w-full">
          <label htmlFor="search-agent" className="text-sm text-gray-400">Nome:</label>
          <input
            type="text"
            id="search-agent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                  <li key={emp.id} className="flex items-center justify-between bg-escala-dark-background/50 p-2 rounded-md">
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
