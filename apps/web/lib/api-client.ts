import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'pending' | 'completed';
  type: 'CPI' | 'CPA';
  startDate: string;
  endDate: string;
  budget: number;
  spent?: number;
  impressions?: number;
  clicks?: number;
  conversions?: number;
  ctr?: number;
  cvr?: number;
  cpi?: number;
  earnings?: number;
  category: string;
  advertiser: string;
  description: string;
  requirements: {
    impressions: number;
    streamHours: number;
    mentionCount: number;
    productDemo?: boolean;
    gameplayMinutes?: number;
    productReview?: boolean;
  };
  progress?: number;
}

export const campaignsApi = {
  getAll: async (userId: string) => {
    const response = await apiClient.get<Campaign[]>(`/campaigns?userId=${userId}`);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Campaign>(`/campaigns/${id}`);
    return response.data;
  },

  create: async (campaign: Omit<Campaign, 'id'>) => {
    const response = await apiClient.post<Campaign>('/campaigns', campaign);
    return response.data;
  },

  update: async (id: string, campaign: Partial<Campaign>) => {
    const response = await apiClient.put<Campaign>(`/campaigns/${id}`, campaign);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/campaigns/${id}`);
  },
};

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (firstName: string, lastName: string ,email: string, password: string) => {
    const response = await apiClient.post('/auth/register', { firstName, lastName, email, password });
    return response.data;
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  },
}; 