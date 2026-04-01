import { useState } from 'react';
import { Search, Package } from 'lucide-react';

export default function TrackingSearch({ onSearch }) {
  const [orderId, setOrderId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderId.trim() !== '') {
      onSearch(orderId);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#FFFFFF', 
      padding: '32px', 
      borderRadius: '16px', 
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', // Very soft elevation
      marginBottom: '24px',
      border: '1px solid #E5E7EB' // Light neutral gray
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <div style={{ backgroundColor: '#FFF7ED', padding: '8px', borderRadius: '8px', color: '#F58220' }}>
          <Package size={24} />
        </div>
        <h2 style={{ margin: 0, color: '#1F2937', fontSize: '20px', fontWeight: '600' }}>Track Cargo</h2>
      </div>
      <p className="mobile-reset-margin" style={{ color: '#6B7280', fontSize: '14px', marginBottom: '24px', marginLeft: '48px' }}>
        Enter your tracking ID to view live location and status.
      </p>
      
      <form className="mobile-col mobile-reset-margin" onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', marginLeft: '48px' }}>
        <input
          type="text"
          placeholder="e.g., SLX-849"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          style={{
            flex: 1,
            padding: '12px 16px',
            fontSize: '15px',
            backgroundColor: '#F9FAFB', // Light gray input
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            color: '#1F2937',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#F58220'}
          onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
        />
        <button 
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#F58220', // SmartLogix Orange
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 10px rgba(245, 130, 32, 0.2)'
          }}
        >
          <Search size={18} />
          Track Order
        </button>
      </form>
    </div>
  );
}