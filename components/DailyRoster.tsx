import React, { useState, useMemo } from 'react';
import type { Employee } from '../types';
import { dateToDayOfYear } from '../utils/dateHelpers';

interface DailyRosterProps {
  employees: Employee[];
  year: number;
}

const DailyRoster: React.FC<DailyRosterProps> = ({ employees, year }) => {
  const today = new Date();
  // Ensure the date picker doesn't default to a different year
  const initialDate = today.getFullYear() === year ? today : new Date(year, 0, 1);
  const [selectedDate, setSelectedDate] = useState(initialDate.toISOString().split('T')[0]);

  const roster = useMemo(() => {
    const date = new Date(`${selectedDate}T00:00:00`);
    if (date.getFullYear() !== year) return [];
    
    const day = dateToDayOfYear(date);
    return employees.filter(emp => emp.schedule[day] === 'P');
  }, [selectedDate, employees, year]);

  return (
    <div className="bg-escala-dark-surface rounded-lg p-4 mb-6 shadow">
      <h3 className="text-lg font-semibold text-white mb-3">Efetivo do Dia</h3>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
            <label htmlFor="roster-date" className="text-sm text-gray-400">Selecione a data:</label>
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
        <p className="font-bold text-lg text-escala-primary">
            Total: {roster.length}
        </p>
      </div>

      {roster.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 text-sm">
          {roster.map(emp => (
            <li key={emp.id} className="bg-escala-dark-background/50 p-2 rounded-md truncate" title={emp.nomeFuncional}>
              {emp.nomeFuncional}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-500">Nenhum servidor presente na data selecionada.</p>
      )}
    </div>
  );
};

export default DailyRoster;