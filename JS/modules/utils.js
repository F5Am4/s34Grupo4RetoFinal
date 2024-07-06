function formatDate(dataDate) {
  const fecha = new Date(dataDate);
  const opciones = { month: "short", day: "numeric" };
  return fecha.toLocaleDateString("en-US", opciones);
}

export { formatDate };
