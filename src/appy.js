import React, { useState } from 'react';

// Mock data (kept from original code)
const survivalSkills = [
  { id: 1, name: 'Radiation Resistance', level: 'Expert', description: 'Ability to withstand high radiation levels' },
  { id: 2, name: 'First Aid', level: 'Advanced', description: 'Emergency medical treatment techniques' },
  { id: 3, name: 'Scavenging', level: 'Master', description: 'Efficient resource collection in wasteland' }
];

const resourceListings = [
  { 
    id: 1, 
    name: 'Purified Water', 
    quantity: 50, 
    trader: 'Vault Dweller 101', 
    rarity: 'Common',
    condition: 'Excellent'
  },
  { 
    id: 2, 
    name: 'Rad-X Medication', 
    quantity: 15, 
    trader: 'Wasteland Medic', 
    rarity: 'Rare',
    condition: 'Limited Stock'
  }
];

const FalloutSurvivalNetwork = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Wasteland Radio',
      message: 'Welcome to the Survivor Network. Stay alert, stay alive.',
      timestamp: new Date('2077-10-23T12:00:00').toLocaleString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleLogin = () => {
    if (username && password) {
      setUserProfile({
        username: 'VaultDweller_42',
        familyName: 'Vault113',
        rank: 'Vault Resident',
        radiation_exposure: '2.3 Rads/hr'
      });
      setIsLoggedIn(true);
    }
  };

  const simulateEmergencyAlert = (message) => {
    const newAlert = {
      id: Date.now(),
      message: message,
      timestamp: new Date().toLocaleString()
    };
    setEmergencyAlerts(prev => [newAlert, ...prev]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && userProfile) {
      const messageToSend = {
        id: Date.now(),
        sender: userProfile.username,
        message: newMessage,
        timestamp: new Date().toLocaleString()
      };
      
      setChatMessages(prevMessages => [messageToSend, ...prevMessages]);
      setNewMessage('');
    }
  };

  const renderChatSection = () => (
    <div className="noscrollbar mt-6 bg-black border border-yellow-700 p-4">
      <h3 className=" text-xl mb-3 text-yellow-300"><span className='flicker-effect'>&#8594; </span>SURVIVOR COMM CHANNEL</h3>
      
      {/* Message Input Area */}
      <div className="flex mb-4">
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="ENTER TRANSMISSION..."
          className=" flex-grow p-2 bg-black text-yellow-300 border border-yellow-700 uppercase tracking-wider no"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button 
          onClick={handleSendMessage}
          className="ml-2 px-4 bg-yellow-800 text-black uppercase hover:bg-yellow-700"
        >
          Send
        </button>
      </div>
      
      {/* Message Display Area */}
      <div className="max-h-64 overflow-y-auto">
        {chatMessages.map(msg => (
          <div 
            key={msg.id} 
            className="mb-2 p-3 bg-neutral-900 border border-yellow-800"
          >
            <div className="flex justify-between mb-1">
              <span className="text-yellow-400 font-bold">{msg.sender}</span>
              <span className="text-xs text-yellow-600">{msg.timestamp}</span>
            </div>
            <p className="text-yellow-300">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-yellow-300 font-mono p-6">
      <div className="container mx-auto">
        {/* Terminal Header with Highlighted Font */}
        <header className="text-center mb-8">
          <h1 className="flicker-effect text-4xl uppercase tracking-widest text-yellow-300 
            bg-gradient-to-r from-yellow-400 to-yellow-600 
            text-transparent bg-clip-text 
            animate-pulse">
            Wasteland Survival Network
          </h1>
          <p className="text-sm text-yellow-500">
          <span className='flicker-effect'>&#8594; </span>Terminal v2.7 - AUTHORIZED ACCESS ONLY
          </p>
        </header>

        {/* Authentication Section */}
        {!isLoggedIn ? (
          <div className="max-w-2xl mx-auto bg-neutral-900 border border-yellow-800 p-8">
            <h2 className="flicker-effect text-2xl mb-6 text-yellow-300 uppercase">
              User Authentication
            </h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="USERNAME" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-black text-yellow-300 border border-yellow-700 uppercase tracking-wider"
              />
              <input 
                type="password" 
                placeholder="ACCESS CODE" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-black text-yellow-300 border border-yellow-700 tracking-wider"
              />
              <button 
                onClick={handleLogin}
                className="w-full p-3 bg-yellow-800 text-black uppercase tracking-wider hover:bg-yellow-700"
              >
                Initialize Connection
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-neutral-900 border border-yellow-800 p-8">
            <h2 className=" text-2xl mb-4 text-yellow-300">
              <span className='flicker-effect'>&#8594; </span> RESIDENT PROFILE: {userProfile.username}
            </h2>
            
            {/* Dashboard Content */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Profile Section */}
              <div className="bg-black border border-yellow-700 p-4">
                <h3 className="text-xl mb-3 text-yellow-300"><span className='flicker-effect'>&gt; </span>PERSONAL INFO</h3>
                <p>Family: {userProfile.familyName}</p>
                <p>Rank: {userProfile.rank}</p>
                <p>Radiation Exposure: {userProfile.radiation_exposure}</p>
              </div>

              {/* Survival Skills Section */}
              <div className="bg-black border border-yellow-700 p-4">
                <h3 className="text-xl mb-3 text-yellow-300"><span className='flicker-effect'>&gt; </span>SURVIVAL SKILLS</h3>
                {survivalSkills.map(skill => (
                  <div key={skill.id} className="mb-2">
                    <h4 className="text-yellow-400">{skill.name}</h4>
                    <p className="text-sm">Level: {skill.level}</p>
                    <p className="text-xs">{skill.description}</p>
                  </div>
                ))}
              </div>
              

              {/* Resource Listings Section */}
              <div className="bg-black border border-yellow-700 p-4">
                <h3 className="text-xl mb-3 text-yellow-300"><span className='flicker-effect'>&gt; </span>RESOURCE INVENTORY</h3>
                {resourceListings.map(resource => (
                  <div key={resource.id} className="mb-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-yellow-400">{resource.name}</h4>
                      <span className="bg-yellow-800 text-white text-xs px-2 py-1 rounded">
                        {resource.rarity}
                      </span>
                    </div>
                    <p className="text-sm">Quantity: {resource.quantity}</p>
                    <p className="text-xs">Trader: {resource.trader}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Alerts Section */}
            <div className="mt-6 bg-black border border-red-700 p-4">
              <h3 className="text-xl mb-3 text-red-300"><span className='flicker-effect'>&#8594; </span>EMERGENCY BROADCASTS</h3>
              <button 
                onClick={() => simulateEmergencyAlert('RADIATION STORM DETECTED IN SECTOR 7')}
                className="mb-4 px-4 py-2 bg-red-800 text-white uppercase"
              >
                Simulate Emergency Alert
              </button>
              {emergencyAlerts.map(alert => (
                <div 
                  key={alert.id} 
                  className="mb-2 p-3 bg-red-900/50 border border-red-700"
                >
                  <p className="text-red-300">{alert.message}</p>
                  <p className="text-xs text-red-500">{alert.timestamp}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-black border border-yellow-700 p-4">
              <h3 className="text-xl mb-3 text-yellow-300"><span className='flicker-effect'>&#8594; </span>KEY SURVIVAL TACTICS</h3>&nbsp;
                <p><span className='flicker-effect'>&gt; </span>Only carry essential items as ammo and even your character's supplies have weight.</p>&nbsp;
                <p><span className='flicker-effect'>&gt; </span>Avoid unnecessary fights, take cover, and use the environment to your advantage. 
                </p>&nbsp;&nbsp;
                <p><span className='flicker-effect'>&gt; </span>Establish settlements to grow food, produce water, and build medical stations. </p>&nbsp;
                <p><span className='flicker-effect'>&gt; </span>Locate doctors on the map to quickly heal injuries and illnesses</p>&nbsp;
                <p><span className='flicker-effect'>&gt; </span>Consider playing solo to benefit from the Lone Wanderer perk which increases carry weight.</p>&nbsp;
              
            </div>

            {/* Chat Section */}
            {renderChatSection()}
          </div>
        )}
      </div>
    </div>
  );
};

export default FalloutSurvivalNetwork;
