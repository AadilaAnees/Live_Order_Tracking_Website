import TrackingSearch from './components/TrackingSearch';

function App() {
  // This function will eventually connect to Firebase
  const handleOrderSearch = (id) => {
    console.log("Customer is looking for Order ID:", id);
    alert(`Searching database for Order: ${id}`);
    // Tomorrow, we will add the logic to show the Timeline and Map here!
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '20px' }}>
      {/* Basic Header */}
      <header style={{ padding: '20px', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px', marginBottom: '40px' }}>
        <h1 style={{ margin: 0, color: '#0056b3', textAlign: 'center' }}>SmartLogix</h1>
      </header>

      {/* The Search Component you just built */}
      <TrackingSearch onSearch={handleOrderSearch} />
    </div>
  );
}

export default App;