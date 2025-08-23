import { timestamp } from 'drizzle-orm/pg-core';
import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
    try {
        const { timestamp } = await request.json();
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp,
                folder: 'kindi_coffee_shop'
            },
            process.env.CLOUDINARY_API_SECRET  as string
        );

        return NextResponse.json({
            signature,
            timestamp,
            apiKey : process.env.CLOUDINARY_API_KEY
        })
    } catch (error) {
        console.error('error while generating Cloudinary signature');
        return NextResponse.json(
            {
                error: "failed to generate the signature"
            },
            { status: 500 }
        )        
    }
}