export const dollarFormatter = (num) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(num);
 
  export const getLocalAccessToken = () => {
    return localStorage.getItem(`jwtToken`);
  };
  

