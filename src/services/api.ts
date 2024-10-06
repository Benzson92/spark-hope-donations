import axios, { AxiosInstance } from 'axios';
import { CharityDTO } from '../models/charity.dto';
import { DonationDTO } from '../models/donation.dto';

const API_BASE_URL = 'http://localhost:3001';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchCharities = async (): Promise<CharityDTO[]> => {
  const response = await apiClient.get<CharityDTO[]>('/charities');
  return response.data;
};

export const fetchDonations = async (): Promise<DonationDTO[]> => {
  const response = await apiClient.get<DonationDTO[]>('/payments');
  return response.data;
};

export const saveDonation = async (payment: Omit<DonationDTO, 'id'>): Promise<DonationDTO> => {
  const response = await apiClient.post<DonationDTO>('/payments', payment);
  return response.data;
};
