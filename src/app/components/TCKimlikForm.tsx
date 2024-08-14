'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';

interface FormData {
    TCKimlikNo: string
    Ad: string
    Soyad: string
    DogumYili: string
}

export default function TCKimlikForm() {
    const [formData, setFormData] = useState<FormData>({
        TCKimlikNo: '',
        Ad: '',
        Soyad: '',
        DogumYili: '',
    })
    const [result, setResult] = useState<boolean | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await response.json()
            setResult(data.isValid)
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    {/* logo */}
                    <div className="flex justify-center">
                        <a href="https://www.nvi.gov.tr/">
                            <img src="https://www.nvi.gov.tr/kurumlar/nvi.gov.tr/Tasarim/nvi_logo_3.png" alt="TC Kimlik No Doğrulama" className="rounded-lg p-1 " style={{ backgroundColor: "#13183E" }} />
                        </a>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="TCKimlikNo"
                            placeholder="TC Kimlik No"
                            value={formData.TCKimlikNo}
                            onChange={handleChange}
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                            required
                        />
                        <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">TC Kimlik No</label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="Ad"
                            placeholder="Ad"
                            value={formData.Ad}
                            onChange={handleChange}
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                            required
                        />
                        <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Ad</label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="Soyad"
                            placeholder="Soyad"
                            value={formData.Soyad}
                            onChange={handleChange}
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                            required
                        />
                        <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Soyad</label>
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            name="DogumYili"
                            placeholder="Doğum Yılı"
                            value={formData.DogumYili}
                            onChange={handleChange}
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                            required
                        />
                        <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Doğum Yılı</label>
                    </div>
                    <div className="relative">
                        <button className="bg-blue-500 text-white rounded-md px-2 py-1">Doğrula</button>
                    </div>
                </div>
            </form>
            {result !== null && (
                <div className={`mt-4 p-4 rounded-md ${result ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {result ? 'TC Kimlik No geçerli.' : 'TC Kimlik No geçersiz.'}
                </div>
            )}

            <footer className="text-sm text-gray-600 mt-4 text-center">
                <p>Copyright © 2024 | Mert Can Akdoğan </p>
                <br /><hr /><br />
                <p>
                    <a href="https://x.com/mertcakdogan" target="_blank" rel="noopener noreferrer" className='p-2'>
                        <XIcon />
                    </a>
                    <a href="https://github.com/mertcakdogan" target="_blank" rel="noopener noreferrer" className='p-2'>
                        <GitHubIcon />
                    </a>
                </p>

                <p className='mt-4'>
                    Bu uygulama <a href="https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx" target="_blank" rel="noopener noreferrer" className='text-red-700'>Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü</a> tarafından sağlanan web servisini kullanarak TC Kimlik No doğrulama işlemi yapmaktadır.
                </p>
            </footer >
        </>
    )
}