export const generateComponents = (number, component) => {
  const components = [];
  for (let i = 0; i < number; i++) {
    components.push(component);
  }
  return components;
};
