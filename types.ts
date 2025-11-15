import type { StatusCode } from './constants';

export interface Employee {
  id: number;
  bm: string;
  cargo: string;
  nomeFuncional: string;
  rquica: number | null;
  porteArma: boolean;
  sinarm: string | null;
  suspensao: boolean;
  tipoRestricao: string | null;
  escala: string;
  codigo: string;
  proprio: string;
  inicio: string;
  precedencia: number;
  efetivoDiario: string;
  dobra1Dia: string;
  viaturas: string;
  group?: string;
  isActive: boolean;
  schedule: { [dayOfYear: number]: StatusCode };
}

export type EmployeeData = Omit<Employee, 'id' | 'schedule' | 'isActive'>;