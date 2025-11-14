
export const STATUS_CODES = {
  P: { label: 'Presente', description: 'Servidor presente e trabalhando', color: 'text-green-300', bgColor: 'bg-green-500/20', borderColor: 'border-green-500' },
  D: { label: 'Dispensa', description: 'Dispensa ou afastamento', color: 'text-yellow-300', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500' },
  F: { label: 'Folga', description: 'Folga ou falta', color: 'text-red-300', bgColor: 'bg-red-500/20', borderColor: 'border-red-500' },
  AT: { label: 'Atestado', description: 'Atestado Médico', color: 'text-blue-300', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500' },
  FE: { label: 'Férias', description: 'Período de férias', color: 'text-purple-300', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-500' },
  EQP: { label: 'Equipamento', description: 'Manutenção de equipamento', color: 'text-indigo-300', bgColor: 'bg-indigo-500/20', borderColor: 'border-indigo-500' },
} as const;

export type StatusCode = keyof typeof STATUS_CODES;

export const STATUS_CODE_LIST = Object.keys(STATUS_CODES) as StatusCode[];
