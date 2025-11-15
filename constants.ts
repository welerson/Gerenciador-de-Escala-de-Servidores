
export const STATUS_CODES = {
  P: { label: 'Presente', description: 'Servidor presente e trabalhando', color: 'text-gray-100', bgColor: 'bg-teal-700', borderColor: 'border-teal-600' },
  D: { label: 'Dispensa', description: 'Dispensa ou afastamento', color: 'text-gray-100', bgColor: 'bg-yellow-700', borderColor: 'border-yellow-600' },
  F: { label: 'Folga', description: 'Folga ou falta', color: 'text-gray-100', bgColor: 'bg-red-800', borderColor: 'border-red-700' },
  AT: { label: 'Atestado', description: 'Atestado Médico', color: 'text-gray-100', bgColor: 'bg-blue-800', borderColor: 'border-blue-700' },
  FE: { label: 'Férias', description: 'Período de férias', color: 'text-gray-100', bgColor: 'bg-purple-800', borderColor: 'border-purple-700' },
  EQP: { label: 'Equipamento', description: 'Manutenção de equipamento', color: 'text-gray-100', bgColor: 'bg-indigo-800', borderColor: 'border-indigo-700' },
} as const;

export type StatusCode = keyof typeof STATUS_CODES;

export const STATUS_CODE_LIST = Object.keys(STATUS_CODES) as StatusCode[];