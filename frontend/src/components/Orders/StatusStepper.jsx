import React from 'react';

const StatusStepper = ({ steps, currentStatus, isCancelled, orientation = 'horizontal' }) => {
  // If cancelled, we cut off the future steps. We find the index where it was cancelled.
  let displaySteps = [...steps];
  let cancelIndex = -1;
  
  if (isCancelled) {
    cancelIndex = steps.findIndex(s => s.label === 'Cancelled');
    if (cancelIndex !== -1) {
      displaySteps = steps.slice(0, cancelIndex + 1);
    }
  }

  const currentStepIndex = displaySteps.filter(s => s.done).length - 1;

  if (orientation === 'horizontal') {
    return (
      <div className="flex items-start w-full relative pt-[6px]">
        {/* Background Line */}
        <div className="absolute top-[11px] left-[40px] right-[40px] h-[2px] bg-[#e0e0e0] z-0"></div>
        {/* Filled Line */}
        {currentStepIndex > 0 && (
          <div 
            className="absolute top-[11px] left-[40px] h-[2px] z-0" 
            style={{ 
              width: `calc(${(currentStepIndex / (displaySteps.length - 1)) * 100}% - ${80 / (displaySteps.length - 1)}px)`,
              backgroundColor: isCancelled ? '#ff6161' : '#2874f0'
            }}
          ></div>
        )}

        {displaySteps.map((step, index) => {
          const isDone = step.done;
          
          let circleColor = '#e0e0e0';
          if (isDone) {
            circleColor = '#2874f0';
            if (currentStatus === 'delivered' && index === displaySteps.length - 1) circleColor = '#26a541';
            if (isCancelled && index === cancelIndex) circleColor = '#ff6161';
          }

          const isCancelledStep = isCancelled && index === cancelIndex;

          return (
            <div key={index} className="flex flex-col items-center relative z-10 flex-1">
              {/* Dot */}
              <div 
                className="w-3 h-3 rounded-full relative z-10 bg-white"
              >
                <div className="w-full h-full rounded-full" style={{ backgroundColor: circleColor }}></div>
                {/* Outer pulse ring for active step */}
                {isDone && index === currentStepIndex && !isCancelled && currentStatus !== 'delivered' && (
                  <div className="absolute -inset-1 rounded-full opacity-30 animate-pulse bg-[#2874f0]"></div>
                )}
              </div>
              
              {/* Label */}
              {isCancelledStep ? (
                <div className="mt-[6px] bg-[#fff0f0] text-[#ff6161] border border-[#ff6161] rounded-[4px] px-2 py-[2px] text-[11px] text-center whitespace-nowrap font-medium">
                  {step.label}
                </div>
              ) : (
                <div className={`mt-[6px] text-[11px] font-medium text-center whitespace-nowrap ${isDone ? 'text-[#212121]' : 'text-[#878787]'}`}>
                  {step.label}
                </div>
              )}

              {/* Date */}
              {step.timestamp && (
                <div className="text-[11px] text-[#878787] mt-[2px] whitespace-nowrap text-center">
                  {new Date(step.timestamp).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Vertical Stepper
  return (
    <div className="flex flex-col relative pt-[6px]">
      {displaySteps.map((step, index) => {
        const isDone = step.done;
        const isLast = index === displaySteps.length - 1;
        
        let circleColor = '#e0e0e0';
        if (isDone) {
          circleColor = '#2874f0';
          if (currentStatus === 'delivered' && index === displaySteps.length - 1) circleColor = '#26a541';
          if (isCancelled && index === cancelIndex) circleColor = '#ff6161';
        }

        let barColor = '#e0e0e0';
        if (index < currentStepIndex && !isCancelled) barColor = '#2874f0';
        if (isCancelled && index < currentStepIndex) barColor = '#ff6161';

        const isCancelledStep = isCancelled && index === cancelIndex;

        return (
          <div key={index} className="flex relative min-h-[60px]">
            {/* Connecting Vertical Line */}
            {!isLast && (
              <div 
                className="absolute left-[5px] top-[14px] bottom-[-14px] w-[2px] z-0" 
                style={{ backgroundColor: barColor }}
              ></div>
            )}
            
            {/* Step Circle */}
            <div className="mr-4 relative z-10 pt-1">
              <div 
                className="w-3 h-3 rounded-full bg-white relative"
              >
                 <div className="w-full h-full rounded-full" style={{ backgroundColor: circleColor }}></div>
              </div>
            </div>
            
            {/* Step Content */}
            <div className="pb-6 flex flex-col">
              {isCancelledStep ? (
                <div className="bg-[#fff0f0] text-[#ff6161] border border-[#ff6161] rounded-[4px] px-2 py-[2px] text-[11px] font-medium w-fit">
                  {step.label}
                </div>
              ) : (
                <div className={`text-[14px] font-medium ${isDone ? 'text-[#212121]' : 'text-[#878787]'}`}>
                  {step.label}
                </div>
              )}
              {step.timestamp && (
                <div className="text-[12px] text-[#878787] mt-1">
                  {new Date(step.timestamp).toLocaleString('en-IN', {
                    weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusStepper;
