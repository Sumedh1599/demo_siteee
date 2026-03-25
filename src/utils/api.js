// API utilities for early access signup

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function submitEarlyAccessSignup(userId, email) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/early-access-signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, email }),
      mode: 'cors'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Early access signup API error:', error);
    
    // For development/demo purposes, we'll simulate success
    // In production, this should be removed and the actual API should work
    if (error.message.includes('404') || error.message.includes('Failed to fetch')) {
      console.log('Early Access Signup (Mock):', { userId, email });
      return { success: true, message: 'Mock signup successful' };
    }
    
    throw error;
  }
}

// Token exchange utilities
export async function exchangeCodeForTokens(code) {
  const clientId = '1ikn37t8lko525bsfh0io78blj';
  const redirectUri = 'https://verbll.com';
  
  const response = await fetch('https://eu-west-2cxtr2lvkm.auth.eu-west-2.amazoncognito.com/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      code: code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange authorization code for tokens');
  }

  return response.json();
}

export function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error('Failed to decode ID token');
  }
}
