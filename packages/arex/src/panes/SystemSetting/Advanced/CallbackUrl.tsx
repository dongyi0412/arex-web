import { getLocalStorage, useTranslation } from '@arextest/arex-core';
import { useRequest } from 'ahooks';
import { App, Button, Form, FormProps, Input } from 'antd';
import React, { FC } from 'react';

import { EMAIL_KEY } from '@/constant';
import { SystemService } from '@/services';
import { SystemConfig } from '@/services/SystemService';

const CallbackUrl: FC = () => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const email = getLocalStorage<string>(EMAIL_KEY) as string;
  const [form] = Form.useForm<SystemConfig>();

  useRequest(SystemService.getSystemConfig, {
    onSuccess(res) {
      if (res) {
        form.setFieldsValue({
          operator: email,
          callbackUrl: res.callbackUrl,
        });
      }
    },
  });

  const { run: saveDesensitization } = useRequest(SystemService.saveSystemConfig, {
    manual: true,
    onSuccess(success) {
      success
        ? message.success(t('message.updateSuccess'))
        : message.error(t('message.updateFailed'));
    },
  });

  const handleUploadJar: FormProps<SystemConfig>['onFinish'] = (value) => {
    console.log(value);

    if (value.callbackUrl) {
      saveDesensitization({
        systemConfig: {
          operator: value.operator,
          callbackUrl: value.callbackUrl,
        },
      });
    }
  };

  return (
    <Form<SystemConfig>
      name='system-setting-callbackUrl-form'
      form={form}
      layout='inline'
      onFinish={handleUploadJar}
    >
      <Form.Item hidden name='operator'>
        <Input />
      </Form.Item>

      <Form.Item label={t('systemSetting.replayCallback', { ns: 'components' })} name='callbackUrl'>
        <Input
          allowClear
          placeholder={t('systemSetting.replayCallbackPlaceholder', { ns: 'components' }) as string}
          style={{ width: '400px' }}
        />
      </Form.Item>

      {/* form submit button */}
      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
        <Button type='primary' htmlType='submit'>
          {t('save')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CallbackUrl;
