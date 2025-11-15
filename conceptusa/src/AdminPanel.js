import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, LogOut, Upload } from 'lucide-react';
import { carService, inquiryService, storageService } from './services';
import bcrypt from 'bcryptjs';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [cars, setCars] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('cars');
  const [editingCar, setEditingCar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Filters for cars
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Password hash - bcrypt secured
  // To change: node generate-password-hash.js "YourNewPassword"
  const ADMIN_PASSWORD_HASH = '$2b$10$htMN/d9XtcPPiEp62dLcl.57HA8o2S6CgOcjVGy2BgujYagjY2Icu';

  const loadData = useCallback(async () => {
    setLoading(true);
    if (activeTab === 'cars') {
      const { data } = await carService.getCars();
      setCars(data || []);
    } else {
      const { data } = await inquiryService.getInquiries();
      setInquiries(data || []);
    }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  const handleLogin = (e) => {
    e.preventDefault();
    const isPasswordCorrect = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);

    if (isPasswordCorrect) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('❌ Nieprawidłowe hasło!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten samochód?')) return;

    // Get car to delete its images from storage
    const car = cars.find(c => c.id === id);
    if (car && car.images && Array.isArray(car.images)) {
      // Extract paths and delete images
      const paths = car.images
        .map(url => storageService.extractPathFromUrl(url))
        .filter(Boolean);
      if (paths.length > 0) {
        await storageService.deleteImages(paths);
      }
    }

    const { error } = await carService.deleteCar(id);
    if (error) {
      alert('Błąd podczas usuwania samochodu');
    } else {
      loadData();
    }
  };

  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validate file types
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      alert('Wszystkie pliki muszą być obrazami');
      return;
    }

    // Validate file sizes (max 5MB each)
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert('Każdy plik może mieć maksymalnie 5MB');
      return;
    }

    setUploadingImage(true);
    const { data, error } = await storageService.uploadCarImages(files, editingCar?.id);
    setUploadingImage(false);

    if (error) {
      console.error('Upload error:', error);
      alert('Błąd podczas uploadu zdjęć');
    } else {
      const currentImages = editingCar.images || [];
      const newImageUrls = data.map(img => img.url);
      setEditingCar({
        ...editingCar,
        images: [...currentImages, ...newImageUrls]
      });
      alert(`Przesłano ${files.length} zdjęć!`);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = editingCar.images.filter((_, index) => index !== indexToRemove);
    setEditingCar({...editingCar, images: updatedImages});
  };

  const handleMoveImage = (fromIndex, direction) => {
    const images = [...editingCar.images];
    const toIndex = direction === 'left' ? fromIndex - 1 : fromIndex + 1;

    if (toIndex < 0 || toIndex >= images.length) return;

    [images[fromIndex], images[toIndex]] = [images[toIndex], images[fromIndex]];
    setEditingCar({...editingCar, images});
  };

  const handleSaveCar = async () => {
    if (!editingCar.brand || !editingCar.model || !editingCar.year || !editingCar.price) {
      alert('Wypełnij wszystkie wymagane pola (Marka, Model, Rok, Cena)');
      return;
    }

    const carData = {
      ...editingCar,
      price: parseFloat(editingCar.price),
      year: parseInt(editingCar.year),
      mileage: parseInt(editingCar.mileage || 0),
      engine_capacity: editingCar.engine_capacity ? parseFloat(editingCar.engine_capacity) : null,
      horsepower: editingCar.horsepower ? parseInt(editingCar.horsepower) : null
    };

    let error;
    if (editingCar.id) {
      ({ error } = await carService.updateCar(editingCar.id, carData));
    } else {
      ({ error } = await carService.createCar(carData));
    }

    if (error) {
      alert('Błąd podczas zapisywania samochodu');
    } else {
      setEditingCar(null);
      loadData();
    }
  };

  const handleUpdateInquiryStatus = async (id, newStatus) => {
    const { error } = await inquiryService.updateInquiryStatus(id, newStatus);
    if (error) {
      alert('Błąd podczas aktualizacji statusu');
    } else {
      loadData();
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Panel Administracyjny
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Hasło</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Wpisz hasło administratora"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Zaloguj się
            </button>
          </form>
          <p className="mt-4 text-gray-400 text-sm text-center">
            🔐 Hasło jest zabezpieczone hashowaniem bcrypt
          </p>
        </div>
      </div>
    );
  }

  // Admin Panel
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panel Administracyjny</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
          >
            <LogOut size={20} />
            Wyloguj
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('cars')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'cars'
                ? 'bg-red-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Samochody ({cars.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'inquiries'
                ? 'bg-red-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Zapytania ({inquiries.length})
          </button>
        </div>

        {/* Cars Tab */}
        {activeTab === 'cars' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">Zarządzanie samochodami</h2>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={filterBrand}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  className="bg-gray-700 px-4 py-2 rounded-lg"
                >
                  <option value="all">Wszystkie marki</option>
                  {[...new Set(cars.map(car => car.brand))].sort().map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-700 px-4 py-2 rounded-lg"
                >
                  <option value="all">Wszystkie statusy</option>
                  <option value="available">Dostępne</option>
                  <option value="sold">Sprzedane</option>
                </select>

                <button
                  onClick={() => setEditingCar({
                    brand: '',
                    model: '',
                    year: new Date().getFullYear(),
                    price: '',
                    mileage: '',
                    engine_capacity: '',
                    horsepower: '',
                    transmission: 'automatic',
                    drivetrain: 'RWD',
                    fuel_type: 'gasoline',
                    color: '',
                    status: 'available',
                    description: '',
                    images: []
                  })}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
                >
                  <Plus size={20} />
                  Dodaj samochód
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20">Ładowanie...</div>
            ) : (
              <div className="grid gap-4">
                {cars
                  .filter(car => filterBrand === 'all' || car.brand === filterBrand)
                  .filter(car => filterStatus === 'all' || car.status === filterStatus)
                  .map((car) => (
                  <div key={car.id} className="bg-gray-800 p-6 rounded-xl flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        {car.brand} {car.model} ({car.year})
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
                        <div>Cena: <span className="text-white font-semibold">{car.price?.toLocaleString()} PLN</span></div>
                        <div>Przebieg: {car.mileage?.toLocaleString()} mil</div>
                        <div>Silnik: {car.engine_capacity}L / {car.horsepower} KM</div>
                        <div>Status: <span className={`font-semibold ${car.status === 'available' ? 'text-green-400' : 'text-gray-400'}`}>
                          {car.status}
                        </span></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingCar(car)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Zapytania od klientów</h2>
            {loading ? (
              <div className="text-center py-20">Ładowanie...</div>
            ) : (
              <div className="grid gap-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-gray-800 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{inquiry.name}</h3>
                        <p className="text-gray-400">{inquiry.email} | {inquiry.phone}</p>
                      </div>
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleUpdateInquiryStatus(inquiry.id, e.target.value)}
                        className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm"
                      >
                        <option value="new">Nowe</option>
                        <option value="contacted">Skontaktowano</option>
                        <option value="closed">Zamknięte</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div><span className="text-gray-400">Marka:</span> {inquiry.brand || '-'}</div>
                      <div><span className="text-gray-400">Model:</span> {inquiry.model || '-'}</div>
                      <div><span className="text-gray-400">Budżet:</span> {inquiry.budget ? `${inquiry.budget} PLN` : '-'}</div>
                      <div><span className="text-gray-400">Rok:</span> {inquiry.year_range || '-'}</div>
                    </div>
                    {inquiry.message && (
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-400 mb-1">Wiadomość:</p>
                        <p>{inquiry.message}</p>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-4">
                      Utworzono: {new Date(inquiry.created_at).toLocaleString('pl-PL')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Edit Car Modal */}
        {editingCar && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-gray-800 rounded-xl max-w-3xl w-full p-8 my-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingCar.id ? 'Edytuj samochód' : 'Dodaj nowy samochód'}
                </h2>
                <button onClick={() => setEditingCar(null)}>
                  <X size={24} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Marka *</label>
                  <input
                    type="text"
                    value={editingCar.brand}
                    onChange={(e) => setEditingCar({...editingCar, brand: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Model *</label>
                  <input
                    type="text"
                    value={editingCar.model}
                    onChange={(e) => setEditingCar({...editingCar, model: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Rok *</label>
                  <input
                    type="number"
                    value={editingCar.year}
                    onChange={(e) => setEditingCar({...editingCar, year: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Cena (PLN) *</label>
                  <input
                    type="number"
                    value={editingCar.price}
                    onChange={(e) => setEditingCar({...editingCar, price: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Przebieg (mile)</label>
                  <input
                    type="number"
                    value={editingCar.mileage}
                    onChange={(e) => setEditingCar({...editingCar, mileage: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Pojemność (L)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingCar.engine_capacity}
                    onChange={(e) => setEditingCar({...editingCar, engine_capacity: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                    placeholder="np. 5.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Moc (KM)</label>
                  <input
                    type="number"
                    value={editingCar.horsepower}
                    onChange={(e) => setEditingCar({...editingCar, horsepower: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                    placeholder="np. 450"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Skrzynia biegów</label>
                  <select
                    value={editingCar.transmission}
                    onChange={(e) => setEditingCar({...editingCar, transmission: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                  >
                    <option value="automatic">Automatyczna</option>
                    <option value="manual">Manualna</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Napęd</label>
                  <select
                    value={editingCar.drivetrain || 'RWD'}
                    onChange={(e) => setEditingCar({...editingCar, drivetrain: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                  >
                    <option value="RWD">RWD (napęd na tył) 🔴</option>
                    <option value="FWD">FWD (napęd na przód) 🔵</option>
                    <option value="AWD">AWD (napęd na 4 koła) 🟠</option>
                    <option value="4WD">4WD (napęd na 4 koła) 🟠</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Paliwo</label>
                  <select
                    value={editingCar.fuel_type}
                    onChange={(e) => setEditingCar({...editingCar, fuel_type: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                  >
                    <option value="gasoline">Benzyna</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Elektryczny</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Kolor</label>
                  <input
                    type="text"
                    value={editingCar.color}
                    onChange={(e) => setEditingCar({...editingCar, color: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Status</label>
                  <select
                    value={editingCar.status}
                    onChange={(e) => setEditingCar({...editingCar, status: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                  >
                    <option value="available">Dostępny</option>
                    <option value="sold">Sprzedany</option>
                    <option value="reserved">Zarezerwowany</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Zdjęcia samochodu (pierwsze = główne)</label>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImagesUpload}
                      disabled={uploadingImage}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 file:cursor-pointer"
                    />
                    {uploadingImage && (
                      <p className="text-sm text-yellow-500 flex items-center gap-2">
                        <Upload size={16} className="animate-pulse" />
                        Uploading images...
                      </p>
                    )}

                    {/* Image Gallery Preview */}
                    {editingCar.images && editingCar.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {editingCar.images.map((imageUrl, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={imageUrl}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded border-2 border-gray-600 group-hover:border-red-500 transition"
                            />
                            {index === 0 && (
                              <div className="absolute top-1 left-1 bg-red-600 text-xs px-2 py-1 rounded">
                                Główne
                              </div>
                            )}
                            <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                              {index > 0 && (
                                <button
                                  onClick={() => handleMoveImage(index, 'left')}
                                  className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs"
                                  title="Przesuń w lewo"
                                >
                                  ←
                                </button>
                              )}
                              {index < editingCar.images.length - 1 && (
                                <button
                                  onClick={() => handleMoveImage(index, 'right')}
                                  className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs"
                                  title="Przesuń w prawo"
                                >
                                  →
                                </button>
                              )}
                              <button
                                onClick={() => handleRemoveImage(index)}
                                className="bg-red-600 hover:bg-red-700 text-white p-1 rounded text-xs"
                                title="Usuń"
                              >
                                ✕
                              </button>
                            </div>
                            <div className="text-center text-xs text-gray-400 mt-1">
                              {index + 1}/{editingCar.images.length}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Opis</label>
                  <textarea
                    value={editingCar.description}
                    onChange={(e) => setEditingCar({...editingCar, description: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2"
                    rows="3"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSaveCar}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition"
                >
                  <Save size={20} />
                  Zapisz
                </button>
                <button
                  onClick={() => setEditingCar(null)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-semibold transition"
                >
                  Anuluj
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
