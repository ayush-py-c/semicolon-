import React, { useState } from 'react';

// Mock data for survival skills and resources
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
  const [activeSection, setActiveSection] = useState('dashboard');
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <div className="min-h-screen bg-black text-green-300 font-mono p-6">
      <div className="container mx-auto">
        {/* Terminal Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl uppercase tracking-widest text-green-300">
            Wasteland Survival Network
          </h1>
          <p className="text-sm text-green-500">
            Terminal v2.7 - AUTHORIZED ACCESS ONLY
          </p>
        </header>

        {/* Authentication Section */}
        {!isLoggedIn ? (
          <div className="max-w-2xl mx-auto bg-neutral-900 border border-green-800 p-8">
            <h2 className="text-2xl mb-6 text-green-300 uppercase">
              User Authentication
            </h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="USERNAME" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-black text-green-300 border border-green-700 uppercase tracking-wider"
              />
              <input 
                type="password" 
                placeholder="ACCESS CODE" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-black text-green-300 border border-green-700 tracking-wider"
              />
              <button 
                onClick={handleLogin}
                className="w-full p-3 bg-green-800 text-black uppercase tracking-wider hover:bg-green-700"
              >
                Initialize Connection
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Navigation */}
            <div className="flex mb-8 space-x-4 justify-center">
              {['dashboard', 'skills', 'resources', 'alerts'].map(section => (
                <button 
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 uppercase ${
                    activeSection === section 
                      ? 'bg-green-800 text-black' 
                      : 'bg-neutral-900 text-green-300'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Active Section Content */}
            {activeSection === 'dashboard' && (
              <div className="bg-neutral-900 border border-green-800 p-8">
                <h2 className="text-2xl mb-4 text-green-300">
                  RESIDENT PROFILE: {userProfile.username}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p>Family: {userProfile.familyName}</p>
                    <p>Rank: {userProfile.rank}</p>
                    <p>Radiation Exposure: {userProfile.radiation_exposure}</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="bg-neutral-900 border border-green-800 p-8">
                <h2 className="text-2xl mb-4 text-green-300">
                  SURVIVAL SKILLS DATABASE
                </h2>
                {survivalSkills.map(skill => (
                  <div key={skill.id} className="mb-4 p-4 bg-black border border-green-700">
                    <h3 className="text-xl text-green-300">{skill.name}</h3>
                    <p>Level: {skill.level}</p>
                    <p>{skill.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'resources' && (
              <div className="bg-neutral-900 border border-green-800 p-8">
                <h2 className="text-2xl mb-4 text-green-300">
                  RESOURCE TRADING TERMINAL
                </h2>
                {resourceListings.map(resource => (
                  <div 
                    key={resource.id} 
                    className="mb-4 p-4 bg-black border border-green-700 grid grid-cols-2"
                  >
                    <div>
                      <h3 className="text-xl text-green-300">{resource.name}</h3>
                      <p>Quantity: {resource.quantity}</p>
                      <p>Trader: {resource.trader}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-green-800 text-white px-2 py-1">
                        {resource.rarity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'alerts' && (
              <div className="bg-neutral-900 border border-green-800 p-8">
                <h2 className="text-2xl mb-4 text-green-300">
                  EMERGENCY BROADCAST SYSTEM
                </h2>
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FalloutSurvivalNetwork;