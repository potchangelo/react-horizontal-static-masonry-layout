import { render, screen } from '@testing-library/react';
import { MasonryItem } from '..';

test('Item has no content', () => {
  render(<MasonryItem />);
  const item = screen.getByTestId('masonry-item');
  expect(item.innerText).toBeFalsy();
});

test('Item has content', () => {
  render(
    <MasonryItem>
      <p>Whatever here should display properly</p>
    </MasonryItem>,
  );
  const content = screen.getByText(/Whatever/);
  expect(content).toBeInTheDocument();
});
