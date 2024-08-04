const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return null;

  const validContactTypes = ['work', 'home', 'personal'];
  return validContactTypes.includes(contactType) ? contactType : null;
 
};

const parseIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return null;

 
  const lowerCasedValue = isFavourite.toLowerCase();
  if (lowerCasedValue === 'true') {
    return true;
  } else if (lowerCasedValue === 'false') {
    return false;
  }

  return null;
  
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  
  return {
    contactType: parseContactType(contactType),
    isFavourite: parseIsFavourite(isFavourite),
  };
};