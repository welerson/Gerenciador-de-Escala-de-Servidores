
import React from 'react';

interface HeaderProps {
  onManagePersonnelClick: () => void;
  onReportsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onManagePersonnelClick, onReportsClick }) => {
  return (
    <header className="bg-escala-dark-surface shadow-md">
      <div className="max-w-full mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Gerenciador de Escala
          </h1>
          <p className="text-sm text-gray-400">Plataforma de Controle de Efetivo - Inspetoria Venda Nova</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onReportsClick}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
          >
            Relatórios
          </button>
          <button
            onClick={onManagePersonnelClick}
            className="px-4 py-2 bg-escala-primary hover:bg-escala-secondary text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
          >
            Gerenciar Efetivo
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
