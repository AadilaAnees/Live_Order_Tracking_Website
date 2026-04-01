import { Check } from 'lucide-react';

export default function ProgressTimeline({ currentStep }) {
  const steps = ['Order Placed', 'Dispatched', 'In Transit', 'Arriving', 'Delivered'];

  return (
    <div style={{ padding: '10px 0 30px 0', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
        
        {/* Background Gray Line */}
        <div className="mobile-timeline-line" style={{ position: 'absolute', top: '18px', left: '10%', right: '10%', height: '4px', backgroundColor: '#F3F4F6', zIndex: 0, borderRadius: '2px' }}></div>
        
        {/* Active Green Line */}
        <div className="mobile-timeline-line" style={{ 
          position: 'absolute', top: '18px', left: '10%', 
          width: `${(currentStep / (steps.length - 1)) * 80}%`, 
          height: '4px', backgroundColor: '#10B981', zIndex: 1, transition: 'width 0.5s ease', borderRadius: '2px'
        }}></div>

        {/* Timeline Dots */}
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          let bgColor = '#FFFFFF';
          let borderColor = '#E5E7EB'; 
          let iconColor = '#9CA3AF';

          if (isCompleted) {
            bgColor = '#10B981'; 
            borderColor = '#10B981';
            iconColor = '#FFFFFF';
          } else if (isActive) {
            bgColor = '#FFFFFF';
            borderColor = '#F58220'; 
            iconColor = '#F58220';
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
                boxShadow: isActive ? '0 0 0 4px rgba(245, 130, 32, 0.1)' : 'none'
              }}>
                {isCompleted ? <Check size={16} /> : index + 1}
              </div>
              <p className="mobile-timeline-text" style={{ 
                marginTop: '12px', fontSize: '13px', 
                fontWeight: isActive || isCompleted ? '600' : '500',
                color: isActive ? '#F58220' : isCompleted ? '#1F2937' : '#9CA3AF', 
                textAlign: 'center',
                maxWidth: '60px', // Forces words to wrap cleanly
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