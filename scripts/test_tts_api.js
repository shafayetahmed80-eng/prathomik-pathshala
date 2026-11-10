const http = require('http');

function test(url, label) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let len = 0;
      res.on('data', chunk => len += chunk.length);
      res.on('end', () => {
        console.log(`[${label}] Status: ${res.statusCode}, Type: ${res.headers['content-type']}, Bytes: ${len}`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`[${label}] Error:`, err.message);
      resolve();
    });
  });
}

async function run() {
  await test('http://localhost:4000/api/tts?text=Hello%20students&lang=en-US', 'English TTS');
  await test('http://localhost:4000/api/tts?text=' + encodeURIComponent('আমার সোনার বাংলা') + '&lang=bn-BD', 'Bengali TTS');
  await test('http://localhost:4000/api/tts?text=A&lang=en-US&voice=guy', 'Guy Voice');
  await test('http://localhost:4000/api/tts?text=' + encodeURIComponent('ক') + '&lang=bn-BD&voice=pradeep', 'Pradeep Voice');
}

run();
