import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DocForm from './DocForm';


global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);
  
beforeEach(() => {
    jest.clearAllMocks();
});


test('renders Title label', () => {
    render(<DocForm />);
    const labelElement = screen.getByText(/title/i);
    expect(labelElement).toBeInTheDocument();
});

test('renders Content label', () => {
    render(<DocForm />);
    const labelElement = screen.getByText(/content/i);
    expect(labelElement).toBeInTheDocument();
  });

test('renders value for title', async () => {
    render(<DocForm />);
    const inputValue= 'Hej';
    const user = userEvent.setup();
    const titleInput = screen.getByLabelText("Title:")
    // const textContainer = screen.getByText(inputValue);

    await act(async () => {
        await user.type(titleInput, inputValue);
    });
    // user.type(titleInput, inputValue);
    expect(titleInput).toHaveValue(inputValue);
    // expect(textContainer).toBeInTheDocument();
});

test('renders value for content', async () => {
    render(<DocForm />);
    const inputValue= 'Hej';
    const user = userEvent.setup();
    const contentInput = screen.getByLabelText("Content:")

    await act(async () => {
        await user.type(contentInput, inputValue);
    });
    expect(contentInput).toHaveValue(inputValue);
});

test('Testing create button', async () => {
    render(<DocForm />);
    const titleValue= 'Hej';
    const contentValue= 'Hahahah';
    const user = userEvent.setup();
    const titleInput = screen.getByLabelText("Title:")
    const contentInput = screen.getByLabelText("Content:")
    const submitButton = screen.getByRole('button', { name: /create/i });

    await act(async () => {
        await user.type(titleInput, titleValue);
        await user.type(contentInput, contentValue);
    });

    await act(async () => {
        await user.click(submitButton);
    });

    expect(fetch).toHaveBeenCalledWith('http://localhost:9000/', expect.objectContaining({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: titleValue, content: contentValue }),
    }));
});