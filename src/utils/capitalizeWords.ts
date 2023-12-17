function capitalizeWords(str: string) {
  return str.replace(/\b(\w)/g, (s) => s.toUpperCase());
}
export default capitalizeWords;
