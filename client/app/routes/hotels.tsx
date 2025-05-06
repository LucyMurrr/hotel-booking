import { useState, useEffect } from 'react';
import {
  Flex,
  Pagination,
  Select,
  Input,
  Slider,
  Button,
  Card,
  Alert,
  Spin,
  Divider,
} from 'antd';
import { StarFilled } from '@ant-design/icons';
import client from '@api';
import type { Hotel, HotelFilters, HotelsListSortByEnum, HotelRoomsListSortOrderEnum } from '@api';
import HotelCard from '../src/components/hotelCard/hotelCard.component';

type Pagination = {
  page: number;
  perPage: number;
  total: number;
};

type Sort = {
  sortBy?: HotelsListSortByEnum;
  sortOrder?: HotelRoomsListSortOrderEnum;
};

const renderStars = (count: number) => Array.from({ length: count }, (_, i) => (
  <StarFilled key={i} style={{ color: '#faad14', marginRight: 2 }} />
));

const starOptions = Array.from({ length: 5 }, (_, i) => {
  const value = i + 1;
  return {
    value,
    label: <span>{renderStars(value)}</span>,
  };
});

const FiltersForm = ({ onFilterChange }: { onFilterChange: (filters: HotelFilters) => void }) => {
  const [localFilters, setLocalFilters] = useState<HotelFilters>({});

  const handleApply = () => {
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    setLocalFilters({});
    onFilterChange({});
  };

  return (
    <Flex vertical>
      <Flex vertical gap={16}>
        <Select
          placeholder="Мин. количество звезд"
          options={starOptions}
          value={localFilters.minStars}
          onChange={(value) => setLocalFilters((prev) => ({ ...prev, minStars: value }))}
        />

        <Select
          placeholder="Макс. количество звезд"
          options={starOptions}
          value={localFilters.maxStars}
          onChange={(value) => setLocalFilters((prev) => ({ ...prev, maxStars: value }))}
        />
      </Flex>

      <Divider />

      <div>
        <div>Рейтинг:</div>
        <Slider
          range
          min={0}
          max={10}
          step={0.1}
          value={[localFilters.minRating || 0, localFilters.maxRating || 10]}
          onChange={(value) => setLocalFilters((prev) => ({
            ...prev,
            minRating: value[0],
            maxRating: value[1],
          }))}
          marks={{
            0: '0',
            10: '10',
          }}
        />
      </div>

      <Divider />

      <Flex gap={8} vertical>
        <Button type="default" onClick={handleReset}>
          Сбросить
        </Button>
        <Button type="primary" onClick={handleApply}>
          Применить
        </Button>
      </Flex>
    </Flex>
  );
};

const Hotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 10,
    total: 0,
  });
  const [filters, setFilters] = useState<HotelFilters>({});
  const [sort, setSort] = useState<Sort>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await client.hotelsList({
          ...filters,
          ...sort,
          name: searchQuery,
          page: pagination.page,
          perPage: pagination.perPage,
        });

        setHotels(response.data);
        setPagination((prev) => ({
          ...prev,
          total: response.pagination.total,
        }));
      } catch (err) {
        setError('Ошибка при загрузке отелей');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchHotels();
  }, [pagination.page, pagination.perPage, filters, sort, searchQuery]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
      perPage: pageSize,
    }));
  };

  const handleFilterChange = (newFilters: HotelFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('_');
    setSort({
      sortBy: sortBy as 'name' | 'rating' | 'stars',
      sortOrder: sortOrder as 'ASC' | 'DESC',
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  if (error) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <Flex gap={20} align="start">
      <Card title="Все фильтры" style={{ width: 300, position: 'sticky', top: 20 }}>
        <FiltersForm onFilterChange={handleFilterChange} />
      </Card>

      <Flex vertical style={{ flex: 1 }} gap={20}>
        <Input
          placeholder="Поиск по названию отеля"
          size="large"
          allowClear
          onChange={handleSearch}
          style={{ maxWidth: 500 }}
        />

        <Select
          placeholder="Сортировать по"
          style={{ width: 300 }}
          options={[
            { value: 'name_ASC', label: 'Названию (А-Я)' },
            { value: 'name_DESC', label: 'Названию (Я-А)' },
            { value: 'rating_ASC', label: 'Рейтингу (↑)' },
            { value: 'rating_DESC', label: 'Рейтингу (↓)' },
            { value: 'stars_ASC', label: 'Звездам (↑)' },
            { value: 'stars_DESC', label: 'Звездам (↓)' },
          ]}
          onChange={handleSortChange}
        />

        {loading ? (
          <Spin tip="Загрузка..." size="large">
            <div style={{ minHeight: 200 }} />
          </Spin>
        ) : (
          <>
            <Alert
              message={`Найдено отелей: ${String(pagination.total)}`}
              type="info"
              showIcon
            />

            <Flex wrap="wrap" gap={20}>
              {hotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  name={hotel.name}
                  description={hotel.description}
                  stars={hotel.stars}
                  rating={hotel.rating}
                  id={hotel.id}
                />
              ))}
            </Flex>

            <Pagination
              current={pagination.page}
              pageSize={pagination.perPage}
              total={pagination.total}
              onChange={handlePaginationChange}
              style={{ marginTop: 20 }}
              showSizeChanger={{
                options: [
                  { value: 10, label: '10 на странице' },
                  { value: 20, label: '20 на странице' },
                  { value: 50, label: '50 на странице' },
                ],
              }}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Hotels;
