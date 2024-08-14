import { NextResponse } from 'next/server'
import axios from 'axios'
import { parseString } from 'xml2js'

export async function POST(request: Request) {
  const { TCKimlikNo, Ad, Soyad, DogumYili } = await request.json()

  const soapEnvelope = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
          <TCKimlikNo>${TCKimlikNo}</TCKimlikNo>
          <Ad>${Ad}</Ad>
          <Soyad>${Soyad}</Soyad>
          <DogumYili>${DogumYili}</DogumYili>
        </TCKimlikNoDogrula>
      </soap:Body>
    </soap:Envelope>
  `

  try {
    const response = await axios.post('https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx', soapEnvelope, {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tckimlik.nvi.gov.tr/WS/TCKimlikNoDogrula',
      },
    })

    return new Promise<NextResponse>((resolve) => {
      parseString(response.data, (err, result) => {
        if (err) {
          resolve(NextResponse.json({ error: 'XML parsing error' }, { status: 500 }))
        } else {
          const isValid = result['soap:Envelope']['soap:Body'][0]['TCKimlikNoDogrulaResponse'][0]['TCKimlikNoDogrulaResult'][0] === 'true'
          resolve(NextResponse.json({ isValid }))
        }
      })
    })
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while validating' }, { status: 500 })
  }
}