import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Employee } from '../types';
import { STATUS_CODES, StatusCode, STATUS_CODE_LIST } from '../constants';
import { dateToDayOfYear } from '../utils/dateHelpers';

interface PersonnelTableProps {
  year: number;
  employees: Employee[];
  onScheduleChange: (employeeId: number, dayOfYear: number, status: StatusCode) => void;
  scrollToDate: Date | null;
}

interface EditingCell {
  employeeId: number;
  dayOfYear: number;
}

const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getDayHeaders = (year: number) => {
  const headers = [];
  const date = new Date(year, 0, 1);
  const daysInYear = isLeapYear(year) ? 366 : 365;
  for (let i = 0; i < daysInYear; i++) {
    headers.push({
      dayOfYear: i + 1,
      label: `${date.getDate()}`,
      month: date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
    });
    date.setDate(date.getDate() + 1);
  }
  return headers;
};

interface StatusPickerProps {
  onSelect: (status: StatusCode) => void;
  onClose: () => void;
}

const StatusPicker: React.FC<StatusPickerProps> = ({ onSelect, onClose }) => {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={pickerRef} className="absolute z-10 -translate-x-1/2 left-1/2 mt-2 w-48 bg-escala-dark-surface border border-gray-600 rounded-lg shadow-xl p-2 grid grid-cols-3 gap-2">
      {STATUS_CODE_LIST.map(code => (
        <button
          key={code}
          onClick={() => onSelect(code)}
          title={STATUS_CODES[code].label}
          className={`flex items-center justify-center p-2 h-10 w-10 rounded-md transition-all duration-150 transform hover:scale-110 ${STATUS_CODES[code].bgColor} ${STATUS_CODES[code].borderColor} border`}
        >
          <span className={`font-bold ${STATUS_CODES[code].color}`}>{code}</span>
        </button>
      ))}
    </div>
  );
};


const PersonnelTable: React.FC<PersonnelTableProps> = ({ year, employees, onScheduleChange, scrollToDate }) => {
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const dayHeaders = useMemo(() => getDayHeaders(year), [year]);
  
  useEffect(() => {
    if (scrollToDate && scrollContainerRef.current && scrollToDate.getFullYear() === year) {
        const dayOfYear = dateToDayOfYear(scrollToDate);
        const headerCell = scrollContainerRef.current.querySelector(`th[data-day-of-year='${dayOfYear}']`);

        if (headerCell instanceof HTMLElement) {
            const secondStickyHeader = scrollContainerRef.current.querySelector('th.sticky.left-\\[100px\\]');
            let stickyWidthOffset = 250; // A reasonable default
            if (secondStickyHeader instanceof HTMLElement) {
                stickyWidthOffset = secondStickyHeader.offsetLeft + secondStickyHeader.offsetWidth;
            }

            const targetScrollLeft = headerCell.offsetLeft - stickyWidthOffset - 20; // 20px margin

            scrollContainerRef.current.scrollTo({
                left: targetScrollLeft > 0 ? targetScrollLeft : 0,
                behavior: 'smooth'
            });
        }
    }
  }, [scrollToDate, year, employees]);

  const handleCellClick = (employeeId: number, dayOfYear: number) => {
    setEditingCell({ employeeId, dayOfYear });
  };

  const handleStatusSelect = (status: StatusCode) => {
    if (editingCell) {
      onScheduleChange(editingCell.employeeId, editingCell.dayOfYear, status);
      setEditingCell(null);
    }
  };

  const employeeInfoHeaders = [
    { key: 'bm', label: 'BM', sticky: true, className: 'min-w-[100px] sticky left-0 z-10' },
    { key: 'nomeFuncional', label: 'Nome Funcional', sticky: true, className: 'min-w-[150px] sticky left-[100px] z-10' },
    { key: 'cargo', label: 'Cargo', sticky: false, className: 'min-w-[150px]' },
    { key: 'escala', label: 'Escala', sticky: false, className: 'min-w-[100px]' },
    { key: 'codigo', label: 'Código', sticky: false, className: 'min-w-[80px]' },
    { key: 'proprio', label: 'Próprio', sticky: false, className: 'min-w-[300px]' },
    { key: 'inicio', label: 'Início', sticky: false, className: 'min-w-[80px]' },
    { key: 'porteArma', label: 'Porte', sticky: false, className: 'min-w-[80px]' },
    { key: 'sinarm', label: 'SINARM', sticky: false, className: 'min-w-[120px]' },
    { key: 'suspensao', label: 'Suspenso', sticky: false, className: 'min-w-[80px]' },
    { key: 'tipoRestricao', label: 'Restrição', sticky: false, className: 'min-w-[120px]' },
  ];

  const summaryHeaders = STATUS_CODE_LIST.map(code => ({ key: code, label: code }));
  
  const totalColumns = employeeInfoHeaders.length + dayHeaders.length + summaryHeaders.length;

  return (
    <div ref={scrollContainerRef} className="w-full overflow-auto border border-gray-700 rounded-lg bg-escala-dark-surface shadow-lg" style={{ maxHeight: 'calc(100vh - 320px)' }}>
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="sticky top-0 bg-escala-dark-surface z-20">
          <tr>
            {employeeInfoHeaders.map(h => (
              <th key={h.key} scope="col" className={`p-3 font-semibold tracking-wider text-gray-300 bg-escala-dark-surface border-b border-r border-gray-700 ${h.className}`}>
                {h.label}
              </th>
            ))}
            {dayHeaders.map(({ dayOfYear, label, month }) => (
              <th key={dayOfYear} scope="col" data-day-of-year={dayOfYear} className="p-0 font-semibold text-center text-gray-400 border-b border-r border-gray-700 w-10">
                <div className="text-xs pt-1">{month}</div>
                <div className="text-lg pb-1">{label}</div>
              </th>
            ))}
            {summaryHeaders.map(h => (
              <th key={`summary-${h.key}`} scope="col" className="p-3 font-semibold text-gray-300 bg-escala-dark-surface border-b border-r border-gray-700 min-w-[50px] sticky right-0">
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-escala-dark-surface/50">
          {(() => {
            let lastGroup: string | undefined | null = null;
            let lastProprio: string | null = null;
            let inViaturaGroup = false;
            
            return employees.map(employee => {
                const groupHeader = employee.group && employee.group !== lastGroup ? (
                    <tr className="bg-orange-600">
                        <td colSpan={totalColumns} className="p-2 font-bold text-white tracking-wider text-center text-lg">
                            {employee.group}
                        </td>
                    </tr>
                ) : null;

                let specialHeader = null;

                if (groupHeader) {
                    lastGroup = employee.group;
                    lastProprio = null; // Reset for the new group
                    inViaturaGroup = employee.group === 'DOBRA 1 NOITE';
                    if (inViaturaGroup) {
                        specialHeader = (
                             <tr className="bg-escala-secondary">
                                <td colSpan={totalColumns} className="p-2 font-bold text-white tracking-wider text-center">
                                    VIATURAS
                                </td>
                            </tr>
                        );
                    }
                } else if (!employee.group && lastGroup) {
                    lastGroup = null;
                    inViaturaGroup = false;
                }

                const proprioHeader = !inViaturaGroup && employee.proprio !== lastProprio ? (
                    <tr className="bg-escala-secondary">
                        <td colSpan={totalColumns} className="p-2 font-bold text-white tracking-wider text-left">
                            {employee.proprio}
                        </td>
                    </tr>
                ) : null;

                if (proprioHeader) {
                    lastProprio = employee.proprio;
                }

                const summary = STATUS_CODE_LIST.reduce((acc, code) => {
                    acc[code] = Object.values(employee.schedule).filter((s: StatusCode) => s === code).length;
                    return acc;
                }, {} as Record<StatusCode, number>);

                const employeeRow = (
                    <tr key={employee.id} className="hover:bg-escala-dark-surface/80 transition-colors duration-150">
                        {employeeInfoHeaders.map(h => (
                            <td key={`${employee.id}-${h.key}`} className={`p-3 border-b border-r border-gray-700 ${h.className} ${h.sticky ? 'bg-escala-dark-surface' : ''}`}>
                                {h.key === 'porteArma' || h.key === 'suspensao' ? (employee[h.key as keyof Employee] ? 'Sim' : 'Não') : (employee[h.key as keyof Employee] || 'N/A')}
                            </td>
                        ))}

                        {dayHeaders.map(({ dayOfYear }) => {
                            const status = employee.schedule[dayOfYear];
                            const statusInfo = status ? STATUS_CODES[status] : null;
                            const isEditing = editingCell?.employeeId === employee.id && editingCell?.dayOfYear === dayOfYear;

                            return (
                                <td key={`${employee.id}-${dayOfYear}`} className="p-0 border-b border-r border-gray-700 relative">
                                    <button
                                        onClick={() => handleCellClick(employee.id, dayOfYear)}
                                        className={`w-10 h-12 flex items-center justify-center font-mono font-bold text-center transition-colors ${statusInfo ? `${statusInfo.bgColor} ${statusInfo.color}` : 'hover:bg-gray-700'}`}
                                        aria-label={`Alterar status do dia ${dayOfYear} para ${employee.nomeFuncional}`}
                                    >
                                        {status || ''}
                                    </button>
                                    {isEditing && (
                                        <StatusPicker
                                            onSelect={handleStatusSelect}
                                            onClose={() => setEditingCell(null)}
                                        />
                                    )}
                                </td>
                            );
                        })}

                        {summaryHeaders.map(h => (
                            <td key={`summary-${employee.id}-${h.key}`} className="p-3 border-b border-r border-gray-700 font-semibold text-center sticky right-0 bg-escala-dark-surface">
                                {summary[h.key as StatusCode]}
                            </td>
                        ))}
                    </tr>
                );

                return (
                    <React.Fragment key={`fragment-${employee.id}`}>
                        {groupHeader}
                        {specialHeader}
                        {proprioHeader}
                        {employeeRow}
                    </React.Fragment>
                );
            });
          })()}
        </tbody>
      </table>
    </div>
  );
};

export default PersonnelTable;