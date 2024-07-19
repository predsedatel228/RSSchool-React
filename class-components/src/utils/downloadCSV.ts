const downloadCsv = (array: never[]) => {
  const csvContent = array.reduce((acc, curr) => acc + JSON.stringify(curr), '') 

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${array.length}_pokemon`;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadCsv;