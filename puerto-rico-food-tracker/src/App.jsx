import React, { useState } from 'react';
import { Heart, MapPin, Calendar, Star, Image, Map, Utensils, BadgeCheck } from 'lucide-react';

const LOCATIONS = [
  { id: 1, name: "1LB Sandwich Mezclita", location: "Florida" },
  { id: 2, name: "El Bebesito Quesito", location: "Bayamon" },
  { id: 3, name: "Cajota de Palitos", location: "Arecibo" },
  { id: 4, name: "Limbers en Canasta", location: "Ceiba" },
  { id: 5, name: "Mofongo Pa Mellao", location: "Bayamon" },
  { id: 6, name: "Pincho Box XXL", location: "Arecibo" },
  { id: 7, name: "Rellenos Volcanicos", location: "San Sebastian" },
  { id: 8, name: "Mofongo Chino Bowl", location: "Toa Baja" },
  { id: 9, name: "Egg Roll Gigante", location: "Cataño" },
  { id: 10, name: "Bolas de Carne Frita", location: "Dorado" },
  { id: 11, name: "Empanadilla Gigante", location: "Guayanilla", restaurant: "Upa Upa Bar & Grill" },
  { id: 12, name: "Bandeja Las de Cayey", location: "Coamo", restaurant: "Rest Patria" },
  { id: 13, name: "Rellenos Gigantes", location: "Cataño", restaurant: "El Punto Sabroso" },
  { id: 14, name: "Sandwick 7 Carnes", location: "Ponce", restaurant: "Rest El Agueybana" },
  { id: 15, name: "Langosta Mampostea", location: "Naguabo", restaurant: "Super Benjys Cuisine" },
  { id: 16, name: "Bandeja Gigante", location: "Sabana Grande", restaurant: "Krambas Rest" },
  { id: 17, name: "Frape Gigante con Sundae", location: "Naguabo", restaurant: "Frapes by G" },
  { id: 18, name: "Carnaval de Comida Boricua", location: "Santa Isabel", restaurant: "Carnaval Rest" },
  { id: 19, name: "Rest Tematico de 60's", location: "Cabo Rojo", restaurant: "Angry Bull Rest" },
  { id: 20, name: "Limbers de Bola", location: "Cabo Rojo", restaurant: "CoolTura" },
  { id: 21, name: "Sanwich de Mariscos", location: "Guanica", restaurant: "Tranquilandia Rest" },
  { id: 22, name: "Alcapurria de Granos", location: "Hatillo", restaurant: "Tripurrias del Compay" },
  { id: 23, name: "Sopa Fongo", location: "Trujillo Alto", restaurant: "Las Jibaritas" },
  { id: 24, name: "Hotdogs Monumentales", location: "Aguada", restaurant: "Tremendogs" },
  { id: 25, name: "Mofongo 3 Capas", location: "Coamo", restaurant: "La Ceiba Rest" },
  { id: 26, name: "Aguacate Relleno", location: "Levitown", restaurant: "Perras K Lientes" },
  { id: 27, name: "Caldo de Pescao", location: "Isabela", restaurant: "La Cara del Indio" },
  { id: 28, name: "Pinyac pinchos y hayacas", location: "Caimito", restaurant: "Las Vaqueras" },
  { id: 29, name: "Sanwichito del Jibaro", location: "Salinas", restaurant: "Hacienda los Maldonado" },
  { id: 30, name: "Pollos Rellenaos", location: "Barranquitas", restaurant: "JR BBQ" },
  { id: 31, name: "Bandeja del Don", location: "Añasco", restaurant: "Don Maceta Rest" },
  { id: 32, name: "Esquimalitos de 1 Pie", location: "Lajas", restaurant: "los Sueños Farm" },
  { id: 33, name: "Langosta al Grill", location: "Patillas", restaurant: "Sol Pesca Rest" }
].map(loc => ({
  ...loc,
  visited: false,
  rating: 0,
  date: "",
  notes: "",
  photos: []
}));

const FoodAdventureTracker = () => {
  const [locations, setLocations] = useState(LOCATIONS);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleVisited = (id) => {
    setLocations(locations.map(loc => 
      loc.id === id ? {...loc, visited: !loc.visited} : loc
    ));
  };

  const updateRating = (id, star) => {
    setLocations(locations.map(loc => 
      loc.id === id ? {...loc, rating: star} : loc
    ));
  };

  const updateNotes = (id, notes) => {
    setLocations(locations.map(loc => 
      loc.id === id ? {...loc, notes} : loc
    ));
  };

  const updateDate = (id, date) => {
    setLocations(locations.map(loc => 
      loc.id === id ? {...loc, date} : loc
    ));
  };

  const addPhoto = (id) => {
    setLocations(locations.map(loc => 
      loc.id === id ? {
        ...loc, 
        photos: [...loc.photos, "/api/placeholder/400/300"]
      } : loc
    ));
  };

  const openMap = (location) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  const filteredLocations = locations.filter(loc => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'visited' ? loc.visited :
      !loc.visited;

    const matchesSearch = 
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (loc.restaurant || '').toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const visitedCount = locations.filter(l => l.visited).length;
  const progressPercentage = (visitedCount / locations.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 font-sans">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-white">
              Puerto Rico Food Adventure Tracker
            </h1>
            <div className="bg-white/20 rounded-lg px-4 py-2 text-white">
              <span className="font-medium">{visitedCount}</span>
              <span className="mx-2">/</span>
              <span>{locations.length}</span>
              <span className="ml-2">Places Visited</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search places, locations, or restaurants..."
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['all', 'visited', 'planned'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    filter === f 
                      ? 'bg-white text-purple-600 shadow-md' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-white/10 rounded-lg p-3">
            <div className="h-2 bg-white/20 rounded-full">
              <div 
                className="h-2 bg-white rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map(location => (
            <div 
              key={location.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden border-2 transition-all hover:shadow-lg ${
                location.visited ? 'border-green-500' : 'border-gray-200'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-gray-800">{location.name}</h3>
                  <button
                    onClick={() => toggleVisited(location.id)}
                    className={`p-2 rounded-full transition-all ${
                      location.visited 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {location.visited ? <BadgeCheck className="h-6 w-6" /> : <Heart className="h-6 w-6" />}
                  </button>
                </div>
                
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{location.location}</span>
                  </div>
                  <button 
                    onClick={() => openMap(location.location)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                    title="Open in Maps"
                  >
                    <Map className="h-4 w-4" />
                  </button>
                </div>

                {location.restaurant && (
                  <div className="flex items-center text-gray-600 mb-4">
                    <Utensils className="h-4 w-4 mr-2" />
                    <span>{location.restaurant}</span>
                  </div>
                )}

                {location.visited && (
                  <div className="space-y-4 mt-6">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 cursor-pointer transition-colors ${
                            location.rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                          onClick={() => updateRating(location.id, star)}
                        />
                      ))}
                    </div>

                    <div className="flex items-center bg-gray-50 rounded-lg p-3">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <input
                        type="date"
                        className="bg-transparent w-full focus:outline-none text-gray-700"
                        value={location.date}
                        onChange={(e) => updateDate(location.id, e.target.value)}
                      />
                    </div>

                    <textarea
                      className="w-full p-3 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Add your notes about this place..."
                      value={location.notes}
                      onChange={(e) => updateNotes(location.id, e.target.value)}
                      rows="3"
                    />

                    <div className="space-y-3">
                      {location.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Visit to ${location.name}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ))}
                      <button
                        onClick={() => addPhoto(location.id)}
                        className="w-full p-3 border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-50 transition-all flex items-center justify-center"
                      >
                        <Image className="h-5 w-5 mr-2" />
                        Add Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodAdventureTracker;