import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebaseConfig';
import TrackingSearch from './components/TrackingSearch';
import ProgressTimeline from './components/ProgressTimeline';
import LiveMap from './components/LiveMap';
import { MapPin, Truck, LayoutDashboard, User } from 'lucide-react';
import logo from './assets/logo.png';

function App() {
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');
  const [searchId, setSearchId] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [draftNote, setDraftNote] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false)

  useEffect(() => {
    if (!searchId) return;
    const orderRef = ref(database, 'orders/' + searchId);
    const unsubscribe = onValue(orderRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOrderData({ id: searchId, ...data });
        setError('');
      } else {
        setOrderData(null);
        setError('Order not found. Please check your tracking ID.');
      }
    });
    return () => unsubscribe();
  }, [searchId]);

  // Dynamic status messages based on the timeline step
  const getStatusMessage = (step) => {
    switch(step) {
      case -1: return "⚠️ Delivery Exception: Package reported missing.";
      case 0: return "Awaiting dispatch from origin warehouse.";
      case 1: return "Package loading. Driver will leave the facility very .";
      case 2: return "In transit. Heading towards the destination.";
      case 3: return "Driver is arriving at the drop-off location.";
      case 4: return "Package delivered successfully.";
      default: return "Fetching latest location data...";
    }
  };

  return (
    // SaaS Layout Wrapper: Light background, system fonts
    <div className="mobile-col" style={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: '#F4F6F8', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1F2937' }}>
      
      {/* Slim Sidebar */}
      <div className="mobile-hide" style={{ width: '70px', backgroundColor: '#FFFFFF', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: '32px' }}>
        <div style={{ color: '#F58220' }}><Truck size={28} /></div>
        <div style={{ color: '#9CA3AF', cursor: 'pointer' }}><LayoutDashboard size={24} /></div>
        <div style={{ color: '#1F2937', cursor: 'pointer', backgroundColor: '#F3F4F6', padding: '10px', borderRadius: '12px' }}><MapPin size={24} /></div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <header className="mobile-pad" style={{ height: '70px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
           
           {/* Official SmartLogix Logo */}
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={logo} alt="SmartLogix Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
            
            {/* A subtle gray divider line separating the logo from the portal title */}
            <span className="mobile-hide" style={{ 
              fontSize: '15px', 
              color: '#6B7280', 
              fontWeight: '500', 
              borderLeft: '2px solid #E5E7EB', 
              paddingLeft: '12px',
              marginTop: '4px'
              }}>
                Customer Portal
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#4B5563' }}>Hi, Customer #001</span>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={18} color="#6B7280" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="mobile-pad" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          
          <TrackingSearch onSearch={(id) => setSearchId(id.toUpperCase())} />

          {error && (
            <div style={{ backgroundColor: '#FEF2F2', color: '#DC2626', padding: '16px', borderRadius: '12px', textAlign: 'center', marginBottom: '24px', border: '1px solid #FCA5A5' }}>
              {error}
            </div>
          )}

          {orderData && (
            // Soft white card for results
            <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid #E5E7EB' }}>
              
              <div className="mobile-order-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '24px', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#1F2937' }}>Order ID: {orderData.id}</h3>
                  <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>Customer: {orderData.customerName}</p>
                  <p style={{ margin: 0, color: '#F58220', fontSize: '13px', fontWeight: '500' }}>
                    {getStatusMessage(orderData.statusStep)}
                  </p>
                </div>
                
                {/* NEW: Dynamic Tracking Badge replaces the old static one */}
                {orderData.statusStep === -1 ? (
                  <div style={{ backgroundColor: '#FEF2F2', color: '#EF4444', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '50%' }}></div>
                    Tracking Suspended
                  </div>
                ) : (
                  <div style={{ backgroundColor: '#ECFDF5', color: '#10B981', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%' }}></div>
                    Live Tracking Active
                  </div>
                )}
                {/* END Dynamic Tracking Badge */}  
              </div>

              <ProgressTimeline currentStep={orderData.statusStep} />
              
              {/* Conditionally Render the Map or Status Screens */}
              {orderData.statusStep === 0 ? (
                
                // STEP 0: AWAITING DISPATCH UI
                <div style={{ backgroundColor: '#F9FAFB', padding: '48px 24px', borderRadius: '12px', textAlign: 'center', border: '1px dashed #D1D5DB', marginTop: '24px' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#E5E7EB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                    <span style={{ fontSize: '24px' }}>📦</span>
                  </div>
                  <h4 style={{ color: '#374151', margin: '0 0 8px 0', fontSize: '16px' }}>Live Map Tracking Not Yet Active</h4>
                  <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
                    The routing map will automatically appear here as soon as your package leaves the warehouse.
                  </p>
                </div>

              ) : orderData.statusStep === 4 ? (

                // STEP 4: DELIVERED SUMMARY UI
                <div style={{ backgroundColor: '#F0FDF4', padding: '32px', borderRadius: '12px', border: '1px solid #BBF7D0', marginTop: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', borderBottom: '1px solid #DCFCE7', paddingBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#22C55E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px' }}>
                      ✓
                    </div>
                    <div>
                      <h4 style={{ color: '#166534', margin: '0 0 4px 0', fontSize: '18px' }}>Delivery Completed</h4>
                      <p style={{ color: '#15803D', margin: 0, fontSize: '14px' }}>Dropped off safely at the destination.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '24px' }} className="mobile-col">
                    {/* Delivery Stats */}
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#166534', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.5px' }}>Delivery Details</p>
                      <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1F2937' }}><strong>Arrival Time:</strong> {orderData.lastUpdate}</p>
                      <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1F2937' }}><strong>Transit Duration:</strong> 3h 45m</p>
                      <p style={{ margin: 0, fontSize: '14px', color: '#1F2937' }}><strong>Proof of Delivery:</strong> Signed & Confirmed</p>
                    </div>
                    
                    {/* Driver Review Box */}
                    <div style={{ flex: 1, backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#6B7280', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.5px' }}>Driver Info</p>
                      <p style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1F2937', fontWeight: '600' }}>Kamal Perera</p>
                      <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#6B7280' }}>Vehicle: WP-9791 (Light Truck)</p>
                      <div style={{ color: '#F59E0B', fontSize: '20px', letterSpacing: '2px', lineHeight: '1' }}>
                        ★★★★★
                      </div>
                    </div>
                  </div>
                </div>

                ) : orderData.statusStep === -1 ? (

                // NEW: STEP -1 (EXCEPTION / FAILED DELIVERY UI)
                <div style={{ backgroundColor: '#FEF2F2', padding: '32px', borderRadius: '12px', border: '1px solid #FECACA', marginTop: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', borderBottom: '1px solid #FEE2E2', paddingBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#EF4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                      !
                    </div>
                    <div>
                      <h4 style={{ color: '#991B1B', margin: '0 0 4px 0', fontSize: '18px' }}>Delivery Exception</h4>
                      <p style={{ color: '#B91C1C', margin: 0, fontSize: '14px' }}>Customer reported package not received.</p>
                    </div>
                  </div>
                  <p style={{ color: '#7F1D1D', fontSize: '14px', margin: '0 0 20px 0', lineHeight: '1.5' }}>
                    Our dispatch team has been notified of the discrepancy. We are currently contacting the driver (Vehicle WP-9791) to verify the GPS drop-off coordinates and resolve this issue immediately.
                  </p>
                  <button style={{ backgroundColor: '#EF4444', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }} onClick={() => alert("Redirecting to Customer Support portal...")}>
                    Contact Support
                  </button>
                </div>

              ) : (

                // STEPS 1, 2, 3: LIVE MAP UI
                <LiveMap 
                  lat={orderData.lat} 
                  lng={orderData.lng} 
                  startLat={orderData.startLat} 
                  startLng={orderData.startLng} 
                  destLat={orderData.destLat} 
                  destLng={orderData.destLng} 
                />

              )}

              {/* Frontend-Only CRUD UI for Delivery Notes */}
              <div style={{ marginTop: '24px', padding: '24px', backgroundColor: '#F9FAFB', borderRadius: '12px', border: '1px dashed #D1D5DB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, color: '#1F2937', fontSize: '15px' }}>Delivery Note</h4>
                  
                  {/* EDIT & DELETE BUTTONS */}
                  {customerNote && !isEditingNote && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => { setIsEditingNote(true); setDraftNote(customerNote); }} style={{ fontSize: '12px', padding: '6px 12px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: 'white', color: '#374151', fontWeight: '500' }}>Edit</button>
                      <button onClick={() => setCustomerNote('')} style={{ fontSize: '12px', padding: '6px 12px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #FCA5A5', backgroundColor: '#FEF2F2', color: '#DC2626', fontWeight: '500' }}>Delete</button>
                    </div>
                  )}
                </div>

                {!customerNote || isEditingNote ? (
                  // CREATE / UPDATE INPUT FORM
                  <div style={{ display: 'flex', gap: '12px' }} className="mobile-col">
                    <input 
                      type="text" 
                      value={draftNote}
                      onChange={(e) => setDraftNote(e.target.value)}
                      placeholder="e.g., Leave at the security gate..." 
                      style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', outline: 'none' }}
                    />
                    <button 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        if(draftNote.trim()) {
                          setCustomerNote(draftNote);
                          setIsEditingNote(false);
                        }
                      }}
                      style={{ padding: '10px 20px', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                    >
                      {isEditingNote ? 'Update Note' : 'Save Note'}
                    </button>
                    
                    {isEditingNote && (
                       <button onClick={() => setIsEditingNote(false)} style={{ padding: '10px 20px', backgroundColor: '#E5E7EB', color: '#374151', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                    )}
                  </div>
                ) : (
                  // READ MODE (Displaying the saved note)
                  <div style={{ padding: '12px 16px', backgroundColor: '#ECFDF5', borderRadius: '8px', color: '#065F46', fontSize: '14px', border: '1px solid #A7F3D0' }}>
                    <strong>Note:</strong> {customerNote}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;