import { Check, X } from 'lucide-react'; // Added the X icon for the exception state

export default function ProgressTimeline({ currentStep }) {
  const steps = ['Order Placed', 'Dispatching', 'In Transit', 'Arriving', 'Delivered'];

  // 1. Is the current order in an exception state? (-1)
  const isException = currentStep === -1;
  
  // 2. Control the Green Connecting Line
  // If exception, stop the line at "In Transit" (index 2). Otherwise, follow the current step.
  const effectiveLineStep = isException ? 2 : currentStep;

  return (
    <div style={{ padding: '10px 0 30px 0', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
        
        {/* Background Gray Line */}
        <div className="mobile-timeline-line" style={{ position: 'absolute', top: '18px', left: '10%', right: '10%', height: '4px', backgroundColor: '#F3F4F6', zIndex: 0, borderRadius: '2px' }}></div>
        
        {/* Active Green Line */}
        <div className="mobile-timeline-line" style={{ 
          position: 'absolute', top: '18px', left: '10%', 
          width: `${(effectiveLineStep / (steps.length - 1)) * 80}%`, 
          height: '4px', backgroundColor: '#10B981', zIndex: 1, transition: 'width 0.5s ease', borderRadius: '2px'
        }}></div>

        {/* Timeline Dots */}
        {steps.map((step, index) => {
          
          // 3. Logic strictly scoped to EACH dot
          const isFailed = isException && index > 2; // Steps 4 & 5 turn Red
          const isCompleted = isException ? index <= 2 : index < currentStep; // Steps 1-3 turn Green
          const isActive = !isException && index === currentStep; // Highlight orange if active
          
          let bgColor = '#FFFFFF';
          let borderColor = '#E5E7EB'; 
          let iconColor = '#9CA3AF';
          let boxShadow = 'none';

          // Apply Colors based on State
          if (isFailed) {
            bgColor = '#FEF2F2';
            borderColor = '#EF4444';
            iconColor = '#EF4444';
          } else if (isCompleted) {
            bgColor = '#10B981'; 
            borderColor = '#10B981';
            iconColor = '#FFFFFF';
          } else if (isActive) {
            bgColor = '#FFFFFF';
            borderColor = '#F58220'; 
            iconColor = '#F58220';
            boxShadow = '0 0 0 4px rgba(245, 130, 32, 0.1)';
          }

          return (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1 }}>
              <div className="mobile-timeline-circle" style={{
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: bgColor,
                border: `3px solid ${borderColor}`,
                color: iconColor,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                fontWeight: '600', fontSize: '14px', transition: 'all 0.3s ease',
                boxShadow: boxShadow
              }}>
                {/* Dynamically render X, Check, or Number */}
                {isFailed ? <X size={16} strokeWidth={3} /> : isCompleted ? <Check size={16} strokeWidth={3} /> : index + 1}
              </div>
              <p className="mobile-timeline-text" style={{ 
                marginTop: '12px', fontSize: '13px', 
                fontWeight: isActive || isCompleted || isFailed ? '600' : '500',
                color: isFailed ? '#EF4444' : isActive ? '#F58220' : isCompleted ? '#1F2937' : '#9CA3AF', 
                textAlign: 'center',
                maxWidth: '60px', 
                wordWrap: 'break-word'
              }}>
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}