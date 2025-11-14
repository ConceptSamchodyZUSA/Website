import { supabase, supabaseAdmin } from './supabaseClient';

// Car service - database operations for cars
export const carService = {
  // Get all cars with optional status filter (public access)
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

  // Get single car by ID (public access)
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

  // Create new car (admin only - uses service role)
  async createCar(carData) {
    try {
      const { data, error } = await supabaseAdmin
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

  // Update car (admin only - uses service role)
  async updateCar(id, updates) {
    try {
      const { data, error } = await supabaseAdmin
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

  // Delete car (admin only - uses service role)
  async deleteCar(id) {
    try {
      const { error } = await supabaseAdmin
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

  // Search cars with filters (public access)
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
  // Create new inquiry (public access)
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

  // Get all inquiries (admin only - uses service role)
  async getInquiries() {
    try {
      const { data, error } = await supabaseAdmin
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

  // Update inquiry status (admin only - uses service role)
  async updateInquiryStatus(id, status) {
    try {
      const { data, error } = await supabaseAdmin
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
  // Upload multiple car images (admin only - uses service role)
  async uploadCarImages(files, carId = null) {
    try {
      const uploadPromises = files.map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${carId || Date.now()}-${index}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `cars/${fileName}`;

        const { error } = await supabaseAdmin.storage
          .from('car-images')
          .upload(filePath, file);

        if (error) throw error;

        // Get public URL
        const { data: urlData } = supabaseAdmin.storage
          .from('car-images')
          .getPublicUrl(filePath);

        return { path: filePath, url: urlData.publicUrl };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      return { data: uploadedImages, error: null };
    } catch (error) {
      console.error('Error uploading images:', error);
      return { data: null, error };
    }
  },

  // Upload single car image (backward compatibility)
  async uploadCarImage(file, carId = null) {
    const result = await this.uploadCarImages([file], carId);
    if (result.error) return result;
    return { data: result.data[0], error: null };
  },

  // Delete multiple images (admin only - uses service role)
  async deleteImages(filePaths) {
    try {
      const { error } = await supabaseAdmin.storage
        .from('car-images')
        .remove(filePaths);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting images:', error);
      return { error };
    }
  },

  // Delete single image (backward compatibility)
  async deleteImage(filePath) {
    return this.deleteImages([filePath]);
  },

  // Extract file path from Supabase public URL
  extractPathFromUrl(url) {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/car-images/');
      return pathParts.length > 1 ? `cars/${pathParts[1]}` : null;
    } catch {
      return null;
    }
  }
};
