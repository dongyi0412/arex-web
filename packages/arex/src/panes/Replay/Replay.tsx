import {
  ArexPaneFC,
  clearLocalStorage,
  CollapseTable,
  setLocalStorage,
  useTranslation,
} from '@arextest/arex-core';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useRequest } from 'ahooks';
import { Alert, Spin } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { APP_ID_KEY } from '@/constant';
import { ApplicationService, ReportService } from '@/services';
import { PlanStatistics } from '@/services/ReportService';
import { useMenusPanes } from '@/store';
import { decodePaneKey } from '@/store/useMenusPanes';

import AppOwnersConfig, { AppOwnerConfigRef } from './AppOwnersConfig';
import AppTitle from './AppTitle';
import PlanItem from './PlanItem';
import PlanReport from './PlanReport';

const ReplayPage: ArexPaneFC = (props) => {
  const { activePane } = useMenusPanes();
  const { t } = useTranslation('components');

  const [replayWrapperRef] = useAutoAnimate();

  const [selectedPlan, setSelectedPlan] = useState<PlanStatistics>();
  const { id: appId } = useMemo(() => decodePaneKey(props.paneKey), [props.paneKey]);

  useEffect(() => {
    activePane?.key === props.paneKey && setLocalStorage(APP_ID_KEY, appId);
    return () => clearLocalStorage(APP_ID_KEY);
  }, [activePane?.id]);

  const [refreshDep, setRefreshDep] = useState<number>();
  const handleRefreshDep = () => {
    setRefreshDep(new Date().getTime()); // 触发 ReplayTable 组件请求更新
  };

  const [firstQueryRecordCount, setFirstQueryRecordCount] = useState(true);
  const { data: recordCount = 0, refresh: queryRecordCount } = useRequest(
    ReportService.queryRecordCount,
    {
      defaultParams: [
        {
          appId,
        },
      ],
      onSuccess() {
        firstQueryRecordCount && setFirstQueryRecordCount(false);
      },
    },
  );

  const [hasOwner, setHasOwner] = useState<boolean>();
  const appOwnerConfigRef = useRef<AppOwnerConfigRef>(null);

  const { data: appInfo, refresh: getAppInfo } = useRequest(ApplicationService.getAppInfo, {
    defaultParams: [appId],
    onSuccess(res) {
      setHasOwner(!!res.owners?.length);
    },
  });

  return (
    <div ref={replayWrapperRef}>
      {hasOwner === undefined && firstQueryRecordCount ? (
        <Spin spinning />
      ) : (
        <>
          {!hasOwner && (
            <Alert
              banner
              closable
              type='warning'
              message={
                <span>
                  {t('replay.noAppOwnerAlert')}
                  <a onClick={appOwnerConfigRef?.current?.open}>
                    {t('replay.addOwner').toLowerCase()}
                  </a>
                  .
                </span>
              }
              style={{ margin: '-8px -16px 8px -16px' }}
            />
          )}

          <AppTitle
            appId={appId}
            appName={appInfo?.appName}
            readOnly={!hasOwner}
            recordCount={recordCount}
            tags={appInfo?.tags}
            onRefresh={handleRefreshDep}
            onQueryRecordCount={queryRecordCount}
          />

          <CollapseTable
            active={!!selectedPlan}
            table={
              <PlanReport
                appId={appId}
                refreshDep={refreshDep}
                recordCount={recordCount}
                onSelectedPlanChange={setSelectedPlan}
              />
            }
            panel={
              <PlanItem
                appId={appId}
                selectedPlan={selectedPlan}
                readOnly={!hasOwner}
                filter={(record) => !!record.totalCaseCount}
                onRefresh={handleRefreshDep}
                onDelete={() => setSelectedPlan(undefined)}
              />
            }
          />
        </>
      )}
      <AppOwnersConfig ref={appOwnerConfigRef} appId={appId} onAddOwner={getAppInfo} />
    </div>
  );
};

export default ReplayPage;
