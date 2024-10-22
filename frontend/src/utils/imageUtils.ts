import country_codes from '../assets/country_codes.json';

export const getCountryCode = (countries: string[]) => {
  const countryCodes = countries.map((country) => {
    const countryObj = country_codes.find((obj) => obj.Name === country);
    return (
      countryObj ? countryObj?.Code.toLowerCase() : 'xx'
    );
  });

  return countryCodes;
};
