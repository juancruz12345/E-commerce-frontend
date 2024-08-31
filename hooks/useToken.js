
 export function useToken(){
    const fetchWithToken = async (url, options = {}) => {
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          console.log('value: ', value, 'parts: ', parts)
          if (parts.length === 2) return parts.pop().split(';').shift();
        };
      
        const refreshToken = async () => {
          try {
            const response = await fetch('https://e-commerce-backend-zh4k.onrender.com/refresh-token', {
              method: 'POST',
              credentials: 'include', // to send cookies with the request
            });
            if (!response.ok) throw new Error('Failed to refresh token');
            const data = await response.json();
            document.cookie = `acces_token=${data.accessToken}; path=/;`;
            console.log('refrehs.token creado: ',data)
            return data.accessToken;
          } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
          }
        };
      
        const fetchWithRetry = async (url, options) => {
          try {
            const response = await fetch(url, {
              ...options,
              credentials: 'include', // to send cookies with the request
            });
            if (response.status === 401) {
              // If the access token is expired, try to refresh it
              const newAccessToken = await refreshToken();
              options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${newAccessToken}`
              };
              // Retry the original request with the new token
              return await fetch(url, {
                ...options,
                credentials: 'include', // to send cookies with the request
              });
            }
            return response;
          } catch (error) {
            console.error('Fetch error:', error);
            throw error;
          }
        };
      
        // Get the current access token from cookies
        const accessToken = getCookie('acces_token');
        options.headers = {
          ...options.headers,
          'Authorization': `Bearer ${accessToken}`
        };
      
        // Try to make the request
        return fetchWithRetry(url, options);
      };
      
    
      // Fetch protected data (example usage)
      const fetchProtectedData = async () => {
       
        try {
          const response = await fetchWithToken('https://e-commerce-backend-zh4k.onrender.com');
          if (response.ok) {
            const data = await response.json();
            console.log('Protected data:', data);
          } else {
            throw new Error('Failed to fetch protected data');
          }
        } catch (error) {
          console.error('Error fetching protected data:', error);
        }
      };

      const logout = async() => {
        console.log('logou')
          try {
             await fetch('https://e-commerce-backend-zh4k.onrender.com/logout', {
              method: 'POST',
              credentials: 'include', // to send cookies with the request
            });
            window.location.href = '/';
          } catch (error) {
            console.error('Error logging out:', error);
          }
     
   }

      return{fetchProtectedData, logout}
 }
  
  
   
