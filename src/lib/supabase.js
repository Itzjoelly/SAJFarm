import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes('your-project-id') &&
    supabaseUrl.startsWith('https://')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================
// SUPABASE DATABASE OPERATIONS FOR SAJFARM
// ==========================================

/**
 * Fetch all orders from Supabase (or fallback to null if not configured)
 */
export async function dbFetchOrders() {
  if (!isSupabaseConfigured() || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch orders warning:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Failed to query Supabase orders:', err);
    return null;
  }
}

/**
 * Save new order into Supabase
 */
export async function dbInsertOrder(order) {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const payload = {
      id: order.id,
      customer_name: order.customerName,
      phone: order.phone,
      email: order.email,
      date: order.date || new Date().toLocaleString(),
      state: order.state,
      area: order.area,
      address: order.address,
      mandatory_fallback: order.mandatoryFallback,
      van_accessibility: order.vanAccessibility,
      items: order.items,
      delivery_fee: order.deliveryFee,
      total_amount: order.totalAmount,
      payment_method: order.paymentMethod,
      payment_status: order.paymentStatus,
      status: order.status,
      driver_name: order.driverName,
      driver_phone: order.driverPhone,
      van_plate: order.vanPlate,
      estimated_arrival: order.estimatedArrival,
      timeline: order.timeline
    };

    const { error } = await supabase.from('orders').insert([payload]);
    if (error) {
      console.warn('Supabase insert order warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Failed to insert order to Supabase:', err);
    return false;
  }
}

/**
 * Update order status and timeline in Supabase
 */
export async function dbUpdateOrderStatus(orderId, newStatus, newTimeline) {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const { error } = await supabase
      .from('orders')
      .update({
        status: newStatus,
        timeline: newTimeline
      })
      .eq('id', orderId);

    if (error) {
      console.warn('Supabase update order status warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Failed to update order status in Supabase:', err);
    return false;
  }
}

/**
 * Customer Registration in Supabase
 */
export async function dbRegisterCustomer(customerData) {
  if (!isSupabaseConfigured() || !supabase) return null;
  try {
    const payload = {
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      password: customerData.password, // In real backend or Supabase Auth
      state: customerData.state || 'Lagos State',
      area: customerData.area || 'Ikeja',
      address: customerData.address || '',
      mandatory_fallback: customerData.mandatoryFallback || ''
    };

    // Upsert customer by phone
    const { data, error } = await supabase
      .from('customers')
      .upsert([payload], { onConflict: 'phone' })
      .select()
      .single();

    if (error) {
      console.warn('Supabase customer registration warning:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Failed to register customer in Supabase:', err);
    return null;
  }
}

/**
 * Fetch all registered customers from Supabase
 */
export async function dbFetchCustomers() {
  if (!isSupabaseConfigured() || !supabase) {
    try {
      return JSON.parse(localStorage.getItem('sajfarm_registered_users') || '[]');
    } catch {
      return [];
    }
  }
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch customers warning:', error.message);
      return JSON.parse(localStorage.getItem('sajfarm_registered_users') || '[]');
    }
    return data || [];
  } catch (err) {
    console.warn('Failed to query Supabase customers:', err);
    return JSON.parse(localStorage.getItem('sajfarm_registered_users') || '[]');
  }
}

/**
 * Fetch all pre-order waitlist records from Supabase
 */
export async function dbFetchWaitlist() {
  if (!isSupabaseConfigured() || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

/**
 * Customer Login in Supabase
 */
export async function dbLoginCustomer(emailOrPhone, password) {
  if (!isSupabaseConfigured() || !supabase) return null;
  try {
    const clean = emailOrPhone.trim();
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .or(`email.eq.${clean},phone.eq.${clean}`)
      .single();

    if (error || !data) {
      return { error: 'Account not found with this email or phone number.' };
    }

    if (data.password && data.password !== password) {
      return { error: 'Incorrect password. Please verify and try again.' };
    }

    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      state: data.state,
      area: data.area,
      address: data.address,
      mandatoryFallback: data.mandatory_fallback
    };
  } catch (err) {
    console.warn('Failed to login customer via Supabase:', err);
    return null;
  }
}

/**
 * Save Coming Soon waitlist / pre-order entry into Supabase
 */
export async function dbSaveWaitlistEntry(entry) {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const { error } = await supabase.from('waitlist').insert([
      {
        product_id: entry.productId,
        product_name: entry.productName,
        full_name: entry.name,
        phone: entry.phone,
        state: entry.state
      }
    ]);
    return !error;
  } catch (err) {
    console.warn('Failed to save waitlist entry to Supabase:', err);
    return false;
  }
}
