// app/api/sponsors/route.ts
import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    // Leer el body con los datos del formulario
    const body = await request.json();
    // Los campos esperados:
    // companyName, representativeName, representativeRole, contactEmail, contactPhone, sponsorshipType

    // Configurar la autenticación con Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    // Especificamos el rango de la hoja "PATROCINADORES"
    const range = 'PATROCINADORES!A:F';

    const values = [[
      body.companyName || '',
      body.representativeName || '',
      body.representativeRole || '',
      body.contactEmail || '',
      body.contactPhone || '',
      body.sponsorshipType || ''
    ]];

    // Escribir los datos en la hoja
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    return NextResponse.json({ success: true, message: 'Datos de patrocinador enviados exitosamente.' });
  } catch (error) {
    console.error('Error al escribir en Google Sheets:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}
