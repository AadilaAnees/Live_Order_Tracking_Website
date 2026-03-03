import { useState } from 'react';
import TrackingSearch from './components/TrackingSearch';
import ProgressTimeline from './components/ProgressTimeline';

function App() {
  // State to hold the order data once searched
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');

  const handleOrderSearch = (id) => {
    setError('');
    
    // MOCK DATA: Simulating a database fetch. 
    // If they type exactly "SLX-123", we show a successful order.
    if (id === 'SLX-123') {
      setOrderData({
        id: 'SLX-123',
        customerName: 'Chilliq Foods',
        // Status Step 2 means: 0=Placed, 1=Dispatched, 2=In Transit
        statusStep: 2, 
        lastUpdate: '10 minutes ago'
      });
    } else {
      setOrderData(null);
      setError('Order not found. Please check your ID and try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '20px', fontFamily: 'sans-serif' }}>
      
      <header style={{ padding: '20px', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px', marginBottom: '40px' }}>
        <h1 style={{ margin: 0, color: '#0056b3', textAlign: 'center' }}>SmartLogix</h1>
      </header>

      {/* The Search Bar from Day 1 */}
      <TrackingSearch onSearch={handleOrderSearch} />

      {/* Error Message UI */}
      {error && (
        <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>
      )}

      {/* Display Timeline only if we have order data */}
      {orderData && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
            <h2>Order: {orderData.id}</h2>
            <p style={{ color: '#666' }}>Customer: {orderData.customerName}</p>
            <p style={{ color: '#666', fontSize: '14px' }}>Last updated: {orderData.lastUpdate}</p>
          </div>

          {/* The new Timeline Component */}
          <ProgressTimeline currentStep={orderData.statusStep} />
          
        </div>
      )}

    </div>
  );
}

export default App;