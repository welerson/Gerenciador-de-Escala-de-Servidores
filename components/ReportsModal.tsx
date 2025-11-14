import React, { useState, useMemo, useRef } from 'react';
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
  const today = new Date().toISOString().split('T')[0];
  const firstDayOfYear = `${year}-01-01`;
  const [startDate, setStartDate] = useState(firstDayOfYear);
  const [endDate, setEndDate] = useState(today > `${year}-12-31` ? `${year}-12-31` : today);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const printableAreaRef = useRef<HTMLDivElement>(null);


  const handleGenerateReport = () => {
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);
    
    if (start > end) {
        alert("A data inicial não pode ser maior que a data final.");
        return;
    }

    const dayOfYearMap: { [day: number]: boolean } = {};
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        if (d.getFullYear() === year) {
            dayOfYearMap[dateToDayOfYear(new Date(d))] = true;
        }
    }
    const daysInPeriod = Object.keys(dayOfYearMap).map(Number);
    
    const data = employees.map(employee => {
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
    });
    setReportData(data);
  };

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
        printWindow?.document.write(`<h2>Período: ${new Date(startDate+'T00:00:00').toLocaleDateString('pt-BR')} a ${new Date(endDate+'T00:00:00').toLocaleDateString('pt-BR')}</h2>`);
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
        const values = [row.employeeName, ...STATUS_CODE_LIST.map(code => row.counts[code])];
        csvRows.push(values.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${startDate}_a_${endDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gerar Relatórios">
        <div className="space-y-4">
            <h4 className="font-semibold text-gray-300">Relatório de Presença/Ausência por Período</h4>
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-escala-dark-background/50 p-4 rounded-lg">
                <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-300 mb-1">Data Inicial</label>
                    <input type="date" id="start-date" value={startDate} onChange={e => setStartDate(e.target.value)} min={`${year}-01-01`} max={`${year}-12-31`} className="bg-escala-dark-background border border-gray-600 rounded-md p-2 text-gray-200" />
                </div>
                 <div>
                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-300 mb-1">Data Final</label>
                    <input type="date" id="end-date" value={endDate} onChange={e => setEndDate(e.target.value)} min={`${year}-01-01`} max={`${year}-12-31`} className="bg-escala-dark-background border border-gray-600 rounded-md p-2 text-gray-200" />
                </div>
                <button onClick={handleGenerateReport} className="self-end px-4 py-2 bg-escala-primary hover:bg-escala-secondary text-white font-semibold rounded-lg transition-colors">
                    Gerar
                </button>
            </div>
            
            {reportData && (
                <div>
                    <div className="flex justify-end gap-2 mb-2">
                        <button onClick={handlePrint} className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg text-sm">Imprimir</button>
                        <button onClick={handleExportCSV} className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-sm">Exportar CSV</button>
                    </div>
                    <div className="overflow-auto max-h-[50vh]" ref={printableAreaRef}>
                        <table className="w-full text-sm text-left">
                            <thead className="sticky top-0 bg-escala-dark-surface">
                                <tr>
                                    <th className="p-2 font-semibold">Servidor</th>
                                    {STATUS_CODE_LIST.map(code => (
                                        <th key={code} className="p-2 font-semibold text-center" title={STATUS_CODES[code].label}>{code}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-escala-dark-surface/50">
                                {reportData.map(row => (
                                    <tr key={row.employeeName} className="border-b border-gray-700">
                                        <td className="p-2">{row.employeeName}</td>
                                        {STATUS_CODE_LIST.map(code => (
                                            <td key={code} className="p-2 text-center">{row.counts[code]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    </Modal>
  );
};

export default ReportsModal;