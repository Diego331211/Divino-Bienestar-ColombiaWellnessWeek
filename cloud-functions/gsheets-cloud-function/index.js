const { google } = require('googleapis');

exports.appendRow = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const { fullName, email, phone, city, interests } = req.body;

    // Credenciales leídas de variables de entorno
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SPREADSHEET_ID; 
    const range = 'Sheet1!A:E'; // Ajusta a tu hoja

    const values = [[fullName, email, phone, city, interests]];
    const resource = { values };

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource,
    });

    res.status(200).send('Fila agregada exitosamente');
  } catch (error) {
    console.error('Error al agregar la fila:', error);
    res.status(500).send('Error al agregar la fila');
  }
};
