import React from 'react';

const rosterDataDobra2Noite = [
  { subgroup: 'VIATURAS', bm: '80030-2', cargo: 'Subinspetor', nome: 'SOUZA DIAS', rquica: '129', sinarm: 'A00067621', obs1: '', obs2: '', obs3: '', escala: '12X36-D2', codigo: 'G921', proprio: '- SUBINSPETORIA DE INSPEÇÃO OPERACIONAL - VENDA NOVA', inicio: '18:00', highlighted: true },
  { subgroup: 'VIATURAS', bm: '86971-X', cargo: 'GCD II', nome: 'ADILZA', rquica: '1376', sinarm: 'A00068203', obs1: '', obs2: '', obs3: '', escala: '12X36-D2', codigo: 'G921', proprio: '- SUBINSPETORIA DE INSPEÇÃO OPERACIONAL - VENDA NOVA', inicio: '18:00', highlighted: true },
  { subgroup: 'VIATURAS', bm: '86122-0', cargo: 'GCD I', nome: 'ALCINIO', rquica: '297', sinarm: 'A00074105', obs1: '', obs2: '', obs3: '', escala: '12X36-D2', codigo: 'G924', proprio: 'FISCOPE - FISCALIZAÇÃO OPERACIONAL - VENDA NOVA', inicio: '18:00', highlighted: true },
  { subgroup: 'VIATURAS', bm: '99329-1', cargo: 'GCD II', nome: 'ALDAIR FERNANDES', rquica: '1834', sinarm: 'A00072763', obs1: '', obs2: '', obs3: '', escala: '12X36-D2', codigo: 'G924', proprio: 'FISCOPE - FISCALIZAÇÃO OPERACIONAL - VENDA NOVA', inicio: '18:00', highlighted: true },
  { subgroup: 'VIATURAS', bm: '86152-2', cargo: 'GCD II', nome: 'ALECRIM', rquica: '1475', sinarm: 'A00079377', obs1: '', obs2: '', obs3: '', escala: '12X36-D2', codigo: 'G932', proprio: 'JA - GRUPAMENTO DE PATRULHAMENTO RONDA - VENDA NOVA', inicio: '18:00', highlighted: true },
  { subgroup: 'VIATURAS', bm: '80774-9', cargo: 'GCD I', nome: 'GUIEIRO', rquica: '514', sinarm: 'A00074290', obs1: '', obs2: '', obs3: '', escala: '12X36-D2', codigo: 'G932', proprio: 'JA - GRUPAMENTO DE PATRULHAMENTO RONDA - VENDA NOVA', inicio: '18:00', highlighted: true },
  { subgroup: 'SEGURANÇA DA BASE', bm: '80072-8', cargo: 'GCD I', nome: 'LEANDRO SANTOS', rquica: '577', sinarm: 'A00068234', obs1: '', obs2: '', obs3: '', escala: '12X36-D2', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '18:00', highlighted: false },
  { subgroup: 'SEGURANÇA DA BASE', bm: '80472-3', cargo: 'GCD I', nome: 'VARGAS', rquica: '504', sinarm: 'A00082262', obs1: '', obs2: '', obs3: '', escala: '12X36-D2', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '18:00', highlighted: false },
  { subgroup: 'SEGURANÇA DA BASE', bm: '98876-X', cargo: 'GCD II', nome: 'SANTOS SANTANA', rquica: '1596', sinarm: 'A00067610', obs1: 'AMENTO, L', obs2: '17/03/2024', obs3: '', escala: '12X36-D2', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '18:00', highlighted: true },
  { subgroup: 'SEGURANÇA DA BASE', bm: '98928-6', cargo: 'GCD II', nome: 'W ROCHA', rquica: '1802', sinarm: 'A00079858', obs1: '', obs2: '', obs3: '', escala: '12X36-D2', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '18:00', highlighted: true },
  { subgroup: 'SEGURANÇA DA BASE', bm: '99446-8', cargo: 'GCD II', nome: 'ARCANJO', rquica: '1953', sinarm: 'A00091053', obs1: '', obs2: '', obs3: '', escala: '12X36-D2', codigo: 'G952', proprio: 'SEGURANÇA - INSPETORIA VENDA NOVA', inicio: '18:00', highlighted: true },
  { subgroup: 'INTENDÊNCIA', bm: '86446-7', cargo: 'GCD II', nome: 'GUEDES', rquica: '895', sinarm: 'A00069423', obs1: '24/07/2024', obs2: '', obs3: '', escala: '12X36-D2', codigo: 'G971', proprio: 'INTENDENCIA - VENDA NOVA', inicio: '18:00', highlighted: false },
  { subgroup: 'INTENDÊNCIA', bm: '87347-4', cargo: 'GCD II', nome: 'LEANDRO MELO', rquica: '1367', sinarm: 'A00069482', obs1: '20/06/2023', obs2: '', obs3: '', escala: '5X2', codigo: 'G973', proprio: 'NSPORTE - COORDENADORIA DE TRANSPORTE - VENDA NOVA', inicio: '08:00', highlighted: false },
  { subgroup: 'UPA VN', bm: '87596-5', cargo: 'GCD II', nome: 'MARCELINO', rquica: '1359', sinarm: 'A00071417', obs1: '', obs2: '', obs3: '', escala: '12X36-D2', codigo: '9150', proprio: 'UNIDADE DE PRONTO ATENDIMENTO VENDA NOVA', inicio: '18:00', highlighted: false },
  { subgroup: 'UPA VN', bm: '99358-5', cargo: 'GCD II', nome: 'ROGERIO SILVA', rquica: '1612', sinarm: 'A00074190', obs1: '', obs2: '', obs3: '', escala: '12X36-D2', codigo: '9150', proprio: 'UNIDADE DE PRONTO ATENDIMENTO VENDA NOVA', inicio: '18:00', highlighted: false },
];

const rosterData5x2 = [
    { subgroup: 'ADMINISTRATIVO', bm: '99198-1', cargo: 'Coordenador', nome: 'LILIAN', rquica: '74', sinarm: 'A00073987', obs1: '', obs2: '', obs3: '', escala: '5X2', codigo: 'G920', proprio: 'INSPETORIA REGIONAL - VENDA NOVA I', inicio: '08:00', highlighted: false },
    { subgroup: 'ADMINISTRATIVO', bm: '80250-2', cargo: 'GCD II', nome: 'EDLAN LOPES', rquica: '1701', sinarm: '', obs1: '', obs2: '', obs3: '', escala: '5X2', codigo: 'G995', proprio: 'ORDENADORIA DE DISTRIBUIÇÃO E ALOCAÇÃO DE EFETIVO I', inicio: '08:00', highlighted: false },
    { subgroup: 'ADMINISTRATIVO', bm: '99361-X', cargo: 'GCD II', nome: 'OTHON MARQUES', rquica: '1768', sinarm: 'A00091054', obs1: '', obs2: '', obs3: '', escala: '5X2', codigo: 'G995', proprio: 'ORDENADORIA DE DISTRIBUIÇÃO E ALOCAÇÃO DE EFETIVO I', inicio: '08:00', highlighted: false },
    { subgroup: 'ADMINISTRATIVO', bm: '87280-X', cargo: 'GCD II', nome: 'HEVERTON SOUSA', rquica: '1150', sinarm: 'A00071457', obs1: 'NÃO', obs2: 'A', obs3: '', escala: '5X2', codigo: 'G995', proprio: 'ORDENADORIA DE DISTRIBUIÇÃO E ALOCAÇÃO DE EFETIVO I', inicio: '08:00', highlighted: false },
    { subgroup: 'VENDA NOVA MAIS SEGURA', bm: '87000-9', cargo: 'GCD II', nome: 'FERNANDES', rquica: '121', sinarm: 'A00082184', obs1: '', obs2: '', obs3: '', escala: '5X2', codigo: 'G972', proprio: 'SENTINELA - VENDA NOVA "MAIS SEGURA" - VENDA NOVA', inicio: '08:00', highlighted: false },
    { subgroup: 'RESTAURANTE POPULAR', bm: '80815-X', cargo: 'GCD I', nome: 'LINNDHOSON', rquica: '418', sinarm: 'A00077237', obs1: '', obs2: '', obs3: '', escala: '5X2', codigo: '9273', proprio: 'RESTAURANTE POPULAR MARIA REGINA NABUCO', inicio: '07:00', highlighted: false },
    { subgroup: 'FISCALIZA', bm: '80855-9', cargo: 'GCD I', nome: 'FERNANDO REIS', rquica: '747', sinarm: 'A00079470', obs1: '', obs2: '', obs3: '', escala: '5X2', codigo: 'G963', proprio: 'A PS - GRUPAMENTO FISCALIZA POLUIÇÃO SONORA - VEND', inicio: '08:00', highlighted: false },
    { subgroup: 'FISCALIZA', bm: '86274-X', cargo: 'GCD I', nome: 'JANOT', rquica: '989', sinarm: '', obs1: '', obs2: '', obs3: '', escala: '5X2', codigo: 'G963', proprio: 'A PS - GRUPAMENTO FISCALIZA POLUIÇÃO SONORA - VEND', inicio: '08:00', highlighted: false },
    { subgroup: 'REGIONAL', bm: '80915-6', cargo: 'GCD I', nome: 'LOBO', rquica: '200', sinarm: 'A00074856', obs1: '', obs2: '', obs3: '', escala: '5X2', codigo: '9213', proprio: 'ORDENADORIA DE ATENDIMENTO REGIONAL VENDA NOVA', inicio: '07:00', highlighted: false },
    { subgroup: 'REGIONAL', bm: '99342-4', cargo: 'GCD II', nome: 'FRANCISCO NETO', rquica: '1584', sinarm: '', obs1: '', obs2: '', obs3: '', escala: '5X2', codigo: '9213', proprio: 'ORDENADORIA DE ATENDIMENTO REGIONAL VENDA NOVA', inicio: '07:00', highlighted: false },
    { subgroup: 'CONSELHO TUTELAR', bm: '86105-0', cargo: 'GCD II', nome: 'IGOR LUIZ', rquica: '1013', sinarm: 'A00089591', obs1: '', obs2: '', obs3: '', escala: '5X2', codigo: '9001', proprio: 'CONSELHO TUTELAR VENDA NOVA', inicio: '09:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '80808-5', cargo: 'GCD II', nome: 'ALVES CARVALHO', rquica: '474', sinarm: 'A00073990', obs1: 'NOITE', obs2: '', obs3: '', escala: '5X2', codigo: '9101', proprio: 'C. S. ANDRADAS', inicio: '10:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '322543-5', cargo: 'GCM III', nome: 'YURI ALVES', rquica: '2368', sinarm: '', obs1: 'TEM AIT', obs2: 'A', obs3: '', escala: '5X2', codigo: '9102', proprio: 'C. S. CEU AZUL', inicio: '10:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '318649-9', cargo: 'GCM III', nome: 'EVANGELISTA', rquica: '2156', sinarm: '', obs1: 'TEM AIT', obs2: 'A', obs3: '', escala: '5X2', codigo: '9103', proprio: 'C. S. COPACABANA', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '322493-X', cargo: 'GCM III', nome: 'JOSE FERNANDES', rquica: '2375', sinarm: '', obs1: 'VIATURA', obs2: '', obs3: '', escala: '5X2', codigo: '9104', proprio: 'C. S. JARDIM EUROPA', inicio: '10:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '87543-8', cargo: 'GCD II', nome: 'MARCOS', rquica: '1211', sinarm: 'A00082525', obs1: 'NÃO', obs2: 'I', obs3: '', escala: '5X2', codigo: '9104', proprio: 'C. S. JARDIM EUROPA', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '322917-4', cargo: 'GCM III', nome: 'W. RUBENS', rquica: '2327', sinarm: '', obs1: 'VIATURA', obs2: '', obs3: '', escala: '5X2', codigo: '9105', proprio: 'C. S. JARDIM LEBLON', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '322758-X', cargo: 'GCM III', nome: 'TELES', rquica: '', sinarm: '', obs1: 'TEM AIT', obs2: 'I', obs3: '', escala: '5X2', codigo: '9105', proprio: 'C. S. JARDIM LEBLON', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '322540-4', cargo: 'GCM III', nome: 'RAFAEL MOURA', rquica: '2353', sinarm: '', obs1: 'NOITE', obs2: '', obs3: '', escala: '5X2', codigo: '9106', proprio: 'C. S. LAGOA', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '322642-3', cargo: 'GCM III', nome: 'LUCIO LIMA', rquica: '2457', sinarm: '', obs1: 'TEM AIT', obs2: 'A', obs3: '', escala: '5X2', codigo: '9106', proprio: 'C. S. LAGOA', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '322804-3', cargo: 'GCM III', nome: 'ALEXANDRE RABELLO', rquica: '2447', sinarm: '', obs1: 'TEM AIT', obs2: 'A', obs3: '', escala: '5X2', codigo: '9107', proprio: 'C. S. MANTIQUEIRA', inicio: '10:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '87238-9', cargo: 'GCD II', nome: 'FLAVIO ADELINO', rquica: '1335', sinarm: 'A00083765', obs1: 'SUSPENSO', obs2: 'TEM AIT', obs3: 'I', escala: '5X2', codigo: '9108', proprio: 'C. S. MINAS CAIXA', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '327473-4', cargo: 'GCM III', nome: 'DOMINGUES', rquica: '', sinarm: '', obs1: 'PIRATININGA', obs2: '', obs3: '', escala: '5X2', codigo: '9109', proprio: 'C. S. NOVA YORK', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '80840-0', cargo: 'GCD I', nome: 'LANA MOTA', rquica: '734', sinarm: 'A00083748', obs1: 'PIRATININGA', obs2: '', obs3: '', escala: '5X2', codigo: '9110', proprio: 'C. S. PIRATININGA', inicio: '06:30', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '87425-X', cargo: 'GCD II', nome: 'RAFAEL ALVES', rquica: '1283', sinarm: 'A00114535', obs1: 'PIRATININGA', obs2: '', obs3: '', escala: '5X2', codigo: '9111', proprio: 'C. S. RIO BRANCO', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '86331-2', cargo: 'GCD II', nome: 'TADEU ANDRADE', rquica: '1420', sinarm: 'A00082137', obs1: 'PIRATININGA', obs2: '', obs3: '', escala: '5X2', codigo: '9113', proprio: 'C. S. SANTA MONICA', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '80649-1', cargo: 'GCD I', nome: 'PETERSON SOUZA', rquica: '732', sinarm: 'A00074158', obs1: 'VIATURA', obs2: '', obs3: '', escala: '5X2', codigo: '9114', proprio: 'C. S. SERRA VERDE', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '322459-5', cargo: 'GCM III', nome: 'GUILHERME', rquica: '2341', sinarm: '', obs1: 'TEM AIT', obs2: '', obs3: '', escala: '5X2', codigo: '9115', proprio: 'C. S. PARAUNA - VENDA NOVA', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '86825-X', cargo: 'GCD II', nome: 'EDNEY', rquica: '1470', sinarm: 'A00074139', obs1: 'PIRATININGA', obs2: '', obs3: '', escala: '5X2', codigo: '9116', proprio: 'C. S. JARDIM DOS COMERCIARIOS', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '318768-1', cargo: 'GCM III', nome: 'VALERIO REIS', rquica: '2235', sinarm: '', obs1: 'TEM AIT', obs2: 'I', obs3: '', escala: '5X2', codigo: '9116', proprio: 'C. S. JARDIM DOS COMERCIARIOS', inicio: '07:00', highlighted: false },
    { subgroup: 'CENTRO DE SAUDE', bm: '86250-2', cargo: 'GCD II', nome: 'ROSEMIRO', rquica: '912', sinarm: 'A00083769', obs1: 'NÃO', obs2: 'A', obs3: '', escala: '5X2', codigo: '9118', proprio: 'C. S. SANTO ANTONIO', inicio: '07:00', highlighted: true },
    { subgroup: 'CENTRO DE SAUDE', bm: '86156-0', cargo: 'GCD II', nome: 'SAMUEL MARTINS', rquica: '1011', sinarm: 'A00083036', obs1: 'TEM AIT', obs2: 'I', obs3: '', escala: '5X2', codigo: '9119', proprio: 'C. S. SANTA MONICA II - ALAMEDA DOS IPES', inicio: '07:00', highlighted: true },
];

const allRosters = [
    { mainGroup: 'DOBRA 2 NOITE', data: rosterDataDobra2Noite },
    { mainGroup: '5 X 2', data: rosterData5x2 }
];

const OperationalCalendar: React.FC = () => {
    const dateRegex = /\d{2}\/\d{2}\/\d{4}/;

    return (
        <div className="p-4 bg-escala-dark-background text-gray-200 space-y-8">
            {allRosters.map(roster => {
                let lastSubgroup = '';

                return (
                    <table key={roster.mainGroup} className="min-w-full text-xs text-left border-collapse border border-gray-600">
                        <thead>
                            <tr className="bg-orange-500">
                                <th colSpan={12} className="p-2 font-bold text-white text-center text-base tracking-wider border-r border-gray-600">
                                    {roster.mainGroup}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {roster.data.map((employee, index) => {
                                const subgroupHeader = employee.subgroup && employee.subgroup !== lastSubgroup ? (
                                    <tr key={`subgroup-${employee.subgroup}-${index}`} className="bg-escala-secondary">
                                        <td colSpan={12} className="p-1 font-bold text-white text-center border-t border-b border-gray-600">
                                            {employee.subgroup}
                                        </td>
                                    </tr>
                                ) : null;
                                lastSubgroup = employee.subgroup;

                                const isObs1Date = dateRegex.test(employee.obs1 || '');
                                const isObs2Date = dateRegex.test(employee.obs2 || '');
                                const isSuspended = employee.obs1 === 'SUSPENSO';

                                return (
                                    <React.Fragment key={`${employee.bm}-${index}`}>
                                        {subgroupHeader}
                                        <tr className={employee.highlighted ? 'bg-pink-900/50' : 'bg-escala-dark-surface/50'}>
                                            <td className="p-1 border border-gray-700">{employee.bm}</td>
                                            <td className="p-1 border border-gray-700">{employee.cargo}</td>
                                            <td className="p-1 border border-gray-700">{employee.nome}</td>
                                            <td className="p-1 border border-gray-700 text-center">{employee.rquica}</td>
                                            <td className="p-1 border border-gray-700">{employee.sinarm}</td>
                                            <td className={`p-1 border border-gray-700 ${isObs1Date ? 'bg-green-800/60' : ''} ${isSuspended ? 'bg-red-800/60' : ''}`}>
                                                {employee.obs1}
                                            </td>
                                            <td className={`p-1 border border-gray-700 ${isObs2Date ? 'bg-green-800/60' : ''}`}>
                                                {employee.obs2}
                                            </td>
                                            <td className="p-1 border border-gray-700">{employee.obs3}</td>
                                            <td className="p-1 border border-gray-700 text-center">{employee.escala}</td>
                                            <td className="p-1 border border-gray-700 text-center">{employee.codigo}</td>
                                            <td className="p-1 border border-gray-700">{employee.proprio}</td>
                                            <td className="p-1 border border-gray-700 text-center">{employee.inicio}</td>
                                        </tr>
                                    </React.Fragment>
                                )
                            })}
                            {roster.mainGroup === '5 X 2' && (
                                <>
                                    <tr className="bg-escala-dark-surface/50">
                                        <td className="p-1 border border-gray-700">X</td>
                                        <td className="p-1 border border-gray-700 text-center" colSpan={2}>24</td>
                                        <td className="p-1 border border-gray-700" colSpan={9}></td>
                                    </tr>
                                    <tr className="bg-escala-dark-surface/50">
                                        <td className="p-1 border border-gray-700">X</td>
                                        <td className="p-1 border border-gray-700" colSpan={11}></td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                )
            })}
        </div>
    );
};

export default OperationalCalendar;
