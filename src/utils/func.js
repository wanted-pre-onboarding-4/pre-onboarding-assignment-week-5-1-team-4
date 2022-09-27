export const highlightIncludedText = (text, value) => {
  const title = text.toLowerCase();
  const searchValue = value.toLowerCase();
  if (searchValue !== '' && title.includes(searchValue)) {
    const matchText = text.split(new RegExp(`(${searchValue})`, 'gi'));

    return (
      <>
        {matchText.map((text, index) =>
          text.toLowerCase() === searchValue.toLowerCase() ? (
            <span key={index} style={{ fontWeight: 700 }}>
              {text}
            </span>
          ) : (
            text
          )
        )}
      </>
    );
  }

  return text;
};
