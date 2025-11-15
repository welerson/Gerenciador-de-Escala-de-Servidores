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
  { bm: '99332-1', cargo: 'GCD II', nomeFuncional: 'ANDRE MARCOS', rquica: 1935, porteArma: true, sinarm: 'A00074869', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G921', proprio: '- SUBINSPETORIA DE INSPEÇÃO OPERACIONAL - VENDA NOVA', inicio: '06:00', precedencia: 1, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87409-8', cargo: 'GCD II', nomeFuncional: 'ODAIR JOSE', rquica: 1349, porteArma: true, sinarm: 'A00079234', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G921', proprio: '- SUBINSPETORIA DE INSPEÇÃO OPERACIONAL - VENDA NOVA', inicio: '06:00', precedencia: 2, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80629-7', cargo: 'Subinspetor', nomeFuncional: 'MATEUS CARVALHO', rquica: 181, porteArma: true, sinarm: 'A00067065', suspensao: false, tipoRestricao: null, escala: '5X2', codigo: 'G995', proprio: 'GPE - SUBINSPETORIA DE PROTEÇÃO ESCOLAR - VENDA NOVA', inicio: '08:00', precedencia: 3, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87443-8', cargo: 'GCD II', nomeFuncional: 'RICARDO ANDRE', rquica: 1193, porteArma: true, sinarm: 'A00083823', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G995', proprio: 'GPE - SUBINSPETORIA DE PROTEÇÃO ESCOLAR - VENDA NOVA', inicio: '06:00', precedencia: 4, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '99271-6', cargo: 'GCD II', nomeFuncional: 'JACQUELINE', rquica: 1715, porteArma: true, sinarm: 'A00082600', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G931', proprio: 'ROPE - RONDA DE PROTEÇÃO ESCOLAR - VENDA NOVA', inicio: '06:00', precedencia: 5, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '315476-7', cargo: 'GCM III', nomeFuncional: 'MARCIO ELI', rquica: 2108, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G931', proprio: 'ROPE - RONDA DE PROTEÇÃO ESCOLAR - VENDA NOVA', inicio: '06:00', precedencia: 6, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80483-9', cargo: 'Subinspetor', nomeFuncional: 'SALVADOR', rquica: 157, porteArma: true, sinarm: 'A00071492', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G997', proprio: 'OP SUS - SUBINSPETORIA DE PROTEÇÃO SUS - VENDA NOVA', inicio: '07:00', precedencia: 7, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '99431-X', cargo: 'GCD II', nomeFuncional: 'OTAVIO', rquica: 1857, porteArma: true, sinarm: 'A00071375', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G997', proprio: 'OP SUS - SUBINSPETORIA DE PROTEÇÃO SUS - VENDA NOVA', inicio: '07:00', precedencia: 8, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '86141-7', cargo: 'GCD I', nomeFuncional: 'LAUDINEI', rquica: 298, porteArma: true, sinarm: 'A00161093', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G936', proprio: 'GPSUS - GRUPAMENTO PATRULHA SUS - VENDA NOVA', inicio: '07:00', precedencia: 9, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87334-2', cargo: 'GCD II', nomeFuncional: 'JUNIO OLIVEIRA', rquica: 1509, porteArma: true, sinarm: 'A00083782', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G936', proprio: 'GPSUS - GRUPAMENTO PATRULHA SUS - VENDA NOVA', inicio: '07:00', precedencia: 10, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87016-5', cargo: 'GCD II', nomeFuncional: 'CIRILO', rquica: 829, porteArma: true, sinarm: 'A00067045', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '06:00', precedencia: 11, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '86368-1', cargo: 'GCD II', nomeFuncional: 'SANTOS RIBEIRO', rquica: 906, porteArma: true, sinarm: 'A00070181', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '06:00', precedencia: 12, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '99433-6', cargo: 'GCD II', nomeFuncional: 'MARCO ANTONIO', rquica: 1756, porteArma: true, sinarm: 'A00075548', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G952', proprio: 'SEGURANÇA - INSPEToria VENDA NOVA', inicio: '06:00', precedencia: 13, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80634-3', cargo: 'GCD I', nomeFuncional: 'LOPES SOUZA', rquica: 759, porteArma: true, sinarm: 'A00086054', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '06:00', precedencia: 14, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87444-6', cargo: 'GCD II', nomeFuncional: 'AUGUSTO BARBOSA', rquica: 1369, porteArma: true, sinarm: 'A00078536', suspensao: true, tipoRestricao: 'RESISTÊNCIA 01/03/2025', escala: '12X36-D1', codigo: 'G973', proprio: 'INSPORTE - COORDENADORIA DE TRANSPORTE - VENDA NOVA', inicio: '06:00', precedencia: 15, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '99191-4', cargo: 'GCD II', nomeFuncional: 'FLAVIO MEDEIROS', rquica: 1621, porteArma: true, sinarm: 'A00074876', suspensao: false, tipoRestricao: 'FÍSICA 16/08/2025', escala: '12X36-D1', codigo: 'G971', proprio: 'INTENDENCIA - VENDA NOVA', inicio: '06:00', precedencia: 16, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '86189-1', cargo: 'GCD II', nomeFuncional: 'JUNIO LIMA', rquica: 954, porteArma: true, sinarm: 'A00160816', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: '9150', proprio: 'UNIDADE DE PRONTO ATENDIMENTO VENDA NOVA', inicio: '06:00', precedencia: 17, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87113-7', cargo: 'GCD II', nomeFuncional: 'CARLA OLIVEIRA', rquica: 1098, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: 'SEM PORTE', escala: '12X36-D1', codigo: '9150', proprio: 'UNIDADE DE PRONTO ATENDIMENTO VENDA NOVA', inicio: '06:00', precedencia: 18, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '322568-0', cargo: 'GCM III', nomeFuncional: 'LUIZ FELIPE', rquica: 2301, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '09:00', precedencia: 19, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '318627-8', cargo: 'GCM III', nomeFuncional: 'FELIPE MIRANDA', rquica: 2190, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '09:00', precedencia: 20, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '318735-5', cargo: 'GCM III', nomeFuncional: 'CAMILA', rquica: 2227, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '07:00', precedencia: 21, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '322682-2', cargo: 'GCM III', nomeFuncional: 'WELERSON FARIA', rquica: 2344, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '09:00', precedencia: 22, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '322603-2', cargo: 'GCM III', nomeFuncional: 'KAMILA TORRES', rquica: 2309, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '07:00', precedencia: 23, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '318804-1', cargo: 'GCM III', nomeFuncional: 'SOUZA JUNIOR', rquica: 2236, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '09:00', precedencia: 24, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '318835-1', cargo: 'GCM III', nomeFuncional: 'FREITAS MEDEIROS', rquica: 2232, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '09:00', precedencia: 25, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '318791-6', cargo: 'GCM III', nomeFuncional: 'LOMBARDE', rquica: 2242, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '09:00', precedencia: 26, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '315502-X', cargo: 'GCM III', nomeFuncional: 'LUCAS SANTOS', rquica: 2031, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '09:00', precedencia: 27, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87101-3', group: 'Dobra 1 - Noite', cargo: 'Subinspetor', nomeFuncional: 'ANTHONY', rquica: 61, porteArma: true, sinarm: 'A00159245', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G921', proprio: '- SUBINSPETORIA DE INSPEÇÃO OPERACIONAL - VENDA NOVA', inicio: '18:00', precedencia: 28, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '322400-5', group: 'Dobra 1 - Noite', cargo: 'GCM III', nomeFuncional: 'LUIZ HENRIQUE', rquica: 2390, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G921', proprio: '- SUBINSPETORIA DE INSPEÇÃO OPERACIONAL - VENDA NOVA', inicio: '18:00', precedencia: 29, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80862-1', group: 'Dobra 1 - Noite', cargo: 'GCD I', nomeFuncional: 'CASSIO SILVA', rquica: 560, porteArma: true, sinarm: 'A00151141', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G924', proprio: 'FISCOPE - FISCALIZAÇÃO OPERACIONAL - VENDA NOVA', inicio: '18:00', precedencia: 30, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80929-6', group: 'Dobra 1 - Noite', cargo: 'GCD I', nomeFuncional: 'CLEDSON', rquica: 640, porteArma: true, sinarm: 'A00068214', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G924', proprio: 'FISCOPE - FISCALIZAÇÃO OPERACIONAL - VENDA NOVA', inicio: '18:00', precedencia: 31, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87469-1', group: 'Dobra 1 - Noite', cargo: 'GCD II', nomeFuncional: 'ROGERIO WILLIAN', rquica: 1452, porteArma: true, sinarm: 'A00076466', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G932', proprio: 'JA - GRUPAMENTO DE PATRULHAMENTO RONDA - VENDA NOVA', inicio: '18:00', precedencia: 32, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '99263-5', group: 'Dobra 1 - Noite', cargo: 'GCD II', nomeFuncional: 'EDUARDO ALVES', rquica: 1772, porteArma: true, sinarm: 'A00080074', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G932', proprio: 'JA - GRUPAMENTO DE PATRULHAMENTO RONDA - VENDA NOVA', inicio: '18:00', precedencia: 33, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '99169-8', group: 'Dobra 1 - Noite', cargo: 'GCD II', nomeFuncional: 'MARCIO JUNIO', rquica: 1938, porteArma: true, sinarm: 'A00071454', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G932', proprio: 'JA - GRUPAMENTO DE PATRULHAMENTO RONDA - VENDA NOVA', inicio: '18:00', precedencia: 34, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80295-X', cargo: 'GCD I', nomeFuncional: 'OLIVEIRA JUNIOR', rquica: 479, porteArma: true, sinarm: 'A00077239', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '18:00', precedencia: 35, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '99187-6', cargo: 'GCD II', nomeFuncional: 'DILENE', rquica: 1664, porteArma: true, sinarm: 'A00079763', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '18:00', precedencia: 36, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '99392-5', cargo: 'GCD II', nomeFuncional: 'VALENTE', rquica: 1554, porteArma: true, sinarm: 'A00074050', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '18:00', precedencia: 37, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87470-5', cargo: 'GCD II', nomeFuncional: 'RONALDO ALVES', rquica: 1405, porteArma: true, sinarm: 'A00074852', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '18:00', precedencia: 38, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80891-5', cargo: 'GCD I', nomeFuncional: 'ARAUJO', rquica: 785, porteArma: true, sinarm: 'A00114513', suspensao: false, tipoRestricao: '12/11/2023', escala: '12X36-D1', codigo: 'G973', proprio: 'INSPORTE - COORDENADORIA DE TRANSPORTE - VENDA NOVA', inicio: '18:00', precedencia: 39, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '99405-0', cargo: 'GCD II', nomeFuncional: 'AGNALDO', rquica: 1531, porteArma: true, sinarm: 'A00067144', suspensao: false, tipoRestricao: 'RAMPAS RI', escala: '12X36-D1', codigo: 'G971', proprio: 'INTENDENCIA - VENDA NOVA', inicio: '18:00', precedencia: 40, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80979-2', cargo: 'GCD I', nomeFuncional: 'ALFREDO', rquica: 665, porteArma: true, sinarm: 'A00114529', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: '9150', proprio: 'UNIDADE DE PRONTO ATENDIMENTO VENDA NOVA', inicio: '18:00', precedencia: 41, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '99100-0', cargo: 'GCD II', nomeFuncional: 'NICODEMOS', rquica: 1684, porteArma: true, sinarm: 'A00072355', suspensao: false, tipoRestricao: null, escala: '12X36-D1', codigo: '9150', proprio: 'UNIDADE DE PRONTO ATENDIMENTO VENDA NOVA', inicio: '18:00', precedencia: 42, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '86323-1', group: 'DOBRA 2 DIA', cargo: 'Subinspetor', nomeFuncional: 'SANTOS', rquica: 90, porteArma: true, sinarm: 'A00074056', suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G921', proprio: '- SUBINSPETORIA DE INSPEÇÃO OPERACIONAL - VENDA NOVA', inicio: '06:00', precedencia: 43, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87253-2', group: 'DOBRA 2 DIA', cargo: 'GCD II', nomeFuncional: 'VELOSO', rquica: 1345, porteArma: true, sinarm: 'A00068570', suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G921', proprio: '- SUBINSPETORIA DE INSPEÇÃO OPERACIONAL - VENDA NOVA', inicio: '06:00', precedencia: 44, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80039-6', group: 'DOBRA 2 DIA', cargo: 'Subinspetor', nomeFuncional: 'JAIRO SANTOS', rquica: 132, porteArma: true, sinarm: 'A00074067', suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G997', proprio: 'OP SUS - SUBINSPETORIA DE PROTEÇÃO SUS - VENDA NOVA', inicio: '07:00', precedencia: 45, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80557-6', group: 'DOBRA 2 DIA', cargo: 'GCD I', nomeFuncional: 'EDERSON', rquica: 586, porteArma: true, sinarm: 'A00082182', suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G995', proprio: 'GPE - SUBINSPETORIA DE PROTEÇÃO ESCOLAR - VENDA NOVA', inicio: '06:00', precedencia: 46, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80997-0', group: 'DOBRA 2 DIA', cargo: 'GCD I', nomeFuncional: 'DOMINGOS SA', rquica: 239, porteArma: true, sinarm: 'A00145795', suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G931', proprio: 'ROPE - RONDA DE PROTEÇÃO ESCOLAR - VENDA NOVA', inicio: '06:00', precedencia: 47, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87345-8', group: 'DOBRA 2 DIA', cargo: 'GCD II', nomeFuncional: 'LEANDRO FABRICIO', rquica: 1113, porteArma: true, sinarm: 'A00070179', suspensao: false, tipoRestricao: null, escala: 'Escotismo-1', codigo: 'G931', proprio: 'ROPE - RONDA DE PROTEÇÃO ESCOLAR - VENDA NOVA', inicio: '06:00', precedencia: 48, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80505-3', group: 'DOBRA 2 DIA', cargo: 'GCD I', nomeFuncional: 'GIAN CARLO', rquica: 146, porteArma: true, sinarm: 'A00067692', suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G255', proprio: 'CURSO DE FORMAÇÃO E CAPACITAÇÃO 1 - DENESP', inicio: '06:00', precedencia: 49, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80084-1', group: 'DOBRA 2 DIA', cargo: 'GCD I', nomeFuncional: 'NATALICIO', rquica: 428, porteArma: true, sinarm: 'A00072416', suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G936', proprio: 'GPSUS - GRUPAMENTO PATRULHA SUS - VENDA NOVA', inicio: '07:00', precedencia: 50, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '86995-7', group: 'DOBRA 2 DIA', cargo: 'GCD II', nomeFuncional: 'ROQUE', rquica: 1347, porteArma: true, sinarm: 'A00073967', suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G936', proprio: 'GPSUS - GRUPAMENTO PATRULHA SUS - VENDA NOVA', inicio: '07:00', precedencia: 51, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '315380-9', group: 'DOBRA 2 DIA', cargo: 'GCM III', nomeFuncional: 'POLIANE', rquica: 2040, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G921', proprio: '- SUBINSPETORIA DE INSPEÇÃO OPERACIONAL - VENDA NOVA', inicio: '06:00', precedencia: 52, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80418-9', cargo: 'GCD I', nomeFuncional: 'G. SANTOS', rquica: 438, porteArma: true, sinarm: 'A00068677', suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '06:00', precedencia: 53, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80775-7', cargo: 'GCD I', nomeFuncional: 'JEFFERSON DIAS', rquica: 597, porteArma: true, sinarm: 'A00071458', suspensao: false, tipoRestricao: null, escala: '5X2', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '08:00', precedencia: 54, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87248-6', cargo: 'GCD II', nomeFuncional: 'TORRES AMARAL', rquica: 1136, porteArma: true, sinarm: 'A00071369', suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '06:00', precedencia: 55, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87110-2', cargo: 'GCD II', nomeFuncional: 'BRUNO ELIAS', rquica: 1236, porteArma: true, sinarm: 'A00067043', suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '06:00', precedencia: 56, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87370-9', cargo: 'GCD II', nomeFuncional: 'MADSON PAULO', rquica: 1252, porteArma: false, sinarm: null, suspensao: true, tipoRestricao: 'Física 30/07/2024', escala: '12X36-D2', codigo: 'G973', proprio: 'INSPORTE - COORDENADORIA DE TRANSPORTE - VENDA NOVA', inicio: '06:00', precedencia: 57, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '98995-2', cargo: 'GCD II', nomeFuncional: 'RONY HENRIQUE', rquica: 1900, porteArma: true, sinarm: 'A00161865', suspensao: false, tipoRestricao: '08/01/2024', escala: '12X36-D2', codigo: 'G971', proprio: 'INTENDENCIA - VENDA NOVA', inicio: '06:00', precedencia: 58, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '80671-8', cargo: 'GCD I', nomeFuncional: 'ROBERTO RUAS', rquica: 484, porteArma: false, sinarm: null, suspensao: true, tipoRestricao: null, escala: '12X36-D2', codigo: '9150', proprio: 'UNIDADE DE PRONTO ATENDIMENTO VENDA NOVA', inicio: '06:00', precedencia: 59, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '315468-6', cargo: 'GCM III', nomeFuncional: 'LUCAS EDUARDO', rquica: 2050, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: 'SEM PORTE', escala: '12X36-D2', codigo: '9150', proprio: 'UNIDADE DE PRONTO ATENDIMENTO VENDA NOVA', inicio: '06:00', precedencia: 60, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '318679-0', cargo: 'GCM III', nomeFuncional: 'CHRISTOPHER', rquica: 2151, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '5X2', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '08:00', precedencia: 61, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '322639-3', cargo: 'GCM III', nomeFuncional: 'RANGELIO', rquica: 2361, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: 'VIATURA', escala: '12X36-D1', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '06:00', precedencia: 62, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '318643-X', cargo: 'GCM III', nomeFuncional: 'NAVES', rquica: 2159, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '09:00', precedencia: 63, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '322546-X', cargo: 'GCM III', nomeFuncional: 'PEDRO EGIDIO', rquica: 2292, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '09:00', precedencia: 64, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '318905-6', cargo: 'GCM III', nomeFuncional: 'L. SANTOS', rquica: 2285, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '09:00', precedencia: 65, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '318727-4', cargo: 'GCM III', nomeFuncional: 'ONILIS', rquica: 2225, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '09:00', precedencia: 66, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '87077-7', cargo: 'GCD II', nomeFuncional: 'ALIPIO', rquica: 1086, porteArma: true, sinarm: 'A00070127', suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '06:00', precedencia: 67, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '322733-0', cargo: 'GCM III', nomeFuncional: 'MARIA ALMEIDA', rquica: 2323, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '06:00', precedencia: 68, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '322553-2', cargo: 'GCM III', nomeFuncional: 'ANA CLARA', rquica: 2331, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '06:00', precedencia: 69, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '315348-5', cargo: 'GCM III', nomeFuncional: 'ANDRE FERNANDES', rquica: 2117, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '09:00', precedencia: 70, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
  { bm: '318904-8', cargo: 'GCM III', nomeFuncional: 'J. OLIVEIRA', rquica: 2283, porteArma: false, sinarm: null, suspensao: false, tipoRestricao: null, escala: '12X36-D2', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '09:00', precedencia: 71, efetivoDiario: 'Sim', dobra1Dia: 'Não', viaturas: '', isActive: true },
];

const getInitialPersonnel = (): Omit<Employee, 'schedule'>[] => {
    try {
        const item = window.localStorage.getItem(PERSONNEL_STORAGE_KEY);
        if (item) {
            const parsed = JSON.parse(item);
            // Basic data migration: if old data is missing new fields, it will be overwritten on next save.
            // For now, just ensure isActive is present.
            if (parsed.length > 0 && parsed[0].bm !== undefined) {
                 return parsed.map((p: any) => ({ ...p, isActive: p.isActive !== undefined ? p.isActive : true }));
            }
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
