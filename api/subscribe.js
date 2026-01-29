export default async function handler(req, res) {
  // 1. Настройка CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Только POST' });

  try {
    // 2. Получить данные из формы
    const { email, firstName, name, interests } = req.body;
    
    // 3. ВАЖНО: Замени на свои данные!
    const apiToken = process.env.SENDER_API_TOKEN; // Будет в Vercel
    const groupId = 'e5ww7q'; // Твой ID группы
    
    // 4. Отправить в Sender
    const senderResponse = await fetch('https://api.sender.net/v2/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        first_name: firstName || name || '', // Подставь имя поля из твоей формы
        groups: [groupId],
        fields: {
          interests: interests ? interests.join(', ') : ''
        }
      })
    });

    // 5. Вернуть ответ
    if (senderResponse.ok) {
      return res.status(200).json({ success: true });
    } else {
      const error = await senderResponse.json();
      return res.status(400).json({ 
        success: false, 
        error: error.message || 'Ошибка Sender' 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: 'Ошибка сервера' 
    });
  }
}
