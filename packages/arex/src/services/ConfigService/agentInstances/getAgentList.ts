import { CaseTags } from '@/services/ScheduleService';
import { request } from '@/utils';

export interface AgentData {
  status: number | null;
  modifiedTime: number;
  id: string;
  appId: string;
  recordVersion: string | null;
  host: string;
  dataUpdateTime: number;
  systemProperties?: CaseTags;
  tags?: CaseTags;
  extendField: Record<string, string>;
}

export async function getAgentList(appId: string) {
  const res = await request.get<AgentData[] | null>(
    '/report/config/applicationInstances/useResultAsList/appId/' + appId,
  );
  return res.body;
}
