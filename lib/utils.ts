type ClassValue = string | number | null | undefined | boolean | ClassValue[] | { [key: string]: boolean | ClassValue };

const toArray = (value: ClassValue): Array<string | number> => {
  if (Array.isArray(value)) {
    return value.flatMap(toArray);
  }

  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([, v]) => Boolean(v))
      .map(([key]) => key);
  }

  // Only return string or number values, filter out booleans
  if (typeof value === 'string' || typeof value === 'number') {
    return [value];
  }

  return [];
};

export function cn(...inputs: ClassValue[]): string {
  return inputs.flatMap(toArray).join(' ');
}

