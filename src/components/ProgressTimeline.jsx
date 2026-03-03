import { Check } from 'lucide-react';

export default function ProgressTimeline({ currentStep }) {
  // These are the standard logical steps for your logistics system
  const steps = ['Order Placed', 'Dispatched', 'In Transit', 'Arriving', 'Delivered'];

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        
        {/* Background Line */}
        <div style={{ position: 'absolute', top: '20px', left: '10%', right: '10%', height: '4px', backgroundColor: '#e0e0e0', zIndex: 0 }}></div>
        
        {/* Active Line (fills up based on progress) */}
        <div style={{ 
          position: 'absolute', top: '20px', left: '10%', 
          width: `${(currentStep / (steps.length - 1)) * 80}%`, 
          height: '4px', backgroundColor: '#0056b3', zIndex: 1, transition: 'width 0.4s ease' 
        }}></div>

        {/* The Timeline Dots */}
        {steps.map((step, index) => {
          const isCompleted = index <= currentStep;
          
          return (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1 }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                backgroundColor: isCompleted ? '#0056b3' : '#f8f9fa',
                border: `3px solid ${isCompleted ? '#0056b3' : '#e0e0e0'}`,
                color: isCompleted ? 'white' : '#999',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                fontWeight: 'bold', transition: 'all 0.4s ease'
              }}>
                {isCompleted ? <Check size={20} /> : index + 1}
              </div>
              <p style={{ 
                marginTop: '12px', fontSize: '14px', fontWeight: isCompleted ? 'bold' : 'normal',
                color: isCompleted ? '#333' : '#999', textAlign: 'center' 
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