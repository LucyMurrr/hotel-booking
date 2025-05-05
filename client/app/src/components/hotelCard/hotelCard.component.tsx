import { Link } from 'react-router';
import {
  Card, Rate, Typography, Image, Tag, Flex,
} from 'antd';
import { StarFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

type HotelCardProps = {
  id: number;
  name: string;
  stars: number;
  description: string;
  rating: number;
};

const HotelCard = ({
  id,
  name,
  stars,
  description,
  rating,
}: HotelCardProps) => {
  const ratingColor = () => {
    if (rating >= 8) return '#52c41a';
    if (rating >= 6) return '#faad14';
    return '#ff4d4f';
  };

  return (
    <Card
      hoverable
      style={{
        width: '100%',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: 16,
      }}
    >
      <Link to={`/hotels/${String(id)}`}>
        <Flex gap={16} align="start">
          <Image
            alt={name}
            // eslint-disable-next-line max-len
            src="https://avatars.mds.yandex.net/i?id=3a4b25811801d377b6df70980e7c1591_l-8342740-images-thumbs&ref=rim&n=13&w=1920&h=1080"
            width={240}
            height={180}
            style={{
              borderRadius: 4,
              objectFit: 'cover',
              flexShrink: 0,
            }}
            preview={false}
          />

          <Flex vertical style={{ flex: 1 }} gap={12}>
            <Flex justify="space-between" align="start">
              <Title level={4} style={{ margin: 0 }}>
                {name}
              </Title>
              <Tag color={ratingColor()} style={{ fontSize: 16, padding: '4px 8px' }}>
                {rating.toFixed(1)}
              </Tag>
            </Flex>

            <Flex gap={8}>
              <Rate
                character={<StarFilled />}
                value={stars}
                count={5}
                disabled
              />
              <Text type="secondary">
                {/* eslint-disable-next-line no-nested-ternary */}
                ({stars} {stars === 1 ? 'звезда' : stars < 5 ? 'звезды' : 'звёзд'})
              </Text>
            </Flex>

            <Text
              ellipsis={{ tooltip: description }}
              style={{
                color: '#595959',
                fontSize: 15,
                lineHeight: 1.5,
              }}
            >
              {description}
            </Text>
          </Flex>
        </Flex>
      </Link>
    </Card>
  );
};

export default HotelCard;
