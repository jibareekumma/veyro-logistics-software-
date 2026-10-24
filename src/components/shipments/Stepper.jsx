import React from 'react';

import '../../stylings/shipments/Stepper.scss'

const steps = [
  { id: 1, label: 'Package' },
  { id: 2, label: 'Sender' },
  { id: 3, label: 'Receiver' },
  { id: 4, label: 'Review' },
];

const Stepper = function({ currentStep = 1, onStepClick }){
  return (
    <div className="stepper-container">
      {steps.map(function(step, index){
        const isActive = step.id === currentStep;
        const isDone = step.id < currentStep;
        const canClick = isDone && onStepClick;
        return (
          <React.Fragment key={step.id}>
            <div
              className={`step-item ${isActive ? 'active' : ''} ${isDone ? 'done' : ''} ${canClick ? 'clickable' : ''}`}
              role={canClick ? 'button' : undefined}
              tabIndex={canClick ? 0 : undefined}
              onClick={canClick ? function(){ onStepClick(step.id); } : undefined}
              onKeyDown={canClick ? function(e){ if (e.key === 'Enter') onStepClick(step.id); } : undefined}
            >
              <div className="step-circle">{isDone ? '✓' : step.id}</div>
              <span className="step-label">{step.label}</span>
            </div>
            {index < steps.length - 1 && <div className={`step-line ${isDone ? 'done' : ''}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;