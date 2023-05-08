const TestWater = () => {

  const data = [
      { id: 1, name: 'Product A', category: 'Category 1' },
      { id: 2, name: 'Product B', category: 'Category 1' },
      { id: 3, name: 'Product C', category: 'Category 2' },
      { id: 4, name: 'Product D', category: 'Category 3' },
      { id: 5, name: 'Product E', category: 'Category 1' },
    ];
    
  const groupedData = data.reduce((result, item) => {
    const key = item.category;
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {});

  return ( 
    <div>
      {Object.keys(groupedData).map((key) => (
        <div key={key}>
          <h2>{key}</h2>
          <ul>
            {groupedData[key].filter(record => record.name === 'Product A').map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
 
export default TestWater;