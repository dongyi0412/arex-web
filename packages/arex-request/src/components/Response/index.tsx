import { StopOutlined } from '@ant-design/icons';
import { EmptyWrapper } from '@arextest/arex-core';
import { Button, Typography } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useArexRequestStore } from '../../hooks';
import ResponseOptions from './ResponseOptions';

const Response = () => {
  const { store, dispatch } = useArexRequestStore();
  const { t } = useTranslation();

  const handleCancelRequest = useCallback(
    () =>
      dispatch((state) => {
        state.response = undefined;
      }),
    [],
  );

  const hasResponse = useMemo(
    () => store.response?.type === 'success' || store.response?.type === 'fail',
    [store.response],
  );

  const loading = useMemo(
    () => store.response === null || store?.response?.type === 'loading',
    [store.response],
  );

  return (
    <EmptyWrapper
      loading={loading}
      empty={!hasResponse}
      description={
        <Typography.Text type='secondary'>{t('response.sendRequestTip')}</Typography.Text>
      }
      loadingTip={
        <Button
          id='arex-request-cancel-btn'
          icon={<StopOutlined />}
          onClick={handleCancelRequest}
          style={{ marginTop: '8px' }}
        >
          {t('action.cancel')}
        </Button>
      }
    >
      <ResponseOptions
        response={store.response}
        testResult={store.testResult}
        consoles={store.consoles}
      />
    </EmptyWrapper>
  );
};

export default Response;
