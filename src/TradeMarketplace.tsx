import React, { useState } from 'react';

const TradeMarketplace = () => {
  const [trades, setTrades] = useState([]);
  const [newTrade, setNewTrade] = useState({
    itemName: '',
    category: '',
    tradeType: '',
    price: '',
    lookingToTradeFor: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrade(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitTrade = () => {
    if (Object.values(newTrade).some(field => field.trim() === '')) {
      alert('Please fill out all fields');
      return;
    }

    const tradeToAdd = {
      ...newTrade,
      id: Date.now(),
      timestamp: new Date().toLocaleString()
    };

    setTrades(prev => [tradeToAdd, ...prev]);
    
    // Reset form
    setNewTrade({
      itemName: '',
      category: '',
      tradeType: '',
      price: '',
      lookingToTradeFor: '',
      description: ''
    });
  };

  return (
    <div className="mt-6 bg-black border border-yellow-700 p-4">
      <h3 className="text-xl mb-3 text-yellow-300">
        <span className='flicker-effect'>&#8594; </span>WASTELAND TRADE MARKETPLACE
      </h3>

      {/* Trade Listing Form */}
      <div className="grid gap-4 mb-6">
        <input 
          type="text"
          name="itemName"
          value={newTrade.itemName}
          onChange={handleInputChange}
          placeholder="ITEM NAME"
          className="w-full p-3 bg-black text-yellow-300 border border-yellow-700 uppercase tracking-wider"
        />
        <select 
          name="category"
          value={newTrade.category}
          onChange={handleInputChange}
          className="w-full p-3 bg-black text-yellow-300 border border-yellow-700 uppercase tracking-wider"
        >
          <option value="">SELECT CATEGORY</option>
          <option value="Weapons">WEAPONS</option>
          <option value="Medical">MEDICAL</option>
          <option value="Food">FOOD</option>
          <option value="Ammunition">AMMUNITION</option>
          <option value="Misc">MISCELLANEOUS</option>
        </select>
        <select 
          name="tradeType"
          value={newTrade.tradeType}
          onChange={handleInputChange}
          className="w-full p-3 bg-black text-yellow-300 border border-yellow-700 uppercase tracking-wider"
        >
          <option value="">SELECT TRADE TYPE</option>
          <option value="SELL">SELL</option>
          <option value="TRADE">TRADE</option>
          <option value="BARTER">BARTER</option>
        </select>
        <input 
          type="text"
          name="price"
          value={newTrade.price}
          onChange={handleInputChange}
          placeholder="PRICE (CAPS)"
          className="w-full p-3 bg-black text-yellow-300 border border-yellow-700 uppercase tracking-wider"
        />
        <input 
          type="text"
          name="lookingToTradeFor"
          value={newTrade.lookingToTradeFor}
          onChange={handleInputChange}
          placeholder="LOOKING TO TRADE FOR"
          className="w-full p-3 bg-black text-yellow-300 border border-yellow-700 uppercase tracking-wider"
        />
        <textarea 
          name="description"
          value={newTrade.description}
          onChange={handleInputChange}
          placeholder="ITEM DESCRIPTION"
          rows="4"
          className="w-full p-3 bg-black text-yellow-300 border border-yellow-700 uppercase tracking-wider"
        />
        <button 
          onClick={handleSubmitTrade}
          className="w-full p-3 bg-yellow-800 text-black uppercase tracking-wider hover:bg-yellow-700"
        >
          POST TRADE LISTING
        </button>
      </div>

      {/* Trade Listings */}
      <div className="max-h-64 overflow-y-auto">
        <h4 className="text-lg mb-3 text-yellow-300">
          <span className='flicker-effect'>&#8594; </span>CURRENT TRADE LISTINGS
        </h4>
        {trades.map(trade => (
          <div 
            key={trade.id} 
            className="mb-2 p-3 bg-neutral-900 border border-yellow-800"
          >
            <div className="flex justify-between mb-2">
              <h5 className="text-yellow-400 font-bold">{trade.itemName}</h5>
              <span className="text-yellow-600 text-xs">{trade.timestamp}</span>
            </div>
            <div className="text-yellow-300 text-sm">
              <p><strong>Category:</strong> {trade.category}</p>
              <p><strong>Trade Type:</strong> {trade.tradeType}</p>
              <p><strong>Price:</strong> {trade.price} CAPS</p>
              <p><strong>Looking For:</strong> {trade.lookingToTradeFor}</p>
              <p><strong>Description:</strong> {trade.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeMarketplace;