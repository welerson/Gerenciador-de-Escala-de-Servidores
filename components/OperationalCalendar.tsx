import React from 'react';

const rosterData = [
  {
    subgroup: 'VIATURAS',
    bm: '80030-2',
    cargo: 'Subinspetor',
    nome: 'SOUZA DIAS',
    rquica: '129',
    sinarm: 'A00067621',
    obs1: '',
    obs2: '',
    escala: '12X36-D2',
    codigo: 'G921',
    proprio: '- SUBINSPETORIA DE INSPEÇÃO OPERACIONAL - VENDA NOVA',
    inicio: '18:00',
    highlighted: true,
  },
  {
    subgroup: 'VIATURAS',
    bm: '86971-X',
    cargo: 'GCD II',
    nome: 'ADILZA',
    rquica: '1376',
    sinarm: 'A00068203',
    obs1: '',
    obs2: '',
    escala: '12X36-D2',
    codigo: 'G921',
    proprio: '- SUBINSPETORIA DE INSPEÇÃO OPERACIONAL - VENDA NOVA',
    inicio: '18:00',
    highlighted: true,
  },
  {
    subgroup: 'VIATURAS',
    bm: '86122-0',
    cargo: 'GCD I',
    nome: 'ALCINIO',
    rquica: '297',
    sinarm: 'A00074105',
    obs1: '',
    obs2: '',
    escala: '12X36-D2',
    codigo: 'G924',
    proprio: 'FISCOPE - FISCALIZAÇÃO OPERACIONAL - VENDA NOVA',
    inicio: '18:00',
    highlighted: true,
  },
  {
    subgroup: 'VIATURAS',
    bm: '99329-1',
    cargo: 'GCD II',
    nome: 'ALDAIR FERNANDES',
    rquica: '1834',
    sinarm: 'A00072763',
    obs1: '',
    obs2: '',
    escala: '12X36-D2',
    codigo: 'G924',
    proprio: 'FISCOPE - FISCALIZAÇÃO OPERACIONAL - VENDA NOVA',
    inicio: '18:00',
    highlighted: true,
  },
  {
    subgroup: 'VIATURAS',
    bm: '86152-2',
    cargo: 'GCD II',
    nome: 'ALECRIM',
    rquica: '1475',
    sinarm: 'A00079377',
    obs1: '',
    obs2: '',
    escala: '12X36-D2',
    codigo: 'G932',
    proprio: 'JA - GRUPAMENTO DE PATRULHAMENTO RONDA - VENDA NOVA',
    inicio: '18:00',
    highlighted: true,
  },
  {
    subgroup: 'VIATURAS',
    bm: '80774-9',
    cargo: 'GCD I',
    nome: 'GUIEIRO',
    rquica: '514',
    sinarm: 'A00074290',
    obs1: '',
    obs2: '',
    escala: '12X36-D2',
    codigo: 'G932',
    proprio: 'JA - GRUPAMENTO DE PATRULHAMENTO RONDA - VENDA NOVA',
    inicio: '18:00',
    highlighted: true,
  },
  {
    subgroup: 'SEGURANÇA DA BASE',
    bm: '80072-8',
    cargo: 'GCD I',
    nome: 'LEANDRO SANTOS',
    rquica: '577',
    sinarm: 'A00068234',
    obs1: '',
    obs2: '',
    escala: '12X36-D2',
    codigo: 'G952',
    proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA',
    inicio: '18:00',
    highlighted: false,
  },
  {
    subgroup: 'SEGURANÇA DA BASE',
    bm: '80472-3',
    cargo: 'GCD I',
    nome: 'VARGAS',
    rquica: '504',
    sinarm: 'A00082262',
    obs1: '',
    obs2: '',
    escala: '12X36-D2',
    codigo: 'G952',
    proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA',
    inicio: '18:00',
    highlighted: false,
  },
  {
    subgroup: 'SEGURANÇA DA BASE',
    bm: '98876-X',
    cargo: 'GCD II',
    nome: 'SANTOS SANTANA',
    rquica: '1596',
    sinarm: 'A00067610',
    obs1: 'AMENTO, L',
    obs2: '17/03/2024',
    escala: '12X36-D2',
    codigo: 'G952',
    proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA',
    inicio: '18:00',
    highlighted: true,
  },
  {
    subgroup: 'SEGURANÇA DA BASE',
    bm: '98928-6',
    cargo: 'GCD II',
    nome: 'W ROCHA',
    rquica: '1802',
    sinarm: 'A00079858',
    obs1: '',
    obs2: '',
    escala: '12X36-D2',
    codigo: 'G952',
    proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA',
    inicio: '18:00',
    highlighted: true,
  },
  {
    subgroup: 'SEGURANÇA DA BASE',
    bm: '99446-8',
    cargo: 'GCD II',
    nome: 'ARCANJO',
    rquica: '1953',
    sinarm: 'A00091053',
    obs1: '',
    obs2: '',
    escala: '12X36-D2',
    codigo: 'G952',
    proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA',
    inicio: '18:00',
    highlighted: true,
  },
  {
    subgroup: 'INTENDÊNCIA',
    bm: '86446-7',
    cargo: 'GCD II',
    nome: 'GUEDES',
    rquica: '895',
    sinarm: 'A00069423',
    obs1: '24/07/2024',
    obs2: '',
    escala: '12X36-D2',
    codigo: 'G971',
    proprio: 'INTENDENCIA - VENDA NOVA',
    inicio: '18:00',
    highlighted: false,
  },
  {
    subgroup: 'INTENDÊNCIA',
    bm: '87347-4',
    cargo: 'GCD II',
    nome: 'LEANDRO MELO',
    rquica: '1367',
    sinarm: 'A00069482',
    obs1: '20/06/2023',
    obs2: '',
    escala: '5X2',
    codigo: 'G973',
    proprio: 'NSPORTE - COORDENADORIA DE TRANSPORTE - VENDA NOVA',
    inicio: '08:00',
    highlighted: false,
  },
  {
    subgroup: 'UPA VN',
    bm: '87596-5',
    cargo: 'GCD II',
    nome: 'MARCELINO',
    rquica: '1359',
    sinarm: 'A00071417',
    obs1: '',
    obs2: '',
    escala: '12X36-D2',
    codigo: '9150',
    proprio: 'UNIDADE DE PRONTO ATENDIMENTO VENDA NOVA',
    inicio: '18:00',
    highlighted: false,
  },
  {
    subgroup: 'UPA VN',
    bm: '99358-5',
    cargo: 'GCD II',
    nome: 'ROGERIO SILVA',
    rquica: '1612',
    sinarm: 'A00074190',
    obs1: '',
    obs2: '',
    escala: '12X36-D2',
    codigo: '9150',
    proprio: 'UNIDADE DE PRONTO ATENDIMENTO VENDA NOVA',
    inicio: '18:00',
    highlighted: false,
  },
];


const OperationalCalendar: React.FC = () => {
    let lastSubgroup = '';
    const dateRegex = /\d{2}\/\d{2}\/\d{4}/;

    return (
        <div className="p-4 bg-escala-dark-background text-gray-200">
            <table className="min-w-full text-xs text-left border-collapse border border-gray-600">
                <thead>
                    <tr className="bg-orange-500">
                        <th colSpan={11} className="p-2 font-bold text-white text-center text-base tracking-wider border-r border-gray-600">
                            DOBRA 2 NOITE
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rosterData.map((employee) => {
                        const subgroupHeader = employee.subgroup !== lastSubgroup ? (
                            <tr key={`subgroup-${employee.subgroup}`} className="bg-escala-secondary">
                                <td colSpan={11} className="p-1 font-bold text-white text-center border-t border-b border-gray-600">
                                    {employee.subgroup}
                                </td>
                            </tr>
                        ) : null;
                        lastSubgroup = employee.subgroup;

                        const isObs1Date = dateRegex.test(employee.obs1);
                        const isObs2Date = dateRegex.test(employee.obs2);
                        
                        return (
                            <React.Fragment key={employee.bm}>
                                {subgroupHeader}
                                <tr className={employee.highlighted ? 'bg-pink-900/50' : 'bg-escala-dark-surface/50'}>
                                    <td className="p-1 border border-gray-700">{employee.bm}</td>
                                    <td className="p-1 border border-gray-700">{employee.cargo}</td>
                                    <td className="p-1 border border-gray-700">{employee.nome}</td>
                                    <td className="p-1 border border-gray-700 text-center">{employee.rquica}</td>
                                    <td className="p-1 border border-gray-700">{employee.sinarm}</td>
                                    <td className={`p-1 border border-gray-700 ${isObs1Date ? 'bg-green-800/60' : ''}`}>
                                        {employee.obs1}
                                    </td>
                                     <td className={`p-1 border border-gray-700 ${isObs2Date ? 'bg-green-800/60' : ''}`}>
                                        {employee.obs2}
                                    </td>
                                    <td className="p-1 border border-gray-700 text-center">{employee.escala}</td>
                                    <td className="p-1 border border-gray-700 text-center">{employee.codigo}</td>
                                    <td className="p-1 border border-gray-700">{employee.proprio}</td>
                                    <td className="p-1 border border-gray-700 text-center">{employee.inicio}</td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OperationalCalendar;
