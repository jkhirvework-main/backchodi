import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function middleware(request, response) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);
  
  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}