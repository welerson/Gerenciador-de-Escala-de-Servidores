import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Employee, DailySchedule } from '../types';
import { dateToDayOfYear } from '../utils/dateHelpers';
import { STATUS_CODES, STATUS_CODE_LIST, StatusCode } from '../constants';

interface OperationalCalendarProps {
  employees: Employee[];
  year: number;
  onSaveDay: (dayOfYear: number, updates: { employeeId: number, data: DailySchedule }[]) => void;
  onCopyDay: (fromDayOfYear: number, toDayOfYear: number) => void;
}

type DailyChanges = {
  [employeeId: number]: DailySchedule;
};

const OperationalCalendar: React.FC<OperationalCalendarProps> = ({ employees, year, onSaveDay, onCopyDay }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const today = new Date();
    return today.getFullYear() === year ? today : new Date(year, 0, 1);
  });

  const [dailyData, setDailyData] = useState<DailyChanges>({});
  const [isDirty, setIsDirty] = useState(false);

  const dayOfYear = useMemo(() => dateToDayOfYear(selectedDate), [selectedDate]);

  useEffect(() => {
    const initialData: DailyChanges = {};
    const defaultSchedule: DailySchedule = { status: 'P', viatura: '', dobra: '' };
    employees.forEach(emp => {
      initialData[emp.id] = emp.schedule[dayOfYear] || defaultSchedule;
    });
    setDailyData(initialData);
    setIsDirty(false); // Reset dirty state when date changes
  }, [dayOfYear, employees]);

  const handleDateChange = (dateString: string) => {
    if (isDirty) {
      if (!window.confirm("Você tem alterações não salvas. Deseja descartá-las?")) {
        return;
      }
    }
    const newDate = new Date(`${dateString}T00:00:00`);
    setSelectedDate(newDate);
  };
  
  const handleNavigateDay = (offset: number) => {
     if (isDirty) {
      if (!window.confirm("Você tem alterações não salvas. Deseja descartá-las?")) {
        return;
      }
    }
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + offset);
    setSelectedDate(newDate);
  }

  const handleInputChange = (employeeId: number, field: keyof DailySchedule, value: string) => {
    setDailyData(prev => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [field]: value
      }
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    const updates = Object.entries(dailyData).map(([employeeId, data]) => ({
      employeeId: Number(employeeId),
      data
    }));
    onSaveDay(dayOfYear, updates);
    setIsDirty(false);
  };

  const handleCopy = () => {
    const fromDateStr = window.prompt("Digite a data de origem para cópia (AAAA-MM-DD):");
    if (fromDateStr) {
        const fromDate = new Date(`${fromDateStr}T00:00:00`);
        if (!isNaN(fromDate.getTime()) && fromDate.getFullYear() === year) {
            const fromDayOfYear = dateToDayOfYear(fromDate);
            if (window.confirm(`Copiar a escala de ${fromDate.toLocaleDateString('pt-BR')} para ${selectedDate.toLocaleDateString('pt-BR')}? Isso irá sobrescrever os dados atuais.`)) {
                onCopyDay(fromDayOfYear, dayOfYear);
            }
        } else {
            alert("Data inválida. Por favor, use o formato AAAA-MM-DD e o ano corrente.");
        }
    }
  };


  return (
    <div className="bg-escala-dark-surface rounded-lg p-4 shadow-lg flex-grow flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
            <button onClick={() => handleNavigateDay(-1)} className="px-3 py-2 rounded-md bg-escala-primary hover:bg-escala-secondary transition-colors">&lt; Dia Anterior</button>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => handleDateChange(e.target.value)}
              className="bg-escala-dark-background border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-escala-secondary"
              min={`${year}-01-01`}
              max={`${year}-12-31`}
            />
            <button onClick={() => handleNavigateDay(1)} className="px-3 py-2 rounded-md bg-escala-primary hover:bg-escala-secondary transition-colors">Próximo Dia &gt;</button>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-sm">Copiar de Outro Dia</button>
            <button onClick={handleSave} disabled={!isDirty} className={`px-4 py-2 font-semibold rounded-lg transition-colors text-sm ${isDirty ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}>
                {isDirty ? 'Salvar Escala do Dia' : 'Salvo'}
            </button>
        </div>
      </div>

      <div className="overflow-auto flex-grow">
        <table className="w-full text-sm text-left">
          <thead className="sticky top-0 bg-escala-dark-surface z-10">
            <tr className="border-b border-gray-700">
              <th className="p-3 font-semibold text-gray-300 w-1/3">Nome Funcional</th>
              <th className="p-3 font-semibold text-gray-300">Status</th>
              <th className="p-3 font-semibold text-gray-300">Viatura</th>
              <th className="p-3 font-semibold text-gray-300">Dobra</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id} className="border-b border-gray-700 hover:bg-escala-dark-surface/80">
                <td className="p-2 font-medium">{employee.nomeFuncional}</td>
                <td className="p-2">
                  <select
                    value={dailyData[employee.id]?.status || ''}
                    onChange={(e) => handleInputChange(employee.id, 'status', e.target.value)}
                    className="w-full bg-escala-dark-background border border-gray-600 rounded-md p-1.5 text-gray-200 focus:ring-1 focus:ring-escala-secondary"
                  >
                    {STATUS_CODE_LIST.map(code => (
                      <option key={code} value={code}>{code} - {STATUS_CODES[code].label}</option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={dailyData[employee.id]?.viatura || ''}
                    onChange={(e) => handleInputChange(employee.id, 'viatura', e.target.value)}
                    className="w-full bg-escala-dark-background border border-gray-600 rounded-md p-1.5 text-gray-200 focus:ring-1 focus:ring-escala-secondary"
                  />
                </td>
                <td className="p-2">
                   <input
                    type="text"
                    value={dailyData[employee.id]?.dobra || ''}
                    onChange={(e) => handleInputChange(employee.id, 'dobra', e.target.value)}
                    className="w-full bg-escala-dark-background border border-gray-600 rounded-md p-1.5 text-gray-200 focus:ring-1 focus:ring-escala-secondary"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OperationalCalendar;