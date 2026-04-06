// components/CredentialsForm.tsx
import { ICredentials } from '@/typescript/interface/vonage.interface';
import React from 'react';

interface CredentialsFormProps {
  credentials: ICredentials;
  onChange: (credentials: ICredentials) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const CredentialsForm: React.FC<CredentialsFormProps> = ({
  credentials,
  onChange,
  onSubmit,
  isLoading,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...credentials, [name]: value });
  };

  return (
    <div
      style={{
        marginBottom: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      <h2>Session Credentials</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>
          API Key:
          <input
            type='text'
            name='apiKey'
            value={credentials.apiKey}
            onChange={handleInputChange}
            placeholder='Enter your API Key'
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Session ID:
          <input
            type='text'
            name='sessionId'
            value={credentials.sessionId}
            onChange={handleInputChange}
            placeholder='Enter Session ID'
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Token:
          <input
            type='text'
            name='token'
            value={credentials.token}
            onChange={handleInputChange}
            placeholder='Enter Token'
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
      </div>
      <button
        onClick={onSubmit}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Loading..' : 'Join Session'}
      </button>
    </div>
  );
};
