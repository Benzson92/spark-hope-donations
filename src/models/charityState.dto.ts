import { CharityDTO } from './charity.dto';

export interface CharityStateDTO {
  charities: CharityDTO[];
  loading: boolean;
  errorMessage?: string;
}
