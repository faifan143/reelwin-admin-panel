import api from "@/lib/axios";
import { Interest, Reward, RewardCategory } from "@/types";

// Auth Services
export const authService = {
  login: async (phone: string, password: string) => {
    const response = await api.post("/auth/signin", { phone, password });
    return response.data;
  },
};

// Content Services
export const contentService = {
  getContents: async () => {
    const response = await api.get("/content");
    return response.data;
  },

  getContent: async (id: string) => {
    const response = await api.get(`/content/${id}`);
    return response.data;
  },

  createContent: async (formData: FormData) => {
    const response = await api.post("/content", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateContent: async (id: string, formData: FormData) => {
    const response = await api.put(`/content/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteContent: async (id: string) => {
    const response = await api.delete(`/content/${id}`);
    return response.data;
  },
};

// Interest Services
export const interestService = {
  getInterests: async () => {
    const response = await api.get("/interests/list");
    return response.data;
  },

  createInterest: async (interest: Omit<Interest, "id">) => {
    const response = await api.post("/interests", interest);
    return response.data;
  },

  updateInterest: async (id: string, interest: Partial<Interest>) => {
    const response = await api.put(`/interests/${id}`, interest);
    return response.data;
  },

  deleteInterest: async (id: string) => {
    const response = await api.delete(`/interests/${id}`);
    return response.data;
  },
};

// Reward Services
export const rewardService = {
  getRewards: async () => {
    const response = await api.get("/rewards");
    return response.data;
  },

  getReward: async (id: string) => {
    const response = await api.get(`/rewards/${id}`);
    return response.data;
  },

  createReward: async (reward: Omit<Reward, "id">) => {
    const response = await api.post("/rewards", reward);
    return response.data;
  },

  updateReward: async (id: string, reward: Partial<Reward>) => {
    const response = await api.put(`/rewards/${id}`, reward);
    return response.data;
  },

  deleteReward: async (id: string) => {
    const response = await api.delete(`/rewards/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get("/rewards/categories");
    return response.data;
  },

  createCategory: async (category: Omit<RewardCategory, "id">) => {
    const response = await api.post("/rewards/categories", category);
    return response.data;
  },

  updateCategory: async (id: string, category: Partial<RewardCategory>) => {
    const response = await api.put(`/rewards/categories/${id}`, category);
    return response.data;
  },

  deleteCategory: async (id: string) => {
    const response = await api.delete(`/rewards/categories/${id}`);
    return response.data;
  },

  getUserRewards: async () => {
    const response = await api.get("/rewards/admin/purchases");
    return response.data;
  },

  updateUserRewardStatus: async (id: string, status: string) => {
    const response = await api.put(`/rewards/admin/purchases/${id}/status`, {
      status,
    });
    return response.data;
  },
};

// Export all services
export default {
  auth: authService,
  content: contentService,
  interest: interestService,
  reward: rewardService,
};
