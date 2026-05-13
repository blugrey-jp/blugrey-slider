const https = require('https');

exports.handler = async (event) => {
  try {
    const query = event.queryStringParameters?.query || 'モデルカー';
    const results = event.queryStringParameters?.results || '12';
    const callback = event.queryStringParameters?.callback || 'callback';
    
    const CLIENT_ID = 'JKBxlhvhgm';
    
    const apiUrl = `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${CLIENT_ID}&query=${encodeURIComponent(query)}&hits=${results}&affiliate_type=ycpromotion`;
    
    return new Promise((resolve, reject) => {
      https.get(apiUrl, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            const jsonpResponse = `${callback}(${JSON.stringify(jsonData)})`;
            
            resolve({
              statusCode: 200,
              headers: {
                'Content-Type': 'application/javascript',
                'Access-Control-Allow-Origin': '*'
              },
              body: jsonpResponse
            });
          } catch (e) {
            resolve({
              statusCode: 200,
              headers: {
                'Content-Type': 'application/javascript',
                'Access-Control-Allow-Origin': '*'
              },
              body: `${callback}({error: 'JSON parse error'})`
            });
          }
        });
      }).on('error', (err) => {
        resolve({
          statusCode: 200,
          headers: {
            'Content-Type': 'application/javascript',
            'Access-Control-Allow-Origin': '*'
          },
          body: `${callback}({error: '${err.message}'})`
        });
      });
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
