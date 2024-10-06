import { DonationDTO } from './donation.dto';

export interface DonationStateDTO {
  totalDonated: number;
  donations: DonationDTO[];
  errorMessage?: string;
}
