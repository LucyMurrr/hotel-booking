/* eslint-disable max-len */
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   DatePicker,
//   Form,
//   Input,
//   Button,
//   Card,
//   Typography,
//   Alert,
//   Row,
//   Col,
//   Steps,
//   Statistic,
// } from 'antd';
// import client from '@api';
// import dayjs from 'dayjs';
// import type { RangePickerProps } from 'antd/es/date-picker';
// import type { Route } from './+types/booking';

// const { RangePicker } = DatePicker;
// const { Step } = Steps;
// const { Title } = Typography;

// export async function clientLoader({ params }: Route.LoaderArgs) {
//   console.log(params);
//   const roomId = Number(params.roomId);
//   const room = await client.roomsGet({ roomId });
//   return { room };
// }

// const BookingPage = ({ loaderData }: Route.ComponentProps) => {
//   const { room } = loaderData;
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   const [currentStep, setCurrentStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [availableDates, setAvailableDates] = useState<string[]>([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Загрузка доступных дат при монтировании
//   useEffect(() => {
//     const loadAvailability = async () => {
//       try {
//         // const response = await client.roomAvailabilityGet({
//         //   roomId: room.id,
//         //   start: dayjs().format('YYYY-MM-DD'),
//         //   end: dayjs().add(3, 'month').format('YYYY-MM-DD'),
//         //   resolution: 'days',
//         // });
//         const response = {
//           dates: [
//             '2025/05/06',
//           ],
//         };
//         setAvailableDates(response.dates);
//       } catch (err) {
//         setError('Ошибка загрузки доступных дат');
//       }
//     };
//     // eslint-disable-next-line @typescript-eslint/no-floating-promises
//     loadAvailability();
//   }, [room.id]);

//   // Валидация дат
//   const disabledDate: RangePickerProps['disabledDate'] = (current) => !availableDates.includes(dayjs(current).format('YYYY-MM-DD'));

//   // Расчет стоимости
//   const calculatePrice = (dates: [dayjs.Dayjs, dayjs.Dayjs] | null) => {
//     if (!dates) return 0;
//     const nights = dates[1].diff(dates[0], 'days');
//     setTotalPrice(nights * room.price);
//   };

//   // Проверка доступности дат
//   // const checkAvailability = async (dates: [dayjs.Dayjs, dayjs.Dayjs]) => {
//   //   try {
//   //     const response = await client.roomsAvailabilityCheck({
//   //       roomId: room.id,
//   //       checkIn: dates[0].format('YYYY-MM-DD'),
//   //       checkOut: dates[1].format('YYYY-MM-DD'),
//   //     });

//   //     if (!response.available) {
//   //       throw new Error('Выбранные даты недоступны');
//   //     }
//   //     return true;
//   //   } catch (err) {
//   //     form.setFields([{
//   //       name: 'dates',
//   //       errors: [err.message],
//   //     }]);
//   //     return false;
//   //   }
//   // };

//   // Отправка бронирования
//   // const handleSubmit = async (values: any) => {
//   //   setLoading(true);
//   //   try {
//   //     // const datesValid = await checkAvailability(values.dates);
//   //     // if (!datesValid) return;

//   //     await client.bookingsCreate({
//   //       userId: 1,
//   //       roomId: room.id,
//   //       checkIn: values.dates[0].format('YYYY-MM-DD'),
//   //       checkOut: values.dates[1].format('YYYY-MM-DD'),
//   //       guests: values.guests,
//   //       userData: {
//   //         firstName: values.firstName,
//   //         lastName: values.lastName,
//   //         email: values.email,
//   //       },
//   //     });

//   //     setCurrentStep(2);
//   //   } catch (err) {
//   //     setError(err.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//     <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
//       <Steps current={currentStep} style={{ marginBottom: 40 }}>
//         <Step title="Выбор дат" />
//         <Step title="Данные гостя" />
//         <Step title="Подтверждение" />
//       </Steps>

//       <Card bordered={false}>
//         {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />}

//         {currentStep === 0 && (
//           <Form form={form} onFinish={() => setCurrentStep(1)}>
//             <Title level={4} style={{ marginBottom: 24 }}>Выберите даты проживания</Title>

//             <Form.Item
//               name="dates"
//               rules={[
//                 { required: true, message: 'Выберите даты бронирования' },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (value && value[1].diff(value[0], 'days') < 1) {
//                       return Promise.reject('Минимальное время бронирования - 1 ночь');
//                     }
//                     return Promise.resolve();
//                   },
//                 }),
//               ]}
//             >
//               <RangePicker
//                 disabledDate={disabledDate}
//                 format="DD.MM.YYYY"
//                 // onChange={calculatePrice}
//                 style={{ width: '100%' }}
//               />
//             </Form.Item>

//             <Statistic
//               title="Стоимость"
//               value={totalPrice}
//               prefix="$"
//               style={{ margin: '24px 0' }}
//             />

//             <Button type="primary" htmlType="submit" block>
//               Продолжить
//             </Button>
//           </Form>
//         )}

//         {currentStep === 1 && (
//           <Form form={form} onFinish={handleSubmit} layout="vertical">
//             <Title level={4} style={{ marginBottom: 24 }}>Введите данные гостя</Title>

//             <Row gutter={24}>
//               <Col span={12}>
//                 <Form.Item
//                   name="firstName"
//                   label="Имя"
//                   rules={[{ required: true, message: 'Введите имя' }]}
//                 >
//                   <Input />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item
//                   name="lastName"
//                   label="Фамилия"
//                   rules={[{ required: true, message: 'Введите фамилию' }]}
//                 >
//                   <Input />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Form.Item
//               name="email"
//               label="Email"
//               rules={[
//                 { required: true, message: 'Введите email' },
//                 { type: 'email', message: 'Некорректный email' },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               name="guests"
//               label="Количество гостей"
//               initialValue={1}
//               rules={[
//                 { required: true },
//                 { type: 'number', min: 1, max: room.capacity, message: `Максимум ${room.capacity} гостей` },
//               ]}
//             >
//               <Input type="number" />
//             </Form.Item>

//             <Statistic
//               title="Итоговая стоимость"
//               value={totalPrice}
//               prefix="$"
//               style={{ margin: '24px 0' }}
//             />

//             <Button type="primary" htmlType="submit" block loading={loading}>
//               Подтвердить бронирование
//             </Button>
//           </Form>
//         )}

//         {currentStep === 2 && (
//           <div style={{ textAlign: 'center' }}>
//             <Title level={4} style={{ marginBottom: 24 }}>Бронирование подтверждено! 🎉</Title>
//             <p>На вашу почту отправлено подтверждение бронирования</p>
//             <Button type="primary" onClick={() => navigate(`/hotels/${room.hotelId}`)}>
//               Вернуться в отель
//             </Button>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default BookingPage;

export default () => <div />;
