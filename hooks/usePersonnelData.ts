import { useState, useCallback, useEffect } from 'react';
import type { Employee, EmployeeData } from '../types';
import { StatusCode } from '../constants';

const PERSONNEL_STORAGE_KEY = 'personnel_data_v1';
const SCHEDULE_STORAGE_KEY_PREFIX = 'schedule_data_v1';

const isLeap = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const generateRandomSchedule = (year: number): { [dayOfYear: number]: StatusCode } => {
  const daysInYear = isLeap(year) ? 366 : 365;
  const schedule: { [dayOfYear: number]: StatusCode } = {};
  for (let i = 1; i <= daysInYear; i++) {
    const rand = Math.random();
    if (rand < 0.7) schedule[i] = 'P';
    else if (rand < 0.85) schedule[i] = 'F';
    else schedule[i] = 'D';
  }
  return schedule;
};

const initialEmployees: Omit<Employee, 'id' | 'schedule'>[] = [
  { nomeFuncional: 'Herverton', cargo: 'Inspetor Chefe', precedencia: 1, porteArma: true, sinarm: '123456-ABC', suspensao: false, tipoRestricao: null, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: 'VTR-01', isActive: true },
  { nomeFuncional: 'Silva', cargo: 'Inspetor', precedencia: 2, porteArma: true, sinarm: '789012-DEF', suspensao: false, tipoRestricao: null, efetivoDiario: 'Sim', dobra1Dia: 'Sim', viaturas: 'VTR-02', isActive: true },
  { nomeFuncional: 'Souza', cargo: 'Agente', precedencia: 3, porteArma: true, sinarm: '345678-GHI', suspensao: true, tipoRestricao: 'Administrativa', efetivoDiario: 'Não', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { nomeFuncional: 'Pereira', cargo: 'Agente', precedencia: 4, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, efetivoDiario: 'Sim', dobra1Dia: 'Sim', viaturas: 'VTR-03', isActive: true },
  { nomeFuncional: 'Oliveira', cargo: 'Técnico', precedencia: 5, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: 'Médica', efetivoDiario: 'Parcial', dobra1Dia: 'Não', viaturas: '', isActive: false },
];

const getInitialPersonnel = (): Omit<Employee, 'schedule'>[] => {
    try {
        const item = window.localStorage.getItem(PERSONNEL_STORAGE_KEY);
        if (item) {
            const parsed = JSON.parse(item);
            return parsed.map((p: any) => ({ ...p, isActive: p.isActive !== undefined ? p.isActive : true }));
        }
        const generatedInitialData = initialEmployees.map((emp, index) => ({...emp, id: index + 1 }));
        window.localStorage.setItem(PERSONNEL_STORAGE_KEY, JSON.stringify(generatedInitialData));
        return generatedInitialData;
    } catch (error) {
        console.error("Failed to load personnel from localStorage", error);
        return initialEmployees.map((emp, index) => ({...emp, id: index + 1 }));
    }
};

export const usePersonnelData = (year: number) => {
  const [personnel, setPersonnel] = useState<Omit<Employee, 'schedule'>[]>(getInitialPersonnel);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    try {
        window.localStorage.setItem(PERSONNEL_STORAGE_KEY, JSON.stringify(personnel));
    } catch (error) {
        console.error("Failed to save personnel to localStorage", error);
    }
  }, [personnel]);
  
  useEffect(() => {
    const getScheduleForEmployee = (employeeId: number, year: number) => {
      const key = `${SCHEDULE_STORAGE_KEY_PREFIX}_${employeeId}_${year}`;
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
            const parsed = JSON.parse(item);
            // In case of incompatible data from the reverted update, regenerate schedule
            if (typeof parsed['1'] === 'object' && parsed['1'] !== null) {
              throw new Error("Incompatible schedule format found.");
            }
            return parsed;
        }
      } catch (e) {
        console.error(`Failed to load schedule for emp ${employeeId}, year ${year}. Regenerating.`, e);
      }
      const newSchedule = generateRandomSchedule(year);
      window.localStorage.setItem(key, JSON.stringify(newSchedule));
      return newSchedule;
    };

    const employeesWithSchedules = personnel.map(p => ({
      ...p,
      schedule: getScheduleForEmployee(p.id, year),
    })).sort((a,b) => a.precedencia - b.precedencia);
    setEmployees(employeesWithSchedules);
  }, [personnel, year]);

  const updateSchedule = useCallback((employeeId: number, dayOfYear: number, status: StatusCode) => {
    setEmployees(currentEmployees => {
      const updatedEmployees = currentEmployees.map(emp => {
        if (emp.id === employeeId) {
          const newSchedule = { ...emp.schedule, [dayOfYear]: status };
          const key = `${SCHEDULE_STORAGE_KEY_PREFIX}_${employeeId}_${year}`;
          window.localStorage.setItem(key, JSON.stringify(newSchedule));
          return { ...emp, schedule: newSchedule };
        }
        return emp;
      });
      return updatedEmployees;
    });
  }, [year]);
  
  const addEmployee = useCallback((employeeData: EmployeeData) => {
    setPersonnel(currentPersonnel => {
        const newId = (currentPersonnel.length > 0 ? Math.max(...currentPersonnel.map(p => p.id)) : 0) + 1;
        const newEmployee = { ...employeeData, id: newId, isActive: true };
        return [...currentPersonnel, newEmployee];
    });
  }, []);

  const updateEmployee = useCallback((employeeId: number, employeeData: EmployeeData) => {
    setPersonnel(currentPersonnel => 
        currentPersonnel.map(emp => emp.id === employeeId ? { ...emp, ...employeeData } : emp)
    );
  }, []);
  
  const toggleEmployeeStatus = useCallback((employeeId: number) => {
    setPersonnel(currentPersonnel => 
      currentPersonnel.map(emp => 
        emp.id === employeeId ? { ...emp, isActive: !emp.isActive } : emp
      )
    );
  }, []);

  return { employees, addEmployee, updateEmployee, toggleEmployeeStatus, updateSchedule };
};