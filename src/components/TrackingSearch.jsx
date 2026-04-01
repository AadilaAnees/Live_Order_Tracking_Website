import { useState } from 'react';
import { Search, Package } from 'lucide-react';

export default function TrackingSearch({ onSearch }) {
  const [orderId, setOrderId] = useState('');
  // NEW: Local error state for input validation
  const [validationError, setValidationError] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedId = orderId.trim().toUpperCase();

    // 1. Check for empty input
    if (!trimmedId) {
      setValidationError('Please enter a tracking ID.');
      return;
    }

    // 2. Strict Format Validation (e.g., must start with SLX-)
    const trackingRegex = /^SLX-\d{3,5}$/i; // Matches SLX-123 to SLX-12345
    if (!trackingRegex.test(trimmedId)) {
      setValidationError('Invalid format. Tracking ID must be like SLX-123.');
      return;
    }

    // If it passes validation, clear errors and search!
    setValidationError('');
    onSearch(trimmedId);
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', marginBottom: '24px', border: '1px solid #E5E7EB' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <div style={{ backgroundColor: '#FFF7ED', padding: '8px', borderRadius: '8px', color: '#F58220' }}>
          <Package size={24} />
        </div>
        <h2 style={{ margin: 0, color: '#1F2937', fontSize: '20px', fontWeight: '600' }}>Track Cargo</h2>
      </div>
      <p className="mobile-reset-margin" style={{ color: '#6B7280', fontSize: '14px', marginBottom: '24px', marginLeft: '48px' }}>
        Enter your tracking ID to view live location and status.
      </p>
      
      <form className="mobile-col mobile-reset-margin" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '48px' }}>
        <div style={{ display: 'flex', gap: '16px', width: '100%' }} className="mobile-col">
          <input
            type="text"
            placeholder="e.g., SLX-123"
            value={orderId}
            onChange={(e) => { setOrderId(e.target.value); setValidationError(''); }} // Clear error as they type
            style={{ flex: 1, padding: '12px 16px', fontSize: '15px', backgroundColor: '#F9FAFB', border: validationError ? '1px solid #EF4444' : '1px solid #E5E7EB', borderRadius: '12px', color: '#1F2937', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#F58220', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={18} /> Track Order
          </button>
        </div>
        
        {/* Validation Error Display */}
        {validationError && (
          <span style={{ color: '#EF4444', fontSize: '13px', marginTop: '4px' }}>{validationError}</span>
        )}
      </form>
    </div>
  );
}