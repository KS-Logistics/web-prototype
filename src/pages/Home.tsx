import React from 'react';
import { Layout, Input, Card, Typography, Row, Col, Space, Tooltip } from 'antd';
import { MenuOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { ContainerIcon, PackageIcon, StepIcon } from '../components/icons/ServiceIcons';
import LogoIcon from '../components/icons/LogoIcon';
import { 
  GlobalIcon, 
  TeamIcon, 
  ProcessIcon, 
  SystemIcon,
  ChainIcon,
  PlaneIcon,
  WarehouseIcon,
  BoxStackIcon,
  ProjectIcon,
  CustomIcon
} from '../components/icons/BusinessIcons';
import { colors, shadows, gradients, borderRadius, spacing } from '../styles/theme';
import BannerBackground from '../components/backgrounds/BannerBackground';

const { Header } = Layout;
const { Title, Text } = Typography;

interface HomePageProps {
  onMenuClick?: () => void;
  onUserClick?: () => void;
  onSearch?: (value: string) => void;
  onServiceCardClick?: (type: string) => void;
}

const StyledLayout = styled(Layout)`
  background: ${colors.background.default};
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${colors.background.default};
`;

const StatusBar = styled.div`
  height: 24px;
  width: 100%;
  background: #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${spacing.md};
  font-size: 12px;
  color: white;
`;

const StyledHeader = styled(Header)`
  background: white;
  padding: ${spacing.sm} ${spacing.md};
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${shadows.small};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text.primary};
  font-weight: 500;
  font-size: 16px;
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

const StyledContent = styled(Layout.Content)`
  margin-top: 76px; // 24px (status bar) + 52px (header)
  padding-bottom: ${spacing.lg};
`;

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${spacing.md};
`;

const BannerContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${spacing.lg};
  color: white;
  z-index: 1;

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 ${spacing.sm};
    color: white;
  }

  p {
    font-size: 14px;
    margin: 0;
    opacity: 0.9;
  }
`;

const SearchContainer = styled.div`
  padding: ${spacing.sm} ${spacing.md};
  margin-top: -30px;
  position: relative;
  z-index: 2;
`;

const StyledInput = styled(Input)`
  border-radius: ${borderRadius.medium};
  background: ${colors.background.light};
  border: 1px solid ${colors.border.light};
  height: 40px;
  
  .ant-input {
    background: ${colors.background.light};
    font-size: 14px;
  }
  
  .ant-input-prefix {
    margin-right: ${spacing.sm};
    color: ${colors.text.light};
  }

  &:hover, &:focus {
    border-color: ${colors.primary};
    box-shadow: ${shadows.small};
  }
`;

const ServiceCard = styled(Card)`
  text-align: center;
  margin: 0;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  background: white;
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.medium};
  transition: all 0.3s ease;
  overflow: hidden;
  
  .ant-card-body {
    padding: ${spacing.md};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${spacing.xs};
    height: 100%;
  }
  
  .title-text {
    font-size: 16px;
    font-weight: 500;
    margin: 0 !important;
    padding: 0 ${spacing.sm};
  }

  .secondary-text {
    font-size: 12px;
    color: ${colors.text.secondary};
    line-height: 1.4;
    margin: 0 !important;
    padding: 0 ${spacing.sm};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: 100%;
  }
  
  &:hover {
    box-shadow: ${shadows.medium};
    transform: translateY(-2px);
    border-color: ${colors.primary};

    svg {
      stroke: ${colors.primary};
      transform: scale(1.1);
    }
  }
`;

const InstructionCard = styled(Card)`
  margin: ${spacing.md};
  border-radius: ${borderRadius.medium};
  background: white;
  border: 1px solid ${colors.border.light};
  box-shadow: ${shadows.small};
  
  .ant-card-body {
    padding: ${spacing.lg};
  }

  .header {
    margin-bottom: ${spacing.md};
    padding-bottom: ${spacing.md};
    border-bottom: 1px solid ${colors.border.light};
  }
`;

const StepCard = styled(Card)`
  background: white;
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.medium};
  margin-bottom: ${spacing.sm};
  transition: all 0.3s ease;
  
  .ant-card-body {
    padding: ${spacing.md};
  }

  .step-content {
    flex: 1;
    min-width: 0; // Important for text truncation
  }

  .step-title {
    font-size: 16px;
    font-weight: 500;
    display: block;
    margin-bottom: ${spacing.xs};
    color: ${colors.text.primary};
  }

  .step-description {
    font-size: 14px;
    line-height: 1.6;
    color: ${colors.text.secondary};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &:hover {
    border-color: ${colors.primary};
    box-shadow: ${shadows.small};

    .step-title {
      color: ${colors.primary};
    }
  }
`;

const IconWrapper = styled.div`
  margin-bottom: ${spacing.sm};
  svg {
    width: 32px;
    height: 32px;
    stroke: ${colors.primary};
    transition: all 0.3s ease;
  }
`;

const StepIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: ${spacing.md};
  background: ${colors.background.blue};
  border-radius: 50%;
  
  svg {
    width: 20px;
    height: 20px;
    stroke: ${colors.primary};
  }
`;

const WelcomeText = styled(Text)`
  display: block;
  margin: ${spacing.md};
  padding: ${spacing.lg};
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%);
  border-radius: ${borderRadius.medium};
  font-weight: 500;
  font-size: 16px;
  color: white;
  text-align: center;
  box-shadow: ${shadows.small};
`;

const SectionTitle = styled(Title)`
  margin: ${spacing.lg} ${spacing.md} ${spacing.md} !important;
  font-size: 20px !important;
  color: ${colors.text.primary} !important;
  position: relative;
  padding-left: ${spacing.md};
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 4px;
    bottom: 4px;
    width: 4px;
    background: ${colors.primary};
    border-radius: ${borderRadius.small};
  }
`;

const BusinessIconWrapper = styled.div`
  margin-bottom: ${spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.background.blue};
  transition: all 0.3s ease;

  svg {
    width: 24px;
    height: 24px;
    stroke: ${colors.primary};
    transition: all 0.3s ease;
  }
`;

const BusinessCard = styled(Card)`
  height: 100px;
  margin-bottom: 0;
  background: white;
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.medium};
  transition: all 0.3s ease;
  cursor: pointer;

  .ant-card-body {
    padding: ${spacing.md} ${spacing.sm};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${spacing.xs};
    height: 100%;
  }

  .text-wrapper {
    width: 100%;
    text-align: center;
  }

  .ant-typography {
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
    font-weight: 500;
    margin: 0 !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: 100%;
  }

  &:hover {
    border-color: ${colors.primary};
    box-shadow: ${shadows.small};
    transform: translateY(-2px);

    ${BusinessIconWrapper} {
      background: ${colors.primary};
      
      svg {
        stroke: white;
      }
    }

    .ant-typography {
      color: ${colors.primary};
    }
  }
`;

const HomePage: React.FC<HomePageProps> = ({
  onMenuClick,
  onUserClick,
  onSearch,
  onServiceCardClick,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  const businessServices = [
    { icon: <ChainIcon />, text: '先进的供应链技术大数据解决方案' },
    { icon: <PlaneIcon />, text: '航空国际快递代理' },
    { icon: <BoxStackIcon />, text: '海运集装箱、包裹' },
    { icon: <PlaneIcon />, text: '航空快递' },
    { icon: <WarehouseIcon />, text: '澳大利亚本地仓储、配送、派送运输' },
    { icon: <ChainIcon />, text: '供应链管理' },
    { icon: <BoxStackIcon />, text: '货物装载和加固' },
    { icon: <ProjectIcon />, text: '物流项目管理、系统开发' },
    { icon: <CustomIcon />, text: '定制化物流服务' }
  ];

  const features = [
    { icon: <GlobalIcon />, text: '强大的国际资源' },
    { icon: <TeamIcon />, text: '专业的业务团队' },
    { icon: <ProcessIcon />, text: '完善的操作流程' },
    { icon: <SystemIcon />, text: '强大的信息系统' }
  ];

  return (
    <StyledLayout>
      <HeaderContainer>
        <StatusBar>
          <span>12:09</span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span>􀙇</span>
            <span>􀙈</span>
            <span>24%</span>
          </div>
        </StatusBar>
        <StyledHeader>
          <MenuOutlined 
            style={{ fontSize: '20px', color: colors.text.primary, cursor: 'pointer' }}
            onClick={onMenuClick}
          />
          <Logo>
            <LogoIcon />
          </Logo>
          <Space size={16}>
            <Text style={{ color: colors.text.primary, fontSize: '14px' }}>中 (简)</Text>
            <UserOutlined 
              style={{ fontSize: '20px', color: colors.text.primary, cursor: 'pointer' }}
              onClick={onUserClick}
            />
          </Space>
        </StyledHeader>
      </HeaderContainer>

      <StyledContent>
        <BannerContainer>
          <BannerBackground />
          <BannerContent>
            <h2>全球物流解决方案</h2>
            <p>为您提供专业的国际物流服务，让您的货物安全、快速到达目的地</p>
          </BannerContent>
        </BannerContainer>

        <SearchContainer>
          <StyledInput
            prefix={<SearchOutlined />}
            placeholder="搜索 国内快递单号/提单号/国际运单号"
            onChange={handleSearch}
            allowClear
          />
        </SearchContainer>

        <Row gutter={[16, 16]} style={{ padding: `0 ${spacing.md}` }}>
          <Col span={12}>
            <ServiceCard onClick={() => onServiceCardClick?.('container')}>
              <IconWrapper>
                <ContainerIcon />
              </IconWrapper>
              <Tooltip title="集装箱（整柜/拼柜）">
                <Text className="title-text">集装箱（整柜/拼柜）</Text>
              </Tooltip>
              <Tooltip title="如果您有大件物品需要通过集装箱运输，可以选择整柜或者拼柜。">
                <Text className="secondary-text">
                  如果您有大件物品需要通过集装箱运输，可以选择整柜或者拼柜。
                </Text>
              </Tooltip>
            </ServiceCard>
          </Col>
          <Col span={12}>
            <ServiceCard onClick={() => onServiceCardClick?.('package')}>
              <IconWrapper>
                <PackageIcon />
              </IconWrapper>
              <Tooltip title="国际包裹">
                <Text className="title-text">国际包裹</Text>
              </Tooltip>
              <Tooltip title="如果您有小件物品需要通过集装箱运输，可以选择国际包裹。">
                <Text className="secondary-text">
                  如果您有小件物品需要通过集装箱运输，可以选择国际包裹。
                </Text>
              </Tooltip>
            </ServiceCard>
          </Col>
        </Row>

        <WelcomeText>
          欢迎使用我们的服务，您可以根据以下指引来操作。
        </WelcomeText>

        <InstructionCard>
          <div className="header">
            <Text strong style={{ fontSize: '18px', color: colors.text.primary }}>新手指引</Text>
            <Text type="secondary" style={{ display: 'block', marginTop: spacing.xs }}>会员号: 23432123</Text>
          </div>
          
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            {[
              { step: 1, title: '购物', text: '当您在电商平台下单时，可以一键复制集合仓地址，把您购买的商品寄往集合仓。' },
              { step: 2, title: '等待', text: '接下来，请耐心等待你的快递送达到仓集合仓。' },
              { step: 3, title: '下单', text: '当快递送达集合仓之后，您可以将需要合并的包裹，勾选合并成一个包裹，节省不必要的运费开销。' },
              { step: 4, title: '支付', text: '接下来就是为即将寄出的包裹支付费用。' },
              { step: 5, title: '收货', text: '支付后，您的包裹会及时寄出下一个环节，随着我们的物流渠道送达您指定的收货地址。' }
            ].map((item, index) => (
              <StepCard key={index}>
                <Space align="start" size={16}>
                  <StepIconWrapper>
                    <StepIcon number={item.step} />
                  </StepIconWrapper>
                  <div className="step-content">
                    <Tooltip title={item.title}>
                      <Text className="step-title">
                        {item.title}
                      </Text>
                    </Tooltip>
                    <Tooltip title={item.text}>
                      <Text className="step-description">
                        {item.text}
                      </Text>
                    </Tooltip>
                  </div>
                </Space>
              </StepCard>
            ))}
          </Space>
        </InstructionCard>

        <div>
          <SectionTitle level={4}>业务方向</SectionTitle>
          <Row gutter={[16, 16]} style={{ padding: `0 ${spacing.md}` }}>
            {businessServices.map((service, index) => (
              <Col span={12} key={index}>
                <BusinessCard hoverable>
                  <BusinessIconWrapper>
                    {service.icon}
                  </BusinessIconWrapper>
                  <div className="text-wrapper">
                    <Tooltip title={service.text}>
                      <Text>{service.text}</Text>
                    </Tooltip>
                  </div>
                </BusinessCard>
              </Col>
            ))}
          </Row>
        </div>

        <div style={{ marginBottom: spacing.lg }}>
          <SectionTitle level={4}>为什么选择我们</SectionTitle>
          <Row gutter={[16, 16]} style={{ padding: `0 ${spacing.md}` }}>
            {features.map((feature, index) => (
              <Col span={12} key={index}>
                <BusinessCard hoverable>
                  <BusinessIconWrapper>
                    {feature.icon}
                  </BusinessIconWrapper>
                  <div className="text-wrapper">
                    <Tooltip title={feature.text}>
                      <Text>{feature.text}</Text>
                    </Tooltip>
                  </div>
                </BusinessCard>
              </Col>
            ))}
          </Row>
        </div>
      </StyledContent>
    </StyledLayout>
  );
};

export default HomePage; 