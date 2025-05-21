export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL 파라미터가 필요합니다.' });
  }
  
  try {
    const imageRes = await fetch(url);
    const imageBuffer = await imageRes.arrayBuffer();
    
    // 원본 이미지의 Content-Type 헤더 가져오기
    const contentType = imageRes.headers.get('content-type');
    
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', contentType || 'image/jpeg');
    
    // 이미지 데이터 반환
    res.status(200).send(Buffer.from(imageBuffer));
  } catch (error) {
    console.error('이미지 프록시 오류:', error);
    res.status(500).json({ error: '이미지를 가져오는 중 오류가 발생했습니다.' });
  }
} 