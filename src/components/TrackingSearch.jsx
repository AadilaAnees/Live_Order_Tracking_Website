import { useState } from 'react';
import { Search } from 'lucide-react';

export default function TrackingSearch({ onSearch }) {
  const [orderId, setOrderId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderId.trim() !== '') {
      onSearch(orderId); // Passes the ID up to the main page to trigger the Firebase fetch later
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#333', marginBottom: '10px' }}>Track Your SmartLogix Delivery</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>Enter your unique Order ID to see live status updates.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="e.g., SLX-8492-77"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            width: '70%',
            outline: 'none'
          }}
        />
        <button 
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#0056b3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Search size={20} />
          Track
        </button>
      </form>
    </div>
  );
}