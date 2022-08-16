import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from 'components/common/form/button/button';

describe('Button', () => {
  it('렌더링 테스트', () => {
    render(<Button>테스트</Button>);

    const button = screen.getByText('테스트', { selector: 'button' });
    expect(button).toBeInTheDocument();
  });

  it('onClick 테스트', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>테스트</Button>);
    fireEvent.click(getByText('테스트'));

    expect(onClick).toHaveBeenCalled();
  });
});
