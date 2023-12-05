import { createFromIconfontCN } from '@ant-design/icons';

const ICON_FONT_URL = '//at.alicdn.com/t/font_2045500_xll0v0fe66n.js';
const Icon = createFromIconfontCN({
  scriptUrl: ICON_FONT_URL,
});

const IconCom = ({ type, style = {}, spin = false, ...rest }) => (
  <Icon type={`icon-${type}`} style={{ ...style, fontSize: '20px' }} spin={spin} {...rest} />
);
export default IconCom;
