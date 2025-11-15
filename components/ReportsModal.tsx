import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Employee } from '../types';
import Modal from './Modal';
import { dateToDayOfYear } from '../utils/dateHelpers';
import { STATUS_CODES, STATUS_CODE_LIST, StatusCode } from '../constants';

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  year: number;
}

type ReportData = {
    employeeName: string;
    counts: Record<StatusCode, number>;
}[];

const ReportsModal: React.FC<ReportsModalProps> = ({ isOpen, onClose, employees, year }) => {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const firstDayOfYear = `${year}-01-01`;

  // Adjust end date if current year is not the selected year
  const lastDayOfYear = `${year}-12-31`;
  const defaultEndDate = (today.getFullYear() === year && todayString < lastDayOfYear) ? todayString : lastDayOfYear;
  
  const [startDate, setStartDate] = useState(firstDayOfYear);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const printableAreaRef = useRef<HTMLDivElement>(null);

  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<Set<number>>(new Set());
  const [isSelectorOpen, setSelectorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset state when modal is closed or year changes
    if (!isOpen) {
        setStartDate(firstDayOfYear);
        setEndDate(defaultEndDate);
        setSelectedEmployeeIds(new Set());
        setReportData(null);
        setSearchTerm('');
        setSelectorOpen(false);
    }
  }, [isOpen, year, firstDayOfYear, defaultEndDate]);

  const filteredEmployeesForSelector = useMemo(() => {
    if (!searchTerm) return employees;
    return employees.filter(emp => emp.nomeFuncional.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [employees, searchTerm]);

  const handleToggleEmployeeSelection = (id: number) => {
    setSelectedEmployeeIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        return newSet;
    });
  };

  const handleSelectAll = () => setSelectedEmployeeIds(new Set(employees.map(e => e.id)));
  const handleDeselectAll = () => setSelectedEmployeeIds(new Set());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setSelectorOpen(false);
      }
    };
    if (isSelectorOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSelectorOpen]);
  
  useEffect(() => {
    if(!isOpen) return;

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);
    
    if (start > end || !startDate || !endDate) {
        setReportData(null);
        return;
    }

    const dayOfYearMap: { [day: number]: boolean } = {};
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        if (d.getFullYear() === year) {
            dayOfYearMap[dateToDayOfYear(new Date(d))] = true;
        }
    }
    const daysInPeriod = Object.keys(dayOfYearMap).map(Number);
    
    const employeesForReport = selectedEmployeeIds.size === 0
        ? employees
        : employees.filter(e => selectedEmployeeIds.has(e.id));

    const data = employeesForReport.map(employee => {
        const counts = STATUS_CODE_LIST.reduce((acc, code) => {
            acc[code] = 0;
            return acc;
        }, {} as Record<StatusCode, number>);

        daysInPeriod.forEach(day => {
            const status = employee.schedule[day];
            if (status) {
                counts[status]++;
            }
        });
        
        return {
            employeeName: employee.nomeFuncional,
            counts: counts,
        };
    }).sort((a, b) => a.employeeName.localeCompare(b.employeeName));
    setReportData(data);
  }, [startDate, endDate, employees, year, selectedEmployeeIds, isOpen]);


  const handlePrint = () => {
    const printableContent = printableAreaRef.current?.innerHTML;
    if (printableContent) {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow?.document.write('<html><head><title>Relatório de Efetivo</title>');
        printWindow?.document.write(`
            <style>
                body { font-family: sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                h1, h2 { text-align: center; }
            </style>
        `);
        printWindow?.document.write('</head><body>');
        printWindow?.document.write(`<h1>Relatório de Presença e Ausência</h1>`);
        const formattedStartDate = startDate ? new Date(startDate+'T00:00:00').toLocaleDateString('pt-BR') : 'N/A';
        const formattedEndDate = endDate ? new Date(endDate+'T00:00:00').toLocaleDateString('pt-BR') : 'N/A';
        printWindow?.document.write(`<h2>Período: ${formattedStartDate} a ${formattedEndDate}</h2>`);
        printWindow?.document.write(printableContent);
        printWindow?.document.write('</body></html>');
        printWindow?.document.close();
        printWindow?.print();
    }
  };

  const handleExportCSV = () => {
    if (!reportData) return;

    const headers = ['Servidor', ...STATUS_CODE_LIST.map(code => STATUS_CODES[code].label)];
    const csvRows = [headers.join(',')];
    
    reportData.forEach(row => {
        const values = [row.employeeName.replace(/,/g, ''), ...STATUS_CODE_LIST.map(code => row.counts[code])];
        csvRows.push(values.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([`\uFEFF${csvString}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${startDate}_a_${endDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  const isDateRangeInvalid = new Date(`${startDate}T00:00:00`) > new Date(`${endDate}T00:00:00`);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gerar Relatórios">
        <div className="space-y-4">
            <h4 className="font-semibold text-gray-300">Filtros do Relatório</h4>
            <div className="flex flex-col gap-4 bg-escala-dark-background/50 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="start-date" className="block text-sm font-medium text-gray-300 mb-1">Data Inicial</label>
                        <input type="date" id="start-date" value={startDate} onChange={e => setStartDate(e.target.value)} min={`${year}-01-01`} max={`${year}-12-31`} className="w-full bg-escala-dark-background border border-gray-600 rounded-md p-2 text-gray-200" />
                    </div>
                     <div>
                        <label htmlFor="end-date" className="block text-sm font-medium text-gray-300 mb-1">Data Final</label>
                        <input type="date" id="end-date" value={endDate} onChange={e => setEndDate(e.target.value)} min={`${year}-01-01`} max={`${year}-12-31`} className="w-full bg-escala-dark-background border border-gray-600 rounded-md p-2 text-gray-200" />
                    </div>
                </div>
                 <div className="relative" ref={selectorRef}>
                    <label htmlFor="employee-selector-btn" className="block text-sm font-medium text-gray-300 mb-1">Servidores (opcional)</label>
                    <button 
                        id="employee-selector-btn"
                        type="button" 
                        onClick={() => setSelectorOpen(o => !o)} 
                        className="w-full text-left p-2 bg-escala-dark-background border border-gray-600 rounded-md flex justify-between items-center"
                        aria-haspopup="listbox"
                        aria-expanded={isSelectorOpen}
                    >
                        <span>
                            {selectedEmployeeIds.size === 0 ? 'Todos os servidores' : `${selectedEmployeeIds.size} servidor(es) selecionado(s)`}
                        </span>
                        <svg className={`w-5 h-5 transition-transform ${isSelectorOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {isSelectorOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-escala-dark-surface border border-gray-600 rounded-md shadow-lg max-h-60 flex flex-col">
                            <div className="p-2 border-b border-gray-700 sticky top-0 bg-escala-dark-surface">
                                <input type="search" placeholder="Buscar servidor..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full p-2 bg-escala-dark-background border border-gray-600 rounded-md text-sm" />
                                <div className="flex justify-between mt-2 px-1">
                                    <button onClick={handleSelectAll} className="text-sm text-blue-400 hover:underline">Selecionar Todos</button>
                                    <button onClick={handleDeselectAll} className="text-sm text-blue-400 hover:underline">Limpar</button>
                                </div>
                            </div>
                            <ul className="overflow-y-auto" role="listbox">
                                {filteredEmployeesForSelector.map(emp => (
                                    <li 
                                        key={emp.id} 
                                        className="p-2 hover:bg-escala-secondary/50 cursor-pointer flex items-center gap-3" 
                                        onClick={() => handleToggleEmployeeSelection(emp.id)}
                                        role="option"
                                        aria-selected={selectedEmployeeIds.has(emp.id)}
                                    >
                                        <input type="checkbox" checked={selectedEmployeeIds.has(emp.id)} readOnly className="h-4 w-4 rounded bg-escala-dark-background border-gray-500 text-escala-primary focus:ring-escala-secondary pointer-events-none" />
                                        <span className="text-sm">{emp.nomeFuncional}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            
            {isDateRangeInvalid && <p className="text-center text-yellow-400 text-sm">A data inicial não pode ser maior que a data final.</p>}

            {reportData && reportData.length > 0 && !isDateRangeInvalid ? (
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-300">Resultado do Relatório</h4>
                        <div className="flex gap-2">
                            <button onClick={handlePrint} className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg text-sm">Imprimir</button>
                            <button onClick={handleExportCSV} className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-sm">Exportar CSV</button>
                        </div>
                    </div>
                    <div className="overflow-auto max-h-[50vh] border border-gray-700 rounded-lg" ref={printableAreaRef}>
                        <table className="w-full text-sm text-left">
                            <thead className="sticky top-0 bg-escala-dark-surface z-10">
                                <tr>
                                    <th className="p-2 font-semibold border-b border-r border-gray-700">Servidor</th>
                                    {STATUS_CODE_LIST.map(code => (
                                        <th key={code} className="p-2 font-semibold text-center border-b border-r border-gray-700" title={STATUS_CODES[code].label}>{code}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-escala-dark-surface/50">
                                {reportData.map(row => (
                                    <tr key={row.employeeName} className="border-b border-gray-700">
                                        <td className="p-2 border-r border-gray-700">{row.employeeName}</td>
                                        {STATUS_CODE_LIST.map(code => (
                                            <td key={code} className="p-2 text-center border-r border-gray-700">{row.counts[code]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center p-8 text-gray-500">
                     <p>{!isDateRangeInvalid ? "Nenhum servidor corresponde aos filtros selecionados." : ""}</p>
                </div>
            )}
        </div>
    </Modal>
  );
};

export default ReportsModal;
