import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Masonry, MasonryItem } from '..';

/**
 * @param {number} width
 */
function resizeWindowWidth(width) {
  // Object.defineProperty(window, 'innerWidth', {
  //   writable: true, configurable: true, value: width
  // });
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
}

test('No items', () => {
  render(<Masonry />);
  const columns = screen.queryAllByTestId('masonry-column');
  expect(columns.length).toBeFalsy();
  const items = screen.queryAllByTestId('masonry-item');
  expect(items.length).toBeFalsy();
});

test('One item', () => {
  render(
    <Masonry>
      <MasonryItem key="item-1" height={100} />
    </Masonry>,
  );
  const columns = screen.getAllByTestId('masonry-column');
  expect(columns.length).toBeGreaterThanOrEqual(1);
  const items = screen.getAllByTestId('masonry-item');
  expect(items.length).toBe(1);
});

test('More than one items', () => {
  render(
    <Masonry>
      <MasonryItem key="item-1" height={100} />
      <MasonryItem key="item-2" height={150} />
      <MasonryItem key="item-3" height={200} />
    </Masonry>,
  );
  const columns = screen.getAllByTestId('masonry-column');
  expect(columns.length).toBeGreaterThanOrEqual(1);
  const items = screen.getAllByTestId('masonry-item');
  expect(items.length).toBe(3);
});

test('Items without height', () => {
  render(
    <Masonry>
      <MasonryItem key="item-1" />
      <MasonryItem key="item-2" />
      <MasonryItem key="item-3" />
    </Masonry>,
  );
  const columns = screen.getAllByTestId('masonry-column');
  expect(columns.length).toBeGreaterThanOrEqual(1);
  const items = screen.getAllByTestId('masonry-item');
  expect(items.length).toBe(3);
});

test('Wrong children type', () => {
  render(
    <Masonry>
      <span>Not masonry item</span>
    </Masonry>,
  );
  const columns = screen.queryAllByTestId('masonry-column');
  expect(columns.length).toBeFalsy();
  const items = screen.queryAllByTestId('masonry-item');
  expect(items.length).toBeFalsy();
});

test('Resizing with default breakpoints', () => {
  const expectedResults = [
    { width: 400, columns: 1 },
    { width: 800, columns: 2 },
    { width: 1200, columns: 3 },
  ];

  render(
    <Masonry>
      <MasonryItem key="item-1" height={100} />
    </Masonry>,
  );

  expectedResults.forEach(result => {
    act(() => {
      resizeWindowWidth(result.width);
    });
    const columns = screen.getAllByTestId('masonry-column');
    expect(columns.length).toBe(result.columns);
    const items = screen.getAllByTestId('masonry-item');
    expect(items.length).toBeTruthy();
  });
});

test('Resizing with defined breakpoints', () => {
  const expectedResults = [
    { width: 400, columns: 1 },
    { width: 800, columns: 3 },
    { width: 1200, columns: 5 },
    { width: 1600, columns: 7 },
  ];
  const breakpoints = [
    { columns: 1, minWidth: 0 },
    { columns: 3, minWidth: 500 },
    { columns: 5, minWidth: 1000 },
    { columns: 7, minWidth: 1500 },
  ];

  render(
    <Masonry breakpoints={breakpoints}>
      <MasonryItem key="item-1" height={100} />
      <MasonryItem key="item-2" height={100} />
    </Masonry>,
  );

  expectedResults.forEach(result => {
    act(() => {
      resizeWindowWidth(result.width);
    });
    const columns = screen.getAllByTestId('masonry-column');
    expect(columns.length).toBe(result.columns);
    const items = screen.getAllByTestId('masonry-item');
    expect(items.length).toBeTruthy();
  });
});
