type ClassValue = string | number | null | undefined | false | ClassValue[] | { [key: string]: ClassValue };

const toArray = (value: ClassValue): Array<string | number> => {
  if (Array.isArray(value)) {
    return value.flatMap(toArray);
  }

  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([, v]) => Boolean(v))
      .map(([key]) => key);
  }

  return value ? [value] : [];
};

export function cn(...inputs: ClassValue[]): string {
  return inputs.flatMap(toArray).join(' ');
}

