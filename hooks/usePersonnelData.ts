import { useState, useCallback, useEffect } from 'react';
import type { Employee, EmployeeData, DailySchedule } from '../types';
import { STATUS_CODES, StatusCode, STATUS_CODE_LIST } from '../constants';

const PERSONNEL_STORAGE_KEY = 'personnel_data_v1';
const SCHEDULE_STORAGE_KEY_PREFIX = 'schedule_data_v1';

const isLeap = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const generateRandomSchedule = (year: number): { [dayOfYear: number]: DailySchedule } => {
  const daysInYear = isLeap(year) ? 366 : 365;
  const schedule: { [dayOfYear: number]: DailySchedule } = {};
  for (let i = 1; i <= daysInYear; i++) {
    const rand = Math.random();
    let status: StatusCode;
    if (rand < 0.7) status = 'P';
    else if (rand < 0.85) status = 'F';
    else status = 'D';

    schedule[i] = {
      status,
      viatura: status === 'P' ? 'VTR-0' + Math.ceil(Math.random() * 4) : '',
      dobra: ''
    };
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
            const parsedSchedule = JSON.parse(item);
            // Backwards compatibility check: if schedule is just status codes, convert it
            const firstDay = parsedSchedule['1'];
            if (typeof firstDay === 'string') {
                const migratedSchedule: { [day: number]: DailySchedule } = {};
                Object.keys(parsedSchedule).forEach(day => {
                    migratedSchedule[parseInt(day)] = {
                        status: parsedSchedule[day] as StatusCode,
                        viatura: '',
                        dobra: ''
                    }
                });
                window.localStorage.setItem(key, JSON.stringify(migratedSchedule));
                return migratedSchedule;
            }
            return parsedSchedule;
        }
      } catch (e) {
        console.error(`Failed to load or migrate schedule for emp ${employeeId}, year ${year}`, e);
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

  const updateDaySchedule = useCallback((dayOfYear: number, updates: { employeeId: number, data: DailySchedule }[]) => {
      setEmployees(currentEmployees => {
          const updatedEmployees = [...currentEmployees];
          const employeeMap = new Map(updatedEmployees.map(e => [e.id, e]));

          updates.forEach(({ employeeId, data }) => {
              const employee = employeeMap.get(employeeId);
              if (employee) {
                  const newSchedule = { ...employee.schedule, [dayOfYear]: data };
                  const key = `${SCHEDULE_STORAGE_KEY_PREFIX}_${employeeId}_${year}`;
                  window.localStorage.setItem(key, JSON.stringify(newSchedule));
                  employee.schedule = newSchedule;
              }
          });
          return updatedEmployees;
      });
  }, [year]);

  const copyDaySchedule = useCallback((fromDayOfYear: number, toDayOfYear: number) => {
    setEmployees(currentEmployees => {
      return currentEmployees.map(employee => {
        const scheduleToCopy = employee.schedule[fromDayOfYear];
        if (scheduleToCopy) {
          const newSchedule = { ...employee.schedule, [toDayOfYear]: scheduleToCopy };
          const key = `${SCHEDULE_STORAGE_KEY_PREFIX}_${employee.id}_${year}`;
          window.localStorage.setItem(key, JSON.stringify(newSchedule));
          return { ...employee, schedule: newSchedule };
        }
        return employee;
      });
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

  return { employees, addEmployee, updateEmployee, toggleEmployeeStatus, updateDaySchedule, copyDaySchedule };
};