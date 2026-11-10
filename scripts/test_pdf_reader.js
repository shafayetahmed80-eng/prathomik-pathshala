async function testPdfReader() {
  const url = 'http://localhost:4000/api/pdf?class=class-1&type=textbook&file=' + encodeURIComponent('আমার বাংলা বই');
  try {
    const res = await fetch(url);
    console.log('Status:', res.status);
    console.log('Content-Type:', res.headers.get('content-type'));
    if (res.status === 200) {
      const buffer = await res.arrayBuffer();
      console.log(`PDF received: ${buffer.byteLength} bytes`);
    } else {
      const json = await res.json();
      console.log('Error JSON:', json);
    }
  } catch (err) {
    console.error('PDF fetch error:', err.message);
  }
}

testPdfReader();
