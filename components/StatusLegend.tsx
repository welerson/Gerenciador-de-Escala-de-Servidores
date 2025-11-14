
import React from 'react';
import { STATUS_CODES, STATUS_CODE_LIST } from '../constants';

const StatusLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {STATUS_CODE_LIST.map(code => {
        const status = STATUS_CODES[code];
        return (
          <div key={code} className="flex items-center gap-2 text-xs" title={status.description}>
            <span className={`w-3 h-3 rounded-full ${status.bgColor} border ${status.borderColor}`}></span>
            <span>{status.label} ({code})</span>
          </div>
        );
      })}
    </div>
  );
};

export default StatusLegend;
