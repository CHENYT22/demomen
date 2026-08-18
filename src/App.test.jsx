import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

describe('My Design Desk interactions', () => {
  test('opens a project panel, traps Tab, and returns focus after Escape', async () => {
    render(<App />);

    const trigger = screen.getAllByRole('button', { name: /实习项目/ })[0];
    trigger.focus();
    fireEvent.click(trigger);

    expect(
      screen.getByRole('dialog', { name: '实习项目' }),
    ).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: '关闭面板' });
    closeButton.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(closeButton);

    fireEvent.keyDown(document, { key: 'Escape' });
    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(
      screen.queryByRole('dialog', { name: '实习项目' }),
    ).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  test('opens the contact panel and exposes a mailto link', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: '联系我 ↗' }));

    const emailLink = within(screen.getByRole('dialog')).getByRole('link', {
      name: /17381255086@163.com/i,
    });

    expect(emailLink).toHaveAttribute('href', 'mailto:17381255086@163.com');
  });
});
