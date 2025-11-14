import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import StatusLegend from './components/StatusLegend';
import YearNavigator from './components/YearNavigator';
import { usePersonnelData } from './hooks/usePersonnelData';
import ManagePersonnelModal from './components/ManagePersonnelModal';
import ReportsModal from './components/ReportsModal';
import OperationalCalendar from './components/OperationalCalendar';

const App: React.FC = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const { 
    employees, 
    addEmployee, 
    updateEmployee, 
    toggleEmployeeStatus,
    updateDaySchedule,
    copyDaySchedule
  } = usePersonnelData(year);

  const [isManageModalOpen, setManageModalOpen] = useState(false);
  const [isReportsModalOpen, setReportsModalOpen] = useState(false);

  const activeEmployees = useMemo(() => employees.filter(e => e.isActive), [employees]);

  return (
    <div className="min-h-screen bg-escala-dark-background font-sans flex flex-col">
      <Header 
        onManagePersonnelClick={() => setManageModalOpen(true)} 
        onReportsClick={() => setReportsModalOpen(true)}
      />
      <main className="p-4 md:p-6 lg:p-8 flex-grow">
        <div className="max-w-full mx-auto h-full flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <YearNavigator year={year} setYear={setYear} />
            <StatusLegend />
          </div>

          {activeEmployees.length > 0 ? (
            <OperationalCalendar
              key={year} // Re-mount component when year changes
              employees={activeEmployees}
              year={year}
              onSaveDay={updateDaySchedule}
              onCopyDay={copyDaySchedule}
            />
          ) : (
            <div className="text-center py-16 bg-escala-dark-surface rounded-lg mt-6">
              <h2 className="text-xl text-gray-400">Nenhum servidor ativo cadastrado.</h2>
              <p className="text-gray-500 mt-2">Clique em "Gerenciar Efetivo" para adicionar um novo servidor ou ativar um existente.</p>
            </div>
          )}
        </div>
      </main>
      <ManagePersonnelModal
        isOpen={isManageModalOpen}
        onClose={() => setManageModalOpen(false)}
        employees={employees}
        onAddEmployee={addEmployee}
        onUpdateEmployee={updateEmployee}
        onToggleEmployeeStatus={toggleEmployeeStatus}
      />
      <ReportsModal
        isOpen={isReportsModalOpen}
        onClose={() => setReportsModalOpen(false)}
        employees={employees}
        year={year}
      />
       <footer className="text-center p-4 text-xs text-gray-500">
          <p>Desenvolvido para Inspetoria Venda Nova. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;