import React, { useState, useMemo } from 'react';
import type { Employee, EmployeeData } from '../types';
import Modal from './Modal';
import PersonnelForm from './PersonnelForm';

interface ManagePersonnelModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  onAddEmployee: (data: EmployeeData) => void;
  onUpdateEmployee: (id: number, data: EmployeeData) => void;
  onToggleEmployeeStatus: (id: number) => void;
}

type EditingState = {
    mode: 'add';
} | {
    mode: 'edit';
    employee: Employee;
} | null;

type FilterStatus = 'all' | 'active' | 'inactive';

const ManagePersonnelModal: React.FC<ManagePersonnelModalProps> = ({ 
    isOpen, 
    onClose, 
    employees, 
    onAddEmployee, 
    onUpdateEmployee, 
    onToggleEmployeeStatus 
}) => {
  const [editingState, setEditingState] = useState<EditingState>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');

  const handleSave = (data: EmployeeData) => {
    if (editingState?.mode === 'add') {
      onAddEmployee(data);
    } else if (editingState?.mode === 'edit') {
      onUpdateEmployee(editingState.employee.id, data);
    }
    setEditingState(null);
  };

  const handleClose = () => {
    setEditingState(null);
    onClose();
  }

  const filteredEmployees = useMemo(() => {
    if (filter === 'active') return employees.filter(e => e.isActive);
    if (filter === 'inactive') return employees.filter(e => !e.isActive);
    return employees;
  }, [employees, filter]);

  const FilterButton: React.FC<{
    status: FilterStatus,
    label: string
  }> = ({ status, label }) => (
    <button 
        onClick={() => setFilter(status)}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${filter === status ? 'bg-escala-primary text-white' : 'bg-escala-dark-background hover:bg-gray-700'}`}
    >{label}</button>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Gerenciar Efetivo">
      {editingState ? (
        <PersonnelForm
          employeeToEdit={editingState.mode === 'edit' ? editingState.employee : undefined}
          onSave={handleSave}
          onCancel={() => setEditingState(null)}
        />
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 p-1 bg-escala-dark-surface rounded-lg">
                <FilterButton status="all" label="Todos" />
                <FilterButton status="active" label="Ativos" />
                <FilterButton status="inactive" label="Inativos" />
            </div>
            <button
              onClick={() => setEditingState({ mode: 'add'})}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 w-full sm:w-auto"
            >
              Adicionar Novo Servidor
            </button>
          </div>
          <div className="overflow-y-auto" style={{maxHeight: '60vh'}}>
            <table className="w-full text-sm text-left">
              <thead className="bg-escala-dark-surface/50 sticky top-0">
                <tr>
                  <th className="p-3">Nome Funcional</th>
                  <th className="p-3">Cargo</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? filteredEmployees.map(employee => (
                  <tr key={employee.id} className="border-b border-gray-700 hover:bg-escala-dark-surface/80">
                    <td className="p-3 font-medium">{employee.nomeFuncional}</td>
                    <td className="p-3 text-gray-400">{employee.cargo}</td>
                    <td className="p-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${employee.isActive ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'}`}>
                            {employee.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                    </td>
                    <td className="p-3 text-right space-x-3">
                      <button onClick={() => setEditingState({ mode: 'edit', employee})} className="font-medium text-blue-400 hover:text-blue-300 transition-colors">Editar</button>
                      <button 
                        onClick={() => onToggleEmployeeStatus(employee.id)} 
                        className={`font-medium transition-colors ${employee.isActive ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'}`}
                      >
                        {employee.isActive ? 'Desativar' : 'Ativar'}
                      </button>
                    </td>
                  </tr>
                )) : (
                    <tr>
                        <td colSpan={4} className="text-center p-8 text-gray-500">
                            Nenhum servidor encontrado com este filtro.
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ManagePersonnelModal;