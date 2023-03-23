import { css } from '@emotion/react';
import { theme } from 'antd';
const { useToken } = theme;
const AppFooter = () => {
  const token = useToken();
  return (
    <div
      css={css`
        height: 33px;
        border-top: 1px solid ${token.token.colorBorder};
      `}
    ></div>
  );
};
export default AppFooter;
