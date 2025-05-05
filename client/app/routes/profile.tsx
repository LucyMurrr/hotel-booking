/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
export default () => (
  <h1>PROFILE</h1>
);

// import React from 'react';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// const { Header, Content, Footer } = Layout;

// const leftItems = Array.from({ length: 7 }).map((_, index) => ({
//   key: `nav${index + 1}`,
//   label: <Link to={`/nav${index + 1}`}>nav {index + 1}</Link>,
// }));

// const rightItems = Array.from({ length: 8 }).map((_, index) => ({
//   key: `nav${index + 8}`,
//   label: <Link to={`/nav${index + 8}`}>nav {index + 8}</Link>,
// }));

// // Пример компонентов контента для маршрутов
// type titleType = {
//   title: string
// }
// const DynamicContent: React.FC<titleType> = ({ title }) => (
//   <div>
//     <h2>{title}</h2>
//     <p>This is the content for {title}</p>
//   </div>
// );

// const App: React.FC = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Router>
//       <Layout>
//         <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Menu
//             theme="dark"
//             mode="horizontal"
//             defaultSelectedKeys={['nav1']}
//             items={leftItems}
//             style={{ flex: '1' }}
//           />
//           <Menu
//             theme="dark"
//             mode="horizontal"
//             defaultSelectedKeys={['nav8']}
//             items={rightItems}
//             style={{ flex: '1', textAlign: 'right' }}
//           />
//         </Header>
//         <Content style={{ padding: '0 48px' }}>
//           <Breadcrumb style={{ margin: '16px 0' }}>
//             <Breadcrumb.Item>Home</Breadcrumb.Item>
//             <Breadcrumb.Item>List</Breadcrumb.Item>
//             <Breadcrumb.Item>App</Breadcrumb.Item>
//           </Breadcrumb>
//           <div
//             style={{
//               background: colorBgContainer,
//               minHeight: 280,
//               padding: 24,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             <Routes>
//               <Route path="/" element={<DynamicContent title="Home" />} />
//               <Route path="/nav1" element={<DynamicContent title="Navigation 1" />} />
//               <Route path="/nav2" element={<DynamicContent title="Navigation 2" />} />
//               <Route path="/nav3" element={<DynamicContent title="Navigation 3" />} />
//               <Route path="/nav4" element={<DynamicContent title="Navigation 4" />} />
//               <Route path="/nav5" element={<DynamicContent title="Navigation 5" />} />
//               <Route path="/nav6" element={<DynamicContent title="Navigation 6" />} />
//               <Route path="/nav7" element={<DynamicContent title="Navigation 7" />} />
//               <Route path="/nav8" element={<DynamicContent title="Navigation 8" />} />
//               <Route path="/nav9" element={<DynamicContent title="Navigation 9" />} />
//               <Route path="/nav10" element={<DynamicContent title="Navigation 10" />} />
//               <Route path="/nav11" element={<DynamicContent title="Navigation 11" />} />
//               <Route path="/nav12" element={<DynamicContent title="Navigation 12" />} />
//               <Route path="/nav13" element={<DynamicContent title="Navigation 13" />} />
//               <Route path="/nav14" element={<DynamicContent title="Navigation 14" />} />
//               <Route path="/nav15" element={<DynamicContent title="Navigation 15" />} />
//             </Routes>
//           </div>
//         </Content>
//         <Footer style={{ textAlign: 'center' }}>
//           Ant Design ©{new Date().getFullYear()} Created by Ant UED
//         </Footer>
//       </Layout>
//     </Router>
//   );
// };

// export default App;
