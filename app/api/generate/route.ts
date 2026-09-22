import {env} from 'cloudflare:workers';
import {z} from 'zod';
import {generateTemplate,screenSchema} from '@/lib/flow';
import {validOrigin} from '@/lib/server-db';
const runtime=()=>env as unknown as {OPENAI_API_KEY?:string;OPENAI_MODEL?:string};
export async function GET(){return Response.json({mode:runtime().OPENAI_API_KEY?'ai':'template'});}
const properties={id:{type:'string'},type:{type:'string',enum:['welcome','profile','preferences']},name:{type:'string'},title:{type:'string'},description:{type:'string'},button:{type:'string'},color:{type:'string'},background:{type:'string'},radius:{type:'number'},spacing:{type:'number'},progress:{type:'boolean'}};
const jsonSchema={type:'object',additionalProperties:false,properties:{screens:{type:'array',items:{type:'object',additionalProperties:false,properties,required:Object.keys(properties)}}},required:['screens']};
export async function POST(request:Request){
 if(!validOrigin(request))return new Response(null,{status:403});
 try{
 const parsed=z.object({brief:z.string().trim().min(12).max(2000)}).safeParse(await request.json());
 if(!parsed.success)return Response.json({error:'Please provide a brief between 12 and 2000 characters.'},{status:400});
 const config=runtime();if(!config.OPENAI_API_KEY)return Response.json({screens:generateTemplate(parsed.data.brief),mode:'template'});
 const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${config.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:config.OPENAI_MODEL||'gpt-4o-mini',store:false,instructions:'Design exactly three onboarding screens, ordered welcome, profile, preferences. Return component definitions only, never code. Each screen has a unique id; name max 60 characters; title max 100; description max 250; button max 40. Use six-digit hex color and background values. Radius 0–32; spacing 12–40. Set progress true. Use concise, warm, accessible copy suited to the brief. Fixed component library: welcome balance chart, profile name and email form, preferences money goals. Keep the Bloom budgeting app context unless the brief asks for another topic.',input:parsed.data.brief,max_output_tokens:2500,text:{format:{type:'json_schema',name:'onboarding_flow',strict:true,schema:jsonSchema}}}),signal:AbortSignal.timeout(45000)});
 if(!response.ok)throw new Error(`Provider returned ${response.status}`);
 const result=await response.json() as {status:string;output?:{content?:{type:string;text?:string}[]}[]};
 if(result.status!=='completed')throw new Error('Generation did not complete');
 const content=result.output?.flatMap(o=>o.content||[]).find(c=>c.type==='output_text')?.text;
 if(!content)throw new Error('No screen definitions returned');
 const flow=z.object({screens:z.array(screenSchema).length(3)}).parse(JSON.parse(content));
 if(flow.screens.map(s=>s.type).join(',')!=='welcome,profile,preferences')throw new Error('Invalid template order');
 return Response.json({screens:flow.screens.map(s=>({...s,id:crypto.randomUUID()})),mode:'ai'});
 }catch(error){console.error('Flow generation failed',error instanceof Error?error.message:'Unexpected error');return Response.json({error:'Couldn’t generate this flow. Your current screens are unchanged. Please try again.'},{status:503});}
}
