import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
  MoreOutlined,
} from '@ant-design/icons';
import {
  getLocalStorage,
  RequestMethodIcon,
  SmallTextButton,
  styled,
  useTranslation,
} from '@arextest/arex-core';
import { useRequest } from 'ahooks';
import { App, Button, Dropdown, Input, MenuProps, Space } from 'antd';
import React, { FC, ReactNode, useMemo, useState } from 'react';

import { CollectionNodeType, EMAIL_KEY, PanesType } from '@/constant';
import { useNavPane } from '@/hooks';
import { FileSystemService } from '@/services';
import { CollectionType } from '@/services/FileSystemService';
import { useCollections, useWorkspaces } from '@/store';

import SearchHighLight from './SearchHighLight';

const CollectionNodeTitleWrapper = styled.div`
  color: ${(props) => props.theme.colorTextSecondary};
  display: flex;
  .right {
    float: right;
    opacity: 0;
    transition: opacity ease 0.3s;
  }
  &:hover {
    .right {
      opacity: 1;
    }
  }
  .left {
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    .content {
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
  }
  :hover {
    color: ${(props) => props.theme.colorText};
  }
`;

export type CollectionNodeTitleProps = {
  data: CollectionType;
  keyword?: string;
  onAddNode?: (info: string, nodeType: CollectionNodeType) => void;
};

const CollectionNodeTitle: FC<CollectionNodeTitleProps> = (props) => {
  const { modal } = App.useApp();
  const confirm = modal.confirm;
  const { t } = useTranslation(['common', 'components']);
  const navPane = useNavPane();
  const { activeWorkspaceId } = useWorkspaces();
  const { getCollections, getPath } = useCollections();

  const userName = getLocalStorage<string>(EMAIL_KEY) as string;

  const [editMode, setEditMode] = useState(false);
  const [nodeName, setNodeName] = useState(props.data.nodeName);

  const nodePath = useMemo(
    () => getPath(props.data.infoId).map((path) => path.id),
    [getPath, props.data.infoId],
  );

  const { run: addCollectionItem } = useRequest(
    (params: { nodeName: string; nodeType: CollectionNodeType; caseSourceType?: number }) =>
      FileSystemService.addCollectionItem({
        ...params,
        userName,
        id: activeWorkspaceId,
        parentPath: nodePath,
      }),
    {
      manual: true,
      onSuccess: (res, [{ caseSourceType, nodeType }]) => {
        if (res.success) {
          getCollections().then(() => props.onAddNode?.(res.infoId, nodeType));
          if (caseSourceType === 2)
            queryInterface({ id: nodePath[nodePath.length - 1] as string }, res.infoId);
        }
      },
    },
  );

  const { run: duplicateCollectionItem } = useRequest(
    () =>
      FileSystemService.duplicateCollectionItem({
        id: activeWorkspaceId,
        path: nodePath,
        userName,
      }),
    {
      manual: true,
      onSuccess: () => {
        getCollections();
      },
    },
  );

  const { run: rename } = useRequest(
    () =>
      FileSystemService.renameCollectionItem({
        id: activeWorkspaceId,
        newName: nodeName,
        path: nodePath,
        userName,
      }),
    {
      manual: true,
      onSuccess(success) {
        setEditMode(false);
        getCollections(activeWorkspaceId);
      },
    },
  );

  const { run: removeCollectionItem } = useRequest(
    () =>
      FileSystemService.removeCollectionItem({
        id: activeWorkspaceId,
        removeNodePath: nodePath,
        userName,
      }),
    {
      manual: true,
      onSuccess: () => {
        getCollections();
      },
    },
  );

  const { run: saveCase } = useRequest(FileSystemService.saveCase, {
    manual: true,
    onSuccess: () => {
      getCollections();
    },
  });

  const { run: queryInterface } = useRequest(FileSystemService.queryInterface, {
    manual: true,
    onSuccess: (parentInterface, params) => {
      saveCase({
        workspaceId: activeWorkspaceId as string,
        ...parentInterface,
        id: params[1],
      });
    },
  });

  const menu: MenuProps = useMemo(
    () => ({
      items: (
        [] as {
          key: string;
          label: ReactNode;
        }[]
      )
        .concat(
          props.data.nodeType === CollectionNodeType.folder
            ? [
                {
                  key: 'batchRun',
                  label: (
                    <a
                      onClick={() => {
                        navPane({
                          type: PanesType.BATCH_RUN,
                          id: `${activeWorkspaceId}-${props.data.infoId}`,
                        });
                      }}
                    >
                      {t('collection.batch_run', { ns: 'components' })}
                    </a>
                  ),
                },
                {
                  key: 'addFolder',
                  label: (
                    <a
                      onClick={() =>
                        addCollectionItem({
                          nodeName: 'New Collection',
                          nodeType: CollectionNodeType.folder,
                        })
                      }
                    >
                      {t('collection.add_folder', { ns: 'components' })}
                    </a>
                  ),
                },
                {
                  key: 'addRequest',
                  label: (
                    <a
                      onClick={() =>
                        addCollectionItem({
                          nodeName: 'New Request',
                          nodeType: CollectionNodeType.interface,
                        })
                      }
                    >
                      {t('collection.add_request', { ns: 'components' })}
                    </a>
                  ),
                },
              ]
            : [],
        )
        .concat(
          props.data.nodeType === CollectionNodeType.interface
            ? [
                {
                  key: 'addCase',
                  label: (
                    <a
                      onClick={() => {
                        addCollectionItem({
                          nodeName: 'case',
                          nodeType: CollectionNodeType.case,
                          caseSourceType: 2,
                        });
                      }}
                    >
                      {t('collection.add_case', { ns: 'components' })}
                    </a>
                  ),
                },
              ]
            : [],
        )
        .concat([
          {
            key: 'rename',
            label: (
              <a onClick={() => setEditMode(true)}>
                {t('collection.rename', { ns: 'components' })}
              </a>
            ),
          },
          {
            key: 'duplicate',
            label: (
              <a onClick={() => duplicateCollectionItem()}>
                {t('collection.duplicate', { ns: 'components' })}
              </a>
            ),
          },
          {
            key: 'delete',
            label: (
              <a
                style={{ color: 'red' }}
                onClick={() => {
                  confirm({
                    title: t('are_you_sure'),
                    icon: <ExclamationCircleFilled />,
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk: removeCollectionItem,
                  });
                }}
              >
                {t('collection.delete', { ns: 'components' })}
              </a>
            ),
          },
        ]),
      onClick(e) {
        e.domEvent.stopPropagation();
      },
    }),
    [],
  );

  const prefix = useMemo(
    () =>
      props.data.nodeType === CollectionNodeType.interface
        ? React.createElement(RequestMethodIcon[props.data.method || ''] || 'div')
        : props.data.nodeType === CollectionNodeType.case
        ? React.createElement(
            RequestMethodIcon[props.data.caseSourceType === 1 ? 'arex' : 'case'] || 'div',
          )
        : null,
    [props.data],
  );

  return (
    <CollectionNodeTitleWrapper>
      <div className={'left'}>
        {prefix}
        <div className={'content'}>
          {editMode ? (
            <Space style={{ display: 'flex' }}>
              <Input
                value={nodeName}
                onPressEnter={rename}
                onChange={(e) => setNodeName(e.currentTarget.value)}
                style={{ padding: '0 4px' }}
              />
              <SmallTextButton
                icon={<CloseOutlined />}
                onClick={() => {
                  setEditMode(false);
                  setNodeName(props.data.nodeName);
                }}
              />
              <SmallTextButton icon={<CheckOutlined />} onClick={rename} />
            </Space>
          ) : (
            <SearchHighLight text={props.data.nodeName} keyword={props.keyword} />
          )}
        </div>
      </div>

      <div className='right'>
        <Dropdown menu={menu} trigger={['click']}>
          <Button
            type='text'
            size='small'
            icon={<MoreOutlined style={{ fontSize: '14px' }} />}
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
      </div>
    </CollectionNodeTitleWrapper>
  );
};

export default CollectionNodeTitle;
