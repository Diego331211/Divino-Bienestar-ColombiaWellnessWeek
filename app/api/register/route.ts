// app/api/register/route.ts

import { NextResponse } from 'next/server';
import { google } from 'googleapis'; 

// Manejo de petición POST
export async function POST(request: Request) {
  try {
    // 1. Leer el body en formato JSON
    const body = await request.json();
    // body contendrá { fullName, email, phone, city, interests } o lo que envíes

    // 2. Configurar autenticación con Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        // OJO: reemplazar saltos de línea si los tienes sin escapado en tu .env
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        // opcional: drive, drive.file si requieres manipular archivos
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 3. Tomar el ID de la hoja desde la variable de entorno
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    // 4. Definir la pestaña y rango de columnas (ajústalo a tu gusto)
    const range = 'ASISTENTES!A:E';

    // 5. Preparar la fila con los datos recibidos
    const values = [[
      body.fullName || '',
      body.email || '',
      body.phone || '',
      body.city || '',
      body.interests || '',
    ]];

    // 6. Insertar la fila en la hoja
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED', // o 'RAW'
      requestBody: { values },
    });

    // 7. Responder con éxito
    return NextResponse.json({
      success: true,
      message: 'Datos agregados a la hoja exitosamente',
    });
  } catch (error) {
    console.error('Error al escribir en Google Sheets:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno' },
      { status: 500 }
    );
  }
}
