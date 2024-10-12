import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Company from './page';  // 


jest.mock('@/lib/api', () => ({
  getCompany: jest.fn(),
}));

describe('Company component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders company information when data is available', async () => {
    const mockCompany = {
      name: 'Tech Corp',
      email: 'info@techcorp.com',
      location: 'San Francisco, CA',
      logo: 'https://example.com/logo.jpg',
      description: 'We are a leading tech company.',
    };

    require('@/lib/api').getCompany.mockResolvedValue({ company: mockCompany });

    render(await Company({ params: { id: '123' } }));

    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('info@techcorp.com')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('We are a leading tech company.')).toBeInTheDocument();
    expect(screen.getByAltText('Tech Corp')).toHaveAttribute('src', 'https://example.com/logo.jpg');
  });

  it('renders default information when company data is not available', async () => {
    require('@/lib/api').getCompany.mockResolvedValue({ company: null });

    render(await Company({ params: { id: '123' } }));

    expect(screen.getByText('Company Name')).toBeInTheDocument();
    expect(screen.getByText('Email not available')).toBeInTheDocument();
    expect(screen.getByText('Location not available')).toBeInTheDocument();
    expect(screen.getByText('No description available.')).toBeInTheDocument();
    expect(screen.getByAltText('Company Logo')).toHaveAttribute('src', '/images/default.jpg');
  });

  it('renders partial information when some company data is missing', async () => {
    const mockCompany = {
      name: 'Partial Corp',
      email: 'info@partialcorp.com',
      
      description: 'We are a company with partial information.',
    };

    require('@/lib/api').getCompany.mockResolvedValue({ company: mockCompany });

    render(await Company({ params: { id: '123' } }));

    expect(screen.getByText('Partial Corp')).toBeInTheDocument();
    expect(screen.getByText('info@partialcorp.com')).toBeInTheDocument();
    expect(screen.getByText('Location not available')).toBeInTheDocument();
    expect(screen.getByText('We are a company with partial information.')).toBeInTheDocument();
    expect(screen.getByAltText('Partial Corp')).toHaveAttribute('src', '/images/default.jpg');
  });

  it('calls getCompany with the correct id', async () => {
    require('@/lib/api').getCompany.mockResolvedValue({ company: {} });

    await Company({ params: { id: '123' } });

    expect(require('@/lib/api').getCompany).toHaveBeenCalledWith('123');
  });
});