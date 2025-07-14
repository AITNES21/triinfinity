const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const noticias = JSON.parse(event.body);
    const filePath = path.join(__dirname, '../../noticias.json');
    fs.writeFileSync(filePath, JSON.stringify(noticias, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Noticias guardadas' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error guardando noticias' })
    };
  }
};