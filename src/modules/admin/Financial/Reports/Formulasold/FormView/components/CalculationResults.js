import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const CalculationResults = () => {
  const equation =
    '\\text{FAVÖK Marjı} = \\frac{\\text{FAVÖK}}{\\text{Hasılat}}';

  return (
    <div>
      <BlockMath math={equation} />
    </div>
  );
};

export default CalculationResults;
