import { supabase } from './supabaseClient';

// Car service - database operations for cars
export const carService = {
  // Get all cars with optional status filter
  async getCars(status = null) {
    try {
      let query = supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching cars:', error);
      return { data: null, error };
    }
  },

  // Get single car by ID
  async getCarById(id) {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching car:', error);
      return { data: null, error };
    }
  },

  // Create new car (requires auth)
  async createCar(carData) {
    try {
      const { data, error } = await supabase
        .from('cars')
        .insert([carData])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating car:', error);
      return { data: null, error };
    }
  },

  // Update car (requires auth)
  async updateCar(id, updates) {
    try {
      const { data, error } = await supabase
        .from('cars')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating car:', error);
      return { data: null, error };
    }
  },

  // Delete car (requires auth)
  async deleteCar(id) {
    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting car:', error);
      return { error };
    }
  },

  // Mark car as sold
  async markAsSold(id) {
    return this.updateCar(id, {
      status: 'sold',
      sold_at: new Date().toISOString()
    });
  },

  // Search cars with filters
  async searchCars(filters) {
    try {
      let query = supabase.from('cars').select('*');

      if (filters.brand) {
        query = query.ilike('brand', `%${filters.brand}%`);
      }
      if (filters.model) {
        query = query.ilike('model', `%${filters.model}%`);
      }
      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters.minYear) {
        query = query.gte('year', filters.minYear);
      }
      if (filters.maxYear) {
        query = query.lte('year', filters.maxYear);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error searching cars:', error);
      return { data: null, error };
    }
  }
};

// Inquiry service - contact form operations
export const inquiryService = {
  // Create new inquiry
  async createInquiry(inquiryData) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([inquiryData])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating inquiry:', error);
      return { data: null, error };
    }
  },


  // Get all inquiries (requires auth)
  async getInquiries() {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      return { data: null, error };
    }
  },

  // Update inquiry status (requires auth)
  async updateInquiryStatus(id, status) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating inquiry:', error);
      return { data: null, error };
    }
  }
};

// Storage service - image upload operations
export const storageService = {
  // Upload car image
  async uploadCarImage(file, carId = null) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${carId || Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `cars/${fileName}`;

      const { error } = await supabase.storage
        .from('car-images')
        .upload(filePath, file);

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('car-images')
        .getPublicUrl(filePath);

      return { data: { path: filePath, url: urlData.publicUrl }, error: null };
    } catch (error) {
      console.error('Error uploading image:', error);
      return { data: null, error };
    }
  },

  // Delete image
  async deleteImage(filePath) {
    try {
      const { error } = await supabase.storage
        .from('car-images')
        .remove([filePath]);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting image:', error);
      return { error };
    }
  }
};
