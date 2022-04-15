export const SearchTable = (input, tableId) => {
  let detecta = document.getElementsByName(tableId);
  let state;

  if (input) {
    state = 'none';
  } else {
    state = '';
  }
  for (let entry of detecta) {
    entry.style.display = state;

    if (state === 'none' && entry.outerHTML.indexOf(input.toLowerCase()) > -1) {
      entry.style.display = '';
    }
  }
};

export default SearchTable;
