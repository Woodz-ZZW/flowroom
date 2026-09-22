import {env} from 'cloudflare:workers';
export function database(){if(!env.DB)throw new Error('Database is unavailable');return env.DB;}
export function unavailable(error:unknown){console.error('Flowroom storage error',error);return Response.json({error:'Your workspace is temporarily unavailable. Your draft has been kept; please try again.'},{status:503});}
export function validOrigin(request:Request){const origin=request.headers.get('origin');return !origin||origin===new URL(request.url).origin;}
