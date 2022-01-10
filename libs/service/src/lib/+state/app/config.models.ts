import { IMicroFrontendConfig } from '../../mfe/mfe.model';

/**
 * Interface for the 'Config' data
 */
export interface ConfigEntity {
  coreApplications: IMicroFrontendConfig[] | null;
}

export interface IApplicationConfigResponce {
  // ToDo
  data: IMicroFrontendConfig[];
}
