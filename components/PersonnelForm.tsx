import React, { useState, useEffect } from 'react';
import type { Employee, EmployeeData } from '../types';

interface PersonnelFormProps {
  employeeToEdit?: Employee;
  onSave: (data: EmployeeData) => void;
  onCancel: () => void;
}

const getDefaultFormData = (): EmployeeData => ({
  nomeFuncional: '',
  cargo: '',
  precedencia: 99,
  porteArma: false,
  sinarm: '',
  suspensao: false,
  tipoRestricao: '',
  efetivoDiario: 'Sim',
  dobra1Dia: 'Não',
  viaturas: '',
});

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input 
            className="w-full bg-escala-dark-background border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-escala-secondary focus:border-escala-secondary"
            {...props} 
        />
    </div>
);

const CheckboxField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, checked, ...props }) => (
    <div className="flex items-center gap-2">
        <input 
            type="checkbox"
            className="h-4 w-4 rounded bg-escala-dark-background border-gray-600 text-escala-primary focus:ring-escala-secondary"
            checked={checked}
            {...props}
        />
         <label className="text-sm font-medium text-gray-300">{label}</label>
    </div>
);

const PersonnelForm: React.FC<PersonnelFormProps> = ({ employeeToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState<EmployeeData>(getDefaultFormData());

  useEffect(() => {
    if (employeeToEdit) {
      const { id, schedule, isActive, ...editableData } = employeeToEdit;
      setFormData(editableData);
    } else {
        setFormData(getDefaultFormData());
    }
  }, [employeeToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Nome Funcional" name="nomeFuncional" value={formData.nomeFuncional} onChange={handleChange} required />
        <InputField label="Cargo" name="cargo" value={formData.cargo} onChange={handleChange} required />
        <InputField label="Precedência Hierárquica" name="precedencia" type="number" value={formData.precedencia} onChange={handleNumberChange} required />
        <InputField label="Viaturas" name="viaturas" value={formData.viaturas || ''} onChange={handleChange} />
        <InputField label="Efetivo Diário" name="efetivoDiario" value={formData.efetivoDiario || ''} onChange={handleChange} />
        <InputField label="Dobra 1 Dia" name="dobra1Dia" value={formData.dobra1Dia || ''} onChange={handleChange} />
      </div>
      <div className="border-t border-gray-700 pt-6 space-y-4">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
             <CheckboxField label="Porte de Arma" name="porteArma" checked={formData.porteArma} onChange={handleChange} />
             {formData.porteArma && <InputField label="SINARM" name="sinarm" value={formData.sinarm || ''} onChange={handleChange} />}
             <CheckboxField label="Suspenso" name="suspensao" checked={formData.suspensao} onChange={handleChange} />
             <InputField label="Tipo de Restrição" name="tipoRestricao" value={formData.tipoRestricao || ''} onChange={handleChange} />
         </div>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 bg-escala-primary hover:bg-escala-secondary text-white font-semibold rounded-lg transition-colors">
          Salvar
        </button>
      </div>
    </form>
  );
};

export default PersonnelForm;