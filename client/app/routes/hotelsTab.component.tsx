// import React, { useState } from 'react';
// import { DownOutlined } from '@ant-design/icons';
import type { GetProp, TableProps } from 'antd';
// import type { GetProp, RadioChangeEvent, TableProps } from 'antd';
import {
  Form, Space, Table,
  // Form, Radio, Space, Switch, Table,
  Tag,
} from 'antd';
import { Link } from 'react-router-dom';

// type SizeType = TableProps['size'];
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
// type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
// type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];
// type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

interface DataType {
  key: number;
  name: string;
  date_of_building: number;
  dist_to_airport: number;
  star: number;
  description: string;
  rating: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Название',
    dataIndex: 'name',
  },
  {
    title: 'Год постройки',
    dataIndex: 'date_of_building',
    sorter: (a, b) => a.date_of_building - b.date_of_building,
  },
  {
    title: 'Удаленность от аэропорта',
    dataIndex: 'dist_to_airport',
    sorter: (a, b) => a.dist_to_airport - b.dist_to_airport,
  },
  {
    title: 'Звездность',
    dataIndex: 'star',
    filters: [
      {
        text: '5 звезд',
        value: 5,
      },
      {
        text: '4 звезды',
        value: 4,
      },
      {
        text: '3 звезды',
        value: 3,
      },
    ],
    onFilter: (value, record) => record.star === value,
  },
  {
    title: 'Рейтинг',
    dataIndex: 'rating',
    sorter: (a, b) => a.rating - b.rating,
  },
  {
    title: 'Питание',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Link to="/">Забронировать</Link>
      </Space>
    ),
  },
];

const data = [
  {
    key: 1,
    name: 'Hilton',
    date_of_building: 1951,
    dist_to_airport: 20,
    star: 5,
    tags: ['all incl'],
    description: 'Фешенебельный отель',
    rating: 4,
  },
  {
    key: 2,
    name: 'Plaza',
    date_of_building: 1988,
    dist_to_airport: 50,
    star: 4,
    tags: ['all incl'],
    description: 'Отель для респектабельных людей',
    rating: 4,
  },
  {
    key: 3,
    name: 'Астория',
    date_of_building: 1932,
    dist_to_airport: 30,
    star: 3,
    tags: ['all incl'],
    description: 'Отель в центре города',
    rating: 4,
  },
  {
    key: 5,
    name: 'Пулковская',
    date_of_building: 1960,
    dist_to_airport: 5,
    star: 4,
    tags: ['all incl'],
    description: 'Отель рядом с аэропортом',
    rating: 3,
  },
  {
    key: 6,
    name: 'Гранд Отель',
    date_of_building: 1914,
    dist_to_airport: 10,
    star: 5,
    tags: ['all incl'],
    description: 'Отель уровня люкс',
    rating: 5,
  },
];

const defaultExpandable: ExpandableConfig<DataType> = {
  expandedRowRender: (record: DataType) => <p>{record.description}</p>,
};

// const defaultTitle = () => 'Here is title';
// const defaultFooter = () => 'Here is footer';

const ContentTable: React.FC = () => {
  // const [bordered, setBordered] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [size, setSize] = useState<SizeType>('large');
  // const [expandable, setExpandable] = useState<ExpandableConfig<DataType>>(defaultExpandable);
  // const [showTitle, setShowTitle] = useState(false);
  // const [showHeader, setShowHeader] = useState(true);
  // const [showFooter, setShowFooter] = useState(true);
  // const [rowSelection, setRowSelection] = useState<TableRowSelection<DataType> | undefined>({});
  // const [hasData, setHasData] = useState(true);
  // const [tableLayout, setTableLayout] = useState<string>('unset');
  // const [top, setTop] = useState<TablePaginationPosition>('none');
  // const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
  // const [ellipsis, setEllipsis] = useState(false);
  // const [yScroll, setYScroll] = useState(false);
  // const [xScroll, setXScroll] = useState<string>('unset');

  // const handleBorderChange = (enable: boolean) => {
  //   setBordered(enable);
  // };

  // const handleLoadingChange = (enable: boolean) => {
  //   setLoading(enable);
  // };

  // const handleSizeChange = (e: RadioChangeEvent) => {
  //   setSize(e.target.value);
  // };

  // const handleTableLayoutChange = (e: RadioChangeEvent) => {
  //   setTableLayout(e.target.value);
  // };

  // const handleExpandChange = (enable: boolean) => {
  //   setExpandable(enable ? defaultExpandable : undefined);
  // };

  // const handleEllipsisChange = (enable: boolean) => {
  //   setEllipsis(enable);
  // };

  // const handleTitleChange = (enable: boolean) => {
  //   setShowTitle(enable);
  // };

  // const handleHeaderChange = (enable: boolean) => {
  //   setShowHeader(enable);
  // };

  // const handleFooterChange = (enable: boolean) => {
  //   setShowFooter(enable);
  // };

  // const handleRowSelectionChange = (enable: boolean) => {
  //   setRowSelection(enable ? {} : undefined);
  // };

  // const handleYScrollChange = (enable: boolean) => {
  //   setYScroll(enable);
  // };

  // const handleXScrollChange = (e: RadioChangeEvent) => {
  //   setXScroll(e.target.value);
  // };

  // const handleDataChange = (newHasData: boolean) => {
  //   setHasData(newHasData);
  // };

  // const scroll: { x?: number | string; y?: number | string } = {};
  // if (yScroll) {
  //   scroll.y = 240;
  // }
  // if (xScroll !== 'unset') {
  //   scroll.x = '100vw';
  // }

  // const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  // if (xScroll === 'fixed') {
  //   tableColumns[0].fixed = true;
  //   tableColumns[tableColumns.length - 1].fixed = 'right';
  // }

  const tableProps: TableProps<DataType> = {
    bordered: true,
    // loading,
    size: 'large',
    expandable: defaultExpandable,
    // title: showTitle ? defaultTitle : undefined,
    // showHeader,
    // footer: showFooter ? defaultFooter : undefined,
    rowSelection: {},
    // scroll,
    // tableLayout: (tableLayout as TableProps['tableLayout']),
  };

  return (
    <>
      <Form layout="inline" className="table-demo-control-bar" style={{ marginBottom: 16 }}>
        {/* <Form.Item label="Bordered">
          <Switch checked={bordered} onChange={handleBorderChange} />
        </Form.Item> */}
        {/* <Form.Item label="loading">
          <Switch checked={loading} onChange={handleLoadingChange} />
        </Form.Item> */}
        {/* <Form.Item label="Title">
          <Switch checked={showTitle} onChange={handleTitleChange} />
        </Form.Item> */}
        {/* <Form.Item label="Column Header">
          <Switch checked={showHeader} onChange={handleHeaderChange} />
        </Form.Item> */}
        {/* <Form.Item label="Footer">
          <Switch checked={showFooter} onChange={handleFooterChange} />
        </Form.Item> */}
        {/* <Form.Item label="Expandable">
          <Switch checked={!!expandable} onChange={handleExpandChange} />
        </Form.Item>
        <Form.Item label="Checkbox">
          <Switch checked={!!rowSelection} onChange={handleRowSelectionChange} />
        </Form.Item>
        <Form.Item label="Fixed Header">
          <Switch checked={!!yScroll} onChange={handleYScrollChange} />
        </Form.Item> */}
        {/* <Form.Item label="Has Data">
          <Switch checked={!!hasData} onChange={handleDataChange} />
        </Form.Item> */}
        {/* <Form.Item label="Ellipsis">
          <Switch checked={!!ellipsis} onChange={handleEllipsisChange} />
        </Form.Item> */}
        {/* <Form.Item label="Size">
          <Radio.Group value={size} onChange={handleSizeChange}>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="middle">Middle</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
        </Form.Item> */}
        {/* <Form.Item label="Table Scroll">
          <Radio.Group value={xScroll} onChange={handleXScrollChange}>
            <Radio.Button value="unset">Unset</Radio.Button>
            <Radio.Button value="scroll">Scroll</Radio.Button>
            <Radio.Button value="fixed">Fixed Columns</Radio.Button>
          </Radio.Group>
        </Form.Item> */}
        {/* <Form.Item label="Table Layout">
          <Radio.Group value={tableLayout} onChange={handleTableLayoutChange}>
            <Radio.Button value="unset">Unset</Radio.Button>
            <Radio.Button value="fixed">Fixed</Radio.Button>
          </Radio.Group>
        </Form.Item> */}
        {/* <Form.Item label="Pagination Top">
          <Radio.Group value={top} onChange={(e) => setTop(e.target.value)}>
            <Radio.Button value="topLeft">TopLeft</Radio.Button>
            <Radio.Button value="topCenter">TopCenter</Radio.Button>
            <Radio.Button value="topRight">TopRight</Radio.Button>
            <Radio.Button value="none">None</Radio.Button>
          </Radio.Group>
        </Form.Item> */}
        {/* <Form.Item label="Pagination Bottom">
          <Radio.Group value={bottom} onChange={(e) => setBottom(e.target.value)}>
            <Radio.Button value="bottomLeft">BottomLeft</Radio.Button>
            <Radio.Button value="bottomCenter">BottomCenter</Radio.Button>
            <Radio.Button value="bottomRight">BottomRight</Radio.Button>
            <Radio.Button value="none">None</Radio.Button>
          </Radio.Group>
        </Form.Item> */}
      </Form>
      <Table<DataType>
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...tableProps}
        // pagination={{ position: [bottom] }}
        columns={columns}
        dataSource={data}
        // scroll={scroll}
      />
    </>
  );
};

export default ContentTable;
