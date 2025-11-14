import type { StatusCode } from './constants';

export interface DailySchedule {
  status: StatusCode;
  viatura: string;
  dobra: string;
}

export interface Employee {
  id: number;
  cargo: string;
  nomeFuncional: string;
  precedencia: number;
  porteArma: boolean;
  sinarm: string | null;
  suspensao: boolean;
  tipoRestricao: string | null;
  efetivoDiario: string;
  dobra1Dia: string;
  viaturas: string;
  isActive: boolean;
  schedule: { [dayOfYear: number]: DailySchedule };
}

export type EmployeeData = Omit<Employee, 'id' | 'schedule' | 'isActive'>;